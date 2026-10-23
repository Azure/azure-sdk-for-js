targetScope = 'resourceGroup'

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' = {
  name: 'kvhsm230630033342437496'
  location: 'eastus'
  properties: {
    tenantId: '11111111-1111-1111-1111-111111111111'
    initialAdminObjectIds: [
      '22222222-2222-2222-2222-222222222222'
    ]
    enableSoftDelete: true
    enablePurgeProtection: false
    softDeleteRetentionInDays: 90
    createMode: 'default'
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    family: 'B'
    name: 'Standard_B1'
  }
}
