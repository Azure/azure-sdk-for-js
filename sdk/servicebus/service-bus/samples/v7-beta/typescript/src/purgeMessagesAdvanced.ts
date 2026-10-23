// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates purging messages with a fixed cutoff and a Premium batch size.
 *
 * @summary Demonstrates advanced message purge options.
 */

import { ServiceBusClient } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const fqdn = process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusClient(fqdn, credential);

  try {
    const receiver = client.createReceiver(queueName);
    try {
      const enqueueTimeThreshold = new Date();
      const result = await receiver.purgeMessages({
        beforeEnqueueTime: enqueueTimeThreshold,
        // Premium supports up to 4,000 messages per request.
        maxMessagesPerBatch: 4000,
      });

      console.log(
        `Purged ${result.deletedCount} messages enqueued before ${enqueueTimeThreshold.toISOString()}.`,
      );
    } finally {
      await receiver.close();
    }
  } finally {
    await client.close();
  }
}

export async function purgeNamedSession(sessionId: string): Promise<void> {
  const client = new ServiceBusClient(fqdn, new DefaultAzureCredential());
  try {
    const sessionReceiver = await client.acceptSession(queueName, sessionId);
    try {
      const result = await sessionReceiver.purgeMessages();
      console.log(`Removed ${result.deletedCount} messages from session ${sessionId}.`);
    } finally {
      await sessionReceiver.close();
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.log("purgeMessagesAdvanced sample - Error occurred: ", err);
  process.exit(1);
});
