import axios from 'axios';

export class ConfigManager<T> {
    private static instances: Record<string, ConfigManager<any>> = {};
    private config: T | null = null;
    private appName: string;
    private configHost: string;

    private constructor(appName: string, configHost: string = 'https://config.envdomain.com') {
        this.appName = appName;
        this.configHost = configHost;
    }

    public static getInstance<T>(appName: string, configHost?: string): ConfigManager<T> {
        const key = `${appName}-${configHost || 'default'}`;
        if (!ConfigManager.instances[key]) {
            ConfigManager.instances[key] = new ConfigManager<T>(appName, configHost);
        }
        return ConfigManager.instances[key] as ConfigManager<T>;
    }

    public async loadConfig(): Promise<T> {
        if (this.config) return this.config;
        try {
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
