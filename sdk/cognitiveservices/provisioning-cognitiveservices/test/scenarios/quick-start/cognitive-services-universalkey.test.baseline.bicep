targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' = {
  name: 'aiServicesTest'
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'AIServices'
  location: 'eastus'
  properties: {
    publicNetworkAccess: 'Disabled'
    networkAcls: {
      defaultAction: 'Deny'
    }
    disableLocalAuth: true
  }
  sku: {
    name: 'S0'
  }
}
