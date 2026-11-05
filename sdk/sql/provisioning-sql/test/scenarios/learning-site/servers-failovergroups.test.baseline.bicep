targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversfailovergroup'
  location: 'eastus'
}

resource failoverGroup 'Microsoft.Sql/servers/failoverGroups@2025-01-01' = {
  name: 'serversfailovergroup'
  parent: server
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversfailovergroup'
  parent: server
  location: 'eastus'
}
