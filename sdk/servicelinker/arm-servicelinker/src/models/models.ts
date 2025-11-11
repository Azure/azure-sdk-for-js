// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and (de)serializers.
 * Disable this rule for deserializer functions which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** a dryrun job resource */
export interface DryrunResource extends ExtensionResource {
  /** The properties of the dryrun job. */
  properties?: DryrunProperties;
}

export function dryrunResourceSerializer(item: DryrunResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dryrunPropertiesSerializer(item["properties"]),
  };
}

export function dryrunResourceDeserializer(item: any): DryrunResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dryrunPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the dryrun job */
export interface DryrunProperties {
  /** The parameters of the dryrun */
  parameters?: DryrunParametersUnion;
  /** the result of the dryrun */
  readonly prerequisiteResults?: DryrunPrerequisiteResultUnion[];
  /** the preview of the operations for creation */
  readonly operationPreviews?: DryrunOperationPreview[];
  /** The provisioning state. */
  readonly provisioningState?: string;
}

export function dryrunPropertiesSerializer(item: DryrunProperties): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : dryrunParametersUnionSerializer(item["parameters"]),
  };
}

export function dryrunPropertiesDeserializer(item: any): DryrunProperties {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : dryrunParametersUnionDeserializer(item["parameters"]),
    prerequisiteResults: !item["prerequisiteResults"]
      ? item["prerequisiteResults"]
      : dryrunPrerequisiteResultUnionArrayDeserializer(item["prerequisiteResults"]),
    operationPreviews: !item["operationPreviews"]
      ? item["operationPreviews"]
      : dryrunOperationPreviewArrayDeserializer(item["operationPreviews"]),
    provisioningState: item["provisioningState"],
  };
}

/** The parameters of the dryrun */
export interface DryrunParameters {
  /** The name of action for you dryrun job. */
  /** The discriminator possible values: createOrUpdate */
  actionName: DryrunActionName;
}

export function dryrunParametersSerializer(item: DryrunParameters): any {
  return { actionName: item["actionName"] };
}

export function dryrunParametersDeserializer(item: any): DryrunParameters {
  return {
    actionName: item["actionName"],
  };
}

/** Alias for DryrunParametersUnion */
export type DryrunParametersUnion = CreateOrUpdateDryrunParameters | DryrunParameters;

export function dryrunParametersUnionSerializer(item: DryrunParametersUnion): any {
  switch (item.actionName) {
    case "createOrUpdate":
      return createOrUpdateDryrunParametersSerializer(item as CreateOrUpdateDryrunParameters);

    default:
      return dryrunParametersSerializer(item);
  }
}

export function dryrunParametersUnionDeserializer(item: any): DryrunParametersUnion {
  switch (item.actionName) {
    case "createOrUpdate":
      return createOrUpdateDryrunParametersDeserializer(item as CreateOrUpdateDryrunParameters);

    default:
      return dryrunParametersDeserializer(item);
  }
}

/** The name of action for you dryrun job. */
export enum KnownDryrunActionName {
  /** createOrUpdate */
  CreateOrUpdate = "createOrUpdate",
}

/**
 * The name of action for you dryrun job. \
 * {@link KnownDryrunActionName} can be used interchangeably with DryrunActionName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **createOrUpdate**
 */
export type DryrunActionName = string;

/** The dryrun parameters for creation or update a linker */
export interface CreateOrUpdateDryrunParameters extends DryrunParameters {
  /** The target service properties */
  targetService?: TargetServiceBaseUnion;
  /** The authentication type. */
  authInfo?: AuthInfoBaseUnion;
  /** The application client type */
  clientType?: ClientType;
  /** The provisioning state. */
  readonly provisioningState?: string;
  /** The VNet solution. */
  vNetSolution?: VNetSolution | null;
  /** An option to store secret value in secure place */
  secretStore?: SecretStore | null;
  /** connection scope in source service. */
  scope?: string | null;
  /** The network solution. */
  publicNetworkSolution?: PublicNetworkSolution | null;
  /** The connection information consumed by applications, including secrets, connection strings. */
  configurationInfo?: ConfigurationInfo | null;
  /** The name of action for you dryrun job. */
  actionName: "createOrUpdate";
}

export function createOrUpdateDryrunParametersSerializer(
  item: CreateOrUpdateDryrunParameters,
): any {
  return {
    actionName: item["actionName"],
    targetService: !item["targetService"]
      ? item["targetService"]
      : targetServiceBaseUnionSerializer(item["targetService"]),
    authInfo: !item["authInfo"] ? item["authInfo"] : authInfoBaseUnionSerializer(item["authInfo"]),
    clientType: item["clientType"],
    vNetSolution: !item["vNetSolution"]
      ? item["vNetSolution"]
      : vNetSolutionSerializer(item["vNetSolution"]),
    secretStore: !item["secretStore"]
      ? item["secretStore"]
      : secretStoreSerializer(item["secretStore"]),
    scope: item["scope"],
    publicNetworkSolution: !item["publicNetworkSolution"]
      ? item["publicNetworkSolution"]
      : publicNetworkSolutionSerializer(item["publicNetworkSolution"]),
    configurationInfo: !item["configurationInfo"]
      ? item["configurationInfo"]
      : configurationInfoSerializer(item["configurationInfo"]),
  };
}

export function createOrUpdateDryrunParametersDeserializer(
  item: any,
): CreateOrUpdateDryrunParameters {
  return {
    actionName: item["actionName"],
    targetService: !item["targetService"]
      ? item["targetService"]
      : targetServiceBaseUnionDeserializer(item["targetService"]),
    authInfo: !item["authInfo"]
      ? item["authInfo"]
      : authInfoBaseUnionDeserializer(item["authInfo"]),
    clientType: item["clientType"],
    provisioningState: item["provisioningState"],
    vNetSolution: !item["vNetSolution"]
      ? item["vNetSolution"]
      : vNetSolutionDeserializer(item["vNetSolution"]),
    secretStore: !item["secretStore"]
      ? item["secretStore"]
      : secretStoreDeserializer(item["secretStore"]),
    scope: item["scope"],
    publicNetworkSolution: !item["publicNetworkSolution"]
      ? item["publicNetworkSolution"]
      : publicNetworkSolutionDeserializer(item["publicNetworkSolution"]),
    configurationInfo: !item["configurationInfo"]
      ? item["configurationInfo"]
      : configurationInfoDeserializer(item["configurationInfo"]),
  };
}

/** The target service properties */
export interface TargetServiceBase {
  /** The target service type. */
  /** The discriminator possible values: AzureResource, ConfluentBootstrapServer, FabricPlatform, SelfHostedServer, ConfluentSchemaRegistry */
  type: TargetServiceType;
}

export function targetServiceBaseSerializer(item: TargetServiceBase): any {
  return { type: item["type"] };
}

export function targetServiceBaseDeserializer(item: any): TargetServiceBase {
  return {
    type: item["type"],
  };
}

/** Alias for TargetServiceBaseUnion */
export type TargetServiceBaseUnion =
  | AzureResource
  | ConfluentBootstrapServer
  | FabricPlatform
  | SelfHostedServer
  | ConfluentSchemaRegistry
  | TargetServiceBase;

export function targetServiceBaseUnionSerializer(item: TargetServiceBaseUnion): any {
  switch (item.type) {
    case "AzureResource":
      return azureResourceSerializer(item as AzureResource);

    case "ConfluentBootstrapServer":
      return confluentBootstrapServerSerializer(item as ConfluentBootstrapServer);

    case "FabricPlatform":
      return fabricPlatformSerializer(item as FabricPlatform);

    case "SelfHostedServer":
      return selfHostedServerSerializer(item as SelfHostedServer);

    case "ConfluentSchemaRegistry":
      return confluentSchemaRegistrySerializer(item as ConfluentSchemaRegistry);

    default:
      return targetServiceBaseSerializer(item);
  }
}

