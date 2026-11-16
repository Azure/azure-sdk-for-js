targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest05'
  location: 'eastus'
  sku: {
    name: 'Premium'
  }
}

resource privateLinkResource 'Microsoft.ContainerRegistry/registries/privateLinkResources@2025-11-01' existing = {
  name: 'registry'
  parent: registry
}
