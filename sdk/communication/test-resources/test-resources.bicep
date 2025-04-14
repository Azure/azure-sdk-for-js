param baseName string = resourceGroup().name
param endpointPrefix string = 'communication'
param testApplicationOid string

var apiVersion = '2023-06-01-preview'
var uniqueSubDomainName = '${baseName}-${endpointPrefix}'
var contributorRoleId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'

// Create Communication Service
resource communicationService 'Microsoft.Communication/communicationServices@2023-06-01-preview' = {
  name: uniqueSubDomainName
  location: 'global'
  properties: {
    dataLocation: 'UnitedStates'
  }
}

// Assign Contributor Role to Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, deployment().name, baseName, contributorRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRoleId)
    principalId: testApplicationOid
  }
}

// Outputs
output COMMUNICATION_CONNECTION_STRING string = listKeys(communicationService.id, apiVersion).primaryConnectionString
output COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING string = listKeys(communicationService.id, apiVersion).primaryConnectionString
output COMMUNICATION_SERVICE_ENDPOINT string = communicationService.properties.hostName
output COMMUNICATION_SERVICE_ACCESS_KEY string = listKeys(communicationService.id, apiVersion).primaryKey
output RESOURCE_GROUP_NAME string = resourceGroup().name
