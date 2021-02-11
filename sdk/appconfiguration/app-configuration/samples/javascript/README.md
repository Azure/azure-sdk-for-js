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

| **File Name**                                                   | **Description**                                                                                |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [helloworld.js][helloworld]                                     | get, set, and delete configuration values                                                      |
| [helloworldWithLabels.js][helloworldwithlabels]                 | use labels to add additional dimensions to your settings for scenarios like beta vs production |
| [optimisticConcurrencyViaEtag.js][optimisticconcurrencyviaetag] | set values using etags to prevent accidental overwrites                                        |
| [setReadOnlySample.js][setreadonlysample]                       | mark settings as read-only to prevent modification                                             |
| [getSettingOnlyIfChanged.js][getsettingonlyifchanged]           | get a setting only if it has changed since the last time you got it                            |
| [listRevisions.js][listrevisions]                               | list the revisions of a key, allowing you to see previous values and when they were set        |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require a Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure App Configuration resource][azappconfig] to run these sample programs. Samples retrieve credentials to access the app configuration from an environment variable (`APPCONFIG_CONNECTION_STRING`). Alternatively, edit the source code to include the appropriate connection string.

Adapting the samples to run in the browser may require some additional consideration. For more details, please see the [package README][package].

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

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env APPCONFIG_CONNECTION_STRING="<account key>" node helloworld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[helloworld]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/helloworld.js
[helloworldwithlabels]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/helloworldWithLabels.js
[optimisticconcurrencyviaetag]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/optimisticConcurrencyViaEtag.js
[setreadonlysample]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/setReadOnlySample.js
[getsettingonlyifchanged]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/getSettingOnlyIfChanged.js
[listrevisions]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/javascript/listRevisions.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/app-configuration
[azappconfig]: https://docs.microsoft.com/azure/azure-app-configuration/
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/README.md
