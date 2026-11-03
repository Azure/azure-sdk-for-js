# @azure/arm-powerplatform client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-powerplatform in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]                                                     | creates an account. x-ms-original-file: 2020-10-30-preview/createOrUpdateAccount.json                                                                 |
| [accountsDeleteSample.js][accountsdeletesample]                                                                     | delete an account. x-ms-original-file: 2020-10-30-preview/deleteAccount.json                                                                          |
| [accountsGetSample.js][accountsgetsample]                                                                           | get information about an account. x-ms-original-file: 2020-10-30-preview/getAccount.json                                                              |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample]                                           | retrieve a list of accounts within a given resource group. x-ms-original-file: 2020-10-30-preview/listAccountsByResourceGroup.json                    |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]                                             | retrieve a list of accounts within a subscription. x-ms-original-file: 2020-10-30-preview/listAccountsBySubscription.json                             |
| [accountsUpdateSample.js][accountsupdatesample]                                                                     | updates an account. x-ms-original-file: 2020-10-30-preview/updateAccount.json                                                                         |
| [enterprisePoliciesCreateOrUpdateSample.js][enterprisepoliciescreateorupdatesample]                                 | creates an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/createOrUpdateEnterprisePolicy.json                                                |
| [enterprisePoliciesDeleteSample.js][enterprisepoliciesdeletesample]                                                 | delete an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/deleteEnterprisePolicy.json                                                         |
| [enterprisePoliciesGetSample.js][enterprisepoliciesgetsample]                                                       | get information about an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/getEnterprisePolicy.json                                             |
| [enterprisePoliciesListByResourceGroupSample.js][enterprisepolicieslistbyresourcegroupsample]                       | retrieve a list of EnterprisePolicies within a given resource group x-ms-original-file: 2020-10-30-preview/listEnterprisePoliciesByResourceGroup.json |
| [enterprisePoliciesListBySubscriptionSample.js][enterprisepolicieslistbysubscriptionsample]                         | retrieve a list of EnterprisePolicies within a subscription x-ms-original-file: 2020-10-30-preview/listEnterprisePoliciesBySubscription.json          |
| [enterprisePoliciesUpdateSample.js][enterprisepoliciesupdatesample]                                                 | updates an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/updateEnterprisePolicy.json                                                        |
| [operationsListSample.js][operationslistsample]                                                                     | lists all of the available PowerPlatform REST API operations. x-ms-original-file: 2020-10-30-preview/listOperations.json                              |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                 | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionUpdate.json        |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                 | deletes a private endpoint connection with a given name. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionDelete.json                  |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                       | gets a private endpoint connection. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionGet.json                                          |
| [privateEndpointConnectionsListByEnterprisePolicySample.js][privateendpointconnectionslistbyenterprisepolicysample] | list all private endpoint connections on an EnterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionListGet.json            |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                   | gets the private link resources that need to be created for an EnterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateLinkResourceGet.json   |
| [privateLinkResourcesListByEnterprisePolicySample.js][privatelinkresourceslistbyenterprisepolicysample]             | gets the private link resources that need to be created for enterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateLinkResourceListGet.json  |

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
node accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsListBySubscriptionSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/accountsUpdateSample.js
[enterprisepoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesCreateOrUpdateSample.js
[enterprisepoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesDeleteSample.js
[enterprisepoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesGetSample.js
[enterprisepolicieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesListByResourceGroupSample.js
[enterprisepolicieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesListBySubscriptionSample.js
[enterprisepoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/enterprisePoliciesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyenterprisepolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateEndpointConnectionsListByEnterprisePolicySample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistbyenterprisepolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/javascript/privateLinkResourcesListByEnterprisePolicySample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerplatform?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerplatform/arm-powerplatform/README.md
