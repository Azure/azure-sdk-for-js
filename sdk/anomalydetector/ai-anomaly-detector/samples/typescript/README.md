---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-anomaly-detector-typescript
---

# Azure Anomaly Detector client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Services Anomaly Detector in some common scenarios.

| **File Name**                                                       | **Description**                                  |
| ------------------------------------------------------------------- | ------------------------------------------------ |
| [src/sample_detect_entire_series_anomaly.ts][detectentireseriesanomaly] | Detect anomaly for each point of the series      |
| [src/sample_detect_last_point_anomaly.ts][detectlastpointanomaly]       | Detect anomaly for the last point of the series  |
| [src/sample_detect_change_point.ts][detectchangepoint]                  | Detect change point for each point of the series |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/sample_detect_entire_series_anomaly.js
```

[detectentireseriesanomaly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/typescript/src/sample_detect_entire_series_anomaly.ts
[detectlastpointanomaly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/typescript/src/sample_detect_last_point_anomaly.ts
[detectchangepoint]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/typescript/src/sample_detect_change_point.ts
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
