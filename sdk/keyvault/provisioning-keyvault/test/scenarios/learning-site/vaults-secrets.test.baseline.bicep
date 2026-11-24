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
  }
}

resource secret 'Microsoft.KeyVault/vaults/secrets@2026-02-01' = {
  name: 'acctest0001'
  parent: vault
  properties: {
    value: 'szechuan'
  }
}
