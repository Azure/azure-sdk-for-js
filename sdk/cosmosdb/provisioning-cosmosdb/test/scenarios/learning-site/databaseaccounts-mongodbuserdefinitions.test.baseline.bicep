targetScope = 'resourceGroup'

param resourceName string = 'acctest0001'

param location string = 'westus'

@description('The password for the MongoDB user')
@secure()
param mongodbUserPassword string

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: format('{0}-acct', resourceName)
  kind: 'MongoDB'
  location: location
  properties: {
    capabilities: [
      {
        name: 'EnableMongoRoleBasedAccessControl'
      }
      {
        name: 'EnableMongo'
      }
    ]
    consistencyPolicy: {
      defaultConsistencyLevel: 'Strong'
      maxIntervalInSeconds: 5
      maxStalenessPrefix: 100
    }
    databaseAccountOfferType: 'Standard'
    disableKeyBasedMetadataWriteAccess: false
    disableLocalAuth: false
    enableAnalyticalStorage: false
    enableAutomaticFailover: false
    enableBurstCapacity: false
    enableFreeTier: false
    enableMultipleWriteLocations: false
    enablePartitionMerge: false
    ipRules: []
    isVirtualNetworkFilterEnabled: false
    locations: [
      {
        failoverPriority: 0
        isZoneRedundant: false
        locationName: location
      }
    ]
    minimalTlsVersion: 'Tls12'
    networkAclBypass: 'None'
    networkAclBypassResourceIds: []
    publicNetworkAccess: 'Enabled'
    virtualNetworkRules: []
  }
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' = {
  name: format('{0}-mongodb', resourceName)
  parent: databaseAccount
  properties: {
    options: {}
    resource: {
      id: format('{0}-mongodb', resourceName)
    }
  }
}

resource mongodbUserDefinition 'Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions@2026-03-15' = {
  name: format('{0}.myUserName', mongodbDatabase.name)
  parent: databaseAccount
  properties: {
    databaseName: mongodbDatabase.name
    mechanisms: 'SCRAM-SHA-256'
    password: mongodbUserPassword
    userName: 'myUserName'
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = mongodbDatabase.id

output resource2Id string = mongodbUserDefinition.id