export function targetServiceBaseUnionDeserializer(item: any): TargetServiceBaseUnion {
  switch (item.type) {
    case "AzureResource":
      return azureResourceDeserializer(item as AzureResource);

    case "ConfluentBootstrapServer":
      return confluentBootstrapServerDeserializer(item as ConfluentBootstrapServer);

    case "FabricPlatform":
      return fabricPlatformDeserializer(item as FabricPlatform);

    case "SelfHostedServer":
      return selfHostedServerDeserializer(item as SelfHostedServer);

    case "ConfluentSchemaRegistry":
      return confluentSchemaRegistryDeserializer(item as ConfluentSchemaRegistry);

    default:
      return targetServiceBaseDeserializer(item);
  }
}

/** The target service type. */
export enum KnownTargetServiceType {
  /** AzureResource */
  AzureResource = "AzureResource",
  /** ConfluentBootstrapServer */
  ConfluentBootstrapServer = "ConfluentBootstrapServer",
  /** ConfluentSchemaRegistry */
  ConfluentSchemaRegistry = "ConfluentSchemaRegistry",
  /** SelfHostedServer */
  SelfHostedServer = "SelfHostedServer",
  /** FabricPlatform */
  FabricPlatform = "FabricPlatform",
}

/**
 * The target service type. \
 * {@link KnownTargetServiceType} can be used interchangeably with TargetServiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureResource** \
 * **ConfluentBootstrapServer** \
 * **ConfluentSchemaRegistry** \
 * **SelfHostedServer** \
 * **FabricPlatform**
 */
export type TargetServiceType = string;

/** The azure resource info when target service type is AzureResource */
export interface AzureResource extends TargetServiceBase {
  /** The Id of azure resource. */
  id?: string;
  /** The azure resource connection related properties. */
  resourceProperties?: AzureResourcePropertiesBaseUnion | null;
  /** The target service type. */
  type: "AzureResource";
}

export function azureResourceSerializer(item: AzureResource): any {
  return {
    type: item["type"],
    id: item["id"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : azureResourcePropertiesBaseUnionSerializer(item["resourceProperties"]),
  };
}

export function azureResourceDeserializer(item: any): AzureResource {
  return {
    type: item["type"],
    id: item["id"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : azureResourcePropertiesBaseUnionDeserializer(item["resourceProperties"]),
  };
}

/** The azure resource properties */
export interface AzureResourcePropertiesBase {
  /** The azure resource type. */
  /** The discriminator possible values: KeyVault, AppConfig */
  type: AzureResourceType;
}

export function azureResourcePropertiesBaseSerializer(item: AzureResourcePropertiesBase): any {
  return { type: item["type"] };
}

export function azureResourcePropertiesBaseDeserializer(item: any): AzureResourcePropertiesBase {
  return {
    type: item["type"],
  };
}

/** Alias for AzureResourcePropertiesBaseUnion */
export type AzureResourcePropertiesBaseUnion =
  | AzureKeyVaultProperties
  | AzureAppConfigProperties
  | AzureResourcePropertiesBase;

export function azureResourcePropertiesBaseUnionSerializer(
  item: AzureResourcePropertiesBaseUnion,
): any {
  switch (item.type) {
    case "KeyVault":
      return azureKeyVaultPropertiesSerializer(item as AzureKeyVaultProperties);

    case "AppConfig":
      return azureAppConfigPropertiesSerializer(item as AzureAppConfigProperties);

    default:
      return azureResourcePropertiesBaseSerializer(item);
  }
}

export function azureResourcePropertiesBaseUnionDeserializer(
  item: any,
): AzureResourcePropertiesBaseUnion {
  switch (item.type) {
    case "KeyVault":
      return azureKeyVaultPropertiesDeserializer(item as AzureKeyVaultProperties);

    case "AppConfig":
      return azureAppConfigPropertiesDeserializer(item as AzureAppConfigProperties);

    default:
      return azureResourcePropertiesBaseDeserializer(item);
  }
}

/** The azure resource type. */
export enum KnownAzureResourceType {
  /** KeyVault */
  KeyVault = "KeyVault",
  /** AppConfig */
  AppConfig = "AppConfig",
}

/**
 * The azure resource type. \
 * {@link KnownAzureResourceType} can be used interchangeably with AzureResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KeyVault** \
 * **AppConfig**
 */
export type AzureResourceType = string;

/** The resource properties when type is Azure Key Vault */
export interface AzureKeyVaultProperties extends AzureResourcePropertiesBase {
  /** True if connect via Kubernetes CSI Driver. */
  connectAsKubernetesCsiDriver?: boolean | null;
  /** The azure resource type. */
  type: "KeyVault";
}

export function azureKeyVaultPropertiesSerializer(item: AzureKeyVaultProperties): any {
  return {
    type: item["type"],
    connectAsKubernetesCsiDriver: item["connectAsKubernetesCsiDriver"],
  };
}

export function azureKeyVaultPropertiesDeserializer(item: any): AzureKeyVaultProperties {
  return {
    type: item["type"],
    connectAsKubernetesCsiDriver: item["connectAsKubernetesCsiDriver"],
  };
}

/** The resource properties when type is Azure App Configuration */
export interface AzureAppConfigProperties extends AzureResourcePropertiesBase {
  /** True if connection enables app configuration kubernetes extension. */
  connectWithKubernetesExtension?: boolean | null;
  /** The azure resource type. */
  type: "AppConfig";
}

export function azureAppConfigPropertiesSerializer(item: AzureAppConfigProperties): any {
  return {
    type: item["type"],
    connectWithKubernetesExtension: item["connectWithKubernetesExtension"],
  };
}

export function azureAppConfigPropertiesDeserializer(item: any): AzureAppConfigProperties {
  return {
    type: item["type"],
    connectWithKubernetesExtension: item["connectWithKubernetesExtension"],
  };
}

/** The service properties when target service type is ConfluentBootstrapServer */
export interface ConfluentBootstrapServer extends TargetServiceBase {
  /** The endpoint of service. */
  endpoint?: string;
  /** The target service type. */
  type: "ConfluentBootstrapServer";
}

export function confluentBootstrapServerSerializer(item: ConfluentBootstrapServer): any {
  return { type: item["type"], endpoint: item["endpoint"] };
}

export function confluentBootstrapServerDeserializer(item: any): ConfluentBootstrapServer {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
  };
}

/** The service properties when target service type is FabricPlatform */
export interface FabricPlatform extends TargetServiceBase {
  /** The endpoint of service. */
  endpoint?: string;
  /** The target service type. */
  type: "FabricPlatform";
}

export function fabricPlatformSerializer(item: FabricPlatform): any {
  return { type: item["type"], endpoint: item["endpoint"] };
}

export function fabricPlatformDeserializer(item: any): FabricPlatform {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
  };
}

/** The service properties when target service type is SelfHostedServer */
export interface SelfHostedServer extends TargetServiceBase {
  /** The endpoint of service. */
  endpoint?: string;
  /** The target service type. */
  type: "SelfHostedServer";
}

export function selfHostedServerSerializer(item: SelfHostedServer): any {
  return { type: item["type"], endpoint: item["endpoint"] };
}

export function selfHostedServerDeserializer(item: any): SelfHostedServer {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
  };
}

/** The service properties when target service type is ConfluentSchemaRegistry */
export interface ConfluentSchemaRegistry extends TargetServiceBase {
  /** The endpoint of service. */
  endpoint?: string;
  /** The target service type. */
  type: "ConfluentSchemaRegistry";
}

export function confluentSchemaRegistrySerializer(item: ConfluentSchemaRegistry): any {
  return { type: item["type"], endpoint: item["endpoint"] };
}

