targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickconsumergrpns'
  location: 'eastus'
  properties: {}
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
  tags: {
    tag1: 'value1'
    tag2: 'value2'
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'quick-consumer-eventhub'
  parent: namespace
  properties: {}
}

resource consumergroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2026-01-01' = {
  name: 'quick-consumer-group'
  parent: eventhub
  properties: {
    userMetadata: 'User Metadata goes here'
  }
}
