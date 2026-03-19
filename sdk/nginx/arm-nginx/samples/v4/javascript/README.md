# @azure/arm-nginx client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-nginx in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [apiKeysCreateOrUpdateSample.js][apikeyscreateorupdatesample]                           | create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint x-ms-original-file: 2025-11-01/ApiKeys_CreateOrUpdate.json |
| [apiKeysDeleteSample.js][apikeysdeletesample]                                           | delete API key for Nginx deployment x-ms-original-file: 2025-11-01/ApiKeys_Delete.json                                                                        |
| [apiKeysGetSample.js][apikeysgetsample]                                                 | get the specified API Key of the given Nginx deployment x-ms-original-file: 2025-11-01/ApiKeys_Get.json                                                       |
| [apiKeysListSample.js][apikeyslistsample]                                               | list all API Keys of the given Nginx deployment x-ms-original-file: 2025-11-01/ApiKeys_List.json                                                              |
| [certificatesCreateOrUpdateSample.js][certificatescreateorupdatesample]                 | create or update the NGINX certificates for given NGINX deployment x-ms-original-file: 2025-11-01/Certificates_CreateOrUpdate.json                            |
| [certificatesDeleteSample.js][certificatesdeletesample]                                 | deletes a certificate from the NGINX deployment x-ms-original-file: 2025-11-01/Certificates_Delete.json                                                       |
| [certificatesGetSample.js][certificatesgetsample]                                       | get a certificate of given NGINX deployment x-ms-original-file: 2025-11-01/Certificates_Get.json                                                              |
| [certificatesListSample.js][certificateslistsample]                                     | list all certificates of given NGINX deployment x-ms-original-file: 2025-11-01/Certificates_List.json                                                         |
| [configurationsAnalysisSample.js][configurationsanalysissample]                         | analyze an NGINX configuration without applying it to the NGINXaaS deployment x-ms-original-file: 2025-11-01/Configurations_Analysis.json                     |
| [configurationsCreateOrUpdateSample.js][configurationscreateorupdatesample]             | create or update the NGINX configuration for given NGINX deployment x-ms-original-file: 2025-11-01/Configurations_CreateOrUpdate.json                         |
| [configurationsDeleteSample.js][configurationsdeletesample]                             | reset the NGINX configuration of given NGINX deployment to default x-ms-original-file: 2025-11-01/Configurations_Delete.json                                  |
| [configurationsGetSample.js][configurationsgetsample]                                   | get the NGINX configuration of given NGINX deployment x-ms-original-file: 2025-11-01/Configurations_Get.json                                                  |
| [configurationsListSample.js][configurationslistsample]                                 | list the NGINX configuration of given NGINX deployment. x-ms-original-file: 2025-11-01/Configurations_List.json                                               |
| [defaultWafPolicyListSample.js][defaultwafpolicylistsample]                             | get the Nginx Waf Policy of given Nginx deployment x-ms-original-file: 2025-11-01/DefaultWafPolicy_List.json                                                  |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]                   | create or update the NGINX deployment x-ms-original-file: 2025-11-01/Deployments_Create.json                                                                  |
| [deploymentsDeleteSample.js][deploymentsdeletesample]                                   | delete the NGINX deployment resource x-ms-original-file: 2025-11-01/Deployments_Delete.json                                                                   |
| [deploymentsGetSample.js][deploymentsgetsample]                                         | get the NGINX deployment x-ms-original-file: 2025-11-01/Deployments_Get.json                                                                                  |
| [deploymentsListByResourceGroupSample.js][deploymentslistbyresourcegroupsample]         | list all NGINX deployments under the specified resource group. x-ms-original-file: 2025-11-01/Deployments_ListByResourceGroup.json                            |
| [deploymentsListSample.js][deploymentslistsample]                                       | list the NGINX deployments resources x-ms-original-file: 2025-11-01/Deployments_List.json                                                                     |
| [deploymentsUpdateSample.js][deploymentsupdatesample]                                   | update the NGINX deployment x-ms-original-file: 2025-11-01/Deployments_Update.json                                                                            |
| [nginxDeploymentWafPoliciesAnalysisSample.js][nginxdeploymentwafpoliciesanalysissample] | analyze an Nginx Waf Policy x-ms-original-file: 2025-11-01/NginxDeploymentWafPolicies_Analysis.json                                                           |
| [operationsListSample.js][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2025-11-01/Operations_List.json                                                                      |
| [wafPolicyCreateSample.js][wafpolicycreatesample]                                       | create or update the Nginx Waf Policy for given Nginx deployment x-ms-original-file: 2025-11-01/WafPolicy_Create.json                                         |
| [wafPolicyDeleteSample.js][wafpolicydeletesample]                                       | reset the Nginx Waf Policy of given Nginx deployment to default x-ms-original-file: 2025-11-01/WafPolicy_Delete.json                                          |
| [wafPolicyGetSample.js][wafpolicygetsample]                                             | get the Nginx Waf Policy of given Nginx deployment x-ms-original-file: 2025-11-01/WafPolicy_Get.json                                                          |
| [wafPolicyListSample.js][wafpolicylistsample]                                           | list Waf Policies of given Nginx deployment x-ms-original-file: 2025-11-01/WafPolicy_List.json                                                                |

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
node apiKeysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node apiKeysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[apikeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/apiKeysCreateOrUpdateSample.js
[apikeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/apiKeysDeleteSample.js
[apikeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/apiKeysGetSample.js
[apikeyslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/apiKeysListSample.js
[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/certificatesCreateOrUpdateSample.js
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/certificatesDeleteSample.js
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/certificatesGetSample.js
[certificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/certificatesListSample.js
[configurationsanalysissample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/configurationsAnalysisSample.js
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/configurationsCreateOrUpdateSample.js
[configurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/configurationsDeleteSample.js
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/configurationsGetSample.js
[configurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/configurationsListSample.js
[defaultwafpolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/defaultWafPolicyListSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsCreateOrUpdateSample.js
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsDeleteSample.js
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsGetSample.js
[deploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsListByResourceGroupSample.js
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsListSample.js
[deploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/deploymentsUpdateSample.js
[nginxdeploymentwafpoliciesanalysissample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/nginxDeploymentWafPoliciesAnalysisSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/operationsListSample.js
[wafpolicycreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/wafPolicyCreateSample.js
[wafpolicydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/wafPolicyDeleteSample.js
[wafpolicygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/wafPolicyGetSample.js
[wafpolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4/javascript/wafPolicyListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-nginx?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/nginx/arm-nginx/README.md
