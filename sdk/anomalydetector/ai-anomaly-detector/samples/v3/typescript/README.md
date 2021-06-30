---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-anomaly-detector
urlFragment: ai-anomaly-detector-typescript
---

# Azure Data Tables client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Data Tables in some common scenarios.

| **File Name**                                                                 | **Description**                                   |
| ----------------------------------------------------------------------------- | ------------------------------------------------- |
| [sample_detect_change_point.ts][sample_detect_change_point]                   | detects change points.                            |
| [sample_detect_entire_series_anomaly.ts][sample_detect_entire_series_anomaly] | detects anomaly points on entire series.          |
| [sample_detect_last_point_anomaly.ts][sample_detect_last_point_anomaly]       | detects anomaly for the last point on the series. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Anomaly Detector instance][createinstance_azureanomalydetectorinstance]

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
node dist/sample_detect_change_point.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env API_KEY="<api key>" ENDPOINT="<endpoint>" node dist/sample_detect_change_point.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sample_detect_change_point]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector/samples/v3/typescript/src/sample_detect_change_point.ts
[sample_detect_entire_series_anomaly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector/samples/v3/typescript/src/sample_detect_entire_series_anomaly.ts
[sample_detect_last_point_anomaly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector/samples/v3/typescript/src/sample_detect_last_point_anomaly.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-anomaly-detector
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureanomalydetectorinstance]: https://docs.microsoft.com/azure/cognitive-services/anomaly-detector/quickstarts/client-libraries?tabs=windows&pivots=programming-language-javascript
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
