# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilityOfACapacity.js][checknameavailabilityofacapacity]           | Check the name availability in the target location. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/checkNameAvailability.json                                            |
| [createAutoScaleVCore.js][createautoscalevcore]                                   | Provisions the specified auto scale v-core based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createAutoScaleVCore.json |
| [createCapacity.js][createcapacity]                                               | Provisions the specified Dedicated capacity based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createCapacity.json      |
| [deleteAnAutoScaleVCore.js][deleteanautoscalevcore]                               | Deletes the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/deleteAutoScaleVCore.json                                                        |
| [getDetailsOfACapacity.js][getdetailsofacapacity]                                 | Lists all the Dedicated capacities for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInSubscription.json                          |
| [getDetailsOfAnAutoScaleVCore.js][getdetailsofanautoscalevcore]                   | Gets details about the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getAutoScaleVCore.json                                                |
| [listAutoScaleVCoresInResourceGroup.js][listautoscalevcoresinresourcegroup]       | Gets all the auto scale v-cores for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInResourceGroup.json                     |
| [listAutoScaleVCoresInSubscription.js][listautoscalevcoresinsubscription]         | Lists all the auto scale v-cores for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInSubscription.json                       |
| [listCapacitiesInResourceGroup.js][listcapacitiesinresourcegroup]                 | Gets all the Dedicated capacities for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInResourceGroup.json                        |
| [listEligibleSkUsForANewCapacity.js][listeligibleskusforanewcapacity]             | Lists eligible SKUs for PowerBI Dedicated resource provider. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForNew.json                                          |
| [listEligibleSkUsForAnExistingCapacity.js][listeligibleskusforanexistingcapacity] | Lists eligible SKUs for a PowerBI Dedicated resource. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForExisting.json                                            |
| [listOperations.js][listoperations]                                               | Lists all of the available PowerBIDedicated REST API operations. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/operations.json                                          |
| [suspendCapacity.js][suspendcapacity]                                             | Suspends operation of the specified dedicated capacity instance. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/suspendCapacity.json                                     |
| [updateAutoScaleVCoreParameters.js][updateautoscalevcoreparameters]               | Updates the current state of the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateAutoScaleVCore.json                                   |
| [updateCapacityParameters.js][updatecapacityparameters]                           | Updates the current state of the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateCapacity.json                                        |
| [updateCapacityToGeneration2.js][updatecapacitytogeneration2]                     | Updates the current state of the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateToGen2.json                                          |

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
node checkNameAvailabilityOfACapacity.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node checkNameAvailabilityOfACapacity.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilityofacapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/checkNameAvailabilityOfACapacity.js
[createautoscalevcore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/createAutoScaleVCore.js
[createcapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/createCapacity.js
[deleteanautoscalevcore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/deleteAnAutoScaleVCore.js
[getdetailsofacapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/getDetailsOfACapacity.js
[getdetailsofanautoscalevcore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/getDetailsOfAnAutoScaleVCore.js
[listautoscalevcoresinresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listAutoScaleVCoresInResourceGroup.js
[listautoscalevcoresinsubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listAutoScaleVCoresInSubscription.js
[listcapacitiesinresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listCapacitiesInResourceGroup.js
[listeligibleskusforanewcapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listEligibleSkUsForANewCapacity.js
[listeligibleskusforanexistingcapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listEligibleSkUsForAnExistingCapacity.js
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/listOperations.js
[suspendcapacity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/suspendCapacity.js
[updateautoscalevcoreparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/updateAutoScaleVCoreParameters.js
[updatecapacityparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/updateCapacityParameters.js
[updatecapacitytogeneration2]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v3/javascript/updateCapacityToGeneration2.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-powerbidedicated?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerbidedicated/arm-powerbidedicated/README.md
