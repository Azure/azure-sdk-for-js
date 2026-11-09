targetScope = 'resourceGroup'

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' existing = {
  name: 'sample-vault'
}

resource privateEndpointConnection 'Microsoft.KeyVault/vaults/privateEndpointConnections@2026-02-01' = {
  name: 'sample-pec'
  parent: vault
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved by cdk test.'
    }
  }
}
