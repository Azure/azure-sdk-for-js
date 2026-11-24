targetScope = 'subscription'

resource longTermRetentionManagedInstanceBackup 'Microsoft.Sql/locations/longTermRetentionManagedInstances/longTermRetentionDatabases/longTermRetentionManagedInstanceBackups@2025-01-01' existing = {
  name: 'eastus/longtermretentionman/longtermretentiondat/locationslongtermret'
}
