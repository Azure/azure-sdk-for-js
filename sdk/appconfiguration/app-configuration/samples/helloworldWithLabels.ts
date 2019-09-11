// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src"

export async function run() {
    console.log("Running helloworldWithLabels sample");

    // You will need to set this environment variable
    const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
    const client = new AppConfigurationClient(connectionString);

    const urlKey = "Samples:Endpoint:Url";

    cleanupSampleValues([urlKey], client);

    // labels allow you to use the same key with different values for separate environments
    // or clients
    console.log("Adding in endpoint with two labels - beta and production");
    await client.addConfigurationSetting(urlKey, { label: "beta", value: "https://beta.example.com" });
    await client.addConfigurationSetting(urlKey, { label: "production", value: "https://example.com" });

    const betaEndpoint = await client.getConfigurationSetting(urlKey, { label: "beta" });
    console.log(`Endpoint with beta label: ${betaEndpoint.value}`);

    const productionEndpoint = await client.getConfigurationSetting(urlKey, { label: "production" });
    console.log(`Endpoint with production label: ${productionEndpoint.value}`);

    cleanupSampleValues([urlKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
    const existingSettings = await client.listConfigurationSettings({
        key: keys
    });

    for (const setting of existingSettings) {
        await client.deleteConfigurationSetting(setting.key!, { label: setting.label });
    }
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });