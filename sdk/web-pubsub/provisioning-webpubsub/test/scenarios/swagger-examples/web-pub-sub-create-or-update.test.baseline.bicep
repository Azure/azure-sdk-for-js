targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' = {
  name: 'myWebPubSubService'
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'WebPubSub'
  location: 'eastus'
  properties: {
    tls: {
      clientCertEnabled: false
    }
    liveTraceConfiguration: {
      enabled: 'false'
      categories: [
        {
          name: 'ConnectivityLogs'
          enabled: 'true'
        }
      ]
    }
    networkACLs: {
      defaultAction: 'Deny'
      publicNetwork: {
        allow: [
          'ClientConnection'
        ]
      }
      privateEndpoints: [
        {
          name: 'mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e'
          allow: [
            'ServerConnection'
          ]
        }
      ]
    }
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: false
    disableAadAuth: false
    socketIO: {
      serviceMode: 'Serverless'
    }
  }
  sku: {
    name: 'Premium_P1'
    tier: 'Premium'
    capacity: 1
  }
  tags: {
    key1: 'value1'
  }
}
