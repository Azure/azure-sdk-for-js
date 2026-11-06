targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'publicentrypointsman'
  location: 'eastus'
}

resource distributedAvailabilityGroup 'Microsoft.Sql/managedInstances/distributedAvailabilityGroups@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource dtc 'Microsoft.Sql/managedInstances/dtc@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}

resource endpointCertificate 'Microsoft.Sql/managedInstances/endpointCertificates@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
  location: 'eastus'
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/managedInstances/databases/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource backupShortTermRetentionPolicy 'Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: database
}

resource ledgerDigestUpload 'Microsoft.Sql/managedInstances/databases/ledgerDigestUploads@2025-01-01' = {
  name: 'current'
  parent: database
}

resource schema 'Microsoft.Sql/managedInstances/databases/schemas@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: database
}

resource table 'Microsoft.Sql/managedInstances/databases/schemas/tables@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: schema
}

resource column 'Microsoft.Sql/managedInstances/databases/schemas/tables/columns@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: table
}

resource sensitivityLabel 'Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels@2025-01-01' = {
  name: 'current'
  parent: column
}

resource securityAlertPolicy 'Microsoft.Sql/managedInstances/databases/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource transparentDataEncryption 'Microsoft.Sql/managedInstances/databases/transparentDataEncryption@2025-01-01' = {
  name: 'current'
  parent: database
}

resource vulnerabilityAssessment 'Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: database
}

resource scan 'Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/scans@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: vulnerabilityAssessment
}

resource backupLongTermRetentionPolicy 'Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: database
}

resource query 'Microsoft.Sql/managedInstances/databases/queries@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: database
}

resource restoreDetail 'Microsoft.Sql/managedInstances/databases/restoreDetails@2025-01-01' existing = {
  name: 'Default'
  parent: database
}

resource administrator 'Microsoft.Sql/managedInstances/administrators@2025-01-01' = {
  name: 'ActiveDirectory'
  parent: managedInstance
}

resource advancedThreatProtectionSetting2 'Microsoft.Sql/managedInstances/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
}

resource azureADOnlyAuthentication 'Microsoft.Sql/managedInstances/azureADOnlyAuthentications@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
}

resource dnsAlias 'Microsoft.Sql/managedInstances/dnsAliases@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource encryptionProtector 'Microsoft.Sql/managedInstances/encryptionProtector@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}

resource key 'Microsoft.Sql/managedInstances/keys@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource operation 'Microsoft.Sql/managedInstances/operations@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource privateEndpointConnection 'Microsoft.Sql/managedInstances/privateEndpointConnections@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource privateLinkResource 'Microsoft.Sql/managedInstances/privateLinkResources@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource securityAlertPolicy2 'Microsoft.Sql/managedInstances/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
}

resource vulnerabilityAssessment2 'Microsoft.Sql/managedInstances/vulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: managedInstance
}

resource recoverableDatabase 'Microsoft.Sql/managedInstances/recoverableDatabases@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource restorableDroppedDatabase 'Microsoft.Sql/managedInstances/restorableDroppedDatabases@2025-01-01' existing = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource backupShortTermRetentionPolicy2 'Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: restorableDroppedDatabase
}

resource serverConfigurationOption 'Microsoft.Sql/managedInstances/serverConfigurationOptions@2025-01-01' = {
  name: 'allowPolybaseExport'
  parent: managedInstance
}

resource serverTrustCertificate 'Microsoft.Sql/managedInstances/serverTrustCertificates@2025-01-01' = {
  name: 'publicentrypointsman'
  parent: managedInstance
}

resource sqlAgent 'Microsoft.Sql/managedInstances/sqlAgent@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}

resource startStopSchedule 'Microsoft.Sql/managedInstances/startStopSchedules@2025-01-01' = {
  name: 'default'
  parent: managedInstance
}

resource baseline 'Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines@2025-01-01' = {
  name: 'managedinstance/database/default/rule/default'
}
