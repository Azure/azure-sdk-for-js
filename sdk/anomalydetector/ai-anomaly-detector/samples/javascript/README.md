---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-anomaly-detector-javascript
---

# Azure Anomaly Detector client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Services Anomaly Detector in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [sample_detect_entire_series_anomaly.js][detectentireseriesanomaly]                           | Detect anomaly for each point of the series                                                                      |
| [sample_detect_last_point_anomaly.js][detectlastpointanomaly]                           | Detect anomaly for the last point of the series                                               |
| [sample_detect_change_point.js][detectchangepoint]             | Detect change point for each point of the series                                                 |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like:

```bash
node sample_detect_entire_series_anomaly.js
```

[detectentireseriesanomaly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/javascript/sample_detect_entire_series_anomaly.js
[detectlastpointanomaly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/javascript/sample_detect_last_point_anomaly.js
[detectchangepoint]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples/javascript/sample_detect_change_point.js
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/README.md
