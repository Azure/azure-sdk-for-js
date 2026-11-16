targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' existing = {
  name: 'cognitive-project'
  parent: account
}

resource connection 'Microsoft.CognitiveServices/accounts/projects/connections@2026-07-01' = {
  name: 'accounts-projects-connections'
  parent: project
  properties: {
    authType: 'None'
    category: 'CustomKeys'
    target: 'https://example.invalid'
  }
}
