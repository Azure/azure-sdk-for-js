---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
urlFragment: storage-queue-javascript
---

# Azure Storage Queue client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage Queue in some common scenarios.

| **File Name**                                   | **Description**                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------------------- |
| [sharedKeyAuth.js][sharedkeyauth]               | authenticate using an account name and a static key                           |
| [azureAdAuth.js][azureadauth]                   | authenticate with the storage service using Azure Active Directory            |
| [anonymousAuth.js][anonymousauth]               | authenticate anonymously using a SAS-encoded URL                              |
| [connectionStringAuth.js][connectionstringauth] | authenticate with the storage service using a connection string               |
| [queueClient.js][queueclient]                   | use `QueueServiceClient` to create a queue and send/receive/delete messages   |
| [listQueues.js][listqueues]                     | list queues in the account, showing options for paging, resuming paging, etc. |
| [proxyAuth.js][proxyauth]                       | configure proxy settings when connecting to the storage service               |
| [customPipeline.js][custompipeline]             | use custom HTTP pipeline options when connecting to the service               |

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

[sharedkeyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/sharedKeyAuth.js
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/azureAdAuth.js
[anonymousauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/anonymousAuth.js
[connectionstringauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/connectionStringAuth.js
[queueclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/queueClient.js
[listqueues]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/listQueues.js
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/proxyAuth.js
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/javascript/customPipeline.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-queue
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/README.md
