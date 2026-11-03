targetScope = 'resourceGroup'

resource webtest 'Microsoft.Insights/webtests@2022-06-15' = {
  name: 'my-webtest-my-component'
  kind: 'ping'
  location: 'South Central US'
  properties: {
    Description: 'Ping web test alert for mytestwebapp'
    Enabled: true
    Frequency: 900
    Kind: 'ping'
    Locations: [
      {
        Id: 'us-fl-mia-edge'
      }
    ]
    Name: 'my-webtest-my-component'
    RetryEnabled: true
    SyntheticMonitorId: 'my-webtest-my-component'
    Timeout: 120
  }
}
