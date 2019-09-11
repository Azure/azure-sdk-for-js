import { getConnectionStringFromEnvironment, cleanupSampleValues } from "./sampleHelpers";

// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src"

export async function run() {
    console.log("Running helloworld sample");

    let connectionString = getConnectionStringFromEnvironment();
    const client = new AppConfigurationClient(connectionString);

    const greetingKey = "Samples:Greeting";    
    
    cleanupSampleValues([greetingKey], client);

    // creating a new setting
    console.log(`Adding in new setting ${greetingKey}`);
    await client.addConfigurationSetting(greetingKey, { value: "Hello!" });

    const newSetting = await client.getConfigurationSetting(greetingKey);
    console.log(`${greetingKey} has been set to ${newSetting.value}`);

    // changing the value of a setting
    await client.setConfigurationSetting(greetingKey, { value: "Goodbye!" });

    const updatedSetting = await client.getConfigurationSetting(greetingKey);
    console.log(`${greetingKey} has been set to ${updatedSetting.value}`);

    // removing the setting
    await client.deleteConfigurationSetting(greetingKey, {});
    console.log(`${greetingKey} has been deleted`);

    cleanupSampleValues([greetingKey], client);    
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });