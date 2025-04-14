param baseName string = resourceGroup().name
param location string = resourceGroup().location
param supportsSafeSecretStandard bool = false
param testApplicationOid string

var eventGridTopicName = '${baseName}-eg'
var cloudEventTopicName = '${baseName}-ce'
var customEventTopicName = '${baseName}-cus'
var serviceBusNamespaceName = '${baseName}-ns'
var egNamespaceName = '${baseName}-egns'
var serviceBusQueueName = '${baseName}-queue'
var dataSenderRoleDefinitionId = 'd5a91429-5739-47e2-a06b-3470a27159e7'
var dataContributorRoleDefinitionId = '1d8c3fe3-8864-474b-8749-01e3783e8157'

// Create Event Grid Topic with EventGridSchema
resource eventGridTopic 'Microsoft.EventGrid/topics@2025-02-15' = {
  name: eventGridTopicName
  location: location
  properties: {
    inputSchema: 'EventGridSchema'
    publicNetworkAccess: 'Enabled'
  }
}

// Create Event Grid Topic with CloudEventSchema
resource cloudEventTopic 'Microsoft.EventGrid/topics@2025-02-15' = {
  name: cloudEventTopicName
  location: location
  properties: {
    inputSchema: 'CloudEventSchemaV1_0'
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: supportsSafeSecretStandard
  }
}

// Create Event Grid Topic with CustomEventSchema
resource customEventTopic 'Microsoft.EventGrid/topics@2025-02-15' = {
  name: customEventTopicName
  location: location
  properties: {
    inputSchema: 'CustomEventSchema'
    inputSchemaMapping: {
      properties: {
        id: {}
        topic: {}
        eventTime: {}
        eventType: {
          sourceField: 'typ'
        }
        subject: {
          sourceField: 'sub'
        }
        dataVersion: {
          sourceField: 'ver'
        }
      }
      inputSchemaMappingType: 'Json'
    }
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: supportsSafeSecretStandard
  }
}

// Create Service Bus Namespace with a Queue
resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces@2024-01-01' = {
  name: serviceBusNamespaceName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    zoneRedundant: false
    disableLocalAuth: supportsSafeSecretStandard
  }
}

resource serviceBusQueue 'Microsoft.ServiceBus/namespaces/queues@2024-01-01' = {
  name: serviceBusQueueName
  parent: serviceBusNamespace
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', serviceBusNamespace.name)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', '090c5cfd-751d-490a-894a-3ce6f1109419')
    principalId: testApplicationOid
  }
}

// Assign Data Sender Role
resource dataSenderRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(eventGridTopic.id, eventGridTopicName, 'DataSender')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', dataSenderRoleDefinitionId)
    principalId: testApplicationOid
  }
}

// Assign Data Contributor Role
resource dataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(eventGridTopic.id, eventGridTopicName, 'DataContributor')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', dataContributorRoleDefinitionId)
    principalId: testApplicationOid
  }
}

// Create Event Grid Namespace
resource egNamespace 'Microsoft.EventGrid/namespaces@2025-02-15' = {
  name: egNamespaceName
  location: location
  sku: {
    name: 'Standard'
    capacity: 1
  }
}

// Create Event Grid Namespace Topic
resource egNamespaceTopic 'Microsoft.EventGrid/namespaces/topics@2025-02-15' = {
  name: 'testtopic1'
  parent: egNamespace
  properties: {
    publisherType: 'Custom'
    inputSchema: 'CloudEventSchemaV1_0'
    eventRetentionInDays: 1
  }
}

// Create Event Grid Namespace Topic Subscription
resource egNamespaceTopicSubscription 'Microsoft.EventGrid/namespaces/topics/eventSubscriptions@2025-02-15' = {
  name: 'testsubscription1'
  parent: egNamespaceTopic
  properties: {
    deliveryConfiguration: {
      deliveryMode: 'Queue'
      queue: {
        receiveLockDurationInSeconds: 60
        maxDeliveryCount: 10
        eventTimeToLive: 'P1D'
      }
    }
    eventDeliverySchema: 'CloudEventSchemaV1_0'
    filtersConfiguration: {
      includedEventTypes: []
    }
  }
}

// Outputs
output EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT string = eventGridTopic.properties.endpoint
output EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT string = cloudEventTopic.properties.endpoint
output EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT string = customEventTopic.properties.endpoint
output SERVICE_BUS_FQDN string = replace(
  replace(serviceBusNamespace.properties.serviceBusEndpoint, ':443/', ''),
  'https://',
  ''
)
output SERVICE_BUS_QUEUE_NAME string = serviceBusQueueName
output EVENT_GRID_NAMESPACES_ENDPOINT string = egNamespace.properties.topicsConfiguration.hostname
