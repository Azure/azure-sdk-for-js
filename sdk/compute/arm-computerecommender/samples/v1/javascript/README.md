# @azure/arm-computerecommender client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computerecommender in some common scenarios.

| **File Name**                                                     | **Description**                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                   | list the operations for the provider x-ms-original-file: 2025-06-05/Operations_List_MaximumSet_Gen.json      |
| [spotPlacementScoresGetSample.js][spotplacementscoresgetsample]   | gets Spot Placement Scores metadata. x-ms-original-file: 2025-06-05/GetSpotPlacementScores.json              |
| [spotPlacementScoresPostSample.js][spotplacementscorespostsample] | generates placement scores for Spot VM skus. x-ms-original-file: 2025-06-05/GenerateSpotPlacementScores.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computerecommender/samples/v1/javascript/operationsListSample.js
[spotplacementscoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computerecommender/samples/v1/javascript/spotPlacementScoresGetSample.js
[spotplacementscorespostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computerecommender/samples/v1/javascript/spotPlacementScoresPostSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computerecommender?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computerecommender/README.md
