// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.
*/

const { EventHubProducerClient } = require("@azure/event-hubs");
const { InteractiveBrowserCredential } = require("@azure/identity");
const {
  appClientId,
  appTenantId,
  eventHubName,
  fullyQualifiedNamespace
} = require("./configuration");

const contentContainer = document.getElementById("sendContent");
function outputLog(text) {
  const currentContent = contentContainer.value;
  contentContainer.value = `${currentContent}${text}\n`;
}

async function send() {
  const credential = new InteractiveBrowserCredential({
    tenantId: appTenantId,
    clientId: appClientId
  });

  const producer = new EventHubProducerClient(fullyQualifiedNamespace, eventHubName, credential);

  const eventsToSend = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  try {
    // By not specifying a partition ID or a partition key we allow the server to choose
    // which partition will accept this message.
    //
    // This pattern works well if the consumers of your events do not have any particular
    // requirements about the ordering of batches against other batches or if you don't care
    // which messages are assigned to which partition.
    //
    // If you would like more control you can pass either a `partitionKey` or a `partitionId`
    // into the createBatch() `options` parameter which will allow you full control over the
    // destination.
    const batchOptions = {};
    let batch = await producer.createBatch(batchOptions);
    outputLog(`Created a batch.`);
    let numEventsSent = 0;
    // add events to our batch
    let i = 0;
    while (i < eventsToSend.length) {
      // messages can fail to be added to the batch if they exceed the maximum size configured for
      // the EventHub.
      const isAdded = batch.tryAdd({ body: eventsToSend[i] });
      if (isAdded) {
        outputLog(`Added event "${i}" to the batch.`);
        ++i;
        continue;
      } else {
        outputLog(`Failed to add event "${i}" to the batch.`);
      }
      if (batch.count === 0) {
        // If we can't add it and the batch is empty that means the message we're trying to send
        // is too large, even when it would be the _only_ message in the batch.
        //
        // At this point you'll need to decide if you're okay with skipping this message entirely
        // or find some way to shrink it.
        outputLog(`Message was too large and can't be sent until it's made smaller. Skipping...`);
        ++i;
        continue;
      }
      // otherwise this just signals a good spot to send our batch
      outputLog(`Batch is full - sending ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch);
      numEventsSent += batch.count;
      // and create a new one to house the next set of messages
      batch = await producer.createBatch(batchOptions);
    }
    // send any remaining messages, if any.
    if (batch.count > 0) {
      outputLog(`Sending remaining ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch);
      numEventsSent += batch.count;
    }
    outputLog(`Sent ${numEventsSent} events`);
    if (numEventsSent !== eventsToSend.length) {
      throw new Error(`Not all messages were sent (${numEventsSent}/${eventsToSend.length})`);
    }
  } catch (err) {
    outputLog("Error when creating & sending a batch of events: ", err);
  }
  await producer.close();
}

module.exports = {
  send
};
