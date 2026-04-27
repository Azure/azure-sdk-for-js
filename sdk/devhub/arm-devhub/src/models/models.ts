// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Properties used for generating artifacts such as Dockerfiles and manifests. */
export interface ArtifactGenerationProperties {
  /** The programming language used. */
  generationLanguage?: GenerationLanguage;
  /** The version of the language image used for execution in the generated dockerfile. */
  languageVersion?: string;
  /** The version of the language image used for building the code in the generated dockerfile. */
  builderVersion?: string;
  /** The port the application is exposed on. */
  port?: string;
  /** The name of the app. */
  appName?: string;
  /** The directory to output the generated Dockerfile to. */
  dockerfileOutputDirectory?: string;
  /** The directory to output the generated manifests to. */
  manifestOutputDirectory?: string;
  /** The mode of generation to be used for generating Dockerfiles. */
  dockerfileGenerationMode?: DockerfileGenerationMode;
  /** The mode of generation to be used for generating Manifest. */
  manifestGenerationMode?: ManifestGenerationMode;
  /** Determines the type of manifests to be generated. */
  manifestType?: GenerationManifestType;
  /** The name of the image to be generated. */
  imageName?: string;
  /** The namespace to deploy the application to. */
  namespace?: string;
  /** The tag to apply to the generated image. */
  imageTag?: string;
}

export function artifactGenerationPropertiesSerializer(item: ArtifactGenerationProperties): any {
  return {
    generationLanguage: item["generationLanguage"],
    languageVersion: item["languageVersion"],
    builderVersion: item["builderVersion"],
    port: item["port"],
    appName: item["appName"],
    dockerfileOutputDirectory: item["dockerfileOutputDirectory"],
    manifestOutputDirectory: item["manifestOutputDirectory"],
    dockerfileGenerationMode: item["dockerfileGenerationMode"],
    manifestGenerationMode: item["manifestGenerationMode"],
    manifestType: item["manifestType"],
    imageName: item["imageName"],
    namespace: item["namespace"],
    imageTag: item["imageTag"],
  };
}

export function artifactGenerationPropertiesDeserializer(item: any): ArtifactGenerationProperties {
  return {
    generationLanguage: item["generationLanguage"],
    languageVersion: item["languageVersion"],
    builderVersion: item["builderVersion"],
    port: item["port"],
    appName: item["appName"],
    dockerfileOutputDirectory: item["dockerfileOutputDirectory"],
    manifestOutputDirectory: item["manifestOutputDirectory"],
    dockerfileGenerationMode: item["dockerfileGenerationMode"],
    manifestGenerationMode: item["manifestGenerationMode"],
    manifestType: item["manifestType"],
    imageName: item["imageName"],
    namespace: item["namespace"],
    imageTag: item["imageTag"],
  };
}

/** The programming language used. */
export enum KnownGenerationLanguage {
  /** clojure language */
  Clojure = "clojure",
  /** csharp language */
  Csharp = "csharp",
  /** erlang language */
  Erlang = "erlang",
  /** go language */
  Go = "go",
  /** gomodule language */
  Gomodule = "gomodule",
  /** gradle language */
  Gradle = "gradle",
  /** java language */
  Java = "java",
  /** javascript language */
  Javascript = "javascript",
  /** php language */
  Php = "php",
  /** python language */
  Python = "python",
  /** ruby language */
  Ruby = "ruby",
  /** rust language */
  Rust = "rust",
  /** swift language */
  Swift = "swift",
}

/**
 * The programming language used. \
 * {@link KnownGenerationLanguage} can be used interchangeably with GenerationLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **clojure**: clojure language \
 * **csharp**: csharp language \
 * **erlang**: erlang language \
 * **go**: go language \
 * **gomodule**: gomodule language \
 * **gradle**: gradle language \
 * **java**: java language \
 * **javascript**: javascript language \
 * **php**: php language \
 * **python**: python language \
 * **ruby**: ruby language \
 * **rust**: rust language \
 * **swift**: swift language
 */
export type GenerationLanguage = string;

/** The mode of generation to be used for generating Dockerfiles. */
export enum KnownDockerfileGenerationMode {
  /** Dockerfiles will be generated */
  Enabled = "enabled",
  /** Dockerfiles will not be generated */
  Disabled = "disabled",
}

/**
 * The mode of generation to be used for generating Dockerfiles. \
 * {@link KnownDockerfileGenerationMode} can be used interchangeably with DockerfileGenerationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: Dockerfiles will be generated \
 * **disabled**: Dockerfiles will not be generated
 */
export type DockerfileGenerationMode = string;

/** The mode of generation to be used for generating Manifest. */
export enum KnownManifestGenerationMode {
  /** Manifests will be generated */
  Enabled = "enabled",
  /** Manifests will not be generated */
  Disabled = "disabled",
}

/**
 * The mode of generation to be used for generating Manifest. \
 * {@link KnownManifestGenerationMode} can be used interchangeably with ManifestGenerationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: Manifests will be generated \
 * **disabled**: Manifests will not be generated
 */
export type ManifestGenerationMode = string;

/** Determines the type of manifests to be generated. */
export enum KnownGenerationManifestType {
  /** Helm manifests */
  Helm = "helm",
  /** Kubernetes manifests */
  Kube = "kube",
}

/**
 * Determines the type of manifests to be generated. \
 * {@link KnownGenerationManifestType} can be used interchangeably with GenerationManifestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **helm**: Helm manifests \
 * **kube**: Kubernetes manifests
 */
export type GenerationManifestType = string;

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

/** Singleton response of GitHubOAuth containing */
export interface GitHubOAuthResponse extends ProxyResource {
  /** Properties of a workflow. */
  properties?: GitHubOAuthProperties;
}

export function gitHubOAuthResponseDeserializer(item: any): GitHubOAuthResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gitHubOAuthPropertiesDeserializer(item["properties"]),
  };
}

/** The response from List GitHubOAuth operation. */
export interface GitHubOAuthProperties {
  /** user making request */
  username?: string;
}

