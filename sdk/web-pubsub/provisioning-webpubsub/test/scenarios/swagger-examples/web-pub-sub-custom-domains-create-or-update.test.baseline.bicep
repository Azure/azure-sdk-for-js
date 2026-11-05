targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource customDomain 'Microsoft.SignalRService/webPubSub/customDomains@2025-12-01-preview' = {
  name: 'myDomain'
  parent: webPubSub
  properties: {
    domainName: 'example.com'
    customCertificate: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.SignalRService/WebPubSub/myWebPubSubService/customCertificates/myCert'
    }
  }
}
