param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string
param supportsSafeSecretStandard bool = false

var taRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
var cognitiveAccountName = 'textanalytics-${baseName}'
var storageAccountName = baseName
var blobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var blobDataOwnerRoleId = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
var encryption = {
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
var networkAcls = {
  bypass: 'AzureServices'
  virtualNetworkRules: []
  ipRules: []
  defaultAction: 'Allow'
}
var containerName = 'documents'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
  resource blobService 'blobServices' = {
    name: 'default'
    properties: {
      isVersioningEnabled: false
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
      lastAccessTimeTrackingPolicy: {
        enable: true
        name: 'AccessTimeTracking'
        trackingGranularityInDays: 1
        blobType: ['blockBlob']
      }
    }
    resource container 'containers' = {
      name: containerName
    }
  }
  resource fileService 'fileServices' = {
    name: 'default'
    properties: {
      cors: {
        corsRules: [
          {
            allowedOrigins: ['*']
            allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
            maxAgeInSeconds: 86400
            exposedHeaders: ['*']
            allowedHeaders: ['*']
          }
        ]
      }
    }
  }
}

resource cognitiveAccount 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S'
  }
  kind: 'TextAnalytics'
  properties: {
    disableLocalAuth: supportsSafeSecretStandard
    customSubDomainName: cognitiveAccountName
    userOwnedStorage: [
      {
        resourceId: storageAccount.id
      }
    ]
  }
  identity: {
    type: 'SystemAssigned'
  }
}

resource storageRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, blobDataOwnerRoleId, cognitiveAccount.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: cognitiveAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource blobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataContributorRoleId', storageAccount.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource blobDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataOwnerRoleId', storageAccount.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource cognitiveRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('taRoleId', cognitiveAccount.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', taRoleId)
    principalId: testApplicationOid
  }
}

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output ACCOUNT_NAME string = cognitiveAccount.name
output ENDPOINT string = cognitiveAccount.properties.endpoint
output STORAGE_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
