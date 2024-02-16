# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                     | **Description**                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availabilityStatusesGetByResourceSample.ts][availabilitystatusesgetbyresourcesample]                                                             | Gets current availability status for a single resource x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/AvailabilityStatus_GetByResource.json                                                                                                            |
| [availabilityStatusesListByResourceGroupSample.ts][availabilitystatuseslistbyresourcegroupsample]                                                 | Lists the current availability status for all the resources in the resource group. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/AvailabilityStatuses_ListByResourceGroup.json                                                                        |
| [availabilityStatusesListBySubscriptionIdSample.ts][availabilitystatuseslistbysubscriptionidsample]                                               | Lists the current availability status for all the resources in the subscription. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/AvailabilityStatuses_ListBySubscriptionId.json                                                                         |
| [availabilityStatusesListSample.ts][availabilitystatuseslistsample]                                                                               | Lists all historical availability transitions and impacting events for a single resource. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/AvailabilityStatuses_List.json                                                                                |
| [childAvailabilityStatusesGetByResourceSample.ts][childavailabilitystatusesgetbyresourcesample]                                                   | Gets current availability status for a single resource x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ChildAvailabilityStatus_GetByResource.json                                                                                                       |
| [childAvailabilityStatusesListSample.ts][childavailabilitystatuseslistsample]                                                                     | Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ChildAvailabilityStatuses_List.json       |
| [childResourcesListSample.ts][childresourceslistsample]                                                                                           | Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ChildResources_List.json      |
| [emergingIssuesGetSample.ts][emergingissuesgetsample]                                                                                             | Gets Azure services' emerging issues. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/EmergingIssues_Get.json                                                                                                                                           |
| [emergingIssuesListSample.ts][emergingissueslistsample]                                                                                           | Lists Azure services' emerging issues. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/EmergingIssues_List.json                                                                                                                                         |
| [eventFetchDetailsBySubscriptionIdAndTrackingIdSample.ts][eventfetchdetailsbysubscriptionidandtrackingidsample]                                   | Service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Event_fetchDetailsBySubscriptionIdAndTrackingId.json |
| [eventFetchDetailsByTenantIdAndTrackingIdSample.ts][eventfetchdetailsbytenantidandtrackingidsample]                                               | Service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Event_fetchDetailsByTenantIdAndTrackingId.json             |
| [eventGetBySubscriptionIdAndTrackingIdSample.ts][eventgetbysubscriptionidandtrackingidsample]                                                     | Service health event in the subscription by event tracking id x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Event_GetBySubscriptionIdAndTrackingId.json                                                                                               |
| [eventGetByTenantIdAndTrackingIdSample.ts][eventgetbytenantidandtrackingidsample]                                                                 | Service health event in the tenant by event tracking id x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Event_GetByTenantIdAndTrackingId.json                                                                                                           |
| [eventsListBySingleResourceSample.ts][eventslistbysingleresourcesample]                                                                           | Lists current service health events for given resource. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Events_ListBySingleResource.json                                                                                                                |
| [eventsListBySubscriptionIdSample.ts][eventslistbysubscriptionidsample]                                                                           | Lists service health events in the subscription. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Events_ListBySubscriptionId.json                                                                                                                       |
| [eventsListByTenantIdSample.ts][eventslistbytenantidsample]                                                                                       | Lists current service health events in the tenant. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Events_ListByTenantId.json                                                                                                                           |
| [impactedResourcesGetByTenantIdSample.ts][impactedresourcesgetbytenantidsample]                                                                   | Gets the specific impacted resource in the tenant by an event. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ImpactedResources_GetByTenantId.json                                                                                                     |
| [impactedResourcesGetSample.ts][impactedresourcesgetsample]                                                                                       | Gets the specific impacted resource in the subscription by an event. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ImpactedResources_Get.json                                                                                                         |
| [impactedResourcesListBySubscriptionIdAndEventIdSample.ts][impactedresourceslistbysubscriptionidandeventidsample]                                 | Lists impacted resources in the subscription by an event. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ImpactedResources_ListBySubscriptionId_ListByEventId.json                                                                                     |
| [impactedResourcesListByTenantIdAndEventIdSample.ts][impactedresourceslistbytenantidandeventidsample]                                             | Lists impacted resources in the tenant by an event. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ImpactedResources_ListByTenantId_ListByEventId.json                                                                                                 |
| [metadataGetEntitySample.ts][metadatagetentitysample]                                                                                             | Gets the list of metadata entities. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Metadata_GetEntity.json                                                                                                                                             |
| [metadataListSample.ts][metadatalistsample]                                                                                                       | Gets the list of metadata entities. x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Metadata_List.json                                                                                                                                                  |
| [operationsListSample.ts][operationslistsample]                                                                                                   | Lists available operations for the resourcehealth resource provider x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Operations_List.json                                                                                                                |
| [securityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdSample.ts][securityadvisoryimpactedresourceslistbysubscriptionidandeventidsample] | Lists impacted resources in the subscription by an event (Security Advisory). x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/SecurityAdvisoryImpactedResources_ListBySubscriptionId_ListByEventId.json                                                 |
| [securityAdvisoryImpactedResourcesListByTenantIdAndEventIdSample.ts][securityadvisoryimpactedresourceslistbytenantidandeventidsample]             | Lists impacted resources in the tenant by an event (Security Advisory). x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/SecurityAdvisoryImpactedResources_ListByTenantId_ListByEventId.json                                                             |

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
node dist/availabilityStatusesGetByResourceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/availabilityStatusesGetByResourceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/availabilityStatusesGetByResourceSample.ts
[availabilitystatuseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/availabilityStatusesListByResourceGroupSample.ts
[availabilitystatuseslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/availabilityStatusesListBySubscriptionIdSample.ts
[availabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/availabilityStatusesListSample.ts
[childavailabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/childAvailabilityStatusesGetByResourceSample.ts
[childavailabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/childAvailabilityStatusesListSample.ts
[childresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/childResourcesListSample.ts
[emergingissuesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/emergingIssuesGetSample.ts
[emergingissueslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/emergingIssuesListSample.ts
[eventfetchdetailsbysubscriptionidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventFetchDetailsBySubscriptionIdAndTrackingIdSample.ts
[eventfetchdetailsbytenantidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventFetchDetailsByTenantIdAndTrackingIdSample.ts
[eventgetbysubscriptionidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventGetBySubscriptionIdAndTrackingIdSample.ts
[eventgetbytenantidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventGetByTenantIdAndTrackingIdSample.ts
[eventslistbysingleresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventsListBySingleResourceSample.ts
[eventslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventsListBySubscriptionIdSample.ts
[eventslistbytenantidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/eventsListByTenantIdSample.ts
[impactedresourcesgetbytenantidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/impactedResourcesGetByTenantIdSample.ts
[impactedresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/impactedResourcesGetSample.ts
[impactedresourceslistbysubscriptionidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/impactedResourcesListBySubscriptionIdAndEventIdSample.ts
[impactedresourceslistbytenantidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/impactedResourcesListByTenantIdAndEventIdSample.ts
[metadatagetentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/metadataGetEntitySample.ts
[metadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/metadataListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/operationsListSample.ts
[securityadvisoryimpactedresourceslistbysubscriptionidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/securityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdSample.ts
[securityadvisoryimpactedresourceslistbytenantidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v4-beta/typescript/src/securityAdvisoryImpactedResourcesListByTenantIdAndEventIdSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcehealth?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcehealth/arm-resourcehealth/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
