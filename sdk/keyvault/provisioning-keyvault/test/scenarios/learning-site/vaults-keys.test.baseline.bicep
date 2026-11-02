targetScope = 'resourceGroup'

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' = {
  name: 'acctest0001'
  location: 'eastus'
  properties: {
    tenantId: '11111111-1111-1111-1111-111111111111'
    sku: {
      family: 'A'
      name: 'standard'
    }
    accessPolicies: []
    enableSoftDelete: true
    enablePurgeProtection: true
  }
}

resource accessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2026-02-01' = {
  name: 'add'
  parent: vault
  properties: {
    accessPolicies: [
      {
        tenantId: '11111111-1111-1111-1111-111111111111'
        objectId: '22222222-2222-2222-2222-222222222222'
        permissions: {
          certificates: [
            'get'
          ]
          keys: [
            'encrypt'
          ]
          secrets: [
            'get'
          ]
        }
      }
    ]
  }
}

resource key 'Microsoft.KeyVault/vaults/keys@2026-02-01' = {
  name: 'acctest0001'
  parent: vault
  properties: {
    keyOps: [
      'encrypt'
      'decrypt'
      'sign'
      'verify'
      'wrapKey'
      'unwrapKey'
    ]
    keySize: 2048
    kty: 'RSA'
  }
}
