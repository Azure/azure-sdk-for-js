// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    ServiceBusMessage,
    ServiceBusMessageBatch,
    ServiceBusReceivedMessage,
    CreateQueueOptions,
    ProcessErrorArgs
} from '@azure/service-bus';
import {
    ServiceBusClient,
    ServiceBusAdministrationClient
} from '@azure/service-bus';
import { DefaultAzureCredential } from '@azure/identity';


// Azure Service Bus configuration
const serviceBusNamespace = 'jssdktest';
const queueName = 'harshan';
const fullyQualifiedNamespace = `${serviceBusNamespace}.servicebus.windows.net`;

// Create a credential using Entra ID (Azure AD)
const credential = new DefaultAzureCredential();

// Define message interface
interface MessageData {
    body: string | Record<string, unknown>;
    subject: string;
    messageId: string;
}

async function main(): Promise<void> {
    try {
        console.log('Azure Service Bus Sample with Entra ID authentication');

        // Step 1: Create a queue (if it doesn't exist)
        console.log(`\n1. Creating queue '${queueName}' if it doesn't exist...`);
        await createQueueIfNotExists();

        // Step 2: Send messages to the queue
        console.log(`\n2. Sending messages to queue '${queueName}'...`);
        await sendMessages();

        // Step 3: Receive messages using subscribe method
        console.log(`\n3. Receiving messages from queue '${queueName}'...`);
        await receiveMessages();

        console.log('\nSample completed successfully.');
    } catch (err) {
        console.error('Error occurred:', err instanceof Error ? err.message : err);
    }
}

async function createQueueIfNotExists(): Promise<void> {
    // Create a ServiceBusAdministrationClient to manage entities
    const adminClient = new ServiceBusAdministrationClient(
        fullyQualifiedNamespace,
        credential
    );

    try {
        // Check if the queue exists
        const queueExists = await adminClient.queueExists(queueName);

        if (!queueExists) {
            console.log(`Queue '${queueName}' does not exist. Creating it...`);
            const queueOptions: CreateQueueOptions = {
                deadLetteringOnMessageExpiration: true,
                defaultMessageTimeToLive: 'P14D', // 14 days
                lockDuration: 'PT30S', // 30 seconds
                maxDeliveryCount: 10
            };

            await adminClient.createQueue(queueName, queueOptions);
            console.log(`Queue '${queueName}' created successfully.`);
        } else {
            console.log(`Queue '${queueName}' already exists.`);
        }
    } catch (err) {
        console.error(`Error creating queue: ${err instanceof Error ? err.message : err}`);
        throw err;
    }
}

async function sendMessages(): Promise<void> {
    // Create a ServiceBusClient
    const serviceBusClient = new ServiceBusClient(
        fullyQualifiedNamespace,
        credential
    );

    // Get a sender for the queue
    const sender = serviceBusClient.createSender(queueName);

    try {
        // Create batch of messages
        const batch: ServiceBusMessageBatch = await sender.createMessageBatch();

        // Add messages to the batch
        const messages: MessageData[] = [
            { body: 'Message 1', subject: 'Sample message 1', messageId: '1' },
            { body: 'Message 2', subject: 'Sample message 2', messageId: '2' },
            { body: 'Message 3', subject: 'Sample message 3', messageId: '3' },
            {
                body: { name: 'Message 4', content: 'JSON payload' },
                subject: 'Sample message 4',
                messageId: '4'
            }
        ];

        for (const message of messages) {
            const sbMessage: ServiceBusMessage = {
                body: message.body,
                subject: message.subject,
                messageId: message.messageId
            };

            if (!batch.tryAddMessage(sbMessage)) {
                // If the batch is full, send it and create a new one
                await sender.sendMessages(batch);
                console.log(`Sent a batch of messages to ${queueName}`);

                // Create a new batch and try to add the message again
                const newBatch = await sender.createMessageBatch();
                if (!newBatch.tryAddMessage(sbMessage)) {
                    throw new Error("Message too big to fit in a batch");
                }
            }
        }

        // Send the batch if it's not empty
        if (batch.count > 0) {
            await sender.sendMessages(batch);
            console.log(`Sent a batch of ${batch.count} messages to ${queueName}`);
        }
    } catch (err) {
        console.error(`Error sending messages: ${err instanceof Error ? err.message : err}`);
        throw err;
    } finally {
        // Close the sender
        await sender.close();
        await serviceBusClient.close();
    }
}

async function receiveMessages(): Promise<void> {
    // Create a ServiceBusClient
    const serviceBusClient = new ServiceBusClient(
        fullyQualifiedNamespace,
        credential
    );

    // Get a receiver for the queue
    const receiver = serviceBusClient.createReceiver(queueName);

    // Set up the message handler
    const subscription = receiver.subscribe({
        processMessage: async (message: ServiceBusReceivedMessage) => {
            console.log(`Received message:`);
            console.log(`- MessageId: ${message.messageId}`);
            console.log(`- Subject: ${message.subject}`);
            console.log(`- Body: ${typeof message.body === 'object' ? JSON.stringify(message.body) : message.body}`);
            console.log(`- EnqueuedTime: ${message.enqueuedTimeUtc}`);
            console.log(`- SequenceNumber: ${message.sequenceNumber}`);
            console.log('--------------------------------------');
        },
        processError: async (err: ProcessErrorArgs) => {
            return console.error('Error processing message:', err);
        }
    });

    // The subscription will keep running, let's allow it to receive messages for 30 seconds
    console.log('Waiting 30 seconds to receive messages...');

    return new Promise((resolve) => {
        setTimeout(async () => {
            // Close the subscription after 30 seconds
            await subscription.close();
            console.log('Subscription closed after 30 seconds.');

            // Close the receiver and client
            await receiver.close();
            await serviceBusClient.close();

            resolve();
        }, 30000); // 30 seconds
    });
}

// Run the sample
main().catch((err) => {
    console.error('Error in main function:', err instanceof Error ? err.message : err);
    process.exit(1);
});
