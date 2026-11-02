targetScope = 'resourceGroup'

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' = {
  name: 'mhsmpublic'
  location: 'eastus'
  properties: {
    tenantId: '11111111-1111-1111-1111-111111111111'
    initialAdminObjectIds: [
      '22222222-2222-2222-2222-222222222222'
    ]
    enableSoftDelete: true
    enablePurgeProtection: false
    softDeleteRetentionInDays: 90
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    family: 'B'
    name: 'Standard_B1'
  }
}

resource privateEndpointConnection 'Microsoft.KeyVault/managedHSMs/privateEndpointConnections@2026-02-01' = {
  name: 'sample-pec'
  parent: managedHSM
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved by public entrypoints test.'
    }
  }
}

resource key 'Microsoft.KeyVault/managedHSMs/keys@2026-02-01' = {
  name: 'samplekey'
  parent: managedHSM
  properties: {
    kty: 'RSA'
    keyOps: [
      'encrypt'
      'decrypt'
    ]
    keySize: 2048
  }
  tags: {
    scenario: 'public-entrypoints'
  }
}

resource version 'Microsoft.KeyVault/managedHSMs/keys/versions@2026-02-01' existing = {
  name: '0123456789abcdef0123456789abcdef'
  parent: key
}

output name string = managedHSM.name

output resourceId string = managedHSM.id

output managedHsmKeyName string = key.name

output managedHsmKeyVersion object = version.properties
