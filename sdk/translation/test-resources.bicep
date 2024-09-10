param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string
param customEndpointSuffix string = '.cognitiveservices.azure.com/translator/text/v3.0'
param dtEndpointSuffix string = '.cognitiveservices.azure.com'

var uniqueSubDomainName = baseName
var storageAccountName = '${baseName}prim'
var apiVersion = '2024-04-01-preview'

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
resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: uniqueSubDomainName
  location: location
  sku: {
    name: 'S1'
  }
  kind: 'TextTranslation'
  properties: {
    customSubDomainName: uniqueSubDomainName
  }
}

// Assign Role to the Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', 'a97b65f3-24c7-4388-baec-2e87135dc908')
    principalId: testApplicationOid
  }
}

// Create Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Cool'
    minimumTlsVersion: 'TLS1_2'
  }
}

// Outputs
output TEXT_TRANSLATION_API_KEY string = listKeys(cognitiveServicesAccount.id, apiVersion).key1
output TEXT_TRANSLATION_ENDPOINT string = cognitiveServicesAccount.properties.endpoint
output TEXT_TRANSLATION_CUSTOM_ENDPOINT string = 'https://${baseName}${customEndpointSuffix}'
output TEXT_TRANSLATION_REGION string = location
output DOCUMENT_TRANSLATION_ENDPOINT string = 'https://${baseName}${dtEndpointSuffix}'
output DOCUMENT_TRANSLATION_STORAGE_NAME string = storageAccount.name
