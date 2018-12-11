# Azure Storage SDK V10 for JavaScript - Queue

[![npm version](https://badge.fury.io/js/%40azure%2Fstorage-queue.svg)](https://badge.fury.io/js/%40azure%2Fstorage-queue)

## Introduction

This project provides a SDK in JavaScript that makes it easy to consume Microsoft Azure Storage services.

Please note that this version of the SDK is a compete overhaul of the current [Azure Storage SDK for Node.js and JavaScript in Browsers](https://github.com/azure/azure-storage-node), and is based on the new Storage SDK architecture.

### Features

* Queue Storage
  * Get/Set Queue Service Properties
  * Create/List/Delete Queues
  * Enqueue/Dequeue/Peek/Clear/Update/Delete Queue Messages
* Features new
  * Asynchronous I/O for all operations using the async methods
  * HttpPipeline which enables a high degree of per-request configurability
  * 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This SDK is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=6.5) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).
Or you can load separate polyfills for missed ES feature(s).
This library depends on following ES6 features which need external polyfills loaded.

* `Promise`
* `String.prototype.startsWith`
* `String.prototype.endsWith`
* `String.prototype.repeat`
* `String.prototype.includes`

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting start with this SDK, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

* Shared Key Authorization based on account name and account key
  * `SharedKeyCredential`
* Shared Access Signature(SAS) generation
  * `generateAccountSASQueryParameters()`
  * `generateQueueSASQueryParameters()`

## Getting Started

### NPM

The preferred way to install the Azure Storage SDK for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

```bash
npm install @azure/storage-queue
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as Azure from "@azure/storage-queue";
```

Or

```JavaScript
const Azure = require("@azure/storage-queue");
```

### JavaScript Bundle

To use the SDK with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage.queue.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

* `azqueue`

#### Download

Download latest released JS bundles from links in the [GitHub release page](https://github.com/Azure/azure-storage-js/releases). Or from following links directly:

* Queue [https://aka.ms/downloadazurestoragejsqueue](https://aka.ms/downloadazurestoragejsqueue)

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/zh-cn/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

* Allowed origins: \*
* Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
* Allowed headers: \*
* Exposed headers: \*
* Maximum age (seconds): 86400

## SDK Architecture

The Azure Storage SDK for JavaScript provides low-level and high-level APIs.

* ServiceURL, QueueURL, MessagesURL and MessageIdURL objects provide the low-level API functionality and map one-to-one to the [Azure Storage Queue REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/queue-service-rest-api).

## Code Samples

```javascript
const {
    Aborter,
    QueueURL,
    MessagesURL,
    MessageIdURL,
    ServiceURL,
    StorageURL,
    SharedKeyCredential,
    AnonymousCredential,
    TokenCredential
} = require(".."); // Change to "@azure/storage-queue" in your package

async function main() {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";

    // Use SharedKeyCredential with storage account and account key
    const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

    // Use TokenCredential with OAuth token
    const tokenCredential = new TokenCredential("token");
    tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential

    // Use AnonymousCredential when url already includes a SAS signature
    const anonymousCredential = new AnonymousCredential();

    // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
    const pipeline = StorageURL.newPipeline(sharedKeyCredential, {
        // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
        // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
        retryOptions: { maxTries: 4 }, // Retry options
        telemetry: { value: "BasicSample V10.0.0" } // Customized telemetry string
    });

    // List queues
    const serviceURL = new ServiceURL(
        // When using AnonymousCredential, following url should include a valid SAS or support public access
        `https://${account}.queue.core.windows.net`,
        pipeline
    );

    console.log(`List queues`);
    let marker;
    do {
        const listQueuesResponse = await serviceURL.listQueuesSegment(
            Aborter.none,
            marker
        );

        marker = listQueuesResponse.nextMarker;
        for (const queue of listQueuesResponse.queueItems) {
            console.log(`Queue: ${queue.name}`);
        }
    } while (marker);

    // Create a new queue
    const queueName = `newqueue${new Date().getTime()}`;
    const queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    const createQueueResponse = await queueURL.create(Aborter.none);
    console.log(
        `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
    );

    // Enqueue a message into the queue using the enqueue method.
    const messagesURL = MessagesURL.fromQueueURL(queueURL);
    const enqueueQueueResponse = await messagesURL.enqueue(Aborter.none, "Hello World!");
    console.log(
        `Enqueue message successfully, service assigned message Id: ${enqueueQueueResponse.messageId}, service assigned request Id: ${enqueueQueueResponse.requestId}`
    );

    // Peek a message using peek method.
    const peekQueueResponse = await messagesURL.peek(Aborter.none);
    console.log(`The peeked message is: ${peekQueueResponse.peekedMessageItems[0].messageText}`);

    // You de-queue a message in two steps. Call GetMessage at which point the message becomes invisible to any other code reading messages 
    // from this queue for a default period of 30 seconds. To finish removing the message from the queue, you call DeleteMessage. 
    // This two-step process ensures that if your code fails to process a message due to hardware or software failure, another instance 
    // of your code can get the same message and try again. 
    const dequeueResponse = await messagesURL.dequeue(Aborter.none);
    if (dequeueResponse.dequeuedMessageItems.length == 1) {
        const dequeueMessageItem = dequeueResponse.dequeuedMessageItems[0];
        console.log(`Processing & deleting message with content: ${dequeueMessageItem.messageText}`);
        const messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, dequeueMessageItem.messageId);
        const deleteMessageResponse = await messageIdURL.delete(Aborter.none, dequeueMessageItem.popReceipt);
        console.log(`Delete message succesfully, service assigned request Id: ${deleteMessageResponse.requestId}`);
    }

    // Delete the queue.
    const deleteQueueResponse = await queueURL.delete(Aborter.none);
    console.log(`Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
    .then(() => {
        console.log("Successfully executed sample.");
    })
    .catch(err => {
        console.log(err.message);
    });
```

## More Code Samples

* [Queue Storage Examples](https://github.com/azure/azure-storage-js/tree/master/queue/samples)
* [Queue Storage Examples - Test Cases](https://github.com/azure/azure-storage-js/tree/master/queue/test/)

## License

This project is licensed under MIT.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
