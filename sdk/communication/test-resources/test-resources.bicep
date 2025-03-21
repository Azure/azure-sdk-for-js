param location string = resourceGroup().location
param baseName string = resourceGroup().name
param endpointPrefix string = 'communication'
param testApplicationOid string
param supportsSafeSecretStandard bool = false

var apiVersion = '2023-06-01-preview'
var uniqueSubDomainName = '${baseName}-${endpointPrefix}'
var contributorRoleId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'

resource communicationService 'Microsoft.Communication/communicationServices@2023-06-01-preview' = {
  name: uniqueSubDomainName
  location: 'global'
  properties: {
    dataLocation: 'UnitedStates'
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, deployment().name, baseName, contributorRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRoleId)
    principalId: testApplicationOid
  }
}

resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces@2024-01-01' = {
  name: baseName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    zoneRedundant: false
    disableLocalAuth: supportsSafeSecretStandard
  }
}

resource roleAssignmentSB 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', serviceBusNamespace.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', '090c5cfd-751d-490a-894a-3ce6f1109419')
    principalId: testApplicationOid
  }
}

output COMMUNICATION_CONNECTION_STRING string = listKeys(communicationService.id, apiVersion).primaryConnectionString
output COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING string = listKeys(communicationService.id, apiVersion).primaryConnectionString
output COMMUNICATION_SERVICE_ENDPOINT string = startsWith(communicationService.properties.hostName, 'https://') ? communicationService.properties.hostName : 'https://${communicationService.properties.hostName}'
output COMMUNICATION_SERVICE_ACCESS_KEY string = listKeys(communicationService.id, apiVersion).primaryKey
output RESOURCE_GROUP_NAME string = resourceGroup().name
output SERVICEBUS_FQDN string = replace(replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
