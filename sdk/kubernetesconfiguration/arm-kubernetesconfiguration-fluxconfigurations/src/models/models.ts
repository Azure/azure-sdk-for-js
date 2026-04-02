// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Flux Configuration object returned in Get & Put response. */
export interface FluxConfiguration extends ProxyResource {
  /** Scope at which the operator will be installed. */
  scope?: ScopeType;
  /** The namespace to which this configuration is installed to. Maximum of 253 lower case alphanumeric characters, hyphen and period only. */
  namespace?: string;
  /** Source Kind to pull the configuration data from. */
  sourceKind?: SourceKindType;
  /** Whether this configuration should suspend its reconciliation of its kustomizations and sources. */
  suspend?: boolean;
  /** Parameters to reconcile to the GitRepository source kind type. */
  gitRepository?: GitRepositoryDefinition;
  /** Parameters to reconcile to the Bucket source kind type. */
  bucket?: BucketDefinition;
  /** Parameters to reconcile to the AzureBlob source kind type. */
  azureBlob?: AzureBlobDefinition;
  /** Parameters to reconcile to the OCIRepository source kind type. */
  ociRepository?: OCIRepositoryDefinition;
  /** Array of kustomizations used to reconcile the artifact pulled by the source type on the cluster. */
  kustomizations?: Record<string, KustomizationDefinition>;
  /** Key-value pairs of protected configuration settings for the configuration */
  configurationProtectedSettings?: Record<string, string>;
  /** Statuses of the Flux Kubernetes resources created by the fluxConfiguration or created by the managed objects provisioned by the fluxConfiguration. */
  readonly statuses?: ObjectStatusDefinition[];
  /** Public Key associated with this fluxConfiguration (either generated within the cluster or provided by the user). */
  readonly repositoryPublicKey?: string;
  /** Branch and/or SHA of the source commit synced with the cluster. */
  readonly sourceSyncedCommitId?: string;
  /** Datetime the fluxConfiguration synced its source on the cluster. */
  readonly sourceUpdatedAt?: Date;
  /** Datetime the fluxConfiguration synced its status on the cluster with Azure. */
  readonly statusUpdatedAt?: Date;
  /** Whether flux configuration deployment should wait for cluster to reconcile the kustomizations. */
  waitForReconciliation?: boolean;
  /** Maximum duration to wait for flux configuration reconciliation. E.g PT1H, PT5M, P1D */
  reconciliationWaitDuration?: string;
  /** Combined status of the Flux Kubernetes resources created by the fluxConfiguration or created by the managed objects. */
  readonly complianceState?: FluxComplianceState;
  /** Status of the creation of the fluxConfiguration. */
  readonly provisioningState?: ProvisioningState;
  /** Error message returned to the user in the case of provisioning failure. */
  readonly errorMessage?: string;
}

export function fluxConfigurationSerializer(item: FluxConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, [
      "scope",
      "namespace",
      "sourceKind",
      "suspend",
      "gitRepository",
      "bucket",
      "azureBlob",
      "ociRepository",
      "kustomizations",
      "configurationProtectedSettings",
      "waitForReconciliation",
      "reconciliationWaitDuration",
    ])
      ? undefined
      : _fluxConfigurationPropertiesSerializer(item),
  };
}

export function fluxConfigurationDeserializer(item: any): FluxConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fluxConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties to create a Flux Configuration resource */
export interface FluxConfigurationProperties {
  /** Scope at which the operator will be installed. */
  scope?: ScopeType;
  /** The namespace to which this configuration is installed to. Maximum of 253 lower case alphanumeric characters, hyphen and period only. */
  namespace?: string;
  /** Source Kind to pull the configuration data from. */
  sourceKind?: SourceKindType;
  /** Whether this configuration should suspend its reconciliation of its kustomizations and sources. */
  suspend?: boolean;
  /** Parameters to reconcile to the GitRepository source kind type. */
  gitRepository?: GitRepositoryDefinition;
  /** Parameters to reconcile to the Bucket source kind type. */
  bucket?: BucketDefinition;
  /** Parameters to reconcile to the AzureBlob source kind type. */
  azureBlob?: AzureBlobDefinition;
  /** Parameters to reconcile to the OCIRepository source kind type. */
  ociRepository?: OCIRepositoryDefinition;
  /** Array of kustomizations used to reconcile the artifact pulled by the source type on the cluster. */
  kustomizations?: Record<string, KustomizationDefinition>;
  /** Key-value pairs of protected configuration settings for the configuration */
  configurationProtectedSettings?: Record<string, string>;
  /** Statuses of the Flux Kubernetes resources created by the fluxConfiguration or created by the managed objects provisioned by the fluxConfiguration. */
  readonly statuses?: ObjectStatusDefinition[];
  /** Public Key associated with this fluxConfiguration (either generated within the cluster or provided by the user). */
  readonly repositoryPublicKey?: string;
  /** Branch and/or SHA of the source commit synced with the cluster. */
  readonly sourceSyncedCommitId?: string;
  /** Datetime the fluxConfiguration synced its source on the cluster. */
  readonly sourceUpdatedAt?: Date;
  /** Datetime the fluxConfiguration synced its status on the cluster with Azure. */
  readonly statusUpdatedAt?: Date;
  /** Whether flux configuration deployment should wait for cluster to reconcile the kustomizations. */
  waitForReconciliation?: boolean;
  /** Maximum duration to wait for flux configuration reconciliation. E.g PT1H, PT5M, P1D */
  reconciliationWaitDuration?: string;
  /** Combined status of the Flux Kubernetes resources created by the fluxConfiguration or created by the managed objects. */
  readonly complianceState?: FluxComplianceState;
  /** Status of the creation of the fluxConfiguration. */
  readonly provisioningState?: ProvisioningState;
  /** Error message returned to the user in the case of provisioning failure. */
  readonly errorMessage?: string;
}

export function fluxConfigurationPropertiesSerializer(item: FluxConfigurationProperties): any {
  return {
    scope: item["scope"],
    namespace: item["namespace"],
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryDefinitionSerializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketDefinitionSerializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobDefinitionSerializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryDefinitionSerializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationDefinitionRecordSerializer(item["kustomizations"]),
    configurationProtectedSettings: item["configurationProtectedSettings"],
    waitForReconciliation: item["waitForReconciliation"],
    reconciliationWaitDuration: item["reconciliationWaitDuration"],
  };
}

