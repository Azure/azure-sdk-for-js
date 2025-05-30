## API Report File for "@azure/arm-containerorchestratorruntime"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbortSignalLike } from '@azure/abort-controller';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PathUncheckedResponse } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';
import { PollerLike } from '@azure/core-lro';
import { TokenCredential } from '@azure/core-auth';

// @public
export type AccessMode = string;

// @public
export type ActionType = string;

// @public
export type AdvertiseMode = string;

// @public
export interface BgpPeer extends ExtensionResource {
    properties?: BgpPeerProperties;
}

// @public
export interface BgpPeerProperties {
    myAsn: number;
    peerAddress: string;
    peerAsn: number;
    readonly provisioningState?: ProvisioningState;
}

// @public
export interface BgpPeersCreateOrUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface BgpPeersDeleteOptionalParams extends OperationOptions {
}

// @public
export interface BgpPeersGetOptionalParams extends OperationOptions {
}

// @public
export interface BgpPeersListOptionalParams extends OperationOptions {
}

// @public
export interface BgpPeersOperations {
    createOrUpdate: (resourceUri: string, bgpPeerName: string, resource: BgpPeer, options?: BgpPeersCreateOrUpdateOptionalParams) => PollerLike<OperationState<BgpPeer>, BgpPeer>;
    delete: (resourceUri: string, bgpPeerName: string, options?: BgpPeersDeleteOptionalParams) => Promise<void>;
    get: (resourceUri: string, bgpPeerName: string, options?: BgpPeersGetOptionalParams) => Promise<BgpPeer>;
    list: (resourceUri: string, options?: BgpPeersListOptionalParams) => PagedAsyncIterableIterator<BgpPeer>;
}

// @public
export interface BlobStorageClassTypeProperties extends StorageClassTypeProperties {
    azureStorageAccountKey: string;
    azureStorageAccountName: string;
    type: "Blob";
}

// @public
export type ContinuablePage<TElement, TPage = TElement[]> = TPage & {
    continuationToken?: string;
};

// @public
export type CreatedByType = string;

// @public
export type DataResilienceTier = string;

// @public
export interface ExtensionResource extends Resource {
}

// @public
export type FailoverTier = string;

// @public
export enum KnownAccessMode {
    ReadWriteMany = "ReadWriteMany",
    ReadWriteOnce = "ReadWriteOnce"
}

// @public
export enum KnownActionType {
    Internal = "Internal"
}

// @public
export enum KnownAdvertiseMode {
    ARP = "ARP",
    BGP = "BGP",
    Both = "Both"
}

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownDataResilienceTier {
    DataResilient = "DataResilient",
    NotDataResilient = "NotDataResilient"
}

// @public
export enum KnownFailoverTier {
    Fast = "Fast",
    NotAvailable = "NotAvailable",
    Slow = "Slow",
    Super = "Super"
}

// @public
export enum KnownNfsDirectoryActionOnVolumeDeletion {
    Delete = "Delete",
    Retain = "Retain"
}

// @public
export enum KnownOrigin {
    System = "system",
    User = "user",
    UserSystem = "user,system"
}

// @public
export enum KnownPerformanceTier {
    Basic = "Basic",
    Premium = "Premium",
    Standard = "Standard",
    Ultra = "Ultra",
    Undefined = "Undefined"
}

// @public
export enum KnownProvisioningState {
    Accepted = "Accepted",
    Canceled = "Canceled",
    Deleting = "Deleting",
    Failed = "Failed",
    Provisioning = "Provisioning",
    Succeeded = "Succeeded",
    Updating = "Updating"
}

// @public
export enum KnownSCType {
    Blob = "Blob",
    Native = "Native",
    NFS = "NFS",
    RWX = "RWX",
    SMB = "SMB"
}

// @public
export enum KnownVolumeBindingMode {
    Immediate = "Immediate",
    WaitForFirstConsumer = "WaitForFirstConsumer"
}

// @public
export enum KnownVolumeExpansion {
    Allow = "Allow",
    Disallow = "Disallow"
}

