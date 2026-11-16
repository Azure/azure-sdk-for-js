targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqlelasticpoolcreate'
  location: 'eastus'
}

resource elasticPool 'Microsoft.Sql/servers/elasticPools@2025-01-01' = {
  name: 'sqlelasticpoolcreate'
  parent: server
  location: 'eastus'
}

resource firewallRule 'Microsoft.Sql/servers/firewallRules@2025-01-01' = {
  name: 'sqlelasticpoolcreate'
  parent: server
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'sqlelasticpoolcreate'
  parent: server
  location: 'eastus'
}
