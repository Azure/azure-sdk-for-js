// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A received share data transfer object. */
export interface ReceivedShareOutputParent extends ProxyResourceOutput {
  shareKind: "ReceivedShare" | "InPlace";
}

/** Base data transfer object implementation for proxy resources. */
export interface ProxyResourceOutput {
  /** The unique id of the resource. */
  readonly id?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** The purview share error model. */
export interface PurviewShareErrorOutput {
  /** The purview share error body model. */
  error: PurviewShareErrorInfoOutput;
}

/** The purview share error body model. */
export interface PurviewShareErrorInfoOutput {
  /** Code of the error */
  code: string;
  /** Nested details of the error model */
  details?: Array<PurviewShareErrorInfoOutput>;
  /** Message of the error */
  message: string;
  /** Target of the error */
  target?: string;
}

/** Response for long running operation. */
export interface OperationResponseOutput {
  /** End time of the long running operation. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  endTime?: string;
  /** The purview share error body model. */
  error?: PurviewShareErrorInfoOutput;
  /** Job id of the long running operation */
  id?: string;
  /** Start time of the long running operation. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  startTime?: string;
  /** States for long running operations. */
  status: "Running" | "TransientFailure" | "Succeeded" | "Failed" | "NotStarted";
}

/** List of received shares. */
export interface ReceivedShareListOutput {
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type ReceivedShare */
  value: Array<ReceivedShareOutput>;
}

/** List of sent shares. */
export interface SentShareListOutput {
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type SentShare */
  value: Array<SentShareOutput>;
}

/** A sent share data transfer object. */
export interface SentShareOutputParent extends ProxyResourceOutput {
  shareKind: "SentShare" | "InPlace";
}

/** List of the sent share invitations */
export interface SentShareInvitationListOutput {
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type SentShareInvitation */
  value: Array<SentShareInvitationOutput>;
}

/** A sent share invitation data transfer object. */
export interface SentShareInvitationOutputParent extends ProxyResourceOutput {
  invitationKind: "SentShareInvitation" | "Service" | "User";
}

/** A page of ShareResource results. */
export interface ShareResourceListOutput {
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type ShareResource */
  value: Array<ShareResourceOutput>;
}

/** A share resource. */
export interface ShareResourceOutput extends ProxyResourceOutput {
  /** A count of Received Shares associated with the Microsoft.Azure.Purview.Share.ApiService.V3.DataTransferObjects.ShareResource. */
  receivedSharesCount?: number;
  /** A count of Sent Shares associated with the Microsoft.Azure.Purview.Share.ApiService.V3.DataTransferObjects.ShareResource. */
  sentSharesCount?: number;
  /** The types of asset. */
  storeKind?: "AdlsGen2Account" | "BlobAccount";
  /** A Store Reference for an artifact or sink. */
  storeReference?: StoreReferenceOutput;
}

/** A Store Reference for an artifact or sink. */
export interface StoreReferenceOutput {
  /** Reference name for resource associated with the sink or artifact. */
  referenceName?: string;
  /** Defines the type of resource being shared */
  type?: "ArmResourceReference";
}

/** A tenant email registration data transfer object. */
export interface TenantEmailRegistrationOutput extends ProxyResourceOutput {
  /** Tenant email registration property bag. */
  properties?: TenantEmailRegistrationPropertiesOutput;
}

/** Tenant email registration property bag. */
export interface TenantEmailRegistrationPropertiesOutput {
  /** Activation code for the registration. */
  activationCode: string;
  /** Date of the activation expiration. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly activationExpiration?: string;
  /** The email to register. */
  readonly email?: string;
  /** Defines the supported types for registration. */
  readonly registrationStatus?: "ActivationPending" | "Activated" | "ActivationAttemptsExhausted";
  /** State of the resource */
  readonly state?: "Unknown" | "Succeeded" | "Creating" | "Deleting" | "Moving" | "Failed";
  /** The tenant id to register. */
  readonly tenantId?: string;
}

/** AdlsGen2 Sink */
export interface AdlsGen2AccountSinkOutput extends SinkOutputParent {
  /** Properties for AdlsGen2 storage account */
  properties: AdlsGen2AccountSinkPropertiesOutput;
  storeKind: "AdlsGen2Account";
}

/** Properties for AdlsGen2 storage account */
export interface AdlsGen2AccountSinkPropertiesOutput {
  /** Adls Gen 2 Container Name */
  containerName: string;
  /** Adls Gen 2 Folder */
  folder: string;
  /** Adls Gen 2 Location */
  readonly location?: string;
  /** Adls Gen 2 Mount Path */
  mountPath?: string;
}

/** Holds details on the destination of the mapped artifact */
export interface SinkOutputParent {
  /** A Store Reference for an artifact or sink. */
  storeReference: StoreReferenceOutput;
  storeKind: "Sink" | "AdlsGen2Account" | "BlobAccount";
}

/** An Adls Gen2 storage account artifact. */
export interface AdlsGen2ArtifactOutput extends ArtifactOutputParent {
  /** Properties for Adls Gen2 storage account. */
  properties: AdlsGen2ArtifactPropertiesOutput;
  storeKind: "AdlsGen2Account";
}

/** Properties for Adls Gen2 storage account. */
export interface AdlsGen2ArtifactPropertiesOutput {
  /** Location of the storage account. */
  readonly location?: string;
  /** A list of Adls Gen2 storage account paths. */
  paths: Array<StorageAccountPathOutput>;
}

/** Defines a single StorageAccountPath path */
export interface StorageAccountPathOutput {
  /** Gets or sets the container name */
  containerName: string;
  /** Gets or sets the path on the receiver side where the artifact is to be mapped */
  receiverPath?: string;
  /** Gets or sets the path to file/folder within the container to be shared */
  senderPath?: string;
}

/** A class for sent share artifact. */
export interface ArtifactOutputParent {
  /** A Store Reference for an artifact or sink. */
  storeReference: StoreReferenceOutput;
  storeKind: "Artifact" | "AdlsGen2Account" | "BlobAccount";
}

/** Blob Sink */
export interface BlobAccountSinkOutput extends SinkOutputParent {
  /** Properties for blob storage account */
  properties: BlobAccountSinkPropertiesOutput;
  storeKind: "BlobAccount";
}

/** Properties for blob storage account */
export interface BlobAccountSinkPropertiesOutput {
  /** Blob Container Name */
  containerName: string;
  /** Blob Folder */
  folder: string;
  /** Blob Location */
  readonly location?: string;
  /** Blob Mount Path */
  mountPath?: string;
}

/** Blob storage account artifact. */
export interface BlobStorageArtifactOutput extends ArtifactOutputParent {
  /** Properties for blob storage account. */
  properties: BlobStorageArtifactPropertiesOutput;
  storeKind: "BlobAccount";
}

/** Properties for blob storage account. */
export interface BlobStorageArtifactPropertiesOutput {
  /** Location of the storage account. */
  readonly location?: string;
  /** A list of blob storage account paths. */
  paths: Array<StorageAccountPathOutput>;
}

/** An InPlace received share kind. */
export interface InPlaceReceivedShareOutput extends ReceivedShareOutputParent {
  /** Properties of in place received share. */
  properties: InPlaceReceivedSharePropertiesOutput;
  shareKind: "InPlace";
}

/** Properties of in place received share. */
export interface InPlaceReceivedSharePropertiesOutput {
  /** Location of the shared Asset. */
  readonly assetLocation?: string;
  /** The types of asset. */
  assetStoreKind?: "AdlsGen2Account" | "BlobAccount";
  /** Time at which the received share was created. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly createdAt?: string;
  /** Received Share Name */
  displayName?: string;
  /** The expiration date of the received share. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly expirationDate?: string;
  /** Email of the user/receiver who received the sent share invitation */
  readonly receiverEmail?: string;
  /** Name of the user/receiver who received the sent share invitation */
  readonly receiverName?: string;
  /** Tenant name of the user/receiver who received the sent share invitation */
  readonly receiverTenantName?: string;
  /** Email of the sender who created the sent share invitation */
  readonly senderEmail?: string;
  /** Name of the sender who created the sent share invitation */
  readonly senderName?: string;
  /** Tenant name of the sender who created the sent share invitation */
  readonly senderTenantName?: string;
  /** Share description. */
  readonly sentShareDescription?: string;
  /** Time at which the sent share was shared. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly sharedAt?: string;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /** Holds details on the destination of the mapped artifact */
  sink?: SinkOutput;
  /** State of the resource */
  readonly state?: "Unknown" | "Succeeded" | "Creating" | "Deleting" | "Moving" | "Failed";
}

/** An InPlace share kind. */
export interface InPlaceSentShareOutput extends SentShareOutputParent {
  /** Properties for InPlace sent share. */
  properties: InPlaceSentSharePropertiesOutput;
  shareKind: "InPlace";
}

/** Properties for InPlace sent share. */
export interface InPlaceSentSharePropertiesOutput {
  /** A class for sent share artifact. */
  artifact: ArtifactOutput;
  /** Time at which the sent share was created. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly createdAt?: string;
  /** List of shares on which the sent share depends. */
  readonly dependsOn?: Array<string>;
  /** Sent share description. */
  description?: string;
  /** The name of the sent share */
  displayName: string;
  /** Email of the sender who created the sent share. */
  readonly senderEmail?: string;
  /** Name of the sender who created the sent share. */
  readonly senderName?: string;
  /** Tenant name of the sender who created the sent share. */
  readonly senderTenantName?: string;
  /** State of the resource */
  readonly state?: "Unknown" | "Succeeded" | "Creating" | "Deleting" | "Moving" | "Failed";
}

/** An service invitation kind. */
export interface ServiceInvitationOutput extends SentShareInvitationOutputParent {
  /** Properties of the service invitation type. */
  properties: ServiceInvitationPropertiesOutput;
  invitationKind: "Service";
}

/** Properties of the service invitation type. */
export interface ServiceInvitationPropertiesOutput {
  /** The time at which the invitation will expire. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  expirationDate?: string;
  /** Email address of the sender. */
  readonly senderEmail?: string;
  /** Name of the sender */
  readonly senderName?: string;
  /** Tenant name of the sender */
  readonly senderTenantName?: string;
  /** Gets the time at which the invitation was sent. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly sentAt?: string;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /** State of the resource */
  readonly state?: "Unknown" | "Succeeded" | "Creating" | "Deleting" | "Moving" | "Failed";
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
export interface UserInvitationOutput extends SentShareInvitationOutputParent {
  /** Properties of the user invitation type. */
  properties: UserInvitationPropertiesOutput;
  invitationKind: "User";
}

/** Properties of the user invitation type. */
export interface UserInvitationPropertiesOutput {
  /** The time at which the invitation will expire. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  expirationDate?: string;
  /** Whether or not the recipient was notified via email. */
  notify?: boolean;
  /** Email address of the sender. */
  readonly senderEmail?: string;
  /** Name of the sender */
  readonly senderName?: string;
  /** Tenant name of the sender */
  readonly senderTenantName?: string;
  /** Gets the time at which the invitation was sent. Represented in the standard date-time format as defined by [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) */
  readonly sentAt?: string;
  /** Share status. */
  shareStatus?: "Detached" | "Attached";
  /** State of the resource */
  readonly state?: "Unknown" | "Succeeded" | "Creating" | "Deleting" | "Moving" | "Failed";
  /** The receiver email for the invitation is being sent. */
  targetEmail: string;
}

/** A received share data transfer object. */
export type ReceivedShareOutput = InPlaceReceivedShareOutput;
/** A sent share data transfer object. */
export type SentShareOutput = InPlaceSentShareOutput;
/** A sent share invitation data transfer object. */
export type SentShareInvitationOutput = ServiceInvitationOutput | UserInvitationOutput;
/** Holds details on the destination of the mapped artifact */
export type SinkOutput = AdlsGen2AccountSinkOutput | BlobAccountSinkOutput;
/** A class for sent share artifact. */
export type ArtifactOutput = AdlsGen2ArtifactOutput | BlobStorageArtifactOutput;
