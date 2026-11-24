targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource connection 'Microsoft.CognitiveServices/accounts/connections@2026-07-01' = {
  name: 'accounts-connections'
  parent: account
  properties: {
    authType: 'None'
    category: 'CustomKeys'
    target: 'https://example.invalid'
  }
}
