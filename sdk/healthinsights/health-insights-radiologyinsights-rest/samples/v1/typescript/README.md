# HealthInsightsRadiologyInsights client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for HealthInsightsRadiologyInsights in some common scenarios.

| **File Name**                                                                                             | **Description**                                                            |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [sample_age_mismatch_inference_async.ts][sample_age_mismatch_inference_async]                             | Displays the age mismatch of the Radiology Insights request.               |
| [sample_complete_order_discrepancy_inference_async.ts][sample_complete_order_discrepancy_inference_async] | Displays the complete order discrepancy of the Radiology Insights request. |
| [sample_critical_result_inference_async.ts][sample_critical_result_inference_async]                       | Displays the critical results of the Radiology Insights request.           |
| [sample_critical_result_managed_identity.ts][sample_critical_result_managed_identity]                     | Displays the critical results of the Radiology Insights request.           |
| [sample_finding_inference_async.ts][sample_finding_inference_async]                                       | Displays the finding of the Radiology Insights request.                    |
| [sample_follow_up_communication_inference_async.ts][sample_follow_up_communication_inference_async]       | Displays the follow up communication of the Radiology Insights request.    |
| [sample_follow_up_recommendation_inference_async.ts][sample_follow_up_recommendation_inference_async]     | Displays the follow up recommendation of the Radiology Insights request.   |
| [sample_guidance_inference_async.js][sample_guidance_inference_async]                                     | Displays the guidance of the Radiology Insights request . |
| [sample_laterality_discrepancy_inference_async.js][sample_laterality_discrepancy_inference_async]         | Displays the laterality discrepancy of the Radiology Insights request.     |
| [sample_limited_order_discrepancy_inference_async.js][sample_limited_order_discrepancy_inference_async]   | Displays the limited order discrepancy of the Radiology Insights request.  |
| [sample_quality_measure_inference_async.js][sample_quality_measure_inference_async]                       | Displays the quality measure of the Radiology Insights request.  |
| [sample_radiology_procedure_inference_async.js][sample_radiology_procedure_inference_async]               | Displays the radiology procedure of the Radiology Insights request.        |
| [sample_scoring_and_assessment_inference_async.js][sample_scoring_and_assessment_inference_async]         | Displays the scoring and assessment of the Radiology Insights request.  |
| [sample_sex_mismatch_inference_async.js][sample_sex_mismatch_inference_async]                             | Displays the sex mismatch of the Radiology Insights request.               |

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
node dist/sample_age_mismatch_inference_async.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env HEALTH_INSIGHTS_API_KEY="<health insights api key>" HEALTH_INSIGHTS_ENDPOINT="<health insights endpoint>" node dist/sample_critical_result_inference_async.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sample_age_mismatch_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_age_mismatch_inference_async.ts
[sample_complete_order_discrepancy_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_complete_order_discrepancy_inference_async.ts
[sample_critical_result_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_critical_result_inference_async.ts
[sample_critical_result_managed_identity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_critical_result_managed_identity.ts
[sample_finding_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_finding_inference_async.ts
[sample_follow_up_communication_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_follow_up_communication_inference_async.ts
[sample_follow_up_recommendation_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/typescript/src/sample_follow_up_recommendation_inference_async.ts
[sample_guidance_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_guidance_inference_async.js
[sample_laterality_discrepancy_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_laterality_discrepancy_inference_async.js
[sample_limited_order_discrepancy_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_limited_order_discrepancy_inference_async.js
[sample_quality_measure_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_quality_measure_inference_async.js
[sample_radiology_procedure_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_radiology_procedure_inference_async.js
[sample_scoring_and_assessment_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_scoring_and_assessment_inference_async.js
[sample_sex_mismatch_inference_async]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_sex_mismatch_inference_async.js
[apiref]: https://learn.microsoft.com/javascript/api
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
