@description('The base resource name for AI Services.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('The tenant ID to which the application and resources belong.')
param tenantId string = '72f988bf-86f1-41af-91ab-2d7cd011db47'

@description('The client OID to grant access to test resources.')
param testApplicationOid string = 'b3653439-8136-4cd5-aac3-2a9460871ca6'

param tagValues object = {}
param allowProjectManagement bool = true
param virtualNetworkType string = 'None'
param vnet object = {}
param ipRules array = []
param encryption_status string = ' '
param keyVaultName string = ''
param keyName string = ''
param keyVersion string = ''
param cmk_keyvault string = ''
param enableRbac bool = false
param identity object = {
  type: 'SystemAssigned'
}

// Variables
var aiServicesName = '${baseName}-ai'
var defaultProjectName = '${toLower(baseName)}-ai-defaultproject'

// AI Services Account
resource aiServices 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: aiServicesName
  location: location
  kind: 'AIServices'
  sku: {
    name: 'S0'
  }
  identity: identity
  tags: contains(tagValues, 'Microsoft.CognitiveServices/accounts') ? tagValues['Microsoft.CognitiveServices/accounts'] : {}
  properties: {
    customSubDomainName: toLower(aiServicesName)
    publicNetworkAccess: virtualNetworkType == 'Internal' ? 'Disabled' : 'Enabled'
    networkAcls: {
      defaultAction: virtualNetworkType == 'External' ? 'Deny' : 'Allow'
      virtualNetworkRules: virtualNetworkType == 'External' ? [
        {
          id: '${subscription().id}/resourceGroups/${vnet.resourceGroup}/providers/Microsoft.Network/virtualNetworks/${vnet.name}/subnets/${vnet.subnets.subnet.name}'
        }
      ] : []
      ipRules: empty(ipRules) || empty(ipRules[0].value) ? [] : ipRules
    }
    allowProjectManagement: allowProjectManagement
  }
}

// Default Project (child resource)
resource defaultProject 'Microsoft.CognitiveServices/accounts/projects@2025-04-01-preview' = {
  parent: aiServices
  name: defaultProjectName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  sku: {
    name: 'S0'
  }
  properties: {
    displayName: defaultProjectName
    description: 'Default project created with the resource'
  }
}

// Outputs
output AI_SERVICES_NAME string = aiServicesName
output AI_SERVICES_ENDPOINT string = aiServices.properties.endpoints['AI Foundry API']
output AI_SERVICES_KEY string = aiServices.listKeys().key1
output AI_SERVICES_ID string = aiServices.id
