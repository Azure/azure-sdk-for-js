// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src"

export async function run() {
    console.log("Running helloworld sample using etags");

    // You will need to set this environment variable
    const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
    const client = new AppConfigurationClient(connectionString);

    const greetingKey = "Samples:Greeting";

    cleanupSampleValues([greetingKey], client);

    // create a new setting as Client Alpha
    console.log(`Client Alpha: adding in new setting ${greetingKey}`);
    let initialSettingFromClientA = await client.addConfigurationSetting(greetingKey, { value: "Created for Client Alpha" });
    console.log(`Client Alpha: ${greetingKey} has been set to '${initialSettingFromClientA.value}' with etag of ${initialSettingFromClientA.etag}`);

    // Each setting, when added, will come back with an etag (https://en.wikipedia.org/wiki/HTTP_ETag)
    // This allows you to update a value but only if it hasn't changed from the last time you read it.
    //
    // Let's simulate two processes attempting to update the value

    // if you don't specify an etag the update is unconditional
    let updateFromClientBeta = await client.setConfigurationSetting(greetingKey, {
        value: "Update from Client Beta"
    });

    console.log(`Client Beta: updated the value of ${greetingKey} without specifying an etag (unconditional update).`);
    console.log(`  Client Beta's etag is ${updateFromClientBeta.etag}`);
    console.log(`  Client Alpha's etag from the initial creation is ${initialSettingFromClientA.etag}`);
    
    // at this point we've got this sequence of events
    // 
    // 1. Client Alpha created the setting (and stored off its etag)
    // 2. Client Beta updated the setting, ignoring the etag

    // Now Client Alpha wants to update the value _but_ Client Alpha will pay attention to the 
    // etag and only update the value if the value currently stored is the same as when we 
    // initially updated the setting.
    // 
    // This allows us to prevent unintentional overwrites and allows you to implement
    // optimistic concurrency (https://en.wikipedia.org/wiki/Optimistic_concurrency_control) 
    // within your application. 

    console.log("Client Alpha: attempting update that doesn't include an etag");
    await client.setConfigurationSetting(greetingKey, {
        value: "Update from Client Alpha that should only get set if the value has not changed from the last time we loaded it",
        etag: initialSettingFromClientA.etag
    }).catch(err => {
        console.log("  Update failed - etag didn't match");
    });

    // if we want to update then we need to retrieve the new setting and determine if our update makes sense
    let actualStoredSetting = await client.getConfigurationSetting(greetingKey);
   
    console.log("Client Alpha: getting current value and merging/updating based on it")
    // now we can figure out if we want to merge our value, overwrite with our value, etc...
    // in this case we'll just update the value to what we want (again, specifying the etag to 
    // prevent unintended overwrite)
    await client.updateConfigurationSetting(greetingKey, {
        value: "Theoretical update from Client Alpha that takes Client Beta's changes into account", 
        etag: actualStoredSetting.etag
    });

    let currentSetting = await client.getConfigurationSetting(greetingKey);
    console.log(`The value is now updated to '${currentSetting.value}'`);

    cleanupSampleValues([greetingKey], client);
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
//     console.log("ERROR", err);
// });