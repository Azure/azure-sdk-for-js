// The base resource name.
param baseName string = resourceGroup().name
// The location of the resource. By default, this is the same as the resource group.
param location string = resourceGroup().location
// The client OID to grant access to test resources.
param testApplicationOid string
param customEndpointSuffix string = '.cognitiveservices.azure.com/translator/text/v3.0'
param supportsSafeSecretStandard bool = false

var cognitiveAccountName = baseName
var storageBlobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var storageAccountName = '${baseName}prim'


var encryption = {
  services: {
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

// Create Cognitive Services Account for Text Translation
resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S1'
  }
  kind: 'TextTranslation'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    customSubDomainName: cognitiveAccountName
    disableLocalAuth: supportsSafeSecretStandard
  }
}

// Assign Role to the Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, cognitiveServicesAccount.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', 'a97b65f3-24c7-4388-baec-2e87135dc908')
    principalId: testApplicationOid
  }
}

// Create Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    allowSharedKeyAccess: false
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
  }
}

// Role assignment to grant Storage Blob Data Contributor role to the Cognitive Services(Translator) Account Managed Identity
resource storageBlobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, cognitiveServicesAccount.id, storageBlobDataContributorRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleId)
    principalId: cognitiveServicesAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
  scope: storageAccount
}

resource storageDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, 'Storage Account Data Contributor')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

// Outputs
output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output COGNITIVE_ACCOUNT_NAME string = cognitiveServicesAccount.name
output TEXT_TRANSLATION_ENDPOINT string = cognitiveServicesAccount.properties.endpoint
output TEXT_TRANSLATION_CUSTOM_ENDPOINT string = 'https://${baseName}${customEndpointSuffix}'
output TRANSLATOR_REGION string = location
output TRANSLATOR_RESOURCE_ID string = cognitiveServicesAccount.id
output DOCUMENT_TRANSLATION_ENDPOINT string = cognitiveServicesAccount.properties.endpoints.DocumentTranslation
output DOCUMENT_TRANSLATION_STORAGE_NAME string = storageAccount.name
output STORAGE_BLOB_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
