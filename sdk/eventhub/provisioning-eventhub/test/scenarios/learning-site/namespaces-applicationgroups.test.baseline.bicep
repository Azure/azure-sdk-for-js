targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'learnappgroupns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource applicationGroup 'Microsoft.EventHub/namespaces/applicationGroups@2026-01-01' = {
  name: 'learn-app-group'
  parent: namespace
  properties: {
    clientAppGroupIdentifier: 'AADAppID=44444444-4444-4444-4444-444444444444'
    isEnabled: true
  }
}
