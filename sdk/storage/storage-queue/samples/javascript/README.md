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

These sample programs show how to use the JavaScript client libraries for Azure Storage Queues in some common scenarios.

| **File Name**                       | **Description**                                                                                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [basic.js][basic]                   | authenticate with the service using an account name & key (or anonymously with a SAS URL); send, peek, and dequeue messages                                       |
| [withConnString.js][withconnstring] | connect to and authenticate with the service using a connection string                                                                                            |
| [sharedKeyCred.js][sharedkeycred]   | authenticate with the service using an account name and a shared key                                                                                              |
| [anonymousCred.js][anonymouscred]   | authenticate with the service anonymously using a SAS URL                                                                                                         |
| [azureAdAuth.js][azureadauth]       | authenticate with the service using Azure Active Directory                                                                                                        |
| [proxyAuth.js][proxyauth]           | connect to the service using a proxy and authenticate with an account name & key                                                                                  |
| [iterators.js][iterators]           | different options for iterating over messages, showing options for paging, resuming paging etc. (requires several queues to already exist in order to see output) |
| [customPipeline.js][custompipeline] | use custom HTTP pipeline options when connecting to the service                                                                                                   |

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

[anonymouscred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/anonymousCred.js
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/azureAdAuth.js
[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/basic.js
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/customPipeline.js
[iterators]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/iterators.js
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/proxyAuth.js
[sharedkeycred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/sharedKeyCred.js
[withconnstring]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples/javascript/withConnString.js
[apiref]: https://aka.ms/azsdk/js/docs/ref/storage-queue
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/README.md
