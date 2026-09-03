# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deploymentsCalculateTemplateHashSample.js][deploymentscalculatetemplatehashsample]                               | Calculate the hash of the given template. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/CalculateTemplateHash.json                                                                                                                 |
| [deploymentsCreateOrUpdateAtManagementGroupScopeSample.js][deploymentscreateorupdateatmanagementgroupscopesample] | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtManagementGroup.json                                                       |
| [deploymentsCreateOrUpdateAtScopeSample.js][deploymentscreateorupdateatscopesample]                               | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtScope.json                                                                 |
| [deploymentsCreateOrUpdateAtTenantScopeSample.js][deploymentscreateorupdateattenantscopesample]                   | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentAtTenant.json                                                                |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]                                             | You can provide the template and parameters directly in the request or link to JSON files. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutDeploymentWithOnErrorDeploymentSpecificDeployment.json                                 |
| [deploymentsWhatIfAtManagementGroupScopeSample.js][deploymentswhatifatmanagementgroupscopesample]                 | Returns changes that will be made by the deployment if executed at the scope of the management group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnManagementGroup.json                                     |
| [deploymentsWhatIfAtSubscriptionScopeSample.js][deploymentswhatifatsubscriptionscopesample]                       | Returns changes that will be made by the deployment if executed at the scope of the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnSubscription.json                                            |
| [deploymentsWhatIfAtTenantScopeSample.js][deploymentswhatifattenantscopesample]                                   | Returns changes that will be made by the deployment if executed at the scope of the tenant group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnTenant.json                                                  |
| [deploymentsWhatIfSample.js][deploymentswhatifsample]                                                             | Returns changes that will be made by the deployment if executed at the scope of the resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PostDeploymentWhatIfOnResourceGroup.json                                         |
| [resourceGroupsCreateOrUpdateSample.js][resourcegroupscreateorupdatesample]                                       | Creates or updates a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/CreateResourceGroup.json                                                                                                                        |
| [resourceGroupsExportTemplateSample.js][resourcegroupsexporttemplatesample]                                       | Captures the specified resource group as a template. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/ExportResourceGroup.json                                                                                                        |
| [tagsCreateOrUpdateAtScopeSample.js][tagscreateorupdateatscopesample]                                             | This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/PutTagsResource.json |
| [tagsGetAtScopeSample.js][tagsgetatscopesample]                                                                   | Gets the entire set of tags on a resource or subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2019-10-01/examples/GetTagsResource.json                                                                                                      |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env RESOURCES_SUBSCRIPTION_ID="<resources subscription id>" node deploymentsCalculateTemplateHashSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentscalculatetemplatehashsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsCalculateTemplateHashSample.js
[deploymentscreateorupdateatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsCreateOrUpdateAtManagementGroupScopeSample.js
[deploymentscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsCreateOrUpdateAtScopeSample.js
[deploymentscreateorupdateattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsCreateOrUpdateAtTenantScopeSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsCreateOrUpdateSample.js
[deploymentswhatifatmanagementgroupscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsWhatIfAtManagementGroupScopeSample.js
[deploymentswhatifatsubscriptionscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsWhatIfAtSubscriptionScopeSample.js
[deploymentswhatifattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsWhatIfAtTenantScopeSample.js
[deploymentswhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/deploymentsWhatIfSample.js
[resourcegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/resourceGroupsCreateOrUpdateSample.js
[resourcegroupsexporttemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/resourceGroupsExportTemplateSample.js
[tagscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/tagsCreateOrUpdateAtScopeSample.js
[tagsgetatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/samples/v2/javascript/tagsGetAtScopeSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resources-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resources-profile-2020-09-01-hybrid/README.md
