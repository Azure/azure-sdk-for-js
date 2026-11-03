targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-cert'
}

resource customCertificate 'Microsoft.SignalRService/webPubSub/customCertificates@2025-12-01-preview' = {
  name: 'learn-cert'
  parent: webPubSub
  properties: {
    keyVaultBaseUri: 'https://learn-vault.vault.azure.net/'
    keyVaultSecretName: 'learn-cert'
    keyVaultSecretVersion: '00000000000000000000000000000000'
  }
}
