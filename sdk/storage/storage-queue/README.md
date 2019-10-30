# Azure Storage Queue client library for JavaScript

Azure Storage Queue provides cloud messaging between application components. In designing applications for scale, application components are often decoupled, so that they can scale independently. Queue storage delivers asynchronous messaging for communication between application components, whether they are running in the cloud, on the desktop, on an on-premises server, or on a mobile device. Queue storage also supports managing asynchronous tasks and building process work flows.

This project provides a client library in JavaScript that makes it easy to consume the Azure Storage Queue service.

Use the client libraries in this package to:
- Get/Set Queue Service Properties
- Create/List/Delete Queues
- Send/Receive/Peek/Clear/Update/Delete Queue Messages

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue) |
[Package (npm)](https://www.npmjs.com/package/@azure/storage-queue) |
[API Reference Documentation](https://azure.github.io/azure-sdk-for-js/storage.html#azure-storage-queue) |
[Product documentation](https://docs.microsoft.com/azure/storage/queues/storage-queues-introduction) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples) |
[Azure Storage Queue REST APIs](https://docs.microsoft.com/rest/api/storageservices/queue-service-rest-api)

## Key concepts

A Queue is a data store within an Azure Storage Queue service account for sending/receiving messages
between connected clients.

Key data types in our library related to these services are:

- A `QueueServiceClient` represents a connection (via a URL) to a given storage account in the Azure Storage Queue service and provides APIs for manipulating its queues. It is authenticated to the service and can be used to create `QueueClient` objects, as well as create, delete, list queues from the service.
- A `QueueClient` represents a single queue in the storage acccount. It can be used to manipulate the queue's messages, for example to send, receive, and peek messages in the queue.

## Getting started

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://docs.microsoft.com/azure/storage/queues/storage-quickstart-queues-portal) to use this package. If you are using this package in a Node.js application, then Node.js version 8.0.0 or higher is required.

### Install the pacakge

The preferred way to install the Azure Storage Queue client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-queue
```

### Authenticating with Azure Active Directory

The Azure Queue Storage service supports the use of Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`](/sdk/identity/identity/README.md) provides more details and samples to get you started.

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
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill forcely to enable [ES6 behavior](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `StorageSharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateQueueSASQueryParameters()`

### JavaScript Bundle

To use this client library in the browser, you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md).

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Examples

### Import the package

To use the clients, import the package into your file:

```javascript
const AzureStorageQueue = require("@azure/storage-queue");
```

Alternatively, selectively import only the types you need:

```javascript
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
```

### Create the queue service client

The `QueueServiceClient` requires a URL to the queue service and an access credential. It also
optionally accepts some settings in the `options` parameter.

- **Recommended way to instantiate a `QueueServiceClient` - with `DefaultAzureCredential` from `@azure/identity` package**

  Setup : Reference - Authorize access to blobs and queues with Azure Active Directory from a client application - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-app

  - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user

    - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
    - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
    - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.

  - Grant access to Azure Storage Queue data with RBAC in the Azure Portal

    - RBAC roles for blobs and queues - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-rbac-portal.
    - In the azure portal, go to your storage-account and assign **Storage Queue Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).

  - Environment setup for the sample
    - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
    - Make sure you have `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` as environment variables to successfully execute the sample (can leverage process.env).

  ```javascript
  const { DefaultAzureCredential } = require("@azure/identity");
  const { QueueServiceClient } = require("@azure/storage-queue");

  const account = "<account>";
  const credential = new DefaultAzureCredential();

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    credential
  );
  ```

  [Note - Above steps are only for Node.js]

- Alternatively, you instantiate a `QueueServiceClient` with a `StorageSharedKeyCredential` by passing account-name and account-key as arguments. (account-name and account-key can be obtained from the azure portal)
  [ONLY AVAILABLE IN NODE.JS RUNTIME]

  ```javascript
  const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

  // Enter your storage account name and shared key
  const account = "<account>";
  const accountKey = "<accountkey>";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

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
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

async function main() {
  let iter1 = queueServiceClient.listQueues();
  let i = 1;
  for await (const item of iter1) {
    console.log(`Queue${i}: ${item.name}`);
    i++;
  }
}

main();
```

Alternatively without `for-await-of`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

async function main() {
  let iter2 = await queueServiceClient.listQueues();
  let i = 1;
  let item = await iter2.next();
  while (!item.done) {
    console.log(`Queue ${i++}: ${item.value.name}`);
    item = await iter2.next();
  }
}

main();
```

For a complete sample on iterating queues please see [samples/typescript/iterators.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/iterators.ts).

### Create a new queue

Use `QueueServiceClient.getQueueClient()` function to create a new queue.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "aNewQueue";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );
}

main();
```

### Send a message to the queue

Use `sendMessage()` to add a message to the queue:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "aNewQueue";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  // Send a message into the queue using the sendMessage method.
  const sendMessageResponse = await queueClient.sendMessage("Hello World!");
  console.log(
    `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
  );
}

main();
```

### Peek a message

`QueueClient.peekMessages()` allows looking at one or more messages in front of the queue. This call
doesn't prevent other code from accessing peeked messages.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "aNewQueue";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const peekMessagesResponse = await queueClient.peekMessages();
  console.log(`The peeked message is: ${peekMessagesResponse.peekedMessageItems[0].messageText}`);
}

main();
```

### Processing a message

Messages are processed in two steps.

- First call `queueClient.receiveMessages()`. This makes the messages invisible to other code reading messages from this queue for a default period of 30 seconds.
- When processing of a message is done, call `queueClient.deleteMessage()` with the message's `popReceipt`.

If your code fails to process a message due to hardware or software failure, this two-step process ensures that another instance of your code can get the same message and try again.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "aNewQueue";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const response = await queueClient.receiveMessages();
  if (response.receivedMessageItems.length == 1) {
    const receivedMessageItem = response.receivedMessageItems[0];
    console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);
    const deleteMessageResponse = await queueClient.deleteMessage(
      receivedMessageItem.messageId,
      receivedMessageItem.popReceipt
    );
    console.log(
      `Delete message succesfully, service assigned request Id: ${deleteMessageResponse.requestId}`
    );
  }
}

main();
```

### Delete a queue

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "aNewQueue";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Deleted queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

main();
```

A complete example of basic scenarios is at [samples/basic.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/basic.ts).

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples

- [Queue Storage Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples)
- [Queue Storage Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/test)

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
