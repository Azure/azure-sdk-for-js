# @azure/arm-artifactsigning client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-artifactsigning in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificateProfilesCreateSample.ts][certificateprofilescreatesample]                                     | create a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Create.json                                                                  |
| [certificateProfilesDeleteSample.ts][certificateprofilesdeletesample]                                     | delete a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Delete.json                                                                  |
| [certificateProfilesGetSample.ts][certificateprofilesgetsample]                                           | get details of a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Get.json                                                             |
| [certificateProfilesListByCodeSigningAccountSample.ts][certificateprofileslistbycodesigningaccountsample] | list certificate profiles under an artifact signing account. x-ms-original-file: 2025-10-13/CertificateProfiles_ListByCodeSigningAccount.json                 |
| [certificateProfilesRevokeCertificateSample.ts][certificateprofilesrevokecertificatesample]               | revoke a certificate under a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_RevokeCertificate.json                                   |
| [codeSigningAccountsCheckNameAvailabilitySample.ts][codesigningaccountschecknameavailabilitysample]       | checks if the artifact signing account name is valid and is not already in use. x-ms-original-file: 2025-10-13/CodeSigningAccounts_CheckNameAvailability.json |
| [codeSigningAccountsCreateSample.ts][codesigningaccountscreatesample]                                     | create an artifact Signing Account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Create.json                                                            |
| [codeSigningAccountsDeleteSample.ts][codesigningaccountsdeletesample]                                     | delete an artifact signing account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Delete.json                                                            |
| [codeSigningAccountsGetSample.ts][codesigningaccountsgetsample]                                           | get an artifact Signing Account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Get.json                                                                  |
| [codeSigningAccountsListByResourceGroupSample.ts][codesigningaccountslistbyresourcegroupsample]           | lists artifact signing accounts within a resource group. x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListByResourceGroup.json                          |
| [codeSigningAccountsListBySubscriptionSample.ts][codesigningaccountslistbysubscriptionsample]             | lists artifact signing accounts within a subscription. x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListBySubscription.json                             |
| [codeSigningAccountsUpdateSample.ts][codesigningaccountsupdatesample]                                     | update an artifact signing account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Update.json                                                            |
| [operationsListSample.ts][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2025-10-13/Operations_List.json                                                                      |

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
node dist/certificateProfilesCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/certificateProfilesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificateprofilescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/certificateProfilesCreateSample.ts
[certificateprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/certificateProfilesDeleteSample.ts
[certificateprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/certificateProfilesGetSample.ts
[certificateprofileslistbycodesigningaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/certificateProfilesListByCodeSigningAccountSample.ts
[certificateprofilesrevokecertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/certificateProfilesRevokeCertificateSample.ts
[codesigningaccountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsCheckNameAvailabilitySample.ts
[codesigningaccountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsCreateSample.ts
[codesigningaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsDeleteSample.ts
[codesigningaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsGetSample.ts
[codesigningaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsListByResourceGroupSample.ts
[codesigningaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsListBySubscriptionSample.ts
[codesigningaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/codeSigningAccountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-artifactsigning?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/artifactsigning/arm-artifactsigning/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
