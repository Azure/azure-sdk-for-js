---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-app-configuration
urlFragment: app-configuration-typescript-beta
---

# Azure App Configuration client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure App Configuration in some common scenarios.

| **File Name**                                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [helloworld.ts][helloworld]                                     | Demonstrates the CRUD operations on the configuration settings.                                                                                                                                                                                                                                                                                                                                                   |
| [helloworldWithLabels.ts][helloworldwithlabels]                 | This sample builds on concepts in helloworld.ts and shows you how to use labels.                                                                                                                                                                                                                                                                                                                                  |
| [optimisticConcurrencyViaEtag.ts][optimisticconcurrencyviaetag] | Demonstrates implementing optimistic concurrency using App Configuration and etags.                                                                                                                                                                                                                                                                                                                               |
| [setReadOnlySample.ts][setreadonlysample]                       | Demonstrates making a configuration setting read-only. This can help prevent accidental deletion or modification of a setting.                                                                                                                                                                                                                                                                                    |
| [updateSyncTokenSample.ts][updatesynctokensample]               | The AppConfiguration service supports EventGrid-based setting change notifications. This sample shows how to process these notifications. Due to the distributed nature of the AppConfiguration service, the synchronization token needs to be registered with the client to get the most up-to-date value of the setting. The ConfigurationClient.UpdateSyncToken is used to register the synchronization token. |
| [getSettingOnlyIfChanged.ts][getsettingonlyifchanged]           | Demonstrates getting a setting only if it has changed from what you already have. (This allows your app to avoid downloading the contents of a setting if the value is unchanged.)                                                                                                                                                                                                                                |
| [listConfigurationSettings.ts][listconfigurationsettings]       | Demonstrates listing multiple configuration settings using a filter for a key or label.                                                                                                                                                                                                                                                                                                                           |
| [listRevisions.ts][listrevisions]                               | Demonstrates listing revisions for a configuration setting.                                                                                                                                                                                                                                                                                                                                                       |
| [secretReference.ts][secretreference]                           | SecretReference represents a configuration setting that references as KeyVault secret.                                                                                                                                                                                                                                                                                                                            |
| [featureFlag.ts][featureflag]                                   | Feature flags are settings that follow specific JSON schema for the value.                                                                                                                                                                                                                                                                                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure App Configuration account][createinstance_azureappconfigurationaccount]

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
node dist/helloworld.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env APPCONFIG_CONNECTION_STRING="<appconfig connection string>" node dist/helloworld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/helloworld.ts
[helloworldwithlabels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/helloworldWithLabels.ts
[optimisticconcurrencyviaetag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/optimisticConcurrencyViaEtag.ts
[setreadonlysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/setReadOnlySample.ts
[updatesynctokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/updateSyncTokenSample.ts
[getsettingonlyifchanged]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/getSettingOnlyIfChanged.ts
[listconfigurationsettings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/listConfigurationSettings.ts
[listrevisions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/listRevisions.ts
[secretreference]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/secretReference.ts
[featureflag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1-beta/typescript/src/featureFlag.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/app-configuration
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureappconfigurationaccount]: https://docs.microsoft.com/azure/azure-app-configuration/quickstart-aspnet-core-app?tabs=core5x#create-an-app-configuration-store
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
