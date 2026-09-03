# @azure/arm-alertrulerecommendations client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-alertrulerecommendations in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                   |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [alertRuleRecommendationsListByResourceSample.js][alertrulerecommendationslistbyresourcesample]     | retrieve alert rule recommendations for a resource. x-ms-original-file: 2023-08-01-preview/AlertRuleRecommendations_GetByResource_MAC.json        |
| [alertRuleRecommendationsListByTargetTypeSample.js][alertrulerecommendationslistbytargettypesample] | retrieve alert rule recommendations for a target type. x-ms-original-file: 2023-08-01-preview/AlertRuleRecommendations_GetBySubscription_MAC.json |

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
node alertRuleRecommendationsListByResourceSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node alertRuleRecommendationsListByResourceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alertrulerecommendationslistbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertrulerecommendations/arm-alertrulerecommendations/samples/v1-beta/javascript/alertRuleRecommendationsListByResourceSample.js
[alertrulerecommendationslistbytargettypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/alertrulerecommendations/arm-alertrulerecommendations/samples/v1-beta/javascript/alertRuleRecommendationsListByTargetTypeSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-alertrulerecommendations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/alertrulerecommendations/arm-alertrulerecommendations/README.md
