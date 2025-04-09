param baseName string
param testApplicationOid string
param supportsSafeSecretStandard bool = false

var blobDataContributorRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '0a9a7e1f-b9d0-4cc4-a60d-0319b160aaa3')
var location = resourceGroup().location
var accountName = baseName

// Role Assignment for Blob Data Contributor
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('tableDataContributorRoleId', storageAccount.id, blobDataContributorRoleId)
  properties: {
    roleDefinitionId: blobDataContributorRoleId
    principalId: testApplicationOid
  }
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: accountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    allowSharedKeyAccess: !supportsSafeSecretStandard
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          enabled: true
        }
        blob: {
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
  resource tableService 'tableServices@2024-01-01' = {
    name: 'default'
    properties: {
      cors: {
        corsRules: [
          {
            allowedOrigins: ['*']
            allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
            maxAgeInSeconds: 86400
            exposedHeaders: ['*']
            allowedHeaders: ['*']
          }
        ]
      }
    }
  }
}

// Outputs
output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output ACCOUNT_NAME string = storageAccount.name
output TABLES_URL string = storageAccount.properties.primaryEndpoints.table
