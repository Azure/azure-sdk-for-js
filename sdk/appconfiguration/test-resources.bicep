@minLength(5)
param baseName string = resourceGroup().name
param testApplicationOid string
param location string = resourceGroup().location
param sku string = 'Standard'
param azConfigPrefix string = 'azconfig-resource-js'

var roleDefinitionId = '5ae67dd6-50cb-40e7-96ff-dc2bfa4b606b'
var uniqueAzConfigName = '${baseName}-${azConfigPrefix}'

// Create Azure App Configuration Store
resource azConfigStore 'Microsoft.AppConfiguration/configurationStores@2023-09-01-preview' = {
  name: uniqueAzConfigName
  location: location
  sku: {
    name: sku
  }
}

// Assign Role to Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
    principalId: testApplicationOid
  }
}

// Outputs
output AZ_CONFIG_ENDPOINT string = azConfigStore.properties.endpoint