export function fluxConfigurationPropertiesDeserializer(item: any): FluxConfigurationProperties {
  return {
    scope: item["scope"],
    namespace: item["namespace"],
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryDefinitionDeserializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketDefinitionDeserializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobDefinitionDeserializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryDefinitionDeserializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationDefinitionRecordDeserializer(item["kustomizations"]),
    configurationProtectedSettings: !item["configurationProtectedSettings"]
      ? item["configurationProtectedSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationProtectedSettings"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    statuses: !item["statuses"]
      ? item["statuses"]
      : objectStatusDefinitionArrayDeserializer(item["statuses"]),
    repositoryPublicKey: item["repositoryPublicKey"],
    sourceSyncedCommitId: item["sourceSyncedCommitId"],
    sourceUpdatedAt: !item["sourceUpdatedAt"]
      ? item["sourceUpdatedAt"]
      : new Date(item["sourceUpdatedAt"]),
    statusUpdatedAt: !item["statusUpdatedAt"]
      ? item["statusUpdatedAt"]
      : new Date(item["statusUpdatedAt"]),
    waitForReconciliation: item["waitForReconciliation"],
    reconciliationWaitDuration: item["reconciliationWaitDuration"],
    complianceState: item["complianceState"],
    provisioningState: item["provisioningState"],
    errorMessage: item["errorMessage"],
  };
}

/** Scope at which the configuration will be installed. */
export enum KnownScopeType {
  /** cluster */
  Cluster = "cluster",
  /** namespace */
  Namespace = "namespace",
}

/**
 * Scope at which the configuration will be installed. \
 * {@link KnownScopeType} can be used interchangeably with ScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cluster**: cluster \
 * **namespace**: namespace
 */
export type ScopeType = string;

/** Source Kind to pull the configuration data from. */
export enum KnownSourceKindType {
  /** GitRepository */
  GitRepository = "GitRepository",
  /** Bucket */
  Bucket = "Bucket",
  /** AzureBlob */
  AzureBlob = "AzureBlob",
  /** OCIRepository */
  OCIRepository = "OCIRepository",
}

/**
 * Source Kind to pull the configuration data from. \
 * {@link KnownSourceKindType} can be used interchangeably with SourceKindType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GitRepository**: GitRepository \
 * **Bucket**: Bucket \
 * **AzureBlob**: AzureBlob \
 * **OCIRepository**: OCIRepository
 */
export type SourceKindType = string;

/** Parameters to reconcile to the GitRepository source kind type. */
export interface GitRepositoryDefinition {
  /** The URL to sync for the flux configuration git repository. */
  url?: string;
  /** The maximum time to attempt to reconcile the cluster git repository source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster git repository source with the remote. */
  syncIntervalInSeconds?: number;
  /** The source reference for the GitRepository object. */
  repositoryRef?: RepositoryRefDefinition;
  /** Base64-encoded known_hosts value containing public SSH keys required to access private git repositories over SSH */
  sshKnownHosts?: string;
  /** Plaintext HTTPS username used to access private git repositories over HTTPS */
  httpsUser?: string;
  /** Base64-encoded HTTPS certificate authority contents used to access git private git repositories over HTTPS */
  httpsCACert?: string;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
  /** Name of the provider used for authentication. */
  provider?: ProviderType;
}

export function gitRepositoryDefinitionSerializer(item: GitRepositoryDefinition): any {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : repositoryRefDefinitionSerializer(item["repositoryRef"]),
    sshKnownHosts: item["sshKnownHosts"],
    httpsUser: item["httpsUser"],
    httpsCACert: item["httpsCACert"],
    localAuthRef: item["localAuthRef"],
    provider: item["provider"],
  };
}

export function gitRepositoryDefinitionDeserializer(item: any): GitRepositoryDefinition {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : repositoryRefDefinitionDeserializer(item["repositoryRef"]),
    sshKnownHosts: item["sshKnownHosts"],
    httpsUser: item["httpsUser"],
    httpsCACert: item["httpsCACert"],
    localAuthRef: item["localAuthRef"],
    provider: item["provider"],
  };
}

/** The source reference for the GitRepository object. */
export interface RepositoryRefDefinition {
  /** The git repository branch name to checkout. */
  branch?: string;
  /** The git repository tag name to checkout. This takes precedence over branch. */
  tag?: string;
  /** The semver range used to match against git repository tags. This takes precedence over tag. */
  semver?: string;
  /** The commit SHA to checkout. This value must be combined with the branch name to be valid. This takes precedence over semver. */
  commit?: string;
}

export function repositoryRefDefinitionSerializer(item: RepositoryRefDefinition): any {
  return {
    branch: item["branch"],
    tag: item["tag"],
    semver: item["semver"],
    commit: item["commit"],
  };
}

export function repositoryRefDefinitionDeserializer(item: any): RepositoryRefDefinition {
  return {
    branch: item["branch"],
    tag: item["tag"],
    semver: item["semver"],
    commit: item["commit"],
  };
}

/** Name of the provider used for authentication. */
export enum KnownProviderType {
  /** Azure provider can be used to authenticate to Azure DevOps repositories using Managed Identity. */
  Azure = "Azure",
  /** GitHub provider can be used to authenticate */
  GitHub = "GitHub",
  /** Generic is the default provider that indicates secret-based authentication mechanism. */
  Generic = "Generic",
}

/**
 * Name of the provider used for authentication. \
 * {@link KnownProviderType} can be used interchangeably with ProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure provider can be used to authenticate to Azure DevOps repositories using Managed Identity. \
 * **GitHub**: GitHub provider can be used to authenticate \
 * **Generic**: Generic is the default provider that indicates secret-based authentication mechanism.
 */
export type ProviderType = string;

