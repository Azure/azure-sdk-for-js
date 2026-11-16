targetScope = 'resourceGroup'

resource cluster 'Microsoft.EventHub/clusters@2026-01-01' = {
  name: 'quickclusterhub'
  location: 'eastus'
  sku: {
    name: 'Dedicated'
    capacity: 1
  }
}

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickclusterhubns'
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
  name: 'quick-cluster-hub'
  parent: namespace
  properties: {
    messageRetentionInDays: 7
    partitionCount: 1
  }
}
