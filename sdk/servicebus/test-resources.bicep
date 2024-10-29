param baseName string = resourceGroup().name
param testApplicationOid string

var apiVersion = '2022-10-01-preview'
var location = resourceGroup().location
var authorizationRuleName = '${baseName}/RootManageSharedAccessKey'
var sasAuthorizationRuleName = '${baseName}/SasAccessKey'
var baseNamePremium = '${baseName}premium'
var authorizationRuleNamePremium = '${baseName}premium/RootManageSharedAccessKey'

resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces@2022-10-01-preview' = {
  name: baseName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    zoneRedundant: false
  }
}

resource serviceBusNamespacePremium 'Microsoft.ServiceBus/namespaces@2022-10-01-preview' = {
  name: baseNamePremium
  location: location
  sku: {
    name: 'Premium'
    tier: 'Premium'
  }
  properties: {
    zoneRedundant: false
  }
}

resource authorizationRulePremium 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2022-10-01-preview' = {
  name: authorizationRuleNamePremium
  dependsOn: [
    serviceBusNamespacePremium
  ]
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2022-10-01-preview' = {
  name: authorizationRuleName
  dependsOn: [
    serviceBusNamespace
  ]
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource sasAuthorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2022-10-01-preview' = {
  name: sasAuthorizationRuleName
  dependsOn: [
    serviceBusNamespace
  ]
  properties: {
    rights: [
      'Listen'
      'Send'
    ]
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', baseName)
  dependsOn: [
    serviceBusNamespace
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', '090c5cfd-751d-490a-894a-3ce6f1109419')
    principalId: testApplicationOid
  }
}

resource testQueue 'Microsoft.ServiceBus/namespaces/queues@2022-10-01-preview' = {
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
  parent: serviceBusNamespace
}

resource testQueueWithSessions 'Microsoft.ServiceBus/namespaces/queues@2017-04-01' = {
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
  parent: serviceBusNamespace
}

output SERVICEBUS_CONNECTION_STRING string = listKeys(authorizationRule.id, apiVersion).primaryConnectionString
output SERVICEBUS_CONNECTION_STRING_PREMIUM string = listKeys(authorizationRulePremium.id, apiVersion).primaryConnectionString
output SERVICEBUS_ENDPOINT string = replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', '')
output SERVICEBUS_FQDN string = replace(replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output SERVICEBUS_FQDN_PREMIUM string = replace(replace(serviceBusNamespacePremium.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output QUEUE_NAME string = testQueue.name
output QUEUE_NAME_WITH_SESSIONS string = testQueueWithSessions.name
output SERVICEBUS_SAS_POLICY string = 'SasAccessKey'
output SERVICEBUS_SAS_KEY string = listKeys(sasAuthorizationRule.id, apiVersion).primaryKey
