targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' = {
  name: 'accounts-projects'
  parent: account
  identity: {
    type: 'SystemAssigned'
  }
  location: 'eastus'
  properties: {
    displayName: 'Cognitive Services project'
    description: 'Project coverage'
  }
}
