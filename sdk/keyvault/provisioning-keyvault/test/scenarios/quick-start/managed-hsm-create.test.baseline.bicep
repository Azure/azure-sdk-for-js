targetScope = 'resourceGroup'

@description('String specifying the name of the managed HSM.')
param managedHSMName string

@description('String specifying the Azure location where the managed HSM should be created.')
param location string = 'eastus'

@description('Specifies the number of days that managed Key Vault will be kept recoverable if deleted.')
@minValue(7)
@maxValue(90)
param softRetentionInDays int = 7

resource managedHSM 'Microsoft.KeyVault/managedHSMs@2026-02-01' = {
  name: managedHSMName
  location: location
  properties: {
    enableSoftDelete: true
    softDeleteRetentionInDays: softRetentionInDays
    enablePurgeProtection: false
    tenantId: '11111111-1111-1111-1111-111111111111'
    initialAdminObjectIds: [
      '22222222-2222-2222-2222-222222222222'
    ]
    publicNetworkAccess: 'Enabled'
    networkAcls: {
      bypass: 'None'
      defaultAction: 'Allow'
    }
  }
  sku: {
    family: 'B'
    name: 'Standard_B1'
  }
}
