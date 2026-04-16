---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-monitor
urlFragment: monitor-query-metrics-javascript
---

# Monitor Query Metrics client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Monitor Query Metrics in some common scenarios.

| **File Name**                                           | **Description**                                                             |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| [queryMultipleResources.js][querymultipleresources]     | Demonstrates how to query metrics for multiple Azure resources              |
| [queryWithAdvancedOptions.js][querywithadvancedoptions] | Demonstrates advanced metrics querying with filtering, ordering, and rollup |
| [queryWithTimeRange.js][querywithtimerange]             | Demonstrates how to query metrics with custom time range and granularity    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Monitor][createinstance_azuremonitor]

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
node queryMultipleResources.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env METRICS_ENDPOINT="<metrics endpoint>" METRICS_RESOURCE_IDS="<metrics resource ids>" METRICS_RESOURCE_NAMESPACE="<metrics resource namespace>" node queryMultipleResources.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[querymultipleresources]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/samples/v1/javascript/queryMultipleResources.js
[querywithadvancedoptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/samples/v1/javascript/queryWithAdvancedOptions.js
[querywithtimerange]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/samples/v1/javascript/queryWithTimeRange.js
[apiref]: https://learn.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremonitor]: https://learn.microsoft.com/azure/azure-monitor/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query-metrics/README.md
