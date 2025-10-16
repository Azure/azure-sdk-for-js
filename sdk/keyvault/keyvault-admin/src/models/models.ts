// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Full backup operation */
export interface FullBackupOperation {
  /** Status of the backup operation. */
  status?: OperationStatus;
  /** The status details of backup operation. */
  statusDetails?: string;
  /** Error encountered, if any, during the full backup operation. */
  error?: ErrorModel;
  /** The start time of the backup operation in UTC */
  startTime?: Date;
  /** The end time of the backup operation in UTC */
  endTime?: Date | null;
  /** Identifier for the full backup operation. */
  jobId?: string;
  /** The Azure blob storage container Uri which contains the full backup */
  folderUri?: string;
}

export function fullBackupOperationDeserializer(item: any): FullBackupOperation {
  return {
    status: item["status"],
    statusDetails: item["statusDetails"],
    error: !item["error"] ? item["error"] : _fullBackupOperationErrorDeserializer(item["error"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"] * 1000),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"] * 1000),
    jobId: item["jobId"],
    folderUri: item["azureStorageBlobContainerUri"],
  };
}

/** The status of a long-running operation. */
export enum KnownOperationStatus {
  /** The operation is in progress. */
  InProgress = "InProgress",
  /** The operation successfully completed. */
  Succeeded = "Succeeded",
  /** The operation was canceled. */
  Canceled = "Canceled",
  /** The operation failed. */
  Failed = "Failed",
}

/**
 * The status of a long-running operation. \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: The operation is in progress. \
 * **Succeeded**: The operation successfully completed. \
 * **Canceled**: The operation was canceled. \
 * **Failed**: The operation failed.
 */
export type OperationStatus = string;
/** Alias for ErrorModel */
export type ErrorModel = {
  code?: string;
  message?: string;
  innerError?: ErrorModel;
} | null;

/** model interface _FullBackupOperationError */
export interface _FullBackupOperationError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The key vault server error. */
  readonly innerError?: ErrorModel;
}

export function _fullBackupOperationErrorDeserializer(item: any): _FullBackupOperationError {
  return {
    code: item["code"],
    message: item["message"],
    innerError: !item["innererror"]
      ? item["innererror"]
      : _fullBackupOperationErrorDeserializer(item["innererror"]),
  };
}

/** The key vault error exception. */
export interface KeyVaultError {
  /** The key vault server error. */
  readonly error?: ErrorModel;
}

export function keyVaultErrorDeserializer(item: any): KeyVaultError {
  return {
    error: !item["error"] ? item["error"] : _fullBackupOperationErrorDeserializer(item["error"]),
  };
}

/** An authentication method and location for the operation. */
export interface SASTokenParameter {
  /** Azure Blob storage container Uri */
  storageResourceUri: string;
  /** The SAS token pointing to an Azure Blob storage container */
  token?: string;
  /** Indicates which authentication method should be used. If set to true, Managed HSM will use the configured user-assigned managed identity to authenticate with Azure Storage. Otherwise, a SAS token has to be specified. */
  useManagedIdentity?: boolean;
}

export function sasTokenParameterSerializer(item: SASTokenParameter): any {
  return {
    storageResourceUri: item["storageResourceUri"],
    token: item["token"],
    useManagedIdentity: item["useManagedIdentity"],
  };
}

/** The authentication method and location for the backup operation. */
export interface PreBackupOperationParameters {
  /** Azure Blob storage container Uri */
  storageResourceUri?: string;
  /** The SAS token pointing to an Azure Blob storage container */
  token?: string;
  /** Indicates which authentication method should be used. If set to true, Managed HSM will use the configured user-assigned managed identity to authenticate with Azure Storage. Otherwise, a SAS token has to be specified. */
  useManagedIdentity?: boolean;
}

export function preBackupOperationParametersSerializer(item: PreBackupOperationParameters): any {
  return {
    storageResourceUri: item["storageResourceUri"],
    token: item["token"],
    useManagedIdentity: item["useManagedIdentity"],
  };
}

