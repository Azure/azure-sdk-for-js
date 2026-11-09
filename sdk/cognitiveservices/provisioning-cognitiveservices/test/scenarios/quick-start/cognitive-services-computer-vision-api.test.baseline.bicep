targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' = {
  name: 'computerVisionTest'
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'ComputerVision'
  location: 'eastus'
  properties: {
    publicNetworkAccess: 'Disabled'
    networkAcls: {
      defaultAction: 'Deny'
    }
    disableLocalAuth: true
  }
  sku: {
    name: 'F0'
  }
}
