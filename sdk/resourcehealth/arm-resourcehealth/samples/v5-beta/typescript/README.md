# @azure/arm-resourcehealth client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-resourcehealth in some common scenarios.

| **File Name**                                                                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availabilityStatusesGetByResourceSample.ts][availabilitystatusesgetbyresourcesample]                                                                     | gets current availability status for a single resource x-ms-original-file: 2025-05-01/AvailabilityStatus_GetByResource.json                                                                                                                                                                                                                   |
| [availabilityStatusesListByResourceGroupSample.ts][availabilitystatuseslistbyresourcegroupsample]                                                         | lists the current availability status for all the resources in the resource group. x-ms-original-file: 2025-05-01/AvailabilityStatuses_ListByResourceGroup.json                                                                                                                                                                               |
| [availabilityStatusesListBySubscriptionIdSample.ts][availabilitystatuseslistbysubscriptionidsample]                                                       | lists the current availability status for all the resources in the subscription. x-ms-original-file: 2025-05-01/AvailabilityStatuses_ListBySubscriptionId.json                                                                                                                                                                                |
| [availabilityStatusesListSample.ts][availabilitystatuseslistsample]                                                                                       | lists all historical availability transitions and impacting events for a single resource. x-ms-original-file: 2025-05-01/AvailabilityStatuses_List.json                                                                                                                                                                                       |
| [childAvailabilityStatusesGetByResourceSample.ts][childavailabilitystatusesgetbyresourcesample]                                                           | gets current availability status for a single resource x-ms-original-file: 2025-05-01/ChildAvailabilityStatus_GetByResource.json                                                                                                                                                                                                              |
| [childAvailabilityStatusesListSample.ts][childavailabilitystatuseslistsample]                                                                             | lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status x-ms-original-file: 2025-05-01/ChildAvailabilityStatuses_List.json                                                                                                              |
| [childResourcesListSample.ts][childresourceslistsample]                                                                                                   | lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health x-ms-original-file: 2025-05-01/ChildResources_List.json                                                                                                             |
| [emergingIssuesGetSample.ts][emergingissuesgetsample]                                                                                                     | gets Azure services' emerging issues. x-ms-original-file: 2025-05-01/EmergingIssues_Get.json                                                                                                                                                                                                                                                  |
| [emergingIssuesListSample.ts][emergingissueslistsample]                                                                                                   | lists Azure services' emerging issues. x-ms-original-file: 2025-05-01/EmergingIssues_List.json                                                                                                                                                                                                                                                |
| [eventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdSample.ts][eventfetchbilllingcommunicationdetailsbysubscriptionidandtrackingidsample] | service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type. x-ms-original-file: 2025-05-01/Event_fetchBillingCommunicationDetailsBySubscriptionIdAndTrackingId.json                                                                                |
| [eventFetchDetailsBySubscriptionIdAndTrackingIdSample.ts][eventfetchdetailsbysubscriptionidandtrackingidsample]                                           | service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access x-ms-original-file: 2025-05-01/Event_fetchDetailsBySubscriptionIdAndTrackingId.json |
| [eventFetchDetailsByTenantIdAndTrackingIdSample.ts][eventfetchdetailsbytenantidandtrackingidsample]                                                       | service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access x-ms-original-file: 2025-05-01/Event_fetchDetailsByTenantIdAndTrackingId.json             |
| [eventGetBySubscriptionIdAndTrackingIdSample.ts][eventgetbysubscriptionidandtrackingidsample]                                                             | service health event in the subscription by event tracking id x-ms-original-file: 2025-05-01/Event_GetBySubscriptionIdAndTrackingId.json                                                                                                                                                                                                      |
| [eventGetByTenantIdAndTrackingIdSample.ts][eventgetbytenantidandtrackingidsample]                                                                         | service health event in the tenant by event tracking id x-ms-original-file: 2025-05-01/Event_GetByTenantIdAndTrackingId.json                                                                                                                                                                                                                  |
| [eventsListBySingleResourceSample.ts][eventslistbysingleresourcesample]                                                                                   | lists current service health events for given resource. x-ms-original-file: 2025-05-01/Events_ListBySingleResource.json                                                                                                                                                                                                                       |
| [eventsListBySubscriptionIdSample.ts][eventslistbysubscriptionidsample]                                                                                   | lists service health events in the subscription. x-ms-original-file: 2025-05-01/Events_ListBySubscriptionId.json                                                                                                                                                                                                                              |
| [eventsListByTenantIdSample.ts][eventslistbytenantidsample]                                                                                               | lists current service health events in the tenant. x-ms-original-file: 2025-05-01/Events_ListByTenantId.json                                                                                                                                                                                                                                  |
| [impactedResourcesGetByTenantIdSample.ts][impactedresourcesgetbytenantidsample]                                                                           | gets the specific impacted resource in the tenant by an event. x-ms-original-file: 2025-05-01/ImpactedResources_GetByTenantId.json                                                                                                                                                                                                            |
| [impactedResourcesGetSample.ts][impactedresourcesgetsample]                                                                                               | gets the specific impacted resource in the subscription by an event. x-ms-original-file: 2025-05-01/ImpactedResources_Get.json                                                                                                                                                                                                                |
| [impactedResourcesListBySubscriptionIdAndEventIdSample.ts][impactedresourceslistbysubscriptionidandeventidsample]                                         | lists impacted resources in the subscription by an event. x-ms-original-file: 2025-05-01/ImpactedResources_ListBySubscriptionId_ListByEventId.json                                                                                                                                                                                            |
| [impactedResourcesListByTenantIdAndEventIdSample.ts][impactedresourceslistbytenantidandeventidsample]                                                     | lists impacted resources in the tenant by an event. x-ms-original-file: 2025-05-01/ImpactedResources_ListByTenantId_ListByEventId.json                                                                                                                                                                                                        |
| [metadataGetEntitySample.ts][metadatagetentitysample]                                                                                                     | gets the list of metadata entities. x-ms-original-file: 2025-05-01/Metadata_GetEntity.json                                                                                                                                                                                                                                                    |
| [metadataListSample.ts][metadatalistsample]                                                                                                               | gets the list of metadata entities. x-ms-original-file: 2025-05-01/Metadata_List.json                                                                                                                                                                                                                                                         |
| [operationsListSample.ts][operationslistsample]                                                                                                           | lists available operations for the resourcehealth resource provider x-ms-original-file: 2025-05-01/Operations_List.json                                                                                                                                                                                                                       |
| [securityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdSample.ts][securityadvisoryimpactedresourceslistbysubscriptionidandeventidsample]         | lists impacted resources in the subscription by an event (Security Advisory). x-ms-original-file: 2025-05-01/SecurityAdvisoryImpactedResources_ListBySubscriptionId_ListByEventId.json                                                                                                                                                        |
| [securityAdvisoryImpactedResourcesListByTenantIdAndEventIdSample.ts][securityadvisoryimpactedresourceslistbytenantidandeventidsample]                     | lists impacted resources in the tenant by an event (Security Advisory). x-ms-original-file: 2025-05-01/SecurityAdvisoryImpactedResources_ListByTenantId_ListByEventId.json                                                                                                                                                                    |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/availabilityStatusesGetByResourceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/availabilityStatusesGetByResourceSample.ts
[availabilitystatuseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/availabilityStatusesListByResourceGroupSample.ts
[availabilitystatuseslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/availabilityStatusesListBySubscriptionIdSample.ts
[availabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/availabilityStatusesListSample.ts
[childavailabilitystatusesgetbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/childAvailabilityStatusesGetByResourceSample.ts
[childavailabilitystatuseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/childAvailabilityStatusesListSample.ts
[childresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/childResourcesListSample.ts
[emergingissuesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/emergingIssuesGetSample.ts
[emergingissueslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/emergingIssuesListSample.ts
[eventfetchbilllingcommunicationdetailsbysubscriptionidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdSample.ts
[eventfetchdetailsbysubscriptionidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventFetchDetailsBySubscriptionIdAndTrackingIdSample.ts
[eventfetchdetailsbytenantidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventFetchDetailsByTenantIdAndTrackingIdSample.ts
[eventgetbysubscriptionidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventGetBySubscriptionIdAndTrackingIdSample.ts
[eventgetbytenantidandtrackingidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventGetByTenantIdAndTrackingIdSample.ts
[eventslistbysingleresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventsListBySingleResourceSample.ts
[eventslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventsListBySubscriptionIdSample.ts
[eventslistbytenantidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/eventsListByTenantIdSample.ts
[impactedresourcesgetbytenantidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/impactedResourcesGetByTenantIdSample.ts
[impactedresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/impactedResourcesGetSample.ts
[impactedresourceslistbysubscriptionidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/impactedResourcesListBySubscriptionIdAndEventIdSample.ts
[impactedresourceslistbytenantidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/impactedResourcesListByTenantIdAndEventIdSample.ts
[metadatagetentitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/metadataGetEntitySample.ts
[metadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/metadataListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/operationsListSample.ts
[securityadvisoryimpactedresourceslistbysubscriptionidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/securityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdSample.ts
[securityadvisoryimpactedresourceslistbytenantidandeventidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcehealth/arm-resourcehealth/samples/v5-beta/typescript/src/securityAdvisoryImpactedResourcesListByTenantIdAndEventIdSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcehealth?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcehealth/arm-resourcehealth/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
