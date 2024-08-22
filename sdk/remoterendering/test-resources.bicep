param baseName string = resourceGroup().name
param location string = resourceGroup().location
param baseTime string = utcNow('u')

var arrApiVersion = '2021-03-01-preview'
var arrAccountName = '${baseName}-arr-account'
var storageApiVersion = '2023-05-01'
var storageAccountName = baseName
var blobContainerName = 'test'
var blobContainerResourceName = '${storageAccountName}/default/${blobContainerName}'
var sasProperties = {
  signedPermission: 'rwl'
  signedExpiry: dateTimeAdd(baseTime, 'P1D')
  signedResource: 'c'
  canonicalizedResource: '/blob/${storageAccountName}/${blobContainerName}'
}

resource remoteRenderingAccount 'Microsoft.MixedReality/remoteRenderingAccounts@2021-03-01-preview' = {
  name: arrAccountName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {}
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
  name: blobContainerResourceName
  dependsOn: [
    storageAccount
  ]
}

output REMOTERENDERING_ARR_ACCOUNT_ID string = remoteRenderingAccount.properties.accountId
output REMOTERENDERING_ARR_ACCOUNT_DOMAIN string = remoteRenderingAccount.properties.accountDomain
output REMOTERENDERING_ARR_ACCOUNT_KEY string = listKeys(resourceId('Microsoft.MixedReality/remoteRenderingAccounts', arrAccountName), arrApiVersion).primaryKey
output REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME string = storageAccountName
output REMOTERENDERING_ARR_STORAGE_ACCOUNT_KEY string = listKeys(resourceId('Microsoft.Storage/storageAccounts', storageAccountName), storageApiVersion).keys[0].value
output REMOTERENDERING_ARR_BLOB_CONTAINER_NAME string = blobContainerName
output REMOTERENDERING_ARR_SAS_TOKEN string = listServiceSas(storageAccountName, storageApiVersion, sasProperties).serviceSasToken
output REMOTERENDERING_ARR_SERVICE_ENDPOINT string = 'https://remoterendering.${location}.mixedreality.azure.com'
