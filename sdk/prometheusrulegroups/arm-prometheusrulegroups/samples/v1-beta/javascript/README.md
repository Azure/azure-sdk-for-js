# @azure/arm-prometheusrulegroups client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-prometheusrulegroups in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [prometheusRuleGroupsCreateOrUpdateSample.js][prometheusrulegroupscreateorupdatesample]           | create or update a Prometheus rule group definition. x-ms-original-file: 2023-03-01/createOrUpdateClusterCentricRuleGroup.json             |
| [prometheusRuleGroupsDeleteSample.js][prometheusrulegroupsdeletesample]                           | delete a Prometheus rule group definition. x-ms-original-file: 2023-03-01/deletePrometheusRuleGroup.json                                   |
| [prometheusRuleGroupsGetSample.js][prometheusrulegroupsgetsample]                                 | retrieve a Prometheus rule group definition. x-ms-original-file: 2023-03-01/getPrometheusRuleGroup.json                                    |
| [prometheusRuleGroupsListByResourceGroupSample.js][prometheusrulegroupslistbyresourcegroupsample] | retrieve Prometheus rule group definitions in a resource group. x-ms-original-file: 2023-03-01/listPrometheusRuleGroups.json               |
| [prometheusRuleGroupsListBySubscriptionSample.js][prometheusrulegroupslistbysubscriptionsample]   | retrieve Prometheus all rule group definitions in a subscription. x-ms-original-file: 2023-03-01/listSubscriptionPrometheusRuleGroups.json |
| [prometheusRuleGroupsUpdateSample.js][prometheusrulegroupsupdatesample]                           | update an Prometheus rule group definition. x-ms-original-file: 2023-03-01/patchPrometheusRuleGroup.json                                   |

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
node prometheusRuleGroupsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node prometheusRuleGroupsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[prometheusrulegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsCreateOrUpdateSample.js
[prometheusrulegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsDeleteSample.js
[prometheusrulegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsGetSample.js
[prometheusrulegroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsListByResourceGroupSample.js
[prometheusrulegroupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsListBySubscriptionSample.js
[prometheusrulegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/samples/v1-beta/javascript/prometheusRuleGroupsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-prometheusrulegroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/prometheusrulegroups/arm-prometheusrulegroups/README.md
