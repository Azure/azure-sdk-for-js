param location string = resourceGroup().location
param kvName string = 'kv-${resourceGroup().name}'
param objectId string = 'testApplicationOid'
param tenantId string = subscription().tenantId

resource keyVault 'Microsoft.KeyVault/vaults@2024-04-01-preview' = {
  name: kvName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: tenantId
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: objectId
        permissions: {
          secrets: [
            'get'
          ]
        }
      }
    ]
  }
}

output keyVaultUri string = keyVault.properties.vaultUri
