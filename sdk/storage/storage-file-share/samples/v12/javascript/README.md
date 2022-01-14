---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
urlFragment: storage-file-share-javascript
---

# Azure Storage File Share client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage File Share in some common scenarios.

| **File Name**                                         | **Description**                                                                          |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [sharedKeyAuth.js][sharedkeyauth]                     | authenticate using an account name and a static key                                      |
| [anonymousAuth.js][anonymousauth]                     | authenticate anonymously using a SAS-encoded URL                                         |
| [listShares.js][listshares]                           | list shares in an account, showing options for paging, resuming paging, etc.             |
| [connectionStringAuth.js][connectionstringauth]       | authenticate with the storage service using a connection string                          |
| [shareServiceClient.js][shareserviceclient]           | use `ShareServiceClient` to interact with shares, directories, and files                 |
| [listFilesAndDirectories.js][listfilesanddirectories] | list files and directories in a share, showing options for paging, resuming paging, etc. |
| [listHandles.js][listhandles]                         | list open file handles in a directory, showing options for paging, resuming paging, etc. |
| [proxyAuth.js][proxyauth]                             | configure proxy settings when connecting to the storage service                          |
| [advancedRequestOptions.js][advancedrequestoptions]   | use advanced HTTP pipeline and request options for several methods                       |
| [customPipeline.js][custompipeline]                   | use custom HTTP pipeline options when connecting to the service                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node sharedKeyAuth.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node sharedKeyAuth.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sharedkeyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/sharedKeyAuth.js
[anonymousauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/anonymousAuth.js
[listshares]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/listShares.js
[connectionstringauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/connectionStringAuth.js
[shareserviceclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/shareServiceClient.js
[listfilesanddirectories]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/listFilesAndDirectories.js
[listhandles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/listHandles.js
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/proxyAuth.js
[advancedrequestoptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/advancedRequestOptions.js
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples/v12/javascript/customPipeline.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-file-share
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-file-share/README.md
