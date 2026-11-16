targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' existing = {
  name: 'cassandrakeyspace-test'
  parent: databaseAccount
}

resource table 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables@2026-03-15' = {
  name: 'tableName'
  parent: cassandraKeyspace
  location: 'West US'
  properties: {
    resource: {
      id: 'tableName'
      defaultTtl: 100
      schema: {
        columns: [
          {
            name: 'columnA'
            type: 'Ascii'
          }
        ]
        partitionKeys: [
          {
            name: 'columnA'
          }
        ]
        clusterKeys: [
          {
            name: 'columnA'
            orderBy: 'Asc'
          }
        ]
      }
    }
    options: {}
  }
  tags: {}
}

output resource2Id string = table.id
