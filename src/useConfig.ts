import { useState, useEffect } from 'react';
import { ConfigManager } from './ConfigManager';

export function useConfig<T>(appName: string): [T | null, Error | null] {
    const [config, setConfig] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const cfg = await ConfigManager.getInstance<T>(appName).loadConfig();
                setConfig(cfg);
            } catch (err) {
                setError(err);
            }
        };
        fetchConfig();
    }, [appName]);

    return [config, error];
}