// @public (undocumented)
export class KubernetesRuntimeClient {
    constructor(credential: TokenCredential, options?: KubernetesRuntimeClientOptionalParams);
    readonly bgpPeers: BgpPeersOperations;
    readonly loadBalancers: LoadBalancersOperations;
    readonly operations: OperationsOperations;
    readonly pipeline: Pipeline;
    readonly services: ServicesOperations;
    readonly storageClass: StorageClassOperations;
}

// @public
export interface KubernetesRuntimeClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}

// @public
export interface LoadBalancer extends ExtensionResource {
    properties?: LoadBalancerProperties;
}

// @public
export interface LoadBalancerProperties {
    addresses: string[];
    advertiseMode: AdvertiseMode;
    bgpPeers?: string[];
    readonly provisioningState?: ProvisioningState;
    serviceSelector?: Record<string, string>;
}

// @public
export interface LoadBalancersCreateOrUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface LoadBalancersDeleteOptionalParams extends OperationOptions {
}

// @public
export interface LoadBalancersGetOptionalParams extends OperationOptions {
}

// @public
export interface LoadBalancersListOptionalParams extends OperationOptions {
}

// @public
export interface LoadBalancersOperations {
    createOrUpdate: (resourceUri: string, loadBalancerName: string, resource: LoadBalancer, options?: LoadBalancersCreateOrUpdateOptionalParams) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
    delete: (resourceUri: string, loadBalancerName: string, options?: LoadBalancersDeleteOptionalParams) => Promise<void>;
    get: (resourceUri: string, loadBalancerName: string, options?: LoadBalancersGetOptionalParams) => Promise<LoadBalancer>;
    list: (resourceUri: string, options?: LoadBalancersListOptionalParams) => PagedAsyncIterableIterator<LoadBalancer>;
}

// @public
export interface NativeStorageClassTypeProperties extends StorageClassTypeProperties {
    type: "Native";
}

// @public
export type NfsDirectoryActionOnVolumeDeletion = string;

// @public
export interface NfsStorageClassTypeProperties extends StorageClassTypeProperties {
    mountPermissions?: string;
    onDelete?: NfsDirectoryActionOnVolumeDeletion;
    server: string;
    share: string;
    subDir?: string;
    type: "NFS";
}

// @public
export interface Operation {
    actionType?: ActionType;
    readonly display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    readonly description?: string;
    readonly operation?: string;
    readonly provider?: string;
    readonly resource?: string;
}

// @public
export interface OperationsListOptionalParams extends OperationOptions {
}

