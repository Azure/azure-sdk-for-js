param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string
param enableVersioning bool = false

var taRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
var cognitiveAccountName = 'textanalytics-${baseName}'
var cognitiveApiVersion = '2024-04-01-preview'
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
  }
  resource blobService 'blobServices' = {
    name: 'default'
    properties: {
      isVersioningEnabled: enableVersioning
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

resource cognitiveAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S'
  }
  kind: 'TextAnalytics'
  properties: {
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
  name: guid(resourceGroup().id, blobDataOwnerRoleId, baseName)
  dependsOn: [
    storageAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: cognitiveAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource blobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataContributorRoleId', storageAccountName)
  dependsOn: [
    storageAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource blobDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataOwnerRoleId', storageAccountName)
  dependsOn: [
    storageAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource cognitiveRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('taRoleId', cognitiveAccountName)
  dependsOn: [
    cognitiveAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', taRoleId)
    principalId: testApplicationOid
  }
}

output LANGUAGE_API_KEY string = listKeys(cognitiveAccount.id, cognitiveApiVersion).key1
output LANGUAGE_API_KEY_ALT string = listKeys(cognitiveAccount.id, cognitiveApiVersion).key2
output ENDPOINT string = cognitiveAccount.properties.endpoint
output STORAGE_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
