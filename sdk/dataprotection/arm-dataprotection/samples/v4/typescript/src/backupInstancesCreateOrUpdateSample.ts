// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a backup instance in a backup vault
 *
 * @summary create or update a backup instance in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/PutBackupInstance.json
 */
async function createBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.createOrUpdate(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      properties: {
        dataSourceInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
          resourceLocation: "",
          resourceName: "testdb",
          resourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          resourceUri: "",
        },
        dataSourceSetInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest",
          resourceLocation: "",
          resourceName: "viveksipgtest",
          resourceType: "Microsoft.DBforPostgreSQL/servers",
          resourceUri: "",
        },
        datasourceAuthCredentials: {
          objectType: "SecretStoreBasedAuthCredentials",
          secretStoreResource: {
            secretStoreType: "AzureKeyVault",
            uri: "https://samplevault.vault.azure.net/secrets/credentials",
          },
        },
        friendlyName: "harshitbi2",
        identityDetails: {
          useSystemAssignedIdentity: false,
          userAssignedIdentityArmUrl:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourcegroups/rg-name/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testUami",
        },
        objectType: "BackupInstance",
        policyInfo: {
          policyId:
            "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/000pikumar/providers/Microsoft.DataProtection/Backupvaults/PratikPrivatePreviewVault1/backupPolicies/PratikPolicy1",
          policyParameters: {
            dataStoreParametersList: [
              {
                dataStoreType: "OperationalStore",
                objectType: "AzureOperationalStoreParameters",
                resourceGroupId:
                  "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest",
              },
            ],
          },
        },
        validationType: "ShallowValidation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a backup instance in a backup vault
 *
 * @summary create or update a backup instance in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/PutBackupInstance_ADLSBlobBackupDatasourceParameters.json
 */
