# Azure Storage Blob client library for JavaScript

Azure Storage Blob is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that does not adhere to a particular data model or definition, such as text or binary data.

This project provides a client library in JavaScript that makes it easy to consume Microsoft Azure Storage Blob service.

Use the client libraries in this package to:

- Get/Set Blob Service Properties
- Create/List/Delete Containers
- Create/Read/List/Update/Delete Block Blobs
- Create/Read/List/Update/Delete Page Blobs
- Create/Read/List/Update/Delete Append Blobs

Key links

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob/)
- [API Reference Documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Product documentation](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/samples)
- [Azure Storage Blob REST APIs](https://learn.microsoft.com/rest/api/storageservices/blob-service-rest-api)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Storage Account](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal)

### Install the package

The preferred way to install the Azure Storage Blob client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-blob
```

### Authenticate the client

Azure Storage supports several ways to authenticate. In order to interact with the Azure Blob Storage service you'll need to create an instance of a Storage client - `BlobServiceClient`, `ContainerClient`, or `BlobClient` for example. See [samples for creating the `BlobServiceClient`](#create-the-blob-service-client) to learn more about authentication.

- [Azure Active Directory](#with-defaultazurecredential-from-azureidentity-package)
- [Shared Key](#with-storagesharedkeycredential)
- [Shared access signatures](#with-sas-token)

#### Azure Active Directory

The Azure Blob Storage service supports the use of Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. Please see the [README for `@azure/identity`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) for more details and samples to get you started.

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

#### Web Workers

This library requires certain DOM objects to be globally available when used in the browser, which web workers do not make available by default. You will need to polyfill these to make this library work in web workers.

For more information please refer to our [documentation for using Azure SDK for JS in Web Workers](https://aka.ms/azsdk/js/web-workers)

This library depends on following DOM APIs which need external polyfills loaded when used in web workers:

- [`document`](https://developer.mozilla.org/docs/Web/API/Document)
- [`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)
- [`Node`](https://developer.mozilla.org/docs/Web/API/Node)
- [`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

- If a blob holds compressed data in `gzip` or `deflate` format and its content encoding is set accordingly, downloading behavior is different between Node.js and browsers. In Node.js storage clients will download the blob in its compressed format, while in browsers the data will be downloaded in de-compressed format.

##### Features, interfaces, classes or functions only available in Node.js

- Shared Key Authorization based on account name and account key
  - `StorageSharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateBlobSASQueryParameters()`
- Parallel uploading and downloading. Note that `BlockBlobClient.uploadData()` is available in both Node.js and browsers.
  - `BlockBlobClient.uploadFile()`
  - `BlockBlobClient.uploadStream()`
  - `BlobClient.downloadToBuffer()`
  - `BlobClient.downloadToFile()`

##### Features, interfaces, classes or functions only available in browsers

- Parallel uploading and downloading
  - `BlockBlobClient.uploadBrowserData()`

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://learn.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Key concepts

Blob storage is designed for:

- Serving images or documents directly to a browser.
- Storing files for distributed access.
- Streaming video and audio.
- Writing to log files.
- Storing data for backup and restore, disaster recovery, and archiving.
- Storing data for analysis by an on-premises or Azure-hosted service.

Blob storage offers three types of resources:

- The _storage account_ used via `BlobServiceClient`
- A _container_ in the storage account used via `ContainerClient`
- A _blob_ in a container used via `BlobClient`

## Examples

- [Import the package](#import-the-package)
- [Create the blob service client](#create-the-blob-service-client)
- [Create a new container](#create-a-new-container)
- [List the containers](#list-the-containers)
- [Create a blob by uploading data](#create-a-blob-by-uploading-data)
- [List blobs inside a container](#list-blobs-inside-a-container)
- [Download a blob and convert it to a string (Node.js)](#download-a-blob-and-convert-it-to-a-string-nodejs)
- [Download a blob and convert it to a string (Browsers)](#download-a-blob-and-convert-it-to-a-string-browsers)

### Import the package

To use the clients, import the package into your file:

```ts snippet:ignore
import * as AzureStorageBlob from "@azure/storage-blob";
```

Alternatively, selectively import only the types you need:

```ts snippet:ignore
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
```

### Create the blob service client

The `BlobServiceClient` requires an URL to the blob service and an access credential. It also optionally accepts some settings in the `options` parameter.

#### with `DefaultAzureCredential` from `@azure/identity` package

**Recommended way to instantiate a `BlobServiceClient`**

Setup : Reference - Authorize access to blobs and queues with Azure Active Directory from a client application - https://learn.microsoft.com/azure/storage/common/storage-auth-aad-app

- Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user

  - Register a new application in the Azure Active Directory(in the azure-portal) - https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app
  - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
  - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.

- Grant access to Azure Blob data with RBAC in the Azure Portal

  - RBAC roles for blobs and queues - https://learn.microsoft.com/azure/storage/common/storage-auth-aad-rbac-portal.
  - In the azure portal, go to your storage-account and assign **Storage Blob Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).

- Environment setup for the sample
  - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
  - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample(Can leverage process.env).

```ts snippet:ReadmeSampleCreateClient_DefaultAzureCredential
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

// Enter your storage account name
const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  defaultAzureCredential,
);
```

See the [Azure AD Auth sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/javascript/azureAdAuth.js) for a complete example using this method.

[Note - Above steps are only for Node.js]

#### using connection string

Alternatively, you can instantiate a `BlobServiceClient` using the `fromConnectionString()` static method with the full connection string as the argument. (The connection string can be obtained from the azure portal.) [ONLY AVAILABLE IN NODE.JS RUNTIME]

```ts snippet:ReadmeSampleCreateClient_ConnectionString
import { BlobServiceClient } from "@azure/storage-blob";

const connStr = "<connection string>";

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
```

#### with `StorageSharedKeyCredential`

Alternatively, you instantiate a `BlobServiceClient` with a `StorageSharedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```ts snippet:ReadmeSampleCreateClient_StorageSharedKeyCredential
import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";

const account = "<account>";
const accountKey = "<accountkey>";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);
```

#### with SAS Token

Also, You can instantiate a `BlobServiceClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal or generate one using `generateAccountSASQueryParameters()`.

```ts snippet:ReadmeSampleCreateClient_SASToken
import { BlobServiceClient } from "@azure/storage-blob";

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";

const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
```

### Create a new container

Use `BlobServiceClient.getContainerClient()` to get a container client instance then create a new container resource.

```ts snippet:ReadmeSampleCreateContainer
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

// Create a container
const containerName = `newcontainer${new Date().getTime()}`;
const containerClient = blobServiceClient.getContainerClient(containerName);
const createContainerResponse = await containerClient.create();
console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
```

### List the containers

Use `BlobServiceClient.listContainers()` function to iterate the containers,
with the new `for-await-of` syntax:

```ts snippet:ReadmeSampleListContainers
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

let i = 1;
const containers = blobServiceClient.listContainers();
for await (const container of containers) {
  console.log(`Container ${i++}: ${container.name}`);
}
```

Alternatively without using `for-await-of`:

```ts snippet:ReadmeSampleListContainers_WithoutForAwait
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

let i = 1;
const iter = blobServiceClient.listContainers();
let { value, done } = await iter.next();
while (!done) {
  console.log(`Container ${i++}: ${value.name}`);
  ({ value, done } = await iter.next());
}
```

In addition, pagination is supported for listing too via `byPage()`:

```ts snippet:ReadmeSampleListContainers_ByPage
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

let i = 1;
for await (const page of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
  for (const container of page.containerItems) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}
```

For a complete sample on iterating containers please see [samples/v12/typescript/src/listContainers.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/listContainers.ts).

### Create a blob by uploading data

```ts snippet:ReadmeSampleCreateBlob
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

const containerName = "<container name>";
const containerClient = blobServiceClient.getContainerClient(containerName);

const content = "Hello world!";
const blobName = `newblob ${+new Date()}`;
const blockBlobClient = containerClient.getBlockBlobClient(blobName);
const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
console.log(
  `Upload block blob ${blobName} successfully with request ID: ${uploadBlobResponse.requestId}`,
);
```

### List blobs inside a container

Similar to listing containers.

```ts snippet:ReadmeSampleListBlobs
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

const containerName = "<container name>";
const containerClient = blobServiceClient.getContainerClient(containerName);

let i = 1;
const blobs = containerClient.listBlobsFlat();
for await (const blob of blobs) {
  console.log(`Blob ${i++}: ${blob.name}`);
}
```

For a complete sample on iterating blobs please see [samples/v12/typescript/src/listBlobsFlat.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/listBlobsFlat.ts).

### Download a blob and convert it to a string (Node.js)

```ts snippet:ReadmeSampleDownloadBlob_Node
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

const containerName = "<container name>";
const blobName = "<blob name>";
const containerClient = blobServiceClient.getContainerClient(containerName);
const blobClient = containerClient.getBlobClient(blobName);

// Get blob content from position 0 to the end
// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
const downloadBlockBlobResponse = await blobClient.download();
if (downloadBlockBlobResponse.readableStreamBody) {
  const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
  console.log(`Downloaded blob content: ${downloaded}`);
}

async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const result = await new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (data) => {
      chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    });
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on("error", reject);
  });
  return result.toString();
}
```

### Download a blob and convert it to a string (Browsers).

Please refer to the [JavaScript Bundle](#javascript-bundle) section for more information on using this library in the browser.

```ts snippet:ReadmeSampleDownloadBlob_Browser
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const account = "<account>";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

const containerName = "<container name>";
const blobName = "<blob name>";
const containerClient = blobServiceClient.getContainerClient(containerName);
const blobClient = containerClient.getBlobClient(blobName);

// Get blob content from position 0 to the end
// In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
const downloadBlockBlobResponse = await blobClient.download();
const blobBody = await downloadBlockBlobResponse.blobBody;
if (blobBody) {
  const downloaded = await blobBody.text();
  console.log(`Downloaded blob content: ${downloaded}`);
}
```

A complete example of simple scenarios is at [samples/v12/typescript/src/sharedKeyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/sharedKeyAuth.ts).

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples:

- [Blob Storage Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/samples/v12/javascript)
- [Blob Storage Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/samples/v12/typescript)
- [Blob Storage Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

Also refer to [Storage specific guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/CONTRIBUTING.md) for additional information on setting up the test environment for storage libraries.
