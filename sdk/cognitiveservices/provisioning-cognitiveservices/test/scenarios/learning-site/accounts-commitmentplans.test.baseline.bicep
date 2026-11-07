targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource commitmentPlan 'Microsoft.CognitiveServices/accounts/commitmentPlans@2026-07-01' = {
  name: 'accounts-commitmentplans'
  parent: account
  kind: 'AIServices'
  location: 'eastus'
  properties: {
    autoRenew: true
    hostingModel: 'ConnectedContainer'
  }
  sku: {
    name: 'S0'
  }
}
