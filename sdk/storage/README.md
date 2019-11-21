# Azure Storage client library for JavaScript

Azure Storage is a Microsoft-managed service providing cloud storage that is highly available, secure, durable, scalable, and redundant.

This project provides client libraries in JavaScript that makes it easy to consume Microsoft Azure Storage service.

- [Source Code - Blob](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Source Code - File](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share)
- [Source Code - Queue](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue)
- [Product documentation](https://docs.microsoft.com/en-us/azure/storage)
- @azure/storage-blob [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)
- @azure/storage-file-share [Package (npm)](https://www.npmjs.com/package/@azure/storage-file-share/v/12.0.0-preview.6)
- @azure/storage-queue [Package (npm)](https://www.npmjs.com/package/@azure/storage-queue)
- [API Reference documentation](https://azure.github.io/azure-sdk-for-js)
- [Azure Storage REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/)

## Key concepts

### Features

- Blob Storage
  - Get/Set Blob Service Properties
  - Create/List/Delete Containers
  - Create/Read/List/Update/Delete Block Blobs
  - Create/Read/List/Update/Delete Page Blobs
  - Create/Read/List/Update/Delete Append Blobs
- File Storage
  - Get/Set File Service Properties
  - Create/List/Delete File Shares
  - Create/List/Delete File Directories
  - Create/Read/List/Update/Delete Files
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
  - `generateBlobSASQueryParameters()`
  - `generateFileSASQueryParameters()`
  - `generateQueueSASQueryParameters()`
- Parallel uploading and downloading
  - `BlockBlobClient.uploadFile()`
  - `BlockBlobClient.uploadStream()`
  - `BlobClient.downloadToBuffer()`
  - `BlobClient.downloadToFile()`
  - `FileClient.uploadFile()`
  - `FileClient.uploadStream()`
  - `FileClient.downloadToBuffer()`
  - `FileClient.downloadToFile()`

##### Following features, interfaces, classes or functions are only available in browsers

- Parallel uploading and downloading
  - `BlockBlobClient.uploadBrowserData()`
  - `FileClient.uploadBrowserData()`

## Getting Started

The preferred way to install the Azure Storage client libraries for JavaScript is to use the npm package manager. Take "@azure/storage-blob" for example.

Simply type the following into a terminal window:

```bash
npm install @azure/storage-blob
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as AzureStorageBlob from "@azure/storage-blob";
```

Or

```JavaScript
const AzureStorageBlob = require("@azure/storage-blob");
```

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Architecture

The Azure Storage client libraries for JavaScript provides low-level and high-level APIs. Take Blob client library as example:

- ServiceClient, ContainerClient and BlobClient objects provide the low-level API functionality and map one-to-one to the [Azure Storage Blob REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api).

- The high-level APIs provide convenience abstractions such as uploading a large stream to a block blob (using multiple PutBlock requests).

## Examples

## Code Samples

```javascript
const { BlobServiceClient, newPipeline, SharedKeyCredential } = require("@azure/storage-blob");

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
  // to use client secrets, certificates, or managed identities for authentication.

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  for (let index = 0; index < 7; index++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  // 1. List blobs
  let i = 1;
  let iter = await containerClient.listBlobsFlat();
  for await (const blob of iter) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = containerClient.listBlobsFlat();
  let blobItem = await iter.next();
  while (!blobItem.done) {
    console.log(`Blob ${i++}: ${blobItem.value.name}`);
    blobItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list containers by page
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage()) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 20 });
  let response = (await iterator.next()).value;
  do {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    response = (await iterator.next()).value;
  } while (response);

  // 7. Passing the page marker as an argument (similar to the previous example)
  i = 1;
  iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
  response = (await iterator.next()).value;
  // Prints 2 blob names
  for (const blob of response.segment.blobItems) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
  // Passing the continuationToken
  iterator = containerClient
    .listBlobsFlat()
    .byPage({ continuationToken: response.continuationToken, maxPageSize: 10 });
  response = (await iterator.next()).value;
  // Prints 5 blob names
  for (const blob of response.segment.blobItems) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More samples

- [Blob Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/test/)
- [File Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples)
- [File Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/test)
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


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2FREADME.png)
