targetScope = 'resourceGroup'

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' = {
  name: 'hsm1'
  location: 'westus'
  properties: {
    enablePurgeProtection: false
    enableSoftDelete: true
    initialAdminObjectIds: [
      '00000000-0000-0000-0000-000000000000'
    ]
    softDeleteRetentionInDays: 90
    tenantId: '00000000-0000-0000-0000-000000000000'
  }
  sku: {
    family: 'B'
    name: 'Standard_B1'
  }
  tags: {
    Dept: 'hsm'
    Environment: 'dogfood'
  }
}
