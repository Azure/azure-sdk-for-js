# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                       |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [botsCreateSample.ts][botscreatesample]                                 | Create a new Azure Health Bot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ResourceCreationPut.json                                                   |
| [botsDeleteSample.ts][botsdeletesample]                                 | Delete a HealthBot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ResourceDeletionDelete.json                                                           |
| [botsGetSample.ts][botsgetsample]                                       | Get a HealthBot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ResourceInfoGet.json                                                                     |
| [botsListByResourceGroupSample.ts][botslistbyresourcegroupsample]       | Returns all the resources of a particular type belonging to a resource group x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ListBotsByResourceGroup.json |
| [botsListSample.ts][botslistsample]                                     | Returns all the resources of a particular type belonging to a subscription. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ListBotsBySubscription.json   |
| [botsListSecretsSample.ts][botslistsecretssample]                       | List all secrets of a HealthBot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ListSecrets.json                                                         |
| [botsRegenerateApiJwtSecretSample.ts][botsregenerateapijwtsecretsample] | Regenerate the API JWT Secret of a HealthBot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/RegenerateApiJwtSecret.json                                 |
| [botsUpdateSample.ts][botsupdatesample]                                 | Patch a HealthBot. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/ResourceUpdatePatch.json                                                               |
| [operationsListSample.ts][operationslistsample]                         | Lists all the available Azure Health Bot operations. x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2025-05-25/examples/GetOperations.json                                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/botsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env HEALTHBOT_SUBSCRIPTION_ID="<healthbot subscription id>" HEALTHBOT_RESOURCE_GROUP="<healthbot resource group>" node dist/botsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[botscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsCreateSample.ts
[botsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsDeleteSample.ts
[botsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsGetSample.ts
[botslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsListByResourceGroupSample.ts
[botslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsListSample.ts
[botslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsListSecretsSample.ts
[botsregenerateapijwtsecretsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsRegenerateApiJwtSecretSample.ts
[botsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/botsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthbot/arm-healthbot/samples/v3/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-healthbot?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthbot/arm-healthbot/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
