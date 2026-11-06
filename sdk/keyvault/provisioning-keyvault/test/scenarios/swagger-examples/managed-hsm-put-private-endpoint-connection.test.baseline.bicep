targetScope = 'resourceGroup'

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' existing = {
  name: 'sample-mhsm'
}

resource privateEndpointConnection 'Microsoft.KeyVault/managedHSMs/privateEndpointConnections@2026-02-01' = {
  name: 'sample-pec'
  parent: managedHSM
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved by cdk test.'
    }
  }
}
