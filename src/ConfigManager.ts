import axios from 'axios';

export class ConfigManager<T> {
    private static instances: Record<string, ConfigManager<any>> = {};
    private config: T | null = null;
    private appName: string;
    private configHost: string;
    private loadLocalConfig: boolean;

    private constructor(
        appName: string,
        configHost: string = 'https://config.envdomain.com',
        loadLocalConfig: boolean = false
    ) {
        this.appName = appName;
        this.configHost = configHost;
        this.loadLocalConfig = loadLocalConfig;
    }

    public static getInstance<T>(
        appName: string,
        configHost?: string,
        options?: { loadLocalConfig?: boolean }
    ): ConfigManager<T> {
        const loadLocalConfig = options?.loadLocalConfig === true;
        const key = `${appName}-${configHost || 'default'}-${loadLocalConfig ? 'local' : 'remote'}`;
        if (!ConfigManager.instances[key]) {
            ConfigManager.instances[key] = new ConfigManager<T>(appName, configHost, loadLocalConfig);
        }
        return ConfigManager.instances[key] as ConfigManager<T>;
    }

    public async loadConfig(): Promise<T> {
        if (this.config) return this.config;
        try {
            const isBrowser = typeof window !== 'undefined';
            if (this.loadLocalConfig && isBrowser) {
                try {
                    const localResponse = await axios.get('/config.local.json');
                    this.config = localResponse.data;
                    return this.config;
                } catch (error) {
                    console.warn('Local config not found, falling back to remote config.');
                }
            }
            const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
            const response = await axios.get(`${this.configHost}/${this.appName}/${host}.json`);
            this.config = response.data;
            return this.config;
        } catch (error) {
            console.error("Failed to load config:", error);
            throw new Error('Received invalid config data');
        }
    }
}
