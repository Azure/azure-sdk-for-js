param baseName string = resourceGroup().name
param endpointPrefix string = 'communication'
param testApplicationOid string

var uniqueSubDomainName = '${baseName}-${endpointPrefix}'
var emailServiceName = '${uniqueSubDomainName}-email-service'
var contributorRoleId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'

// Create Communication Service
resource communicationService 'Microsoft.Communication/communicationServices@2024-09-01-preview' = {
  name: uniqueSubDomainName
  location: 'global'
  properties: {
    dataLocation: 'UnitedStates'
    linkedDomains: [
      resourceId('Microsoft.Communication/EmailServices/Domains', emailService.name, 'AzureManagedDomain')
    ]
  }
  dependsOn: [
    emailService::AzureManagedDomain
  ]
}

// Assign Contributor Role to Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, deployment().name, baseName, contributorRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRoleId)
    principalId: testApplicationOid
  }
}

// Create Email Service with Domain
resource emailService 'Microsoft.Communication/emailServices@2023-04-01' = {
  name: emailServiceName
  location: 'global'
  properties: {
    dataLocation: 'UnitedStates'
  }
  resource AzureManagedDomain 'Domains' = {
    name: 'AzureManagedDomain'
    location: 'global'
    properties: {
      domainManagement: 'AzureManaged'
    }
  }
}

// Outputs
output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output COMMUNICATION_SERVICE_NAME string = communicationService.name
output COMMUNICATION_ENDPOINT string = 'https://${communicationService.properties.hostName}/'
output SENDER_ADDRESS string = format('DoNotReply@{0}', emailService::AzureManagedDomain.properties.mailFromSenderDomain)
output RECIPIENT_ADDRESS string = 'acseaastesting@gmail.com'
output SECOND_RECIPIENT_ADDRESS string = 'acseaastesting@gmail.com'
