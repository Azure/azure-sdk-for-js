# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [diagnosticSettingsCategoryGetSample.ts][diagnosticsettingscategorygetsample]       | Gets the diagnostic settings category for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/getDiagnosticSettingsCategory.json                                                                                                                  |
| [diagnosticSettingsCategoryListSample.ts][diagnosticsettingscategorylistsample]     | Lists the diagnostic settings categories for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/listDiagnosticSettingsCategories.json                                                                                                            |
| [diagnosticSettingsCreateOrUpdateSample.ts][diagnosticsettingscreateorupdatesample] | Creates or updates diagnostic settings for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/createOrUpdateDiagnosticSetting.json                                                                                                               |
| [diagnosticSettingsDeleteSample.ts][diagnosticsettingsdeletesample]                 | Deletes existing diagnostic settings for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/deleteDiagnosticSetting.json                                                                                                                         |
| [diagnosticSettingsGetSample.ts][diagnosticsettingsgetsample]                       | Gets the active diagnostic settings for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/getDiagnosticSetting.json                                                                                                                             |
| [diagnosticSettingsListSample.ts][diagnosticsettingslistsample]                     | Gets the active diagnostic settings list for the specified resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/listDiagnosticSettings.json                                                                                                                      |
| [eventCategoriesListSample.ts][eventcategorieslistsample]                           | Get the list of available event categories supported in the Activity Logs Service.<br>The current list includes the following: Administrative, Security, ServiceHealth, Alert, Recommendation, Policy. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2015-04-01/examples/GetEventCategories.json |
| [metricDefinitionsListSample.ts][metricdefinitionslistsample]                       | Lists the metric definitions for the resource. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2018-01-01/examples/GetMetricDefinitionsApplicationInsights.json                                                                                                                                    |
| [metricsListSample.ts][metricslistsample]                                           | **Lists the metric values for a resource**. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2018-01-01/examples/GetMetric.json                                                                                                                                                                     |
| [operationsListSample.ts][operationslistsample]                                     | Lists all of the available operations from Microsoft.Insights provider. x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2015-04-01/examples/OperationList.json                                                                                                                                     |

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
node dist/diagnosticSettingsCategoryGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/diagnosticSettingsCategoryGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[diagnosticsettingscategorygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsCategoryGetSample.ts
[diagnosticsettingscategorylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsCategoryListSample.ts
[diagnosticsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsCreateOrUpdateSample.ts
[diagnosticsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsDeleteSample.ts
[diagnosticsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsGetSample.ts
[diagnosticsettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/diagnosticSettingsListSample.ts
[eventcategorieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/eventCategoriesListSample.ts
[metricdefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/metricDefinitionsListSample.ts
[metricslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/metricsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/samples/v2/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-monitor-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/arm-monitor-profile-2020-09-01-hybrid/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
