# Azure Storage File Data Lake client library for JavaScript

Azure Data Lake Storage (ADLS) includes all the capabilities required to make it easy for developers, data scientists, and analysts to store data of any size, shape, and speed, and do all types of processing and analytics across platforms and languages. It removes the complexities of ingesting and storing all of your data while making it faster to get up and running with batch, streaming, and interactive analytics.

This project provides a client library in JavaScript that makes it easy to consume Microsoft Azure Storage Data Lake service.

Use the client libraries in this package to:
  - Create/List/Delete File Systems
  - Create/Read/List/Update/Delete Paths, Directories and Files

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-datalake) |
[Package (npm)](https://www.npmjs.com/package/@azure/storage-file-datalake) |
[API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/storage-file-datalake) |
[Product documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction?toc=%2fazure%2fstorage%2fblobs%2ftoc.json) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-datalake/samples) |
[Azure Storage Data Lake REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/data-lake-storage-gen2)

## Getting started

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-quickstart-create-account?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json#create-an-account-using-the-azure-portal) to use this package. If you are using this package in a Node.js application, then Node.js version 8.0.0 or higher is required.

### Install the package

The preferred way to install the Azure Storage Data Lake client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-file-datalake
```

### Authenticate the client

Azure Storage supports several ways to authenticate. In order to interact with the Azure Data Lake Storage service you'll need to create an instance of a Storage client - `DataLakeServiceClient`, `DataLakeFileSystemClient`, or `DataLakePathClient` for example. See [samples for creating the `DataLakeServiceClient`](#create-the-data-lake-service-client) to learn more about authentication.

- [Azure Active Directory](#with-defaultazurecredential-from-azureidentity-package)
- [Shared Key](#with-storagesharedkeycredential)
- [Shared access signatures](#with-sas-token)

#### Azure Active Directory

The Azure Data Lake Storage service supports the use of Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. Please see the [README for `@azure/identity`](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md) for more details and samples to get you started.

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
- `Object.keys` (Overrides the IE11's `Object.keys` with a polyfill to enable the [ES6 behavior](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`
- `Symbol.iterator`

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

- If a file holds compressed data in `gzip` or `deflate` format and its content encoding is set accordingly, downloading behavior is different between Node.js and browsers. In Node.js storage clients will download the file in its compressed format, while in browsers the data will be downloaded in de-compressed format.

##### Features, interfaces, classes or functions only available in Node.js

- Shared Key Authorization based on account name and account key
  - `StorageSharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateDataLakeSASQueryParameters()`

##### Features, interfaces, classes or functions only available in browsers

- N/A

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### Special bundling notes for IE11

Currently only `Parcel` and `Rollup` work well with Storage client libraries for IE11.

If `Parcel` is used  then no further work is needed. If using Rollup, an additional step is needed to transform the bundled output to the format that IE11 supports.

Assuming `bundled-output.js` is the result from `Rollup`:

```bash
tsc --allowJS --target es5 bundled-output.js --outfile final-output.js
```

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

> Notice: Data Lake currently shares CORS settings for blob service.

## Key concepts

Azure Data Lake Storage Gen2 was designed to:

- Serve multiple petabytes of information while sustaining hundreds of gigabits of throughput
- Allow you to easily manage massive amounts of data

Key Features of DataLake Storage Gen2 include:

- Hadoop compatible access
- A super set of POSIX permissions
- Cost effective in terms of low-cost storage capacity and transactions
- Optimized driver for big data analytics

A fundamental part of Data Lake Storage Gen2 is the addition of a hierarchical namespace to Blob storage. The hierarchical namespace organizes objects/files into a hierarchy of directories for efficient data access.

In the past, cloud-based analytics had to compromise in areas of performance, management, and security. Data Lake Storage Gen2 addresses each of these aspects in the following ways:
- Performance is optimized because you do not need to copy or transform data as a prerequisite for analysis. The hierarchical namespace greatly improves the performance of directory management operations, which improves overall job performance.
- Management is easier because you can organize and manipulate files through directories and subdirectories.
- Security is enforceable because you can define POSIX permissions on directories or individual files.
- Cost effectiveness is made possible as Data Lake Storage Gen2 is built on top of the low-cost Azure Blob storage. The additional features further lower the total cost of ownership for running big data analytics on Azure.

Data Lake storage offers three types of resources:

- The _storage account_ used via `DataLakeServiceClient`
- A _file system_ in the storage account used via `DataLakeFileSystemClient`
- A _path_ in a file system used via `DataLakeDirectoryClient` or `DataLakeFileClient`

|Azure DataLake Gen2 	      | Blob       |
| --------------------------| ---------- |
|Filesystem                 | Container  | 
|Path (File or Directory)   | Blob       |

> Note: This client library only supports storage accounts with hierarchical namespace (HNS) enabled.

## Examples

### Import the package

To use the clients, import the package into your file:

```javascript
const AzureStorageDataLake = require("@azure/storage-file-datalake");
```

Alternatively, selectively import only the types you need:

```javascript
const { DataLakeServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-datalake");
```

### Create the data lake service client

The `DataLakeServiceClient` requires an URL to the data lake service and an access credential. It also optionally accepts some settings in the `options` parameter.

#### with `DefaultAzureCredential` from `@azure/identity` package

**Recommended way to instantiate a `DataLakeServiceClient`**

