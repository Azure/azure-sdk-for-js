targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource customCertificate 'Microsoft.SignalRService/webPubSub/customCertificates@2025-12-01-preview' = {
  name: 'myCert'
  parent: webPubSub
  properties: {
    keyVaultBaseUri: 'https://myvault.keyvault.azure.net/'
    keyVaultSecretName: 'mycert'
    keyVaultSecretVersion: 'bb6a44b2743f47f68dad0d6cc9756432'
  }
}
