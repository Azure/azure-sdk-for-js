targetScope = 'subscription'

resource deletedServer 'Microsoft.Sql/locations/deletedServers@2025-01-01' existing = {
  name: 'eastus/publicentrypointsdel'
}
