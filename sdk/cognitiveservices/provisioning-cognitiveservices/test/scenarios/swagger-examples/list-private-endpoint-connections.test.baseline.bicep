targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource privateEndpointConnection 'Microsoft.CognitiveServices/accounts/privateEndpointConnections@2026-07-01' existing = {
  name: 'privateEndpointConnection'
  parent: account
}
