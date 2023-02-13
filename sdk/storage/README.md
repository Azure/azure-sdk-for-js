# Azure Storage client library for JavaScript

Azure Storage is a Microsoft-managed service providing cloud storage that is highly available, secure, durable, scalable, and redundant.

This project provides client libraries in JavaScript that makes it easy to consume Microsoft Azure Storage service.

**Note: Current Azure Storage client libraries are published from [storage/stable](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/) branch.**

- [Source Code - Blob](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-blob)
- [Source Code - File Data Lake](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-datalake)
- [Source Code - File Share](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-share)
- [Source Code - Queue](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-queue)
- [Product documentation](https://docs.microsoft.com/azure/storage)
- @azure/storage-blob [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)
- @azure/storage-file-datalake [Package (npm)](https://www.npmjs.com/package/@azure/storage-file-datalake)
- @azure/storage-file-share [Package (npm)](https://www.npmjs.com/package/@azure/storage-file-share)
- @azure/storage-queue [Package (npm)](https://www.npmjs.com/package/@azure/storage-queue)
- [API Reference documentation](https://docs.microsoft.com/javascript/api/overview/azure/storage)
- [Azure Storage REST APIs](https://docs.microsoft.com/rest/api/storageservices/)

## Key concepts

### Features

- Blob Storage
  - Get/Set Blob Service Properties
  - Create/List/Delete Containers
  - Create/Read/List/Update/Delete Block Blobs
  - Create/Read/List/Update/Delete Page Blobs
  - Create/Read/List/Update/Delete Append Blobs
- Data Lake Storage
  - Create/List/Delete File Systems
  - Create/Read/List/Update/Delete Paths, Directories and Files
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

These libraries are compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

## Architecture

The Azure Storage client libraries for JavaScript provides low-level and high-level APIs. Take Blob client library as example:

- `BlobServiceClient`, `ContainerClient` and `BlobClient` objects provide the low-level API functionality and map one-to-one to the [Azure Storage Blob REST APIs](https://docs.microsoft.com/rest/api/storageservices/blob-service-rest-api).

- The high-level APIs provide convenience abstractions such as uploading a large stream to a block blob (using multiple PutBlock requests).

## Examples

Please check out examples for each libraries

- [Blob Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-blob/test/)
- [Data Lake Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-datalake/samples)
- [Data Lake Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-datalake/test)
- [File Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-share/samples)
- [File Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-file-share/test)
- [Queue Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-queue/samples)
- [Queue Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/storage/stable/sdk/storage/storage-queue/test)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2FREADME.png)
