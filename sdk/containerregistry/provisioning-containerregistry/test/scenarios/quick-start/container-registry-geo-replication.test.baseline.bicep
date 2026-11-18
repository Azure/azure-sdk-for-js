targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest10'
  location: 'eastus'
  properties: {
    adminUserEnabled: false
  }
  sku: {
    name: 'Premium'
  }
  tags: {
    displayName: 'Container Registry'
    'container.registry': 'crtest10'
  }
}

resource replication 'Microsoft.ContainerRegistry/registries/replications@2025-11-01' = {
  name: 'westus'
  parent: registry
  location: 'westus'
  properties: {}
}
