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
    createMode: 'default'
    enableRbacAuthorization: false
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    publicNetworkAccess: 'Enabled'
    softDeleteRetentionInDays: 7
  }
}
