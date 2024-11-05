param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string


var azureDigitalTwins = baseName
var contributorRole = 'b24988ac-6180-42a0-ab88-20f7382dd24c'

// Microsoft.DigitalTwins/digitalTwinsInstances resource
resource digitalTwinsInstance 'Microsoft.DigitalTwins/digitalTwinsInstances@2023-01-31' = {
  name: azureDigitalTwins
  location: location
}

// Microsoft.Authorization/roleAssignments resource
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, 'roleAssignment')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRole)
    principalId: testApplicationOid
  }
}

// Outputs
output AZURE_DIGITALTWINS_URL string = 'https://${digitalTwinsInstance.properties.hostName}'
