targetScope = 'resourceGroup'

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' existing = {
  name: 'sample-vault'
}

resource secret 'Microsoft.KeyVault/vaults/secrets@2026-02-01' = {
  name: 'secret-name'
  parent: vault
  properties: {
    value: 'secret-value'
  }
}
