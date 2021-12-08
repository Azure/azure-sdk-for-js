
Getting Started - Using the next-generation management libraries of Azure SDK for JavaScript/TypeScript
=============================================================

We are excited to announce the GA of a new set of management plane libraries for JavaScript/TypeScript. Those libraries contain a number of new features including Azure Identity support, HTTP pipeline, error-handling.,etc, and follow the new Azure SDK guidelines which create easy-to-use
APIs that are idiomatic, compatible, and dependable. See [TypeScript Design Guidelines](https://azure.github.io/azure-sdk/typescript_design.html) for more information.

Currently, we have released GA version of several packages such as `azure/arm-resources`, `@azure/arm-storage`, 
`@azure/arm-compute`, `@azure/arm-network` for next-generation. Please find the latest version of those libraries in npmjs.com and have a try.

In this basic quickstart guide, we will walk you through how to
authenticate to Azure and start interacting with Azure resources. There are several possible approaches to
authentication. This document illustrates the most common scenario.

Migrating from an older generation of Azure management libraries for JavaScript/TypeScript
------------------------------------------------------------------------------------------
If you are current user of an older generation of the JavaScript SDK, and are interested in upgrading to the latest version, please refer to this [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md) for more information.

Prerequisites
-------------

You will need the following values to authenticate to Azure

-   **Subscription ID**
-   **Client ID**
-   **Client Secret**
-   **Tenant ID**

These values can be obtained from the portal, here's the instructions:

### Get Subscription ID

1.  Login into your Azure account
2.  Select Subscriptions in the left sidebar
3.  Select whichever subscription is needed
4.  Click on Overview
5.  Copy the Subscription ID

### Get Client ID / Client Secret / Tenant ID

For information on how to get Client ID, Client Secret, and Tenant ID,
please refer to [this document](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal)

### Setting Environment Variables

After you obtained the values, you need to set the following values as
your environment variables

-   `AZURE_CLIENT_ID`
-   `AZURE_CLIENT_SECRET`
-   `AZURE_TENANT_ID`
-   `AZURE_SUBSCRIPTION_ID`

To set the following environment variables on your development system:

Windows (Note: Administrator access is required)

1.  Open the Control Panel
2.  Click System Security, then System
3.  Click Advanced system settings on the left
4.  Inside the System Properties window, click the `Environment Variables…` button.
5.  Click on the property you would like to change, then click the `Edit…` button. If the property name is not listed, then click the `New…` button.

Linux-based OS :

    export AZURE_CLIENT_ID="azure_client_id"
    export AZURE_CLIENT_SECRET="azure_client_secret"
    export AZURE_TENANT_ID="azure_tenant_id"
    export AZURE_SUBSCRIPTION_ID="azure_subscription_id"

Install the package
-------------------

As an example, to install the Azure Compute module, you would run :

```sh
npm i @azure/arm-compute@latest
```
You can always find the latest preview version of our next-generation management libraries via npmjs under the `next` tag of each packages.  

We also recommend installing other packages for authentication and core functionalities :

```sh
npm i @azure/identity
```

Authentication
--------------

Once the environment is setup, all you need to do is to create an authenticated client. Before creating a client, you will first need to authenticate to Azure. In specific, you will need to provide a credential for authenticating with the Azure service.  The `@azure/identity` module provides facilities for various ways of authenticating with Azure including client/secret, certificate, managed identity, and more.

Our default option is to use **DefaultAzureCredential** which will make use of the environment variables we have set and take care of the authentication flow for us.

```typescript
const credential = new DefaultAzureCredential();
```

For more details on how authentication works in `@azure/identity`, please see the documentation for [`@azure/identity`](https://www.npmjs.com/package/@azure/identity).


Creating a Resource Management Client
-------------------------------------

Now, you will need to decide what service to use and create a client to connect to that service. In this section, we will use `Compute` as our target service. 

To show an example, we will create a client to manage Virtual Machines. The code to achieve this task would be:

```typescript
const client = new ComputeManagementClient(credential, subscriptionId);
```

Interacting with Azure Resources
--------------------------------

Now that we are authenticated and have created our clients, we can use our client to make API calls. For resource management scenarios, most of our cases are centered around creating / updating / reading / deleting Azure resources. Those scenarios correspond to what we call "operations" in Azure. Once you are sure of which operations you want to call, you can then implement the operation call using the management client we just created in previous section.


In the following samples. we are going to show

- **Step 1** : How to Create a simple resource Resource Group.
- **Step 2** : How to Manage Resource Group with Azure SDK for JavaScript/TypeScript
- **Step 3** : How to Create a complex resource Virtual Machine.

Let's show our what final code looks like

Example: Creating a Resource Group
---------------------------------

***Import the packages***  
TypeScript
```typescript
import { ResourceManagementClient, ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
```
JavaScript
```javascript
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");
```

***Define some global variables***  
TypeScript
```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const resourcesClient = new ResourceManagementClient(credential, subscriptionId);
```
JavaScript
```javascript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new identity.DefaultAzureCredential();
const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
```

***Create a resource group***  
TypeScript
```typescript
async function updateResourceGroup(resourceGroupName: string) {
    const parameter: ResourceGroup  = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```
JavaScript
```javascript
async function createResourceGroup(resourceGroupName) {
    const parameter = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```

Example: Managing Resource Groups with JS/TS SDK
---------------------------------

***Import the packages***  
TypeScript
```typescript
import { ResourceManagementClient, ResourceGroup, ResourceGroupPatchable } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
```
JavaScript
```javascript
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");
```

***Authentication and Setup***  
TypeScript
```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const resourcesClient = new ResourceManagementClient(credential, subscriptionId);
```
JavaScript
```javascript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new identity.DefaultAzureCredential();
const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
```

***Update a resource group***  
TypeScript
```typescript
async function updateResourceGroup(resourceGroupName: string) {
    const parameter: ResourceGroupPatchable = {
        tags: {
            tag1: "value1",
            tag2: "value2"
        }
    };
    await resourcesClient.resourceGroups.update(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```
JavaScript
```javascript
async function updateResourceGroup(resourceGroupName) {
    const parameter = {
        tags: {
            tag1: "value1",
            tag2: "value2"
        }
    };
    await resourcesClient.resourceGroups.update(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```

***List all resource groups***  
TypeScript or JavaScript
```typescript
async function listResourceGroup() {
    const result_list = new Array();
    for await (let item of resourceClient.resourceGroups.list()){
        result_list.push(item);
    }
    console.log(result_list);
}
```

***Get a Resource Group***  
TypeScript
```typescript
async function getResourceGroup(resourceGroupName: string) {
    const get_result = await resourceClient.resourceGroups.get(resourceGroupName);
    console.log(get_result);
}
```
JavaScript
```javascript
async function getResourceGroup(resourceGroupName) {
    const get_result = await resourceClient.resourceGroups.get(resourceGroupName);
    console.log(get_result);
}
```

***Delete a resource group***  
TypeScript
```typescript
async function deleteResourceGroup(resourceGroupName: string) {
    await resourcesClient.resourceGroups.delete(resourceGroupName).then(
        result => {
            console.log(result);
        }
    )
}
```
JavaScript
```javascript
async function deleteResourceGroup(resourceGroupName) {
    await resourcesClient.resourceGroups.delete(resourceGroupName).then(
        result => {
            console.log(result);
        }
    )
}
```

***Manage Resource Group***  
TypeScript or JavaScript
```typescript
async function main() {
    const resourceGroupName = "jstest";
    await createResourceGroup(resourceGroupName);
    await listResourceGroup();
    await getResourceGroup(resourceGroupName);
    await updateResourceGroup(resourceGroup);
    await getResourceGroup(resourceGroupName);
    await deleteResourceGroup(resourceGroupName);
    await listResourceGroup();
}
```


Example: Managing Virtual Machines
---------------------------------
In addition to resource groups, we will also use Virtual Machine as an example and show how to manage how to create a Virtual Machine which involves three Azure services (Resource Group, Network and Compute)

***Import the packages***  
TypeScript
```typescript
import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface } from "@azure/arm-network";
import { ResourceManagementClient, ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
```
JavaScript
```javascript
const identity = require("@azure/identity");
const resources = require("@azure/arm-resources");
const compute = require("@azure/arm-compute");
const network = require("@azure/arm-network");
```

***Define the global variables***  
TypeScript or JavaScript
```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroupName = "testRG";
const virtualMachineName = "virtualmachinex";
const subnetName = "subnetnamex";
const interfaceName = "interfacex";
const networkName = "networknamex";
const location = "eastus";
```

***Authentication and Setup***  
TypeScript
```typescript
const credential = new DefaultAzureCredential();
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
const networkClient = new network.NetworkManagementClient(credential, subscriptionId);
const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
```
JavaScript
```javascript
const credential = new identity.DefaultAzureCredential();
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
const networkClient = new network.NetworkManagementClient(credential, subscriptionId);
const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
```

***Creating a Resource Group***  
TypeScript
```typescript
async function createResourceGroup() {
    const parameter: ResourceGroup = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```
JavaScript
```javascript
async function createResourceGroup() {
    const parameter = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}
```

***Creating a Virtual Network***  
TypeScript
```typescript
async function createVirtualNetwork() {
    const parameter: VirtualNetwork = {
        location: location,
        addressSpace: {
            addressPrefixes: ['10.0.0.0/16']
        }
    };
    const poller_result = await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroupName, networkName, parameter);
    console.log(poller_result);
    const virtualNetworks_create_info = await networkClient.virtualNetworks.get(resourceGroupName, networkName);
    console.log(virtualNetworks_create_info);
}
```
JavaScript
```javascript
async function createVirtualNetwork() {
    const parameter = {
        location: location,
        addressSpace: {
            addressPrefixes: ['10.0.0.0/16']
        }
    };
    const poller_result = await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroupName, networkName, parameter);
    console.log(poller_result);
    const virtualNetworks_create_info =  await networkClient.virtualNetworks.get(resourceGroupName, networkName);
    console.log(virtualNetworks_create_info);
}
```

***Creating a Subnet***  
TypeScript
```typescript
async function createSubnet() {
    const subnet_parameter: Subnet = {
        addressPrefix: "10.0.0.0/24"
    };
    const poller_result = await networkClient.subnets.beginCreateOrUpdateAndWait(resourceGroupName, networkName, subnetName, subnet_parameter);
    console.log(poller_result);
    const subnet_create_info = await networkClient.subnets.get(resourceGroupName, networkName, subnetName);
    console.log(subnet_create_info)
}
```
JavaScript
```javascript
async function createSubnet() {
    const subnet_parameter = {
        addressPrefix: "10.0.0.0/24"
    };
    const poller_result = await networkClient.subnets.beginCreateOrUpdateAndWait(resourceGroupName, networkName, subnetName, subnet_parameter);
    console.log(poller_result);
    const subnet_create_info = await networkClient.subnets.get(resourceGroupName, networkName, subnetName);
    console.log(subnet_create_info)
}
```

***Creating a Network Interface***  
TypeScript
```typescript
async function createNetworkInterface(group_name: any, location: any, nic_name: any) {
    const parameter: NetworkInterface = {
        location: location,
        ipConfigurations: [
            {
                name: "MyIpConfig",
                subnet: {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + networkName + "/subnets/" + subnetName

                }
            }
        ]
    };
    const poller_result = await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(group_name, nic_name, parameter);
    console.log(poller_result);
    const nic_info = await networkClient.networkInterfaces.get(group_name, nic_name);
    console.log(nic_info);
}
```
JavaScript
```javascript
async function createNetworkInterface(group_name, location, nic_name) {
    const parameter = {
        location: location,
        ipConfigurations: [
            {
                name: "MyIpConfig",
                subnet: {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/virtualNetworks/" + networkName + "/subnets/" + subnetName

                }
            }
        ]
    };
    const poller_result = await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(group_name, nic_name, parameter);
    console.log(poller_result);
    const nic_info = await networkClient.networkInterfaces.get(group_name, nic_name);
    console.log(nic_info);
}
```

***Creating a Virtual Machine***  
TypeScript
```typescript
async function createVirtualMachines() {
    createResourceGroup();
    createVirtualNetwork();
    createSubnet();
    createNetworkInterface(resourceGroupName, location, interfaceName);
    const parameter: VirtualMachine = {
        location: location,
        hardwareProfile: {
            vmSize: "Standard_D2_v2",
        },
        storageProfile: {
            imageReference: {
                sku: "2016-Datacenter",
                publisher: "MicrosoftWindowsServer",
                version: "latest",
                offer: "WindowsServer"
            },
            osDisk: {
                caching: "ReadWrite",
                managedDisk: {
                    storageAccountType: "Standard_LRS"
                },
                name: "myVMosdisk",
                createOption: "FromImage"
            },
            dataDisks: [
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 0
                },
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 1
                }
            ]
        },
        osProfile: {
            adminUsername: "testuser",
            computerName: "myVM",
            adminPassword: "p@55wOrd",
            windowsConfiguration: {
                enableAutomaticUpdates: true // need automatic update for reimage
            }
        },
        networkProfile: {
            networkInterfaces: [
                {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + interfaceName + "",
                    primary: true
                }
            ]
        }
    };
    const poller_result = await computeClient.virtualMachines.beginCreateOrUpdateAndWait(resourceGroupName, virtualMachineName, parameter);
    console.log(poller_result);
    const res = await computeClient.virtualMachines.get(resourceGroupName, virtualMachineName);
    console.log(res);
}
```
JavaScript
```javascript
async function createVirtualMachines() {
    createResourceGroup();
    createVirtualNetwork();
    createSubnet();
    createNetworkInterface(resourceGroupName, location, interfaceName);
    const parameter = {
        location: location,
        hardwareProfile: {
            vmSize: "Standard_D2_v2",
        },
        storageProfile: {
            imageReference: {
                sku: "2016-Datacenter",
                publisher: "MicrosoftWindowsServer",
                version: "latest",
                offer: "WindowsServer"
            },
            osDisk: {
                caching: "ReadWrite",
                managedDisk: {
                    storageAccountType: "Standard_LRS"
                },
                name: "myVMosdisk",
                createOption: "FromImage"
            },
            dataDisks: [
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 0
                },
                {
                    diskSizeGB: 1023,
                    createOption: "Empty",
                    lun: 1
                }
            ]
        },
        osProfile: {
            adminUsername: "testuser",
            computerName: "myVM",
            adminPassword: "p@55wOrd",
            windowsConfiguration: {
                enableAutomaticUpdates: true // need automatic update for reimage
            }
        },
        networkProfile: {
            networkInterfaces: [
                {
                    id: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroupName + "/providers/Microsoft.Network/networkInterfaces/" + interfaceName + "",
                    primary: true
                }
            ]
        }
    };
    const poller_result = await computeClient.virtualMachines.beginCreateOrUpdateAndWait(resourceGroupName, virtualMachineName, parameter);
    console.log(poller_result);
    const res = await computeClient.virtualMachines.get(resourceGroupName, virtualMachineName);
    console.log(res);
}
```

The following example shows how to delete a Virtual Machine

***Deleting a Virtual Machine***  
TypeScript or JavaScript
```typescript
async function deleteVirtualMachine() {
    const res = await computeClient.virtualMachines.beginDeleteAndWait(resourceGroupName, virtualMachineName);
    console.log(res);
}
```

## Code Samples

More code samples for using the management library for JS/TS SDK can be found in [JS/TS SDK Code Samples](https://aka.ms/azsdk/js/mgmt/samples)

*Please Note that these samples provided in JS/TS SDK Code Samples are written in TypeScript*


Need help?
----------

-   File an issue via [Github
    Issues](https://github.com/Azure/azure-sdk-for-js/issues)  

Contributing
------------

For details on contributing to this repository, see the contributing
guide.

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring
that you have the right to, and actually do, grant us the rights to use
your contribution. For details, visit <https://cla.microsoft.com>.

When you submit a pull request, a CLA-bot will automatically determine
whether you need to provide a CLA and decorate the PR appropriately
(e.g., label, comment). Simply follow the instructions provided by the
bot. You will only need to do this once across all repositories using
our CLA.

This project has adopted the Microsoft Open Source Code of Conduct. For
more information see the Code of Conduct FAQ or contact
<opencode@microsoft.com> with any additional questions or comments.
