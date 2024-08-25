param baseName string = resourceGroup().name
param location string = resourceGroup().location
param baseTime string = utcNow('u')
param testApplicationOid string

var arrApiVersion = '2021-03-01-preview'
var arrAccountName = '${baseName}-arr-account'
var storageApiVersion = '2023-05-01'
var storageAccountName = baseName
var storageAccountNoAccessName = '${baseName}-noaccess'
var blobContainerName = 'test'
var blobContainerNoAccessName = 'test2'
var sasProperties = {
  signedPermission: 'rwl'
  signedExpiry: dateTimeAdd(baseTime, 'P1D')
  signedResource: 'c'
  canonicalizedResource: '/blob/${storageAccountName}/${blobContainerName}'
}
var remoteRenderingAdminRoleId = '3df8b902-2a6f-47c7-8cc5-360e9b272a7e'
var storageBlobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'

resource remoteRenderingAccount 'Microsoft.MixedReality/remoteRenderingAccounts@2021-03-01-preview' = {
  name: arrAccountName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    storageAccountName: storageAccountName
  }
}

resource remoteRenderingAdminRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(remoteRenderingAccount.id, testApplicationOid, remoteRenderingAdminRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', remoteRenderingAdminRoleId)
    principalId: testApplicationOid
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    encryption: {
      keySource: 'Microsoft.Storage'
      services: {
        blob: {
          enabled: true
        }
      }
    }
    accessTier: 'Hot'
  }
}

resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  name: '${storageAccountName}/default/${blobContainerName}'
  dependsOn: [
    storageAccount
  ]
}

// Role assignment to grant Storage Blob Data Contributor role to the Remote Rendering Account Managed Identity
resource storageBlobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, remoteRenderingAccount.id, storageBlobDataContributorRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleId)
    principalId: remoteRenderingAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource storageAccountNoAccess 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountNoAccessName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    encryption: {
      keySource: 'Microsoft.Storage'
      services: {
        blob: {
          enabled: true
        }
      }
    }
    accessTier: 'Hot'
  }
}

resource blobContainerNoAccess 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  name: '${storageAccountNoAccessName}/default/${blobContainerNoAccessName}'
  dependsOn: [
    storageAccountNoAccess
  ]
}

output REMOTERENDERING_ARR_ACCOUNT_ID string = remoteRenderingAccount.properties.accountId
output REMOTERENDERING_ARR_ACCOUNT_DOMAIN string = remoteRenderingAccount.properties.accountDomain
output REMOTERENDERING_ARR_ACCOUNT_KEY string = listKeys(resourceId('Microsoft.MixedReality/remoteRenderingAccounts', arrAccountName), arrApiVersion).primaryKey
output REMOTERENDERING_ARR_STORAGE_ACCOUNT_KEY string = listKeys(resourceId('Microsoft.Storage/storageAccounts', storageAccountName), storageApiVersion).keys[0].value
output REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME string = storageAccount.name
output REMOTERENDERING_ARR_BLOB_CONTAINER_NAME string = blobContainerName
output STORAGE_ACCOUNT_NO_ACCESS_NAME string = storageAccountNoAccess.name
output BLOB_CONTAINER_NO_ACCESS_NAME string = blobContainerNoAccessName
output REMOTERENDERING_ARR_SAS_TOKEN string = listServiceSas(storageAccountName, storageApiVersion, sasProperties).serviceSasToken
output REMOTERENDERING_ARR_SERVICE_ENDPOINT string = 'https://remoterendering.${location}.mixedreality.azure.com'
