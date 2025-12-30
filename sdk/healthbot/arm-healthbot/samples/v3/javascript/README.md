# @azure/arm-healthbot client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-healthbot in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [botsCreateSample.js][botscreatesample]                                 | create a new Azure Health Bot. x-ms-original-file: 2025-11-01/ResourceCreationPut.json                                                   |
| [botsDeleteSample.js][botsdeletesample]                                 | delete a HealthBot. x-ms-original-file: 2025-11-01/ResourceDeletionDelete.json                                                           |
| [botsGetSample.js][botsgetsample]                                       | get a HealthBot. x-ms-original-file: 2025-11-01/ResourceInfoGet.json                                                                     |
| [botsListByResourceGroupSample.js][botslistbyresourcegroupsample]       | returns all the resources of a particular type belonging to a resource group x-ms-original-file: 2025-11-01/ListBotsByResourceGroup.json |
| [botsListSample.js][botslistsample]                                     | returns all the resources of a particular type belonging to a subscription. x-ms-original-file: 2025-11-01/ListBotsBySubscription.json   |
| [botsListSecretsSample.js][botslistsecretssample]                       | list all secrets of a HealthBot. x-ms-original-file: 2025-11-01/ListSecrets.json                                                         |
| [botsRegenerateApiJwtSecretSample.js][botsregenerateapijwtsecretsample] | regenerate the API JWT Secret of a HealthBot. x-ms-original-file: 2025-11-01/RegenerateApiJwtSecret.json                                 |
| [botsUpdateSample.js][botsupdatesample]                                 | patch a HealthBot. x-ms-original-file: 2025-11-01/ResourceUpdatePatch.json                                                               |
| [operationsListSample.js][operationslistsample]                         | lists all the available Azure Health Bot operations. x-ms-original-file: 2025-11-01/GetOperations.json                                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node botsCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node botsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[botscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsCreateSample.js
[botsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsDeleteSample.js
[botsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsGetSample.js
[botslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsListByResourceGroupSample.js
[botslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsListSample.js
[botslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsListSecretsSample.js
[botsregenerateapijwtsecretsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsRegenerateApiJwtSecretSample.js
[botsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/botsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-healthbot?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthbot/arm-healthbot/README.md
