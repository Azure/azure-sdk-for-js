# Azure Storage client library for JavaScript - Queue

Azure Queue storage provides cloud messaging between application components. In designing applications for scale, application components are often decoupled, so that they can scale independently. Queue storage delivers asynchronous messaging for communication between application components, whether they are running in the cloud, on the desktop, on an on-premises server, or on a mobile device. Queue storage also supports managing asynchronous tasks and building process work flows.

This project provides a client library in JavaScript that makes it easy to consume Microsoft Azure Queue Storage service.

Version: 12.0.0-preview.5

- [Package (npm)](https://www.npmjs.com/package/@azure/storage-queue/v/12.0.0-preview.5)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples)
- [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/storage-queue/index.html)
- [Product documentation](https://docs.microsoft.com/azure/storage/queues/storage-queues-introduction)
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue)
- [Azure Storage Queue REST APIs](https://docs.microsoft.com/rest/api/storageservices/queue-service-rest-api)

## Key concepts

### Features

- Queue Storage
  - Get/Set Queue Service Properties
  - Create/List/Delete Queues
  - Enqueue/Dequeue/Peek/Clear/Update/Delete Queue Messages
- Features new
  - Asynchronous I/O for all operations using the async methods
  - HttpPipeline which enables a high degree of per-request configurability
  - 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).

You can also load separate polyfills for missed ES feature(s).
This library depends on following ES features which need external polyfills loaded.

- `Promise`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.repeat`
- `String.prototype.includes`
- `Array.prototype.includes`
- `Object.assign`
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill forcely to enable [ES6 behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `SharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateQueueSASQueryParameters()`

## Getting started

### NPM

The preferred way to install the Azure Queue Storage client library for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

```bash
npm install @azure/storage-queue@12.0.0-preview.5
```

In your TypeScript or JavaScript file, import via following:

```javascript
import * as AzureStorageQueue from "@azure/storage-queue";
```

Or

```javascript
const AzureStorageQueue = require("@azure/storage-queue");
```

### JavaScript bundle

To use the library with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage-queue.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

- `azqueue`

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Examples

### Import types

You can use the `const Azure = require("@azure/storage-queue");` shown above then use types and functions from `Azure`.
Or you can selectively import certain types,

```javascript
const { QueueServiceClient, SharedKeyCredential } = require("@azure/storage-queue");
);
```

### Create the queue service client

Use the constructor to create an instance of `QueueServiceClient`, passing in the credential, and options to configure the HTTP pipeline (optional).

```javascript
// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";

// Use SharedKeyCredential with storage account and account key
// SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  sharedKeyCredential,
  {
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "BasicSample/V11.0.0" } // Customized telemetry string
  }
);
```

### List queues in this account

Use `QueueServiceClient.listQueues()` function to iterate the queues,
with the new `for-await-of` syntax:

```javascript
let iter1 = queueServiceClient.listQueues();
let i = 1;
for await (const item of iter1) {
  console.log(`Queue${i}: ${item.name}`);
  i++;
}
```

Alternatively without `for-await-of`:

```javascript
let iter2 = await queueServiceClient.listQueues();
let i = 1;
let item = await iter2.next();
while (!item.done) {
  console.log(`Queue ${i++}: ${item.value.name}`);
  item = await iter2.next();
}
```

For a complete sample on iterating queues please see [samples/typescript/iterators.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/iterators.ts).

### Create a new queue

Use `QueueServiceClient.getQueueClient()` function to create a new queue.

```javascript
const queueName = `newqueue${new Date().getTime()}`;
const queueClient = queueServiceClient.getQueueClient(queueName);
const createQueueResponse = await queueClient.create();
console.log(
  `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
);
```

### Send a message to the queue

Use `sendMessage()` to add a message to the queue:

```javascript
// Send a message into the queue using the sendMessage method.
const sendMessageResponse = await queueClient.sendMessage("Hello World!");
console.log(
  `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
);
```

### Peek a message

`QueueClient.peekMessages()` allows looking at one or more messages in front of the queue. This call
doesn't prevent other code from accessing peeked messages.

```javascript
const peekMessagesResponse = await queueClient.peekMessages();
console.log(`The peeked message is: ${peekMessagesResponse.peekedMessageItems[0].messageText}`);
```

### Processing a message

Messages are processed in two steps.

- First call `queueClient.receiveMessages()`. This makes the messages invisible to other code reading messagse from this queue for a default period of 30 seconds.
- When processing of a message is done, call `queueClient.deleteMessage()` with the message's `popReceipt`.

If your code fails to process a message due to hardware or software failure, this two-step process ensures that another instance of your code can get the same message and try again.

```javascript
const response = await queueClient.receiveMessages();
if (response.receivedMessageItems.length == 1) {
  const receivedMessageItem = response.receivedMessageItems[0];
  console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);
  const deleteMessageResponse = await queueClient.deleteMessage(receivedMessageItem.messageId, receivedMessageItem.popReceipt);
  console.log(
    `Delete message succesfully, service assigned request Id: ${deleteMessageResponse.requestId}`
  );
}
```

### Delete a queue

```javascript
const deleteQueueResponse = await queueClient.delete();
console.log(
  `Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
);
```

A complete example of basic scenarios is at [samples/basic.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/basic.ts).

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Authenticating with Azure Active Directory

If you have [registered an application](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) with an Azure Active Directory tenant, you can [assign it to an RBAC role](https://docs.microsoft.com/azure/storage/common/storage-auth-aad) in your Azure Storage account. This enables you to use the Azure.Identity library to authenticate with Azure Storage as shown in the [azureAdAuth.ts sample](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/azureAdAuth.ts).

## Next steps

More code samples

- [Queue Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples)
- [Queue Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/test)

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
