# @azure/arm-iothub client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-iothub in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificatesCreateOrUpdateSample.ts][certificatescreateorupdatesample]                                 | adds new or replaces existing certificate. x-ms-original-file: 2026-03-01-preview/CreateOrReplace_Certificates_With_DeviceRegistryPolicy.json                                                                                                                                                                             |
| [certificatesDeleteSample.ts][certificatesdeletesample]                                                 | deletes an existing X509 certificate or does nothing if it does not exist. x-ms-original-file: 2026-03-01-preview/iothub_certificatesdelete.json                                                                                                                                                                          |
| [certificatesGenerateVerificationCodeSample.ts][certificatesgenerateverificationcodesample]             | generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate. x-ms-original-file: 2026-03-01-preview/iothub_generateverificationcode.json                                                                                                                  |
| [certificatesGetSample.ts][certificatesgetsample]                                                       | returns the certificate. x-ms-original-file: 2026-03-01-preview/iothub_getcertificate.json                                                                                                                                                                                                                                |
| [certificatesListByIotHubSample.ts][certificateslistbyiothubsample]                                     | returns the list of certificates. x-ms-original-file: 2026-03-01-preview/iothub_listcertificates.json                                                                                                                                                                                                                     |
| [certificatesVerifySample.ts][certificatesverifysample]                                                 | verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. x-ms-original-file: 2026-03-01-preview/iothub_certverify.json                                                                                                                              |
| [iotHubManualFailoverSample.ts][iothubmanualfailoversample]                                             | manually initiate a failover for the IoT Hub to its secondary region. To learn more, see https://aka.ms/manualfailover x-ms-original-file: 2026-03-01-preview/IotHub_ManualFailover.json                                                                                                                                  |
| [iotHubResourceCheckNameAvailabilitySample.ts][iothubresourcechecknameavailabilitysample]               | check if an IoT hub name is available. x-ms-original-file: 2026-03-01-preview/checkNameAvailability.json                                                                                                                                                                                                                  |
| [iotHubResourceCreateEventHubConsumerGroupSample.ts][iothubresourcecreateeventhubconsumergroupsample]   | add a consumer group to an Event Hub-compatible endpoint in an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_createconsumergroup.json                                                                                                                                                                            |
| [iotHubResourceCreateOrUpdateSample.ts][iothubresourcecreateorupdatesample]                             | create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub. x-ms-original-file: 2026-03-01-preview/CreateOrReplace_IoTHub_With_DeviceRegistry.json |
| [iotHubResourceDeleteEventHubConsumerGroupSample.ts][iothubresourcedeleteeventhubconsumergroupsample]   | delete a consumer group from an Event Hub-compatible endpoint in an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_deleteconsumergroup.json                                                                                                                                                                       |
| [iotHubResourceDeleteSample.ts][iothubresourcedeletesample]                                             | delete an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_delete.json                                                                                                                                                                                                                                              |
| [iotHubResourceExportDevicesSample.ts][iothubresourceexportdevicessample]                               | exports all the device identities in the IoT hub identity registry to an Azure Storage blob container. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. x-ms-original-file: 2026-03-01-preview/iothub_exportdevices.json       |
| [iotHubResourceGetEventHubConsumerGroupSample.ts][iothubresourcegeteventhubconsumergroupsample]         | get a consumer group from the Event Hub-compatible device-to-cloud endpoint for an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_getconsumergroup.json                                                                                                                                                           |
| [iotHubResourceGetJobSample.ts][iothubresourcegetjobsample]                                             | get the details of a job from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. x-ms-original-file: 2026-03-01-preview/iothub_getjob.json                                                                                                               |
| [iotHubResourceGetKeysForKeyNameSample.ts][iothubresourcegetkeysforkeynamesample]                       | get a shared access policy by name from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. x-ms-original-file: 2026-03-01-preview/iothub_getkey.json                                                                                                              |
| [iotHubResourceGetSample.ts][iothubresourcegetsample]                                                   | get the non-security related metadata of an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_get.json                                                                                                                                                                                                               |
| [iotHubResourceGetStatsSample.ts][iothubresourcegetstatssample]                                         | get the statistics from an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_stats.json                                                                                                                                                                                                                              |
| [iotHubResourceImportDevicesSample.ts][iothubresourceimportdevicessample]                               | import, update, or delete device identities in the IoT hub identity registry from a blob. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. x-ms-original-file: 2026-03-01-preview/iothub_importdevices.json                    |
| [iotHubResourceListByResourceGroupSample.ts][iothubresourcelistbyresourcegroupsample]                   | get all the IoT hubs in a resource group. x-ms-original-file: 2026-03-01-preview/iothub_listbyrg.json                                                                                                                                                                                                                     |
| [iotHubResourceListBySubscriptionSample.ts][iothubresourcelistbysubscriptionsample]                     | get all the IoT hubs in a subscription. x-ms-original-file: 2026-03-01-preview/iothub_listbysubscription.json                                                                                                                                                                                                             |
| [iotHubResourceListEndpointHealthSample.ts][iothubresourcelistendpointhealthsample]                     | get the health for routing endpoints. x-ms-original-file: 2026-03-01-preview/iothub_routingendpointhealth.json                                                                                                                                                                                                            |
| [iotHubResourceListEventHubConsumerGroupsSample.ts][iothubresourcelisteventhubconsumergroupssample]     | get a list of the consumer groups in the Event Hub-compatible device-to-cloud endpoint in an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_listehgroups.json                                                                                                                                                     |
| [iotHubResourceListJobsSample.ts][iothubresourcelistjobssample]                                         | get a list of all the jobs in an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. x-ms-original-file: 2026-03-01-preview/iothub_listjobs.json                                                                                                             |
| [iotHubResourceListKeysSample.ts][iothubresourcelistkeyssample]                                         | get the security metadata for an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. x-ms-original-file: 2026-03-01-preview/iothub_listkeys.json                                                                                                                      |
| [iotHubResourceListQuotaMetricsSample.ts][iothubresourcelistquotametricssample]                         | get the quota metrics for an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_quotametrics.json                                                                                                                                                                                                                     |
| [iotHubResourceListValidSkusSample.ts][iothubresourcelistvalidskussample]                               | get the list of valid SKUs for an IoT hub. x-ms-original-file: 2026-03-01-preview/iothub_getskus.json                                                                                                                                                                                                                     |
| [iotHubResourceTestAllRoutesSample.ts][iothubresourcetestallroutessample]                               | test all routes configured in this Iot Hub x-ms-original-file: 2026-03-01-preview/iothub_testallroutes.json                                                                                                                                                                                                               |
| [iotHubResourceTestRouteSample.ts][iothubresourcetestroutesample]                                       | test the new route for this Iot Hub x-ms-original-file: 2026-03-01-preview/iothub_testnewroute.json                                                                                                                                                                                                                       |
| [iotHubResourceUpdateSample.ts][iothubresourceupdatesample]                                             | update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method x-ms-original-file: 2026-03-01-preview/iothub_patch.json                                                                                                                                                                            |
| [operationsListSample.ts][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2026-03-01-preview/iothub_operations.json                                                                                                                                                                                                                        |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                     | delete private endpoint connection with the specified name x-ms-original-file: 2026-03-01-preview/iothub_deleteprivateendpointconnection.json                                                                                                                                                                             |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                           | get private endpoint connection properties x-ms-original-file: 2026-03-01-preview/iothub_getprivateendpointconnection.json                                                                                                                                                                                                |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                         | list private endpoint connection properties x-ms-original-file: 2026-03-01-preview/iothub_listprivateendpointconnections.json                                                                                                                                                                                             |
| [privateEndpointConnectionsUpdateSample.ts][privateendpointconnectionsupdatesample]                     | update the status of a private endpoint connection with the specified name x-ms-original-file: 2026-03-01-preview/iothub_updateprivateendpointconnection.json                                                                                                                                                             |
| [privateLinkResourcesOperationsGetSample.ts][privatelinkresourcesoperationsgetsample]                   | get the specified private link resource for the given IotHub x-ms-original-file: 2026-03-01-preview/iothub_getprivatelinkresources.json                                                                                                                                                                                   |
| [privateLinkResourcesOperationsListSample.ts][privatelinkresourcesoperationslistsample]                 | list private link resources for the given IotHub x-ms-original-file: 2026-03-01-preview/iothub_listprivatelinkresources.json                                                                                                                                                                                              |
| [resourceProviderCommonGetSubscriptionQuotaSample.ts][resourceprovidercommongetsubscriptionquotasample] | get the number of free and paid iot hubs in the subscription x-ms-original-file: 2026-03-01-preview/iothub_usages.json                                                                                                                                                                                                    |

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
node dist/certificatesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/certificatesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesCreateOrUpdateSample.ts
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesDeleteSample.ts
[certificatesgenerateverificationcodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesGenerateVerificationCodeSample.ts
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesGetSample.ts
[certificateslistbyiothubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesListByIotHubSample.ts
[certificatesverifysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/certificatesVerifySample.ts
[iothubmanualfailoversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubManualFailoverSample.ts
[iothubresourcechecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceCheckNameAvailabilitySample.ts
[iothubresourcecreateeventhubconsumergroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceCreateEventHubConsumerGroupSample.ts
[iothubresourcecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceCreateOrUpdateSample.ts
[iothubresourcedeleteeventhubconsumergroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceDeleteEventHubConsumerGroupSample.ts
[iothubresourcedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceDeleteSample.ts
[iothubresourceexportdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceExportDevicesSample.ts
[iothubresourcegeteventhubconsumergroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceGetEventHubConsumerGroupSample.ts
[iothubresourcegetjobsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceGetJobSample.ts
[iothubresourcegetkeysforkeynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceGetKeysForKeyNameSample.ts
[iothubresourcegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceGetSample.ts
[iothubresourcegetstatssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceGetStatsSample.ts
[iothubresourceimportdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceImportDevicesSample.ts
[iothubresourcelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListByResourceGroupSample.ts
[iothubresourcelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListBySubscriptionSample.ts
[iothubresourcelistendpointhealthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListEndpointHealthSample.ts
[iothubresourcelisteventhubconsumergroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListEventHubConsumerGroupsSample.ts
[iothubresourcelistjobssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListJobsSample.ts
[iothubresourcelistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListKeysSample.ts
[iothubresourcelistquotametricssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListQuotaMetricsSample.ts
[iothubresourcelistvalidskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceListValidSkusSample.ts
[iothubresourcetestallroutessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceTestAllRoutesSample.ts
[iothubresourcetestroutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceTestRouteSample.ts
[iothubresourceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/iotHubResourceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateEndpointConnectionsUpdateSample.ts
[privatelinkresourcesoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateLinkResourcesOperationsGetSample.ts
[privatelinkresourcesoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/privateLinkResourcesOperationsListSample.ts
[resourceprovidercommongetsubscriptionquotasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iothub/arm-iothub/samples/v7-beta/typescript/src/resourceProviderCommonGetSubscriptionQuotaSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-iothub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iothub/arm-iothub/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
