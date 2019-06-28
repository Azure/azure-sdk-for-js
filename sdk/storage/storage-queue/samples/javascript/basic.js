/*
 Setup: Enter your storage account name and shared key in main()
*/

const {
  QueueServiceClient,
  newPipeline,
  SharedKeyCredential,
  AnonymousCredential,
  HttpPipelineLogLevel,
  RawTokenCredential
} = require("../.."); // Change to "@azure/storage-queue" in your package

class ConsoleHttpPipelineLogger {
  constructor(minimumLogLevel) {
    this.minimumLogLevel = minimumLogLevel;
  }
  log(logLevel, message) {
    const logMessage = `${new Date().toISOString()} ${HttpPipelineLogLevel[logLevel]}: ${message}`;
    switch (logLevel) {
      case HttpPipelineLogLevel.ERROR:
        // tslint:disable-next-line:no-console
        console.error(logMessage);
        break;
      case HttpPipelineLogLevel.WARNING:
        // tslint:disable-next-line:no-console
        console.warn(logMessage);
        break;
      case HttpPipelineLogLevel.INFO:
        // tslint:disable-next-line:no-console
        console.log(logMessage);
        break;
    }
  }
}

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use RawTokenCredential with OAuth token.  You can find more
  // TokenCredential implementations in the @azure/identity library
  // to use client secrets, certificates, or managed identities for
  // authentication.
  const tokenCredential = new RawTokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential, {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO),
    retryOptions: {
      maxTries: 4
    }, // Retry options
    telemetry: {
      value: "BasicSample/V11.0.0"
    } // Customized telemetry string
  });

  // List queues
  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net`,
    pipeline
  );

  console.log(`List queues`);
  let i = 1;
  for await (const item of queueServiceClient.listQueues()) {
    console.log(`Queue ${i++}: ${item.name}`);
  }

  // Create a new queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );

  // Enqueue a message into the queue using the enqueue method.
  const messagesClient = queueClient.getMessagesClient();
  const enqueueQueueResponse = await messagesClient.enqueue("Hello World!");
  console.log(
    `Enqueue message successfully, service assigned message Id: ${enqueueQueueResponse.messageId}, service assigned request Id: ${enqueueQueueResponse.requestId}`
  );

  // Peek a message using peek method.
  const peekQueueResponse = await messagesClient.peek();
  console.log(`The peeked message is: ${peekQueueResponse.peekedMessageItems[0].messageText}`);

  // You de-queue a message in two steps. Call GetMessage at which point the message becomes invisible to any other code reading messages
  // from this queue for a default period of 30 seconds. To finish removing the message from the queue, you call DeleteMessage.
  // This two-step process ensures that if your code fails to process a message due to hardware or software failure, another instance
  // of your code can get the same message and try again.
  const dequeueResponse = await messagesClient.dequeue();
  if (dequeueResponse.dequeuedMessageItems.length == 1) {
    const dequeueMessageItem = dequeueResponse.dequeuedMessageItems[0];
    console.log(`Processing & deleting message with content: ${dequeueMessageItem.messageText}`);
    const messageIdClient = messagesClient.getMessageIdClient(dequeueMessageItem.messageId);
    const deleteMessageResponse = await messageIdClient.delete(dequeueMessageItem.popReceipt);
    console.log(
      `Delete message succesfully, service assigned request Id: ${deleteMessageResponse.requestId}`
    );
  }

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
