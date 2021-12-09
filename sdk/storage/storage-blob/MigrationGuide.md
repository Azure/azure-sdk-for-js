# Guide for migrating to `@azure/storage-blob` v12 from `azure-storage`

This guide is intended to assist in the migration to version 12 of `@azure/storage-blob` from the legacy `azure-storage` package. It will focus on side-by-side comparisons for similar operations between the two packages.

We assume that you are familiar with `azure-storage`. If you are new to the Azure Storage Blob client library for JavaScript, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/samples) rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
- [Important changes](#important-changes)
  - [Package name and structure](#package-name-and-structure)
  - [Constructing the clients](#constructing-the-clients)
    - [Constructing the clients with connection string](#constructing-the-clients-with-connection-string)
    - [Constructing the clients with AAD token credentials](#constructing-the-clients-with-aad-token-credentials)
  - [Creating a container](#creating-a-container)
  - [Uploading a blob to the container](#uploading-a-blob-to-the-container)
  - [Fetching properties of a blob](#fetching-properties-of-a-blob)
  - [Listing blobs from the container](#listing-blobs-from-the-container)
  - [Sequential actions](#sequential-actions)
- [Additional samples](#additional-samples)

## Migration benefits

As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that TypeScript clients have a natural and idiomatic feel with respect to the TypeScript and JavaScript ecosystems. The new `@azure/storage-blob` client library follows these guidelines.

### Cross Service SDK improvements

The modern `@azure/storage-blob` client library is also benefited from the cross-service improvements made to the Azure development experience, such as

- A unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- Use of promises rather than callbacks for a simplified programming experience
- Use of async iterators in paging APIs

## Important changes

### Package name and structure

The modern client library is named `@azure/storage-blob` following the [naming conventions](https://azure.github.io/azure-sdk/typescript_design.html) for the new libraries across all Azure services. The legacy client library was named `azure-storage`.

The legacy library `azure-storage` grouped functionality to work with multiple services such as `Blob`, `Queue`, `Files` and `Tables` in the same package. The new `@azure/storage-blob` package is dedicated to `Blob` service. Similary, dedicated packages are available for the other storage services as well: `@azure/data-tables`, `@azure/storage-queue`, `@azure/storage-blob-changefeed`, `@azure/storage-file-datalake` and `@azure/storage-file-share`. This reduces the bundle size if you were to use any of these packages in browser applications and provides more granular control on which dependencies to take on your project.

### Constructing the clients

#### Constructing the clients with connection string

Previously in `azure-storage`, you can pass the connection string to the function `createBlobService` get an instance of the `BlobService` in order to perform operations on blobs and containers.

```javascript
const azure = require("azure-storage");
const blobService = azure.createBlobService("<connection-string>");
```

Now, in `@azure/storage-blob`, you can pass the connection string to the static method `BlobServiceClient.fromConnectionString` to create an instance of `BlobServiceClient` to perform operations on blobs and containers.

```javascript
const { BlobServiceClient } = require("@azure/storage-blob");
const blobService = BlobServiceClient.fromConnectionString("<connection-string>");
```

#### Constructing the clients with AAD token credentials

Both `azure-storage` and `@azure/storage-blob` supports to access `Blob` service by creating the client with different types of credentials: anonymous, account key credentials, sas token, and AAD token credentials. This section shows the use of AAD token credentials.

Previously in `azure-storage`, you can invoke method `createBlobServiceWithTokenCredential` to get an instance of the `BlobService` with access token for your AAD credentials.

```javascript
const azure = require("azure-storage");
const tokenCredential = new azure.TokenCredential("<access-token>");
const blobService = azure.createBlobServiceWithTokenCredential(
  "https://<account-name>.blob.core.windows.net",
  tokenCredential
);
```

Now, for `@azure/storage-blob`, you can pass any of the [credentials from the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md) to the constructor of `BlobServiceClient` to make use of your AAD credentials. In following sample, it creates an instance of `DefaultAzureCredential` which reads credentials from environment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET`, and creates a `BlobServiceClient` to consume the credential instance.

```javascript
const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
const tokenCredential = new DefaultAzureCredential();
const blobService = new BlobServiceClient(
  "https://<account-name>.blob.core.windows.net",
  tokenCredential
);
```

### Creating a container

Previously in `azure-storage`, you would use a `BlobService` instance to create a container. The `createContainer` method would take a callback to execute once the blob container has been created. This forces sequential operations to be inside the callback, potentially creating a callback chain.

```javascript
const azure = require("azure-storage");
const blobService = azure.createBlobService("<connection-string>");

const containerName = "<container-name>";
blobService.createContainer(containerName, function() {
  console.log(`Container created`);
});
```

With `@azure/storage-blob` you can access to all container level operations directly from the `BlobServiceClient`. Because the blob service client is not affinitized to any one container, it is ideal for scenarios where you need to create, delete, or list more than one blob container.

```javascript
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const containerName = "<container-name>";
const blobEndpoint = "https://<account-name>.blob.core.windows.net";

const blobService = new BlobServiceClient(
  blobEndpoint,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the container with `<container-name>`
const containerClient = await blobService.createContainer(containerName);
console.log(`Container created`);
```

If your intention is to work only in the context of a single container, it's also possible to create a container from the `ContainerClient`.

```javascript
const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const containerUrl = "https://<account-name>.blob.core.windows.net/<container-name>";

const containerClient = new ContainerClient(
  containerUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the container with `<container-name>`
const response = await containerClient.create();
console.log(`Container created`);
```

### Uploading a blob to the container

Previously in `azure-storage`, the `BlobService` class would have methods for operations for each blob type. For example, `BlobService.createBlockBlobFromLocalFile()` would be used to upload from a local file to a block blob.

```javascript
const azure = require("azure-storage");
const containerName = "<container-name>";
const blobName = "<blob-name>";
const filePath = "<local-file-path>";
const blobService = azure.createBlobService("<connection-string>");

blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, function() {
  console.log("Blob uploaded");
});
```

Now in the new `@azure/storage-blob` SDK, we have dedicated classes `BlockBlobClient`, `PageBlobClient` and `AppendBlobClient` for each blob type. For example, Method `BlockBlobClient.uploadFile` can be used to upload from a local file to a block blob.

```javascript
const { BlockBlobClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const filePath = "<local-file-path>";
const blobUrl = "https://<account-name>.blob.core.windows.net/<container-name>/<blob-name>";

const blockBlobClient = new BlockBlobClient(
  blobUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await blockBlobClient.uploadFile(filePath);
```

### Fetching properties of a blob

Previously in `azure-storage`, method `getBlobProperties` in a `BlobService` instance can be used to fetch properties of a blob.

```javascript
const azure = require("azure-storage");
const blobService = azure.createBlobService("<connection-string>");

const containerName = "<container-name>";
const blobName = "<blob-name>";
blobService.getBlobProperties(containerName, blobName, function(error, result) {
  if (!error) {
    // result contains the blob properties
    console.log(result);
  }
});
```

Now with `@azure/storage-blob`, we use method `getProperties` in an instance of `BlobClient`, the return type is a Promise of the properties which can be awaited, making the code cleaner.

```javascript
const { BlobClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const blobUrl = "https://<account-name>.blob.core.windows.net/<container-name>/<blob-name>";

const blobClient = new BlobClient(
  blobUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

const blobProperties = await blobClient.getProperties();
console.log(blobProperties);
```

### Listing blobs from the container

Previously in `azure-storage`, there is no built-in way to handle pagination when listing blobs in a container. Users have to use `continuationToken` to get the next page of result then retrieve the items.

```javascript
const azure = require("azure-storage");
const blobService = azure.createBlobService("<connection-string>");
const containerName = "<container-name>";

let blobs = [];

function listBlobs(continuationToken, callback) {
  blobService.listBlobsSegmented(containerName, continuationToken, function(error, result) {
    blobs.push.apply(blobs, result.entries);
    const continuationToken = result.continuationToken;
    if (continuationToken) {
      listBlobs(continuationToken, callback);
    } else {
      console.log("completed listing all blobs");
      callback();
    }
  });
}

listBlobs(null, function() {
  console.log(blobs);
});
```

In the new `@azure/storage-blob` we return a `PagedAsyncIterableIterator` that handles the details of pagination internally, simplifying the task of iteration.

```javascript
const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const containerUrl = "https://<account-name>.blob.core.windows.net/<container-name>";

const containerClient = new ContainerClient(
  containerUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

const iterator = containerClient.listBlobsFlat();
let blobItem = await iterator.next();
while (!blobItem.done) {
  console.log(blobItem.value);
  blobItem = await iterator.next();
}
```

### Sequential actions

Previously in `azure-storage`, all the operations took a callback which would be executed once the operation completed. For example, to create a container and then upload two blobs we would like to write the following nested code

```javascript
const azure = require("azure-storage");
const blobService = azure.createBlobService("<connection-string>");
const containerName = "<container-name>";
const firstBlobName = "<first-blob-name>";
const secondBlobName = "<second-blob-name>";
const blobContent = "Hello, World!";

blobService.createContainer(containerName, function() {
  blobService.createBlockBlobFromText(containerName, firstBlobName, blobContent, function() {
    blobService.createBlockBlobFromText(containerName, secondBlobName, blobContent, function() {
      console.log("Uploaded blobs");
    });
  });
});
```

With `@azure/storage-blob` we work with promises which makes the programming experience better, leveraging async/await we no longer need nested code blocks to perform sequential actions

```javascript
const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const containerUrl = "https://<account-name>.blob.core.windows.net/<container-name>";
const firstBlobName = "<first-blob-name>";
const secondBlobName = "<second-blob-name>";
const blobContent = "Hello, World!";

const containerClient = new ContainerClient(
  containerUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await containerClient.create();
await containerClient.getBlockBlobClient(firstBlobName).upload(blobContent, blobContent.length);
await containerClient.getBlockBlobClient(secondBlobName).upload(blobContent, blobContent.length);
console.log("Uploaded blobs");
```

## Additional samples

More samples can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/samples)
