targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasessche'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasessche'
  parent: server
  location: 'eastus'
}

resource schema 'Microsoft.Sql/servers/databases/schemas@2025-01-01' existing = {
  name: 'serversdatabasessche'
  parent: database
}

resource table 'Microsoft.Sql/servers/databases/schemas/tables@2025-01-01' existing = {
  name: 'serversdatabasessche'
  parent: schema
}

resource column 'Microsoft.Sql/servers/databases/schemas/tables/columns@2025-01-01' existing = {
  name: 'serversdatabasessche'
  parent: table
}

resource sensitivityLabel 'Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels@2025-01-01' = {
  name: 'current'
  parent: column
}
