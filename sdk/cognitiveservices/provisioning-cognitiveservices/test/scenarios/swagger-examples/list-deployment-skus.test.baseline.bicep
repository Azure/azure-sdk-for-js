targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource deploymentResource 'Microsoft.CognitiveServices/accounts/deployments@2026-07-01' existing = {
  name: 'deploymentName'
  parent: account
}
