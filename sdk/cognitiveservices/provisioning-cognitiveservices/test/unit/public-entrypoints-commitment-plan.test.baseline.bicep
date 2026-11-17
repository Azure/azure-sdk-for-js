targetScope = 'resourceGroup'

resource commitmentPlan 'Microsoft.CognitiveServices/commitmentPlans@2026-07-01' = {
  name: 'commitment-plan'
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

resource accountAssociation 'Microsoft.CognitiveServices/commitmentPlans/accountAssociations@2026-07-01' = {
  name: 'commitment-plan'
  parent: commitmentPlan
  properties: {
    accountId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.CognitiveServices/accounts/cognitive-account'
  }
}
