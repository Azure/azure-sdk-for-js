var communicationServiceName = 'live-testing-unitedstates'

var contributorRoleId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'
param testApplicationOid string

// Reference the existing Communication Service
resource existingCommunicationService 'Microsoft.Communication/communicationServices@2023-03-31' existing = {
  name: communicationServiceName
}

// Assign Contributor Role
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(existingCommunicationService.id, testApplicationOid, contributorRoleId)
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', contributorRoleId)
    principalId: testApplicationOid
    principalType: 'ServicePrincipal'
  }
  scope: existingCommunicationService
}