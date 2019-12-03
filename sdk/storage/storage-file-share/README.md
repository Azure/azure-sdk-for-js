# Azure Storage File Share client library for JavaScript

Azure Files offers fully managed file shares in the cloud that are accessible via the industry standard Server Message Block (SMB) protocol. Azure file shares can be mounted concurrently by cloud or on-premises deployments of Windows, Linux, and macOS. Additionally, Azure file shares can be cached on Windows Servers with Azure File Sync for fast access near where the data is being used.

This project provides a client library in JavaScript that makes it easy to consume Microsoft Azure File Storage service.

Use the client libraries in this package to:

- Get/Set File Service Properties
- Create/List/Delete File Shares
- Create/List/Delete File Directories
- Create/Read/List/Update/Delete Files

> Note: This package was previously published under the name `@azure/storage-file`.
> It has been renamed to `@azure/storage-file-share` to better align with the upcoming new package
> for Azure Storage Files DataLake and provide a consistent set of APIs for working with files on Azure.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share) |
[Package (npm)](https://www.npmjs.com/package/@azure/storage-file-share/) |
[API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/storage-file-share) |
[Product documentation](https://docs.microsoft.com/azure/storage/files/storage-files-introduction) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples) |
[Azure Storage File REST APIs](https://docs.microsoft.com/rest/api/storageservices/file-service-rest-api)

## Key concepts

The following components and their corresponding client libraries make up the Azure Storage File Share service:

- The storage account itself, represented by a `ShareServiceClient`
- A file share within the storage account, represented by a `ShareClient`
- An optional hierarchy of directories within the file share, represented by `ShareDirectoryClient` instances
- A file within the file share, which may be up to 1 TiB in size, represented by a `ShareFileClient`

## Getting started

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://docs.microsoft.com/azure/storage/files/storage-how-to-use-files-portal) to use this package. If you are using this package in a Node.js application, then Node.js version 8.0.0 or higher is required.

### Install the package

The preferred way to install the Azure File Storage client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-file-share
```

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
  - `StorageSharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateFileSASQueryParameters()`
- Parallel uploading and downloading
  - `ShareFileClient.uploadFile()`
  - `ShareFileClient.uploadStream()`
  - `ShareFileClient.downloadToBuffer()`
  - `ShareFileClient.downloadToFile()`

##### Following features, interfaces, classes or functions are only available in browsers

- Parallel uploading and downloading
  - `ShareFileClient.uploadBrowserData()`

### JavaScript Bundle

To use this client library in the browser, you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

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
const AzureStorageFileShare = require("@azure/storage-file-share");
```

Alternative, selectively import only the types you need:

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
```

### Create the share service client

Use the constructor to create a instance of `ShareServiceClient`. It needs to authenticate with the Azure service, so pass in a `StorageSharedKeyCredential` with your account and key.

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS
  `https://${account}.file.core.windows.net`,
  credential
);
```

### List shares in the account

Use `ShareServiceClient.listShares()` to iterator shares in this account,
with the new `for-await-of` syntax:

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

async function main() {
  let shareIter = serviceClient.listShares();
  let i = 1;
  for await (const share of shareIter) {
    console.log(`Share${i}: ${share.name}`);
    i++;
  }
}

main();
```

Alternatively without `for-await-of`:

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

async function main() {
  let shareIter = await serviceClient.listShares();
  let i = 1;
  let shareItem = await shareIter.next();
  while (!shareItem.done) {
    console.log(`Share ${i++}: ${shareItem.value.name}`);
    shareItem = await shareIter.next();
  }
}

main();
```

### Create a new share and a directory

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

async function main() {
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Create directory ${directoryName} successfully`);
}

main();
```

### Create an azure file then upload to it

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

const shareName = "<share name>";
const directoryName = "<directory name>";

async function main() {
  const directoryClient = serviceClient.getShareClient(shareName).getDirectoryClient(directoryName);

  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.getFileClient(fileName);
  await fileClient.create(content.length);
  console.log(`Create file ${fileName} successfully`);

  // Upload file range
  await fileClient.uploadRange(content, 0, content.length);
  console.log(`Upload file range "${content}" to ${fileName} successfully`);
}

main();
```

### List files and directories under a directory

Use `DirectoryClient.listFilesAndDirectories()` to iterator over files and directories,
with the new `for-await-of` syntax. The `kind` property can be used to identify whether
a iterm is a directory or a file.

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

const shareName = "<share name>";
const directoryName = "<directory name>";

async function main() {
  const directoryClient = serviceClient.getShareClient(shareName).getDirectoryClient(directoryName);

  let dirIter = directoryClient.listFilesAndDirectories();
  let i = 1;
  for await (const item of dirIter) {
    if (item.kind === "directory") {
      console.log(`${i} - directory\t: ${item.name}`);
    } else {
      console.log(`${i} - file\t: ${item.name}`);
    }
    i++;
  }
}

main();
```

Alternatively without using `for-await-of`:

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

const shareName = "<share name>";
const directoryName = "<directory name>";

async function main() {
  const directoryClient = serviceClient.getShareClient(shareName).getDirectoryClient(directoryName);

  let dirIter = await directoryClient.listFilesAndDirectories();
  let i = 1;
  let item = await dirIter.next();
  while (!item.done) {
    if (item.value.kind === "directory") {
      console.log(`${i} - directory\t: ${item.value.name}`);
    } else {
      console.log(`${i} - file\t: ${item.value.name}`);
    }
    item = await dirIter.next();
  }
}

main();
```

For a complete sample on iterating please see [samples/iterators-files-and-directories.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-file-share/samples/typescript/iterators-files-and-directories.ts).

### Download a file and convert it to a string (Node.js)

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential
);

const shareName = "<share name>";
const fileName = "<file name>";

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

async function main() {
  const fileClient = serviceClient
    .getShareClient(shareName)
    .rootDirectoryClient.getFileClient(fileName);

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
  const downloadFileResponse = await fileClient.download();
  console.log(
    `Downloaded file content: ${await streamToString(downloadFileResponse.readableStreamBody)}`
  );
}

main();
```

### Download a file and convert it to a string (Browsers)

Please refer to the [JavaScript Bundle](#javascript-bundle) section for more information on using this library in the browser.

```javascript
const { ShareServiceClient } = require("@azure/storage-file-share");

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";
const shareName = "<share name>";
const fileName = "<file name>"

const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net${sas}`
);

async function main() {
  const fileClient = serviceClient.getShareClient(shareName)
    .rootDirectoryClient
    .getFileClient(fileName);

    // Get file content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadFileResponse.blobBody
  const downloadFileResponse = await fileClient.download(0);
  console.log(
    `Downloaded file content: ${await blobToString(
      await downloadFileResponse.blobBody
    )}`
  );
}

// [Browser only] A helper method used to convert a browser Blob into string.
async function blobToString(blob) {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onloadend = (ev) => {
      resolve(ev.target.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}

main()
```

A complete example of basic scenarios is at [samples/basic.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-file-share/samples/typescript/basic.ts).

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples

- [File Share Storage Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript)
- [File Share Storage Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript)
- [File Share Storage Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/test)

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-file-share%2FREADME.png)
