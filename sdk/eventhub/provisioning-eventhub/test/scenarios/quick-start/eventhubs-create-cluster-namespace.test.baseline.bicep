targetScope = 'resourceGroup'

resource cluster 'Microsoft.EventHub/clusters@2026-01-01' = {
  name: 'quickclusterns'
  location: 'eastus'
  sku: {
    name: 'Dedicated'
    capacity: 1
  }
}

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickclusternamespace'
  location: 'eastus'
  properties: {
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
    clusterArmId: cluster.id
  }
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'quick-cluster-eventhub'
  parent: namespace
  properties: {}
}
