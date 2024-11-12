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
  endTime?: Date;
  /** Identifier for the full backup operation. */
  jobId?: string;
  /** The Azure blob storage container Uri which contains the full backup */
  azureStorageBlobContainerUri?: string;
}

/** Known values of {@link OperationStatus} that the service accepts. */
export enum KnownOperationStatus {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status of a long-running operation. \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Succeeded** \
 * **Canceled** \
 * **Failed**
 */
export type OperationStatus = string;

/** The key vault server error. */
export interface ErrorModel {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The key vault server error. */
  readonly innerError?: ErrorModel;
}

/** An authentication method and location for the operation. */
export interface SASTokenParameter {
  /** Azure Blob storage container Uri */
  storageResourceUri: string;
  /** The SAS token pointing to an Azure Blob storage container */
  token?: string;
  /**
   * Indicates which authentication method should be used. If set to true, Managed
   * HSM will use the configured user-assigned managed identity to authenticate with
   * Azure Storage. Otherwise, a SAS token has to be specified.
   */
  useManagedIdentity?: boolean;
}

export function sASTokenParameterSerializer(
  item: SASTokenParameter,
): Record<string, unknown> {
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
  /**
   * Indicates which authentication method should be used. If set to true, Managed
   * HSM will use the configured user-assigned managed identity to authenticate with
   * Azure Storage. Otherwise, a SAS token has to be specified.
   */
  useManagedIdentity?: boolean;
}

export function preBackupOperationParametersSerializer(
  item: PreBackupOperationParameters,
): Record<string, unknown> {
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
  endTime?: Date;
}

/** The authentication method and location for the restore operation. */
export interface PreRestoreOperationParameters {
  /** A user-provided SAS token to an Azure blob storage container. */
  sasTokenParameters?: SASTokenParameter;
  /** The Folder name of the blob where the previous successful full backup was stored */
  folderToRestore?: string;
}

export function preRestoreOperationParametersSerializer(
  item: PreRestoreOperationParameters,
): Record<string, unknown> {
  return {
    sasTokenParameters: !item.sasTokenParameters
      ? item.sasTokenParameters
      : sASTokenParameterSerializer(item.sasTokenParameters),
    folderToRestore: item["folderToRestore"],
  };
}

/** The authentication method and location for the restore operation. */
export interface RestoreOperationParameters {
  /** A user-provided SAS token to an Azure blob storage container. */
  sasTokenParameters: SASTokenParameter;
  /** The Folder name of the blob where the previous successful full backup was stored */
  folderToRestore: string;
}

export function restoreOperationParametersSerializer(
  item: RestoreOperationParameters,
): Record<string, unknown> {
  return {
    sasTokenParameters: sASTokenParameterSerializer(item.sasTokenParameters),
    folderToRestore: item["folderToRestore"],
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
): Record<string, unknown> {
  return {
    sasTokenParameters: sASTokenParameterSerializer(item.sasTokenParameters),
    folder: item["folder"],
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
  endTime?: Date;
}

/** The update settings request object. */
export interface UpdateSettingRequest {
  /** The value of the pool setting. */
  value: string;
}

export function updateSettingRequestSerializer(
  item: UpdateSettingRequest,
): Record<string, unknown> {
  return {
    value: item["value"],
  };
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

/** Known values of {@link SettingTypeEnum} that the service accepts. */
export enum KnownSettingTypeEnum {
  /** boolean */
  boolean = "boolean",
}

/**
 * The type specifier of the value. \
 * {@link KnownSettingTypeEnum} can be used interchangeably with SettingTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **boolean**
 */
export type SettingTypeEnum = string;

/** The settings list result. */
export interface SettingsListResult {
  /**
   * A response message containing a list of account settings with their associated
   * value.
   */
  readonly settings?: Setting[];
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

/** Role assignment properties with scope. */
export interface RoleAssignmentPropertiesWithScope {
  /** The role scope. */
  scope?: RoleScope;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
}

/** Known values of {@link RoleScope} that the service accepts. */
export enum KnownRoleScope {
  /** Global */
  Global = "/",
  /** Keys */
  Keys = "/keys",
}

/**
 * The role scope. \
 * {@link KnownRoleScope} can be used interchangeably with RoleScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **\/** \
 * **\/keys**
 */
export type RoleScope = string;

/** Role assignment create parameters. */
export interface RoleAssignmentCreateParameters {
  /** Role assignment properties. */
  properties: RoleAssignmentProperties;
}

export function roleAssignmentCreateParametersSerializer(
  item: RoleAssignmentCreateParameters,
): Record<string, unknown> {
  return {
    properties: roleAssignmentPropertiesSerializer(item.properties),
  };
}

/** Role assignment properties. */
export interface RoleAssignmentProperties {
  /** The role definition ID used in the role assignment. */
  roleDefinitionId: string;
  /**
   * The principal ID assigned to the role. This maps to the ID inside the Active
   * Directory. It can point to a user, service principal, or security group.
   */
  principalId: string;
}

export function roleAssignmentPropertiesSerializer(
  item: RoleAssignmentProperties,
): Record<string, unknown> {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
  };
}

/** Role assignment list operation result. */
export interface _RoleAssignmentListResult {
  /** The RoleAssignment items on this page */
  value: RoleAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
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

/** Known values of {@link RoleDefinitionType} that the service accepts. */
export enum KnownRoleDefinitionType {
  /** Microsoft.Authorization/roleDefinitions */
  "Microsoft.Authorization/roleDefinitions" = "Microsoft.Authorization/roleDefinitions",
}

/**
 * The role definition type. \
 * {@link KnownRoleDefinitionType} can be used interchangeably with RoleDefinitionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Authorization\/roleDefinitions**
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

export function roleDefinitionPropertiesSerializer(
  item: RoleDefinitionProperties,
): Record<string, unknown> {
  return {
    roleName: item["roleName"],
    description: item["description"],
    type: item["roleType"],
    permissions:
      item["permissions"] === undefined
        ? item["permissions"]
        : item["permissions"].map(permissionSerializer),
    assignableScopes: item["assignableScopes"],
  };
}

/** Known values of {@link RoleType} that the service accepts. */
export enum KnownRoleType {
  /** BuiltInRole */
  BuiltInRole = "AKVBuiltInRole",
  /** CustomRole */
  CustomRole = "CustomRole",
}

/**
 * The role type. \
 * {@link KnownRoleType} can be used interchangeably with RoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKVBuiltInRole** \
 * **CustomRole**
 */
export type RoleType = string;

/** Role definition permissions. */
export interface Permission {
  /** Action permissions that are granted. */
  actions?: string[];
  /**
   * Action permissions that are excluded but not denied. They may be granted by
   * other role definitions assigned to a principal.
   */
  notActions?: string[];
  /** Data action permissions that are granted. */
  dataActions?: DataAction[];
  /**
   * Data action permissions that are excluded but not denied. They may be granted
   * by other role definitions assigned to a principal.
   */
  notDataActions?: DataAction[];
}

export function permissionSerializer(
  item: Permission,
): Record<string, unknown> {
  return {
    actions: item["actions"],
    notActions: item["notActions"],
    dataActions: item["dataActions"],
    notDataActions: item["notDataActions"],
  };
}

/** Known values of {@link DataAction} that the service accepts. */
export enum KnownDataAction {
  /** ReadHsmKey */
  ReadHsmKey = "Microsoft.KeyVault/managedHsm/keys/read/action",
  /** WriteHsmKey */
  WriteHsmKey = "Microsoft.KeyVault/managedHsm/keys/write/action",
  /** ReadDeletedHsmKey */
  ReadDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action",
  /** RecoverDeletedHsmKey */
  RecoverDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action",
  /** BackupHsmKeys */
  BackupHsmKeys = "Microsoft.KeyVault/managedHsm/keys/backup/action",
  /** RestoreHsmKeys */
  RestoreHsmKeys = "Microsoft.KeyVault/managedHsm/keys/restore/action",
  /** DeleteRoleAssignment */
  DeleteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/delete/action",
  /** GetRoleAssignment */
  GetRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/read/action",
  /** WriteRoleAssignment */
  WriteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/write/action",
  /** ReadRoleDefinition */
  ReadRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/read/action",
  /** WriteRoleDefinition */
  WriteRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/write/action",
  /** DeleteRoleDefinition */
  DeleteRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action",
  /** EncryptHsmKey */
  EncryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/encrypt/action",
  /** DecryptHsmKey */
  DecryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/decrypt/action",
  /** WrapHsmKey */
  WrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/wrap/action",
  /** UnwrapHsmKey */
  UnwrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/unwrap/action",
  /** SignHsmKey */
  SignHsmKey = "Microsoft.KeyVault/managedHsm/keys/sign/action",
  /** VerifyHsmKey */
  VerifyHsmKey = "Microsoft.KeyVault/managedHsm/keys/verify/action",
  /** CreateHsmKey */
  CreateHsmKey = "Microsoft.KeyVault/managedHsm/keys/create",
  /** DeleteHsmKey */
  DeleteHsmKey = "Microsoft.KeyVault/managedHsm/keys/delete",
  /** ExportHsmKey */
  ExportHsmKey = "Microsoft.KeyVault/managedHsm/keys/export/action",
  /** ReleaseKey */
  ReleaseKey = "Microsoft.KeyVault/managedHsm/keys/release/action",
  /** ImportHsmKey */
  ImportHsmKey = "Microsoft.KeyVault/managedHsm/keys/import/action",
  /** PurgeDeletedHsmKey */
  PurgeDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete",
  /** DownloadHsmSecurityDomain */
  DownloadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/download/action",
  /** DownloadHsmSecurityDomainStatus */
  DownloadHsmSecurityDomainStatus = "Microsoft.KeyVault/managedHsm/securitydomain/download/read",
  /** UploadHsmSecurityDomain */
  UploadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/upload/action",
  /** ReadHsmSecurityDomainStatus */
  ReadHsmSecurityDomainStatus = "Microsoft.KeyVault/managedHsm/securitydomain/upload/read",
  /** ReadHsmSecurityDomainTransferKey */
  ReadHsmSecurityDomainTransferKey = "Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read",
  /** StartHsmBackup */
  StartHsmBackup = "Microsoft.KeyVault/managedHsm/backup/start/action",
  /** StartHsmRestore */
  StartHsmRestore = "Microsoft.KeyVault/managedHsm/restore/start/action",
  /** ReadHsmBackupStatus */
  ReadHsmBackupStatus = "Microsoft.KeyVault/managedHsm/backup/status/action",
  /** ReadHsmRestoreStatus */
  ReadHsmRestoreStatus = "Microsoft.KeyVault/managedHsm/restore/status/action",
  /** RandomNumbersGenerate */
  RandomNumbersGenerate = "Microsoft.KeyVault/managedHsm/rng/action",
}

/**
 * Supported permissions for data actions. \
 * {@link KnownDataAction} can be used interchangeably with DataAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.KeyVault\/managedHsm\/keys\/read\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/write\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/read\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/recover\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/backup\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/restore\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/delete\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/read\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleAssignments\/write\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/read\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/write\/action** \
 * **Microsoft.KeyVault\/managedHsm\/roleDefinitions\/delete\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/encrypt\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/decrypt\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/wrap\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/unwrap\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/sign\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/verify\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/create** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/delete** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/export\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/release\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/import\/action** \
 * **Microsoft.KeyVault\/managedHsm\/keys\/deletedKeys\/delete** \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/download\/action** \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/download\/read** \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/upload\/action** \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/upload\/read** \
 * **Microsoft.KeyVault\/managedHsm\/securitydomain\/transferkey\/read** \
 * **Microsoft.KeyVault\/managedHsm\/backup\/start\/action** \
 * **Microsoft.KeyVault\/managedHsm\/restore\/start\/action** \
 * **Microsoft.KeyVault\/managedHsm\/backup\/status\/action** \
 * **Microsoft.KeyVault\/managedHsm\/restore\/status\/action** \
 * **Microsoft.KeyVault\/managedHsm\/rng\/action**
 */
export type DataAction = string;

/** Role definition create parameters. */
export interface RoleDefinitionCreateParameters {
  /** Role definition properties. */
  properties: RoleDefinitionProperties;
}

export function roleDefinitionCreateParametersSerializer(
  item: RoleDefinitionCreateParameters,
): Record<string, unknown> {
  return {
    properties: roleDefinitionPropertiesSerializer(item.properties),
  };
}

/** Role definition list operation result. */
export interface _RoleDefinitionListResult {
  /** The RoleDefinition items on this page */
  value: RoleDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The available API versions. */
export type Versions = "7.5" | "7.6-preview.1";

/** The key vault error exception. */
export interface KeyVaultError {
  /** The key vault server error. */
  readonly error?: ErrorModel;
}
