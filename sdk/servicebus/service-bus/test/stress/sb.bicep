@description('The client OID to grant access to test resources.')
param testApplicationOid string

@description('The base resource name.')
param baseName string

var authorizationRuleName_var = '${baseName}/RootManageSharedAccessKey'
var serviceBusDataOwnerRoleId = '/subscriptions/${subscription().subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/090c5cfd-751d-490a-894a-3ce6f1109419'

resource servicebus 'Microsoft.ServiceBus/namespaces@2018-01-01-preview' = {
  name: baseName
  location: resourceGroup().location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    zoneRedundant: false
  }
}

resource authorizationRuleName 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2015-08-01' = {
  name: authorizationRuleName_var
  location: resourceGroup().location
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
  dependsOn: [
    servicebus
  ]
}

resource dataOwnerRoleId 'Microsoft.Authorization/roleAssignments@2018-01-01-preview' = {
  name: guid('dataOwnerRoleId${baseName}')
  properties: {
    roleDefinitionId: serviceBusDataOwnerRoleId
    principalId: testApplicationOid
  }
  dependsOn: [
    servicebus
  ]
}

resource testQueue 'Microsoft.ServiceBus/namespaces/queues@2017-04-01' = {
  parent: servicebus
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

resource testQueueWithSessions 'Microsoft.ServiceBus/namespaces/queues@2017-04-01' = {
  parent: servicebus
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

output endpoint string = servicebus.properties.serviceBusEndpoint
