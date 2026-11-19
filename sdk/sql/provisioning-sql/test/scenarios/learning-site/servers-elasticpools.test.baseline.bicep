targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serverselasticpoolss'
  location: 'eastus'
}

resource elasticPool 'Microsoft.Sql/servers/elasticPools@2025-01-01' = {
  name: 'serverselasticpoolse'
  parent: server
  location: 'eastus'
}
