targetScope = 'resourceGroup'

resource cluster 'Microsoft.EventHub/clusters@2026-01-01' = {
  name: 'publiccluster'
  location: 'eastus'
  properties: {
    supportsScaling: true
    zoneRedundant: false
  }
  sku: {
    name: 'Dedicated'
    capacity: 1
  }
  tags: {
    coverage: 'public-entrypoints'
  }
}
