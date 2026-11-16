targetScope = 'resourceGroup'

param resourceName string = 'acctest0001'

param location string = 'westeurope'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: resourceName
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    capabilities: [
      {
        name: 'EnableTable'
      }
    ]
    consistencyPolicy: {
      defaultConsistencyLevel: 'Strong'
      maxIntervalInSeconds: 5
      maxStalenessPrefix: 100
    }
    databaseAccountOfferType: 'Standard'
    defaultIdentity: 'FirstPartyIdentity'
    disableKeyBasedMetadataWriteAccess: false
    disableLocalAuth: false
    enableAnalyticalStorage: false
    enableAutomaticFailover: false
    enableFreeTier: false
    enableMultipleWriteLocations: false
    ipRules: []
    isVirtualNetworkFilterEnabled: false
    locations: [
      {
        failoverPriority: 0
        isZoneRedundant: false
        locationName: 'West Europe'
      }
    ]
    networkAclBypass: 'None'
    networkAclBypassResourceIds: []
    publicNetworkAccess: 'Enabled'
    virtualNetworkRules: []
  }
}

resource table 'Microsoft.DocumentDB/databaseAccounts/tables@2026-03-15' = {
  name: resourceName
  parent: databaseAccount
  properties: {
    options: {}
    resource: {
      id: resourceName
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = table.id
