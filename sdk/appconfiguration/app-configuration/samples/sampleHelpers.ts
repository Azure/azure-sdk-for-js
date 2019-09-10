import { AppConfigurationClient } from "../src"

// allow loading from a .env file as an alternative to defining the variable 
// in the environment
import * as dotenv from "dotenv";
dotenv.config();

export function getConnectionStringFromEnvironment() : string {
    const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;

    if (connectionString == null) {
        throw Error(`No connection string in environment - set AZ_CONFIG_CONNECTION with a connection string for your AppConfiguration instance.`);
    }

    return connectionString;
}

export async function deleteKeyAndLabels(keys: string[], client: AppConfigurationClient) {
    const existingSettings = await client.listConfigurationSettings({
        key: keys
    });

    for (const setting of existingSettings) {
        console.log(`Removing key ${setting.key} (and all labels)`);
        await client.deleteConfigurationSetting(setting.key!, { label: setting.label });
    }
}