targetScope = 'subscription'

resource location 'Microsoft.DocumentDB/locations@2026-03-15' existing = {
  name: 'location-test'
}

resource restorableDatabaseAccount 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts@2026-03-15' existing = {
  name: 'restorabledatabaseac-test'
  parent: location
}

output resource0Id string = location.id

output resource1Id string = restorableDatabaseAccount.id