export function confluentSchemaRegistryDeserializer(item: any): ConfluentSchemaRegistry {
  return {
    type: item["type"],
    endpoint: item["endpoint"],
  };
}

/** The authentication info */
export interface AuthInfoBase {
  /** The authentication type. */
  /** The discriminator possible values: accessKey, secret, userAssignedIdentity, systemAssignedIdentity, servicePrincipalSecret, servicePrincipalCertificate, userAccount, easyAuthMicrosoftEntraID */
  authType: AuthType;
  /** Optional. Indicates how to configure authentication. If optInAllAuth, service linker configures authentication such as enabling identity on source resource and granting RBAC roles. If optOutAllAuth, opt out authentication setup. Default is optInAllAuth. */
  authMode?: AuthMode;
}

export function authInfoBaseSerializer(item: AuthInfoBase): any {
  return { authType: item["authType"], authMode: item["authMode"] };
}

export function authInfoBaseDeserializer(item: any): AuthInfoBase {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
  };
}

/** Alias for AuthInfoBaseUnion */
export type AuthInfoBaseUnion =
  | AccessKeyInfoBase
  | SecretAuthInfo
  | UserAssignedIdentityAuthInfo
  | SystemAssignedIdentityAuthInfo
  | ServicePrincipalSecretAuthInfo
  | ServicePrincipalCertificateAuthInfo
  | UserAccountAuthInfo
  | EasyAuthMicrosoftEntraIDAuthInfo
  | AuthInfoBase;

export function authInfoBaseUnionSerializer(item: AuthInfoBaseUnion): any {
  switch (item.authType) {
    case "accessKey":
      return accessKeyInfoBaseSerializer(item as AccessKeyInfoBase);

    case "secret":
      return secretAuthInfoSerializer(item as SecretAuthInfo);

    case "userAssignedIdentity":
      return userAssignedIdentityAuthInfoSerializer(item as UserAssignedIdentityAuthInfo);

    case "systemAssignedIdentity":
      return systemAssignedIdentityAuthInfoSerializer(item as SystemAssignedIdentityAuthInfo);

    case "servicePrincipalSecret":
      return servicePrincipalSecretAuthInfoSerializer(item as ServicePrincipalSecretAuthInfo);

    case "servicePrincipalCertificate":
      return servicePrincipalCertificateAuthInfoSerializer(
        item as ServicePrincipalCertificateAuthInfo,
      );

    case "userAccount":
      return userAccountAuthInfoSerializer(item as UserAccountAuthInfo);

    case "easyAuthMicrosoftEntraID":
      return easyAuthMicrosoftEntraIDAuthInfoSerializer(item as EasyAuthMicrosoftEntraIDAuthInfo);

    default:
      return authInfoBaseSerializer(item);
  }
}

export function authInfoBaseUnionDeserializer(item: any): AuthInfoBaseUnion {
  switch (item.authType) {
    case "accessKey":
      return accessKeyInfoBaseDeserializer(item as AccessKeyInfoBase);

    case "secret":
      return secretAuthInfoDeserializer(item as SecretAuthInfo);

    case "userAssignedIdentity":
      return userAssignedIdentityAuthInfoDeserializer(item as UserAssignedIdentityAuthInfo);

    case "systemAssignedIdentity":
      return systemAssignedIdentityAuthInfoDeserializer(item as SystemAssignedIdentityAuthInfo);

    case "servicePrincipalSecret":
      return servicePrincipalSecretAuthInfoDeserializer(item as ServicePrincipalSecretAuthInfo);

    case "servicePrincipalCertificate":
      return servicePrincipalCertificateAuthInfoDeserializer(
        item as ServicePrincipalCertificateAuthInfo,
      );

    case "userAccount":
      return userAccountAuthInfoDeserializer(item as UserAccountAuthInfo);

    case "easyAuthMicrosoftEntraID":
      return easyAuthMicrosoftEntraIDAuthInfoDeserializer(item as EasyAuthMicrosoftEntraIDAuthInfo);

    default:
      return authInfoBaseDeserializer(item);
  }
}

/** The authentication type. */
export enum KnownAuthType {
  /** systemAssignedIdentity */
  SystemAssignedIdentity = "systemAssignedIdentity",
  /** userAssignedIdentity */
  UserAssignedIdentity = "userAssignedIdentity",
  /** servicePrincipalSecret */
  ServicePrincipalSecret = "servicePrincipalSecret",
  /** servicePrincipalCertificate */
  ServicePrincipalCertificate = "servicePrincipalCertificate",
  /** secret */
  Secret = "secret",
  /** accessKey */
  AccessKey = "accessKey",
  /** userAccount */
  UserAccount = "userAccount",
  /** easyAuthMicrosoftEntraID */
  EasyAuthMicrosoftEntraID = "easyAuthMicrosoftEntraID",
}

/**
 * The authentication type. \
 * {@link KnownAuthType} can be used interchangeably with AuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **systemAssignedIdentity** \
 * **userAssignedIdentity** \
 * **servicePrincipalSecret** \
 * **servicePrincipalCertificate** \
 * **secret** \
 * **accessKey** \
 * **userAccount** \
 * **easyAuthMicrosoftEntraID**
 */
export type AuthType = string;

/** Indicates how to apply the authentication configuration operations. */
export enum KnownAuthMode {
  /** Default authentication configuration according to the authentication type. */
  OptInAllAuth = "optInAllAuth",
  /** Skip all authentication configuration such as enabling managed identity and granting RBAC roles */
  OptOutAllAuth = "optOutAllAuth",
}

/**
 * Indicates how to apply the authentication configuration operations. \
 * {@link KnownAuthMode} can be used interchangeably with AuthMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **optInAllAuth**: Default authentication configuration according to the authentication type. \
 * **optOutAllAuth**: Skip all authentication configuration such as enabling managed identity and granting RBAC roles
 */
export type AuthMode = string;

/** The access key directly from target resource properties, which target service is Azure Resource, such as Microsoft.Storage */
export interface AccessKeyInfoBase extends AuthInfoBase {
  /** Permissions of the accessKey. `Read` and `Write` are for Azure Cosmos DB and Azure App Configuration, `Listen`, `Send` and `Manage` are for Azure Event Hub and Azure Service Bus. */
  permissions?: AccessKeyPermissions[];
  /** The authentication type. */
  authType: "accessKey";
}

export function accessKeyInfoBaseSerializer(item: AccessKeyInfoBase): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
  };
}

export function accessKeyInfoBaseDeserializer(item: any): AccessKeyInfoBase {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link AccessKeyPermissions} that the service accepts. */
export enum KnownAccessKeyPermissions {
  /** Read */
  Read = "Read",
  /** Write */
  Write = "Write",
  /** Listen */
  Listen = "Listen",
  /** Send */
  Send = "Send",
  /** Manage */
  Manage = "Manage",
}

/** Type of AccessKeyPermissions */
export type AccessKeyPermissions = string;

/** The authentication info when authType is secret */
export interface SecretAuthInfo extends AuthInfoBase {
  /** Username or account name for secret auth. */
  name?: string | null;
  /** Password or key vault secret for secret auth. */
  secretInfo?: SecretInfoBaseUnion | null;
  /** The authentication type. */
  authType: "secret";
}

export function secretAuthInfoSerializer(item: SecretAuthInfo): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    name: item["name"],
    secretInfo: !item["secretInfo"]
      ? item["secretInfo"]
      : secretInfoBaseUnionSerializer(item["secretInfo"]),
  };
}

export function secretAuthInfoDeserializer(item: any): SecretAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    name: item["name"],
    secretInfo: !item["secretInfo"]
      ? item["secretInfo"]
      : secretInfoBaseUnionDeserializer(item["secretInfo"]),
  };
}

/** The secret info */
export interface SecretInfoBase {
  /** The secret type. */
  /** The discriminator possible values: rawValue, keyVaultSecretReference, keyVaultSecretUri */
  secretType: SecretType;
}

