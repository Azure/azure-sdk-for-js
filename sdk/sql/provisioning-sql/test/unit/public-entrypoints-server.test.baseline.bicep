targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'publicentrypointsser'
  location: 'eastus'
}

resource connectionPolicy 'Microsoft.Sql/servers/connectionPolicies@2025-01-01' = {
  name: 'default'
  parent: server
}

resource jobAgent 'Microsoft.Sql/servers/jobAgents@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
  location: 'eastus'
}

resource credential 'Microsoft.Sql/servers/jobAgents/credentials@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: jobAgent
}

resource job 'Microsoft.Sql/servers/jobAgents/jobs@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: jobAgent
}

resource execution 'Microsoft.Sql/servers/jobAgents/jobs/executions@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: job
}

resource step 'Microsoft.Sql/servers/jobAgents/jobs/executions/steps@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: execution
}

resource target 'Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: step
}

resource step2 'Microsoft.Sql/servers/jobAgents/jobs/steps@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: job
}

resource version 'Microsoft.Sql/servers/jobAgents/jobs/versions@2025-01-01' existing = {
  name: 1
  parent: job
}

resource step3 'Microsoft.Sql/servers/jobAgents/jobs/versions/steps@2025-01-01' existing = {
  name: 'step1'
  parent: version
}

resource privateEndpoint 'Microsoft.Sql/servers/jobAgents/privateEndpoints@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: jobAgent
}

resource targetGroup 'Microsoft.Sql/servers/jobAgents/targetGroups@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: jobAgent
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
  location: 'eastus'
}

resource dataMaskingPolicy 'Microsoft.Sql/servers/databases/dataMaskingPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource rule 'Microsoft.Sql/servers/databases/dataMaskingPolicies/rules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: dataMaskingPolicy
}

resource dataWarehouseUserActivity 'Microsoft.Sql/servers/databases/dataWarehouseUserActivities@2025-01-01' existing = {
  name: 'current'
  parent: database
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource advisor 'Microsoft.Sql/servers/databases/advisors@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: database
}

resource recommendedAction 'Microsoft.Sql/servers/databases/advisors/recommendedActions@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: advisor
}

resource automaticTuning 'Microsoft.Sql/servers/databases/automaticTuning@2025-01-01' existing = {
  name: 'current'
  parent: database
}

resource auditingSetting 'Microsoft.Sql/servers/databases/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: database
}

resource sqlVulnerabilityAssessment 'Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments@2025-01-01' existing = {
  name: 'default'
  parent: database
}

resource baseline 'Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines@2025-01-01' = {
  name: 'default'
  parent: sqlVulnerabilityAssessment
}

resource rule2 'Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: baseline
}

resource scan 'Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: sqlVulnerabilityAssessment
}

resource scanResult 'Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans/scanResults@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: scan
}

resource extendedAuditingSetting 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2025-01-01' = {
  name: 'default'
  parent: database
}

resource extension 'Microsoft.Sql/servers/databases/extensions@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: database
}

resource geoBackupPolicy 'Microsoft.Sql/servers/databases/geoBackupPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource backupLongTermRetentionPolicy 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: database
}

resource replicationLink 'Microsoft.Sql/servers/databases/replicationLinks@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: database
}

resource restorePoint 'Microsoft.Sql/servers/databases/restorePoints@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: database
}

resource backupShortTermRetentionPolicy 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: database
}

resource ledgerDigestUpload 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2025-01-01' = {
  name: 'current'
  parent: database
}

resource schema 'Microsoft.Sql/servers/databases/schemas@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: database
}

resource table 'Microsoft.Sql/servers/databases/schemas/tables@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: schema
}

resource column 'Microsoft.Sql/servers/databases/schemas/tables/columns@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: table
}

resource sensitivityLabel 'Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels@2025-01-01' = {
  name: 'current'
  parent: column
}

resource securityAlertPolicy 'Microsoft.Sql/servers/databases/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

resource transparentDataEncryption 'Microsoft.Sql/servers/databases/transparentDataEncryption@2025-01-01' = {
  name: 'current'
  parent: database
}

resource vulnerabilityAssessment 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: database
}

resource scan2 'Microsoft.Sql/servers/databases/vulnerabilityAssessments/scans@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: vulnerabilityAssessment
}

resource syncGroup 'Microsoft.Sql/servers/databases/syncGroups@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: database
}

resource syncMember 'Microsoft.Sql/servers/databases/syncGroups/syncMembers@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: syncGroup
}

resource workloadGroup 'Microsoft.Sql/servers/databases/workloadGroups@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: database
}

resource workloadClassifier 'Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: workloadGroup
}

resource devOpsAuditingSetting 'Microsoft.Sql/servers/devOpsAuditingSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource elasticPool 'Microsoft.Sql/servers/elasticPools@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
  location: 'eastus'
}

resource extendedAuditingSetting2 'Microsoft.Sql/servers/extendedAuditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

resource failoverGroup 'Microsoft.Sql/servers/failoverGroups@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource firewallRule 'Microsoft.Sql/servers/firewallRules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource ipv6FirewallRule 'Microsoft.Sql/servers/ipv6FirewallRules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Sql/servers/networkSecurityPerimeterConfigurations@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: server
}

resource outboundFirewallRule 'Microsoft.Sql/servers/outboundFirewallRules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource privateLinkResource 'Microsoft.Sql/servers/privateLinkResources@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: server
}

resource recoverableDatabase 'Microsoft.Sql/servers/recoverableDatabases@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: server
}

resource restorableDroppedDatabase 'Microsoft.Sql/servers/restorableDroppedDatabases@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: server
}

resource administrator 'Microsoft.Sql/servers/administrators@2025-01-01' = {
  name: 'ActiveDirectory'
  parent: server
}

resource advancedThreatProtectionSetting2 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource advisor2 'Microsoft.Sql/servers/advisors@2025-01-01' existing = {
  name: 'publicentrypointsser'
  parent: server
}

resource automaticTuning2 'Microsoft.Sql/servers/automaticTuning@2025-01-01' existing = {
  name: 'current'
  parent: server
}

resource azureADOnlyAuthentication 'Microsoft.Sql/servers/azureADOnlyAuthentications@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource auditingSetting2 'Microsoft.Sql/servers/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

resource dnsAlias 'Microsoft.Sql/servers/dnsAliases@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource encryptionProtector 'Microsoft.Sql/servers/encryptionProtector@2025-01-01' = {
  name: 'current'
  parent: server
}

resource key 'Microsoft.Sql/servers/keys@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource privateEndpointConnection 'Microsoft.Sql/servers/privateEndpointConnections@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource securityAlertPolicy2 'Microsoft.Sql/servers/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource sqlVulnerabilityAssessment2 'Microsoft.Sql/servers/sqlVulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: server
}

resource vulnerabilityAssessment2 'Microsoft.Sql/servers/vulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: server
}

resource syncAgent 'Microsoft.Sql/servers/syncAgents@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource virtualNetworkRule 'Microsoft.Sql/servers/virtualNetworkRules@2025-01-01' = {
  name: 'publicentrypointsser'
  parent: server
}

resource baseline2 'Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines@2025-01-01' = {
  name: 'server/database/default/rule/default'
}