/** Restore operation */
export interface RestoreOperation {
  /** Status of the restore operation. */
  status?: OperationStatus;
  /** The status details of restore operation. */
  statusDetails?: string;
  /** Error encountered, if any, during the restore operation. */
  error?: ErrorModel;
  /** Identifier for the restore operation. */
  jobId?: string;
  /** The start time of the restore operation */
  startTime?: Date;
  /** The end time of the restore operation */
  endTime?: Date | null;
}

export function restoreOperationDeserializer(item: any): RestoreOperation {
  return {
    status: item["status"],
    statusDetails: item["statusDetails"],
    error: !item["error"] ? item["error"] : _fullBackupOperationErrorDeserializer(item["error"]),
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"] * 1000),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"] * 1000),
  };
}

/** The authentication method and location for the restore operation. */
export interface RestoreOperationParameters {
  /** A user-provided SAS token to an Azure blob storage container. */
  sasTokenParameters: SASTokenParameter;
  /** The Folder name of the blob where the previous successful full backup was stored */
  folderToRestore: string;
}

export function restoreOperationParametersSerializer(item: RestoreOperationParameters): any {
  return {
    sasTokenParameters: sasTokenParameterSerializer(item["sasTokenParameters"]),
    folderToRestore: item["folderToRestore"],
  };
}

/** The authentication method and location for the restore operation. */
export interface PreRestoreOperationParameters {
  /** A user-provided SAS token to an Azure blob storage container. */
  sasTokenParameters?: SASTokenParameter;
  /** The Folder name of the blob where the previous successful full backup was stored */
  folderToRestore?: string;
}

export function preRestoreOperationParametersSerializer(item: PreRestoreOperationParameters): any {
  return {
    sasTokenParameters: !item["sasTokenParameters"]
      ? item["sasTokenParameters"]
      : sasTokenParameterSerializer(item["sasTokenParameters"]),
    folderToRestore: item["folderToRestore"],
  };
}

/** Selective Key Restore operation */
export interface SelectiveKeyRestoreOperation {
  /** Status of the restore operation. */
  status?: OperationStatus;
  /** The status details of restore operation. */
  statusDetails?: string;
  /** Error encountered, if any, during the selective key restore operation. */
  error?: ErrorModel;
  /** Identifier for the selective key restore operation. */
  jobId?: string;
  /** The start time of the restore operation */
  startTime?: Date;
  /** The end time of the restore operation */
  endTime?: Date | null;
}

export function selectiveKeyRestoreOperationDeserializer(item: any): SelectiveKeyRestoreOperation {
  return {
    status: item["status"],
    statusDetails: item["statusDetails"],
    error: !item["error"] ? item["error"] : _fullBackupOperationErrorDeserializer(item["error"]),
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"] * 1000),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"] * 1000),
  };
}

/** The authentication method and location for the selective key restore operation. */
export interface SelectiveKeyRestoreOperationParameters {
  /** A user-provided SAS token to an Azure blob storage container. */
  sasTokenParameters: SASTokenParameter;
  /** The Folder name of the blob where the previous successful full backup was stored */
  folder: string;
}

export function selectiveKeyRestoreOperationParametersSerializer(
  item: SelectiveKeyRestoreOperationParameters,
): any {
  return {
    sasTokenParameters: sasTokenParameterSerializer(item["sasTokenParameters"]),
    folder: item["folder"],
  };
}

/** The update settings request object. */
export interface UpdateSettingRequest {
  /** The value of the pool setting. */
  value: string;
}

export function updateSettingRequestSerializer(item: UpdateSettingRequest): any {
  return { value: item["value"] };
}

/** A Key Vault account setting. */
export interface Setting {
  /** The account setting to be updated */
  name: string;
  /** The value of the pool setting. */
  value: string;
  /** The type specifier of the value. */
  type?: SettingTypeEnum;
}

export function settingDeserializer(item: any): Setting {
  return {
    name: item["name"],
    value: item["value"],
    type: item["type"],
  };
}

/** The type specifier of the value. */
export enum KnownSettingTypeEnum {
  /** A boolean setting value. */
  Boolean = "boolean",
}