export function secretInfoBaseSerializer(item: SecretInfoBase): any {
  return { secretType: item["secretType"] };
}

export function secretInfoBaseDeserializer(item: any): SecretInfoBase {
  return {
    secretType: item["secretType"],
  };
}

/** Alias for SecretInfoBaseUnion */
export type SecretInfoBaseUnion =
  | ValueSecretInfo
  | KeyVaultSecretReferenceSecretInfo
  | KeyVaultSecretUriSecretInfo
  | SecretInfoBase;

export function secretInfoBaseUnionSerializer(item: SecretInfoBaseUnion): any {
  switch (item.secretType) {
    case "rawValue":
      return valueSecretInfoSerializer(item as ValueSecretInfo);

    case "keyVaultSecretReference":
      return keyVaultSecretReferenceSecretInfoSerializer(item as KeyVaultSecretReferenceSecretInfo);

    case "keyVaultSecretUri":
      return keyVaultSecretUriSecretInfoSerializer(item as KeyVaultSecretUriSecretInfo);

    default:
      return secretInfoBaseSerializer(item);
  }
}

export function secretInfoBaseUnionDeserializer(item: any): SecretInfoBaseUnion {
  switch (item.secretType) {
    case "rawValue":
      return valueSecretInfoDeserializer(item as ValueSecretInfo);

    case "keyVaultSecretReference":
      return keyVaultSecretReferenceSecretInfoDeserializer(
        item as KeyVaultSecretReferenceSecretInfo,
      );

    case "keyVaultSecretUri":
      return keyVaultSecretUriSecretInfoDeserializer(item as KeyVaultSecretUriSecretInfo);

    default:
      return secretInfoBaseDeserializer(item);
  }
}

/** The secret type. */
export enum KnownSecretType {
  /** rawValue */
  RawValue = "rawValue",
  /** keyVaultSecretUri */
  KeyVaultSecretUri = "keyVaultSecretUri",
  /** keyVaultSecretReference */
  KeyVaultSecretReference = "keyVaultSecretReference",
}

/**
 * The secret type. \
 * {@link KnownSecretType} can be used interchangeably with SecretType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **rawValue** \
 * **keyVaultSecretUri** \
 * **keyVaultSecretReference**
 */
export type SecretType = string;

/** The secret info when type is rawValue. It's for scenarios that user input the secret. */
export interface ValueSecretInfo extends SecretInfoBase {
  /** The actual value of the secret. */
  value?: string | null;
  /** The secret type. */
  secretType: "rawValue";
}

export function valueSecretInfoSerializer(item: ValueSecretInfo): any {
  return { secretType: item["secretType"], value: item["value"] };
}

export function valueSecretInfoDeserializer(item: any): ValueSecretInfo {
  return {
    secretType: item["secretType"],
    value: item["value"],
  };
}

/** The secret info when type is keyVaultSecretReference. It's for scenario that user provides a secret stored in user's keyvault and source is Azure Kubernetes. The key Vault's resource id is linked to secretStore.keyVaultId. */
export interface KeyVaultSecretReferenceSecretInfo extends SecretInfoBase {
  /** Name of the Key Vault secret. */
  name?: string;
  /** Version of the Key Vault secret. */
  version?: string | null;
  /** The secret type. */
  secretType: "keyVaultSecretReference";
}

export function keyVaultSecretReferenceSecretInfoSerializer(
  item: KeyVaultSecretReferenceSecretInfo,
): any {
  return {
    secretType: item["secretType"],
    name: item["name"],
    version: item["version"],
  };
}

export function keyVaultSecretReferenceSecretInfoDeserializer(
  item: any,
): KeyVaultSecretReferenceSecretInfo {
  return {
    secretType: item["secretType"],
    name: item["name"],
    version: item["version"],
  };
}

/** The secret info when type is keyVaultSecretUri. It's for scenario that user provides a secret stored in user's keyvault and source is Web App, Spring Cloud or Container App. */
export interface KeyVaultSecretUriSecretInfo extends SecretInfoBase {
  /** URI to the keyvault secret */
  value?: string;
  /** The secret type. */
  secretType: "keyVaultSecretUri";
}

export function keyVaultSecretUriSecretInfoSerializer(item: KeyVaultSecretUriSecretInfo): any {
  return { secretType: item["secretType"], value: item["value"] };
}

export function keyVaultSecretUriSecretInfoDeserializer(item: any): KeyVaultSecretUriSecretInfo {
  return {
    secretType: item["secretType"],
    value: item["value"],
  };
}

/** The authentication info when authType is userAssignedIdentity */
export interface UserAssignedIdentityAuthInfo extends AuthInfoBase {
  /** Username created in the database which is mapped to a user in AAD. */
  userName?: string | null;
  /** Client Id for userAssignedIdentity. */
  clientId?: string;
  /** Subscription id for userAssignedIdentity. */
  subscriptionId?: string;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, this value specifies the Azure role to be assigned */
  roles?: string[];
  /** The authentication type. */
  authType: "userAssignedIdentity";
}

