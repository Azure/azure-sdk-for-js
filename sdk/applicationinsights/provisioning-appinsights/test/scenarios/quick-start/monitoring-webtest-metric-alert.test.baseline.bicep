targetScope = 'resourceGroup'

resource webtest 'Microsoft.Insights/webtests@2022-06-15' = {
  name: 'webtest01'
  kind: 'ping'
  location: 'eastus'
  properties: {
    SyntheticMonitorId: 'webtest01'
    Name: 'webtest01'
    Enabled: true
    Frequency: 300
    Timeout: 30
    Kind: 'ping'
    RetryEnabled: true
    Locations: [
      {
        Id: 'us-fl-mia-edge'
      }
    ]
  }
}
