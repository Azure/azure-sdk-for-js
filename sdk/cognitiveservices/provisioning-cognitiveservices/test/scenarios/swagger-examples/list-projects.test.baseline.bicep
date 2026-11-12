targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' existing = {
  name: 'project'
  parent: account
}
