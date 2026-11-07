targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest09'
  location: 'eastus'
  properties: {
    adminUserEnabled: false
  }
  sku: {
    name: 'Basic'
  }
  tags: {
    displayName: 'Container Registry'
    'container.registry': 'crtest09'
  }
}
