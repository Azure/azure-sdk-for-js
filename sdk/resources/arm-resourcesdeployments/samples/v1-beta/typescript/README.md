# @azure/arm-resourcesdeployments client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-resourcesdeployments in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentsCalculateTemplateHashSample.ts][deploymentscalculatetemplatehashsample]                               | calculate the hash of the given template. x-ms-original-file: 2025-04-01/CalculateTemplateHash.json                                                                                            |
| [deploymentsCreateOrUpdateAtManagementGroupScopeSample.ts][deploymentscreateorupdateatmanagementgroupscopesample] | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtManagementGroup.json                                  |
| [deploymentsCreateOrUpdateAtScopeSample.ts][deploymentscreateorupdateatscopesample]                               | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtScope.json                                            |
| [deploymentsCreateOrUpdateAtSubscriptionScopeSample.ts][deploymentscreateorupdateatsubscriptionscopesample]       | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentSubscriptionTemplateSpecsWithId.json                    |
| [deploymentsCreateOrUpdateAtTenantScopeSample.ts][deploymentscreateorupdateattenantscopesample]                   | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentAtTenant.json                                           |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]                                             | you can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: 2025-04-01/PutDeploymentResourceGroup.json                                      |
| [deploymentsValidateAtManagementGroupScopeSample.ts][deploymentsvalidateatmanagementgroupscopesample]             | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnManagementGroup.json |
| [deploymentsValidateAtScopeSample.ts][deploymentsvalidateatscopesample]                                           | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnScope.json           |
| [deploymentsValidateAtSubscriptionScopeSample.ts][deploymentsvalidateatsubscriptionscopesample]                   | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnSubscription.json    |
| [deploymentsValidateAtTenantScopeSample.ts][deploymentsvalidateattenantscopesample]                               | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnTenant.json          |
| [deploymentsValidateSample.ts][deploymentsvalidatesample]                                                         | validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. x-ms-original-file: 2025-04-01/PostDeploymentValidateOnResourceGroup.json   |
| [deploymentsWhatIfAtManagementGroupScopeSample.ts][deploymentswhatifatmanagementgroupscopesample]                 | returns changes that will be made by the deployment if executed at the scope of the management group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnManagementGroup.json                |
| [deploymentsWhatIfAtSubscriptionScopeSample.ts][deploymentswhatifatsubscriptionscopesample]                       | returns changes that will be made by the deployment if executed at the scope of the subscription. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnSubscription.json                       |
| [deploymentsWhatIfAtTenantScopeSample.ts][deploymentswhatifattenantscopesample]                                   | returns changes that will be made by the deployment if executed at the scope of the tenant group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnTenant.json                             |
| [deploymentsWhatIfSample.ts][deploymentswhatifsample]                                                             | returns changes that will be made by the deployment if executed at the scope of the resource group. x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnResourceGroup.json                    |

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
node dist/deploymentsCalculateTemplateHashSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/deploymentsCalculateTemplateHashSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentscalculatetemplatehashsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCalculateTemplateHashSample.ts
[deploymentscreateorupdateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCreateOrUpdateAtManagementGroupScopeSample.ts
[deploymentscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCreateOrUpdateAtScopeSample.ts
[deploymentscreateorupdateatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCreateOrUpdateAtSubscriptionScopeSample.ts
[deploymentscreateorupdateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCreateOrUpdateAtTenantScopeSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsvalidateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsValidateAtManagementGroupScopeSample.ts
[deploymentsvalidateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsValidateAtScopeSample.ts
[deploymentsvalidateatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsValidateAtSubscriptionScopeSample.ts
[deploymentsvalidateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsValidateAtTenantScopeSample.ts
[deploymentsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsValidateSample.ts
[deploymentswhatifatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsWhatIfAtManagementGroupScopeSample.ts
[deploymentswhatifatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsWhatIfAtSubscriptionScopeSample.ts
[deploymentswhatifattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsWhatIfAtTenantScopeSample.ts
[deploymentswhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resourcesdeployments/samples/v1-beta/typescript/src/deploymentsWhatIfSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeployments?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resourcesdeployments/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
