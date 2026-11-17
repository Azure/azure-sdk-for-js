targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource privateEndpointConnection 'Microsoft.CognitiveServices/accounts/privateEndpointConnections@2026-07-01' = {
  name: 'accounts-privateendpointconnections'
  parent: account
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved for package coverage'
    }
  }
}
