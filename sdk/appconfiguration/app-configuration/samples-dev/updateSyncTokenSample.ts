// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary The AppConfiguration service supports EventGrid-based setting change notifications.
 * This sample shows how to process these notifications. Due to the distributed nature of the
 * AppConfiguration service, the synchronization token needs to be registered with the client
 * to get the most up-to-date value of the setting. The ConfigurationClient.UpdateSyncToken
 * is used to register the synchronization token.
 * @azsdk-weight 70
 */

import { AppConfigurationClient } from "@azure/app-configuration";
import { isSystemEvent, EventGridEvent, EventGridDeserializer } from "@azure/eventgrid";
import { appConfigTestEvent } from "./testData";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Create an Event Grid Consumer which will decode a hard coded test object into an EventGridEvent object.
const consumer = new EventGridDeserializer();

/**
 * For a full implementation, another service would act as a receiver for events {@link https://docs.microsoft.com/en-us/azure/event-grid/event-handlers}.
 * However, to avoid additional complexity for this sample, a hardcoded test event is being used. For full EventGrid samples, see
 * {@link https://github.com/Azure/azure-sdk-for-js/tree/ebbfcff02ca15b1792dc6c45d8ba10913891c530/sdk/eventgrid/eventgrid/samples-dev}.
 */
async function processEvent(): Promise<EventGridEvent<unknown>[]> {
  return consumer.deserializeEventGridEvents(appConfigTestEvent);
}

export async function main() {
  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const greetingKey = "Samples:Greeting";

  await cleanupSampleValues([greetingKey], client);

  // creating a new setting
  console.log(`Adding in new setting ${greetingKey}`);
  await client.addConfigurationSetting({ key: greetingKey, value: "Hello!" });

  // Simulate receiving events from EventGrid
  const events = await processEvent();

  // Iterate through events and log updated key-value pairs.
  events.forEach(async (eventData) => {
    if (isSystemEvent("Microsoft.AppConfiguration.KeyValueModified", eventData)) {
      client.updateSyncToken(eventData.data.syncToken);
      const newSetting = await client.getConfigurationSetting({
        key: eventData.data.key,
        label: eventData.data.label,
      });
      console.log(`Setting was updated. Key: ${newSetting.key} value ${newSetting.value}`);
    }
  });

  // Run for 2 seconds, allowing events to be processed.
  await new Promise((resolve) => {
    setTimeout(resolve, 1000 * 2);
  });

  await cleanupSampleValues([greetingKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
