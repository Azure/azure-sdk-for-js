// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an availability group listener.
 *
 * @summary creates or updates an availability group listener.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateAvailabilityGroupListener.json
 */
async function createsOrUpdatesAnAvailabilityGroupListenerUsingLoadBalancerThisIsUsedForVMsPresentInSingleSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.availabilityGroupListeners.createOrUpdate(
    "testrg",
    "testvmgroup",
    "agl-test",
    {
      properties: {
        availabilityGroupName: "ag-test",
        loadBalancerConfigurations: [
          {
            loadBalancerResourceId:
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Network/loadBalancers/lb-test",
            privateIpAddress: {
              ipAddress: "10.1.0.112",
              subnetResourceId:
                "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/default",
            },
            probePort: 59983,
            sqlVirtualMachineInstances: [
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm2",
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm3",
            ],
          },
        ],
        port: 1433,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an availability group listener.
 *
 * @summary creates or updates an availability group listener.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateAvailabilityGroupListenerWithMultiSubnet.json
 */
async function createsOrUpdatesAnAvailabilityGroupListenerThisIsUsedForVMsPresentInMultiSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.availabilityGroupListeners.createOrUpdate(
    "testrg",
    "testvmgroup",
    "agl-test",
    {
      properties: {
        availabilityGroupName: "ag-test",
        multiSubnetIpConfigurations: [
          {
            privateIpAddress: {
              ipAddress: "10.0.0.112",
              subnetResourceId:
                "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/default",
            },
            sqlVirtualMachineInstance:
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm2",
          },
          {
            privateIpAddress: {
              ipAddress: "10.0.1.112",
              subnetResourceId:
                "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/alternate",
            },
            sqlVirtualMachineInstance:
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm1",
          },
        ],
        port: 1433,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAnAvailabilityGroupListenerUsingLoadBalancerThisIsUsedForVMsPresentInSingleSubnet();
  await createsOrUpdatesAnAvailabilityGroupListenerThisIsUsedForVMsPresentInMultiSubnet();
}

main().catch(console.error);
