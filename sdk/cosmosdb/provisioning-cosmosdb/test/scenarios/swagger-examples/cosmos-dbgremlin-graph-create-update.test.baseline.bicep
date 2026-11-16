targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' existing = {
  name: 'gremlindatabase-test'
  parent: databaseAccount
}

resource graph 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs@2026-03-15' = {
  name: 'graphName'
  parent: gremlinDatabase
  location: 'West US'
  properties: {
    resource: {
      id: 'graphName'
      indexingPolicy: {
        indexingMode: 'consistent'
        automatic: true
        includedPaths: [
          {
            path: '/*'
            indexes: [
              {
                kind: 'Range'
                dataType: 'String'
                precision: -1
              }
              {
                kind: 'Range'
                dataType: 'Number'
                precision: -1
              }
            ]
          }
        ]
        excludedPaths: []
      }
      partitionKey: {
        paths: [
          '/AccountNumber'
        ]
        kind: 'Hash'
      }
      defaultTtl: 100
      uniqueKeyPolicy: {
        uniqueKeys: [
          {
            paths: [
              '/testPath'
            ]
          }
        ]
      }
      conflictResolutionPolicy: {
        mode: 'LastWriterWins'
        conflictResolutionPath: '/path'
      }
    }
    options: {}
  }
  tags: {}
}

output resource2Id string = graph.id