/**
 * The type specifier of the value. \
 * {@link KnownSettingTypeEnum} can be used interchangeably with SettingTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **boolean**: A boolean setting value.
 */
export type SettingTypeEnum = string;

/** The settings list result. */
export interface SettingsListResult {
  /** A response message containing a list of account settings with their associated value. */
  readonly settings?: Setting[];
}

export function settingsListResultDeserializer(item: any): SettingsListResult {
  return {
    settings: !item["settings"] ? item["settings"] : settingArrayDeserializer(item["settings"]),
  };
}

export function settingArrayDeserializer(result: Array<Setting>): any[] {
  return result.map((item) => {
    return settingDeserializer(item);
  });
}

/** Role definition. */
export interface RoleDefinition {
  /** The role definition ID. */
  readonly id?: string;
  /** The role definition name. */
  readonly name?: string;
  /** The role definition type. */
  readonly type?: RoleDefinitionType;
  /** Role definition properties. */
  properties?: RoleDefinitionProperties;
}

export function roleDefinitionDeserializer(item: any): RoleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : roleDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** The role definition type. */
export enum KnownRoleDefinitionType {
  /** Microsoft-defined role definitions. */
  MicrosoftAuthorizationRoleDefinitions = "Microsoft.Authorization/roleDefinitions",
}

/**
 * The role definition type. \
 * {@link KnownRoleDefinitionType} can be used interchangeably with RoleDefinitionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Authorization\/roleDefinitions**: Microsoft-defined role definitions.
 */
export type RoleDefinitionType = string;

/** Role definition properties. */
export interface RoleDefinitionProperties {
  /** The role name. */
  roleName?: string;
  /** The role definition description. */
  description?: string;
  /** The role type. */
  roleType?: RoleType;
  /** Role definition permissions. */
  permissions?: Permission[];
  /** Role definition assignable scopes. */
  assignableScopes?: RoleScope[];
}

export function roleDefinitionPropertiesSerializer(item: RoleDefinitionProperties): any {
  return {
    roleName: item["roleName"],
    description: item["description"],
    type: item["roleType"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
  };
}

export function roleDefinitionPropertiesDeserializer(item: any): RoleDefinitionProperties {
  return {
    roleName: item["roleName"],
    description: item["description"],
    roleType: item["type"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The role type. */
export enum KnownRoleType {
  /** Built in role. */
  BuiltInRole = "AKVBuiltInRole",
  /** Custom role. */
  CustomRole = "CustomRole",
}

/**
 * The role type. \
 * {@link KnownRoleType} can be used interchangeably with RoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKVBuiltInRole**: Built in role. \
 * **CustomRole**: Custom role.
 */
export type RoleType = string;

export function permissionArraySerializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionSerializer(item);
  });
}

export function permissionArrayDeserializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionDeserializer(item);
  });
}

/** Role definition permissions. */
export interface Permission {
  /** Action permissions that are granted. */
  actions?: string[];
  /** Action permissions that are excluded but not denied. They may be granted by other role definitions assigned to a principal. */
  notActions?: string[];
  /** Data action permissions that are granted. */
  dataActions?: DataAction[];
  /** Data action permissions that are excluded but not denied. They may be granted by other role definitions assigned to a principal. */
  notDataActions?: DataAction[];
}

