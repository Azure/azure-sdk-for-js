---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
urlFragment: storage-blob-javascript
---

# Azure Storage Blob client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage Blobs in some common scenarios.

| **File Name**                                             | **Description**                                                                                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [basic.js][basic]                                         | authenticate with the service using an account name & key (or anonymously with a SAS URL); create and delete containers; create, list, and download a blob |
| [withConnString.js][withconnstring]                       | connect to and authenticate with the service using a connection string                                                                                     |
| [sharedKeyCred.js][sharedkeycred]                         | authenticate with the service using an account name and a shared key                                                                                       |
| [anonymousCred.js][anonymouscred]                         | authenticate with the service anonymously using a SAS URL                                                                                                  |
| [azureAdAuth.js][azureadauth]                             | authenticate with the service using Azure Active Directory                                                                                                 |
| [proxyAuth.js][proxyauth]                                 | connect to the service using a proxy and authenticate with an account name & key                                                                           |
| [iterators-blobs.js][iterators-blobs]                     | different methods for iterating over blobs in a container, showing options for paging, resuming paging, etc.                                               |
| [iterators-containers.js][iterators-containers]           | different methods for iterating over containers in an account, showing options for paging, resuming paging, etc.                                           |
| [iterators-blobs-hierarchy.js][iterators-blobs-hierarchy] | iterating over blobs by hierarchy, using separators in the blob names, showing options for paging, resuming paging, etc.                                   |
| [iterators-without-await.js][iterators-without-await]     | iterating over blobs in a container without using `for await` syntax                                                                                       |
| [customPipeline.js][custompipeline]                       | use custom HTTP pipeline options when connecting to the service                                                                                            |
| [customizedClientHeaders.js][customizedclientheaders]     | use a custom request policy to add metadata to requests, in this case through the custom x-ms-client-request-id header                                     |
| [errorsAndResponses.js][errorsandresponses]               | demonstrate various errors and responses                                                                                                                   |
| [readingSnapshot.js][readingsnapshot]                     | create a blob snapshot and read from that snapshot                                                                                                         |
| [advanced.js][advanced]                                   | use custom logging and pipeline options, then shows some example advanced options when creating containers, listing and downloading blobs, etc.            |

## Prerequisites

The sample are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node basic.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advanced]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/advanced.js
[anonymouscred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/anonymousCred.js
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/azureAdAuth.js
[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/basic.js
[customizedclientheaders]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/customizedClientHeaders.js
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/customPipeline.js
[errorsandresponses]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/errorsAndResponses.js
[iterators-blobs-hierarchy]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/iterators-blobs-hierarchy.js
[iterators-blobs]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/iterators-blobs.js
[iterators-containers]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/iterators-containers.js
[iterators-without-await]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/iterators-without-await.js
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/proxyAuth.js
[readingsnapshot]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/readingSnapshot.js
[sharedkeycred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/sharedKeyCred.js
[withconnstring]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/javascript/withConnString.js
[apiref]: https://aka.ms/azsdk/js/docs/ref/storage-blob
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/README.md
