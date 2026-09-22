// The base resource name.
param baseName string = resourceGroup().name
// The location of the resource. By default, this is the same as the resource group.
param location string = resourceGroup().location
// The client OID to grant access to test resources.
param testApplicationOid string

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

// Create Cognitive Services Account for Text Translation (using AIServices/Foundry)
resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'AIServices'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    customSubDomainName: cognitiveAccountName
    publicNetworkAccess: 'Enabled'
  }
}

// Deploy GPT-4o-mini model for LLM translation
resource gpt4oMiniDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  name: 'gpt-4o-mini'
  parent: cognitiveServicesAccount
  sku: {
    name: 'Standard'
    capacity: 10
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o-mini'
      version: '2024-07-18'
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
}

// Assign Role to the Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2018-09-01-preview' = {
  name: guid(resourceGroup().id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', 'a97b65f3-24c7-4388-baec-2e87135dc908')
    principalId: testApplicationOid
  }
}

// Create Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2019-04-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    allowSharedKeyAccess: false
    encryption: encryption
    accessTier: 'Hot'
  }
}

// Role assignment to grant Storage Blob Data Contributor role to the AIServices Account Managed Identity for document translation
resource storageBlobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2018-09-01-preview' = {
  name: guid(concat('dataContributorRoleId', resourceGroup().id))
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributorRoleId)
    principalId: cognitiveServicesAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
  scope: storageAccount
  dependsOn: [
    cognitiveServicesAccount
    storageAccount
  ]
}

// Role assignment for AIServices account to access foundry
resource foundryUserRoleAssignment 'Microsoft.Authorization/roleAssignments@2018-09-01-preview' = {
  name: guid(concat('foundryUserRoleId', resourceGroup().id))
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', 'a97b65f3-24c7-4388-baec-2e87135dc908')
    principalId: cognitiveServicesAccount.identity.principalId
    principalType: 'ServicePrincipal'
  }
  dependsOn: [
    cognitiveServicesAccount
  ]
}

// Outputs
output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output COGNITIVE_ACCOUNT_NAME string = cognitiveServicesAccount.name
output TEXT_TRANSLATION_ENDPOINT string = 'https://api.cognitive.microsofttranslator.com'
output TRANSLATOR_REGION string = location
output TRANSLATOR_RESOURCE_ID string = cognitiveServicesAccount.id
output DOCUMENT_TRANSLATION_ENDPOINT string = 'https://${cognitiveAccountName}.cognitiveservices.azure.com/'
output DOCUMENT_TRANSLATION_STORAGE_NAME string = storageAccount.name
output STORAGE_BLOB_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
output TEXT_TRANSLATION_API_KEY string = cognitiveServicesAccount.listKeys().key1
