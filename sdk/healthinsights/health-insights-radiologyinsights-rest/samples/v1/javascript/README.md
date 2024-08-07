# HealthInsightsRadiologyInsights samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for HealthInsightsRadiologyInsights in some common scenarios.

| **File Name**                                                                                       | **Description**           |
| --------------------------------------------------------------------------------------------------- | ------------------------- |
| [sample_age_mismatch_inference_async.js][sample_age_mismatch_inference_async]                       | Infer age mismatches from a radiology report (async) |
| [sample_complete_order_inference_async.js][sample_complete_order_inference_async]                   | Infer complete orders from a radiology report (async) |
| [sample_critical_result_inference_async.js][sample_critical_result_inference_async]                 | Infer critical results from a radiology report (async) |
| [sample_finding_inference_async.js][sample_finding_inference_async]                                 | Infer findings from a radiology report (async) |
| [sample_follow_up_communication_inference_async.js][sample_follow_up_communication_inference_async] | Infer follow up communications  from a radiology report (async) |
| [sample_follow_up_recommendation_inference_async.js][sample_follow_up_recommendation_inference_async]| Infer follow up recommendation from a radiology report (async) |
| [sample_laterality_discrepancy_inference_async.js][sample_laterality_discrepancy_inference_async]   | Infer laterality discrepancies from a radiology report (async) |
| [sample_limited_order_disrepancy_inference_async.js][sample_limited_order_disrepancy_inference_async] | Infer limited orders from a radiology report (async) |
| [sample_radioloy_procedure_inference_async.js][sample_radioloy_procedure_inference_async]           | Infer radiology procedures from a radiology report (async) |
| [sample_sex_mismatch_inference_async.js][sample_sex_mismatch_inference_async]                       | Infer sex mismatches from a radiology report (async) |
| [sample_critical_result_managed_identity.js][sample_critical_result_managed_identity]               | Sample on how to use Managed Identity credentials, should return the sam as the critical results example

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
node sample_critical_result_inference_async.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env HEALTH_INSIGHTS_KEY="<health insights key>" HEALTH_INSIGHTS_ENDPOINT="<health insights endpoint>" node sample_critical_result_inference_async.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sample_age_mismatch_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_age_mismatch_inference_async.js
[sample_complete_order_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_complete_order_discrepancy_inference_async.js
[sample_critical_result_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_critical_result_inference_async.js
[sample_finding_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_finding_inference_async.js
[sample_follow_up_communication_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_follow_up_communication_inference_async.js
[sample_follow_up_recommendation_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_follow_up_recommendation_inference_async.js
[sample_laterality_discrepancy_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_laterality_discrepancy_inference_async.js
[sample_limited_order_disrepancy_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_limited_order_disrepancy_inference_async.js
[sample_radioloy_procedure_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_radiology_procedure_inference_async.js
[sample_sex_mismatch_inference_async]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_sex_mismatch_inference_async.js
[sample_critical_result_managed_identity]:https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1/javascript/sample_critical_result_managed_identity.js
[apiref]: https://docs.microsoft.com/javascript/api
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/README.md
