# @azure/arm-containerregistry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-containerregistry in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cacheRulesCreateSample.ts][cacherulescreatesample]                                                 | creates a cache rule for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/CacheRuleCreate.json                                                                                                                   |
| [cacheRulesDeleteSample.ts][cacherulesdeletesample]                                                 | deletes a cache rule resource from a container registry. x-ms-original-file: 2025-11-01/CacheRuleDelete.json                                                                                                                                       |
| [cacheRulesGetSample.ts][cacherulesgetsample]                                                       | gets the properties of the specified cache rule resource. x-ms-original-file: 2025-11-01/CacheRuleGet.json                                                                                                                                         |
| [cacheRulesListSample.ts][cacheruleslistsample]                                                     | lists all cache rule resources for the specified container registry. x-ms-original-file: 2025-11-01/CacheRuleList.json                                                                                                                             |
| [cacheRulesUpdateSample.ts][cacherulesupdatesample]                                                 | updates a cache rule for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/CacheRuleUpdate.json                                                                                                                   |
| [connectedRegistriesCreateSample.ts][connectedregistriescreatesample]                               | creates a connected registry for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/ConnectedRegistryCreate.json                                                                                                   |
| [connectedRegistriesDeactivateSample.ts][connectedregistriesdeactivatesample]                       | deactivates the connected registry instance. x-ms-original-file: 2025-11-01/ConnectedRegistryDeactivate.json                                                                                                                                       |
| [connectedRegistriesDeleteSample.ts][connectedregistriesdeletesample]                               | deletes a connected registry from a container registry. x-ms-original-file: 2025-11-01/ConnectedRegistryDelete.json                                                                                                                                |
| [connectedRegistriesGetSample.ts][connectedregistriesgetsample]                                     | gets the properties of the connected registry. x-ms-original-file: 2025-11-01/ConnectedRegistryGet.json                                                                                                                                            |
| [connectedRegistriesListSample.ts][connectedregistrieslistsample]                                   | lists all connected registries for the specified container registry. x-ms-original-file: 2025-11-01/ConnectedRegistryList.json                                                                                                                     |
| [connectedRegistriesUpdateSample.ts][connectedregistriesupdatesample]                               | updates a connected registry with the specified parameters. x-ms-original-file: 2025-11-01/ConnectedRegistryUpdate.json                                                                                                                            |
| [credentialSetsCreateSample.ts][credentialsetscreatesample]                                         | creates a credential set for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/CredentialSetCreate.json                                                                                                           |
| [credentialSetsDeleteSample.ts][credentialsetsdeletesample]                                         | deletes a credential set from a container registry. x-ms-original-file: 2025-11-01/CredentialSetDelete.json                                                                                                                                        |
| [credentialSetsGetSample.ts][credentialsetsgetsample]                                               | gets the properties of the specified credential set resource. x-ms-original-file: 2025-11-01/CredentialSetGet.json                                                                                                                                 |
| [credentialSetsListSample.ts][credentialsetslistsample]                                             | lists all credential set resources for the specified container registry. x-ms-original-file: 2025-11-01/CredentialSetList.json                                                                                                                     |
| [credentialSetsUpdateSample.ts][credentialsetsupdatesample]                                         | updates a credential set for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/CredentialSetUpdate.json                                                                                                           |
| [operationsListSample.ts][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2025-11-01/OperationList.json                                                                                                                                                             |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample] | update the state of specified private endpoint connection associated with the container registry. x-ms-original-file: 2025-11-01/PrivateEndpointConnectionCreateOrUpdate.json                                                                      |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | deletes the specified private endpoint connection associated with the container registry. x-ms-original-file: 2025-11-01/PrivateEndpointConnectionDelete.json                                                                                      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | get the specified private endpoint connection associated with the container registry. x-ms-original-file: 2025-11-01/PrivateEndpointConnectionGet.json                                                                                             |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | list all private endpoint connections in a container registry. x-ms-original-file: 2025-11-01/PrivateEndpointConnectionList.json                                                                                                                   |
| [registriesCheckNameAvailabilitySample.ts][registrieschecknameavailabilitysample]                   | checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length. x-ms-original-file: 2025-11-01/RegistryCheckNameAvailable.json |
| [registriesCreateSample.ts][registriescreatesample]                                                 | creates a container registry with the specified parameters. x-ms-original-file: 2025-11-01/RegistryCreate.json                                                                                                                                     |
| [registriesDeleteSample.ts][registriesdeletesample]                                                 | deletes a container registry. x-ms-original-file: 2025-11-01/RegistryDelete.json                                                                                                                                                                   |
| [registriesGenerateCredentialsSample.ts][registriesgeneratecredentialssample]                       | generate keys for a token of a specified container registry. x-ms-original-file: 2025-11-01/RegistryGenerateCredentials.json                                                                                                                       |
| [registriesGetPrivateLinkResourceSample.ts][registriesgetprivatelinkresourcesample]                 | gets a private link resource by a specified group name for a container registry. x-ms-original-file: 2025-11-01/RegistryGetPrivateLinkResource.json                                                                                                |
| [registriesGetSample.ts][registriesgetsample]                                                       | gets the properties of the specified container registry. x-ms-original-file: 2025-11-01/RegistryGet.json                                                                                                                                           |
| [registriesImportImageSample.ts][registriesimportimagesample]                                       | copies an image to this container registry from the specified container registry. x-ms-original-file: 2025-11-01/ImportImageByManifestDigest.json                                                                                                  |
| [registriesListByResourceGroupSample.ts][registrieslistbyresourcegroupsample]                       | lists all the container registries under the specified resource group. x-ms-original-file: 2025-11-01/RegistryListByResourceGroup.json                                                                                                             |
| [registriesListCredentialsSample.ts][registrieslistcredentialssample]                               | lists the login credentials for the specified container registry. x-ms-original-file: 2025-11-01/RegistryListCredentials.json                                                                                                                      |
| [registriesListPrivateLinkResourcesSample.ts][registrieslistprivatelinkresourcessample]             | lists the private link resources for a container registry. x-ms-original-file: 2025-11-01/RegistryListPrivateLinkResources.json                                                                                                                    |
| [registriesListSample.ts][registrieslistsample]                                                     | lists all the container registries under the specified subscription. x-ms-original-file: 2025-11-01/RegistryList.json                                                                                                                              |
| [registriesListUsagesSample.ts][registrieslistusagessample]                                         | gets the quota usages for the specified container registry. x-ms-original-file: 2025-11-01/RegistryListUsages.json                                                                                                                                 |
| [registriesRegenerateCredentialSample.ts][registriesregeneratecredentialsample]                     | regenerates one of the login credentials for the specified container registry. x-ms-original-file: 2025-11-01/RegistryRegenerateCredential.json                                                                                                    |
| [registriesUpdateSample.ts][registriesupdatesample]                                                 | updates a container registry with the specified parameters. x-ms-original-file: 2025-11-01/RegistryUpdate.json                                                                                                                                     |
| [replicationsCreateSample.ts][replicationscreatesample]                                             | creates a replication for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/ReplicationCreate.json                                                                                                                |
| [replicationsDeleteSample.ts][replicationsdeletesample]                                             | deletes a replication from a container registry. x-ms-original-file: 2025-11-01/ReplicationDelete.json                                                                                                                                             |
| [replicationsGetSample.ts][replicationsgetsample]                                                   | gets the properties of the specified replication. x-ms-original-file: 2025-11-01/ReplicationGet.json                                                                                                                                               |
| [replicationsListSample.ts][replicationslistsample]                                                 | lists all the replications for the specified container registry. x-ms-original-file: 2025-11-01/ReplicationList.json                                                                                                                               |
| [replicationsUpdateSample.ts][replicationsupdatesample]                                             | updates a replication for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/ReplicationUpdate.json                                                                                                                |
| [scopeMapsCreateSample.ts][scopemapscreatesample]                                                   | creates a scope map for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/ScopeMapCreate.json                                                                                                                     |
| [scopeMapsDeleteSample.ts][scopemapsdeletesample]                                                   | deletes a scope map from a container registry. x-ms-original-file: 2025-11-01/ScopeMapDelete.json                                                                                                                                                  |
| [scopeMapsGetSample.ts][scopemapsgetsample]                                                         | gets the properties of the specified scope map. x-ms-original-file: 2025-11-01/ScopeMapGet.json                                                                                                                                                    |
| [scopeMapsListSample.ts][scopemapslistsample]                                                       | lists all the scope maps for the specified container registry. x-ms-original-file: 2025-11-01/ScopeMapList.json                                                                                                                                    |
| [scopeMapsUpdateSample.ts][scopemapsupdatesample]                                                   | updates a scope map with the specified parameters. x-ms-original-file: 2025-11-01/ScopeMapUpdate.json                                                                                                                                              |
| [tokensCreateSample.ts][tokenscreatesample]                                                         | creates a token for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/TokenCreate.json                                                                                                                            |
| [tokensDeleteSample.ts][tokensdeletesample]                                                         | deletes a token from a container registry. x-ms-original-file: 2025-11-01/TokenDelete.json                                                                                                                                                         |
| [tokensGetSample.ts][tokensgetsample]                                                               | gets the properties of the specified token. x-ms-original-file: 2025-11-01/TokenGet.json                                                                                                                                                           |
| [tokensListSample.ts][tokenslistsample]                                                             | lists all the tokens for the specified container registry. x-ms-original-file: 2025-11-01/TokenList.json                                                                                                                                           |
| [tokensUpdateSample.ts][tokensupdatesample]                                                         | updates a token with the specified parameters. x-ms-original-file: 2025-11-01/TokenUpdate.json                                                                                                                                                     |
| [webhooksCreateSample.ts][webhookscreatesample]                                                     | creates a webhook for a container registry with the specified parameters. x-ms-original-file: 2025-11-01/WebhookCreate.json                                                                                                                        |
| [webhooksDeleteSample.ts][webhooksdeletesample]                                                     | deletes a webhook from a container registry. x-ms-original-file: 2025-11-01/WebhookDelete.json                                                                                                                                                     |
| [webhooksGetCallbackConfigSample.ts][webhooksgetcallbackconfigsample]                               | gets the configuration of service URI and custom headers for the webhook. x-ms-original-file: 2025-11-01/WebhookGetCallbackConfig.json                                                                                                             |
| [webhooksGetSample.ts][webhooksgetsample]                                                           | gets the properties of the specified webhook. x-ms-original-file: 2025-11-01/WebhookGet.json                                                                                                                                                       |
| [webhooksListEventsSample.ts][webhookslisteventssample]                                             | lists recent events for the specified webhook. x-ms-original-file: 2025-11-01/WebhookListEvents.json                                                                                                                                               |
| [webhooksListSample.ts][webhookslistsample]                                                         | lists all the webhooks for the specified container registry. x-ms-original-file: 2025-11-01/WebhookList.json                                                                                                                                       |
| [webhooksPingSample.ts][webhookspingsample]                                                         | triggers a ping event to be sent to the webhook. x-ms-original-file: 2025-11-01/WebhookPing.json                                                                                                                                                   |
| [webhooksUpdateSample.ts][webhooksupdatesample]                                                     | updates a webhook with the specified parameters. x-ms-original-file: 2025-11-01/WebhookUpdate.json                                                                                                                                                 |

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
node dist/cacheRulesCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/cacheRulesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cacherulescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/cacheRulesCreateSample.ts
[cacherulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/cacheRulesDeleteSample.ts
[cacherulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/cacheRulesGetSample.ts
[cacheruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/cacheRulesListSample.ts
[cacherulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/cacheRulesUpdateSample.ts
[connectedregistriescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesCreateSample.ts
[connectedregistriesdeactivatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesDeactivateSample.ts
[connectedregistriesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesDeleteSample.ts
[connectedregistriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesGetSample.ts
[connectedregistrieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesListSample.ts
[connectedregistriesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/connectedRegistriesUpdateSample.ts
[credentialsetscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/credentialSetsCreateSample.ts
[credentialsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/credentialSetsDeleteSample.ts
[credentialsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/credentialSetsGetSample.ts
[credentialsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/credentialSetsListSample.ts
[credentialsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/credentialSetsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/privateEndpointConnectionsListSample.ts
[registrieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesCheckNameAvailabilitySample.ts
[registriescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesCreateSample.ts
[registriesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesDeleteSample.ts
[registriesgeneratecredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesGenerateCredentialsSample.ts
[registriesgetprivatelinkresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesGetPrivateLinkResourceSample.ts
[registriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesGetSample.ts
[registriesimportimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesImportImageSample.ts
[registrieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesListByResourceGroupSample.ts
[registrieslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesListCredentialsSample.ts
[registrieslistprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesListPrivateLinkResourcesSample.ts
[registrieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesListSample.ts
[registrieslistusagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesListUsagesSample.ts
[registriesregeneratecredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesRegenerateCredentialSample.ts
[registriesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/registriesUpdateSample.ts
[replicationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/replicationsCreateSample.ts
[replicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/replicationsDeleteSample.ts
[replicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/replicationsGetSample.ts
[replicationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/replicationsListSample.ts
[replicationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/replicationsUpdateSample.ts
[scopemapscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/scopeMapsCreateSample.ts
[scopemapsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/scopeMapsDeleteSample.ts
[scopemapsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/scopeMapsGetSample.ts
[scopemapslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/scopeMapsListSample.ts
[scopemapsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/scopeMapsUpdateSample.ts
[tokenscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/tokensCreateSample.ts
[tokensdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/tokensDeleteSample.ts
[tokensgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/tokensGetSample.ts
[tokenslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/tokensListSample.ts
[tokensupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/tokensUpdateSample.ts
[webhookscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksCreateSample.ts
[webhooksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksDeleteSample.ts
[webhooksgetcallbackconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksGetCallbackConfigSample.ts
[webhooksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksGetSample.ts
[webhookslisteventssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksListEventsSample.ts
[webhookslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksListSample.ts
[webhookspingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksPingSample.ts
[webhooksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/arm-containerregistry/samples/v11/typescript/src/webhooksUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/arm-containerregistry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
