targetScope = 'subscription'

resource deletedVault 'Microsoft.KeyVault/locations/deletedVaults@2026-02-01' existing = {
  name: 'eastus/deletedvault'
}

output deletedVault object = deletedVault.properties