export function permissionSerializer(item: Permission): any {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

export function permissionDeserializer(item: any): Permission {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported permissions for data actions. */
export enum KnownDataAction {
  /** Read HSM key metadata. */
  ReadHsmKey = "Microsoft.KeyVault/managedHsm/keys/read/action",
  /** Update an HSM key. */
  WriteHsmKey = "Microsoft.KeyVault/managedHsm/keys/write/action",
  /** Read deleted HSM key. */
  ReadDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action",
  /** Recover deleted HSM key. */
  RecoverDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action",
  /** Backup HSM keys. */
  BackupHsmKeys = "Microsoft.KeyVault/managedHsm/keys/backup/action",
  /** Restore HSM keys. */
  RestoreHsmKeys = "Microsoft.KeyVault/managedHsm/keys/restore/action",
  /** Delete role assignment. */
  DeleteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/delete/action",
  /** Get role assignment. */
  GetRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/read/action",
  /** Create or update role assignment. */
  WriteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/write/action",
  /** Get role definition. */
  ReadRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/read/action",
  /** Create or update role definition. */
  WriteRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/write/action",
  /** Delete role definition. */
  DeleteRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action",
  /** Encrypt using an HSM key. */
  EncryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/encrypt/action",
  /** Decrypt using an HSM key. */
  DecryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/decrypt/action",
  /** Wrap using an HSM key. */
  WrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/wrap/action",
  /** Unwrap using an HSM key. */
  UnwrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/unwrap/action",
  /** Sign using an HSM key. */
  SignHsmKey = "Microsoft.KeyVault/managedHsm/keys/sign/action",
  /** Verify using an HSM key. */
  VerifyHsmKey = "Microsoft.KeyVault/managedHsm/keys/verify/action",
  /** Create an HSM key. */
  CreateHsmKey = "Microsoft.KeyVault/managedHsm/keys/create",
  /** Delete an HSM key. */
  DeleteHsmKey = "Microsoft.KeyVault/managedHsm/keys/delete",
  /** Export an HSM key. */
  ExportHsmKey = "Microsoft.KeyVault/managedHsm/keys/export/action",
  /** Release an HSM key using Secure Key Release. */
  ReleaseKey = "Microsoft.KeyVault/managedHsm/keys/release/action",
  /** Import an HSM key. */
  ImportHsmKey = "Microsoft.KeyVault/managedHsm/keys/import/action",
  /** Purge a deleted HSM key. */
  PurgeDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete",
  /** Download an HSM security domain. */
  DownloadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/download/action",
  /** Check status of HSM security domain download. */
  DownloadHsmSecurityDomainStatus = "Microsoft.KeyVault/managedHsm/securitydomain/download/read",
  /** Upload an HSM security domain. */
  UploadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/upload/action",
  /** Check the status of the HSM security domain exchange file. */
  ReadHsmSecurityDomainStatus = "Microsoft.KeyVault/managedHsm/securitydomain/upload/read",
  /** Download an HSM security domain transfer key. */
  ReadHsmSecurityDomainTransferKey = "Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read",
  /** Start an HSM backup. */
  StartHsmBackup = "Microsoft.KeyVault/managedHsm/backup/start/action",
  /** Start an HSM restore. */
  StartHsmRestore = "Microsoft.KeyVault/managedHsm/restore/start/action",
  /** Read an HSM backup status. */
  ReadHsmBackupStatus = "Microsoft.KeyVault/managedHsm/backup/status/action",
  /** Read an HSM restore status. */
  ReadHsmRestoreStatus = "Microsoft.KeyVault/managedHsm/restore/status/action",
  /** Generate random numbers. */
  RandomNumbersGenerate = "Microsoft.KeyVault/managedHsm/rng/action",
}

/**
 * Supported permissions for data actions. \
 * {@link KnownDataAction} can be used interchangeably with DataAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.KeyVault\/managedHsm\/keys\/read\/action**: Read HSM key metadata. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/write\/action**: Update an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/read\/action**: Read deleted HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/recover\/action**: Recover deleted HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/backup\/action**: Backup HSM keys. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/restore\/action**: Restore HSM keys. \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/delete\/action**: Delete role assignment. \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/read\/action**: Get role assignment. \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/write\/action**: Create or update role assignment. \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/read\/action**: Get role definition. \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/write\/action**: Create or update role definition. \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/delete\/action**: Delete role definition. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/encrypt\/action**: Encrypt using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/decrypt\/action**: Decrypt using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/wrap\/action**: Wrap using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/unwrap\/action**: Unwrap using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/sign\/action**: Sign using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/verify\/action**: Verify using an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/create**: Create an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/delete**: Delete an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/export\/action**: Export an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/release\/action**: Release an HSM key using Secure Key Release. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/import\/action**: Import an HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/delete**: Purge a deleted HSM key. \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/download\/action**: Download an HSM security domain. \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/download\/read**: Check status of HSM security domain download. \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/upload\/action**: Upload an HSM security domain. \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/upload\/read**: Check the status of the HSM security domain exchange file. \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/transferkey\/read**: Download an HSM security domain transfer key. \
 * **Microsoft.KeyVault\/managedHsm\/backup\/start\/action**: Start an HSM backup. \
 * **Microsoft.KeyVault\/managedHsm\/restore\/start\/action**: Start an HSM restore. \
 * **Microsoft.KeyVault\/managedHsm\/backup\/status\/action**: Read an HSM backup status. \
 * **Microsoft.KeyVault\/managedHsm\/restore\/status\/action**: Read an HSM restore status. \
 * **Microsoft.KeyVault\/managedHsm\/rng\/action**: Generate random numbers.
 */
export type DataAction = string;

/** The role scope. */
export enum KnownRoleScope {
  /** Global scope */
  Global = "/",
  /** Keys scope */
  Keys = "/keys",
}

/**
 * The role scope. \
 * {@link KnownRoleScope} can be used interchangeably with RoleScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **\/**: Global scope \
 * **\/keys**: Keys scope
 */
export type RoleScope = string;

/** Role definition create parameters. */
export interface RoleDefinitionCreateParameters {
  /** Role definition properties. */
  properties: RoleDefinitionProperties;
}

export function roleDefinitionCreateParametersSerializer(
  item: RoleDefinitionCreateParameters,
): any {
  return { properties: roleDefinitionPropertiesSerializer(item["properties"]) };
}

/** Role definition list operation result. */
export interface _RoleDefinitionListResult {
  /** Role definition list. */
  value?: RoleDefinition[];
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

export function _roleDefinitionListResultDeserializer(item: any): _RoleDefinitionListResult {
  return {
    value: !item["value"] ? item["value"] : roleDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleDefinitionArrayDeserializer(result: Array<RoleDefinition>): any[] {
  return result.map((item) => {
    return roleDefinitionDeserializer(item);
  });
}

/** Role Assignments */
export interface RoleAssignment {
  /** The role assignment ID. */
  readonly id?: string;
  /** The role assignment name. */
  readonly name?: string;
  /** The role assignment type. */
  readonly type?: string;
  /** Role assignment properties. */
  properties?: RoleAssignmentPropertiesWithScope;
}

export function roleAssignmentDeserializer(item: any): RoleAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : roleAssignmentPropertiesWithScopeDeserializer(item["properties"]),
  };
}

/** Role assignment properties with scope. */
export interface RoleAssignmentPropertiesWithScope {
  /** The role scope. */
  scope?: RoleScope;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
}

export function roleAssignmentPropertiesWithScopeDeserializer(
  item: any,
): RoleAssignmentPropertiesWithScope {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
  };
}

/** Role assignment create parameters. */
export interface RoleAssignmentCreateParameters {
  /** Role assignment properties. */
  properties: RoleAssignmentProperties;
}

export function roleAssignmentCreateParametersSerializer(
  item: RoleAssignmentCreateParameters,
): any {
  return { properties: roleAssignmentPropertiesSerializer(item["properties"]) };
}

/** Role assignment properties. */
export interface RoleAssignmentProperties {
  /** The role definition ID used in the role assignment. */
  roleDefinitionId: string;
  /** The principal ID assigned to the role. This maps to the ID inside the Active Directory. It can point to a user, service principal, or security group. */
  principalId: string;
}

export function roleAssignmentPropertiesSerializer(item: RoleAssignmentProperties): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
  };
}

/** Role assignment list operation result. */
export interface _RoleAssignmentListResult {
  /** Role assignment list. */
  value?: RoleAssignment[];
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

export function _roleAssignmentListResultDeserializer(item: any): _RoleAssignmentListResult {
  return {
    value: !item["value"] ? item["value"] : roleAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleAssignmentArrayDeserializer(result: Array<RoleAssignment>): any[] {
  return result.map((item) => {
    return roleAssignmentDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 7.5 API version. */
  V75 = "7.5",
  /** The 7.6-preview.2 API version. */
  V76Preview2 = "7.6-preview.2",
  /** The 7.6 API version. */
  V76 = "7.6",
}
