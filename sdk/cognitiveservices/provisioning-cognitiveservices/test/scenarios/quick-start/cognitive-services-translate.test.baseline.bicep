targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' = {
  name: 'textTranslationTest'
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'TextTranslation'
  location: 'eastus'
  properties: {
    publicNetworkAccess: 'Disabled'
    networkAcls: {
      defaultAction: 'Deny'
    }
    disableLocalAuth: true
  }
  sku: {
    name: 'S1'
  }
}