export function gitHubOAuthPropertiesDeserializer(item: any): GitHubOAuthProperties {
  return {
    username: item["username"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceDeserializer(item: any): ProxyResource {
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** The response from List GitHubOAuth operation. */
export interface GitHubOAuthListResponse {
  /** Singleton list response containing one GitHubOAuthResponse response */
  value?: GitHubOAuthResponse[];
}

export function gitHubOAuthListResponseDeserializer(item: any): GitHubOAuthListResponse {
  return {
    value: !item["value"] ? item["value"] : gitHubOAuthResponseArrayDeserializer(item["value"]),
  };
}

export function gitHubOAuthResponseArrayDeserializer(result: Array<GitHubOAuthResponse>): any[] {
  return result.map((item) => {
    return gitHubOAuthResponseDeserializer(item);
  });
}

/** GitHubOAuth request object */
export interface GitHubOAuthCallRequest {
  /** The URL the client will redirect to on successful authentication. If empty, no redirect will occur. */
  redirectUrl?: string;
}

export function gitHubOAuthCallRequestSerializer(item: GitHubOAuthCallRequest): any {
  return { redirectUrl: item["redirectUrl"] };
}

/** URL used to authorize the Developer Hub GitHub App */
export interface GitHubOAuthInfoResponse {
  /** URL for authorizing the Developer Hub GitHub App */
  authURL?: string;
  /** OAuth token used to make calls to GitHub */
  token?: string;
}

export function gitHubOAuthInfoResponseDeserializer(item: any): GitHubOAuthInfoResponse {
  return {
    authURL: item["authURL"],
    token: item["token"],
  };
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface OperationListResult {
  /** The Operation items on this page */
  readonly value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function operationListResultDeserializer(item: any): OperationListResult {
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

/** Localized display information for an operation. */
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

/** Resource representation of a IacProfile. */
export interface IacProfile extends TrackedResource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** GitHub Profile of a IacProfile */
  githubProfile?: IacGitHubProfile;
  /** Terraform Profile of a IacProfile */
  terraformProfile?: TerraformProfile;
  stages?: StageProperties[];
  templates?: IacTemplateProperties[];
}

export function iacProfileSerializer(item: IacProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "githubProfile",
      "terraformProfile",
      "stages",
      "templates",
    ])
      ? undefined
      : _iacProfilePropertiesSerializer(item),
  };
}

export function iacProfileDeserializer(item: any): IacProfile {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _iacProfilePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of a IacProfile. */
export interface IacProfileProperties {
  stages?: StageProperties[];
  templates?: IacTemplateProperties[];
  /** Repository Name */
  repositoryName?: string;
  /** Repository Main Branch */
  repositoryMainBranch?: string;
  /** Repository Owner */
  repositoryOwner?: string;
  /** Determines the authorization status of requests. */
  readonly authStatus?: AuthorizationStatus;
  /** The number associated with the submitted pull request. */
  readonly pullNumber?: number;
  /** The status of the Pull Request submitted against the users repository. */
  readonly prStatus?: PullRequestStatus;
  /** Repository Branch Name */
  branchName?: string;
  /** Terraform Storage Account Subscription */
  storageAccountSubscription?: string;
  /** Terraform Storage Account Resource Group */
  storageAccountResourceGroup?: string;
  /** Terraform Storage Account Name */
  storageAccountName?: string;
  /** Terraform Container Name */
  storageContainerName?: string;
}

export function iacProfilePropertiesSerializer(item: IacProfileProperties): any {
  return {
    githubProfile: areAllPropsUndefined(item, [
      "repositoryName",
      "repositoryMainBranch",
      "repositoryOwner",
      "branchName",
    ])
      ? undefined
      : _iacProfilePropertiesGithubProfileSerializer(item),
    terraformProfile: areAllPropsUndefined(item, [
      "storageAccountSubscription",
      "storageAccountResourceGroup",
      "storageAccountName",
      "storageContainerName",
    ])
      ? undefined
      : _iacProfilePropertiesTerraformProfileSerializer(item),
    stages: !item["stages"] ? item["stages"] : stagePropertiesArraySerializer(item["stages"]),
    templates: !item["templates"]
      ? item["templates"]
      : iacTemplatePropertiesArraySerializer(item["templates"]),
  };
}

export function iacProfilePropertiesDeserializer(item: any): IacProfileProperties {
  return {
    ...(!item["githubProfile"]
      ? item["githubProfile"]
      : _iacProfilePropertiesGithubProfileDeserializer(item["githubProfile"])),
    ...(!item["terraformProfile"]
      ? item["terraformProfile"]
      : _iacProfilePropertiesTerraformProfileDeserializer(item["terraformProfile"])),
    stages: !item["stages"] ? item["stages"] : stagePropertiesArrayDeserializer(item["stages"]),
    templates: !item["templates"]
      ? item["templates"]
      : iacTemplatePropertiesArrayDeserializer(item["templates"]),
  };
}

/** GitHub Profile of a IacProfile. */
export interface IacGitHubProfile {
  /** Repository Name */
  repositoryName?: string;
  /** Repository Main Branch */
  repositoryMainBranch?: string;
  /** Repository Owner */
  repositoryOwner?: string;
  /** Determines the authorization status of requests. */
  readonly authStatus?: AuthorizationStatus;
  /** The number associated with the submitted pull request. */
  readonly pullNumber?: number;
  /** The status of the Pull Request submitted against the users repository. */
  readonly prStatus?: PullRequestStatus;
  /** Repository Branch Name */
  branchName?: string;
}

export function iacGitHubProfileSerializer(item: IacGitHubProfile): any {
  return {
    repositoryName: item["repositoryName"],
    repositoryMainBranch: item["repositoryMainBranch"],
    repositoryOwner: item["repositoryOwner"],
    branchName: item["branchName"],
  };
}

export function iacGitHubProfileDeserializer(item: any): IacGitHubProfile {
  return {
    repositoryName: item["repositoryName"],
    repositoryMainBranch: item["repositoryMainBranch"],
    repositoryOwner: item["repositoryOwner"],
    authStatus: item["authStatus"],
    pullNumber: item["pullNumber"],
    prStatus: item["prStatus"],
    branchName: item["branchName"],
  };
}

/** Determines the authorization status of requests. */
export enum KnownAuthorizationStatus {
  /** Requests authorized successfully */
  Authorized = "Authorized",
  /** Requests returned NotFound response */
  NotFound = "NotFound",
  /** Requests returned other error response */
  Error = "Error",
}

/**
 * Determines the authorization status of requests. \
 * {@link KnownAuthorizationStatus} can be used interchangeably with AuthorizationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Authorized**: Requests authorized successfully \
 * **NotFound**: Requests returned NotFound response \
 * **Error**: Requests returned other error response
 */
export type AuthorizationStatus = string;

/** The status of the Pull Request submitted against the users repository. */
export enum KnownPullRequestStatus {
  /** Pull Request state unknown. */
  Unknown = "unknown",
  /** Pull Request submitted to repository. */
  Submitted = "submitted",
  /** Pull Request merged into repository. */
  Merged = "merged",
  /** Workflow no longer found within repository. */
  Removed = "removed",
}

/**
 * The status of the Pull Request submitted against the users repository. \
 * {@link KnownPullRequestStatus} can be used interchangeably with PullRequestStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: Pull Request state unknown. \
 * **submitted**: Pull Request submitted to repository. \
 * **merged**: Pull Request merged into repository. \
 * **removed**: Workflow no longer found within repository.
 */
export type PullRequestStatus = string;

/** Terraform backend profile. */
export interface TerraformProfile {
  /** Terraform Storage Account Subscription */
  storageAccountSubscription?: string;
  /** Terraform Storage Account Resource Group */
  storageAccountResourceGroup?: string;
  /** Terraform Storage Account Name */
  storageAccountName?: string;
  /** Terraform Container Name */
  storageContainerName?: string;
}

export function terraformProfileSerializer(item: TerraformProfile): any {
  return {
    storageAccountSubscription: item["storageAccountSubscription"],
    storageAccountResourceGroup: item["storageAccountResourceGroup"],
    storageAccountName: item["storageAccountName"],
    storageContainerName: item["storageContainerName"],
  };
}

export function terraformProfileDeserializer(item: any): TerraformProfile {
  return {
    storageAccountSubscription: item["storageAccountSubscription"],
    storageAccountResourceGroup: item["storageAccountResourceGroup"],
    storageAccountName: item["storageAccountName"],
    storageContainerName: item["storageContainerName"],
  };
}

export function stagePropertiesArraySerializer(result: Array<StageProperties>): any[] {
  return result.map((item) => {
    return stagePropertiesSerializer(item);
  });
}

export function stagePropertiesArrayDeserializer(result: Array<StageProperties>): any[] {
  return result.map((item) => {
    return stagePropertiesDeserializer(item);
  });
}

/** Properties of a Stage. */
export interface StageProperties {
  /** Stage Name */
  stageName?: string;
  dependencies?: string[];
  gitEnvironment?: string;
}

export function stagePropertiesSerializer(item: StageProperties): any {
  return {
    stageName: item["stageName"],
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : item["dependencies"].map((p: any) => {
          return p;
        }),
    gitEnvironment: item["gitEnvironment"],
  };
}

export function stagePropertiesDeserializer(item: any): StageProperties {
  return {
    stageName: item["stageName"],
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : item["dependencies"].map((p: any) => {
          return p;
        }),
    gitEnvironment: item["gitEnvironment"],
  };
}

export function iacTemplatePropertiesArraySerializer(result: Array<IacTemplateProperties>): any[] {
  return result.map((item) => {
    return iacTemplatePropertiesSerializer(item);
  });
}

export function iacTemplatePropertiesArrayDeserializer(
  result: Array<IacTemplateProperties>,
): any[] {
  return result.map((item) => {
    return iacTemplatePropertiesDeserializer(item);
  });
}

/** Properties of a IacTemplate. */
export interface IacTemplateProperties {
  /** Template Name */
  templateName?: string;
  /** the source store of the template */
  sourceResourceId?: string;
  /** the source stage of the template */
  instanceStage?: string;
  /** the sample instance name of the template */
  instanceName?: string;
  templateDetails?: IacTemplateDetails[];
  /** Determines the authorization status of requests. */
  readonly quickStartTemplateType?: QuickStartTemplateType;
}

export function iacTemplatePropertiesSerializer(item: IacTemplateProperties): any {
  return {
    templateName: item["templateName"],
    sourceResourceId: item["sourceResourceId"],
    instanceStage: item["instanceStage"],
    instanceName: item["instanceName"],
    templateDetails: !item["templateDetails"]
      ? item["templateDetails"]
      : iacTemplateDetailsArraySerializer(item["templateDetails"]),
  };
}

export function iacTemplatePropertiesDeserializer(item: any): IacTemplateProperties {
  return {
    templateName: item["templateName"],
    sourceResourceId: item["sourceResourceId"],
    instanceStage: item["instanceStage"],
    instanceName: item["instanceName"],
    templateDetails: !item["templateDetails"]
      ? item["templateDetails"]
      : iacTemplateDetailsArrayDeserializer(item["templateDetails"]),
    quickStartTemplateType: item["quickStartTemplateType"],
  };
}

export function iacTemplateDetailsArraySerializer(result: Array<IacTemplateDetails>): any[] {
  return result.map((item) => {
    return iacTemplateDetailsSerializer(item);
  });
}

export function iacTemplateDetailsArrayDeserializer(result: Array<IacTemplateDetails>): any[] {
  return result.map((item) => {
    return iacTemplateDetailsDeserializer(item);
  });
}

/** model interface IacTemplateDetails */
export interface IacTemplateDetails {
  /** The name of the products. */
  productName?: string;
  /** Count of the product */
  count?: number;
  /** Naming convention of this product */
  namingConvention?: string;
}

export function iacTemplateDetailsSerializer(item: IacTemplateDetails): any {
  return {
    productName: item["productName"],
    count: item["count"],
    namingConvention: item["namingConvention"],
  };
}

export function iacTemplateDetailsDeserializer(item: any): IacTemplateDetails {
  return {
    productName: item["productName"],
    count: item["count"],
    namingConvention: item["namingConvention"],
  };
}

/** Determines the authorization status of requests. */
export enum KnownQuickStartTemplateType {
  /** The template has not use quick start template */
  None = "None",
  /** The template use quick start template of HCI */
  HCI = "HCI",
  /** The template use quick start template of HCI and AKS */
  Hciaks = "HCIAKS",
  /** The template use quick start template of HCI and ArcVM */
  Hciarcvm = "HCIARCVM",
}

/**
 * Determines the authorization status of requests. \
 * {@link KnownQuickStartTemplateType} can be used interchangeably with QuickStartTemplateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The template has not use quick start template \
 * **HCI**: The template use quick start template of HCI \
 * **HCIAKS**: The template use quick start template of HCI and AKS \
 * **HCIARCVM**: The template use quick start template of HCI and ArcVM
 */
export type QuickStartTemplateType = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Resource tags. */
export interface TagsObject {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function tagsObjectSerializer(item: TagsObject): any {
  return { tags: item["tags"] };
}

/** The response of a IacProfile list operation. */
export interface _IacProfileListResult {
  /** The IacProfile items on this page */
  value: IacProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iacProfileListResultDeserializer(item: any): _IacProfileListResult {
  return {
    value: iacProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iacProfileArraySerializer(result: Array<IacProfile>): any[] {
  return result.map((item) => {
    return iacProfileSerializer(item);
  });
}

export function iacProfileArrayDeserializer(result: Array<IacProfile>): any[] {
  return result.map((item) => {
    return iacProfileDeserializer(item);
  });
}

/** model interface ExportTemplateRequest */
export interface ExportTemplateRequest {
  /** Template Name */
  templateName?: string;
  resourceGroupIds?: string[];
  siteId?: string;
  instanceName?: string;
  instanceStage?: string;
}

export function exportTemplateRequestSerializer(item: ExportTemplateRequest): any {
  return {
    templateName: item["templateName"],
    resourceGroupIds: !item["resourceGroupIds"]
      ? item["resourceGroupIds"]
      : item["resourceGroupIds"].map((p: any) => {
          return p;
        }),
    siteId: item["siteId"],
    instanceName: item["instanceName"],
    instanceStage: item["instanceStage"],
  };
}

/** model interface PrLinkResponse */
export interface PrLinkResponse {
  /** The link of the pull request. */
  prLink?: string;
}

export function prLinkResponseDeserializer(item: any): PrLinkResponse {
  return {
    prLink: item["prLink"],
  };
}

/** model interface ScaleTemplateRequest */
export interface ScaleTemplateRequest {
  /** Template Name */
  templateName?: string;
  scaleRequirement?: ScaleProperty[];
}

export function scaleTemplateRequestSerializer(item: ScaleTemplateRequest): any {
  return {
    templateName: item["templateName"],
    scaleRequirement: !item["scaleRequirement"]
      ? item["scaleRequirement"]
      : scalePropertyArraySerializer(item["scaleRequirement"]),
  };
}

export function scalePropertyArraySerializer(result: Array<ScaleProperty>): any[] {
  return result.map((item) => {
    return scalePropertySerializer(item);
  });
}

/** model interface ScaleProperty */
export interface ScaleProperty {
  /** The region of the store */
  region?: string;
  /** The stage of the store */
  stage?: string;
  /** Number of the store */
  numberOfStore?: number;
}

export function scalePropertySerializer(item: ScaleProperty): any {
  return { region: item["region"], stage: item["stage"], numberOfStore: item["numberOfStore"] };
}

/** ADOOAuth request object */
export interface AdooAuthCallRequest {
  /** The URL the client will redirect to on successful authentication. If empty, no redirect will occur. */
  redirectUrl?: string;
}

export function adooAuthCallRequestSerializer(item: AdooAuthCallRequest): any {
  return { redirectUrl: item["redirectUrl"] };
}

/** Response containing ADO OAuth information */
export interface AdooAuthInfoResponse {
  /** URL used to authorize ADO app using Entra ID */
  authURL?: string;
  /** OAuth token used to make calls to ADO APIs */
  token?: string;
}

export function adooAuthInfoResponseDeserializer(item: any): AdooAuthInfoResponse {
  return {
    authURL: item["authURL"],
    token: item["token"],
  };
}

/** Resource representation of a workflow */
export interface Workflow extends TrackedResource {
  /** Properties of a workflow. */
  properties?: WorkflowProperties;
}

export function workflowSerializer(item: Workflow): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workflowPropertiesSerializer(item["properties"]),
  };
}

export function workflowDeserializer(item: any): Workflow {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workflowPropertiesDeserializer(item["properties"]),
  };
}

/** Workflow properties */
export interface WorkflowProperties {
  /** Profile of a github workflow. */
  githubWorkflowProfile?: GitHubWorkflowProfile;
  /** Properties for generating artifacts like dockerfile and manifests. */
  artifactGenerationProperties?: ArtifactGenerationProperties;
  /** Profile of an azure pipeline. */
  azurePipelineProfile?: AzurePipelineProfile;
  /** Profile of an template workflow. */
  templateWorkflowProfile?: TemplateWorkflowProfile;
}

export function workflowPropertiesSerializer(item: WorkflowProperties): any {
  return {
    githubWorkflowProfile: !item["githubWorkflowProfile"]
      ? item["githubWorkflowProfile"]
      : gitHubWorkflowProfileSerializer(item["githubWorkflowProfile"]),
    artifactGenerationProperties: !item["artifactGenerationProperties"]
      ? item["artifactGenerationProperties"]
      : artifactGenerationPropertiesSerializer(item["artifactGenerationProperties"]),
    azurePipelineProfile: !item["azurePipelineProfile"]
      ? item["azurePipelineProfile"]
      : azurePipelineProfileSerializer(item["azurePipelineProfile"]),
    templateWorkflowProfile: !item["templateWorkflowProfile"]
      ? item["templateWorkflowProfile"]
      : templateWorkflowProfileSerializer(item["templateWorkflowProfile"]),
  };
}

export function workflowPropertiesDeserializer(item: any): WorkflowProperties {
  return {
    githubWorkflowProfile: !item["githubWorkflowProfile"]
      ? item["githubWorkflowProfile"]
      : gitHubWorkflowProfileDeserializer(item["githubWorkflowProfile"]),
    artifactGenerationProperties: !item["artifactGenerationProperties"]
      ? item["artifactGenerationProperties"]
      : artifactGenerationPropertiesDeserializer(item["artifactGenerationProperties"]),
    azurePipelineProfile: !item["azurePipelineProfile"]
      ? item["azurePipelineProfile"]
      : azurePipelineProfileDeserializer(item["azurePipelineProfile"]),
    templateWorkflowProfile: !item["templateWorkflowProfile"]
      ? item["templateWorkflowProfile"]
      : templateWorkflowProfileDeserializer(item["templateWorkflowProfile"]),
  };
}

/** GitHub Workflow Profile */
export interface GitHubWorkflowProfile {
  /** Repository Owner */
  repositoryOwner?: string;
  /** Repository Name */
  repositoryName?: string;
  /** Repository Branch Name */
  branchName?: string;
  /** Path to the Dockerfile within the repository. */
  dockerfile?: string;
  /** Path to Dockerfile Build Context within the repository. */
  dockerBuildContext?: string;
  /** Deployment details of the repository associated with the workflow. */
  deploymentProperties?: DeploymentProperties;
  /** Kubernetes namespace the application is deployed to. */
  namespace?: string;
  /** Information on the azure container registry */
  acr?: Acr;
  /** The fields needed for OIDC with GitHub. */
  oidcCredentials?: GitHubWorkflowProfileOidcCredentials;
  /** The Azure Kubernetes Cluster Resource the application will be deployed to. */
  aksResourceId?: string;
  /** The URL to the Pull Request submitted against the users repository. */
  readonly prURL?: string;
  /** The number associated with the submitted pull request. */
  readonly pullNumber?: number;
  /** The status of the Pull Request submitted against the users repository. */
  readonly prStatus?: PullRequestStatus;
  lastWorkflowRun?: WorkflowRun;
  /** Determines the authorization status of requests. */
  readonly authStatus?: AuthorizationStatus;
}

export function gitHubWorkflowProfileSerializer(item: GitHubWorkflowProfile): any {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
    dockerfile: item["dockerfile"],
    dockerBuildContext: item["dockerBuildContext"],
    deploymentProperties: !item["deploymentProperties"]
      ? item["deploymentProperties"]
      : deploymentPropertiesSerializer(item["deploymentProperties"]),
    namespace: item["namespace"],
    acr: !item["acr"] ? item["acr"] : acrSerializer(item["acr"]),
    oidcCredentials: !item["oidcCredentials"]
      ? item["oidcCredentials"]
      : gitHubWorkflowProfileOidcCredentialsSerializer(item["oidcCredentials"]),
    aksResourceId: item["aksResourceId"],
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunSerializer(item["lastWorkflowRun"]),
  };
}

export function gitHubWorkflowProfileDeserializer(item: any): GitHubWorkflowProfile {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
    dockerfile: item["dockerfile"],
    dockerBuildContext: item["dockerBuildContext"],
    deploymentProperties: !item["deploymentProperties"]
      ? item["deploymentProperties"]
      : deploymentPropertiesDeserializer(item["deploymentProperties"]),
    namespace: item["namespace"],
    acr: !item["acr"] ? item["acr"] : acrDeserializer(item["acr"]),
    oidcCredentials: !item["oidcCredentials"]
      ? item["oidcCredentials"]
      : gitHubWorkflowProfileOidcCredentialsDeserializer(item["oidcCredentials"]),
    aksResourceId: item["aksResourceId"],
    prURL: item["prURL"],
    pullNumber: item["pullNumber"],
    prStatus: item["prStatus"],
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunDeserializer(item["lastWorkflowRun"]),
    authStatus: item["authStatus"],
  };
}

/** Deployment details of the repository associated with the workflow. */
export interface DeploymentProperties {
  /** Determines the type of manifests within the repository. */
  manifestType?: ManifestType;
  kubeManifestLocations?: string[];
  /** Helm chart directory path in repository. */
  helmChartPath?: string;
  /** Helm Values.yaml file location in repository. */
  helmValues?: string;
  /** Manifest override values. */
  overrides?: Record<string, string>;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    manifestType: item["manifestType"],
    kubeManifestLocations: !item["kubeManifestLocations"]
      ? item["kubeManifestLocations"]
      : item["kubeManifestLocations"].map((p: any) => {
          return p;
        }),
    helmChartPath: item["helmChartPath"],
    helmValues: item["helmValues"],
    overrides: item["overrides"],
  };
}

export function deploymentPropertiesDeserializer(item: any): DeploymentProperties {
  return {
    manifestType: item["manifestType"],
    kubeManifestLocations: !item["kubeManifestLocations"]
      ? item["kubeManifestLocations"]
      : item["kubeManifestLocations"].map((p: any) => {
          return p;
        }),
    helmChartPath: item["helmChartPath"],
    helmValues: item["helmValues"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : Object.fromEntries(
          Object.entries(item["overrides"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Determines the type of manifests within the repository. */
export enum KnownManifestType {
  /** Repositories using helm */
  Helm = "helm",
  /** Repositories using kubernetes manifests */
  Kube = "kube",
  /** Repositories using kustomize */
  Kustomize = "kustomize",
}

/**
 * Determines the type of manifests within the repository. \
 * {@link KnownManifestType} can be used interchangeably with ManifestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **helm**: Repositories using helm \
 * **kube**: Repositories using kubernetes manifests \
 * **kustomize**: Repositories using kustomize
 */
export type ManifestType = string;

/** Information on the azure container registry */
export interface Acr {
  /** ACR subscription id */
  acrSubscriptionId?: string;
  /** ACR resource group */
  acrResourceGroup?: string;
  /** ACR registry */
  acrRegistryName?: string;
  /** ACR repository */
  acrRepositoryName?: string;
}

export function acrSerializer(item: Acr): any {
  return {
    acrSubscriptionId: item["acrSubscriptionId"],
    acrResourceGroup: item["acrResourceGroup"],
    acrRegistryName: item["acrRegistryName"],
    acrRepositoryName: item["acrRepositoryName"],
  };
}

export function acrDeserializer(item: any): Acr {
  return {
    acrSubscriptionId: item["acrSubscriptionId"],
    acrResourceGroup: item["acrResourceGroup"],
    acrRegistryName: item["acrRegistryName"],
    acrRepositoryName: item["acrRepositoryName"],
  };
}

/** The fields needed for OIDC with GitHub. */
export interface GitHubWorkflowProfileOidcCredentials {
  /** Azure Application Client ID */
  azureClientId?: string;
  /** Azure Directory (tenant) ID */
  azureTenantId?: string;
}

export function gitHubWorkflowProfileOidcCredentialsSerializer(
  item: GitHubWorkflowProfileOidcCredentials,
): any {
  return { azureClientId: item["azureClientId"], azureTenantId: item["azureTenantId"] };
}

export function gitHubWorkflowProfileOidcCredentialsDeserializer(
  item: any,
): GitHubWorkflowProfileOidcCredentials {
  return {
    azureClientId: item["azureClientId"],
    azureTenantId: item["azureTenantId"],
  };
}

/** model interface WorkflowRun */
export interface WorkflowRun {
  /** Describes if the workflow run succeeded. */
  readonly succeeded?: boolean;
  /** URL to the run of the workflow. */
  readonly workflowRunURL?: string;
  /** The timestamp of the last workflow run. */
  readonly lastRunAt?: Date;
  /** Describes the status of the workflow run */
  readonly workflowRunStatus?: WorkflowRunStatus;
}

export function workflowRunSerializer(_item: WorkflowRun): any {
  return {};
}

export function workflowRunDeserializer(item: any): WorkflowRun {
  return {
    succeeded: item["succeeded"],
    workflowRunURL: item["workflowRunURL"],
    lastRunAt: !item["lastRunAt"] ? item["lastRunAt"] : new Date(item["lastRunAt"]),
    workflowRunStatus: item["workflowRunStatus"],
  };
}

/** Describes the status of the workflow run */
export enum KnownWorkflowRunStatus {
  /** Workflow run is queued */
  Queued = "queued",
  /** Workflow run is inprogress */
  Inprogress = "inprogress",
  /** Workflow run is completed */
  Completed = "completed",
}

/**
 * Describes the status of the workflow run \
 * {@link KnownWorkflowRunStatus} can be used interchangeably with WorkflowRunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **queued**: Workflow run is queued \
 * **inprogress**: Workflow run is inprogress \
 * **completed**: Workflow run is completed
 */
export type WorkflowRunStatus = string;

/** Azure Pipeline Profile */
export interface AzurePipelineProfile {
  /** Details of the ADO repository associated with the workflow. */
  repository?: ADORepository;
  /** The name of the ARM Service Connection the pipeline is associated with. */
  armServiceConnection?: string;
  /** Build details of the repository associated with the workflow. */
  build?: Build;
  /** Deployment details of the repository associated with the workflow. */
  deployment?: DeploymentProperties;
  /** Kubernetes namespace the application is deployed to. */
  namespace?: string;
  /** Resource identifier for azure container registry repository associated with the workflow. */
  acr?: string;
  /** The Azure Kubernetes Cluster Resource the application will be deployed to. */
  clusterId?: string;
  /** Details of the pull request containing the workflow. */
  pullRequest?: PullRequest;
  lastWorkflowRun?: WorkflowRun;
  /** Determines the authorization status of requests. */
  readonly authStatus?: AuthorizationStatus;
}

export function azurePipelineProfileSerializer(item: AzurePipelineProfile): any {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : adoRepositorySerializer(item["repository"]),
    armServiceConnection: item["armServiceConnection"],
    build: !item["build"] ? item["build"] : buildSerializer(item["build"]),
    deployment: !item["deployment"]
      ? item["deployment"]
      : deploymentPropertiesSerializer(item["deployment"]),
    namespace: item["namespace"],
    acr: item["acr"],
    clusterId: item["clusterId"],
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestSerializer(item["pullRequest"]),
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunSerializer(item["lastWorkflowRun"]),
  };
}

export function azurePipelineProfileDeserializer(item: any): AzurePipelineProfile {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : adoRepositoryDeserializer(item["repository"]),
    armServiceConnection: item["armServiceConnection"],
    build: !item["build"] ? item["build"] : buildDeserializer(item["build"]),
    deployment: !item["deployment"]
      ? item["deployment"]
      : deploymentPropertiesDeserializer(item["deployment"]),
    namespace: item["namespace"],
    acr: item["acr"],
    clusterId: item["clusterId"],
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestDeserializer(item["pullRequest"]),
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunDeserializer(item["lastWorkflowRun"]),
    authStatus: item["authStatus"],
  };
}

/** Details of the ADO repository associated with the workflow. */
export interface ADORepository {
  /** The owner of the repository the workflow is associated with. */
  repositoryOwner?: string;
  /** The name of the repository the workflow is associated with. */
  repositoryName?: string;
  /** The name of the branch the workflow is associated with. */
  branchName?: string;
  /** The name of the Azure DevOps organization the pipeline is associated with. */
  adoOrganization?: string;
  /** The name of the project the pipeline is associated with. */
  projectName?: string;
}

export function adoRepositorySerializer(item: ADORepository): any {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
    adoOrganization: item["adoOrganization"],
    projectName: item["projectName"],
  };
}

export function adoRepositoryDeserializer(item: any): ADORepository {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
    adoOrganization: item["adoOrganization"],
    projectName: item["projectName"],
  };
}

/** Build details of the repository associated with the workflow. */
export interface Build {
  /** Path to the Dockerfile within the repository. */
  dockerfile?: string;
  /** Path to Dockerfile Build Context within the repository. */
  dockerBuildContext?: string;
}

export function buildSerializer(item: Build): any {
  return { dockerfile: item["dockerfile"], dockerBuildContext: item["dockerBuildContext"] };
}

export function buildDeserializer(item: any): Build {
  return {
    dockerfile: item["dockerfile"],
    dockerBuildContext: item["dockerBuildContext"],
  };
}

/** Details of the pull request containing the workflow. */
export interface PullRequest {
  /** The URL to the Pull Request submitted against the users repository. */
  readonly prURL?: string;
  /** The number associated with the submitted pull request. */
  readonly pullNumber?: number;
  /** The status of the Pull Request submitted against the users repository. */
  readonly prStatus?: PullRequestStatus;
}

export function pullRequestSerializer(_item: PullRequest): any {
  return {};
}

export function pullRequestDeserializer(item: any): PullRequest {
  return {
    prURL: item["prURL"],
    pullNumber: item["pullNumber"],
    prStatus: item["prStatus"],
  };
}

/** Template Workflow Profile */
export interface TemplateWorkflowProfile {
  /** The status of the Pull Request submitted against the users repository. */
  repositoryProvider?: RepositoryProviderType;
  /** The properties of ADO OAuth. */
  workflowTemplate?: TemplateReference;
  /** The properties of ADO OAuth. */
  deploymentTemplate?: TemplateReference;
  /** The properties of ADO OAuth. */
  dockerfileTemplate?: TemplateReference;
  manifestTemplates?: TemplateReference[];
  /** Details of the GitHub repository and credentials associated with the workflow. */
  gitHubProviderProfile?: GitHubProviderProfile;
  /** Details of the GitHub repository associated with the workflow. */
  adoProviderProfile?: ADOProviderProfile;
  /** Details of the pull request containing the workflow. */
  pullRequest?: PullRequest;
  lastWorkflowRun?: WorkflowRun;
  /** Determines the authorization status of requests. */
  readonly authStatus?: AuthorizationStatus;
}

export function templateWorkflowProfileSerializer(item: TemplateWorkflowProfile): any {
  return {
    repositoryProvider: item["repositoryProvider"],
    workflowTemplate: !item["workflowTemplate"]
      ? item["workflowTemplate"]
      : templateReferenceSerializer(item["workflowTemplate"]),
    deploymentTemplate: !item["deploymentTemplate"]
      ? item["deploymentTemplate"]
      : templateReferenceSerializer(item["deploymentTemplate"]),
    dockerfileTemplate: !item["dockerfileTemplate"]
      ? item["dockerfileTemplate"]
      : templateReferenceSerializer(item["dockerfileTemplate"]),
    manifestTemplates: !item["manifestTemplates"]
      ? item["manifestTemplates"]
      : templateReferenceArraySerializer(item["manifestTemplates"]),
    gitHubProviderProfile: !item["gitHubProviderProfile"]
      ? item["gitHubProviderProfile"]
      : gitHubProviderProfileSerializer(item["gitHubProviderProfile"]),
    adoProviderProfile: !item["adoProviderProfile"]
      ? item["adoProviderProfile"]
      : adoProviderProfileSerializer(item["adoProviderProfile"]),
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestSerializer(item["pullRequest"]),
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunSerializer(item["lastWorkflowRun"]),
  };
}

export function templateWorkflowProfileDeserializer(item: any): TemplateWorkflowProfile {
  return {
    repositoryProvider: item["repositoryProvider"],
    workflowTemplate: !item["workflowTemplate"]
      ? item["workflowTemplate"]
      : templateReferenceDeserializer(item["workflowTemplate"]),
    deploymentTemplate: !item["deploymentTemplate"]
      ? item["deploymentTemplate"]
      : templateReferenceDeserializer(item["deploymentTemplate"]),
    dockerfileTemplate: !item["dockerfileTemplate"]
      ? item["dockerfileTemplate"]
      : templateReferenceDeserializer(item["dockerfileTemplate"]),
    manifestTemplates: !item["manifestTemplates"]
      ? item["manifestTemplates"]
      : templateReferenceArrayDeserializer(item["manifestTemplates"]),
    gitHubProviderProfile: !item["gitHubProviderProfile"]
      ? item["gitHubProviderProfile"]
      : gitHubProviderProfileDeserializer(item["gitHubProviderProfile"]),
    adoProviderProfile: !item["adoProviderProfile"]
      ? item["adoProviderProfile"]
      : adoProviderProfileDeserializer(item["adoProviderProfile"]),
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestDeserializer(item["pullRequest"]),
    lastWorkflowRun: !item["lastWorkflowRun"]
      ? item["lastWorkflowRun"]
      : workflowRunDeserializer(item["lastWorkflowRun"]),
    authStatus: item["authStatus"],
  };
}

/** The status of the Pull Request submitted against the users repository. */
export enum KnownRepositoryProviderType {
  /** GitHub repository provider type. */
  Github = "github",
  /** ADO repository provider type. */
  Ado = "ado",
}

/**
 * The status of the Pull Request submitted against the users repository. \
 * {@link KnownRepositoryProviderType} can be used interchangeably with RepositoryProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **github**: GitHub repository provider type. \
 * **ado**: ADO repository provider type.
 */
export type RepositoryProviderType = string;

/** The properties of ADO OAuth. */
export interface TemplateReference {
  /** The versioned template arm resource id. */
  templateId?: string;
  /** destination for template creation */
  destination?: string;
  /** parameters for template creation */
  parameters?: Record<string, string>;
}

export function templateReferenceSerializer(item: TemplateReference): any {
  return {
    templateId: item["templateId"],
    destination: item["destination"],
    parameters: item["parameters"],
  };
}

export function templateReferenceDeserializer(item: any): TemplateReference {
  return {
    templateId: item["templateId"],
    destination: item["destination"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function templateReferenceArraySerializer(result: Array<TemplateReference>): any[] {
  return result.map((item) => {
    return templateReferenceSerializer(item);
  });
}

export function templateReferenceArrayDeserializer(result: Array<TemplateReference>): any[] {
  return result.map((item) => {
    return templateReferenceDeserializer(item);
  });
}

/** Details of the GitHub repository and credentials associated with the workflow. */
export interface GitHubProviderProfile {
  /** Details of the GitHub repository associated with the workflow. */
  repository?: GitHubRepository;
  /** The fields needed for OIDC with GitHub. */
  oidcCredentials?: OidcCredentials;
}

export function gitHubProviderProfileSerializer(item: GitHubProviderProfile): any {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : gitHubRepositorySerializer(item["repository"]),
    oidcCredentials: !item["oidcCredentials"]
      ? item["oidcCredentials"]
      : oidcCredentialsSerializer(item["oidcCredentials"]),
  };
}

export function gitHubProviderProfileDeserializer(item: any): GitHubProviderProfile {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : gitHubRepositoryDeserializer(item["repository"]),
    oidcCredentials: !item["oidcCredentials"]
      ? item["oidcCredentials"]
      : oidcCredentialsDeserializer(item["oidcCredentials"]),
  };
}

/** Details of the GitHub repository associated with the workflow. */
export interface GitHubRepository {
  /** The owner of the repository the workflow is associated with. */
  repositoryOwner?: string;
  /** The name of the repository the workflow is associated with. */
  repositoryName?: string;
  /** The name of the branch the workflow is associated with. */
  branchName?: string;
}

export function gitHubRepositorySerializer(item: GitHubRepository): any {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
  };
}

export function gitHubRepositoryDeserializer(item: any): GitHubRepository {
  return {
    repositoryOwner: item["repositoryOwner"],
    repositoryName: item["repositoryName"],
    branchName: item["branchName"],
  };
}

/** The fields needed for OIDC with GitHub. */
export interface OidcCredentials {
  /** Azure Application Client ID */
  azureClientId?: string;
  /** Azure Directory (tenant) ID */
  azureTenantId?: string;
}

export function oidcCredentialsSerializer(item: OidcCredentials): any {
  return { azureClientId: item["azureClientId"], azureTenantId: item["azureTenantId"] };
}

export function oidcCredentialsDeserializer(item: any): OidcCredentials {
  return {
    azureClientId: item["azureClientId"],
    azureTenantId: item["azureTenantId"],
  };
}

/** Details of the GitHub repository associated with the workflow. */
export interface ADOProviderProfile {
  /** Details of the ADO repository associated with the workflow. */
  repository?: ADORepository;
  /** The name of the ARM Service Connection the pipeline is associated with. */
  armServiceConnection?: string;
}

export function adoProviderProfileSerializer(item: ADOProviderProfile): any {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : adoRepositorySerializer(item["repository"]),
    armServiceConnection: item["armServiceConnection"],
  };
}

export function adoProviderProfileDeserializer(item: any): ADOProviderProfile {
  return {
    repository: !item["repository"]
      ? item["repository"]
      : adoRepositoryDeserializer(item["repository"]),
    armServiceConnection: item["armServiceConnection"],
  };
}

/** delete response if content must be provided on delete operation */
export interface DeleteWorkflowResponse {
  /** delete status message */
  status?: string;
}

export function deleteWorkflowResponseDeserializer(item: any): DeleteWorkflowResponse {
  return {
    status: item["status"],
  };
}

/** The response of a Workflow list operation. */
export interface _WorkflowListResult {
  /** The Workflow items on this page */
  value: Workflow[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowListResultDeserializer(item: any): _WorkflowListResult {
  return {
    value: workflowArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowArraySerializer(result: Array<Workflow>): any[] {
  return result.map((item) => {
    return workflowSerializer(item);
  });
}

export function workflowArrayDeserializer(result: Array<Workflow>): any[] {
  return result.map((item) => {
    return workflowDeserializer(item);
  });
}

/** Singleton response of ADO OAuth. */
export interface AdooAuthResponse extends ProxyResource {
  /** Details of ADO OAuth. */
  properties?: AdooAuth;
}

export function adooAuthResponseDeserializer(item: any): AdooAuthResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"] ? item["properties"] : adooAuthDeserializer(item["properties"]),
  };
}

/** The properties of ADO OAuth. */
export interface AdooAuth {
  /** user making request */
  username?: string;
}

export function adooAuthDeserializer(item: any): AdooAuth {
  return {
    username: item["username"],
  };
}

/** The response from List ADOOAuth operation. */
export interface _AdooAuthListResponse {
  /** The AdooAuthResponse items on this page */
  value: AdooAuthResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _adooAuthListResponseDeserializer(item: any): _AdooAuthListResponse {
  return {
    value: adooAuthResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function adooAuthResponseArrayDeserializer(result: Array<AdooAuthResponse>): any[] {
  return result.map((item) => {
    return adooAuthResponseDeserializer(item);
  });
}

/** Resource representation of a Template */
export interface Template extends ProxyResource {
  /** Properties of a Template. */
  properties?: TemplateProperties;
}

export function templateDeserializer(item: any): Template {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : templatePropertiesDeserializer(item["properties"]),
  };
}

/** Template properties */
export interface TemplateProperties {
  /** The name of the template. */
  templateName?: string;
  /** The default version of the template. */
  defaultVersion?: string;
  /** The valid versions of the template. */
  versions?: string[];
  /** Description of the template */
  description?: string;
  /** The type of the template. */
  readonly templateType?: TemplateType;
}

export function templatePropertiesDeserializer(item: any): TemplateProperties {
  return {
    templateName: item["templateName"],
    defaultVersion: item["defaultVersion"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    templateType: item["templateType"],
  };
}

/** The type of the template. */
export enum KnownTemplateType {
  /** Deployment template type. */
  Deployment = "deployment",
  /** Manifest template type. */
  Manifest = "manifest",
  /** Workflow template type. */
  Workflow = "workflow",
  /** Dockerfile template type. */
  Dockerfile = "dockerfile",
}

/**
 * The type of the template. \
 * {@link KnownTemplateType} can be used interchangeably with TemplateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **deployment**: Deployment template type. \
 * **manifest**: Manifest template type. \
 * **workflow**: Workflow template type. \
 * **dockerfile**: Dockerfile template type.
 */
export type TemplateType = string;

/** The response of a Template list operation. */
export interface _TemplateListResult {
  /** The Template items on this page */
  value: Template[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _templateListResultDeserializer(item: any): _TemplateListResult {
  return {
    value: templateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function templateArrayDeserializer(result: Array<Template>): any[] {
  return result.map((item) => {
    return templateDeserializer(item);
  });
}

/** Resource representation of a VersionedTemplate */
export interface VersionedTemplate extends ProxyResource {
  /** Properties of a VersionedTemplate. */
  properties?: VersionedTemplateProperties;
}

export function versionedTemplateDeserializer(item: any): VersionedTemplate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : versionedTemplatePropertiesDeserializer(item["properties"]),
  };
}

/** VersionedTemplate properties */
export interface VersionedTemplateProperties {
  /** The version of the template. */
  version?: string;
  /** The type of the template. */
  readonly templateType?: TemplateType;
  /** The template parameters. */
  parameters?: Parameter[];
}

export function versionedTemplatePropertiesDeserializer(item: any): VersionedTemplateProperties {
  return {
    version: item["version"],
    templateType: item["templateType"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterArrayDeserializer(item["parameters"]),
  };
}

export function parameterArrayDeserializer(result: Array<Parameter>): any[] {
  return result.map((item) => {
    return parameterDeserializer(item);
  });
}

/** Parameter for the template. */
export interface Parameter {
  /** The paramater name. */
  name?: string;
  /** Description of what the paramater is used for. */
  description?: string;
  /** The type of the template parameter. */
  readonly parameterType?: ParameterType;
  /** The type of the template parameter. */
  readonly parameterKind?: ParameterKind;
  /** Whether the parameter is required. */
  required?: boolean;
  /** A reference to a default parameter value or a reference parameter to take the value from. */
  default?: ParameterDefault;
}

export function parameterDeserializer(item: any): Parameter {
  return {
    name: item["name"],
    description: item["description"],
    parameterType: item["parameterType"],
    parameterKind: item["parameterKind"],
    required: item["required"],
    default: !item["default"] ? item["default"] : parameterDefaultDeserializer(item["default"]),
  };
}

/** The type of the template parameter. */
export enum KnownParameterType {
  /** string parameter type. */
  String = "string",
  /** boolean parameter type. */
  Bool = "bool",
  /** int parameter type. */
  Int = "int",
  /** float parameter type. */
  Float = "float",
  /** object parameter type. */
  Object = "object",
}

/**
 * The type of the template parameter. \
 * {@link KnownParameterType} can be used interchangeably with ParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: string parameter type. \
 * **bool**: boolean parameter type. \
 * **int**: int parameter type. \
 * **float**: float parameter type. \
 * **object**: object parameter type.
 */
export type ParameterType = string;

/** The type of the template parameter. */
export enum KnownParameterKind {
  /** azure container registry name */
  AzureContainerRegistry = "azureContainerRegistry",
  /** azure keyvault uri */
  AzureKeyvaultUri = "azureKeyvaultUri",
  /** azure managed cluster name */
  AzureManagedCluster = "azureManagedCluster",
  /** azure resource group */
  AzureResourceGroup = "azureResourceGroup",
  /** azure service connection */
  AzureServiceConnection = "azureServiceConnection",
  /** container image name */
  ContainerImageName = "containerImageName",
  /** container image version */
  ContainerImageVersion = "containerImageVersion",
  /** cluster resource type */
  ClusterResourceType = "clusterResourceType",
  /** directory path */
  DirPath = "dirPath",
  /** dockerfile name */
  DockerFileName = "dockerFileName",
  /** environment variables in the form of a json object */
  EnvVarMap = "envVarMap",
  /** file path */
  FilePath = "filePath",
  /** boolean flag */
  Flag = "flag",
  /** helm overrides in the form of a string key1=value1,key2=value2 */
  HelmChartOverrides = "helmChartOverrides",
  /** kubernetes deployment image pull policy */
  ImagePullPolicy = "imagePullPolicy",
  /** kubernetes ingress host name */
  IngressHostName = "ingressHostName",
  /** kubernetes namespace */
  KubernetesNamespace = "kubernetesNamespace",
  /** kubernetes probe http path */
  KubernetesProbeHttpPath = "kubernetesProbeHttpPath",
  /** kubernetes probe period */
  KubernetesProbePeriod = "kubernetesProbePeriod",
  /** kubernetes probe timeout */
  KubernetesProbeTimeout = "kubernetesProbeTimeout",
  /** kubernetes probe threshold */
  KubernetesProbeThreshold = "kubernetesProbeThreshold",
  /** kubernetes probe type */
  KubernetesProbeType = "kubernetesProbeType",
  /** kubernetes probe delay */
  KubernetesProbeDelay = "kubernetesProbeDelay",
  /** kubernetes resource limit */
  KubernetesResourceLimit = "kubernetesResourceLimit",
  /** kubernetes resource name */
  KubernetesResourceName = "kubernetesResourceName",
  /** kubernetes resource request */
  KubernetesResourceRequest = "kubernetesResourceRequest",
  /** kubernetes label value */
  Label = "label",
  /** service port */
  Port = "port",
  /** repository branch name */
  RepositoryBranch = "repositoryBranch",
  /** workflow name */
  WorkflowName = "workflowName",
  /** kubernetes replica count */
  ReplicaCount = "replicaCount",
  /** kubernetes scaling resource type */
  ScalingResourceType = "scalingResourceType",
  /** kubernetes resource utilization type */
  ScalingResourceUtilization = "scalingResourceUtilization",
  /** kubernetes resource limit */
  ResourceLimit = "resourceLimit",
  /** workflow authentication type */
  WorkflowAuthType = "workflowAuthType",
}

/**
 * The type of the template parameter. \
 * {@link KnownParameterKind} can be used interchangeably with ParameterKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureContainerRegistry**: azure container registry name \
 * **azureKeyvaultUri**: azure keyvault uri \
 * **azureManagedCluster**: azure managed cluster name \
 * **azureResourceGroup**: azure resource group \
 * **azureServiceConnection**: azure service connection \
 * **containerImageName**: container image name \
 * **containerImageVersion**: container image version \
 * **clusterResourceType**: cluster resource type \
 * **dirPath**: directory path \
 * **dockerFileName**: dockerfile name \
 * **envVarMap**: environment variables in the form of a json object \
 * **filePath**: file path \
 * **flag**: boolean flag \
 * **helmChartOverrides**: helm overrides in the form of a string key1=value1,key2=value2 \
 * **imagePullPolicy**: kubernetes deployment image pull policy \
 * **ingressHostName**: kubernetes ingress host name \
 * **kubernetesNamespace**: kubernetes namespace \
 * **kubernetesProbeHttpPath**: kubernetes probe http path \
 * **kubernetesProbePeriod**: kubernetes probe period \
 * **kubernetesProbeTimeout**: kubernetes probe timeout \
 * **kubernetesProbeThreshold**: kubernetes probe threshold \
 * **kubernetesProbeType**: kubernetes probe type \
 * **kubernetesProbeDelay**: kubernetes probe delay \
 * **kubernetesResourceLimit**: kubernetes resource limit \
 * **kubernetesResourceName**: kubernetes resource name \
 * **kubernetesResourceRequest**: kubernetes resource request \
 * **label**: kubernetes label value \
 * **port**: service port \
 * **repositoryBranch**: repository branch name \
 * **workflowName**: workflow name \
 * **replicaCount**: kubernetes replica count \
 * **scalingResourceType**: kubernetes scaling resource type \
 * **scalingResourceUtilization**: kubernetes resource utilization type \
 * **resourceLimit**: kubernetes resource limit \
 * **workflowAuthType**: workflow authentication type
 */
export type ParameterKind = string;

/** A reference to a default parameter value or a reference parameter to take the value from. */
export interface ParameterDefault {
  /** The default value for this parameter. */
  value?: string;
  /** The Parameter to reference a value from. */
  referenceParameter?: string;
}

export function parameterDefaultDeserializer(item: any): ParameterDefault {
  return {
    value: item["value"],
    referenceParameter: item["referenceParameter"],
  };
}

/** The response of a VersionedTemplate list operation. */
export interface _VersionedTemplateListResult {
  /** The VersionedTemplate items on this page */
  value: VersionedTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _versionedTemplateListResultDeserializer(item: any): _VersionedTemplateListResult {
  return {
    value: versionedTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function versionedTemplateArrayDeserializer(result: Array<VersionedTemplate>): any[] {
  return result.map((item) => {
    return versionedTemplateDeserializer(item);
  });
}

/** Generated template files returned as a map<path string,content string> */
export interface GenerateVersionedTemplateResponse {
  /** files returned as a map<path string,content string> */
  generatedFiles?: Record<string, string>;
}

export function generateVersionedTemplateResponseDeserializer(
  item: any,
): GenerateVersionedTemplateResponse {
  return {
    generatedFiles: !item["generatedFiles"]
      ? item["generatedFiles"]
      : Object.fromEntries(
          Object.entries(item["generatedFiles"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01-preview API version. */
  V20250301Preview = "2025-03-01-preview",
}

export function _iacProfilePropertiesGithubProfileSerializer(item: IacProfileProperties): any {
  return {
    repositoryName: item["repositoryName"],
    repositoryMainBranch: item["repositoryMainBranch"],
    repositoryOwner: item["repositoryOwner"],
    branchName: item["branchName"],
  };
}

export function _iacProfilePropertiesGithubProfileDeserializer(item: any) {
  return {
    repositoryName: item["repositoryName"],
    repositoryMainBranch: item["repositoryMainBranch"],
    repositoryOwner: item["repositoryOwner"],
    authStatus: item["authStatus"],
    pullNumber: item["pullNumber"],
    prStatus: item["prStatus"],
    branchName: item["branchName"],
  };
}

export function _iacProfilePropertiesTerraformProfileSerializer(item: IacProfileProperties): any {
  return {
    storageAccountSubscription: item["storageAccountSubscription"],
    storageAccountResourceGroup: item["storageAccountResourceGroup"],
    storageAccountName: item["storageAccountName"],
    storageContainerName: item["storageContainerName"],
  };
}

export function _iacProfilePropertiesTerraformProfileDeserializer(item: any) {
  return {
    storageAccountSubscription: item["storageAccountSubscription"],
    storageAccountResourceGroup: item["storageAccountResourceGroup"],
    storageAccountName: item["storageAccountName"],
    storageContainerName: item["storageContainerName"],
  };
}

export function _iacProfilePropertiesSerializer(item: IacProfile): any {
  return {
    githubProfile: !item["githubProfile"]
      ? item["githubProfile"]
      : iacGitHubProfileSerializer(item["githubProfile"]),
    terraformProfile: !item["terraformProfile"]
      ? item["terraformProfile"]
      : terraformProfileSerializer(item["terraformProfile"]),
    stages: !item["stages"] ? item["stages"] : stagePropertiesArraySerializer(item["stages"]),
    templates: !item["templates"]
      ? item["templates"]
      : iacTemplatePropertiesArraySerializer(item["templates"]),
  };
}

export function _iacProfilePropertiesDeserializer(item: any) {
  return {
    githubProfile: !item["githubProfile"]
      ? item["githubProfile"]
      : iacGitHubProfileDeserializer(item["githubProfile"]),
    terraformProfile: !item["terraformProfile"]
      ? item["terraformProfile"]
      : terraformProfileDeserializer(item["terraformProfile"]),
    stages: !item["stages"] ? item["stages"] : stagePropertiesArrayDeserializer(item["stages"]),
    templates: !item["templates"]
      ? item["templates"]
      : iacTemplatePropertiesArrayDeserializer(item["templates"]),
  };
}
