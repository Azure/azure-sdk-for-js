targetScope = 'resourceGroup'

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' = {
  name: 'kvpublic'
  location: 'eastus'
  properties: {
    tenantId: '11111111-1111-1111-1111-111111111111'
    sku: {
      family: 'A'
      name: 'standard'
    }
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
    enableSoftDelete: true
    enableRbacAuthorization: false
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

resource privateEndpointConnection 'Microsoft.KeyVault/vaults/privateEndpointConnections@2026-02-01' = {
  name: 'sample-pec'
  parent: vault
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved by public entrypoints test.'
    }
  }
}

resource secret 'Microsoft.KeyVault/vaults/secrets@2026-02-01' = {
  name: 'samplesecret'
  parent: vault
  properties: {
    value: 'secret-value'
    contentType: 'text/plain'
  }
}

resource key 'Microsoft.KeyVault/vaults/keys@2026-02-01' = {
  name: 'samplekey'
  parent: vault
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

resource version 'Microsoft.KeyVault/vaults/keys/versions@2026-02-01' existing = {
  name: 'v1'
  parent: key
}

output name string = vault.name

output resourceId string = vault.id

output secretName string = secret.name

output keyName string = key.name

output keyVersion object = version.properties
