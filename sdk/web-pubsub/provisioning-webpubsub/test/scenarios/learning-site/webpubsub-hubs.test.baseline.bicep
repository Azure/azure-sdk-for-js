targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' = {
  name: 'wps-learn-hub'
  location: 'westus'
  properties: {
    disableAadAuth: false
    disableLocalAuth: false
    publicNetworkAccess: 'Enabled'
    tls: {
      clientCertEnabled: false
    }
  }
  sku: {
    capacity: 1
    name: 'Standard_S1'
  }
}

resource hub 'Microsoft.SignalRService/webPubSub/hubs@2025-12-01-preview' = {
  name: 'learn-hub'
  parent: webPubSub
  properties: {
    anonymousConnectPolicy: 'deny'
    eventListeners: []
  }
}
