targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-domain'
}

resource customDomain 'Microsoft.SignalRService/webPubSub/customDomains@2025-12-01-preview' = {
  name: 'learn-domain'
  parent: webPubSub
  properties: {
    customCertificate: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.SignalRService/webPubSub/wps-learn-domain/customCertificates/learn-cert'
    }
    domainName: 'learn.example.com'
  }
}