export function userAssignedIdentityAuthInfoSerializer(item: UserAssignedIdentityAuthInfo): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    clientId: item["clientId"],
    subscriptionId: item["subscriptionId"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function userAssignedIdentityAuthInfoDeserializer(item: any): UserAssignedIdentityAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    clientId: item["clientId"],
    subscriptionId: item["subscriptionId"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The cleanup behavior to indicate whether clean up operation when resource is deleted or updated */
export enum KnownDeleteOrUpdateBehavior {
  /** Default */
  Default = "Default",
  /** ForcedCleanup */
  ForcedCleanup = "ForcedCleanup",
}

/**
 * The cleanup behavior to indicate whether clean up operation when resource is deleted or updated \
 * {@link KnownDeleteOrUpdateBehavior} can be used interchangeably with DeleteOrUpdateBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **ForcedCleanup**
 */
export type DeleteOrUpdateBehavior = string;

/** The authentication info when authType is systemAssignedIdentity */
export interface SystemAssignedIdentityAuthInfo extends AuthInfoBase {
  /** Username created in the database which is mapped to a user in AAD. */
  userName?: string | null;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, this value specifies the Azure role to be assigned */
  roles?: string[];
  /** The authentication type. */
  authType: "systemAssignedIdentity";
}

export function systemAssignedIdentityAuthInfoSerializer(
  item: SystemAssignedIdentityAuthInfo,
): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function systemAssignedIdentityAuthInfoDeserializer(
  item: any,
): SystemAssignedIdentityAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication info when authType is servicePrincipal secret */
export interface ServicePrincipalSecretAuthInfo extends AuthInfoBase {
  /** Username created in the database which is mapped to a user in AAD. */
  userName?: string | null;
  /** ServicePrincipal application clientId for servicePrincipal auth. */
  clientId: string;
  /** Principal Id for servicePrincipal auth. */
  principalId: string;
  /** Secret for servicePrincipal auth. */
  secret: string;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, this value specifies the Azure roles to be assigned. Automatically */
  roles?: string[];
  /** The authentication type. */
  authType: "servicePrincipalSecret";
}

export function servicePrincipalSecretAuthInfoSerializer(
  item: ServicePrincipalSecretAuthInfo,
): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    secret: item["secret"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function servicePrincipalSecretAuthInfoDeserializer(
  item: any,
): ServicePrincipalSecretAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    secret: item["secret"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication info when authType is servicePrincipal certificate */
export interface ServicePrincipalCertificateAuthInfo extends AuthInfoBase {
  /** Application clientId for servicePrincipal auth. */
  clientId: string;
  /** Principal Id for servicePrincipal auth. */
  principalId: string;
  /** ServicePrincipal certificate for servicePrincipal auth. */
  certificate: string;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, this value specifies the Azure roles to be assigned. Automatically */
  roles?: string[];
  /** The authentication type. */
  authType: "servicePrincipalCertificate";
}

export function servicePrincipalCertificateAuthInfoSerializer(
  item: ServicePrincipalCertificateAuthInfo,
): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    certificate: item["certificate"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function servicePrincipalCertificateAuthInfoDeserializer(
  item: any,
): ServicePrincipalCertificateAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    certificate: item["certificate"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication info when authType is user account */
export interface UserAccountAuthInfo extends AuthInfoBase {
  /** Username created in the database which is mapped to a user in AAD. */
  userName?: string | null;
  /** Principal Id for user account. */
  principalId?: string;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, this value specifies the Azure roles to be assigned. Automatically */
  roles?: string[];
  /** The authentication type. */
  authType: "userAccount";
}

export function userAccountAuthInfoSerializer(item: UserAccountAuthInfo): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    principalId: item["principalId"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function userAccountAuthInfoDeserializer(item: any): UserAccountAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    userName: item["userName"],
    principalId: item["principalId"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication info when authType is EasyAuth Microsoft Entra ID */
export interface EasyAuthMicrosoftEntraIDAuthInfo extends AuthInfoBase {
  /** Application clientId for EasyAuth Microsoft Entra ID. */
  clientId?: string;
  /** Application Secret for EasyAuth Microsoft Entra ID. */
  secret?: string;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** The authentication type. */
  authType: "easyAuthMicrosoftEntraID";
}

export function easyAuthMicrosoftEntraIDAuthInfoSerializer(
  item: EasyAuthMicrosoftEntraIDAuthInfo,
): any {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    clientId: item["clientId"],
    secret: item["secret"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
  };
}

export function easyAuthMicrosoftEntraIDAuthInfoDeserializer(
  item: any,
): EasyAuthMicrosoftEntraIDAuthInfo {
  return {
    authType: item["authType"],
    authMode: item["authMode"],
    clientId: item["clientId"],
    secret: item["secret"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
  };
}

/** The application client type */
export enum KnownClientType {
  /** none */
  None = "none",
  /** dotnet */
  Dotnet = "dotnet",
  /** java */
  Java = "java",
  /** python */
  Python = "python",
  /** go */
  Go = "go",
  /** php */
  Php = "php",
  /** ruby */
  Ruby = "ruby",
  /** django */
  Django = "django",
  /** nodejs */
  Nodejs = "nodejs",
  /** springBoot */
  SpringBoot = "springBoot",
  /** kafka-springBoot */
  KafkaSpringBoot = "kafka-springBoot",
  /** jms-springBoot */
  JmsSpringBoot = "jms-springBoot",
  /** dapr */
  Dapr = "dapr",
}

/**
 * The application client type \
 * {@link KnownClientType} can be used interchangeably with ClientType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none** \
 * **dotnet** \
 * **java** \
 * **python** \
 * **go** \
 * **php** \
 * **ruby** \
 * **django** \
 * **nodejs** \
 * **springBoot** \
 * **kafka-springBoot** \
 * **jms-springBoot** \
 * **dapr**
 */
export type ClientType = string;

/** The VNet solution for linker */
export interface VNetSolution {
  /** Type of VNet solution. */
  type?: VNetSolutionType | null;
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
}

export function vNetSolutionSerializer(item: VNetSolution): any {
  return {
    type: item["type"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
  };
}

export function vNetSolutionDeserializer(item: any): VNetSolution {
  return {
    type: item["type"],
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
  };
}

/** Type of VNet solution. */
export enum KnownVNetSolutionType {
  /** serviceEndpoint */
  ServiceEndpoint = "serviceEndpoint",
  /** privateLink */
  PrivateLink = "privateLink",
}

/**
 * Type of VNet solution. \
 * {@link KnownVNetSolutionType} can be used interchangeably with VNetSolutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **serviceEndpoint** \
 * **privateLink**
 */
export type VNetSolutionType = string;

/** An option to store secret value in secure place */
export interface SecretStore {
  /** The key vault id to store secret */
  keyVaultId?: string | null;
  /** The key vault secret name to store secret, only valid when storing one secret */
  keyVaultSecretName?: string | null;
}

export function secretStoreSerializer(item: SecretStore): any {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
  };
}

export function secretStoreDeserializer(item: any): SecretStore {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
  };
}

/** Indicates public network solution, include firewall rules */
export interface PublicNetworkSolution {
  /** Indicates whether to clean up previous operation(such as firewall rules) when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional. Indicates public network solution. If enable, enable public network access of target service with best try. Default is enable. If optOut, opt out public network access configuration. */
  action?: ActionTypeFlag;
  /** Describe firewall rules of target service to make sure source application could connect to the target. */
  firewallRules?: FirewallRules;
}

export function publicNetworkSolutionSerializer(item: PublicNetworkSolution): any {
  return {
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    action: item["action"],
    firewallRules: !item["firewallRules"]
      ? item["firewallRules"]
      : firewallRulesSerializer(item["firewallRules"]),
  };
}

export function publicNetworkSolutionDeserializer(item: any): PublicNetworkSolution {
  return {
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    action: item["action"],
    firewallRules: !item["firewallRules"]
      ? item["firewallRules"]
      : firewallRulesDeserializer(item["firewallRules"]),
  };
}

/** Known values of {@link ActionTypeFlag} that the service accepts. */
export enum KnownActionTypeFlag {
  /** Actions are for internal-only APIs. */
  Enable = "enable",
  /** optOut */
  OptOut = "optOut",
}

/** Type of ActionTypeFlag */
export type ActionTypeFlag = string;

/** Target service's firewall rules. to allow connections from source service. */
export interface FirewallRules {
  /** This value specifies the set of IP addresses or IP address ranges in CIDR form to be included as the allowed list of client IPs for a given database account. */
  ipRanges?: string[];
  /** Allow Azure services to access the target service if true. */
  azureServices?: AllowType;
  /** Allow caller client IP to access the target service if true. the property is used when connecting local application to target service. */
  callerClientIP?: AllowType;
}

export function firewallRulesSerializer(item: FirewallRules): any {
  return {
    ipRanges: !item["ipRanges"]
      ? item["ipRanges"]
      : item["ipRanges"].map((p: any) => {
          return p;
        }),
    azureServices: item["azureServices"],
    callerClientIP: item["callerClientIP"],
  };
}

export function firewallRulesDeserializer(item: any): FirewallRules {
  return {
    ipRanges: !item["ipRanges"]
      ? item["ipRanges"]
      : item["ipRanges"].map((p: any) => {
          return p;
        }),
    azureServices: item["azureServices"],
    callerClientIP: item["callerClientIP"],
  };
}

/** Whether to allow firewall rules. */
export enum KnownAllowType {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/**
 * Whether to allow firewall rules. \
 * {@link KnownAllowType} can be used interchangeably with AllowType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true** \
 * **false**
 */
export type AllowType = string;

/** The configuration information, used to generate configurations or save to applications */
export interface ConfigurationInfo {
  /** Indicates whether to clean up previous operation when Linker is updating or deleting */
  deleteOrUpdateBehavior?: DeleteOrUpdateBehavior;
  /** Optional, indicate whether to apply configurations on source application. If enable, generate configurations and applied to the source application. Default is enable. If optOut, no configuration change will be made on source. */
  action?: ActionTypeFlag;
  /** Optional. A dictionary of default key name and customized key name mapping. If not specified, default key name will be used for generate configurations */
  customizedKeys?: Record<string, string>;
  /** Indicates some additional properties for dapr client type */
  daprProperties?: DaprProperties;
  /** A dictionary of additional configurations to be added. Service will auto generate a set of basic configurations and this property is to full fill more customized configurations */
  additionalConfigurations?: Record<string, string>;
  /** A dictionary of additional properties to be added in the end of connection string. */
  additionalConnectionStringProperties?: Record<string, string>;
  /** An option to store configuration into different place */
  configurationStore?: ConfigurationStore | null;
}

export function configurationInfoSerializer(item: ConfigurationInfo): any {
  return {
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    action: item["action"],
    customizedKeys: item["customizedKeys"],
    daprProperties: !item["daprProperties"]
      ? item["daprProperties"]
      : daprPropertiesSerializer(item["daprProperties"]),
    additionalConfigurations: item["additionalConfigurations"],
    additionalConnectionStringProperties: item["additionalConnectionStringProperties"],
    configurationStore: !item["configurationStore"]
      ? item["configurationStore"]
      : configurationStoreSerializer(item["configurationStore"]),
  };
}

export function configurationInfoDeserializer(item: any): ConfigurationInfo {
  return {
    deleteOrUpdateBehavior: item["deleteOrUpdateBehavior"],
    action: item["action"],
    customizedKeys: item["customizedKeys"],
    daprProperties: !item["daprProperties"]
      ? item["daprProperties"]
      : daprPropertiesDeserializer(item["daprProperties"]),
    additionalConfigurations: item["additionalConfigurations"],
    additionalConnectionStringProperties: item["additionalConnectionStringProperties"],
    configurationStore: !item["configurationStore"]
      ? item["configurationStore"]
      : configurationStoreDeserializer(item["configurationStore"]),
  };
}

/** Indicates some additional properties for dapr client type */
export interface DaprProperties {
  /** The dapr component version */
  version?: string | null;
  /** The dapr component type */
  componentType?: string | null;
  /** The name of a secret store dapr to retrieve secret */
  secretStoreComponent?: string | null;
  /** Additional dapr metadata */
  metadata?: DaprMetadata[];
  /** The dapr component scopes */
  scopes?: string[];
  /** The runtime version supported by the properties */
  readonly runtimeVersion?: string | null;
  /** The direction supported by the dapr binding component */
  readonly bindingComponentDirection?: DaprBindingComponentDirection | null;
}

export function daprPropertiesSerializer(item: DaprProperties): any {
  return {
    version: item["version"],
    componentType: item["componentType"],
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"] ? item["metadata"] : daprMetadataArraySerializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function daprPropertiesDeserializer(item: any): DaprProperties {
  return {
    version: item["version"],
    componentType: item["componentType"],
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : daprMetadataArrayDeserializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    runtimeVersion: item["runtimeVersion"],
    bindingComponentDirection: item["bindingComponentDirection"],
  };
}

export function daprMetadataArraySerializer(result: Array<DaprMetadata>): any[] {
  return result.map((item) => {
    return daprMetadataSerializer(item);
  });
}

export function daprMetadataArrayDeserializer(result: Array<DaprMetadata>): any[] {
  return result.map((item) => {
    return daprMetadataDeserializer(item);
  });
}

/** The dapr component metadata. */
export interface DaprMetadata {
  /** Metadata property name. */
  name?: string;
  /** Metadata property value. */
  value?: string;
  /** The secret name where dapr could get value */
  secretRef?: string;
  /** The description of the metadata, returned from configuration api */
  description?: string;
  /** The value indicating whether the metadata is required or not */
  required?: DaprMetadataRequired;
}

export function daprMetadataSerializer(item: DaprMetadata): any {
  return {
    name: item["name"],
    value: item["value"],
    secretRef: item["secretRef"],
    description: item["description"],
    required: item["required"],
  };
}

export function daprMetadataDeserializer(item: any): DaprMetadata {
  return {
    name: item["name"],
    value: item["value"],
    secretRef: item["secretRef"],
    description: item["description"],
    required: item["required"],
  };
}

/** The value indicating whether the metadata is required or not */
export enum KnownDaprMetadataRequired {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/**
 * The value indicating whether the metadata is required or not \
 * {@link KnownDaprMetadataRequired} can be used interchangeably with DaprMetadataRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true** \
 * **false**
 */
export type DaprMetadataRequired = string;

/** The direction supported by the dapr binding component */
export enum KnownDaprBindingComponentDirection {
  /** input */
  Input = "input",
  /** output */
  Output = "output",
}

/**
 * The direction supported by the dapr binding component \
 * {@link KnownDaprBindingComponentDirection} can be used interchangeably with DaprBindingComponentDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **input** \
 * **output**
 */
export type DaprBindingComponentDirection = string;

/** An option to store configuration into different place */
export interface ConfigurationStore {
  /** The app configuration id to store configuration */
  appConfigurationId?: string | null;
}

export function configurationStoreSerializer(item: ConfigurationStore): any {
  return { appConfigurationId: item["appConfigurationId"] };
}

export function configurationStoreDeserializer(item: any): ConfigurationStore {
  return {
    appConfigurationId: item["appConfigurationId"],
  };
}

export function dryrunPrerequisiteResultUnionArrayDeserializer(
  result: Array<DryrunPrerequisiteResultUnion>,
): any[] {
  return result.map((item) => {
    return dryrunPrerequisiteResultUnionDeserializer(item);
  });
}

/** A result of dryrun */
export interface DryrunPrerequisiteResult {
  /** The type of dryrun result. */
  /** The discriminator possible values: basicError, permissionsMissing */
  type: DryrunPrerequisiteResultType;
}

export function dryrunPrerequisiteResultDeserializer(item: any): DryrunPrerequisiteResult {
  return {
    type: item["type"],
  };
}

/** Alias for DryrunPrerequisiteResultUnion */
export type DryrunPrerequisiteResultUnion =
  | BasicErrorDryrunPrerequisiteResult
  | PermissionsMissingDryrunPrerequisiteResult
  | DryrunPrerequisiteResult;

export function dryrunPrerequisiteResultUnionDeserializer(
  item: any,
): DryrunPrerequisiteResultUnion {
  switch (item.type) {
    case "basicError":
      return basicErrorDryrunPrerequisiteResultDeserializer(
        item as BasicErrorDryrunPrerequisiteResult,
      );

    case "permissionsMissing":
      return permissionsMissingDryrunPrerequisiteResultDeserializer(
        item as PermissionsMissingDryrunPrerequisiteResult,
      );

    default:
      return dryrunPrerequisiteResultDeserializer(item);
  }
}

/** The type of dryrun result. */
export enum KnownDryrunPrerequisiteResultType {
  /** basicError */
  BasicError = "basicError",
  /** permissionsMissing */
  PermissionsMissing = "permissionsMissing",
}

/**
 * The type of dryrun result. \
 * {@link KnownDryrunPrerequisiteResultType} can be used interchangeably with DryrunPrerequisiteResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **basicError** \
 * **permissionsMissing**
 */
export type DryrunPrerequisiteResultType = string;

/** The represent of basic error */
export interface BasicErrorDryrunPrerequisiteResult extends DryrunPrerequisiteResult {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The type of dryrun result. */
  type: "basicError";
}

export function basicErrorDryrunPrerequisiteResultDeserializer(
  item: any,
): BasicErrorDryrunPrerequisiteResult {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** The represent of missing permissions */
export interface PermissionsMissingDryrunPrerequisiteResult extends DryrunPrerequisiteResult {
  /** The permission scope */
  scope?: string;
  /** The permission list */
  permissions?: string[];
  /** The recommended role to resolve permissions missing */
  recommendedRole?: string;
  /** The type of dryrun result. */
  type: "permissionsMissing";
}

export function permissionsMissingDryrunPrerequisiteResultDeserializer(
  item: any,
): PermissionsMissingDryrunPrerequisiteResult {
  return {
    type: item["type"],
    scope: item["scope"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
    recommendedRole: item["recommendedRole"],
  };
}

export function dryrunOperationPreviewArrayDeserializer(
  result: Array<DryrunOperationPreview>,
): any[] {
  return result.map((item) => {
    return dryrunOperationPreviewDeserializer(item);
  });
}

/** The preview of the operations for creation */
export interface DryrunOperationPreview {
  /** The operation name */
  name?: string;
  /** The operation type */
  operationType?: DryrunPreviewOperationType;
  /** The description of the operation */
  description?: string;
  /** The action defined by RBAC, refer https://docs.microsoft.com/azure/role-based-access-control/role-definitions#actions-format */
  action?: string;
  /** The scope of the operation, refer https://docs.microsoft.com/azure/role-based-access-control/scope-overview */
  scope?: string;
}

export function dryrunOperationPreviewDeserializer(item: any): DryrunOperationPreview {
  return {
    name: item["name"],
    operationType: item["operationType"],
    description: item["description"],
    action: item["action"],
    scope: item["scope"],
  };
}

/** The operation type */
export enum KnownDryrunPreviewOperationType {
  /** configConnection */
  ConfigConnection = "configConnection",
  /** configNetwork */
  ConfigNetwork = "configNetwork",
  /** configAuth */
  ConfigAuth = "configAuth",
}

/**
 * The operation type \
 * {@link KnownDryrunPreviewOperationType} can be used interchangeably with DryrunPreviewOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **configConnection** \
 * **configNetwork** \
 * **configAuth**
 */
export type DryrunPreviewOperationType = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** a dryrun job to be updated. */
export interface DryrunPatch {
  /** The properties of the dryrun job. */
  properties?: DryrunProperties;
}

export function dryrunPatchSerializer(item: DryrunPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dryrunPropertiesSerializer(item["properties"]),
  };
}

/** The list of dryrun. */
export interface _DryrunList {
  /** The DryrunResource items on this page */
  value?: DryrunResource[];
  /** The link to the next page of items */
  nextLink?: string | null;
}

export function _dryrunListDeserializer(item: any): _DryrunList {
  return {
    value: !item["value"] ? item["value"] : dryrunResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dryrunResourceArraySerializer(result: Array<DryrunResource>): any[] {
  return result.map((item) => {
    return dryrunResourceSerializer(item);
  });
}

export function dryrunResourceArrayDeserializer(result: Array<DryrunResource>): any[] {
  return result.map((item) => {
    return dryrunResourceDeserializer(item);
  });
}

/** Configurations for source resource, include appSettings, connectionString and serviceBindings */
export interface ConfigurationResult {
  /** The configuration properties for source resource. */
  configurations?: SourceConfiguration[];
}

export function configurationResultDeserializer(item: any): ConfigurationResult {
  return {
    configurations: !item["configurations"]
      ? item["configurations"]
      : sourceConfigurationArrayDeserializer(item["configurations"]),
  };
}

export function sourceConfigurationArrayDeserializer(result: Array<SourceConfiguration>): any[] {
  return result.map((item) => {
    return sourceConfigurationDeserializer(item);
  });
}

/** A configuration item for source resource */
export interface SourceConfiguration {
  /** The name of setting. */
  name?: string;
  /** The value of setting */
  value?: string | null;
  /** The type of setting */
  readonly configType?: LinkerConfigurationType;
  /** The identity for key vault reference, system or user-assigned managed identity ID */
  keyVaultReferenceIdentity?: string | null;
  /** Descriptive information for the configuration */
  description?: string | null;
}

export function sourceConfigurationDeserializer(item: any): SourceConfiguration {
  return {
    name: item["name"],
    value: item["value"],
    configType: item["configType"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    description: item["description"],
  };
}

/** Type of configuration to determine whether the configuration can be modified after creation. KeyvaultSecret means the configuration references a key vault secret, such as App Service/ACA key vault reference. Default means the configuration is real value, such as user name, raw secret, etc. */
export enum KnownLinkerConfigurationType {
  /** Default */
  Default = "Default",
  /** KeyVaultSecret */
  KeyVaultSecret = "KeyVaultSecret",
}

/**
 * Type of configuration to determine whether the configuration can be modified after creation. KeyvaultSecret means the configuration references a key vault secret, such as App Service/ACA key vault reference. Default means the configuration is real value, such as user name, raw secret, etc. \
 * {@link KnownLinkerConfigurationType} can be used interchangeably with LinkerConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **KeyVaultSecret**
 */
export type LinkerConfigurationType = string;

/** Dapr configuration list supported by Service Connector */
export interface _DaprConfigurationList {
  /** The DaprConfigurationResource items on this page */
  value: DaprConfigurationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _daprConfigurationListDeserializer(item: any): _DaprConfigurationList {
  return {
    value: daprConfigurationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function daprConfigurationResourceArrayDeserializer(
  result: Array<DaprConfigurationResource>,
): any[] {
  return result.map((item) => {
    return daprConfigurationResourceDeserializer(item);
  });
}

/** Represent one resource of the dapr configuration list */
export interface DaprConfigurationResource {
  /** The properties of the dapr configuration. */
  properties?: DaprConfigurationProperties;
}

export function daprConfigurationResourceDeserializer(item: any): DaprConfigurationResource {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : daprConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DaprConfigurationProperties */
export interface DaprConfigurationProperties {
  /** Supported target resource type, extract from resource id, uppercase */
  targetType?: string;
  /** The authentication type. */
  authType?: AuthType;
  /** Indicates some additional properties for dapr client type */
  daprProperties?: DaprProperties;
}

export function daprConfigurationPropertiesDeserializer(item: any): DaprConfigurationProperties {
  return {
    targetType: item["targetType"],
    authType: item["authType"],
    daprProperties: !item["daprProperties"]
      ? item["daprProperties"]
      : daprPropertiesDeserializer(item["daprProperties"]),
  };
}

/** Linker of source and target resource */
export interface LinkerResource extends ExtensionResource {
  /** The properties of the Linker. */
  properties: LinkerProperties;
}

export function linkerResourceSerializer(item: LinkerResource): any {
  return { properties: linkerPropertiesSerializer(item["properties"]) };
}

export function linkerResourceDeserializer(item: any): LinkerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: linkerPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the Linker. */
export interface LinkerProperties {
  /** The target service properties */
  targetService?: TargetServiceBaseUnion;
  /** The authentication type. */
  authInfo?: AuthInfoBaseUnion;
  /** The application client type */
  clientType?: ClientType;
  /** The provisioning state. */
  readonly provisioningState?: string;
  /** The VNet solution. */
  vNetSolution?: VNetSolution | null;
  /** An option to store secret value in secure place */
  secretStore?: SecretStore | null;
  /** connection scope in source service. */
  scope?: string | null;
  /** The network solution. */
  publicNetworkSolution?: PublicNetworkSolution | null;
  /** The connection information consumed by applications, including secrets, connection strings. */
  configurationInfo?: ConfigurationInfo | null;
}

export function linkerPropertiesSerializer(item: LinkerProperties): any {
  return {
    targetService: !item["targetService"]
      ? item["targetService"]
      : targetServiceBaseUnionSerializer(item["targetService"]),
    authInfo: !item["authInfo"] ? item["authInfo"] : authInfoBaseUnionSerializer(item["authInfo"]),
    clientType: item["clientType"],
    vNetSolution: !item["vNetSolution"]
      ? item["vNetSolution"]
      : vNetSolutionSerializer(item["vNetSolution"]),
    secretStore: !item["secretStore"]
      ? item["secretStore"]
      : secretStoreSerializer(item["secretStore"]),
    scope: item["scope"],
    publicNetworkSolution: !item["publicNetworkSolution"]
      ? item["publicNetworkSolution"]
      : publicNetworkSolutionSerializer(item["publicNetworkSolution"]),
    configurationInfo: !item["configurationInfo"]
      ? item["configurationInfo"]
      : configurationInfoSerializer(item["configurationInfo"]),
  };
}

export function linkerPropertiesDeserializer(item: any): LinkerProperties {
  return {
    targetService: !item["targetService"]
      ? item["targetService"]
      : targetServiceBaseUnionDeserializer(item["targetService"]),
    authInfo: !item["authInfo"]
      ? item["authInfo"]
      : authInfoBaseUnionDeserializer(item["authInfo"]),
    clientType: item["clientType"],
    provisioningState: item["provisioningState"],
    vNetSolution: !item["vNetSolution"]
      ? item["vNetSolution"]
      : vNetSolutionDeserializer(item["vNetSolution"]),
    secretStore: !item["secretStore"]
      ? item["secretStore"]
      : secretStoreDeserializer(item["secretStore"]),
    scope: item["scope"],
    publicNetworkSolution: !item["publicNetworkSolution"]
      ? item["publicNetworkSolution"]
      : publicNetworkSolutionDeserializer(item["publicNetworkSolution"]),
    configurationInfo: !item["configurationInfo"]
      ? item["configurationInfo"]
      : configurationInfoDeserializer(item["configurationInfo"]),
  };
}

/** A Linker to be updated. */
export interface LinkerPatch {
  /** Linker properties */
  properties?: LinkerProperties;
}

export function linkerPatchSerializer(item: LinkerPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : linkerPropertiesSerializer(item["properties"]),
  };
}

/** The list of Linker. */
export interface _ResourceList {
  /** The LinkerResource items on this page */
  value?: LinkerResource[];
  /** The link to the next page of items */
  nextLink?: string | null;
}

export function _resourceListDeserializer(item: any): _ResourceList {
  return {
    value: !item["value"] ? item["value"] : linkerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function linkerResourceArraySerializer(result: Array<LinkerResource>): any[] {
  return result.map((item) => {
    return linkerResourceSerializer(item);
  });
}

export function linkerResourceArrayDeserializer(result: Array<LinkerResource>): any[] {
  return result.map((item) => {
    return linkerResourceDeserializer(item);
  });
}

/** The validation operation result for a Linker. */
export interface ValidateOperationResult {
  /** The validation result detail. */
  properties?: ValidateResult | null;
  /** Validated Linker id. */
  resourceId?: string | null;
  /** Validation operation status. */
  status?: string | null;
}

export function validateOperationResultDeserializer(item: any): ValidateOperationResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : validateResultDeserializer(item["properties"]),
    resourceId: item["resourceId"],
    status: item["status"],
  };
}

/** The validation result for a Linker. */
export interface ValidateResult {
  /** The linker name. */
  linkerName?: string | null;
  /** A boolean value indicating whether the connection is available or not */
  isConnectionAvailable?: boolean | null;
  /** The start time of the validation report. */
  reportStartTimeUtc?: Date | null;
  /** The end time of the validation report. */
  reportEndTimeUtc?: Date | null;
  /** The resource id of the Linker source application. */
  sourceId?: string | null;
  /** The resource Id of target service. */
  targetId?: string | null;
  /** The authentication type. */
  authType?: AuthType | null;
  /** The detail of validation result */
  validationDetail?: ValidationResultItem[];
}

export function validateResultDeserializer(item: any): ValidateResult {
  return {
    linkerName: item["linkerName"],
    isConnectionAvailable: item["isConnectionAvailable"],
    reportStartTimeUtc: !item["reportStartTimeUtc"]
      ? item["reportStartTimeUtc"]
      : new Date(item["reportStartTimeUtc"]),
    reportEndTimeUtc: !item["reportEndTimeUtc"]
      ? item["reportEndTimeUtc"]
      : new Date(item["reportEndTimeUtc"]),
    sourceId: item["sourceId"],
    targetId: item["targetId"],
    authType: item["authType"],
    validationDetail: !item["validationDetail"]
      ? item["validationDetail"]
      : validationResultItemArrayDeserializer(item["validationDetail"]),
  };
}

export function validationResultItemArrayDeserializer(result: Array<ValidationResultItem>): any[] {
  return result.map((item) => {
    return validationResultItemDeserializer(item);
  });
}

/** The validation item for a Linker. */
export interface ValidationResultItem {
  /** The validation item name. */
  name?: string;
  /** The display name of validation item */
  description?: string | null;
  /** The result of validation */
  result?: ValidationResultStatus | null;
  /** The error message of validation result */
  errorMessage?: string | null;
  /** The error code of validation result */
  errorCode?: string | null;
}

export function validationResultItemDeserializer(item: any): ValidationResultItem {
  return {
    name: item["name"],
    description: item["description"],
    result: item["result"],
    errorMessage: item["errorMessage"],
    errorCode: item["errorCode"],
  };
}

/** The result of validation */
export enum KnownValidationResultStatus {
  /** success */
  Success = "success",
  /** failure */
  Failure = "failure",
  /** warning */
  Warning = "warning",
}

/**
 * The result of validation \
 * {@link KnownValidationResultStatus} can be used interchangeably with ValidationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **success** \
 * **failure** \
 * **warning**
 */
export type ValidationResultStatus = string;

/** Configuration Name list which will be set based on different target resource, client type, auth type. */
export interface _ConfigurationNameResult {
  /** The ConfigurationNameItem items on this page */
  value: ConfigurationNameItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationNameResultDeserializer(item: any): _ConfigurationNameResult {
  return {
    value: configurationNameItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationNameItemArrayDeserializer(
  result: Array<ConfigurationNameItem>,
): any[] {
  return result.map((item) => {
    return configurationNameItemDeserializer(item);
  });
}

/** model interface ConfigurationNameItem */
export interface ConfigurationNameItem {
  /** The result detail. */
  properties?: ConfigurationNames | null;
}

export function configurationNameItemDeserializer(item: any): ConfigurationNameItem {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configurationNamesDeserializer(item["properties"]),
  };
}

/** The configuration names which will be set based on specific target resource, client type, auth type. */
export interface ConfigurationNames {
  /** The target service provider name and resource name. */
  targetService?: string;
  /** The client type for configuration names. */
  clientType?: ClientType;
  /** The auth type. */
  authType?: AuthType;
  /** Indicates where the secrets in configuration from. Used when secrets are from Keyvault. */
  secretType?: SecretSourceType;
  /** Deprecated, please use #/definitions/DaprConfigurationList instead */
  daprProperties?: DaprProperties;
  /** The configuration names to be set in compute service environment. */
  names?: ConfigurationName[];
}

export function configurationNamesDeserializer(item: any): ConfigurationNames {
  return {
    targetService: item["targetService"],
    clientType: item["clientType"],
    authType: item["authType"],
    secretType: item["secretType"],
    daprProperties: !item["daprProperties"]
      ? item["daprProperties"]
      : daprPropertiesDeserializer(item["daprProperties"]),
    names: !item["names"] ? item["names"] : configurationNameArrayDeserializer(item["names"]),
  };
}

/** The type of secret source. */
export enum KnownSecretSourceType {
  /** rawValue */
  RawValue = "rawValue",
  /** keyVaultSecret */
  KeyVaultSecret = "keyVaultSecret",
}

/**
 * The type of secret source. \
 * {@link KnownSecretSourceType} can be used interchangeably with SecretSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **rawValue** \
 * **keyVaultSecret**
 */
export type SecretSourceType = string;

export function configurationNameArrayDeserializer(result: Array<ConfigurationName>): any[] {
  return result.map((item) => {
    return configurationNameDeserializer(item);
  });
}

/** The configuration names. */
export interface ConfigurationName {
  value?: string;
  /** Description for the configuration name. */
  description?: string;
  /** Represent the configuration is required or not */
  required?: boolean;
}

export function configurationNameDeserializer(item: any): ConfigurationName {
  return {
    value: item["value"],
    description: item["description"],
    required: item["required"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-07-01-preview API version. */
  V20240701Preview = "2024-07-01-preview",
}
