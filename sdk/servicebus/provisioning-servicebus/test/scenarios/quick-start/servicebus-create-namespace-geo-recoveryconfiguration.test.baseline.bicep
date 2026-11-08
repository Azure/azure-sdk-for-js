targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-secondary'
  location: 'westus'
  sku: {
    name: 'Premium'
    tier: 'Premium'
    capacity: 4
  }
  tags: {
    tag1: 'value1'
    tag2: 'value2'
  }
}

resource namespace2 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-primary'
  location: 'eastus'
  sku: {
    name: 'Premium'
    tier: 'Premium'
    capacity: 4
  }
  tags: {
    tag1: 'value1'
    tag2: 'value2'
  }
}
