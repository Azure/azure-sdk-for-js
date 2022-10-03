# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availabilityStatusesGetByResourceSample.js][availabilitystatusesgetbyresourcesample]               | Gets current availability status for a single resource x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/AvailabilityStatus_GetByResource.json                                                                                                                              |
| [availabilityStatusesListByResourceGroupSample.js][availabilitystatuseslistbyresourcegroupsample]   | Lists the current availability status for all the resources in the resource group. Use the nextLink property in the response to get the next page of availability statuses. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/AvailabilityStatuses_ListByResourceGroup.json |
| [availabilityStatusesListBySubscriptionIdSample.js][availabilitystatuseslistbysubscriptionidsample] | Lists the current availability status for all the resources in the subscription. Use the nextLink property in the response to get the next page of availability statuses. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/AvailabilityStatuses_ListBySubscriptionId.json  |
| [availabilityStatusesListSample.js][availabilitystatuseslistsample]                                 | Lists all historical availability transitions and impacting events for a single resource. Use the nextLink property in the response to get the next page of availability status x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/AvailabilityStatuses_List.json            |
| [childAvailabilityStatusesGetByResourceSample.js][childavailabilitystatusesgetbyresourcesample]     | Gets current availability status for a single resource x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/ChildAvailabilityStatus_GetByResource.json                                                                                                                         |
| [childAvailabilityStatusesListSample.js][childavailabilitystatuseslistsample]                       | Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/ChildAvailabilityStatuses_List.json                         |
| [childResourcesListSample.js][childresourceslistsample]                                             | Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/ChildResources_List.json                        |
| [emergingIssuesGetSample.js][emergingissuesgetsample]                                               | Gets Azure services' emerging issues. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/EmergingIssues_Get.json                                                                                                                                                             |
| [emergingIssuesListSample.js][emergingissueslistsample]                                             | Lists Azure services' emerging issues. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/stable/2017-07-01/examples/EmergingIssues_List.json                                                                                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node availabilityStatusesGetByResourceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node availabilityStatusesGetByResourceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/availabilityStatusesGetByResourceSample.js
[availabilitystatuseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/availabilityStatusesListByResourceGroupSample.js
[availabilitystatuseslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/availabilityStatusesListBySubscriptionIdSample.js
[availabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/availabilityStatusesListSample.js
[childavailabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/childAvailabilityStatusesGetByResourceSample.js
[childavailabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/childAvailabilityStatusesListSample.js
[childresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/childResourcesListSample.js
[emergingissuesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/emergingIssuesGetSample.js
[emergingissueslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v3/javascript/emergingIssuesListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcehealth?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcehealth/arm-resourcehealth/README.md
