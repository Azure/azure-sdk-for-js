# @azure/arm-resourcesdeployments client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-resourcesdeployments in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentsCalculateTemplateHashSample.js][deploymentscalculatetemplatehashsample]                               | calculate the hash of the given template. x-ms-original-file: 2025-04-01/CalculateTemplateHash.json                                                                                            |
| [deploymentsCreateOrUpdateAtManagementGroupScopeSample.js][deploymentscreateorupdateatmanagementgroupscopesample] | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtManagementGroup.json                                  |
| [deploymentsCreateOrUpdateAtScopeSample.js][deploymentscreateorupdateatscopesample]                               | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtScope.json                                            |
| [deploymentsCreateOrUpdateAtSubscriptionScopeSample.js][deploymentscreateorupdateatsubscriptionscopesample]       | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentSubscriptionTemplateSpecsWithId.json                    |
| [deploymentsCreateOrUpdateAtTenantScopeSample.js][deploymentscreateorupdateattenantscopesample]                   | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtTenant.json                                           |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]                                             | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentResourceGroup.json                                      |
| [deploymentsValidateAtManagementGroupScopeSample.js][deploymentsvalidateatmanagementgroupscopesample]             | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnManagementGroup.json |
| [deploymentsValidateAtScopeSample.js][deploymentsvalidateatscopesample]                                           | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnScope.json           |
| [deploymentsValidateAtSubscriptionScopeSample.js][deploymentsvalidateatsubscriptionscopesample]                   | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnSubscription.json    |
| [deploymentsValidateAtTenantScopeSample.js][deploymentsvalidateattenantscopesample]                               | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnTenant.json          |
| [deploymentsValidateSample.js][deploymentsvalidatesample]                                                         | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnResourceGroup.json   |
| [deploymentsWhatIfAtManagementGroupScopeSample.js][deploymentswhatifatmanagementgroupscopesample]                 | returns changes that will be made by the deployment if executed at the scope of the management group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnManagementGroup.json                |
| [deploymentsWhatIfAtSubscriptionScopeSample.js][deploymentswhatifatsubscriptionscopesample]                       | returns changes that will be made by the deployment if executed at the scope of the subscription. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnSubscription.json                       |
| [deploymentsWhatIfAtTenantScopeSample.js][deploymentswhatifattenantscopesample]                                   | returns changes that will be made by the deployment if executed at the scope of the tenant group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnTenant.json                             |
| [deploymentsWhatIfSample.js][deploymentswhatifsample]                                                             | returns changes that will be made by the deployment if executed at the scope of the resource group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnResourceGroup.json                    |

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
node deploymentsCalculateTemplateHashSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node deploymentsCalculateTemplateHashSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentscalculatetemplatehashsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCalculateTemplateHashSample.js
[deploymentscreateorupdateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCreateOrUpdateAtManagementGroupScopeSample.js
[deploymentscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCreateOrUpdateAtScopeSample.js
[deploymentscreateorupdateatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCreateOrUpdateAtSubscriptionScopeSample.js
[deploymentscreateorupdateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCreateOrUpdateAtTenantScopeSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsCreateOrUpdateSample.js
[deploymentsvalidateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsValidateAtManagementGroupScopeSample.js
[deploymentsvalidateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsValidateAtScopeSample.js
[deploymentsvalidateatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsValidateAtSubscriptionScopeSample.js
[deploymentsvalidateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsValidateAtTenantScopeSample.js
[deploymentsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsValidateSample.js
[deploymentswhatifatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsWhatIfAtManagementGroupScopeSample.js
[deploymentswhatifatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsWhatIfAtSubscriptionScopeSample.js
[deploymentswhatifattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsWhatIfAtTenantScopeSample.js
[deploymentswhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/javascript/deploymentsWhatIfSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeployments?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resourcesdeployments/README.md
