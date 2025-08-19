param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string


var azureDigitalTwins = baseName
var contributorRole = 'b24988ac-6180-42a0-ab88-20f7382dd24c'
var digitalTwinsDataOwnerRole = 'bcd981a7-7f74-457b-83e1-cceb9e632ffe'
var digitalTwinsDataReaderRole = 'd57506d4-4c8d-48b1-8587-93c323f6a5a3'

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

// Digital Twins Data Owner role assignment to the same principal
resource dataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, 'dataOwnerRoleAssignment')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', digitalTwinsDataOwnerRole)
    principalId: testApplicationOid
  }
}

// Digital Twins Data Reader role assignment to the same principal
resource dataReaderRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, 'dataReaderRoleAssignment')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', digitalTwinsDataReaderRole)
    principalId: testApplicationOid
  }
}

// Outputs
output AZURE_DIGITALTWINS_URL string = 'https://${digitalTwinsInstance.properties.hostName}'
