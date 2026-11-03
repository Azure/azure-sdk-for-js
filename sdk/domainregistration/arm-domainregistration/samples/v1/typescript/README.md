# @azure/arm-domainregistration client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-domainregistration in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [domainRegistrationProviderListOperationsSample.ts][domainregistrationproviderlistoperationssample] | description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider x-ms-original-file: 2024-11-01/ListOperations.json                              |
| [domainsCheckAvailabilitySample.ts][domainscheckavailabilitysample]                                 | description for Check if a domain is available for registration. x-ms-original-file: 2024-11-01/CheckDomainAvailability.json                                                                        |
| [domainsCreateOrUpdateOwnershipIdentifierSample.ts][domainscreateorupdateownershipidentifiersample] | description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier x-ms-original-file: 2024-11-01/CreateAppServiceDomainOwnershipIdentifier.json |
| [domainsCreateOrUpdateSample.ts][domainscreateorupdatesample]                                       | description for Creates or updates a domain. x-ms-original-file: 2024-11-01/CreateAppServiceDomain.json                                                                                             |
| [domainsDeleteOwnershipIdentifierSample.ts][domainsdeleteownershipidentifiersample]                 | description for Delete ownership identifier for domain x-ms-original-file: 2024-11-01/DeleteAppServiceDomainOwnershipIdentifier.json                                                                |
| [domainsDeleteSample.ts][domainsdeletesample]                                                       | description for Delete a domain. x-ms-original-file: 2024-11-01/DeleteAppServiceDomain.json                                                                                                         |
| [domainsGetControlCenterSsoRequestSample.ts][domainsgetcontrolcenterssorequestsample]               | description for Generate a single sign-on request for the domain management portal. x-ms-original-file: 2024-11-01/GetDomainControlCenterSsoRequest.json                                            |
| [domainsGetOwnershipIdentifierSample.ts][domainsgetownershipidentifiersample]                       | description for Get ownership identifier for domain x-ms-original-file: 2024-11-01/GetDomainOwnershipIdentifier.json                                                                                |
| [domainsGetSample.ts][domainsgetsample]                                                             | description for Get a domain. x-ms-original-file: 2024-11-01/GetDomain.json                                                                                                                         |
| [domainsListByResourceGroupSample.ts][domainslistbyresourcegroupsample]                             | description for Get all domains in a resource group. x-ms-original-file: 2024-11-01/ListDomainsByResourceGroup.json                                                                                 |
| [domainsListOwnershipIdentifiersSample.ts][domainslistownershipidentifierssample]                   | description for Lists domain ownership identifiers. x-ms-original-file: 2024-11-01/ListDomainOwnershipIdentifiers.json                                                                              |
| [domainsListRecommendationsSample.ts][domainslistrecommendationssample]                             | description for Get domain name recommendations based on keywords. x-ms-original-file: 2024-11-01/ListDomainRecommendations.json                                                                    |
| [domainsListSample.ts][domainslistsample]                                                           | description for Get all domains in a subscription. x-ms-original-file: 2024-11-01/ListDomainsBySubscription.json                                                                                    |
| [domainsRenewSample.ts][domainsrenewsample]                                                         | description for Renew a domain. x-ms-original-file: 2024-11-01/RenewDomain.json                                                                                                                     |
| [domainsTransferOutSample.ts][domainstransferoutsample]                                             | transfer out domain to another registrar x-ms-original-file: 2024-11-01/TransferOutDomain.json                                                                                                      |
| [domainsUpdateOwnershipIdentifierSample.ts][domainsupdateownershipidentifiersample]                 | description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier x-ms-original-file: 2024-11-01/UpdateAppServiceDomainOwnershipIdentifier.json |
| [domainsUpdateSample.ts][domainsupdatesample]                                                       | description for Creates or updates a domain. x-ms-original-file: 2024-11-01/UpdateAppServiceDomain.json                                                                                             |
| [topLevelDomainsGetSample.ts][topleveldomainsgetsample]                                             | description for Get details of a top-level domain. x-ms-original-file: 2024-11-01/GetTopLevelDomain.json                                                                                            |
| [topLevelDomainsListAgreementsSample.ts][topleveldomainslistagreementssample]                       | description for Gets all legal agreements that user needs to accept before purchasing a domain. x-ms-original-file: 2024-11-01/ListTopLevelDomainAgreements.json                                    |
| [topLevelDomainsListSample.ts][topleveldomainslistsample]                                           | description for Get all top-level domains supported for registration. x-ms-original-file: 2024-11-01/ListTopLevelDomains.json                                                                       |

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
node dist/domainRegistrationProviderListOperationsSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/domainRegistrationProviderListOperationsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[domainregistrationproviderlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainRegistrationProviderListOperationsSample.ts
[domainscheckavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsCheckAvailabilitySample.ts
[domainscreateorupdateownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsCreateOrUpdateOwnershipIdentifierSample.ts
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsCreateOrUpdateSample.ts
[domainsdeleteownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsDeleteOwnershipIdentifierSample.ts
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsDeleteSample.ts
[domainsgetcontrolcenterssorequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsGetControlCenterSsoRequestSample.ts
[domainsgetownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsGetOwnershipIdentifierSample.ts
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsGetSample.ts
[domainslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsListByResourceGroupSample.ts
[domainslistownershipidentifierssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsListOwnershipIdentifiersSample.ts
[domainslistrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsListRecommendationsSample.ts
[domainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsListSample.ts
[domainsrenewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsRenewSample.ts
[domainstransferoutsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsTransferOutSample.ts
[domainsupdateownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsUpdateOwnershipIdentifierSample.ts
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/domainsUpdateSample.ts
[topleveldomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/topLevelDomainsGetSample.ts
[topleveldomainslistagreementssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/topLevelDomainsListAgreementsSample.ts
[topleveldomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/typescript/src/topLevelDomainsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-domainregistration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/domainregistration/arm-domainregistration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
