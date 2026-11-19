targetScope = 'resourceGroup'

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' existing = {
  name: 'sample-managedhsm-name'
}

resource key 'Microsoft.KeyVault/managedHSMs/keys@2026-02-01' = {
  name: 'sample-key-name'
  parent: managedHSM
  properties: {
    kty: 'RSA'
  }
}
