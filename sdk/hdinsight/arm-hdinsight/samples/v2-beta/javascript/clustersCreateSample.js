// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithADLSGen2Msi.json
 */
async function createClusterWithStorageAdlsGen2MSI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi":
          {},
      },
    },
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "5.1",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 3,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 3,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            fileSystem: "default",
            isDefault: true,
            msiResourceId:
              "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi",
            resourceId:
              "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/mystorage",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithAutoscaleConfig.json
 */
async function createHDInsightClusterWithAutoscaleConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        componentVersion: { Hadoop: "2.7" },
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "workernode",
            autoscaleConfiguration: {
              recurrence: {
                schedule: [
                  {
                    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    timeAndCapacity: { maxInstanceCount: 3, minInstanceCount: 3, time: "09:00" },
                  },
                  {
                    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    timeAndCapacity: { maxInstanceCount: 6, minInstanceCount: 6, time: "18:00" },
                  },
                  {
                    days: ["Saturday", "Sunday"],
                    timeAndCapacity: { maxInstanceCount: 2, minInstanceCount: 2, time: "09:00" },
                  },
                  {
                    days: ["Saturday", "Sunday"],
                    timeAndCapacity: { maxInstanceCount: 4, minInstanceCount: 4, time: "18:00" },
                  },
                ],
                timeZone: "China Standard Time",
              },
            },
            hardwareProfile: { vmSize: "Standard_D4_V2" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 4,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "hdinsight-autoscale-tes-2019-06-18t05-49-16-591z",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithAvailabilityZones.json
 */
async function createClusterWithAvailabilityZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          "ambari-conf": {
            "database-name": "{ambari database name}",
            "database-server": "{sql server name}.database.windows.net",
            "database-user-name": "**********",
            "database-user-password": "**********",
          },
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
          "hive-env": {
            hive_database: "Existing MSSQL Server database with SQL authentication",
            hive_database_name: "{hive metastore name}",
            hive_database_type: "mssql",
            hive_existing_mssql_server_database: "{hive metastore name}",
            hive_existing_mssql_server_host: "{sql server name}.database.windows.net",
            hive_hostname: "{sql server name}.database.windows.net",
          },
          "hive-site": {
            "javax.jdo.option.ConnectionDriverName": "com.microsoft.sqlserver.jdbc.SQLServerDriver",
            "javax.jdo.option.ConnectionPassword": "**********!",
            "javax.jdo.option.ConnectionURL":
              "jdbc:sqlserver://{sql server name}.database.windows.net;database={hive metastore name};encrypt=true;trustServerCertificate=true;create=false;loginTimeout=300;sendStringParametersAsUnicode=true;prepareSQL=0",
            "javax.jdo.option.ConnectionUserName": "**********",
          },
          "oozie-env": {
            oozie_database: "Existing MSSQL Server database with SQL authentication",
            oozie_database_name: "{oozie metastore name}",
            oozie_database_type: "mssql",
            oozie_existing_mssql_server_database: "{oozie metastore name}",
            oozie_existing_mssql_server_host: "{sql server name}.database.windows.net",
            oozie_hostname: "{sql server name}.database.windows.net",
          },
          "oozie-site": {
            "oozie.db.schema.name": "oozie",
            "oozie.service.JPAService.jdbc.driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver",
            "oozie.service.JPAService.jdbc.password": "**********",
            "oozie.service.JPAService.jdbc.url":
              "jdbc:sqlserver://{sql server name}.database.windows.net;database={oozie metastore name};encrypt=true;trustServerCertificate=true;create=false;loginTimeout=300;sendStringParametersAsUnicode=true;prepareSQL=0",
            "oozie.service.JPAService.jdbc.username": "**********",
          },
        },
        kind: "hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storage account key",
          },
        ],
      },
    },
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithComputeIsolationProperties.json
 */
async function createClusterWithComputeIsolationProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "hadoop",
      },
      clusterVersion: "3.6",
      computeIsolationProperties: { enableComputeIsolation: true },
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storage account key",
          },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithCustomNetworkProperties.json
 */
async function createClusterWithNetworkProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "standard_d3" },
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
        ],
      },
      networkProperties: {
        privateLink: "Enabled",
        publicIpTag: { ipTagType: "FirstPartyUsage", tag: "/<TagName>" },
        resourceProviderConnection: "Outbound",
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storage account key",
          },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithEncryptionAtHost.json
 */
async function createClusterWithEncryptionAtHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_DS14_v2" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_DS14_v2" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Standard_DS14_v2" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      diskEncryptionProperties: { encryptionAtHost: true },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "default8525",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithEncryptionInTransit.json
 */