async function createBackupInstanceWithAdlsBlobBackupDatasourceParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "54707983-993e-43de-8d94-074451394eda";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.createOrUpdate(
    "adlsrg",
    "adlsvault",
    "adlsstorageaccount-adlsstorageaccount-19a76f8a-c176-4f7d-819e-95157e2b0071",
    {
      properties: {
        dataSourceInfo: {
          datasourceType: "Microsoft.Storage/storageAccounts/adlsBlobServices",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/54707983-993e-43de-8d94-074451394eda/resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsstorageaccount",
          resourceLocation: "centraluseuap",
          resourceName: "adlsstorageaccount",
          resourceType: "microsoft.storage/storageAccounts",
          resourceUri:
            "/subscriptions/54707983-993e-43de-8d94-074451394eda/resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsstorageaccount",
        },
        dataSourceSetInfo: {
          datasourceType: "Microsoft.Storage/storageAccounts/adlsBlobServices",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/54707983-993e-43de-8d94-074451394eda/resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsstorageaccount",
          resourceLocation: "centraluseuap",
          resourceName: "adlsstorageaccount",
          resourceType: "microsoft.storage/storageAccounts",
          resourceUri:
            "/subscriptions/54707983-993e-43de-8d94-074451394eda/resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsstorageaccount",
        },
        friendlyName: "adlsstorageaccount\\adlsbackupinstance",
        objectType: "BackupInstance",
        policyInfo: {
          policyId:
            "/subscriptions/54707983-993e-43de-8d94-074451394eda/resourceGroups/adlsrg/providers/Microsoft.DataProtection/backupVaults/adlsvault/backupPolicies/adlspolicy",
          policyParameters: {
            backupDatasourceParametersList: [
              {
                containersList: ["container1"],
                objectType: "AdlsBlobBackupDatasourceParameters",
              },
            ],
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a backup instance in a backup vault
 *
 * @summary create or update a backup instance in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/PutBackupInstance_KubernetesClusterBackupDatasourceParameters.json
 */
async function createBackupInstanceWithKubernetesClusterBackupDatasourceParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.createOrUpdate(
    "aksrg",
    "aksvault",
    "aksbi",
    {
      properties: {
        dataSourceInfo: {
          datasourceType: "Microsoft.ContainerService/managedclusters",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/aksrg/providers/Microsoft.ContainerService/managedClusters/akscluster",
          resourceLocation: "eastus2euap",
          resourceName: "akscluster",
          resourceType: "Microsoft.ContainerService/managedclusters",
          resourceUri:
            "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/aksrg/providers/Microsoft.ContainerService/managedClusters/akscluster",
        },
        dataSourceSetInfo: {
          datasourceType: "Microsoft.ContainerService/managedclusters",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/aksrg/providers/Microsoft.ContainerService/managedClusters/akscluster",
          resourceLocation: "eastus2euap",
          resourceName: "akscluster",
          resourceType: "Microsoft.ContainerService/managedclusters",
          resourceUri:
            "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/aksrg/providers/Microsoft.ContainerService/managedClusters/akscluster",
        },
        friendlyName: "aksbi",
        objectType: "BackupInstance",
        policyInfo: {
          policyId:
            "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourcegroups/aksrg/providers/Microsoft.DataProtection/BackupVaults/aksvault/backupPolicies/akspolicy",
          policyParameters: {
            backupDatasourceParametersList: [
              {
                excludedNamespaces: ["kube-system"],
                excludedResourceTypes: ["v1/Secret"],
                includeClusterScopeResources: true,
                includedNamespaces: ["test"],
                includedResourceTypes: [],
                includedVolumeTypes: ["AzureDisk", "AzureFileShareSMB"],
                labelSelectors: [],
                objectType: "KubernetesClusterBackupDatasourceParameters",
                snapshotVolumes: true,
              },
            ],
            dataStoreParametersList: [
              {
                dataStoreType: "OperationalStore",
                objectType: "AzureOperationalStoreParameters",
                resourceGroupId:
                  "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/aksrg",
              },
            ],
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a backup instance in a backup vault
 *
 * @summary create or update a backup instance in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/PutBackupInstance_ResourceGuardEnabled.json
 */
async function createBackupInstanceToPerformCriticalOperationWithMUA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.createOrUpdate(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      properties: {
        dataSourceInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
          resourceLocation: "",
          resourceName: "testdb",
          resourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          resourceUri: "",
        },
        dataSourceSetInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest",
          resourceLocation: "",
          resourceName: "viveksipgtest",
          resourceType: "Microsoft.DBforPostgreSQL/servers",
          resourceUri: "",
        },
        datasourceAuthCredentials: {
          objectType: "SecretStoreBasedAuthCredentials",
          secretStoreResource: {
            secretStoreType: "AzureKeyVault",
            uri: "https://samplevault.vault.azure.net/secrets/credentials",
          },
        },
        friendlyName: "harshitbi2",
        objectType: "BackupInstance",
        policyInfo: {
          policyId:
            "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/000pikumar/providers/Microsoft.DataProtection/Backupvaults/PratikPrivatePreviewVault1/backupPolicies/PratikPolicy1",
          policyParameters: {
            dataStoreParametersList: [
              {
                dataStoreType: "OperationalStore",
                objectType: "AzureOperationalStoreParameters",
                resourceGroupId:
                  "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest",
              },
            ],
          },
        },
        resourceGuardOperationRequests: [
          "/subscriptions/38304e13-357e-405e-9e9a-220351dcce8c/resourcegroups/ankurResourceGuard1/providers/Microsoft.DataProtection/resourceGuards/ResourceGuard38-1/dppModifyPolicy/default",
        ],
        validationType: "ShallowValidation",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createBackupInstance();
  await createBackupInstanceWithAdlsBlobBackupDatasourceParameters();
  await createBackupInstanceWithKubernetesClusterBackupDatasourceParameters();
  await createBackupInstanceToPerformCriticalOperationWithMUA();
}

main().catch(console.error);
