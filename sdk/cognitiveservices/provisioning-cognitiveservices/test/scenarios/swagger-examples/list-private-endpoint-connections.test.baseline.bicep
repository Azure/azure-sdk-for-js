targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource connection 'Microsoft.CognitiveServices/accounts/connections@2026-07-01' existing = {
  name: 'connection'
  parent: account
}
