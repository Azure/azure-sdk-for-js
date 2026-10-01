# @azure/arm-powerplatform client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-powerplatform in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]                                                     | creates an account. x-ms-original-file: 2020-10-30-preview/createOrUpdateAccount.json                                                                 |
| [accountsDeleteSample.ts][accountsdeletesample]                                                                     | delete an account. x-ms-original-file: 2020-10-30-preview/deleteAccount.json                                                                          |
| [accountsGetSample.ts][accountsgetsample]                                                                           | get information about an account. x-ms-original-file: 2020-10-30-preview/getAccount.json                                                              |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                                           | retrieve a list of accounts within a given resource group. x-ms-original-file: 2020-10-30-preview/listAccountsByResourceGroup.json                    |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]                                             | retrieve a list of accounts within a subscription. x-ms-original-file: 2020-10-30-preview/listAccountsBySubscription.json                             |
| [accountsUpdateSample.ts][accountsupdatesample]                                                                     | updates an account. x-ms-original-file: 2020-10-30-preview/updateAccount.json                                                                         |
| [enterprisePoliciesCreateOrUpdateSample.ts][enterprisepoliciescreateorupdatesample]                                 | creates an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/createOrUpdateEnterprisePolicy.json                                                |
| [enterprisePoliciesDeleteSample.ts][enterprisepoliciesdeletesample]                                                 | delete an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/deleteEnterprisePolicy.json                                                         |
| [enterprisePoliciesGetSample.ts][enterprisepoliciesgetsample]                                                       | get information about an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/getEnterprisePolicy.json                                             |
| [enterprisePoliciesListByResourceGroupSample.ts][enterprisepolicieslistbyresourcegroupsample]                       | retrieve a list of EnterprisePolicies within a given resource group x-ms-original-file: 2020-10-30-preview/listEnterprisePoliciesByResourceGroup.json |
| [enterprisePoliciesListBySubscriptionSample.ts][enterprisepolicieslistbysubscriptionsample]                         | retrieve a list of EnterprisePolicies within a subscription x-ms-original-file: 2020-10-30-preview/listEnterprisePoliciesBySubscription.json          |
| [enterprisePoliciesUpdateSample.ts][enterprisepoliciesupdatesample]                                                 | updates an EnterprisePolicy x-ms-original-file: 2020-10-30-preview/updateEnterprisePolicy.json                                                        |
| [operationsListSample.ts][operationslistsample]                                                                     | lists all of the available PowerPlatform REST API operations. x-ms-original-file: 2020-10-30-preview/listOperations.json                              |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                 | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionUpdate.json        |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                 | deletes a private endpoint connection with a given name. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionDelete.json                  |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                       | gets a private endpoint connection. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionGet.json                                          |
| [privateEndpointConnectionsListByEnterprisePolicySample.ts][privateendpointconnectionslistbyenterprisepolicysample] | list all private endpoint connections on an EnterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateEndpointConnectionListGet.json            |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                   | gets the private link resources that need to be created for an EnterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateLinkResourceGet.json   |
| [privateLinkResourcesListByEnterprisePolicySample.ts][privatelinkresourceslistbyenterprisepolicysample]             | gets the private link resources that need to be created for enterprisePolicy. x-ms-original-file: 2020-10-30-preview/PrivateLinkResourceListGet.json  |

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
node dist/accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsListBySubscriptionSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/accountsUpdateSample.ts
[enterprisepoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesCreateOrUpdateSample.ts
[enterprisepoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesDeleteSample.ts
[enterprisepoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesGetSample.ts
[enterprisepolicieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesListByResourceGroupSample.ts
[enterprisepolicieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesListBySubscriptionSample.ts
[enterprisepoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/enterprisePoliciesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyenterprisepolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateEndpointConnectionsListByEnterprisePolicySample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyenterprisepolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerplatform/arm-powerplatform/samples/v1-beta/typescript/src/privateLinkResourcesListByEnterprisePolicySample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerplatform?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerplatform/arm-powerplatform/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
