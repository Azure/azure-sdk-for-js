// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// This sample demonstrates the basics - creating settings, updating settings
// deleting settings and getting them.

// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src"

export async function run() {
    console.log(`Running helloworld sample`);

    // You will need to set this environment variable
    const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
    const client = new AppConfigurationClient(connectionString);

    const greetingKey = "Samples:Greeting";

    await cleanupSampleValues([greetingKey], client);

    // creating a new setting
    console.log(`Adding in new setting ${greetingKey}`);
    await client.addConfigurationSetting({ key: greetingKey, value: "Hello!" });

    const newSetting = await client.getConfigurationSetting({ key: greetingKey });
    console.log(`${greetingKey} has been set to ${newSetting.value}`);

    // changing the value of a setting
    await client.setConfigurationSetting({ key: greetingKey, value: "Goodbye!" });

    const updatedSetting = await client.getConfigurationSetting({ key: greetingKey });
    console.log(`${greetingKey} has been set to ${updatedSetting.value}`);

    // removing the setting
    await client.deleteConfigurationSetting({ key: greetingKey });
    console.log(`${greetingKey} has been deleted`);

    await cleanupSampleValues([greetingKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
    const settingsIterator = await client.listConfigurationSettings({
        keys: keys
    });

    for await (const setting of settingsIterator) {
        await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
    }    
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });