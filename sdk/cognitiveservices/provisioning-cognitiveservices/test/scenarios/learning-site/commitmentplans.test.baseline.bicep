targetScope = 'resourceGroup'

resource commitmentPlan 'Microsoft.CognitiveServices/commitmentPlans@2026-07-01' = {
  name: 'commitmentplans'
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
