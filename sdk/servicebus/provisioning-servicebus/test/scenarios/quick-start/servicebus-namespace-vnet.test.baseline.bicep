targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-servicebus'
  location: 'eastus'
  properties: {}
  sku: {
    name: 'Premium'
    tier: 'Premium'
  }
}
