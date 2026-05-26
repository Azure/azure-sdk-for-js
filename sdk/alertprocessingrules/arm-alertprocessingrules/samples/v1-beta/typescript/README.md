# @azure/arm-alertprocessingrules client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-alertprocessingrules in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [alertProcessingRulesCreateOrUpdateSample.ts][alertprocessingrulescreateorupdatesample]           | create or update an alert processing rule. x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_add_action_group_all_alerts_in_subscription.json |
| [alertProcessingRulesDeleteSample.ts][alertprocessingrulesdeletesample]                           | delete an alert processing rule. x-ms-original-file: 2021-08-08/AlertProcessingRules_Delete.json                                                                 |
| [alertProcessingRulesGetByNameSample.ts][alertprocessingrulesgetbynamesample]                     | get an alert processing rule by name. x-ms-original-file: 2021-08-08/AlertProcessingRules_GetById.json                                                           |
| [alertProcessingRulesListByResourceGroupSample.ts][alertprocessingruleslistbyresourcegroupsample] | list all alert processing rules in a resource group. x-ms-original-file: 2021-08-08/AlertProcessingRules_List_ResourceGroup.json                                 |
| [alertProcessingRulesListBySubscriptionSample.ts][alertprocessingruleslistbysubscriptionsample]   | list all alert processing rules in a subscription. x-ms-original-file: 2021-08-08/AlertProcessingRules_List_Subscription.json                                    |
| [alertProcessingRulesUpdateSample.ts][alertprocessingrulesupdatesample]                           | enable, disable, or update tags for an alert processing rule. x-ms-original-file: 2021-08-08/AlertProcessingRules_Patch.json                                     |

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
node dist/alertProcessingRulesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/alertProcessingRulesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alertprocessingrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesCreateOrUpdateSample.ts
[alertprocessingrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesDeleteSample.ts
[alertprocessingrulesgetbynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesGetByNameSample.ts
[alertprocessingruleslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesListByResourceGroupSample.ts
[alertprocessingruleslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesListBySubscriptionSample.ts
[alertprocessingrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertprocessingrules/arm-alertprocessingrules/samples/v1-beta/typescript/src/alertProcessingRulesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-alertprocessingrules?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/alertprocessingrules/arm-alertprocessingrules/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
