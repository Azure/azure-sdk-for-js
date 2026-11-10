targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource deploymentResource 'Microsoft.CognitiveServices/accounts/deployments@2026-07-01' = {
  name: 'accounts-deployments'
  parent: account
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: '2024-08-06'
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
  sku: {
    name: 'Standard'
    capacity: 1
  }
}
