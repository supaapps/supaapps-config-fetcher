
![Supaapps Logo](https://supaapps.com/wp-content/uploads/logo.png)

## Supaapps Config Fetcher


Managing configurations in applications can be cumbrersome, whether it's containerized deployments like Docker or traditional application distributions. Rebuilding an app or creating multiple versions for a single configuration change isn't efficient. `supaapps-config-fetcher` aims to simplify this. 

`supaapps-config-fetcher` is an easy-to-use package developed by Supaapps GmbH to fetch configurations from a hosted JSON file based on the application's hostname. Although intended for internal use, we've made this package available under the MIT license. Feel free to integrate it into your projects.



## Installation

```bash
npm install supaapps-config-fetcher

```
Or using Yarn:
```bash
yarn add supaapps-config-fetcher

```



## Usage

#### Fetching Configurations: The primary purpose of this package is to fetch configurations<br from a hosted JSON file based on the application's hostname.
Below are an example config and how to use it with our package.
```json
{
  "apiUrl": "http://localhost:8080/api"
}
```

#### TypeScript Support: Before using the package, define the expected return type for your<br configuration.

```typescript
type MyAppConfig = {
    apiUrl: string;
};
```

####
To initialize and fetch the configuration, use the code provided below:

```typescript
import { ConfigManager } from 'supaapps-config-fetcher';

const configManager = ConfigManager.getInstance<MyAppConfig>('example-app@v1');
const config = await configManager.loadConfig();
console.log(config.apiUrl);
// Outputs: "http://localhost:8080/api"

```

#

you should use custom host where your config.json files are hosted https://example.com and host your files with `example-app@v1` then hostnames example: `localhost.json` 
```typescript
const customHostManager = ConfigManager.getInstance<MyAppConfig>('example-app@v1', 'https://example.com');

```

This will load the file from https://example.com/example-app@v1/localhost.json when the app is loaded from localhost

## License

Notice:  While this software is open-source under the MIT License, the "Supaapps" name, branding, and logo are proprietary and copyrighted by Supaapps GmbH. Any use, reproduction, or distribution of the "Supaapps" brand assets without explicit permission is strictly prohibited.

MIT License