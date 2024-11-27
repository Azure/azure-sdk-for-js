param baseName string
param baseTime string = utcNow('u')
param testApplicationOid string

var storageEndpointSuffix = environment().suffixes.storage
var storageApiVersion = '2023-05-01'
var blobDataContributorRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '0a9a7e1f-b9d0-4cc4-a60d-0319b160aaa3')
var location = resourceGroup().location
var accountName = baseName
var accountNameTidy = toLower(trim(accountName))
var accountSasProperties = {
  signedServices: 'bfqt'
  signedPermission: 'rwdlacup'
  signedResourceTypes: 'sco'
  keyToSign: 'key2'
  signedExpiry: dateTimeAdd(baseTime, 'PT2H')
}

// Role Assignment for Blob Data Contributor
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('tableDataContributorRoleId', resourceGroup().id)
  properties: {
    roleDefinitionId: blobDataContributorRoleId
    principalId: testApplicationOid
  }
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
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
}

// Outputs
output RESOURCE_GROUP_NAME string = resourceGroup().name
output ACCOUNT_NAME string = accountName
output ACCOUNT_KEY string = listKeys(storageAccount.id, storageApiVersion).keys[0].value
output SAS_TOKEN string = '?${listAccountSas(accountNameTidy, storageApiVersion, accountSasProperties).accountSasToken}'
output SAS_CONNECTION_STRING string = 'TableEndpoint=https://${accountName}.table.${storageEndpointSuffix}/;SharedAccessSignature=${listAccountSas(accountNameTidy, storageApiVersion, accountSasProperties).accountSasToken}'
output ACCOUNT_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${listKeys(storageAccount.id, storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'
output TABLES_URL string = 'https://${accountName}.table.${storageEndpointSuffix}'