async function createClusterWithEncryptionInTransit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      encryptionInTransitProperties: { isEncryptionInTransitEnabled: true },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "default8525",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithEntraUser.json
 */
async function createClusterWithEntraUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": false,
            restAuthEntraUsers: [
              {
                displayName: "displayName",
                objectId: "00000000-0000-0000-0000-000000000000",
                upn: "user@microsoft.com",
              },
            ],
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "5.1",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithTLS12.json
 */
async function createClusterWithTLS12() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      minSupportedTlsVersion: "1.2",
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "default8525",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateHDInsightClusterWithWasbMsi.json
 */
async function createClusterWithStorageWasbMSI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi":
          {},
      },
    },
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "5.1",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 3,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 3,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            isDefault: true,
            msiResourceId:
              "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi",
            resourceId:
              "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/mystorage",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateKafkaClusterWithKafkaRestProxy.json
 */
async function createKafkaClusterWithKafkaRestProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        componentVersion: { Kafka: "2.1" },
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "kafka",
      },
      clusterVersion: "4.0",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            dataDisksGroups: [{ disksPerNode: 8 }],
            hardwareProfile: { vmSize: "Large" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
          {
            name: "kafkamanagementnode",
            hardwareProfile: { vmSize: "Standard_D4_v2" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "kafkauser" },
            },
            targetInstanceCount: 2,
          },
        ],
      },
      kafkaRestProperties: {
        clientGroupInfo: {
          groupId: "00000000-0000-0000-0000-111111111111",
          groupName: "Kafka security group name",
        },
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateLinuxHadoopAdlsGen2.json
 */
async function createHadoopClusterWithAzureDataLakeStorageGen2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": "true",
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.6",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 4,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.dfs.core.windows.net",
            enableSecureChannel: true,
            fileSystem: "default",
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateLinuxHadoopSecureHadoop.json
 */
async function createSecureHadoopCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.5",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            scriptActions: [],
            targetInstanceCount: 2,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            scriptActions: [],
            targetInstanceCount: 4,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: {
                password: "**********",
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            scriptActions: [],
            targetInstanceCount: 3,
            virtualNetworkProfile: {
              id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname",
              subnet:
                "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/vnetsubnet",
            },
          },
        ],
      },
      osType: "Linux",
      securityProfile: {
        clusterUsersGroupDNs: ["hdiusers"],
        directoryType: "ActiveDirectory",
        domain: "DomainName",
        domainUserPassword: "**********",
        domainUsername: "DomainUsername",
        ldapsUrls: ["ldaps://10.10.0.4:636"],
        organizationalUnitDN: "OU=Hadoop,DC=hdinsight,DC=test",
      },
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storage account key",
          },
        ],
      },
      tier: "Premium",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateLinuxHadoopSshPassword.json
 */
async function createHadoopOnLinuxClusterWithSSHPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": "true",
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.5",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 4,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateLinuxHadoopSshPublicKey.json
 */
async function createHadoopOnLinuxClusterWithSSHPublicKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Hadoop",
      },
      clusterVersion: "3.5",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: {
                sshProfile: { publicKeys: [{ certificateData: "**********" }] },
                username: "sshuser",
              },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_D3_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 4,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Small" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 3,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storagekey",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new HDInsight cluster with the specified parameters.
 *
 * @summary creates a new HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/CreateLinuxSparkSshPassword.json
 */
async function createSparkOnLinuxClusterWithSSHPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.create("rg1", "cluster1", {
    properties: {
      clusterDefinition: {
        componentVersion: { Spark: "2.0" },
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "Spark",
      },
      clusterVersion: "3.5",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_D12_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_D4_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            targetInstanceCount: 4,
          },
        ],
      },
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "mystorage.blob.core.windows.net",
            container: "containername",
            enableSecureChannel: true,
            isDefault: true,
            key: "storageapikey*",
          },
        ],
      },
      tier: "Standard",
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

async function main() {
  await createClusterWithStorageAdlsGen2MSI();
  await createHDInsightClusterWithAutoscaleConfiguration();
  await createClusterWithAvailabilityZones();
  await createClusterWithComputeIsolationProperties();
  await createClusterWithNetworkProperties();
  await createClusterWithEncryptionAtHost();
  await createClusterWithEncryptionInTransit();
  await createClusterWithEntraUser();
  await createClusterWithTLS12();
  await createClusterWithStorageWasbMSI();
  await createKafkaClusterWithKafkaRestProxy();
  await createHadoopClusterWithAzureDataLakeStorageGen2();
  await createSecureHadoopCluster();
  await createHadoopOnLinuxClusterWithSSHPassword();
  await createHadoopOnLinuxClusterWithSSHPublicKey();
  await createSparkOnLinuxClusterWithSSHPassword();
}

main().catch(console.error);
