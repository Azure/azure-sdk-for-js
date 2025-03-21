param baseName string = resourceGroup().name
param testApplicationOid string
param supportsSafeSecretStandard bool = false

var location = resourceGroup().location
var baseNamePremium = '${baseName}premium'

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

resource serviceBusNamespacePremium 'Microsoft.ServiceBus/namespaces@2024-01-01' = {
  name: baseNamePremium
  location: location
  sku: {
    name: 'Premium'
    tier: 'Premium'
  }
  properties: {
    zoneRedundant: false
    disableLocalAuth: supportsSafeSecretStandard
  }
}

resource authorizationRulePremium 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2024-01-01' = {
  parent: serviceBusNamespacePremium
  name: 'RootManageSharedAccessKey'
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2024-01-01' = {
  parent: serviceBusNamespace
  name: 'RootManageSharedAccessKey'
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource sasAuthorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2024-01-01' = {
  parent: serviceBusNamespace
  name: 'SasAccessKey'
  properties: {
    rights: [
      'Listen'
      'Send'
    ]
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', serviceBusNamespace.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', '090c5cfd-751d-490a-894a-3ce6f1109419')
    principalId: testApplicationOid
  }
}

resource testQueue 'Microsoft.ServiceBus/namespaces/queues@2024-01-01' = {
  parent: serviceBusNamespace
  name: 'testQueue'
  properties: {
    lockDuration: 'PT5M'
    maxSizeInMegabytes: 1024
    requiresDuplicateDetection: false
    requiresSession: false
    defaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S'
    deadLetteringOnMessageExpiration: false
    duplicateDetectionHistoryTimeWindow: 'PT10M'
    maxDeliveryCount: 10
    autoDeleteOnIdle: 'P10675199DT2H48M5.4775807S'
    enablePartitioning: false
    enableExpress: false
  }
}

resource testQueueWithSessions 'Microsoft.ServiceBus/namespaces/queues@2024-01-01' = {
  parent: serviceBusNamespace
  name: 'testQueueWithSessions'
  properties: {
    lockDuration: 'PT5M'
    maxSizeInMegabytes: 1024
    requiresDuplicateDetection: false
    requiresSession: true
    defaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S'
    deadLetteringOnMessageExpiration: false
    duplicateDetectionHistoryTimeWindow: 'PT10M'
    maxDeliveryCount: 10
    autoDeleteOnIdle: 'P10675199DT2H48M5.4775807S'
    enablePartitioning: false
    enableExpress: false
  }
}

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output SERVICEBUS_ENDPOINT string = replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', '')
output SERVICEBUS_FQDN string = replace(replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output SERVICEBUS_FQDN_PREMIUM string = replace(replace(serviceBusNamespacePremium.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output AUTHORIZATION_RULE_NAME string = authorizationRule.name
output AUTHORIZATION_RULE_NAME_PREMIUM string = authorizationRulePremium.name
output NAMESPACE_NAME string = serviceBusNamespace.name
output NAMESPACE_NAME_PREMIUM string = serviceBusNamespacePremium.name
output QUEUE_NAME string = testQueue.name
output QUEUE_NAME_WITH_SESSIONS string = testQueueWithSessions.name
