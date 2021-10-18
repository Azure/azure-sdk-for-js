# Guide for migrating to `@azure/storage-file-share` from `azure-storage`

This guide is intended to assist in the migration to `@azure/storage-file-share` from the legacy `azure-storage` package. It will focus on side-by-side comparisons for similar operations between the two packages.

We assume that you are familiar with `azure-storage`. If you are new to the Azure Storage File client library for JavaScript, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-file-share/samples) rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
- [Important changes](#important-changes)
  - [Package name and structure](#package-name-and-structure)
  - [Constructing the clients](#constructing-the-clients)
  - [Creating a file share](#creating-a-file-share)
  - [Creating a directory in the share](#creating-a-directory-in-the-share)
  - [Uploading file to a directory](#uploading-file-to-a-directory)
  - [Fetching properties of a file](#fetching-properties-of-a-file)
  - [Listing files and directories from a directory](#listing-files-and-directories-from-a-directory)
  - [Sequential actions](#sequential-actions)
- [Additional samples](#additional-samples)

## Migration benefits

As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that TypeScript clients have a natural and idiomatic feel with respect to the TypeScript and JavaScript ecosystems. The new `@azure/storage-file-share` follows these guidelines.

### Cross Service SDK improvements

The modern `@azure/storage-file-share` client library also provides the ability to share in some of the cross-service improvements made to the Azure development experience, such as

- A unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- Use of promises rather than callbacks for a simplified programming experience
- Use of async iterators in paging APIs

## Important changes

### Package name and structure

The modern client library is named `@azure/storage-file-share` and was released beginning with version 10. The legacy client library is named `azure-storage` with version of 2.x.x or below.

The legacy library `azure-storage` grouped functionality to work with multiple services in the same package such as `Blob`, `Queue`, `Files` and `Tables`. The new `@azure/storage-file-share` is dedicated to `Files` there are new generation packages for the other storage services `@azure/data-tables`, `@azure/storage-queue`, `@azure/storage-blob` this provides more granular control on which dependencies to take on your project.

### Constructing the clients

Previously in `azure-storage`, you would use `createFileService` which can be used to get an instance of the `FileService` in order to perform service level operations.

```javascript
const azure = require("azure-storage");
const fileService = azure.createFileService("<connection-string>");
```

Now, in `@azure/storage-file-share`, we need a `ShareServiceClient` for service level operations.

```javascript
const { ShareServiceClient } = require("@azure/storage-file-share");
const shareService = ShareServiceClient.fromConnectionString("<connection-string>");
```

### Creating a file share

Previously in `azure-storage`, you would use a `FileService` instance to create a file share.

```javascript
const azure = require("azure-storage");
const fileService = azure.createFileService("<connection-string>");

const shareName = "<share-name>";
fileService.createShare(shareName, function() {
  console.log(`Share created`);
});
```

With `@azure/storage-file-share` you have access to all share level operations directly from the `ShareServiceClient`. Because the file share service client is not affinitized to any one share, it is ideal for scenarios where you need to create, delete, or list more than one share.

```javascript
const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const shareName = "<share-name>";
const fileEndpoint = "https://<account-name>.file.core.windows.net";

const shareService = new ShareServiceClient(
  fileEndpoint,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the Share with `<share-name>`
const shareClient = await shareService.createShare(shareName);
console.log(`Share created`);
```

If your intention is to work only in the context of a single share, it's also possible to create a share from the `ShareClient`.

```javascript
const { ShareClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const shareUrl = "https://<account-name>.file.core.windows.net/<share-name>";

const shareClient = new ShareClient(
  shareUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the share with `<share-name>`
const response = await shareClient.create();
console.log(`Share created`);
```

### Creating a directory in the share

Previously in `azure-storage`, A `FileService` instance would be used for all directory or file operations. The `createDirectory` method would take a callback to execute once the directory has been created. This forces sequential operations to be inside the callback, potentially creating a callback chain

```javascript
const azure = require("azure-storage");
const shareName = "<share-name>";
const directoryName = "<directory-name>";
const fileService = azure.createFileService("<connection-string>");

fileService.createDirectory(shareName, directoryName, function() {
  console.log("Directory created");
});
```

There's a implicit root directory under a share. Now in the new `@azure/storage-file-share` SDK, an instance of `ShareClient` could also be used to preresent the root directory. The instance can be used to create or delete directories or files under the root directory. Following code can be used to create a directory under the share.

```javascript
const { ShareClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const directoryName = "<directory-name>";
const shareUrl = "https://<account-name>.file.core.windows.net/<share-name>";

const shareClient = new ShareClient(
  shareUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await shareClient.createDirectory(directoryName);
console.log("Directory created");
```

If your intention is to work only in the context of a single directory, it's also possible to create a directory from the `ShareDirectoryClient`.

```javascript
const { ShareDirectoryClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const directoryUrl = "https://<account-name>.file.core.windows.net/<share-name>/<directory-name>";

const directoryClient = new ShareDirectoryClient(
  directoryUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await directoryClient.create();
console.log("Directory created");
```

### Uploading file to a directory

Previously in `azure-storage`, method `createFileFromLocalFile` in a `FileService` instance can be used to upload a local file to a file in Azure Storage.

```javascript
const azure = require("azure-storage");
const shareName = "<share-name>";
const directoryName = "<directory-name>";
const fileName = "<file-name>";
const localFilePath = "<local-file-path>";

const fileService = azure.createFileService("<connection-string>");

fileService.createFileFromLocalFile(shareName, directoryName, fileName, localFilePath, function() {
  console.log("File uploaded");
});
```

Now with `@azure/storage-file-share`, an instance of `ShareFileClient` is used for operations on a file. Following is code to upload a local file to a file in Azure Storage.

```javascript
const { ShareFileClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const fileUrl =
  "https://<account-name>.file.core.windows.net/<container-name>/<directory-name>/<file-name>";
const localFilePath = "<local-file-path>";

const fileClient = new ShareFileClient(
  fileUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await fileClient.uploadFile(localFilePath);
console.log("File uploaded");
```

### Fetching properties of a file

Previously in `azure-storage`, method `getBlobProperties` in a `BlobService` instance can be used to fetch properties of a blob.

```javascript
const azure = require("azure-storage");
const fileService = azure.createFileService("<connection-string>");
const shareName = "<container-name>";
const directoryName = "<directoryName>";
const fileName = "<file-name>";

const fileService = azure.createFileService("<connection-string>");

fileService.getFileProperties(shareName, directoryName, fileName, function(error, result) {
  if (!error) {
    // result contains the blob properties
    console.log(result);
  }
});
```

Now with `@azure/storage-file-share`, we use method `getProperties` in an instance of `ShareFileClient`, the return type is a Promise of the properties which can be awaited, making the code cleaner.

```javascript
const { ShareFileClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const fileUrl =
  "https://<account-name>.blob.core.windows.net/<share-name>/<directory-name>/<file-name>";

const fileClient = new ShareFileClient(
  fileUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

const fileProperties = await fileClient.getProperties();
console.log(fileProperties);
```

### Listing files and directories from a directory

Previously in `azure-storage`, listing a directory didn't provide a built in way to handle pagination, looking as follows.

```javascript
const azure = require("azure-storage");
const fileService = azure.createFileService("<connection-string>");
const shareName = "<share-name>";
const directoryName = "<directory-name>";

let files = [];
let directories = [];

function listFilesAndDirectories(continuationToken, callback) {
  fileService.listFilesAndDirectoriesSegmented(
    shareName,
    directoryName,
    continuationToken,
    function(error, result) {
      files.push.apply(files, result.entries.files);
      directories.push.apply(directories, result.entries.directories);
      const continuationToken = result.continuationToken;
      if (continuationToken) {
        listFilesAndDirectories(continuationToken, callback);
      } else {
        console.log("completed listing all files and directories");
        callback();
      }
    }
  );
}

listFilesAndDirectories(null, function() {
  console.log(files);
  console.log(directories);
});
```

In the new `@azure/storage-file-share` we return a `PagedAsyncIterableIterator` that handles the details of pagination internally, simplifying the task of iteration.

```javascript
const { ShareDirectoryClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const directoryUrl = "https://<account-name>.file.core.windows.net/<share-name>/<directory-name>";

const directoryClient = new ShareDirectoryClient(
  containerUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

const iterator = directoryClient.listFilesAndDirectories();
let listItem = await iterator.next();
while (!listItem.done) {
  if (listItem.value.kind === "file") {
    console.log("Got a file: " + listItem.value.name);
  } else if (listItem.value.kind === "directory") {
    console.log("Got a directory: " + listItem.value.name);
  }

  listItem = await iterator.next();
}
```

### Sequential actions

Previously in `azure-storage`, all the operations took a callback which would be executed once the operation completed. For example, to create a share and then create a directory and upload a file we would like to write the following nested code

```javascript
const azure = require("azure-storage");
const fileService = azure.createFileService("<connection-string>");

const shareName = "<share-name>";
const directoryName = "<directory-name>";
const fileName = "<file-name>";
const localFilePath = "<local-file-path>";

fileService.createShare(shareName, function() {
  fileService.createDirectory(shareName, directoryName, function() {
    fileService.createFileFromLocalFile(
      shareName,
      directoryName,
      fileName,
      localFilePath,
      function() {
        console.log("File uploaded");
      }
    );
  });
});
```

With `@azure/storage-file-share` we work with promises which makes the programming experience better, leveraging async/await we no longer need nested code blocks to perform sequential actions

```javascript
const { ShareClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
const directoryName = "<directory-name>";
const fileName = "<file-name>";
const localFilePath = "<local-file-path>";
const shareUrl = "https://<account-name>.file.core.windows.net/<share-name>";

const shareClient = new ShareClient(
  shareUrl,
  new StorageSharedKeyCredential("<accountName>", "<accountKey>")
);

await shareClient.create();

const directoryClient = shareClient.getDirectoryClient(directoryName);
await directoryClient.create();

const fileClient = directoryClient.getFileClient(fileName);
await fileClient.uploadFile(localFilePath);
console.log("File uploaded");
```

## Additional samples

More samples can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-file-share/samples)
