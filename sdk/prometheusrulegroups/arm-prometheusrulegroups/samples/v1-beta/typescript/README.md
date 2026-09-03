# @azure/arm-prometheusrulegroups client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-prometheusrulegroups in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [prometheusRuleGroupsCreateOrUpdateSample.ts][prometheusrulegroupscreateorupdatesample]           | create or update a Prometheus rule group definition. x-ms-original-file: 2023-03-01/createOrUpdateClusterCentricRuleGroup.json             |
| [prometheusRuleGroupsDeleteSample.ts][prometheusrulegroupsdeletesample]                           | delete a Prometheus rule group definition. x-ms-original-file: 2023-03-01/deletePrometheusRuleGroup.json                                   |
| [prometheusRuleGroupsGetSample.ts][prometheusrulegroupsgetsample]                                 | retrieve a Prometheus rule group definition. x-ms-original-file: 2023-03-01/getPrometheusRuleGroup.json                                    |
| [prometheusRuleGroupsListByResourceGroupSample.ts][prometheusrulegroupslistbyresourcegroupsample] | retrieve Prometheus rule group definitions in a resource group. x-ms-original-file: 2023-03-01/listPrometheusRuleGroups.json               |
| [prometheusRuleGroupsListBySubscriptionSample.ts][prometheusrulegroupslistbysubscriptionsample]   | retrieve Prometheus all rule group definitions in a subscription. x-ms-original-file: 2023-03-01/listSubscriptionPrometheusRuleGroups.json |
| [prometheusRuleGroupsUpdateSample.ts][prometheusrulegroupsupdatesample]                           | update an Prometheus rule group definition. x-ms-original-file: 2023-03-01/patchPrometheusRuleGroup.json                                   |

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
node dist/prometheusRuleGroupsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/prometheusRuleGroupsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[prometheusrulegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsCreateOrUpdateSample.ts
[prometheusrulegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsDeleteSample.ts
[prometheusrulegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsGetSample.ts
[prometheusrulegroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsListByResourceGroupSample.ts
[prometheusrulegroupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsListBySubscriptionSample.ts
[prometheusrulegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/typescript/src/prometheusRuleGroupsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-prometheusrulegroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
