// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A received share data transfer object. */
export interface ReceivedShareParent extends ProxyResource {
  shareKind: "ReceivedShare" | "InPlace";
}

/** Base data transfer object implementation for proxy resources. */
export interface ProxyResource {}

/** A sent share data transfer object. */
export interface SentShareParent extends ProxyResource {
  shareKind: "SentShare" | "InPlace";
}

/** A sent share invitation data transfer object. */
export interface SentShareInvitationParent extends ProxyResource {
  invitationKind: "SentShareInvitation" | "Service" | "User";
}

/** A share resource. */
export interface ShareResource extends ProxyResource {
  /** A count of Received Shares associated with the Microsoft.Azure.Purview.Share.ApiService.V3.DataTransferObjects.ShareResource. */
  receivedSharesCount?: number;
  /** A count of Sent Shares associated with the Microsoft.Azure.Purview.Share.ApiService.V3.DataTransferObjects.ShareResource. */
  sentSharesCount?: number;
  /** The types of asset. */
  storeKind?: "AdlsGen2Account" | "BlobAccount";
  /** A Store Reference for an artifact or sink. */
  storeReference?: StoreReference;
}

/** A Store Reference for an artifact or sink. */
export interface StoreReference {
  /** Reference name for resource associated with the sink or artifact. */
  referenceName?: string;
  /** Defines the type of resource being shared */
  type?: "ArmResourceReference";
}

/** A tenant email registration data transfer object. */
export interface TenantEmailRegistration extends ProxyResource {
  /** Tenant email registration property bag. */
  properties?: TenantEmailRegistrationProperties;
}

/** Tenant email registration property bag. */
export interface TenantEmailRegistrationProperties {
  /** Activation code for the registration. */
  activationCode: string;
}

/** AdlsGen2 Sink */
export interface AdlsGen2AccountSink extends SinkParent {
  /** Properties for AdlsGen2 storage account */
  properties: AdlsGen2AccountSinkProperties;
  storeKind: "AdlsGen2Account";
}

/** Properties for AdlsGen2 storage account */
export interface AdlsGen2AccountSinkProperties {
  /** Adls Gen 2 Container Name */
  containerName: string;
  /** Adls Gen 2 Folder */
  folder: string;
  /** Adls Gen 2 Mount Path */
  mountPath?: string;
}

/** Holds details on the destination of the mapped artifact */
export interface SinkParent {
  /** A Store Reference for an artifact or sink. */
  storeReference: StoreReference;
  storeKind: "Sink" | "AdlsGen2Account" | "BlobAccount";
}

/** An Adls Gen2 storage account artifact. */
export interface AdlsGen2Artifact extends ArtifactParent {
  /** Properties for Adls Gen2 storage account. */
  properties: AdlsGen2ArtifactProperties;
  storeKind: "AdlsGen2Account";
}

/** Properties for Adls Gen2 storage account. */
export interface AdlsGen2ArtifactProperties {
  /** A list of Adls Gen2 storage account paths. */
  paths: Array<StorageAccountPath>;
}

/** Defines a single StorageAccountPath path */
export interface StorageAccountPath {
  /** Gets or sets the container name */
  containerName: string;
  /** Gets or sets the path on the receiver side where the artifact is to be mapped */
  receiverPath?: string;
  /** Gets or sets the path to file/folder within the container to be shared */
  senderPath?: string;
}

/** A class for sent share artifact. */
export interface ArtifactParent {
  /** A Store Reference for an artifact or sink. */
  storeReference: StoreReference;
  storeKind: "Artifact" | "AdlsGen2Account" | "BlobAccount";
}

/** Blob Sink */
export interface BlobAccountSink extends SinkParent {
  /** Properties for blob storage account */
  properties: BlobAccountSinkProperties;
  storeKind: "BlobAccount";
}

/** Properties for blob storage account */
export interface BlobAccountSinkProperties {
  /** Blob Container Name */
  containerName: string;
  /** Blob Folder */
  folder: string;
  /** Blob Mount Path */
  mountPath?: string;
}

/** Blob storage account artifact. */
export interface BlobStorageArtifact extends ArtifactParent {
  /** Properties for blob storage account. */
  properties: BlobStorageArtifactProperties;
  storeKind: "BlobAccount";
}

/** Properties for blob storage account. */
export interface BlobStorageArtifactProperties {
  /** A list of blob storage account paths. */
  paths: Array<StorageAccountPath>;
}

/** An InPlace received share kind. */
export interface InPlaceReceivedShare extends ReceivedShareParent {
  /** Properties of in place received share. */
  properties: InPlaceReceivedShareProperties;
  shareKind: "InPlace";
}

/** Properties of in place received share. */
export interface InPlaceReceivedShareProperties {
  /** The types of asset. */
  assetStoreKind?: "AdlsGen2Account" | "BlobAccount";
  /** Received Share Name */
  displayName?: string;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /** Holds details on the destination of the mapped artifact */
  sink?: Sink;
}

/** An InPlace share kind. */
export interface InPlaceSentShare extends SentShareParent {
  /** Properties for InPlace sent share. */
  properties: InPlaceSentShareProperties;
  shareKind: "InPlace";
}

/** Properties for InPlace sent share. */
export interface InPlaceSentShareProperties {
  /** A class for sent share artifact. */
  artifact: Artifact;
  /** Sent share description. */
  description?: string;
  /** The name of the sent share */
  displayName: string;
}

/** An service invitation kind. */
export interface ServiceInvitation extends SentShareInvitationParent {
  /** Properties of the service invitation type. */
  properties: ServiceInvitationProperties;
  invitationKind: "Service";
}

/** Properties of the service invitation type. */
export interface ServiceInvitationProperties {
  /** The time at which the invitation will expire. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  expirationDate?: Date | string;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /**
   * The target azure active directory id the invitation is sent to.
   *
   * Value may contain a UUID
   */
  targetActiveDirectoryId: string;
  /**
   * The target object id in the azure active directory the invitation is sent to.
   *
   * Value may contain a UUID
   */
  targetObjectId: string;
}

/** A user invitation kind. */
export interface UserInvitation extends SentShareInvitationParent {
  /** Properties of the user invitation type. */
  properties: UserInvitationProperties;
  invitationKind: "User";
}

/** Properties of the user invitation type. */
export interface UserInvitationProperties {
  /** The time at which the invitation will expire. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  expirationDate?: Date | string;
  /** Whether or not the recipient was notified via email. */
  notify?: boolean;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /** The receiver email for the invitation is being sent. */
  targetEmail: string;
}

/** A received share data transfer object. */
export type ReceivedShare = InPlaceReceivedShare;
/** A sent share data transfer object. */
export type SentShare = InPlaceSentShare;
/** A sent share invitation data transfer object. */
export type SentShareInvitation = ServiceInvitation | UserInvitation;
/** Holds details on the destination of the mapped artifact */
export type Sink = AdlsGen2AccountSink | BlobAccountSink;
/** A class for sent share artifact. */
export type Artifact = AdlsGen2Artifact | BlobStorageArtifact;
