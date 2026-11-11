targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = format('gremlin-{0}', uniqueString(resourceGroup().id))

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The primary replica region for the Cosmos DB account.')
param primaryRegion string

@description('The secondary replica region for the Cosmos DB account.')
param secondaryRegion string

@description('The default consistency level of the Cosmos DB account.')
@allowed([
  'Eventual'
  'ConsistentPrefix'
  'Session'
  'BoundedStaleness'
  'Strong'
])
param defaultConsistencyLevel string = 'Session'

@description('Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 2147483647. Multi Region: 100000 to 2147483647.')
@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@description('Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.')
@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

@description('Enable system managed failover for regions')
param systemManagedFailover bool = true

@description('The name for the Gremlin database')
param databaseName string

@description('The name for the Gremlin graph')
param graphName string

@description('Maximum autoscale throughput for the graph')
@minValue(1000)
@maxValue(1000000)
param autoscaleMaxThroughput int = 1000

var consistencyPolicy = {
  Eventual: {
    defaultConsistencyLevel: 'Eventual'
  }
  ConsistentPrefix: {
    defaultConsistencyLevel: 'ConsistentPrefix'
  }
  Session: {
    defaultConsistencyLevel: 'Session'
  }
  BoundedStaleness: {
    defaultConsistencyLevel: 'BoundedStaleness'
    maxStalenessPrefix: maxStalenessPrefix
    maxIntervalInSeconds: maxIntervalInSeconds
  }
  Strong: {
    defaultConsistencyLevel: 'Strong'
  }
}

var locations = [
  {
    locationName: primaryRegion
    failoverPriority: 0
    isZoneRedundant: false
  }
  {
    locationName: secondaryRegion
    failoverPriority: 1
    isZoneRedundant: false
  }
]

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: toLower(accountName)
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    capabilities: [
      {
        name: 'EnableGremlin'
      }
    ]
    consistencyPolicy: defaultConsistencyLevel == 'Eventual' ? consistencyPolicy.Eventual : defaultConsistencyLevel == 'ConsistentPrefix' ? consistencyPolicy.ConsistentPrefix : defaultConsistencyLevel == 'Session' ? consistencyPolicy.Session : defaultConsistencyLevel == 'BoundedStaleness' ? consistencyPolicy.BoundedStaleness : consistencyPolicy.Strong
    locations: locations
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: systemManagedFailover
  }
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' = {
  name: databaseName
  parent: databaseAccount
  properties: {
    resource: {
      id: databaseName
    }
  }
}

resource graph 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs@2026-03-15' = {
  name: graphName
  parent: gremlinDatabase
  properties: {
    resource: {
      id: graphName
      indexingPolicy: {
        indexingMode: 'consistent'
        includedPaths: [
          {
            path: '/*'
          }
        ]
        excludedPaths: [
          {
            path: '/myPathToNotIndex/*'
          }
        ]
      }
      partitionKey: {
        paths: [
          '/myPartitionKey'
        ]
        kind: 'Hash'
      }
    }
    options: {
      autoscaleSettings: {
        maxThroughput: autoscaleMaxThroughput
      }
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = gremlinDatabase.id

output resource2Id string = graph.id