// @public
export interface OperationsOperations {
    list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

// @public
export type Origin = string;

// @public
export interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings extends PageSettings = PageSettings> {
    [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;
    byPage: (settings?: TPageSettings) => AsyncIterableIterator<ContinuablePage<TElement, TPage>>;
    next(): Promise<IteratorResult<TElement>>;
}

// @public
export interface PageSettings {
    continuationToken?: string;
}

// @public
export type PerformanceTier = string;

// @public
export type ProvisioningState = string;

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(client: KubernetesRuntimeClient, serializedState: string, sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>, options?: RestorePollerOptions<TResult>): PollerLike<OperationState<TResult>, TResult>;

// @public (undocumented)
export interface RestorePollerOptions<TResult, TResponse extends PathUncheckedResponse = PathUncheckedResponse> extends OperationOptions {
    abortSignal?: AbortSignalLike;
    processResponseBody?: (result: TResponse) => Promise<TResult>;
    updateIntervalInMs?: number;
}

// @public
export interface RwxStorageClassTypeProperties extends StorageClassTypeProperties {
    backingStorageClassName: string;
    type: "RWX";
}

// @public
export type SCType = string;

// @public
export interface ServiceProperties {
    readonly provisioningState?: ProvisioningState;
    readonly rpObjectId?: string;
}

// @public
export interface ServiceResource extends ExtensionResource {
    properties?: ServiceProperties;
}

// @public
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {
}

// @public
export interface ServicesDeleteOptionalParams extends OperationOptions {
}

// @public
export interface ServicesGetOptionalParams extends OperationOptions {
}

// @public
export interface ServicesListOptionalParams extends OperationOptions {
}

// @public
export interface ServicesOperations {
    createOrUpdate: (resourceUri: string, serviceName: string, resource: ServiceResource, options?: ServicesCreateOrUpdateOptionalParams) => Promise<ServiceResource>;
    delete: (resourceUri: string, serviceName: string, options?: ServicesDeleteOptionalParams) => Promise<void>;
    get: (resourceUri: string, serviceName: string, options?: ServicesGetOptionalParams) => Promise<ServiceResource>;
    list: (resourceUri: string, options?: ServicesListOptionalParams) => PagedAsyncIterableIterator<ServiceResource>;
}

// @public
export interface SmbStorageClassTypeProperties extends StorageClassTypeProperties {
    domain?: string;
    password?: string;
    source: string;
    subDir?: string;
    type: "SMB";
    username?: string;
}

// @public
export interface StorageClassCreateOrUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface StorageClassDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface StorageClassGetOptionalParams extends OperationOptions {
}

// @public
export interface StorageClassListOptionalParams extends OperationOptions {
}

// @public
export interface StorageClassOperations {
    createOrUpdate: (resourceUri: string, storageClassName: string, resource: StorageClassResource, options?: StorageClassCreateOrUpdateOptionalParams) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
    delete: (resourceUri: string, storageClassName: string, options?: StorageClassDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    get: (resourceUri: string, storageClassName: string, options?: StorageClassGetOptionalParams) => Promise<StorageClassResource>;
    list: (resourceUri: string, options?: StorageClassListOptionalParams) => PagedAsyncIterableIterator<StorageClassResource>;
    update: (resourceUri: string, storageClassName: string, properties: StorageClassResourceUpdate, options?: StorageClassUpdateOptionalParams) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
}

// @public
export interface StorageClassProperties {
    accessModes?: AccessMode[];
    allowVolumeExpansion?: VolumeExpansion;
    dataResilience?: DataResilienceTier;
    failoverSpeed?: FailoverTier;
    limitations?: string[];
    mountOptions?: string[];
    performance?: PerformanceTier;
    priority?: number;
    provisioner?: string;
    readonly provisioningState?: ProvisioningState;
    typeProperties: StorageClassTypePropertiesUnion;
    volumeBindingMode?: VolumeBindingMode;
}

// @public
export interface StorageClassPropertiesUpdate {
    accessModes?: AccessMode[];
    allowVolumeExpansion?: VolumeExpansion;
    dataResilience?: DataResilienceTier;
    failoverSpeed?: FailoverTier;
    limitations?: string[];
    mountOptions?: string[];
    performance?: PerformanceTier;
    priority?: number;
    typeProperties?: StorageClassTypePropertiesUpdate;
}

// @public
export interface StorageClassResource extends ExtensionResource {
    properties?: StorageClassProperties;
}

// @public
export interface StorageClassResourceUpdate {
    properties?: StorageClassPropertiesUpdate;
}

// @public
export interface StorageClassTypeProperties {
    type: SCType;
}

// @public
export type StorageClassTypePropertiesUnion = NativeStorageClassTypeProperties | RwxStorageClassTypeProperties | BlobStorageClassTypeProperties | NfsStorageClassTypeProperties | SmbStorageClassTypeProperties | StorageClassTypeProperties;

// @public
export interface StorageClassTypePropertiesUpdate {
    azureStorageAccountKey?: string;
    azureStorageAccountName?: string;
    backingStorageClassName?: string;
    domain?: string;
    mountPermissions?: string;
    onDelete?: NfsDirectoryActionOnVolumeDeletion;
    password?: string;
    server?: string;
    share?: string;
    source?: string;
    subDir?: string;
    username?: string;
}

// @public
export interface StorageClassUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface SystemData {
    createdAt?: Date;
    createdBy?: string;
    createdByType?: CreatedByType;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
}

// @public
export type VolumeBindingMode = string;

// @public
export type VolumeExpansion = string;

// (No @packageDocumentation comment for this package)

```
