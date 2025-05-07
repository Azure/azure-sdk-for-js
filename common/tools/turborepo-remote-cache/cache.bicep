@description('The name of the storage account to create.')
param storageAccountName string = 'azsdkjsturbocache'

@description('The name of the blob container to create.')
param containerName string = 'turbocache'

@description('The Azure region where the resources will be deployed.')
param location string = resourceGroup().location

@description('The SKU of the storage account.')
param storageSku string = 'Standard_LRS'

@description('The access tier for the blob storage.')
param accessTier string = 'Hot'

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageSku
  }
  kind: 'StorageV2'
  properties: {
    accessTier: accessTier
    supportsHttpsTrafficOnly: true
  }
}

resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  name: '${storageAccount.name}/default/${containerName}'
  properties: {
    publicAccess: 'None'
  }
}

output storageAccountConnectionString string = 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${listKeys(storageAccount.id, "2022-09-01").keys[0].value};EndpointSuffix=${environment().suffixes.storage}'
output containerName string = containerName
