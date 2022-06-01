# Guide for migrating to `@azure/storage-queue` v12 from `azure-storage`

This guide is intended to assist in the migration to version 12 of `@azure/storage-queue` from the legacy `azure-storage` package. It will focus on side-by-side comparisons for similar operations between the two packages.

We assume that you are familiar with `azure-storage`. If you are new to the Azure Storage Queue client library for JavaScript, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/samples) rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
- [Important changes](#important-changes)
  - [Package name and structure](#package-name-and-structure)
  - [Constructing the clients](#constructing-the-clients)
    - [Constructing the clients with connection string](#constructing-the-clients-with-connection-string)
    - [Constructing the clients with AAD token credentials](#constructing-the-clients-with-aad-token-credentials)
  - [Creating a queue](#creating-a-queue)
  - [Adding a message to the queue](#adding-a-message-to-the-queue)
  - [Retrieving message from a queue](#retrieving-message-from-a-queue)
  - [Sequential actions](#sequential-actions)
- [Additional samples](#additional-samples)

## Migration benefits

As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that TypeScript clients have a natural and idiomatic feel with respect to the TypeScript and JavaScript ecosystems. The new `@azure/storage-queue` client library follows these guidelines.

### Cross Service SDK improvements

The modern `@azure/storage-queue` client library is also benefited from the cross-service improvements made to the Azure development experience, such as

- A unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- Use of promises rather than callbacks for a simplified programming experience
- Use of async iterators in paging APIs

## Important changes

### Package name and structure

The modern client library is named `@azure/storage-queue` following the [naming conventions](https://azure.github.io/azure-sdk/typescript_design.html) for the new libraries across all Azure services. The legacy client library was named `azure-storage`.

The legacy library `azure-storage` grouped functionality to work with multiple services such as `Blob`, `Queue`, `Files` and `Tables` in the same package. The new `@azure/storage-queue` package is dedicated to `Queue` service. Similary, dedicated packages are available for the other storage services as well: `@azure/data-tables`, `@azure/storage-blob`, `@azure/storage-blob-changefeed`, `@azure/storage-file-datalake` and `@azure/storage-file-share`. This reduces the bundle size if you were to use any of these packages in browser applications and provides more granular control on which dependencies to take on your project.

### Constructing the clients

#### Constructing the clients with connection string

Previously in `azure-storage`, you can pass the connection string to the function `createQueueService` get an instance of the `QueueService` in order to perform operations on queues.

```javascript
const azure = require("azure-storage");
const queueService = azure.createQueueService("<connection-string>");
```

Now, in `@azure/storage-queue`, you can pass the connection string to the static method `QueueServiceClient.fromConnectionString` to create an instance of `QueueServiceClient` to perform operations on queues.

```javascript
const { QueueServiceClient } = require("@azure/storage-queue");
const queueService = QueueServiceClient.fromConnectionString("<connection-string>");
```

#### Constructing the clients with AAD token credentials

Both `azure-storage` and `@azure/storage-queue` supports to access `Queue` service by creating the client with different types of credentials: anonymous, account key credentials, sas token, and AAD token credentials. This section shows the use of AAD token credentials.

Previously in `azure-storage`, you can invoke method `createQueueServiceWithTokenCredential` to get an instance of the `QueueService` with access token for your AAD credentials.

```javascript
const azure = require("azure-storage");
const tokenCredential = new azure.TokenCredential("<access-token>");
const queueService = azure.createQueueServiceWithTokenCredential(
  "https://<account-name>.queue.core.windows.net",
  tokenCredential
);
```

Now, for `@azure/storage-queue`, you can pass any of the [credentials from the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md) to the constructor of `QueueServiceClient` to make use of your AAD credentials. In following sample, it creates an instance of `DefaultAzureCredential` which reads credentials from environment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET`, and creates a `QueueServiceClient` to consume the credential instance.

```javascript
const { QueueServiceClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require("@azure/identity");
const tokenCredential = new DefaultAzureCredential();
const queueService = new QueueServiceClient(
  "https://<account-name>.queue.core.windows.net",
  tokenCredential
);
```

### Creating a queue

Previously in `azure-storage`, you would use a `QueueService` instance to create a queue. The `createQueue` method would take a callback to execute once the queue has been created. This forces sequential operations to be inside the callback, potentially creating a callback chain.

```javascript
const azure = require("azure-storage");
const queueService = azure.createQueueService("<connection-string>");

const queueName = "<queue-name>";
queueService.createQueue(queueName, function() {
  console.log(`Queue created`);
});
```

With `@azure/storage-queue` you can access to all queue level operations directly from the `QueueServiceClient`. Because the queue service client is not affinitized to any one queue, it is ideal for scenarios where you need to create, delete, or list more than one queue.

```javascript
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const queueName = "queue2";
const queueEndpoint = "https://<account-name>.queue.core.windows.net";

const queueService = new QueueServiceClient(
  queueEndpoint,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the queue with `<queue-name>`
const queueClient = await queueService.createQueue(queueName);
console.log(`Queue created`);
```

If your intention is to work only in the context of a single queue, it's also possible to create a queue from the `QueueClient`.

```javascript
const { QueueClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const queueUrl = "https://<account-name>.queue.core.windows.net/<queue-name>";

const queueClient = new QueueClient(
  queueUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the queue with `<queue-name>`
const response = await queueClient.create();
console.log(`Queue created`);
```

### Adding a message to the queue

Previously in `azure-storage`, a `QueueService` instance would be used for queue operations. Method `createMessage` can be used to add a new message to the back of the queue.

```javascript
const azure = require("azure-storage");
const queueService = azure.createQueueService("<connection-string>");
const queueName = "<queue-name>";
const messageContent = "<message-content>";

queueService.createMessage(queueName, messageContent, function() {
  console.log(`Message sent`);
});
```

Now in the new `@azure/storage-queue` SDK, instances of `QueueClient` would be used for queue operations. Method `sendMessage` can be used to add a new message to the back of the queue.

```javascript
const { QueueClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const queueUrl = "https://<account-name>.queue.core.windows.net/<queue-name>";
const messageContent = "<message-content>";

const queueClient = new QueueClient(
  queueUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await queueClient.sendMessage(messageContent);
console.log(`Message sent`);
```

### Retrieving message from a queue

Previously in `azure-storage`, method `getMessages` in a `QueueService` instance can be used to retrieve one or more message from the front of a queue

```javascript
const azure = require("azure-storage");
const queueService = azure.createQueueService("<connection-string>");
const queueName = "<queue-name>";

queueService.getMessages(queueName, function(error, result) {
  if (!error) {
    console.log(result);
  }
});
```

Now with `@azure/storage-queue`, we use method `receiveMessages` in an instance of `QueueClient`, the return type is a Promise of the messages which can be awaited, making the code cleaner.

```javascript
const { QueueClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const queueUrl = "https://<account-name>.queue.core.windows.net/<queue-name>";
const messageContent = "<message-content>";

const queueClient = new QueueClient(
  queueUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

const result = await queueClient.receiveMessages();
console.log(result.receivedMessageItems);
```

### Sequential actions

Previously in `azure-storage`, all the operations took a callback which would be executed once the operation completed. For example, to create a queue, add a message to the it, retrieve a message from it and then delete the message we would like to write the following nested code

```javascript
const azure = require("azure-storage");
const queueService = azure.createQueueService("<connection-string>");
const queueName = "<queue-name>";
const messageContent = "<message-content>";

queueService.createQueue(queueName, function() {
  queueService.createMessage(queueName, messageContent, function() {
    queueService.getMessages(queueName, function(error, result) {
      if (!error) {
        queueService.deleteMessage(queueName, result[0].messageId, result[0].popReceipt, function(
          error,
          result
        ) {
          console.log("Retrieved and deleted a message");
        });
      }
    });
  });
});
```

With `@azure/storage-queue` we work with promises which makes the programming experience better, leveraging async/await we no longer need nested code blocks to perform sequential actions

```javascript
const { QueueClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
const queueUrl = "https://<account-name>.queue.core.windows.net/<queue-name>";
const messageContent = "<message-content>";

const queueClient = new QueueClient(
  queueUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await queueClient.create();
await queueClient.sendMessage("Hello, world!!111");
const result = await queueClient.receiveMessages();
await queueClient.deleteMessage(
  result.receivedMessageItems[0].messageId,
  result.receivedMessageItems[0].popReceipt
);
console.log("Retrieved and deleted a message");
```

## Additional samples

More samples can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/samples)
