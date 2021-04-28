---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
  - azure-blob-storage
urlFragment: storage-blob-javascript
---

# Azure Storage Blob client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage Blob in some common scenarios.

| **File Name**                                             | **Description**                                                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [basic.js][basic]                                         | shows how to use the basic operations (create, list and download blobs, as well as creting and deleting containers) |
| [anonymousCred.js][anonymouscred]                         | authenticate anonymously using a SAS-encoded URL                                                                    |
| [azureAdAuth.js][azureadauth]                             | authenticate using Azure Active Directory                                                                           |
| [sharedKeyCred.js][sharedkeycred]                         | authenticate using an account name and shared key                                                                   |
| [withConnString.js][withconnstring]                       | connect to the service and authenticate using a connection string                                                   |
| [proxyAuth.js][proxyauth]                                 | connect to the Azure Storage service through a proxy and authenticate using a shared key                            |
| [iterators-blobs.js][iterators-blobs]                     | iterate over blobs in a container using different methods, with options for paging, resuming paging, etc.           |
| [iterators-containers.js][iterators-containers]           | iterate over containers in an account, with options for paging, resuming paging, etc.                               |
| [iterators-blobs-hierarchy.js][iterators-blobs-hierarchy] | iterate over blobs by hierarchy using separators in blob names, with options for paging etc.                        |
| [iterators-without-await.js][iterators-without-await]     | iterate over blobs in a container without using ES2018 `for await` syntax                                           |
| [customPipeline.js][custompipeline]                       | use custom HTTP pipeline options when connecting to Azure Storage                                                   |
| [customizedClientHeaders.js][customizedclientheaders]     | use a custom request policy to add metadata to requests                                                             |
| [errorsAndResponses.js][errorsandresponses]               | demonstrate various errors and responses                                                                            |
| [readingSnapshot.js][readingsnapshot]                     | create and read from a blob snapshot                                                                                |
| [advanced.js][advanced]                                   | use advanced options when creating the client and containers, as well as when listing and downloading blobs         |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Storage Account][createinstance_azurestorageaccount]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/basic.js
[anonymouscred]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/anonymousCred.js
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/azureAdAuth.js
[sharedkeycred]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/sharedKeyCred.js
[withconnstring]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/withConnString.js
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/proxyAuth.js
[iterators-blobs]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/iterators-blobs.js
[iterators-containers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/iterators-containers.js
[iterators-blobs-hierarchy]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/iterators-blobs-hierarchy.js
[iterators-without-await]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/iterators-without-await.js
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/customPipeline.js
[customizedclientheaders]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/customizedClientHeaders.js
[errorsandresponses]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/errorsAndResponses.js
[readingsnapshot]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/readingSnapshot.js
[advanced]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/javascript/advanced.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/README.md
