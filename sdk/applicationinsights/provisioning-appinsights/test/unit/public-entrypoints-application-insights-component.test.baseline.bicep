targetScope = 'resourceGroup'

resource component 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi01'
  kind: 'web'
  location: 'eastus'
  properties: {
    Application_Type: 'web'
  }
}
