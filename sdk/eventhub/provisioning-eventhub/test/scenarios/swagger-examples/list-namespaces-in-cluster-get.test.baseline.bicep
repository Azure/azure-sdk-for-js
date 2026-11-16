targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'rrama-int7-ns1'
  location: 'southcentralus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}
