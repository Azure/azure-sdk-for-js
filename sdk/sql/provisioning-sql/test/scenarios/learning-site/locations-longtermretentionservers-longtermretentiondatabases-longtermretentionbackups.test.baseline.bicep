targetScope = 'subscription'

resource longTermRetentionBackup 'Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups@2025-01-01' existing = {
  name: 'eastus/longtermretentionser/longtermretentiondat/locationslongtermret'
}
