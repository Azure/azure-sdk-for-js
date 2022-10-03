// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to convert an IoT Hub connection string to an Event Hubs connection string that points to the built-in messaging endpoint.
 */

/*
 * The Event Hubs connection string is then used with the EventHubConsumerClient to receive events.
 *
 * More information about the built-in messaging endpoint can be found at:
 * https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin
 */

import * as crypto from "crypto";
import { Buffer } from "buffer";
import { AmqpError, Connection, ReceiverEvents, parseConnectionString } from "rhea-promise";
import * as rheaPromise from "rhea-promise";
import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Type guard for AmqpError.
 * @param err - An unknown error.
 */
function isAmqpError(err: any): err is AmqpError {
  return rheaPromise.isAmqpError(err);
}

const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

// This code is modified from https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#security-tokens.
function generateSasToken(
  resourceUri: string,
  signingKey: string,
  policyName: string,
  expiresInMins: number
): string {
  resourceUri = encodeURIComponent(resourceUri);

  const expiresInSeconds = Math.ceil(Date.now() / 1000 + expiresInMins * 60);
  const toSign = resourceUri + "\n" + expiresInSeconds;

  // Use the crypto module to create the hmac.
  const hmac = crypto.createHmac("sha256", Buffer.from(signingKey, "base64"));
  hmac.update(toSign);
  const base64UriEncoded = encodeURIComponent(hmac.digest("base64"));

  // Construct authorization string.
  return `SharedAccessSignature sr=${resourceUri}&sig=${base64UriEncoded}&se=${expiresInSeconds}&skn=${policyName}`;
}

/**
 * Converts an IotHub Connection string into an Event Hubs-compatible connection string.
 * @param connectionString - An IotHub connection string in the format:
 * `"HostName=<your-iot-hub>.azure-devices.net;SharedAccessKeyName=<KeyName>;SharedAccessKey=<Key>"`
 * @returns An Event Hubs-compatible connection string in the format:
 * `"Endpoint=sb://<hostname>;EntityPath=<your-iot-hub>;SharedAccessKeyName=<KeyName>;SharedAccessKey=<Key>"`
 */
async function convertIotHubToEventHubsConnectionString(connectionString: string): Promise<string> {
  const { HostName, SharedAccessKeyName, SharedAccessKey } = parseConnectionString<{
    HostName: string;
    SharedAccessKeyName: string;
    SharedAccessKey: string;
  }>(connectionString);

  // Verify that the required info is in the connection string.
  if (!HostName || !SharedAccessKey || !SharedAccessKeyName) {
    throw new Error(`Invalid IotHub connection string.`);
  }

  //Extract the IotHub name from the hostname.
  const [iotHubName] = HostName.split(".");

  if (!iotHubName) {
    throw new Error(`Unable to extract the IotHub name from the connection string.`);
  }

  // Generate a token to authenticate to the service.
  // The code for generateSasToken can be found at https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#security-tokens
  const token = generateSasToken(
    `${HostName}/messages/events`,
    SharedAccessKey,
    SharedAccessKeyName,
    5 // token expires in 5 minutes
  );

  const connection = new Connection({
    transport: "tls",
    host: HostName,
    hostname: HostName,
    username: `${SharedAccessKeyName}@sas.root.${iotHubName}`,
    port: 5671,
    reconnect: false,
    password: token,
  });
  await connection.open();

  // Create the receiver that will trigger a redirect error.
  const receiver = await connection.createReceiver({
    source: { address: `amqps://${HostName}/messages/events/$management` },
  });

  return new Promise((resolve, reject) => {
    receiver.on(ReceiverEvents.receiverError, (context) => {
      const error = context.receiver && context.receiver.error;
      if (isAmqpError(error) && error.condition === "amqp:link:redirect") {
        const hostname = error.info && error.info.hostname;
        if (!hostname) {
          reject(error);
        } else {
          resolve(
            `Endpoint=sb://${hostname}/;EntityPath=${iotHubName};SharedAccessKeyName=${SharedAccessKeyName};SharedAccessKey=${SharedAccessKey}`
          );
        }
      } else {
        reject(error);
      }
      connection.close().catch(() => {
        /* ignore error */
      });
    });
  });
}

export async function main() {
  console.log(`Running iothubConnectionString sample`);

  const eventHubsConnectionString = await convertIotHubToEventHubsConnectionString(
    "HostName=<your-iot-hub>.azure-devices.net;SharedAccessKeyName=<KeyName>;SharedAccessKey=<Key>"
  );

  const consumerClient = new EventHubConsumerClient(consumerGroup, eventHubsConnectionString);

  const subscription = consumerClient.subscribe(
    {
      // The callback where you add your code to process incoming events
      processEvents: async (events, context) => {
        for (const event of events) {
          console.log(
            `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
          );
        }
      },
      processError: async (err, context) => {
        console.log(`Error on partition "${context.partitionId}" : ${err}`);
      },
    },
    { startPosition: earliestEventPosition }
  );

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await consumerClient.close();
    console.log(`Exiting iothubConnectionString sample`);
  }, 30 * 1000);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
