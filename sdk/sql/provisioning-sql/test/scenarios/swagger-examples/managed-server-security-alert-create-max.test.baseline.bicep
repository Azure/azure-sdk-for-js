targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'managedserversecurit'
  location: 'eastus'
}