/** Parameters to reconcile to the Bucket source kind type. */
export interface BucketDefinition {
  /** The URL to sync for the flux configuration S3 bucket. */
  url?: string;
  /** The bucket name to sync from the url endpoint for the flux configuration. */
  bucketName?: string;
  /** Specify whether to use insecure communication when puling data from the S3 bucket. */
  insecure?: boolean;
  /** The maximum time to attempt to reconcile the cluster bucket source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster bucket source with the remote. */
  syncIntervalInSeconds?: number;
  /** Plaintext access key used to securely access the S3 bucket */
  accessKey?: string;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function bucketDefinitionSerializer(item: BucketDefinition): any {
  return {
    url: item["url"],
    bucketName: item["bucketName"],
    insecure: item["insecure"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    accessKey: item["accessKey"],
    localAuthRef: item["localAuthRef"],
  };
}

export function bucketDefinitionDeserializer(item: any): BucketDefinition {
  return {
    url: item["url"],
    bucketName: item["bucketName"],
    insecure: item["insecure"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    accessKey: item["accessKey"],
    localAuthRef: item["localAuthRef"],
  };
}

/** Parameters to reconcile to the AzureBlob source kind type. */
export interface AzureBlobDefinition {
  /** The URL to sync for the flux configuration Azure Blob storage account. */
  url?: string;
  /** The Azure Blob container name to sync from the url endpoint for the flux configuration. */
  containerName?: string;
  /** The maximum time to attempt to reconcile the cluster Azure Blob source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster Azure Blob source with the remote. */
  syncIntervalInSeconds?: number;
  /** Parameters to authenticate using Service Principal. */
  servicePrincipal?: ServicePrincipalDefinition;
  /** The account key (shared key) to access the storage account */
  accountKey?: string;
  /** The Shared Access token to access the storage container */
  sasToken?: string;
  /** Parameters to authenticate using a Managed Identity. */
  managedIdentity?: ManagedIdentityDefinition;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function azureBlobDefinitionSerializer(item: AzureBlobDefinition): any {
  return {
    url: item["url"],
    containerName: item["containerName"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDefinitionSerializer(item["servicePrincipal"]),
    accountKey: item["accountKey"],
    sasToken: item["sasToken"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentityDefinitionSerializer(item["managedIdentity"]),
    localAuthRef: item["localAuthRef"],
  };
}

export function azureBlobDefinitionDeserializer(item: any): AzureBlobDefinition {
  return {
    url: item["url"],
    containerName: item["containerName"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDefinitionDeserializer(item["servicePrincipal"]),
    accountKey: item["accountKey"],
    sasToken: item["sasToken"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentityDefinitionDeserializer(item["managedIdentity"]),
    localAuthRef: item["localAuthRef"],
  };
}

/** Parameters to authenticate using Service Principal. */
export interface ServicePrincipalDefinition {
  /** The client Id for authenticating a Service Principal. */
  clientId?: string;
  /** The tenant Id for authenticating a Service Principal */
  tenantId?: string;
  /** The client secret for authenticating a Service Principal */
  clientSecret?: string;
  /** Base64-encoded certificate used to authenticate a Service Principal */
  clientCertificate?: string;
  /** The password for the certificate used to authenticate a Service Principal */
  clientCertificatePassword?: string;
  /** Specifies whether to include x5c header in client claims when acquiring a token to enable subject name / issuer based authentication for the Client Certificate */
  clientCertificateSendChain?: boolean;
}

export function servicePrincipalDefinitionSerializer(item: ServicePrincipalDefinition): any {
  return {
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    clientSecret: item["clientSecret"],
    clientCertificate: item["clientCertificate"],
    clientCertificatePassword: item["clientCertificatePassword"],
    clientCertificateSendChain: item["clientCertificateSendChain"],
  };
}

export function servicePrincipalDefinitionDeserializer(item: any): ServicePrincipalDefinition {
  return {
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    clientSecret: item["clientSecret"],
    clientCertificate: item["clientCertificate"],
    clientCertificatePassword: item["clientCertificatePassword"],
    clientCertificateSendChain: item["clientCertificateSendChain"],
  };
}

/** Parameters to authenticate using a Managed Identity. */
export interface ManagedIdentityDefinition {
  /** The client Id for authenticating a Managed Identity. */
  clientId?: string;
}

export function managedIdentityDefinitionSerializer(item: ManagedIdentityDefinition): any {
  return { clientId: item["clientId"] };
}

export function managedIdentityDefinitionDeserializer(item: any): ManagedIdentityDefinition {
  return {
    clientId: item["clientId"],
  };
}

/** Parameters to reconcile to the OCIRepository source kind type. */
export interface OCIRepositoryDefinition {
  /** The URL to sync for the flux configuration OCI repository. */
  url?: string;
  /** The maximum time to attempt to reconcile the cluster OCI repository source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster OCI repository source with the remote. */
  syncIntervalInSeconds?: number;
  /** The source reference for the OCIRepository object. */
  repositoryRef?: OCIRepositoryRefDefinition;
  /** The layer to be pulled from the OCI artifact. */
  layerSelector?: LayerSelectorDefinition;
  /** Verification of the authenticity of an OCI Artifact. */
  verify?: VerifyDefinition;
  /** Specify whether to allow connecting to a non-TLS HTTP container registry. */
  insecure?: boolean;
  /** Specifies whether to use Workload Identity to authenticate with the OCI repository. */
  useWorkloadIdentity?: boolean;
  /** The service account name to authenticate with the OCI repository. */
  serviceAccountName?: string;
  /** Parameters to authenticate using TLS config for OCI repository. */
  tlsConfig?: TlsConfigDefinition;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function ociRepositoryDefinitionSerializer(item: OCIRepositoryDefinition): any {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : ociRepositoryRefDefinitionSerializer(item["repositoryRef"]),
    layerSelector: !item["layerSelector"]
      ? item["layerSelector"]
      : layerSelectorDefinitionSerializer(item["layerSelector"]),
    verify: !item["verify"] ? item["verify"] : verifyDefinitionSerializer(item["verify"]),
    insecure: item["insecure"],
    useWorkloadIdentity: item["useWorkloadIdentity"],
    serviceAccountName: item["serviceAccountName"],
    tlsConfig: !item["tlsConfig"]
      ? item["tlsConfig"]
      : tlsConfigDefinitionSerializer(item["tlsConfig"]),
    localAuthRef: item["localAuthRef"],
  };
}

export function ociRepositoryDefinitionDeserializer(item: any): OCIRepositoryDefinition {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : ociRepositoryRefDefinitionDeserializer(item["repositoryRef"]),
    layerSelector: !item["layerSelector"]
      ? item["layerSelector"]
      : layerSelectorDefinitionDeserializer(item["layerSelector"]),
    verify: !item["verify"] ? item["verify"] : verifyDefinitionDeserializer(item["verify"]),
    insecure: item["insecure"],
    useWorkloadIdentity: item["useWorkloadIdentity"],
    serviceAccountName: item["serviceAccountName"],
    tlsConfig: !item["tlsConfig"]
      ? item["tlsConfig"]
      : tlsConfigDefinitionDeserializer(item["tlsConfig"]),
    localAuthRef: item["localAuthRef"],
  };
}

/** The source reference for the OCIRepository object. */
export interface OCIRepositoryRefDefinition {
  /** The OCI repository image tag name to pull. This defaults to 'latest'. */
  tag?: string;
  /** The semver range used to match against OCI repository tags. This takes precedence over tag. */
  semver?: string;
  /** The image digest to pull from OCI repository, the value should be in the format ‘sha256:’. This takes precedence over semver. */
  digest?: string;
}

export function ociRepositoryRefDefinitionSerializer(item: OCIRepositoryRefDefinition): any {
  return { tag: item["tag"], semver: item["semver"], digest: item["digest"] };
}

export function ociRepositoryRefDefinitionDeserializer(item: any): OCIRepositoryRefDefinition {
  return {
    tag: item["tag"],
    semver: item["semver"],
    digest: item["digest"],
  };
}

/** Parameters to specify which layer to pull from the OCI artifact. By default, the first layer in the artifact is pulled. */
export interface LayerSelectorDefinition {
  /** The first layer matching the specified media type will be used. */
  mediaType?: string;
  /** The operation to be performed on the selected layer. The default value is 'extract', but it can be set to 'copy'. */
  operation?: OperationType;
}

export function layerSelectorDefinitionSerializer(item: LayerSelectorDefinition): any {
  return { mediaType: item["mediaType"], operation: item["operation"] };
}

export function layerSelectorDefinitionDeserializer(item: any): LayerSelectorDefinition {
  return {
    mediaType: item["mediaType"],
    operation: item["operation"],
  };
}

/** The operation to be performed on the selected layer. The default value is 'extract', but it can be set to 'copy'. */
export enum KnownOperationType {
  /** extract */
  Extract = "extract",
  /** copy */
  Copy = "copy",
}

/**
 * The operation to be performed on the selected layer. The default value is 'extract', but it can be set to 'copy'. \
 * {@link KnownOperationType} can be used interchangeably with OperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **extract**: extract \
 * **copy**: copy
 */
export type OperationType = string;

/** Parameters to verify the authenticity of an OCI Artifact. */
export interface VerifyDefinition {
  /** Verification provider name. */
  provider?: string;
  /** An object containing trusted public keys of trusted authors. */
  verificationConfig?: Record<string, string>;
  /** Array defining the criteria for matching the identity while verifying an OCI artifact. */
  matchOidcIdentity?: MatchOidcIdentityDefinition[];
}

export function verifyDefinitionSerializer(item: VerifyDefinition): any {
  return {
    provider: item["provider"],
    verificationConfig: item["verificationConfig"],
    matchOidcIdentity: !item["matchOidcIdentity"]
      ? item["matchOidcIdentity"]
      : matchOidcIdentityDefinitionArraySerializer(item["matchOidcIdentity"]),
  };
}

export function verifyDefinitionDeserializer(item: any): VerifyDefinition {
  return {
    provider: item["provider"],
    verificationConfig: !item["verificationConfig"]
      ? item["verificationConfig"]
      : Object.fromEntries(
          Object.entries(item["verificationConfig"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    matchOidcIdentity: !item["matchOidcIdentity"]
      ? item["matchOidcIdentity"]
      : matchOidcIdentityDefinitionArrayDeserializer(item["matchOidcIdentity"]),
  };
}

export function matchOidcIdentityDefinitionArraySerializer(
  result: Array<MatchOidcIdentityDefinition>,
): any[] {
  return result.map((item) => {
    return matchOidcIdentityDefinitionSerializer(item);
  });
}

export function matchOidcIdentityDefinitionArrayDeserializer(
  result: Array<MatchOidcIdentityDefinition>,
): any[] {
  return result.map((item) => {
    return matchOidcIdentityDefinitionDeserializer(item);
  });
}

/** MatchOIDCIdentity defines the criteria for matching the identity while verifying an OCI artifact. */
export interface MatchOidcIdentityDefinition {
  /** The regex pattern to match against to verify the OIDC issuer. */
  issuer?: string;
  /** The regex pattern to match against to verify the identity subject. */
  subject?: string;
}

export function matchOidcIdentityDefinitionSerializer(item: MatchOidcIdentityDefinition): any {
  return { issuer: item["issuer"], subject: item["subject"] };
}

export function matchOidcIdentityDefinitionDeserializer(item: any): MatchOidcIdentityDefinition {
  return {
    issuer: item["issuer"],
    subject: item["subject"],
  };
}

/** Parameters to authenticate using TLS config for OCI repository. */
export interface TlsConfigDefinition {
  /** Base64-encoded certificate used to authenticate a client with the OCI repository. */
  clientCertificate?: string;
  /** Base64-encoded private key used to authenticate a client with the OCI repository. */
  privateKey?: string;
  /** Base64-encoded CA certificate used to verify the server. */
  caCertificate?: string;
}

export function tlsConfigDefinitionSerializer(item: TlsConfigDefinition): any {
  return {
    clientCertificate: item["clientCertificate"],
    privateKey: item["privateKey"],
    caCertificate: item["caCertificate"],
  };
}

export function tlsConfigDefinitionDeserializer(item: any): TlsConfigDefinition {
  return {
    clientCertificate: item["clientCertificate"],
    privateKey: item["privateKey"],
    caCertificate: item["caCertificate"],
  };
}

export function kustomizationDefinitionRecordSerializer(
  item: Record<string, KustomizationDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kustomizationDefinitionSerializer(item[key]);
  });
  return result;
}

export function kustomizationDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, KustomizationDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kustomizationDefinitionDeserializer(item[key]);
  });
  return result;
}

/** The Kustomization defining how to reconcile the artifact pulled by the source type on the cluster. */
export interface KustomizationDefinition {
  /** Name of the Kustomization, matching the key in the Kustomizations object map. */
  readonly name?: string;
  /** The path in the source reference to reconcile on the cluster. */
  path?: string;
  /** Specifies other Kustomizations that this Kustomization depends on. This Kustomization will not reconcile until all dependencies have completed their reconciliation. */
  dependsOn?: string[];
  /** The maximum time to attempt to reconcile the Kustomization on the cluster. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the Kustomization on the cluster. */
  syncIntervalInSeconds?: number;
  /** The interval at which to re-reconcile the Kustomization on the cluster in the event of failure on reconciliation. */
  retryIntervalInSeconds?: number;
  /** Enable/disable garbage collections of Kubernetes objects created by this Kustomization. */
  prune?: boolean;
  /** Enable/disable re-creating Kubernetes resources on the cluster when patching fails due to an immutable field change. */
  force?: boolean;
  /** Enable/disable health check for all Kubernetes objects created by this Kustomization. */
  wait?: boolean;
  /** Used for variable substitution for this Kustomization after kustomize build. */
  postBuild?: PostBuildDefinition;
}

export function kustomizationDefinitionSerializer(item: KustomizationDefinition): any {
  return {
    path: item["path"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    retryIntervalInSeconds: item["retryIntervalInSeconds"],
    prune: item["prune"],
    force: item["force"],
    wait: item["wait"],
    postBuild: !item["postBuild"]
      ? item["postBuild"]
      : postBuildDefinitionSerializer(item["postBuild"]),
  };
}

export function kustomizationDefinitionDeserializer(item: any): KustomizationDefinition {
  return {
    name: item["name"],
    path: item["path"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p1: any) => {
          return p1;
        }),
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    retryIntervalInSeconds: item["retryIntervalInSeconds"],
    prune: item["prune"],
    force: item["force"],
    wait: item["wait"],
    postBuild: !item["postBuild"]
      ? item["postBuild"]
      : postBuildDefinitionDeserializer(item["postBuild"]),
  };
}

/** The postBuild definitions defining variable substitutions for this Kustomization after kustomize build. */
export interface PostBuildDefinition {
  /** Key/value pairs holding the variables to be substituted in this Kustomization. */
  substitute?: Record<string, string>;
  /** Array of ConfigMaps/Secrets from which the variables are substituted for this Kustomization. */
  substituteFrom?: SubstituteFromDefinition[];
}

export function postBuildDefinitionSerializer(item: PostBuildDefinition): any {
  return {
    substitute: item["substitute"],
    substituteFrom: !item["substituteFrom"]
      ? item["substituteFrom"]
      : substituteFromDefinitionArraySerializer(item["substituteFrom"]),
  };
}

export function postBuildDefinitionDeserializer(item: any): PostBuildDefinition {
  return {
    substitute: !item["substitute"]
      ? item["substitute"]
      : Object.fromEntries(
          Object.entries(item["substitute"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    substituteFrom: !item["substituteFrom"]
      ? item["substituteFrom"]
      : substituteFromDefinitionArrayDeserializer(item["substituteFrom"]),
  };
}

export function substituteFromDefinitionArraySerializer(
  result: Array<SubstituteFromDefinition>,
): any[] {
  return result.map((item) => {
    return substituteFromDefinitionSerializer(item);
  });
}

export function substituteFromDefinitionArrayDeserializer(
  result: Array<SubstituteFromDefinition>,
): any[] {
  return result.map((item) => {
    return substituteFromDefinitionDeserializer(item);
  });
}

/** Array of ConfigMaps/Secrets from which the variables are substituted for this Kustomization. */
export interface SubstituteFromDefinition {
  /** Define whether it is ConfigMap or Secret that holds the variables to be used in substitution. */
  kind?: string;
  /** Name of the ConfigMap/Secret that holds the variables to be used in substitution. */
  name?: string;
  /** Set to True to proceed without ConfigMap/Secret, if it is not present. */
  optional?: boolean;
}

export function substituteFromDefinitionSerializer(item: SubstituteFromDefinition): any {
  return { kind: item["kind"], name: item["name"], optional: item["optional"] };
}

export function substituteFromDefinitionDeserializer(item: any): SubstituteFromDefinition {
  return {
    kind: item["kind"],
    name: item["name"],
    optional: item["optional"],
  };
}

export function objectStatusDefinitionArrayDeserializer(
  result: Array<ObjectStatusDefinition>,
): any[] {
  return result.map((item) => {
    return objectStatusDefinitionDeserializer(item);
  });
}

/** Statuses of objects deployed by the user-specified kustomizations from the git repository. */
export interface ObjectStatusDefinition {
  /** Name of the applied object */
  name?: string;
  /** Namespace of the applied object */
  namespace?: string;
  /** Kind of the applied object */
  kind?: string;
  /** Compliance state of the applied object showing whether the applied object has come into a ready state on the cluster. */
  complianceState?: FluxComplianceState;
  /** Object reference to the Kustomization that applied this object */
  appliedBy?: ObjectReferenceDefinition;
  /** List of Kubernetes object status conditions present on the cluster */
  statusConditions?: ObjectStatusConditionDefinition[];
  /** Additional properties that are provided from objects of the HelmRelease kind */
  helmReleaseProperties?: HelmReleasePropertiesDefinition;
}

export function objectStatusDefinitionDeserializer(item: any): ObjectStatusDefinition {
  return {
    name: item["name"],
    namespace: item["namespace"],
    kind: item["kind"],
    complianceState: item["complianceState"],
    appliedBy: !item["appliedBy"]
      ? item["appliedBy"]
      : objectReferenceDefinitionDeserializer(item["appliedBy"]),
    statusConditions: !item["statusConditions"]
      ? item["statusConditions"]
      : objectStatusConditionDefinitionArrayDeserializer(item["statusConditions"]),
    helmReleaseProperties: !item["helmReleaseProperties"]
      ? item["helmReleaseProperties"]
      : helmReleasePropertiesDefinitionDeserializer(item["helmReleaseProperties"]),
  };
}

/** Compliance state of the cluster object. */
export enum KnownFluxComplianceState {
  /** Compliant */
  Compliant = "Compliant",
  /** Non-Compliant */
  NonCompliant = "Non-Compliant",
  /** Pending */
  Pending = "Pending",
  /** Suspended */
  Suspended = "Suspended",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Compliance state of the cluster object. \
 * {@link KnownFluxComplianceState} can be used interchangeably with FluxComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compliant**: Compliant \
 * **Non-Compliant**: Non-Compliant \
 * **Pending**: Pending \
 * **Suspended**: Suspended \
 * **Unknown**: Unknown
 */
export type FluxComplianceState = string;

/** Object reference to a Kubernetes object on a cluster */
export interface ObjectReferenceDefinition {
  /** Name of the object */
  name?: string;
  /** Namespace of the object */
  namespace?: string;
}

export function objectReferenceDefinitionDeserializer(item: any): ObjectReferenceDefinition {
  return {
    name: item["name"],
    namespace: item["namespace"],
  };
}

export function objectStatusConditionDefinitionArrayDeserializer(
  result: Array<ObjectStatusConditionDefinition>,
): any[] {
  return result.map((item) => {
    return objectStatusConditionDefinitionDeserializer(item);
  });
}

/** Status condition of Kubernetes object */
export interface ObjectStatusConditionDefinition {
  /** Last time this status condition has changed */
  lastTransitionTime?: Date;
  /** A more verbose description of the object status condition */
  message?: string;
  /** Reason for the specified status condition type status */
  reason?: string;
  /** Status of the Kubernetes object condition type */
  status?: string;
  /** Object status condition type for this object */
  type?: string;
}

export function objectStatusConditionDefinitionDeserializer(
  item: any,
): ObjectStatusConditionDefinition {
  return {
    lastTransitionTime: !item["lastTransitionTime"]
      ? item["lastTransitionTime"]
      : new Date(item["lastTransitionTime"]),
    message: item["message"],
    reason: item["reason"],
    status: item["status"],
    type: item["type"],
  };
}

/** Properties for HelmRelease objects */
export interface HelmReleasePropertiesDefinition {
  /** The revision number of the last released object change */
  lastRevisionApplied?: number;
  /** The reference to the HelmChart object used as the source to this HelmRelease */
  helmChartRef?: ObjectReferenceDefinition;
  /** Total number of times that the HelmRelease failed to install or upgrade */
  failureCount?: number;
  /** Number of times that the HelmRelease failed to install */
  installFailureCount?: number;
  /** Number of times that the HelmRelease failed to upgrade */
  upgradeFailureCount?: number;
}

export function helmReleasePropertiesDefinitionDeserializer(
  item: any,
): HelmReleasePropertiesDefinition {
  return {
    lastRevisionApplied: item["lastRevisionApplied"],
    helmChartRef: !item["helmChartRef"]
      ? item["helmChartRef"]
      : objectReferenceDefinitionDeserializer(item["helmChartRef"]),
    failureCount: item["failureCount"],
    installFailureCount: item["installFailureCount"],
    upgradeFailureCount: item["upgradeFailureCount"],
  };
}

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting
 */
export type ProvisioningState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

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

/** The Flux Configuration Patch Request object. */
export interface FluxConfigurationPatch {
  /** Source Kind to pull the configuration data from. */
  sourceKind?: SourceKindType;
  /** Whether this configuration should suspend its reconciliation of its kustomizations and sources. */
  suspend?: boolean;
  /** Parameters to reconcile to the GitRepository source kind type. */
  gitRepository?: GitRepositoryPatchDefinition;
  /** Parameters to reconcile to the Bucket source kind type. */
  bucket?: BucketPatchDefinition;
  /** Parameters to reconcile to the AzureBlob source kind type. */
  azureBlob?: AzureBlobPatchDefinition;
  /** Parameters to reconcile to the OCIRepository source kind type. */
  ociRepository?: OCIRepositoryPatchDefinition;
  /** Array of kustomizations used to reconcile the artifact pulled by the source type on the cluster. */
  kustomizations?: Record<string, KustomizationPatchDefinition>;
  /** Key-value pairs of protected configuration settings for the configuration */
  configurationProtectedSettings?: Record<string, string>;
}

export function fluxConfigurationPatchSerializer(item: FluxConfigurationPatch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourceKind",
      "suspend",
      "gitRepository",
      "bucket",
      "azureBlob",
      "ociRepository",
      "kustomizations",
      "configurationProtectedSettings",
    ])
      ? undefined
      : _fluxConfigurationPatchPropertiesSerializer(item),
  };
}

/** Updatable properties of an Flux Configuration Patch Request */
export interface FluxConfigurationPatchProperties {
  /** Source Kind to pull the configuration data from. */
  sourceKind?: SourceKindType;
  /** Whether this configuration should suspend its reconciliation of its kustomizations and sources. */
  suspend?: boolean;
  /** Parameters to reconcile to the GitRepository source kind type. */
  gitRepository?: GitRepositoryPatchDefinition;
  /** Parameters to reconcile to the Bucket source kind type. */
  bucket?: BucketPatchDefinition;
  /** Parameters to reconcile to the AzureBlob source kind type. */
  azureBlob?: AzureBlobPatchDefinition;
  /** Parameters to reconcile to the OCIRepository source kind type. */
  ociRepository?: OCIRepositoryPatchDefinition;
  /** Array of kustomizations used to reconcile the artifact pulled by the source type on the cluster. */
  kustomizations?: Record<string, KustomizationPatchDefinition>;
  /** Key-value pairs of protected configuration settings for the configuration */
  configurationProtectedSettings?: Record<string, string>;
}

export function fluxConfigurationPatchPropertiesSerializer(
  item: FluxConfigurationPatchProperties,
): any {
  return {
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryPatchDefinitionSerializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketPatchDefinitionSerializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobPatchDefinitionSerializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryPatchDefinitionSerializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationPatchDefinitionRecordSerializer(item["kustomizations"]),
    configurationProtectedSettings: item["configurationProtectedSettings"],
  };
}

/** Parameters to reconcile to the GitRepository source kind type. */
export interface GitRepositoryPatchDefinition {
  /** The URL to sync for the flux configuration git repository. */
  url?: string;
  /** The maximum time to attempt to reconcile the cluster git repository source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster git repository source with the remote. */
  syncIntervalInSeconds?: number;
  /** The source reference for the GitRepository object. */
  repositoryRef?: RepositoryRefDefinition;
  /** Base64-encoded known_hosts value containing public SSH keys required to access private git repositories over SSH */
  sshKnownHosts?: string;
  /** Plaintext HTTPS username used to access private git repositories over HTTPS */
  httpsUser?: string;
  /** Base64-encoded HTTPS certificate authority contents used to access git private git repositories over HTTPS */
  httpsCACert?: string;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
  /** Name of the provider used for authentication. */
  provider?: ProviderType;
}

export function gitRepositoryPatchDefinitionSerializer(item: GitRepositoryPatchDefinition): any {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : repositoryRefDefinitionSerializer(item["repositoryRef"]),
    sshKnownHosts: item["sshKnownHosts"],
    httpsUser: item["httpsUser"],
    httpsCACert: item["httpsCACert"],
    localAuthRef: item["localAuthRef"],
    provider: item["provider"],
  };
}

/** Parameters to reconcile to the Bucket source kind type. */
export interface BucketPatchDefinition {
  /** The URL to sync for the flux configuration S3 bucket. */
  url?: string;
  /** The bucket name to sync from the url endpoint for the flux configuration. */
  bucketName?: string;
  /** Specify whether to use insecure communication when puling data from the S3 bucket. */
  insecure?: boolean;
  /** The maximum time to attempt to reconcile the cluster bucket source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster bucket source with the remote. */
  syncIntervalInSeconds?: number;
  /** Plaintext access key used to securely access the S3 bucket */
  accessKey?: string;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function bucketPatchDefinitionSerializer(item: BucketPatchDefinition): any {
  return {
    url: item["url"],
    bucketName: item["bucketName"],
    insecure: item["insecure"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    accessKey: item["accessKey"],
    localAuthRef: item["localAuthRef"],
  };
}

/** Parameters to reconcile to the AzureBlob source kind type. */
export interface AzureBlobPatchDefinition {
  /** The URL to sync for the flux configuration Azure Blob storage account. */
  url?: string;
  /** The Azure Blob container name to sync from the url endpoint for the flux configuration. */
  containerName?: string;
  /** The maximum time to attempt to reconcile the cluster Azure Blob source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster Azure Blob source with the remote. */
  syncIntervalInSeconds?: number;
  /** Parameters to authenticate using Service Principal. */
  servicePrincipal?: ServicePrincipalPatchDefinition;
  /** The account key (shared key) to access the storage account */
  accountKey?: string;
  /** The Shared Access token to access the storage container */
  sasToken?: string;
  /** Parameters to authenticate using a Managed Identity. */
  managedIdentity?: ManagedIdentityPatchDefinition;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function azureBlobPatchDefinitionSerializer(item: AzureBlobPatchDefinition): any {
  return {
    url: item["url"],
    containerName: item["containerName"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalPatchDefinitionSerializer(item["servicePrincipal"]),
    accountKey: item["accountKey"],
    sasToken: item["sasToken"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentityPatchDefinitionSerializer(item["managedIdentity"]),
    localAuthRef: item["localAuthRef"],
  };
}

/** Parameters to authenticate using Service Principal. */
export interface ServicePrincipalPatchDefinition {
  /** The client Id for authenticating a Service Principal. */
  clientId?: string;
  /** The tenant Id for authenticating a Service Principal */
  tenantId?: string;
  /** The client secret for authenticating a Service Principal */
  clientSecret?: string;
  /** Base64-encoded certificate used to authenticate a Service Principal */
  clientCertificate?: string;
  /** The password for the certificate used to authenticate a Service Principal */
  clientCertificatePassword?: string;
  /** Specifies whether to include x5c header in client claims when acquiring a token to enable subject name / issuer based authentication for the Client Certificate */
  clientCertificateSendChain?: boolean;
}

export function servicePrincipalPatchDefinitionSerializer(
  item: ServicePrincipalPatchDefinition,
): any {
  return {
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    clientSecret: item["clientSecret"],
    clientCertificate: item["clientCertificate"],
    clientCertificatePassword: item["clientCertificatePassword"],
    clientCertificateSendChain: item["clientCertificateSendChain"],
  };
}

/** Parameters to authenticate using a Managed Identity. */
export interface ManagedIdentityPatchDefinition {
  /** The client Id for authenticating a Managed Identity. */
  clientId?: string;
}

export function managedIdentityPatchDefinitionSerializer(
  item: ManagedIdentityPatchDefinition,
): any {
  return { clientId: item["clientId"] };
}

/** Parameters to reconcile to the OCIRepository source kind type. */
export interface OCIRepositoryPatchDefinition {
  /** The URL to sync for the flux configuration OCI repository. */
  url?: string;
  /** The maximum time to attempt to reconcile the cluster OCI repository source with the remote. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the cluster OCI repository source with the remote. */
  syncIntervalInSeconds?: number;
  /** The source reference for the OCIRepository object. */
  repositoryRef?: OCIRepositoryRefPatchDefinition;
  /** The layer to be pulled from the OCI artifact. */
  layerSelector?: LayerSelectorPatchDefinition;
  /** Verification of the authenticity of an OCI Artifact. */
  verify?: VerifyPatchDefinition;
  /** Specify whether to allow connecting to a non-TLS HTTP container registry. */
  insecure?: boolean;
  /** Specifies whether to use Workload Identity to authenticate with the OCI repository. */
  useWorkloadIdentity?: boolean;
  /** The service account name to authenticate with the OCI repository. */
  serviceAccountName?: string;
  /** Parameters to authenticate using TLS config for OCI repository. */
  tlsConfig?: TlsConfigPatchDefinition;
  /** Name of a local secret on the Kubernetes cluster to use as the authentication secret rather than the managed or user-provided configuration secrets. */
  localAuthRef?: string;
}

export function ociRepositoryPatchDefinitionSerializer(item: OCIRepositoryPatchDefinition): any {
  return {
    url: item["url"],
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    repositoryRef: !item["repositoryRef"]
      ? item["repositoryRef"]
      : ociRepositoryRefPatchDefinitionSerializer(item["repositoryRef"]),
    layerSelector: !item["layerSelector"]
      ? item["layerSelector"]
      : layerSelectorPatchDefinitionSerializer(item["layerSelector"]),
    verify: !item["verify"] ? item["verify"] : verifyPatchDefinitionSerializer(item["verify"]),
    insecure: item["insecure"],
    useWorkloadIdentity: item["useWorkloadIdentity"],
    serviceAccountName: item["serviceAccountName"],
    tlsConfig: !item["tlsConfig"]
      ? item["tlsConfig"]
      : tlsConfigPatchDefinitionSerializer(item["tlsConfig"]),
    localAuthRef: item["localAuthRef"],
  };
}

/** The source reference for the OCIRepository object. */
export interface OCIRepositoryRefPatchDefinition {
  /** The OCI repository image tag name to pull. This defaults to 'latest'. */
  tag?: string;
  /** The semver range used to match against OCI repository tags. This takes precedence over tag. */
  semver?: string;
  /** The image digest to pull from OCI repository, the value should be in the format ‘sha256:’. This takes precedence over semver. */
  digest?: string;
}

export function ociRepositoryRefPatchDefinitionSerializer(
  item: OCIRepositoryRefPatchDefinition,
): any {
  return { tag: item["tag"], semver: item["semver"], digest: item["digest"] };
}

/** Parameters to specify which layer to pull from the OCI artifact. By default, the first layer in the artifact is pulled. */
export interface LayerSelectorPatchDefinition {
  /** The first layer matching the specified media type will be used. */
  mediaType?: string;
  /** The operation to be performed on the selected layer. The default value is 'extract', but it can be set to 'copy'. */
  operation?: OperationType;
}

export function layerSelectorPatchDefinitionSerializer(item: LayerSelectorPatchDefinition): any {
  return { mediaType: item["mediaType"], operation: item["operation"] };
}

/** Parameters to verify the authenticity of an OCI Artifact. */
export interface VerifyPatchDefinition {
  /** Verification provider name. */
  provider?: string;
  /** An object containing trusted public keys of trusted authors. */
  verificationConfig?: Record<string, string>;
  /** Array defining the criteria for matching the OIDC identity while verifying an OCI artifact. */
  matchOidcIdentity?: MatchOidcIdentityPatchDefinition[];
}

export function verifyPatchDefinitionSerializer(item: VerifyPatchDefinition): any {
  return {
    provider: item["provider"],
    verificationConfig: item["verificationConfig"],
    matchOidcIdentity: !item["matchOidcIdentity"]
      ? item["matchOidcIdentity"]
      : matchOidcIdentityPatchDefinitionArraySerializer(item["matchOidcIdentity"]),
  };
}

export function matchOidcIdentityPatchDefinitionArraySerializer(
  result: Array<MatchOidcIdentityPatchDefinition>,
): any[] {
  return result.map((item) => {
    return matchOidcIdentityPatchDefinitionSerializer(item);
  });
}

/** MatchOIDCIdentity defines the criteria for matching the identity while verifying an OCI artifact. */
export interface MatchOidcIdentityPatchDefinition {
  /** The regex pattern to match against to verify the OIDC issuer. */
  issuer?: string;
  /** The regex pattern to match against to verify the identity subject. */
  subject?: string;
}

export function matchOidcIdentityPatchDefinitionSerializer(
  item: MatchOidcIdentityPatchDefinition,
): any {
  return { issuer: item["issuer"], subject: item["subject"] };
}

/** Parameters to authenticate using TLS config for OCI repository. */
export interface TlsConfigPatchDefinition {
  /** Base64-encoded certificate used to authenticate a client with the OCI repository. */
  clientCertificate?: string;
  /** Base64-encoded private key used to authenticate a client with the OCI repository. */
  privateKey?: string;
  /** Base64-encoded CA certificate used to verify the server. */
  caCertificate?: string;
}

export function tlsConfigPatchDefinitionSerializer(item: TlsConfigPatchDefinition): any {
  return {
    clientCertificate: item["clientCertificate"],
    privateKey: item["privateKey"],
    caCertificate: item["caCertificate"],
  };
}

export function kustomizationPatchDefinitionRecordSerializer(
  item: Record<string, KustomizationPatchDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kustomizationPatchDefinitionSerializer(item[key]);
  });
  return result;
}

/** The Kustomization defining how to reconcile the artifact pulled by the source type on the cluster. */
export interface KustomizationPatchDefinition {
  /** The path in the source reference to reconcile on the cluster. */
  path?: string;
  /** Specifies other Kustomizations that this Kustomization depends on. This Kustomization will not reconcile until all dependencies have completed their reconciliation. */
  dependsOn?: string[];
  /** The maximum time to attempt to reconcile the Kustomization on the cluster. */
  timeoutInSeconds?: number;
  /** The interval at which to re-reconcile the Kustomization on the cluster. */
  syncIntervalInSeconds?: number;
  /** The interval at which to re-reconcile the Kustomization on the cluster in the event of failure on reconciliation. */
  retryIntervalInSeconds?: number;
  /** Enable/disable garbage collections of Kubernetes objects created by this Kustomization. */
  prune?: boolean;
  /** Enable/disable re-creating Kubernetes resources on the cluster when patching fails due to an immutable field change. */
  force?: boolean;
  /** Enable/disable health check for all Kubernetes objects created by this Kustomization. */
  wait?: boolean;
  /** Used for variable substitution for this Kustomization after kustomize build. */
  postBuild?: PostBuildPatchDefinition;
}

export function kustomizationPatchDefinitionSerializer(item: KustomizationPatchDefinition): any {
  return {
    path: item["path"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    timeoutInSeconds: item["timeoutInSeconds"],
    syncIntervalInSeconds: item["syncIntervalInSeconds"],
    retryIntervalInSeconds: item["retryIntervalInSeconds"],
    prune: item["prune"],
    force: item["force"],
    wait: item["wait"],
    postBuild: !item["postBuild"]
      ? item["postBuild"]
      : postBuildPatchDefinitionSerializer(item["postBuild"]),
  };
}

/** The postBuild definitions defining variable substitutions for this Kustomization after kustomize build. */
export interface PostBuildPatchDefinition {
  /** Key/value pairs holding the variables to be substituted in this Kustomization. */
  substitute?: Record<string, string>;
  /** Array of ConfigMaps/Secrets from which the variables are substituted for this Kustomization. */
  substituteFrom?: SubstituteFromPatchDefinition[];
}

export function postBuildPatchDefinitionSerializer(item: PostBuildPatchDefinition): any {
  return {
    substitute: item["substitute"],
    substituteFrom: !item["substituteFrom"]
      ? item["substituteFrom"]
      : substituteFromPatchDefinitionArraySerializer(item["substituteFrom"]),
  };
}

export function substituteFromPatchDefinitionArraySerializer(
  result: Array<SubstituteFromPatchDefinition>,
): any[] {
  return result.map((item) => {
    return substituteFromPatchDefinitionSerializer(item);
  });
}

/** Array of ConfigMaps/Secrets from which the variables are substituted for this Kustomization. */
export interface SubstituteFromPatchDefinition {
  /** Define whether it is ConfigMap or Secret that holds the variables to be used in substitution. */
  kind?: string;
  /** Name of the ConfigMap/Secret that holds the variables to be used in substitution. */
  name?: string;
  /** Set to True to proceed without ConfigMap/Secret, if it is not present. */
  optional?: boolean;
}

export function substituteFromPatchDefinitionSerializer(item: SubstituteFromPatchDefinition): any {
  return { kind: item["kind"], name: item["name"], optional: item["optional"] };
}

/** Result of the request to list Flux Configurations.  It contains a list of FluxConfiguration objects and a URL link to get the next set of results. */
export interface _FluxConfigurationsList {
  /** The FluxConfiguration items on this page */
  readonly value: FluxConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fluxConfigurationsListDeserializer(item: any): _FluxConfigurationsList {
  return {
    value: fluxConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fluxConfigurationArraySerializer(result: Array<FluxConfiguration>): any[] {
  return result.map((item) => {
    return fluxConfigurationSerializer(item);
  });
}

export function fluxConfigurationArrayDeserializer(result: Array<FluxConfiguration>): any[] {
  return result.map((item) => {
    return fluxConfigurationDeserializer(item);
  });
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Additional information, if available. */
  properties?: Record<string, string>;
  /** If present, details of the operation error. */
  readonly error?: ErrorDetail;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01 API version. */
  V20250401 = "2025-04-01",
}

export function _fluxConfigurationPropertiesSerializer(item: FluxConfiguration): any {
  return {
    scope: item["scope"],
    namespace: item["namespace"],
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryDefinitionSerializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketDefinitionSerializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobDefinitionSerializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryDefinitionSerializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationDefinitionRecordSerializer(item["kustomizations"]),
    configurationProtectedSettings: item["configurationProtectedSettings"],
    waitForReconciliation: item["waitForReconciliation"],
    reconciliationWaitDuration: item["reconciliationWaitDuration"],
  };
}

export function _fluxConfigurationPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    namespace: item["namespace"],
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryDefinitionDeserializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketDefinitionDeserializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobDefinitionDeserializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryDefinitionDeserializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationDefinitionRecordDeserializer(item["kustomizations"]),
    configurationProtectedSettings: !item["configurationProtectedSettings"]
      ? item["configurationProtectedSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationProtectedSettings"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    statuses: !item["statuses"]
      ? item["statuses"]
      : objectStatusDefinitionArrayDeserializer(item["statuses"]),
    repositoryPublicKey: item["repositoryPublicKey"],
    sourceSyncedCommitId: item["sourceSyncedCommitId"],
    sourceUpdatedAt: !item["sourceUpdatedAt"]
      ? item["sourceUpdatedAt"]
      : new Date(item["sourceUpdatedAt"]),
    statusUpdatedAt: !item["statusUpdatedAt"]
      ? item["statusUpdatedAt"]
      : new Date(item["statusUpdatedAt"]),
    waitForReconciliation: item["waitForReconciliation"],
    reconciliationWaitDuration: item["reconciliationWaitDuration"],
    complianceState: item["complianceState"],
    provisioningState: item["provisioningState"],
    errorMessage: item["errorMessage"],
  };
}

export function _fluxConfigurationPatchPropertiesSerializer(item: FluxConfigurationPatch): any {
  return {
    sourceKind: item["sourceKind"],
    suspend: item["suspend"],
    gitRepository: !item["gitRepository"]
      ? item["gitRepository"]
      : gitRepositoryPatchDefinitionSerializer(item["gitRepository"]),
    bucket: !item["bucket"] ? item["bucket"] : bucketPatchDefinitionSerializer(item["bucket"]),
    azureBlob: !item["azureBlob"]
      ? item["azureBlob"]
      : azureBlobPatchDefinitionSerializer(item["azureBlob"]),
    ociRepository: !item["ociRepository"]
      ? item["ociRepository"]
      : ociRepositoryPatchDefinitionSerializer(item["ociRepository"]),
    kustomizations: !item["kustomizations"]
      ? item["kustomizations"]
      : kustomizationPatchDefinitionRecordSerializer(item["kustomizations"]),
    configurationProtectedSettings: item["configurationProtectedSettings"],
  };
}
