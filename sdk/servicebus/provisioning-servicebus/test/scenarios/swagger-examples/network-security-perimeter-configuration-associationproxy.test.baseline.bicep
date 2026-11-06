targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'sdk-Namespace-5828'
  location: 'eastus'
  sku: {
    name: 'Standard'
  }
}
