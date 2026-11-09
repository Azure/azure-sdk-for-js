// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-cosmosdb.
 * provisioning API: @azure/provisioning-cosmosdb/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AnalyticalStorageConfigurationInput,
  ApiPropertiesInput,
  AuthenticationMethodLdapPropertiesInput,
  AutoscaleSettingsInput,
  AutoscaleSettingsResourceInput,
  BackupScheduleInput,
  CapabilityInput,
  CapacityInput,
  CassandraErrorInput,
  CassandraKeyspaceGetPropertiesOptionsInput,
  CassandraKeyspaceGetPropertiesResourceInput,
  CassandraPartitionKeyInput,
  CassandraRoleAssignmentResourcePropertiesInput,
  CassandraRoleDefinitionResourcePropertiesInput,
  CassandraSchemaInput,
  CassandraTableGetPropertiesOptionsInput,
  CassandraTableGetPropertiesResourceInput,
  CertificateInput,
  ClientEncryptionIncludedPathInput,
  ClientEncryptionKeyGetPropertiesResourceInput,
  ClientEncryptionPolicyInput,
  ClusterKeyInput,
  ClusterResourcePropertiesInput,
  ColumnInput,
  CompositePathInput,
  ComputedPropertyInput,
  ConflictResolutionPolicyInput,
  ContainerPartitionKeyInput,
  CorsPolicyInput,
  CreateUpdateOptionsInput,
  DataCenterResourcePropertiesInput,
  DatabaseAccountGetPropertiesInput,
  DatabaseRestoreResourceInput,
  ExcludedPathInput,
  FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput,
  FleetspacePropertiesInput,
  FleetspacePropertiesThroughputPoolConfigurationInput,
  FullTextIndexPathInput,
  FullTextPathInput,
  FullTextPolicyInput,
  GremlinDatabaseGetPropertiesOptionsInput,
  GremlinDatabaseGetPropertiesResourceInput,
  GremlinDatabaseRestoreResourceInput,
  GremlinGraphGetPropertiesOptionsInput,
  GremlinGraphGetPropertiesResourceInput,
  GremlinRoleAssignmentResourcePropertiesInput,
  GremlinRoleDefinitionResourcePropertiesInput,
  IncludedPathInput,
  IndexesInput,
  IndexingPolicyInput,
  IpAddressOrRangeInput,
  KeyWrapMetadataInput,
  ManagedCassandraManagedServiceIdentityInput,
  MongoIndexKeysInput,
  MongoIndexOptionsInput,
  MongoRoleDefinitionResourceInput,
  MongoUserDefinitionResourceInput,
  PermissionInput,
  PrivateEndpointConnectionPropertiesInput,
  PrivateEndpointPropertyInput,
  PrivateLinkServiceConnectionStatePropertyInput,
  PrivilegeInput,
  PrivilegeResourceInput,
  ResourceRestoreParametersInput,
  RestoreParametersInput,
  RoleInput,
  SeedNodeInput,
  SpatialSpecInput,
  SqlContainerGetPropertiesOptionsInput,
  SqlContainerGetPropertiesResourceInput,
  SqlDatabaseGetPropertiesOptionsInput,
  SqlDatabaseGetPropertiesResourceInput,
  SqlRoleAssignmentResourceInput,
  SqlRoleDefinitionResourceInput,
  SqlStoredProcedureGetPropertiesResourceInput,
  SqlTriggerGetPropertiesResourceInput,
  SqlUserDefinedFunctionGetPropertiesResourceInput,
  TableGetPropertiesOptionsInput,
  TableGetPropertiesResourceInput,
  TableRoleAssignmentResourcePropertiesInput,
  TableRoleDefinitionResourcePropertiesInput,
  ThroughputPolicyResourceInput,
  ThroughputSettingsGetPropertiesResourceInput,
  UniqueKeyInput,
  UniqueKeyPolicyInput,
  VectorEmbeddingInput,
  VectorEmbeddingPolicyInput,
  VectorIndexInput,
  VirtualNetworkRuleInput,
} from "@azure/provisioning-cosmosdb/types";

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> AnalyticalStorageConfigurationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const analyticalStorageConfigurationDatabaseaccountsad579ac98553caab73a6FromBicep: AnalyticalStorageConfigurationInput =
  {
    schemaType: "FullFidelity",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> ApiPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const apiPropertiesDatabaseaccountsad579ac98505c65e0e43FromBicep: ApiPropertiesInput = {
  serverVersion: "3.2",
};

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters/dataCenters -> AuthenticationMethodLdapPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters/datacenters?pivots=deployment-language-bicep
export const authenticationMethodLdapPropertiesCassandraclustersDatacenters559b6ef1c64eda0de6e6FromBicep: AuthenticationMethodLdapPropertiesInput =
  {
    connectionTimeoutInMs: 0,
    searchBaseDistinguishedName: "string",
    searchFilterTemplate: "string",
    serverCertificates: [],
    serverHostname: "string",
    serverPort: 0,
    serviceUserDistinguishedName: "string",
    serviceUserPassword: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsCassandrakeyspacesTables1f701b457c54b2f02601FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsCassandrakeyspacesda1f452287041ba21b01FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsGremlindatabasesGraphs3084a6ba609b288b4a3eFromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsGremlindatabaseseac29d7672e0f2a8f5e5FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsMongodbdatabases51e14553f2238ef2b986FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsMongodbdatabasesCollectionsf7833027f6da03b1bae4FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsSqldatabases31d4c418f330ec81bbbaFromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsSqldatabasesContainers42d1e7469a43812bd160FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/storedprocedures?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsSqldatabasesContainersStoredproceduresa02ed33a703601a3213eFromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/triggers?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsSqldatabasesContainersTriggers4142e58cc45f18bd5bf8FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/userdefinedfunctions?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsSqldatabasesContainersUserdefinedfunctions3f9d8fb8c8bc0ed0b168FromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables -> AutoscaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables?pivots=deployment-language-bicep
export const autoscaleSettingsDatabaseaccountsTablesbc0c493349bc009e46cdFromBicep: AutoscaleSettingsInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsCassandrakeyspacesTablesThroughputsettings24153fbad67081af83d0FromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsCassandrakeyspacesThroughputsettings7b4a1088da812b256d53FromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsGremlindatabasesGraphsThroughputsettings3e7a29abcd22a121375cFromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsGremlindatabasesThroughputsettings97b9683690cef7320272FromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsMongodbdatabasesCollectionsThroughputsettings13fddbb50570c83d7bb9FromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsMongodbdatabasesThroughputsettings56957be8f048be13d58bFromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsSqldatabasesContainersThroughputsettings8958de4b070028ea637cFromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsSqldatabasesThroughputsettings25ca450b9d5155273dacFromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings -> AutoscaleSettingsResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables/throughputsettings?pivots=deployment-language-bicep
export const autoscaleSettingsResourceDatabaseaccountsTablesThroughputsettingsc36dbe40e7a60d535871FromBicep: AutoscaleSettingsResourceInput =
  {
    maxThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> BackupScheduleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const backupScheduleCassandraclusters77aa2bb6bdc18ac4c88fFromBicep: BackupScheduleInput = {
  cronExpression: "string",
  retentionInHours: 0,
  scheduleName: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> CapabilityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const capabilityDatabaseaccountsad579ac98510cf17f69cFromBicep: CapabilityInput = {
  name: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> CapacityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const capacityDatabaseaccountsad579ac98518a9f57beaFromBicep: CapacityInput = {
  totalThroughputLimit: 0,
};

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> CassandraErrorInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const cassandraErrorCassandraclusters77aa2bb6bd81335bab78FromBicep: CassandraErrorInput = {
  additionalErrorInfo: "string",
  code: "string",
  message: "string",
  target: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters/dataCenters -> CassandraErrorInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters/datacenters?pivots=deployment-language-bicep
export const cassandraErrorCassandraclustersDatacenters559b6ef1c69f1c61683aFromBicep: CassandraErrorInput =
  {
    additionalErrorInfo: "string",
    code: "string",
    message: "string",
    target: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces -> CassandraKeyspaceGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces?pivots=deployment-language-bicep
export const cassandraKeyspaceGetPropertiesOptionsDatabaseaccountsCassandrakeyspacesda1f452287409a33d266FromBicep: CassandraKeyspaceGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces -> CassandraKeyspaceGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces?pivots=deployment-language-bicep
export const cassandraKeyspaceGetPropertiesResourceDatabaseaccountsCassandrakeyspacesda1f452287e07d999583FromBicep: CassandraKeyspaceGetPropertiesResourceInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> CassandraPartitionKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const cassandraPartitionKeyDatabaseaccountsCassandrakeyspacesTables1f701b457c296db8dd68FromBicep: CassandraPartitionKeyInput =
  {
    name: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments -> CassandraRoleAssignmentResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandraroleassignments?pivots=deployment-language-bicep
export const cassandraRoleAssignmentResourcePropertiesDatabaseaccountsCassandraroleassignments50b95ddf3094d5a10abcFromBicep: CassandraRoleAssignmentResourcePropertiesInput =
  {
    principalId: "string",
    roleDefinitionId: "string",
    scope: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions -> CassandraRoleDefinitionResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandraroledefinitions?pivots=deployment-language-bicep
export const cassandraRoleDefinitionResourcePropertiesDatabaseaccountsCassandraroledefinitions2a8dfbe74a8f0d73826fFromBicep: CassandraRoleDefinitionResourcePropertiesInput =
  {
    assignableScopes: [],
    id: "string",
    permissions: [],
    roleName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> CassandraSchemaInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const cassandraSchemaDatabaseaccountsCassandrakeyspacesTables1f701b457cbead8faefbFromBicep: CassandraSchemaInput =
  {
    clusterKeys: [],
    columns: [],
    partitionKeys: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> CassandraTableGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const cassandraTableGetPropertiesOptionsDatabaseaccountsCassandrakeyspacesTables1f701b457c9a1010fa35FromBicep: CassandraTableGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> CassandraTableGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const cassandraTableGetPropertiesResourceDatabaseaccountsCassandrakeyspacesTables1f701b457cff1c52d300FromBicep: CassandraTableGetPropertiesResourceInput =
  {
    analyticalStorageTtl: 0,
    defaultTtl: 0,
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> CertificateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const certificateCassandraclusters77aa2bb6bda860e102b8FromBicep: CertificateInput = {
  pem: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters/dataCenters -> CertificateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters/datacenters?pivots=deployment-language-bicep
export const certificateCassandraclustersDatacenters559b6ef1c6b977cb728cFromBicep: CertificateInput =
  {
    pem: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ClientEncryptionIncludedPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const clientEncryptionIncludedPathDatabaseaccountsSqldatabasesContainers42d1e7469a6dc4416f91FromBicep: ClientEncryptionIncludedPathInput =
  {
    clientEncryptionKeyId: "string",
    encryptionAlgorithm: "string",
    encryptionType: "string",
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys -> ClientEncryptionKeyGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/clientencryptionkeys?pivots=deployment-language-bicep
export const clientEncryptionKeyGetPropertiesResourceDatabaseaccountsSqldatabasesClientencryptionkeys6d00b8e80fdb025945adFromBicep: ClientEncryptionKeyGetPropertiesResourceInput =
  {
    encryptionAlgorithm: "string",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ClientEncryptionPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const clientEncryptionPolicyDatabaseaccountsSqldatabasesContainers42d1e7469a431c171b47FromBicep: ClientEncryptionPolicyInput =
  {
    includedPaths: [],
    policyFormatVersion: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> ClusterKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const clusterKeyDatabaseaccountsCassandrakeyspacesTables1f701b457c46ee9068f2FromBicep: ClusterKeyInput =
  {
    name: "string",
    orderBy: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> ClusterResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const clusterResourcePropertiesCassandraclusters77aa2bb6bd227a02b46bFromBicep: ClusterResourcePropertiesInput =
  {
    authenticationMethod: "Cassandra",
    autoReplicate: "AllKeyspaces",
    azureConnectionMethod: "None",
    backupSchedules: [],
    cassandraAuditLoggingEnabled: true,
    cassandraVersion: "string",
    clientCertificates: [],
    clusterNameOverride: "string",
    deallocated: true,
    delegatedManagementSubnetId: "string",
    extensions: [],
    externalDataCenters: [],
    externalGossipCertificates: [],
    externalSeedNodes: [],
    hoursBetweenBackups: 0,
    initialCassandraAdminPassword: "string",
    repairEnabled: true,
    restoreFromBackupId: "string",
    scheduledEventStrategy: "Ignore",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables -> ColumnInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables?pivots=deployment-language-bicep
export const columnDatabaseaccountsCassandrakeyspacesTables1f701b457cde4362a5d4FromBicep: ColumnInput =
  {
    name: "string",
    type: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> CompositePathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const compositePathDatabaseaccountsGremlindatabasesGraphs3084a6ba604aba8e6dd0FromBicep: CompositePathInput =
  {
    order: "ascending",
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> CompositePathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const compositePathDatabaseaccountsSqldatabasesContainers42d1e7469a44c15d4716FromBicep: CompositePathInput =
  {
    order: "ascending",
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ComputedPropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const computedPropertyDatabaseaccountsSqldatabasesContainers42d1e7469af0ee268837FromBicep: ComputedPropertyInput =
  {
    name: "string",
    query: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> ConflictResolutionPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const conflictResolutionPolicyDatabaseaccountsGremlindatabasesGraphs3084a6ba6028b0515b90FromBicep: ConflictResolutionPolicyInput =
  {
    conflictResolutionPath: "string",
    conflictResolutionProcedure: "string",
    mode: "Custom",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ConflictResolutionPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const conflictResolutionPolicyDatabaseaccountsSqldatabasesContainers42d1e7469a08e2e303f9FromBicep: ConflictResolutionPolicyInput =
  {
    conflictResolutionPath: "string",
    conflictResolutionProcedure: "string",
    mode: "Custom",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> ContainerPartitionKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const containerPartitionKeyDatabaseaccountsGremlindatabasesGraphs3084a6ba60473200df7bFromBicep: ContainerPartitionKeyInput =
  {
    kind: "Hash",
    paths: [],
    version: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ContainerPartitionKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const containerPartitionKeyDatabaseaccountsSqldatabasesContainers42d1e7469a26e8c7012cFromBicep: ContainerPartitionKeyInput =
  {
    kind: "Hash",
    paths: [],
    version: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> CorsPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const corsPolicyDatabaseaccountsad579ac985a1974cf1f2FromBicep: CorsPolicyInput = {
  allowedHeaders: "string",
  allowedMethods: "string",
  allowedOrigins: "string",
  exposedHeaders: "string",
  maxAgeInSeconds: 0,
};

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures -> CreateUpdateOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/storedprocedures?pivots=deployment-language-bicep
export const createUpdateOptionsDatabaseaccountsSqldatabasesContainersStoredproceduresa02ed33a703886abd622FromBicep: CreateUpdateOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers -> CreateUpdateOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/triggers?pivots=deployment-language-bicep
export const createUpdateOptionsDatabaseaccountsSqldatabasesContainersTriggers4142e58cc4d5a00c9536FromBicep: CreateUpdateOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions -> CreateUpdateOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/userdefinedfunctions?pivots=deployment-language-bicep
export const createUpdateOptionsDatabaseaccountsSqldatabasesContainersUserdefinedfunctions3f9d8fb8c8aeb883b39fFromBicep: CreateUpdateOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters/dataCenters -> DataCenterResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters/datacenters?pivots=deployment-language-bicep
export const dataCenterResourcePropertiesCassandraclustersDatacenters559b6ef1c6354674403cFromBicep: DataCenterResourcePropertiesInput =
  {
    availabilityZone: true,
    backupStorageCustomerKeyUri: "string",
    base64EncodedCassandraYamlFragment: "string",
    dataCenterLocation: "string",
    deallocated: true,
    delegatedSubnetId: "string",
    diskCapacity: 0,
    diskSku: "string",
    managedDiskCustomerKeyUri: "string",
    nodeCount: 0,
    privateEndpointIpAddress: "string",
    sku: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> DatabaseAccountGetPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const databaseAccountGetPropertiesDatabaseaccountsad579ac98538bd5186b4FromBicep: DatabaseAccountGetPropertiesInput =
  {
    capabilities: [],
    connectorOffer: "Small",
    cors: [],
    createMode: "Default",
    customerManagedKeyStatus: "string",
    databaseAccountOfferType: "Standard",
    defaultIdentity: "string",
    defaultPriorityLevel: "High",
    disableKeyBasedMetadataWriteAccess: true,
    disableLocalAuth: true,
    enableAnalyticalStorage: true,
    enableAutomaticFailover: true,
    enableBurstCapacity: true,
    enableCassandraConnector: true,
    enableFreeTier: true,
    enableMultipleWriteLocations: true,
    enablePartitionMerge: true,
    enablePerRegionPerPartitionAutoscale: true,
    enablePriorityBasedExecution: true,
    enforceHierarchicalPartitionKeyIdLastLevel: true,
    ipRules: [],
    isVirtualNetworkFilterEnabled: true,
    keyVaultKeyUri: "string",
    locations: [],
    minimalTlsVersion: "Tls",
    networkAclBypassResourceIds: [],
    publicNetworkAccess: "Disabled",
    virtualNetworkRules: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> DatabaseRestoreResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const databaseRestoreResourceDatabaseaccountsad579ac985a0ea25a1feFromBicep: DatabaseRestoreResourceInput =
  {
    collectionNames: [],
    databaseName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> ExcludedPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const excludedPathDatabaseaccountsGremlindatabasesGraphs3084a6ba606bed95c7e1FromBicep: ExcludedPathInput =
  {
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ExcludedPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const excludedPathDatabaseaccountsSqldatabasesContainers42d1e7469acae70ca6c2FromBicep: ExcludedPathInput =
  {
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts -> FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/fleets/fleetspaces/fleetspaceaccounts?pivots=deployment-language-bicep
export const fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesFleetsFleetspacesFleetspaceaccountsf2d1566561d66703dbccFromBicep: FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput =
  {
    armLocation: "string",
    resourceId: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/fleets/fleetspaces -> FleetspacePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/fleets/fleetspaces?pivots=deployment-language-bicep
export const fleetspacePropertiesFleetsFleetspacese11d7dd98036314cee0bFromBicep: FleetspacePropertiesInput =
  {
    dataRegions: [],
    fleetspaceApiKind: "NoSQL",
    serviceTier: "BusinessCritical",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/fleets/fleetspaces -> FleetspacePropertiesThroughputPoolConfigurationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/fleets/fleetspaces?pivots=deployment-language-bicep
export const fleetspacePropertiesThroughputPoolConfigurationFleetsFleetspacese11d7dd980b115a2b711FromBicep: FleetspacePropertiesThroughputPoolConfigurationInput =
  {
    dedicatedRUs: 0,
    maxConsumableRUs: 0,
    maxThroughput: 0,
    minThroughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> FullTextIndexPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const fullTextIndexPathDatabaseaccountsGremlindatabasesGraphs3084a6ba60daed3664aaFromBicep: FullTextIndexPathInput =
  {
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> FullTextIndexPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const fullTextIndexPathDatabaseaccountsSqldatabasesContainers42d1e7469a0ba404e4fcFromBicep: FullTextIndexPathInput =
  {
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> FullTextPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const fullTextPathDatabaseaccountsSqldatabasesContainers42d1e7469aea174938b5FromBicep: FullTextPathInput =
  {
    language: "string",
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> FullTextPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const fullTextPolicyDatabaseaccountsSqldatabasesContainers42d1e7469ac4703d5d1dFromBicep: FullTextPolicyInput =
  {
    defaultLanguage: "string",
    fullTextPaths: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases -> GremlinDatabaseGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases?pivots=deployment-language-bicep
export const gremlinDatabaseGetPropertiesOptionsDatabaseaccountsGremlindatabaseseac29d7672b0c8dc1adaFromBicep: GremlinDatabaseGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases -> GremlinDatabaseGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases?pivots=deployment-language-bicep
export const gremlinDatabaseGetPropertiesResourceDatabaseaccountsGremlindatabaseseac29d76720e1aa80819FromBicep: GremlinDatabaseGetPropertiesResourceInput =
  {
    createMode: "Default",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> GremlinDatabaseRestoreResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const gremlinDatabaseRestoreResourceDatabaseaccountsad579ac985df7b18ab7bFromBicep: GremlinDatabaseRestoreResourceInput =
  {
    databaseName: "string",
    graphNames: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> GremlinGraphGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const gremlinGraphGetPropertiesOptionsDatabaseaccountsGremlindatabasesGraphs3084a6ba60ac075abcfaFromBicep: GremlinGraphGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> GremlinGraphGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const gremlinGraphGetPropertiesResourceDatabaseaccountsGremlindatabasesGraphs3084a6ba60f5fbe8233eFromBicep: GremlinGraphGetPropertiesResourceInput =
  {
    analyticalStorageTtl: 0,
    createMode: "Default",
    defaultTtl: 0,
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments -> GremlinRoleAssignmentResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlinroleassignments?pivots=deployment-language-bicep
export const gremlinRoleAssignmentResourcePropertiesDatabaseaccountsGremlinroleassignmentsee07e249922404496ad6FromBicep: GremlinRoleAssignmentResourcePropertiesInput =
  {
    principalId: "string",
    roleDefinitionId: "string",
    scope: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions -> GremlinRoleDefinitionResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlinroledefinitions?pivots=deployment-language-bicep
export const gremlinRoleDefinitionResourcePropertiesDatabaseaccountsGremlinroledefinitions2513d22b2d7adc0433afFromBicep: GremlinRoleDefinitionResourcePropertiesInput =
  {
    assignableScopes: [],
    id: "string",
    permissions: [],
    roleName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> IncludedPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const includedPathDatabaseaccountsGremlindatabasesGraphs3084a6ba60aedc84c349FromBicep: IncludedPathInput =
  {
    indexes: [],
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> IncludedPathInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const includedPathDatabaseaccountsSqldatabasesContainers42d1e7469af029467170FromBicep: IncludedPathInput =
  {
    indexes: [],
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> IndexesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const indexesDatabaseaccountsGremlindatabasesGraphs3084a6ba60d93afbe648FromBicep: IndexesInput =
  {
    dataType: "LineString",
    kind: "Hash",
    precision: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> IndexesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const indexesDatabaseaccountsSqldatabasesContainers42d1e7469a232d0d7a86FromBicep: IndexesInput =
  {
    dataType: "LineString",
    kind: "Hash",
    precision: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> IndexingPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const indexingPolicyDatabaseaccountsGremlindatabasesGraphs3084a6ba60469862e4ceFromBicep: IndexingPolicyInput =
  {
    automatic: true,
    compositeIndexes: [],
    excludedPaths: [],
    fullTextIndexes: [],
    includedPaths: [],
    indexingMode: "consistent",
    spatialIndexes: [],
    vectorIndexes: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> IndexingPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const indexingPolicyDatabaseaccountsSqldatabasesContainers42d1e7469a979f329216FromBicep: IndexingPolicyInput =
  {
    automatic: true,
    compositeIndexes: [],
    excludedPaths: [],
    fullTextIndexes: [],
    includedPaths: [],
    indexingMode: "consistent",
    spatialIndexes: [],
    vectorIndexes: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> IpAddressOrRangeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const ipAddressOrRangeDatabaseaccountsad579ac9855dc2e0b21bFromBicep: IpAddressOrRangeInput =
  {
    ipAddressOrRange: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys -> KeyWrapMetadataInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/clientencryptionkeys?pivots=deployment-language-bicep
export const keyWrapMetadataDatabaseaccountsSqldatabasesClientencryptionkeys6d00b8e80fd6f815f983FromBicep: KeyWrapMetadataInput =
  {
    algorithm: "string",
    name: "string",
    type: "string",
    value: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> ManagedCassandraManagedServiceIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const managedCassandraManagedServiceIdentityCassandraclusters77aa2bb6bdb615ec0e57FromBicep: ManagedCassandraManagedServiceIdentityInput =
  {
    type: "None",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections -> MongoIndexKeysInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections?pivots=deployment-language-bicep
export const mongoIndexKeysDatabaseaccountsMongodbdatabasesCollectionsf7833027f68d56e26885FromBicep: MongoIndexKeysInput =
  {
    keys: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections -> MongoIndexOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections?pivots=deployment-language-bicep
export const mongoIndexOptionsDatabaseaccountsMongodbdatabasesCollectionsf7833027f6ebd996f860FromBicep: MongoIndexOptionsInput =
  {
    expireAfterSeconds: 0,
    unique: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions -> MongoRoleDefinitionResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbroledefinitions?pivots=deployment-language-bicep
export const mongoRoleDefinitionResourceDatabaseaccountsMongodbroledefinitions41a4717e600238c82b60FromBicep: MongoRoleDefinitionResourceInput =
  {
    databaseName: "string",
    privileges: [],
    roleName: "string",
    roles: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions -> MongoUserDefinitionResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbuserdefinitions?pivots=deployment-language-bicep
export const mongoUserDefinitionResourceDatabaseaccountsMongodbuserdefinitions038fdec0cc55be487c60FromBicep: MongoUserDefinitionResourceInput =
  {
    customData: "string",
    databaseName: "string",
    mechanisms: "string",
    password: "string",
    roles: [],
    userName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions -> PermissionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandraroledefinitions?pivots=deployment-language-bicep
export const permissionDatabaseaccountsCassandraroledefinitions2a8dfbe74a3c7a0a3f20FromBicep: PermissionInput =
  {
    dataActions: [],
    id: "string",
    notDataActions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions -> PermissionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlinroledefinitions?pivots=deployment-language-bicep
export const permissionDatabaseaccountsGremlinroledefinitions2513d22b2d92fcb5e95bFromBicep: PermissionInput =
  {
    dataActions: [],
    id: "string",
    notDataActions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions -> PermissionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongomiroledefinitions?pivots=deployment-language-bicep
export const permissionDatabaseaccountsMongomiroledefinitionsf18efbee3405381aea2aFromBicep: PermissionInput =
  {
    dataActions: [],
    id: "string",
    notDataActions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions -> PermissionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqlroledefinitions?pivots=deployment-language-bicep
export const permissionDatabaseaccountsSqlroledefinitions9b297ac17c0b3c09088cFromBicep: PermissionInput =
  {
    dataActions: [],
    id: "string",
    notDataActions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions -> PermissionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tableroledefinitions?pivots=deployment-language-bicep
export const permissionDatabaseaccountsTableroledefinitionsc19c34446526357e24e7FromBicep: PermissionInput =
  {
    dataActions: [],
    id: "string",
    notDataActions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections -> PrivateEndpointConnectionPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointConnectionPropertiesDatabaseaccountsPrivateendpointconnectionsd082ac84b9764f19e349FromBicep: PrivateEndpointConnectionPropertiesInput =
  {
    groupId: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections -> PrivateEndpointPropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointPropertyDatabaseaccountsPrivateendpointconnectionsd082ac84b929fff3b577FromBicep: PrivateEndpointPropertyInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections -> PrivateLinkServiceConnectionStatePropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/privateendpointconnections?pivots=deployment-language-bicep
export const privateLinkServiceConnectionStatePropertyDatabaseaccountsPrivateendpointconnectionsd082ac84b941026fe6c3FromBicep: PrivateLinkServiceConnectionStatePropertyInput =
  {
    description: "string",
    status: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions -> PrivilegeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbroledefinitions?pivots=deployment-language-bicep
export const privilegeDatabaseaccountsMongodbroledefinitions41a4717e601b8f0dcc57FromBicep: PrivilegeInput =
  {
    actions: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions -> PrivilegeResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbroledefinitions?pivots=deployment-language-bicep
export const privilegeResourceDatabaseaccountsMongodbroledefinitions41a4717e6049ea3093e8FromBicep: PrivilegeResourceInput =
  {
    collection: "string",
    db: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsGremlindatabasesGraphs3084a6ba602097ebb3abFromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsGremlindatabaseseac29d7672858ab7cdf5FromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsMongodbdatabases51e14553f2e9793d9c86FromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsMongodbdatabasesCollectionsf7833027f607acede3fdFromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsSqldatabases31d4c418f36f92a6785dFromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsSqldatabasesContainers42d1e7469af87b648e04FromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables -> ResourceRestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables?pivots=deployment-language-bicep
export const resourceRestoreParametersDatabaseaccountsTablesbc0c493349ef6ad23d73FromBicep: ResourceRestoreParametersInput =
  {
    restoreSource: "string",
    restoreWithTtlDisabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> RestoreParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const restoreParametersDatabaseaccountsad579ac98548dbc57841FromBicep: RestoreParametersInput =
  {
    databasesToRestore: [],
    gremlinDatabasesToRestore: [],
    restoreMode: "PointInTime",
    restoreSource: "string",
    restoreWithTtlDisabled: true,
    sourceBackupLocation: "string",
    tablesToRestore: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions -> RoleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbroledefinitions?pivots=deployment-language-bicep
export const roleDatabaseaccountsMongodbroledefinitions41a4717e60f0d7d891c9FromBicep: RoleInput = {
  db: "string",
  role: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions -> RoleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbuserdefinitions?pivots=deployment-language-bicep
export const roleDatabaseaccountsMongodbuserdefinitions038fdec0ccf3afa9e466FromBicep: RoleInput = {
  db: "string",
  role: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/cassandraClusters -> SeedNodeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/cassandraclusters?pivots=deployment-language-bicep
export const seedNodeCassandraclusters77aa2bb6bd5b7f7ea353FromBicep: SeedNodeInput = {
  ipAddress: "string",
};

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> SpatialSpecInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const spatialSpecDatabaseaccountsGremlindatabasesGraphs3084a6ba601cf85f857eFromBicep: SpatialSpecInput =
  {
    path: "string",
    types: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> SpatialSpecInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const spatialSpecDatabaseaccountsSqldatabasesContainers42d1e7469a0e93ec378dFromBicep: SpatialSpecInput =
  {
    path: "string",
    types: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> SqlContainerGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const sqlContainerGetPropertiesOptionsDatabaseaccountsSqldatabasesContainers42d1e7469ade48f82f47FromBicep: SqlContainerGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> SqlContainerGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const sqlContainerGetPropertiesResourceDatabaseaccountsSqldatabasesContainers42d1e7469a923d0ce497FromBicep: SqlContainerGetPropertiesResourceInput =
  {
    analyticalStorageTtl: 0,
    computedProperties: [],
    createMode: "Default",
    defaultTtl: 0,
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases -> SqlDatabaseGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases?pivots=deployment-language-bicep
export const sqlDatabaseGetPropertiesOptionsDatabaseaccountsSqldatabases31d4c418f3a5b943cee0FromBicep: SqlDatabaseGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases -> SqlDatabaseGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases?pivots=deployment-language-bicep
export const sqlDatabaseGetPropertiesResourceDatabaseaccountsSqldatabases31d4c418f382afa8e7f2FromBicep: SqlDatabaseGetPropertiesResourceInput =
  {
    createMode: "Default",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments -> SqlRoleAssignmentResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqlroleassignments?pivots=deployment-language-bicep
export const sqlRoleAssignmentResourceDatabaseaccountsSqlroleassignments9780e43a77c34310ca7cFromBicep: SqlRoleAssignmentResourceInput =
  {
    principalId: "string",
    roleDefinitionId: "string",
    scope: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions -> SqlRoleDefinitionResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqlroledefinitions?pivots=deployment-language-bicep
export const sqlRoleDefinitionResourceDatabaseaccountsSqlroledefinitions9b297ac17c9ace6b4ae5FromBicep: SqlRoleDefinitionResourceInput =
  {
    assignableScopes: [],
    permissions: [],
    roleName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures -> SqlStoredProcedureGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/storedprocedures?pivots=deployment-language-bicep
export const sqlStoredProcedureGetPropertiesResourceDatabaseaccountsSqldatabasesContainersStoredproceduresa02ed33a70f24f51d9ecFromBicep: SqlStoredProcedureGetPropertiesResourceInput =
  {
    body: "string",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers -> SqlTriggerGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/triggers?pivots=deployment-language-bicep
export const sqlTriggerGetPropertiesResourceDatabaseaccountsSqldatabasesContainersTriggers4142e58cc4ffe3567308FromBicep: SqlTriggerGetPropertiesResourceInput =
  {
    body: "string",
    id: "string",
    triggerOperation: "All",
    triggerType: "Post",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions -> SqlUserDefinedFunctionGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/userdefinedfunctions?pivots=deployment-language-bicep
export const sqlUserDefinedFunctionGetPropertiesResourceDatabaseaccountsSqldatabasesContainersUserdefinedfunctions3f9d8fb8c8eeff3b0265FromBicep: SqlUserDefinedFunctionGetPropertiesResourceInput =
  {
    body: "string",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables -> TableGetPropertiesOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables?pivots=deployment-language-bicep
export const tableGetPropertiesOptionsDatabaseaccountsTablesbc0c493349cc2d2ee878FromBicep: TableGetPropertiesOptionsInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables -> TableGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables?pivots=deployment-language-bicep
export const tableGetPropertiesResourceDatabaseaccountsTablesbc0c493349235f0b31dbFromBicep: TableGetPropertiesResourceInput =
  {
    createMode: "Default",
    id: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments -> TableRoleAssignmentResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tableroleassignments?pivots=deployment-language-bicep
export const tableRoleAssignmentResourcePropertiesDatabaseaccountsTableroleassignments49b0e42e48e4829353afFromBicep: TableRoleAssignmentResourcePropertiesInput =
  {
    principalId: "string",
    roleDefinitionId: "string",
    scope: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions -> TableRoleDefinitionResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tableroledefinitions?pivots=deployment-language-bicep
export const tableRoleDefinitionResourcePropertiesDatabaseaccountsTableroledefinitionsc19c344465b1d70f8e6aFromBicep: TableRoleDefinitionResourcePropertiesInput =
  {
    assignableScopes: [],
    id: "string",
    permissions: [],
    roleName: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsCassandrakeyspacesTablesThroughputsettings24153fbad64bbd4369fcFromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsCassandrakeyspacesThroughputsettings7b4a1088da51b04be572FromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsGremlindatabasesGraphsThroughputsettings3e7a29abcd304b0f0515FromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsGremlindatabasesThroughputsettings97b968369015e2c1b17dFromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsMongodbdatabasesCollectionsThroughputsettings13fddbb50505b9622c1dFromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsMongodbdatabasesThroughputsettings56957be8f0bcc8cff242FromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsSqldatabasesContainersThroughputsettings8958de4b07254b1710d1FromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsSqldatabasesThroughputsettings25ca450b9d99d19c634eFromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings -> ThroughputPolicyResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables/throughputsettings?pivots=deployment-language-bicep
export const throughputPolicyResourceDatabaseaccountsTablesThroughputsettingsc36dbe40e7cd29fdb4d3FromBicep: ThroughputPolicyResourceInput =
  {
    incrementPercent: 0,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/tables/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsCassandrakeyspacesTablesThroughputsettings24153fbad6291c138556FromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/cassandrakeyspaces/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsCassandrakeyspacesThroughputsettings7b4a1088da15d371033eFromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsGremlindatabasesGraphsThroughputsettings3e7a29abcde12e44461eFromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsGremlindatabasesThroughputsettings97b96836901802e86d1bFromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/collections/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsMongodbdatabasesCollectionsThroughputsettings13fddbb505d535ed035bFromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/mongodbdatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsMongodbdatabasesThroughputsettings56957be8f0e18e01c440FromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsSqldatabasesContainersThroughputsettings8958de4b0762f5590ae7FromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsSqldatabasesThroughputsettings25ca450b9dfd60311242FromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings -> ThroughputSettingsGetPropertiesResourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/tables/throughputsettings?pivots=deployment-language-bicep
export const throughputSettingsGetPropertiesResourceDatabaseaccountsTablesThroughputsettingsc36dbe40e78f7a8eba36FromBicep: ThroughputSettingsGetPropertiesResourceInput =
  {
    throughput: 0,
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> UniqueKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const uniqueKeyDatabaseaccountsGremlindatabasesGraphs3084a6ba60fc7c2bcbf7FromBicep: UniqueKeyInput =
  {
    paths: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> UniqueKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const uniqueKeyDatabaseaccountsSqldatabasesContainers42d1e7469a0834fd8e1eFromBicep: UniqueKeyInput =
  {
    paths: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> UniqueKeyPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const uniqueKeyPolicyDatabaseaccountsGremlindatabasesGraphs3084a6ba6016b4bff8a9FromBicep: UniqueKeyPolicyInput =
  {
    uniqueKeys: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> UniqueKeyPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const uniqueKeyPolicyDatabaseaccountsSqldatabasesContainers42d1e7469a7173d4608bFromBicep: UniqueKeyPolicyInput =
  {
    uniqueKeys: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> VectorEmbeddingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const vectorEmbeddingDatabaseaccountsSqldatabasesContainers42d1e7469a3f7440bcc8FromBicep: VectorEmbeddingInput =
  {
    dataType: "float16",
    dimensions: 0,
    distanceFunction: "cosine",
    path: "string",
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> VectorEmbeddingPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const vectorEmbeddingPolicyDatabaseaccountsSqldatabasesContainers42d1e7469a189aab03d5FromBicep: VectorEmbeddingPolicyInput =
  {
    vectorEmbeddings: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs -> VectorIndexInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/gremlindatabases/graphs?pivots=deployment-language-bicep
export const vectorIndexDatabaseaccountsGremlindatabasesGraphs3084a6ba60fadd29b1eaFromBicep: VectorIndexInput =
  {
    indexingSearchListSize: 0,
    path: "string",
    quantizationByteSize: 0,
    type: "diskANN",
    vectorIndexShardKey: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers -> VectorIndexInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts/sqldatabases/containers?pivots=deployment-language-bicep
export const vectorIndexDatabaseaccountsSqldatabasesContainers42d1e7469ab66ff52980FromBicep: VectorIndexInput =
  {
    indexingSearchListSize: 0,
    path: "string",
    quantizationByteSize: 0,
    type: "diskANN",
    vectorIndexShardKey: [],
  };

// Accepted Bicep contract: Microsoft.DocumentDB/databaseAccounts -> VirtualNetworkRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2026-03-15/databaseaccounts?pivots=deployment-language-bicep
export const virtualNetworkRuleDatabaseaccountsad579ac98573e931ec77FromBicep: VirtualNetworkRuleInput =
  {
    id: "string",
    ignoreMissingVNetServiceEndpoint: true,
  };
