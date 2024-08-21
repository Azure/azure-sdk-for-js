@minLength(4)
param baseName string = resourceGroup().name
param testApplicationOid string = 'b3653439-8136-4cd5-aac3-2a9460871ca6'
param location string = resourceGroup().location
param partitionsCount int = 4
param retentionTimeInDays int = 1

var eventHubName = 'eventhub'
var consumerGroupName = '$Default'
var baseNameAvro = '${baseName}-avro'
var baseNameJson = '${baseName}-json'
var baseNameCustom = '${baseName}-custom'
var schemaRegistryGroup = 'azsdk_js_test_group'
var eventHubsDataOwnerRoleId = 'f526a384-b230-433a-b45c-95f59c4a2dec'

resource eventHubNamespaceAvro 'Microsoft.EventHub/namespaces@2024-05-01-preview' = {
  name: baseNameAvro
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 5
  }
  properties: {
    zoneRedundant: false
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
    kafkaEnabled: true
  }
}

resource eventHubNamespaceJson 'Microsoft.EventHub/namespaces@2024-05-01-preview' = {
  name: baseNameJson
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 5
  }
  properties: {
    zoneRedundant: false
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
    kafkaEnabled: true
  }
}

resource eventHubNamespaceCustom 'Microsoft.EventHub/namespaces@2024-05-01-preview' = {
  name: baseNameCustom
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 5
  }
  properties: {
    zoneRedundant: false
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
    kafkaEnabled: true
  }
}

resource authorizationRuleAvro 'Microsoft.EventHub/namespaces/authorizationRules@2024-05-01-preview' = {
  name: 'RootManageSharedAccessKey'
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
  parent: eventHubNamespaceAvro
}

resource authorizationRuleJson 'Microsoft.EventHub/namespaces/authorizationRules@2024-05-01-preview' = {
  name: 'RootManageSharedAccessKey'
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
  parent: eventHubNamespaceJson
}

resource authorizationRuleCustom 'Microsoft.EventHub/namespaces/authorizationRules@2024-05-01-preview' = {
  name: 'RootManageSharedAccessKey'
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
  parent: eventHubNamespaceCustom
}

resource eventHubsDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(testApplicationOid, eventHubsDataOwnerRoleId, resourceGroup().id)
  dependsOn: [
    eventHubNamespaceAvro
    eventHubNamespaceJson
    eventHubNamespaceCustom
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', eventHubsDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource eventHubAvro 'Microsoft.EventHub/namespaces/eventhubs@2024-05-01-preview' = {
  name: eventHubName
  properties: {
    messageRetentionInDays: retentionTimeInDays
    partitionCount: partitionsCount
  }
  parent: eventHubNamespaceAvro
}

resource eventHubJson 'Microsoft.EventHub/namespaces/eventhubs@2024-05-01-preview' = {
  name: eventHubName
  properties: {
    messageRetentionInDays: retentionTimeInDays
    partitionCount: partitionsCount
  }
  parent: eventHubNamespaceJson
}

resource eventHubCustom 'Microsoft.EventHub/namespaces/eventhubs@2024-05-01-preview' = {
  name: eventHubName
  properties: {
    messageRetentionInDays: retentionTimeInDays
    partitionCount: partitionsCount
  }
  parent: eventHubNamespaceCustom
}

resource consumerGroupAvro 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2024-05-01-preview' = {
  name: consumerGroupName
  properties: {}
  parent: eventHubAvro
}

resource consumerGroupJson 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2024-05-01-preview' = {
  name: consumerGroupName
  properties: {}
  parent: eventHubJson
}

resource consumerGroupCustom 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2024-05-01-preview' = {
  name: consumerGroupName
  properties: {}
  parent: eventHubCustom
}

resource schemaGroupAvro 'Microsoft.EventHub/namespaces/schemagroups@2024-05-01-preview' = {
  name: schemaRegistryGroup
  properties: {
    schemaType: 'avro'
  }
  parent: eventHubNamespaceAvro
}

resource schemaGroupJson 'Microsoft.EventHub/namespaces/schemagroups@2024-05-01-preview' = {
  name: schemaRegistryGroup
  properties: {
    schemaType: 'json'
  }
  parent: eventHubNamespaceJson
}

resource schemaGroupCustom 'Microsoft.EventHub/namespaces/schemagroups@2024-05-01-preview' = {
  name: schemaRegistryGroup
  properties: {
    schemaType: 'custom'
  }
  parent: eventHubNamespaceCustom
}

output SCHEMAREGISTRY_AVRO_FULLY_QUALIFIED_NAMESPACE string = eventHubNamespaceAvro.properties.serviceBusEndpoint
output SCHEMAREGISTRY_JSON_FULLY_QUALIFIED_NAMESPACE string = eventHubNamespaceJson.properties.serviceBusEndpoint
output SCHEMAREGISTRY_CUSTOM_FULLY_QUALIFIED_NAMESPACE string = eventHubNamespaceCustom.properties.serviceBusEndpoint
output EVENTHUB_AVRO_HOST_NAME string = replace(replace(eventHubNamespaceAvro.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output EVENTHUB_JSON_HOST_NAME string = replace(replace(eventHubNamespaceJson.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output EVENTHUB_CUSTOM_HOST_NAME string = replace(replace(eventHubNamespaceCustom.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output EVENTHUB_NAME string = eventHubName
output SCHEMA_REGISTRY_GROUP string = schemaRegistryGroup
