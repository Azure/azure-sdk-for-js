targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource privateEndpointConnection 'Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections@2026-03-15' = {
  name: 'privateendpointconne-test'
  parent: databaseAccount
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved by johndoe@contoso.com'
    }
  }
}

output resource1Id string = privateEndpointConnection.id
