// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SAPVirtualInstance,
  SAPVirtualInstancesCreateOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_CustomFullResourceNames_Distributed.json
 */
async function createInfrastructureWithOSConfigurationWithCustomResourceNamesForDistributedSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        customResourceNames: {
          applicationServer: {
            availabilitySetName: "appAvSet",
            virtualMachines: [
              {
                dataDiskNames: { default: ["app0disk0"] },
                hostName: "apphostName0",
                networkInterfaces: [{ networkInterfaceName: "appnic0" }],
                osDiskName: "app0osdisk",
                vmName: "appvm0",
              },
              {
                dataDiskNames: { default: ["app1disk0"] },
                hostName: "apphostName1",
                networkInterfaces: [{ networkInterfaceName: "appnic1" }],
                osDiskName: "app1osdisk",
                vmName: "appvm1",
              },
            ],
          },
          centralServer: {
            virtualMachines: [
              {
                dataDiskNames: { default: ["ascsdisk0"] },
                hostName: "ascshostName",
                networkInterfaces: [{ networkInterfaceName: "ascsnic" }],
                osDiskName: "ascsosdisk",
                vmName: "ascsvm",
              },
            ],
          },
          databaseServer: {
            virtualMachines: [
              {
                dataDiskNames: {
                  hanaData: ["hanadata0", "hanadata1"],
                  hanaLog: ["hanalog0", "hanalog1", "hanalog2"],
                  hanaShared: ["hanashared0", "hanashared1"],
                  usrSap: ["usrsap0"],
                },
                hostName: "dbhostName",
                networkInterfaces: [{ networkInterfaceName: "dbnic" }],
                osDiskName: "dbosdisk",
                vmName: "dbvm",
              },
            ],
          },
          namingPatternType: "FullResourceName",
          sharedStorage: {
            sharedStorageAccountName: "storageacc",
            sharedStorageAccountPrivateEndPointName: "peForxNFS",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_CustomFullResourceNames_HA_AvSet.json
 */
async function createInfrastructureWithOSConfigurationWithCustomResourceNamesForHaSystemWithAvailabilitySet(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        customResourceNames: {
          applicationServer: {
            availabilitySetName: "appAvSet",
            virtualMachines: [
              {
                dataDiskNames: { default: ["app0disk0"] },
                hostName: "apphostName0",
                networkInterfaces: [{ networkInterfaceName: "appnic0" }],
                osDiskName: "app0osdisk",
                vmName: "appvm0",
              },
              {
                dataDiskNames: { default: ["app1disk0"] },
                hostName: "apphostName1",
                networkInterfaces: [{ networkInterfaceName: "appnic1" }],
                osDiskName: "app1osdisk",
                vmName: "appvm1",
              },
            ],
          },
          centralServer: {
            availabilitySetName: "csAvSet",
            loadBalancer: {
              backendPoolNames: ["ascsBackendPool"],
              frontendIpConfigurationNames: ["ascsip0", "ersip0"],
              healthProbeNames: ["ascsHealthProbe", "ersHealthProbe"],
              loadBalancerName: "ascslb",
            },
            virtualMachines: [
              {
                hostName: "ascshostName",
                networkInterfaces: [{ networkInterfaceName: "ascsnic" }],
                osDiskName: "ascsosdisk",
                vmName: "ascsvm",
              },
              {
                hostName: "ershostName",
                networkInterfaces: [{ networkInterfaceName: "ersnic" }],
                osDiskName: "ersosdisk",
                vmName: "ersvm",
              },
            ],
          },
          databaseServer: {
            availabilitySetName: "dbAvSet",
            loadBalancer: {
              backendPoolNames: ["dbBackendPool"],
              frontendIpConfigurationNames: ["dbip"],
              healthProbeNames: ["dbHealthProbe"],
              loadBalancerName: "dblb",
            },
            virtualMachines: [
              {
                dataDiskNames: {
                  hanaData: ["hanadatapr0", "hanadatapr1"],
                  hanaLog: ["hanalogpr0", "hanalogpr1", "hanalogpr2"],
                  hanaShared: ["hanasharedpr0", "hanasharedpr1"],
                  usrSap: ["usrsappr0"],
                },
                hostName: "dbprhostName",
                networkInterfaces: [{ networkInterfaceName: "dbprnic" }],
                osDiskName: "dbprosdisk",
                vmName: "dbvmpr",
              },
              {
                dataDiskNames: {
                  hanaData: ["hanadatasr0", "hanadatasr1"],
                  hanaLog: ["hanalogsr0", "hanalogsr1", "hanalogsr2"],
                  hanaShared: ["hanasharedsr0", "hanasharedsr1"],
                  usrSap: ["usrsapsr0"],
                },
                hostName: "dbsrhostName",
                networkInterfaces: [{ networkInterfaceName: "dbsrnic" }],
                osDiskName: "dbsrosdisk",
                vmName: "dbvmsr",
              },
            ],
          },
          namingPatternType: "FullResourceName",
          sharedStorage: {
            sharedStorageAccountName: "storageacc",
            sharedStorageAccountPrivateEndPointName: "peForxNFS",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilitySet" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_CustomFullResourceNames_HA_AvZone.json
 */
async function createInfrastructureWithOSConfigurationWithCustomResourceNamesForHaSystemWithAvailabilityZone(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        customResourceNames: {
          applicationServer: {
            virtualMachines: [
              {
                dataDiskNames: { default: ["app0disk0"] },
                hostName: "apphostName0",
                networkInterfaces: [{ networkInterfaceName: "appnic0" }],
                osDiskName: "app0osdisk",
                vmName: "appvm0",
              },
              {
                dataDiskNames: { default: ["app1disk0"] },
                hostName: "apphostName1",
                networkInterfaces: [{ networkInterfaceName: "appnic1" }],
                osDiskName: "app1osdisk",
                vmName: "appvm1",
              },
            ],
          },
          centralServer: {
            loadBalancer: {
              backendPoolNames: ["ascsBackendPool"],
              frontendIpConfigurationNames: ["ascsip0", "ersip0"],
              healthProbeNames: ["ascsHealthProbe", "ersHealthProbe"],
              loadBalancerName: "ascslb",
            },
            virtualMachines: [
              {
                hostName: "ascshostName",
                networkInterfaces: [{ networkInterfaceName: "ascsnic" }],
                osDiskName: "ascsosdisk",
                vmName: "ascsvm",
              },
              {
                hostName: "ershostName",
                networkInterfaces: [{ networkInterfaceName: "ersnic" }],
                osDiskName: "ersosdisk",
                vmName: "ersvm",
              },
            ],
          },
          databaseServer: {
            loadBalancer: {
              backendPoolNames: ["dbBackendPool"],
              frontendIpConfigurationNames: ["dbip"],
              healthProbeNames: ["dbHealthProbe"],
              loadBalancerName: "dblb",
            },
            virtualMachines: [
              {
                dataDiskNames: {
                  hanaData: ["hanadatapr0", "hanadatapr1"],
                  hanaLog: ["hanalogpr0", "hanalogpr1", "hanalogpr2"],
                  hanaShared: ["hanasharedpr0", "hanasharedpr1"],
                  usrSap: ["usrsappr0"],
                },
                hostName: "dbprhostName",
                networkInterfaces: [{ networkInterfaceName: "dbprnic" }],
                osDiskName: "dbprosdisk",
                vmName: "dbvmpr",
              },
              {
                dataDiskNames: {
                  hanaData: ["hanadatasr0", "hanadatasr1"],
                  hanaLog: ["hanalogsr0", "hanalogsr1", "hanalogsr2"],
                  hanaShared: ["hanasharedsr0", "hanasharedsr1"],
                  usrSap: ["usrsapsr0"],
                },
                hostName: "dbsrhostName",
                networkInterfaces: [{ networkInterfaceName: "dbsrnic" }],
                osDiskName: "dbsrosdisk",
                vmName: "dbvmsr",
              },
            ],
          },
          namingPatternType: "FullResourceName",
          sharedStorage: {
            sharedStorageAccountName: "storageacc",
            sharedStorageAccountPrivateEndPointName: "peForxNFS",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilityZone" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_CustomFullResourceNames_SingleServer.json
 */
async function createInfrastructureWithOSConfigurationWithCustomResourceNamesForSingleServerSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        databaseType: "HANA",
        deploymentType: "SingleServer",
        networkConfiguration: { isSecondaryIpEnabled: true },
        subnetId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "RHEL-SAP",
            publisher: "RedHat",
            sku: "84sapha-gen2",
            version: "latest",
          },
          osProfile: {
            adminUsername: "{your-username}",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "NonProd",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Distributed.json
 */
async function createInfrastructureOnlyForDistributedSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "Deployment",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
      },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_HA_AvSet.json
 */
async function createInfrastructureOnlyForHaSystemWithAvailabilitySet(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "Deployment",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 5,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilitySet" },
      },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_HA_AvZone.json
 */
async function createInfrastructureOnlyForHaSystemWithAvailabilityZone(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "Deployment",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilityZone" },
      },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_SingleServer.json
 */
async function createInfrastructureOnlyForSingleServerSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "Deployment",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        databaseType: "HANA",
        deploymentType: "SingleServer",
        networkConfiguration: { isSecondaryIpEnabled: true },
        subnetId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "RHEL-SAP",
            publisher: "RedHat",
            sku: "84sapha-gen2",
            version: "latest",
          },
          osProfile: {
            adminUsername: "{your-username}",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              ssh: { publicKeys: [{ keyData: "ssh-rsa public key" }] },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
    },
    environment: "NonProd",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_DiskDetails_Distributed.json
 */
async function createInfrastructureWithDiskAndOSConfigurationForDistributedSystemRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          diskConfiguration: {
            diskVolumeConfigurations: {
              backup: {
                count: 2,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              "hana/data": {
                count: 4,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/log": {
                count: 3,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/shared": {
                count: 1,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              os: { count: 1, sizeGB: 64, sku: { name: "StandardSSD_LRS" } },
              "usr/sap": { count: 1, sizeGB: 128, sku: { name: "Premium_LRS" } },
            },
          },
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_DiskDetails_HA_AvSet.json
 */
async function createInfrastructureWithDiskAndOSConfigurationForHaSystemWithAvailabilitySetRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          diskConfiguration: {
            diskVolumeConfigurations: {
              backup: {
                count: 2,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              "hana/data": {
                count: 4,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/log": {
                count: 3,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/shared": {
                count: 1,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              os: { count: 1, sizeGB: 64, sku: { name: "StandardSSD_LRS" } },
              "usr/sap": { count: 1, sizeGB: 128, sku: { name: "Premium_LRS" } },
            },
          },
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilitySet" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_DiskDetails_HA_AvZone.json
 */
async function createInfrastructureWithDiskAndOSConfigurationForHaSystemWithAvailabilityZoneRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          diskConfiguration: {
            diskVolumeConfigurations: {
              backup: {
                count: 2,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              "hana/data": {
                count: 4,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/log": {
                count: 3,
                sizeGB: 128,
                sku: { name: "Premium_LRS" },
              },
              "hana/shared": {
                count: 1,
                sizeGB: 256,
                sku: { name: "StandardSSD_LRS" },
              },
              os: { count: 1, sizeGB: 64, sku: { name: "StandardSSD_LRS" } },
              "usr/sap": { count: 1, sizeGB: 128, sku: { name: "Premium_LRS" } },
            },
          },
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilityZone" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_DiskDetails_SingleServer.json
 */
async function createInfrastructureWithDiskAndOSConfigurationsForSingleServerSystemRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        databaseType: "HANA",
        dbDiskConfiguration: {
          diskVolumeConfigurations: {
            backup: { count: 2, sizeGB: 256, sku: { name: "StandardSSD_LRS" } },
            "hana/data": {
              count: 4,
              sizeGB: 128,
              sku: { name: "Premium_LRS" },
            },
            "hana/log": { count: 3, sizeGB: 128, sku: { name: "Premium_LRS" } },
            "hana/shared": {
              count: 1,
              sizeGB: 256,
              sku: { name: "StandardSSD_LRS" },
            },
            os: { count: 1, sizeGB: 64, sku: { name: "StandardSSD_LRS" } },
            "usr/sap": { count: 1, sizeGB: 128, sku: { name: "Premium_LRS" } },
          },
        },
        deploymentType: "SingleServer",
        networkConfiguration: { isSecondaryIpEnabled: true },
        subnetId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/dindurkhya-e2etesting/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "RHEL-SAP",
            publisher: "RedHat",
            sku: "84sapha-gen2",
            version: "latest",
          },
          osProfile: {
            adminUsername: "{your-username}",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "NonProd",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_WithOSConfig_Distributed.json
 */
async function createInfrastructureWithOSConfigurationForDistributedSystemRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_WithOSConfig_HA_AvSet.json
 */
async function createInfrastructureWithOSConfigurationForHaSystemWithAvailabilitySetRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilitySet" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_WithOSConfig_HA_AvZone.json
 */
async function createInfrastructureWithOSConfigurationForHaSystemWithAvailabilityZoneRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilityZone" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_WithOSConfig_SingleServer.json
 */
async function createInfrastructureWithOSConfigurationForSingleServerSystemRecommended(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        databaseType: "HANA",
        deploymentType: "SingleServer",
        networkConfiguration: { isSecondaryIpEnabled: true },
        subnetId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "RHEL-SAP",
            publisher: "RedHat",
            sku: "84sapha-gen2",
            version: "latest",
          },
          osProfile: {
            adminUsername: "{your-username}",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "NonProd",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Distributed_CreateTransport.json
 */
async function createInfrastructureWithANewSapTransportDirectoryFileshare(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        storageConfiguration: {
          transportFileShareConfiguration: {
            configurationType: "CreateAndMount",
            resourceGroup: "rgName",
            storageAccountName: "storageName",
          },
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Distributed_MountTransport.json
 */
async function createInfrastructureWithAnExistingSapTransportDirectoryFileshare(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        storageConfiguration: {
          transportFileShareConfiguration: {
            configurationType: "Mount",
            id: "/subscriptions/49d64d54-e888-4c46-a868-1936802b762c/resourceGroups/testrg/providers/Microsoft.Network/privateEndpoints/endpoint",
            privateEndpointId:
              "/subscriptions/49d64d54-e888-4c46-a868-1936802b762c/resourceGroups/testrg/providers/Microsoft.Network/privateEndpoints/endpoint",
          },
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Distributed_SkipTransport.json
 */
async function createInfrastructureWithoutASapTransportDirectoryFileshare(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        storageConfiguration: {
          transportFileShareConfiguration: { configurationType: "Skip" },
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_DetectInstallation_Distributed.json
 */
async function detectSapSoftwareInstallationOnADistributedSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "{{resourcegrp}}",
        applicationServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_E4ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_E4ds_v4",
          },
        },
        databaseServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        networkConfiguration: { isSecondaryIpEnabled: true },
      },
      osSapConfiguration: { sapFqdn: "sap.bpaas.com" },
      softwareConfiguration: {
        centralServerVmId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
        softwareInstallationType: "External",
      },
    },
    environment: "Prod",
    location: "eastus2",
    sapProduct: "S4HANA",
    tags: { createdBy: "azureuser" },
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_DetectInstallation_SingleServer.json
 */
async function detectSapSoftwareInstallationOnASingleServerSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        databaseType: "HANA",
        deploymentType: "SingleServer",
        networkConfiguration: { isSecondaryIpEnabled: true },
        subnetId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "RHEL-SAP-HA",
            publisher: "RedHat",
            sku: "84sapha-gen2",
            version: "latest",
          },
          osProfile: {
            adminUsername: "{your-username}",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
      softwareConfiguration: {
        centralServerVmId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
        softwareInstallationType: "External",
      },
    },
    environment: "NonProd",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_DetectInstallation_HA_AvSet.json
 */
async function detectSapSoftwareInstallationOnAnHaSystemWithAvailabilitySet(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilitySet" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
      softwareConfiguration: {
        centralServerVmId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
        softwareInstallationType: "External",
      },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_DetectInstallation_HA_AvZone.json
 */
async function detectSapSoftwareInstallationOnAnHaSystemWithAvailabilityZone(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "X00-RG",
        applicationServer: {
          instanceCount: 6,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E32ds_v4",
          },
        },
        centralServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/appsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_E16ds_v4",
          },
        },
        databaseServer: {
          databaseType: "HANA",
          instanceCount: 2,
          subnetId:
            "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Networks/virtualNetworks/test-vnet/subnets/dbsubnet",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "84sapha-gen2",
              version: "latest",
            },
            osProfile: {
              adminUsername: "{your-username}",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: { privateKey: "xyz", publicKey: "abc" },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        highAvailabilityConfig: { highAvailabilityType: "AvailabilityZone" },
      },
      osSapConfiguration: { sapFqdn: "xyz.test.com" },
      softwareConfiguration: {
        centralServerVmId:
          "/subscriptions/49d64d54-e966-4c46-a868-1999802b762c/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
        softwareInstallationType: "External",
      },
    },
    environment: "Prod",
    location: "westcentralus",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Install_Distributed.json
 */
async function installSapSoftwareOnDistributedSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "{{resourcegrp}}",
        applicationServer: {
          instanceCount: 2,
          subnetId:
            "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "8.2",
              version: "8.2.2021091201",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_E4ds_v4",
          },
        },
        centralServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "8.2",
              version: "8.2.2021091201",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_E4ds_v4",
          },
        },
        databaseServer: {
          instanceCount: 1,
          subnetId:
            "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/app",
          virtualMachineConfiguration: {
            imageReference: {
              offer: "RHEL-SAP-HA",
              publisher: "RedHat",
              sku: "8.2",
              version: "8.2.2021091201",
            },
            osProfile: {
              adminUsername: "azureuser",
              osConfiguration: {
                disablePasswordAuthentication: true,
                osType: "Linux",
                sshKeyPair: {
                  privateKey: "{{privateKey}}",
                  publicKey: "{{sshkey}}",
                },
              },
            },
            vmSize: "Standard_M32ts",
          },
        },
        deploymentType: "ThreeTier",
        networkConfiguration: { isSecondaryIpEnabled: true },
      },
      osSapConfiguration: { sapFqdn: "sap.bpaas.com" },
      softwareConfiguration: {
        bomUrl:
          "https://teststorageaccount.blob.core.windows.net/sapbits/sapfiles/boms/S41909SPS03_v0011ms/S41909SPS03_v0011ms.yaml",
        sapBitsStorageAccountId:
          "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
        softwareInstallationType: "SAPInstallWithoutOSConfig",
        softwareVersion: "SAP S/4HANA 1909 SPS 03",
      },
    },
    environment: "Prod",
    location: "eastus2",
    sapProduct: "S4HANA",
    tags: { createdBy: "azureuser" },
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Install_SingleServer.json
 */
async function installSapSoftwareOnSingleServerSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      appLocation: "eastus",
      configurationType: "DeploymentWithOSConfig",
      infrastructureConfiguration: {
        appResourceGroup: "test-rg",
        deploymentType: "SingleServer",
        subnetId:
          "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/testsubnet",
        virtualMachineConfiguration: {
          imageReference: {
            offer: "SLES-SAP",
            publisher: "SUSE",
            sku: "12-sp4-gen2",
            version: "2022.02.01",
          },
          osProfile: {
            adminUsername: "azureappadmin",
            osConfiguration: {
              disablePasswordAuthentication: true,
              osType: "Linux",
              sshKeyPair: {
                privateKey: "{{privateKey}}",
                publicKey: "{{sshkey}}",
              },
            },
          },
          vmSize: "Standard_E32ds_v4",
        },
      },
      osSapConfiguration: { sapFqdn: "sap.bpaas.com" },
      softwareConfiguration: {
        bomUrl:
          "https://teststorageaccount.blob.core.windows.net/sapbits/sapfiles/boms/S41909SPS03_v0011ms/S41909SPS03_v0011ms.yaml",
        sapBitsStorageAccountId:
          "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Storage/storageAccounts/teststorageaccount",
        softwareInstallationType: "SAPInstallWithoutOSConfig",
        softwareVersion: "SAP S/4HANA 1909 SPS 03",
      },
    },
    environment: "NonProd",
    location: "eastus2",
    sapProduct: "S4HANA",
    tags: {},
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Discover_CustomMrgStorageAccountName.json
 */
async function registerExistingSapSystemAsVirtualInstanceForSapSolutionsWithOptionalCustomizations(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      centralServerVmId:
        "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
      configurationType: "Discovery",
      managedRgStorageAccountName: "q20saacssgrs",
    },
    environment: "NonProd",
    location: "northeurope",
    sapProduct: "S4HANA",
    tags: { createdby: "abc@microsoft.com", test: "abc" },
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @summary Creates a Virtual Instance for SAP solutions (VIS) resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Create_Discover.json
 */
async function registerExistingSapSystemAsVirtualInstanceForSapSolutions(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: SAPVirtualInstance = {
    configuration: {
      centralServerVmId:
        "/subscriptions/8e17e36c-42e9-4cd5-a078-7b44883414e0/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/sapq20scsvm0",
      configurationType: "Discovery",
    },
    environment: "NonProd",
    location: "northeurope",
    sapProduct: "S4HANA",
    tags: { createdby: "abc@microsoft.com", test: "abc" },
  };
  const options: SAPVirtualInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createInfrastructureWithOSConfigurationWithCustomResourceNamesForDistributedSystem();
  await createInfrastructureWithOSConfigurationWithCustomResourceNamesForHaSystemWithAvailabilitySet();
  await createInfrastructureWithOSConfigurationWithCustomResourceNamesForHaSystemWithAvailabilityZone();
  await createInfrastructureWithOSConfigurationWithCustomResourceNamesForSingleServerSystem();
  await createInfrastructureOnlyForDistributedSystem();
  await createInfrastructureOnlyForHaSystemWithAvailabilitySet();
  await createInfrastructureOnlyForHaSystemWithAvailabilityZone();
  await createInfrastructureOnlyForSingleServerSystem();
  await createInfrastructureWithDiskAndOSConfigurationForDistributedSystemRecommended();
  await createInfrastructureWithDiskAndOSConfigurationForHaSystemWithAvailabilitySetRecommended();
  await createInfrastructureWithDiskAndOSConfigurationForHaSystemWithAvailabilityZoneRecommended();
  await createInfrastructureWithDiskAndOSConfigurationsForSingleServerSystemRecommended();
  await createInfrastructureWithOSConfigurationForDistributedSystemRecommended();
  await createInfrastructureWithOSConfigurationForHaSystemWithAvailabilitySetRecommended();
  await createInfrastructureWithOSConfigurationForHaSystemWithAvailabilityZoneRecommended();
  await createInfrastructureWithOSConfigurationForSingleServerSystemRecommended();
  await createInfrastructureWithANewSapTransportDirectoryFileshare();
  await createInfrastructureWithAnExistingSapTransportDirectoryFileshare();
  await createInfrastructureWithoutASapTransportDirectoryFileshare();
  await detectSapSoftwareInstallationOnADistributedSystem();
  await detectSapSoftwareInstallationOnASingleServerSystem();
  await detectSapSoftwareInstallationOnAnHaSystemWithAvailabilitySet();
  await detectSapSoftwareInstallationOnAnHaSystemWithAvailabilityZone();
  await installSapSoftwareOnDistributedSystem();
  await installSapSoftwareOnSingleServerSystem();
  await registerExistingSapSystemAsVirtualInstanceForSapSolutionsWithOptionalCustomizations();
  await registerExistingSapSystemAsVirtualInstanceForSapSolutions();
}

main().catch(console.error);