> Notice. Azure Data Lake currently reuses blob related roles like "Storage Blob Data Owner" during following AAD OAuth authentication.

  Setup : Reference - Authorize access to blobs (data lake) and queues with Azure Active Directory from a client application - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-app

  - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user.

    - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
    - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
    - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.

  - Grant access to Azure Data Lake data with RBAC in the Azure Portal

    - RBAC roles for blobs (data lake) and queues - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-rbac-portal.
    - In the azure portal, go to your storage-account and assign **Storage Blob Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).

  - Environment setup for the sample
    - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
    - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample(Can leverage process.env).

  ```javascript
  const { DefaultAzureCredential } = require("@azure/identity");
  const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

  // Enter your storage account name
  const account = "<account>";
  const defaultAzureCredential = new DefaultAzureCredential();

  const datalakeServiceClient = new DataLakeServiceClient(
    `https://${account}.dfs.core.windows.net`,
    defaultAzureCredential
  );
  ```

  See the [Azure AD Auth sample](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/javascript/azureAdAuth.js) for a complete example using this method.

  [Note - Above steps are only for Node.js]

#### with `StorageSharedKeyCredential`

Alternatively, you instantiate a `DataLakeServiceClient` with a `StorageSharedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
  [ONLY AVAILABLE IN NODE.JS RUNTIME]

  ```javascript
  const { DataLakeServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-datalake");

  // Enter your storage account name and shared key
  const account = "<account>";
  const accountKey = "<accountkey>";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const datalakeServiceClient = new DataLakeServiceClient(
    `https://${account}.dfs.core.windows.net`,
    sharedKeyCredential
  );
  ```

#### with SAS Token

Also, You can instantiate a `DataLakeServiceClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal or generate one using `generateAccountSASQueryParameters()`.

```javascript
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";
const serviceClientWithSAS = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net${sas}`
);
```

### Create a new file system

Use `DataLakeServiceClient.getFileSystemClient()` to get a file system client instance then create a new file system resource.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

async function main() {
  // Create a file system
  const fileSystemName = `newfilesystem${new Date().getTime()}`;
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
  const createResponse = await fileSystemClient.create();
  console.log(`Create file system ${fileSystemName} successfully`, createResponse.requestId);
}

main();
```

### List the file systems

Use `DataLakeServiceClient.listFileSystems()` function to iterate the file systems,
with the new `for-await-of` syntax:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

async function main() {
  let i = 1;
  let fileSystems = datalakeServiceClient.listFileSystems();
  for await (const fileSystem of fileSystems) {
    console.log(`File system ${i++}: ${fileSystem.name}`);
  }
}

main();
```

Alternatively without using `for-await-of`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

async function main() {
  let i = 1;
  let iter = datalakeServiceClient.listFileSystems();
  let fileSystemItem = await iter.next();
  while (!fileSystemItem.done) {
    console.log(`File System ${i++}: ${fileSystemItem.value.name}`);
    fileSystemItem = await iter.next();
  }
}

main();
```

In addition, pagination is supported for listing too via `byPage()`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

async function main() {
  let i = 1;
  for await (const response of datalakeServiceClient.listFileSystems().byPage({ maxPageSize: 20 })) {
    if (response.fileSystemItems) {
      for (const fileSystem of response.fileSystemItems) {
        console.log(`File System ${i++}: ${fileSystem.name}`);
      }
    }
  }
}

main();
```

### Create and delete a directory

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

const fileSystemName = "<file system name>";

async function main() {
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
  const directoryClient = fileSystemClient.getDirectoryClient("directory");
  await directoryClient.create();
  await directoryClient.delete();
}

main();
```

### Create a file

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

const fileSystemName = "<file system name>";

async function main() {
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);

  const content = "Hello world!";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = fileSystemClient.getFileClient(fileName);
  await fileClient.create();
  await fileClient.append(content, 0, content.length);
  await fileClient.flush(content.length);
  console.log(`Create and upload file ${fileName} successfully`);
}

main();
```

### List paths inside a file system

Similar to listing file systems.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

const fileSystemName = "<file system name>";

async function main() {
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
  
  let i = 1;
  let paths = fileSystemClient.listPaths();
  for await (const path of paths) {
    console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
  }
}

main();
```

### Download a file and convert it to a string (Node.js)

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

const fileSystemName = "<file system name>";
const fileName = "<file name>"

async function main() {
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
  const fileClient = fileSystemClient.getFileClient(fileName);

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadResponse.readableStreamBody
  const downloadResponse = await fileClient.read();
  const downloaded = await streamToString(downloadResponse.readableStreamBody);
  console.log("Downloaded file content:", downloaded);

  // [Node.js only] A helper method used to read a Node.js readable stream into string
  async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }
}

main();
```

### Download a file and convert it to a string (Browsers)

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const datalakeServiceClient = new DataLakeServiceClient(
  `https://${account}.dfs.core.windows.net`,
  defaultAzureCredential
);

const fileSystemName = "<file system name>";
const fileName = "<file name>"

async function main() {
  const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
  const fileClient = fileSystemClient.getFileClient(fileName);

  // Get file content from position 0 to the end
  // In browsers, get downloaded data by accessing downloadResponse.contentAsBlob
  const downloadResponse = await fileClient.read();
  const downloaded = await blobToString(await downloadResponse.contentAsBlob);
  console.log(
    "Downloaded file content",
    downloaded
  );

  // [Browsers only] A helper method used to convert a browser Blob into string.
  async function blobToString(blob: Blob): Promise<string> {
    const fileReader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      fileReader.onloadend = (ev: any) => {
        resolve(ev.target!.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }
}

main();
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples:

- [DataLake Storage Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-datalake/samples/javascript)
- [DataLake Storage Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-datalake/samples/typescript)
- [DataLake Storage Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-datalake/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob%2FREADME.png)
