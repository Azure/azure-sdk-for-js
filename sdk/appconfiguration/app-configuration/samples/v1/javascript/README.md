---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-app-configuration
urlFragment: app-configuration-javascript
---

# Azure App Configuration client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure App Configuration in some common scenarios.

| **File Name**                                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [helloworld.js][helloworld]                                     | Demonstrates the CRUD operations on the configuration settings.                                                                                                                                                                                                                                                                                                                                                   |
| [snapshot.js][snapshot]                                         | Demonstrates the CRUD operations on the snapshot.                                                                                                                                                                                                                                                                                                                                                                 |
| [helloworldWithLabels.js][helloworldwithlabels]                 | This sample builds on concepts in helloworld.ts and shows you how to use labels.                                                                                                                                                                                                                                                                                                                                  |
| [optimisticConcurrencyViaEtag.js][optimisticconcurrencyviaetag] | Demonstrates implementing optimistic concurrency using App Configuration and etags.                                                                                                                                                                                                                                                                                                                               |
| [setReadOnlySample.js][setreadonlysample]                       | Demonstrates making a configuration setting read-only. This can help prevent accidental deletion or modification of a setting.                                                                                                                                                                                                                                                                                    |
| [updateSyncTokenSample.js][updatesynctokensample]               | The AppConfiguration service supports EventGrid-based setting change notifications. This sample shows how to process these notifications. Due to the distributed nature of the AppConfiguration service, the synchronization token needs to be registered with the client to get the most up-to-date value of the setting. The ConfigurationClient.UpdateSyncToken is used to register the synchronization token. |
| [getSettingOnlyIfChanged.js][getsettingonlyifchanged]           | Demonstrates getting a setting only if it has changed from what you already have. (This allows your app to avoid downloading the contents of a setting if the value is unchanged.)                                                                                                                                                                                                                                |
| [listConfigurationSettings.js][listconfigurationsettings]       | Demonstrates listing multiple configuration settings using a filter for a key or label.                                                                                                                                                                                                                                                                                                                           |
| [listLabels.js][listlabels]                                     | Demonstrates listing labels for a configuration setting store.                                                                                                                                                                                                                                                                                                                                                    |
| [listRevisions.js][listrevisions]                               | Demonstrates listing revisions for a configuration setting.                                                                                                                                                                                                                                                                                                                                                       |
| [secretReference.js][secretreference]                           | SecretReference represents a configuration setting that references as KeyVault secret.                                                                                                                                                                                                                                                                                                                            |
| [featureFlag.js][featureflag]                                   | Feature flags are settings that follow specific JSON schema for the value.                                                                                                                                                                                                                                                                                                                                        |
| [testData.js][testdata]                                         | Serialized sample App Configuration KeyValueModified event payload.                                                                                                                                                                                                                                                                                                                                               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node helloworld.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZ_CONFIG_ENDPOINT="<az config endpoint>" node helloworld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/helloworld.js
[snapshot]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/snapshot.js
[helloworldwithlabels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/helloworldWithLabels.js
[optimisticconcurrencyviaetag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/optimisticConcurrencyViaEtag.js
[setreadonlysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/setReadOnlySample.js
[updatesynctokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/updateSyncTokenSample.js
[getsettingonlyifchanged]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/getSettingOnlyIfChanged.js
[listconfigurationsettings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/listConfigurationSettings.js
[listlabels]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/listLabels.js
[listrevisions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/listRevisions.js
[secretreference]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/secretReference.js
[featureflag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/featureFlag.js
[testdata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/javascript/testData.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/app-configuration
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureappconfigurationaccount]: https://learn.microsoft.com/azure/azure-app-configuration/quickstart-aspnet-core-app?tabs=core5x#create-an-app-configuration-store
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/README.md
