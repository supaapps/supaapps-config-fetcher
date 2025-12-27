import { useState, useEffect } from 'react';
import { ConfigManager } from './ConfigManager';

export function useConfig<T>(
    appName: string,
    configHost?: string,
    options?: { loadLocalConfig?: boolean }
): [T | null, Error | null] {
    const [config, setConfig] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const cfg = await ConfigManager.getInstance<T>(appName, configHost, options).loadConfig();
                setConfig(cfg);
            } catch (err) {
                setError(err as Error);
            }
        };
        fetchConfig();
    }, [appName, configHost, options]);

    return [config, error];
}
