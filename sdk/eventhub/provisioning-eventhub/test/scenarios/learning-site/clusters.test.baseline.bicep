targetScope = 'resourceGroup'

resource cluster 'Microsoft.EventHub/clusters@2026-01-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  sku: {
    capacity: 1
    name: 'Dedicated'
  }
}
