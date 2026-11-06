targetScope = 'resourceGroup'

resource cluster 'Microsoft.EventHub/clusters@2026-01-01' = {
  name: 'testCluster'
  location: 'eastus'
  sku: {
    name: 'Dedicated'
    capacity: 1
  }
}
