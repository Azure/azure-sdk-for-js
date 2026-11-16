targetScope = 'resourceGroup'

@description('Specifies the name of the key vault.')
param keyVaultName string

@description('Specifies the object ID for the access policy.')
param objectId string

resource vault 'Microsoft.KeyVault/vaults@2026-02-01' existing = {
  name: keyVaultName
}

resource accessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2026-02-01' = {
  name: 'add'
  parent: vault
  properties: {
    accessPolicies: [
      {
        tenantId: '11111111-1111-1111-1111-111111111111'
        objectId: objectId
        permissions: {
          secrets: [
            'list'
          ]
        }
      }
    ]
  }
}
