param baseName string = resourceGroup().name
param testApplicationOid string
param workspacePrefix string = 'workspace'
param location string = resourceGroup().location
param defaultDataLakeStorageAccountNamePrefix string = 'storage'
param defaultDataLakeStorageFilesystemNamePrefix string = 'filesystem'
param sqlAdministratorLogin string = 'sqladminuser'
@description('The password must be atleast 8 characters long and contain characters from three of the following four categories: (uppercase  letters, lowercase letters, digits (0-9), Non-alphanumeric characters such as: !, $, #, or %)')
@minLength(8)
@secure()
param sqlAdministratorLoginPassword string
param setWorkspaceIdentityRbacOnStorageAccount bool = false
param allowAllConnections bool = true
param grantWorkspaceIdentityControlForSql string = 'Enabled' // Allowed values: 'Enabled', 'Disabled'
param managedVirtualNetwork string = 'default' // Allowed values: 'default', ''
param tagValues object = {}
param storageLocation string = resourceGroup().location
param isNewStorageAccount bool = true
param isNewFileSystemOnly bool = false
param storageAccessTier string = 'Hot'
param storageAccountType string = 'Standard_RAGRS'
param storageSupportsHttpsTrafficOnly bool = true
param storageKind string = 'StorageV2'
param storageIsHnsEnabled bool = true
param setSbdcRbacOnStorageAccount bool = false
param sparkPoolPrefix string = 'spark'
param tags object = {}
param autoScaleEnabled bool = true
param autoScaleMinNodeCount int = 3
param autoScaleMaxNodeCount int = 40
param nodeCount int = 3
param nodeSizeFamily string = 'MemoryOptimized'
param nodeSize string = 'Small'
param autoPauseEnabled bool = true
param autoPauseDelayInMinutes int = 15
param sparkVersion string = '2.4'
param libraryRequirementsFilename string = ''
param libraryRequirementsContent string = ''
param managedVirtualNetworkSettings object = {
  allowedAadTenantIdsForLinking: []
  preventDataExfiltration: false
}

var storageEndpointSuffix = environment().suffixes.storage
var uniqueWorkspaceName = '${workspacePrefix}${baseName}'
var uniqueDataLakeStorageAccountName = '${defaultDataLakeStorageAccountNamePrefix}${baseName}'
var uniqueDataLakeStorageFilesystemName = '${defaultDataLakeStorageFilesystemNamePrefix}${baseName}'
var storageBlobDataContributorRoleID = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var defaultDataLakeStorageAccountUrl = 'https://${uniqueDataLakeStorageAccountName}.dfs.${storageEndpointSuffix}'
var uniqueSparkPoolName = take('${sparkPoolPrefix}${baseName}', 15)

resource synapseWorkspace 'Microsoft.Synapse/workspaces@2021-06-01' = {
  name: uniqueWorkspaceName
  location: location
  tags: tagValues
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    defaultDataLakeStorage: {
      accountUrl: defaultDataLakeStorageAccountUrl
      filesystem: uniqueDataLakeStorageFilesystemName
    }
    sqlAdministratorLogin: sqlAdministratorLogin
    sqlAdministratorLoginPassword: sqlAdministratorLoginPassword
    managedVirtualNetwork: managedVirtualNetwork
    managedVirtualNetworkSettings: managedVirtualNetworkSettings
  }
  dependsOn: [
    storageAccount
  ]

  resource firewallRules 'firewallRules@2021-06-01' = if (allowAllConnections) {
    name: 'allowAll'
    properties: {
      startIpAddress: '0.0.0.0'
      endIpAddress: '255.255.255.255'
    }
  }

  resource managedIdentitySqlControlSettings 'managedIdentitySqlControlSettings@2021-06-01' = {
    name: 'default'
    properties: {
      grantSqlControlToManagedIdentity: {
        desiredState: grantWorkspaceIdentityControlForSql
      }
    }
  }
}

resource roleAssignmentForSynapse 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (setWorkspaceIdentityRbacOnStorageAccount) {
  name: guid(resourceGroup().id, storageBlobDataContributorRoleID, uniqueWorkspaceName)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleID)
    principalId: synapseWorkspace.identity.principalId
    principalType: 'ServicePrincipal'
  }
  scope: storageAccount
}

resource roleAssignmentForTestApp 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (setWorkspaceIdentityRbacOnStorageAccount && setSbdcRbacOnStorageAccount) {
  name: guid(resourceGroup().id, storageBlobDataContributorRoleID, testApplicationOid)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleID)
    principalId: testApplicationOid
    principalType: 'App'
  }
  scope: storageAccount
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = if (isNewStorageAccount) {
  name: uniqueDataLakeStorageAccountName
  location: storageLocation
  sku: {
    name: storageAccountType
  }
  kind: storageKind
  properties: {
    accessTier: storageAccessTier
    supportsHttpsTrafficOnly: storageSupportsHttpsTrafficOnly
    isHnsEnabled: storageIsHnsEnabled
  }
}

resource storageFilesystem 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = if (!isNewFileSystemOnly) {
  name: '${uniqueDataLakeStorageAccountName}/default/${uniqueDataLakeStorageFilesystemName}'
  properties: {
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccount
  ]
}

resource bigDataPool 'Microsoft.Synapse/workspaces/bigDataPools@2021-06-01' = {
  name: uniqueSparkPoolName
  location: location
  tags: tags
  properties: {
    nodeCount: nodeCount
    nodeSizeFamily: nodeSizeFamily
    nodeSize: nodeSize
    autoScale: {
      enabled: autoScaleEnabled
      minNodeCount: autoScaleMinNodeCount
      maxNodeCount: autoScaleMaxNodeCount
    }
    autoPause: {
      enabled: autoPauseEnabled
      delayInMinutes: autoPauseDelayInMinutes
    }
    sparkVersion: sparkVersion
    libraryRequirements: {
      filename: libraryRequirementsFilename
      content: libraryRequirementsContent
    }
  }
  parent: synapseWorkspace
}

output AZURE_SYNAPSE_WORKSPACE_URL string = 'https://${uniqueWorkspaceName}.dev.azuresynapse.net'
output AZURE_SYNAPSE_WORKSPACE_NAME string = uniqueWorkspaceName
output AZURE_SYNAPSE_SPARK_POOL_NAME string = uniqueSparkPoolName
output AZURE_STORAGE_ACCOUNT_NAME string = uniqueDataLakeStorageAccountName
output AZURE_STORAGE_FILE_SYSTEM_NAME string = uniqueDataLakeStorageFilesystemName
output AZURE_SYNAPSE_PRINCIPAL_ID string = testApplicationOid
