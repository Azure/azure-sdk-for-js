targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'learnperimeterns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource networkSecurityPerimeterConfiguration 'Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations@2026-01-01' existing = {
  name: 'learn-perimeter'
  parent: namespace
}
