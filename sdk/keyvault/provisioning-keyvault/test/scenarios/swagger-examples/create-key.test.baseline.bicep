targetScope = 'resourceGroup'

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' existing = {
  name: 'sample-vault-name'
}

resource key 'Microsoft.KeyVault/vaults/keys@2026-02-01' = {
  name: 'sample-key-name'
  parent: vault
  properties: {
    kty: 'RSA'
  }
}
