targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest06'
  location: 'eastus'
  sku: {
    name: 'Premium'
  }
}

resource replication 'Microsoft.ContainerRegistry/registries/replications@2025-11-01' = {
  name: 'westus'
  parent: registry
  location: 'westus'
  properties: {
    regionEndpointEnabled: true
    zoneRedundancy: 'Disabled'
  }
  tags: {
    displayName: 'Container Registry replication'
  }
}
