# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deploymentsCalculateTemplateHashSample.ts][deploymentscalculatetemplatehashsample]                               | Calculate the hash of the given template. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/CalculateTemplateHash.json                                                                                                                 |
| [deploymentsCreateOrUpdateAtManagementGroupScopeSample.ts][deploymentscreateorupdateatmanagementgroupscopesample] | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtManagementGroup.json                                                       |
| [deploymentsCreateOrUpdateAtScopeSample.ts][deploymentscreateorupdateatscopesample]                               | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtScope.json                                                                 |
| [deploymentsCreateOrUpdateAtTenantScopeSample.ts][deploymentscreateorupdateattenantscopesample]                   | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtTenant.json                                                                |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]                                             | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentWithOnErrorDeploymentSpecificDeployment.json                                 |
| [deploymentsWhatIfAtManagementGroupScopeSample.ts][deploymentswhatifatmanagementgroupscopesample]                 | Returns changes that will be made by the deployment if executed at the scope of the management group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnManagementGroup.json                                     |
| [deploymentsWhatIfAtSubscriptionScopeSample.ts][deploymentswhatifatsubscriptionscopesample]                       | Returns changes that will be made by the deployment if executed at the scope of the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnSubscription.json                                            |
| [deploymentsWhatIfAtTenantScopeSample.ts][deploymentswhatifattenantscopesample]                                   | Returns changes that will be made by the deployment if executed at the scope of the tenant group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnTenant.json                                                  |
| [deploymentsWhatIfSample.ts][deploymentswhatifsample]                                                             | Returns changes that will be made by the deployment if executed at the scope of the resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnResourceGroup.json                                         |
| [resourceGroupsCreateOrUpdateSample.ts][resourcegroupscreateorupdatesample]                                       | Creates or updates a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/CreateResourceGroup.json                                                                                                                        |
| [resourceGroupsExportTemplateSample.ts][resourcegroupsexporttemplatesample]                                       | Captures the specified resource group as a template. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/ExportResourceGroup.json                                                                                                        |
| [tagsCreateOrUpdateAtScopeSample.ts][tagscreateorupdateatscopesample]                                             | This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutTagsResource.json |
| [tagsGetAtScopeSample.ts][tagsgetatscopesample]                                                                   | Gets the entire set of tags on a resource or subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/GetTagsResource.json                                                                                                      |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env RESOURCES_SUBSCRIPTION_ID="<resources subscription id>" node dist/deploymentsCalculateTemplateHashSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentscalculatetemplatehashsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsCalculateTemplateHashSample.ts
[deploymentscreateorupdateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsCreateOrUpdateAtManagementGroupScopeSample.ts
[deploymentscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsCreateOrUpdateAtScopeSample.ts
[deploymentscreateorupdateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsCreateOrUpdateAtTenantScopeSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentswhatifatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsWhatIfAtManagementGroupScopeSample.ts
[deploymentswhatifatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsWhatIfAtSubscriptionScopeSample.ts
[deploymentswhatifattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsWhatIfAtTenantScopeSample.ts
[deploymentswhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/deploymentsWhatIfSample.ts
[resourcegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/resourceGroupsCreateOrUpdateSample.ts
[resourcegroupsexporttemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/resourceGroupsExportTemplateSample.ts
[tagscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/tagsCreateOrUpdateAtScopeSample.ts
[tagsgetatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/typescript/src/tagsGetAtScopeSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resources-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
