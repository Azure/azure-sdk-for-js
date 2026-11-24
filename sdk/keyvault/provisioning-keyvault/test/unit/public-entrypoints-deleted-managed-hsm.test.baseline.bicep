targetScope = 'subscription'

resource deletedManagedHSM 'Microsoft.KeyVault/locations/deletedManagedHSMs@2026-02-01' existing = {
  name: 'eastus/deletedmhsm'
}

output deletedManagedHsm object = deletedManagedHSM.properties
