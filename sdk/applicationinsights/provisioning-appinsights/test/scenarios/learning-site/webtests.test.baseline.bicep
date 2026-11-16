targetScope = 'resourceGroup'

resource component 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi01'
  kind: 'web'
  location: 'eastus'
  properties: {
    Application_Type: 'web'
  }
}

resource webtest 'Microsoft.Insights/webtests@2022-06-15' = {
  name: 'webtest01'
  kind: 'ping'
  location: 'eastus'
  properties: {
    SyntheticMonitorId: 'webtest01'
    Name: 'webtest01'
    Enabled: true
    Frequency: 900
    Timeout: 120
    Kind: 'ping'
    RetryEnabled: true
    Locations: [
      {
        Id: 'us-fl-mia-edge'
      }
    ]
  }
}
