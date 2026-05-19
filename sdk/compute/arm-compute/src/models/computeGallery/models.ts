// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  OperatingSystemTypes,
  ResourceIdentityType,
  UserAssignedIdentitiesValue,
  OperatingSystemStateTypes,
  HyperVGeneration,
  Architecture,
} from "../common/models.js";
import {
  userAssignedIdentitiesValueRecordSerializer,
  userAssignedIdentitiesValueRecordDeserializer,
} from "../common/models.js";
import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Specifies information about the Shared Image Gallery that you want to create or update. */
export interface Gallery extends TrackedResource {
  /** The identity of the gallery, if configured. */
  identity?: GalleryIdentity;
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** Profile for gallery sharing to subscription or tenant */
  sharingProfile?: SharingProfile;
  /** Contains information about the soft deletion policy of the gallery. */
  softDeletePolicy?: SoftDeletePolicy;
  /** Sharing status of current gallery. */
  readonly sharingStatus?: SharingStatus;
}

export function gallerySerializer(item: Gallery): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "description",
      "identifier",
      "sharingProfile",
      "softDeletePolicy",
    ])
      ? undefined
      : _galleryPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : galleryIdentitySerializer(item["identity"]),
  };
}

export function galleryDeserializer(item: any): Gallery {
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
      : _galleryPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : galleryIdentityDeserializer(item["identity"]),
  };
}

/** Describes the properties of a Shared Image Gallery. */
export interface GalleryProperties {
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** Profile for gallery sharing to subscription or tenant */
  sharingProfile?: SharingProfile;
  /** Contains information about the soft deletion policy of the gallery. */
  softDeletePolicy?: SoftDeletePolicy;
  /** Sharing status of current gallery. */
  readonly sharingStatus?: SharingStatus;
}

export function galleryPropertiesSerializer(item: GalleryProperties): any {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierSerializer(item["identifier"]),
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileSerializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicySerializer(item["softDeletePolicy"]),
  };
}

export function galleryPropertiesDeserializer(item: any): GalleryProperties {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierDeserializer(item["identifier"]),
    provisioningState: item["provisioningState"],
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileDeserializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicyDeserializer(item["softDeletePolicy"]),
    sharingStatus: !item["sharingStatus"]
      ? item["sharingStatus"]
      : sharingStatusDeserializer(item["sharingStatus"]),
  };
}

/** Describes the gallery unique name. */
export interface GalleryIdentifier {
  /** The unique name of the Shared Image Gallery. This name is generated automatically by Azure. */
  readonly uniqueName?: string;
}

export function galleryIdentifierSerializer(_item: GalleryIdentifier): any {
  return {};
}

export function galleryIdentifierDeserializer(item: any): GalleryIdentifier {
  return {
    uniqueName: item["uniqueName"],
  };
}

/** The provisioning state, which only appears in the response. */
export enum KnownGalleryProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Migrating */
  Migrating = "Migrating",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownGalleryProvisioningState} can be used interchangeably with GalleryProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Failed** \
 * **Succeeded** \
 * **Deleting** \
 * **Migrating**
 */
export type GalleryProvisioningState = string;

/** Profile for gallery sharing to subscription or tenant */
export interface SharingProfile {
  /** This property allows you to specify the permission of sharing gallery. Possible values are: **Private,** **Groups,** **Community.** */
  permissions?: GallerySharingPermissionTypes;
  /** A list of sharing profile groups. */
  readonly groups?: SharingProfileGroup[];
  /** Information of community gallery if current gallery is shared to community. */
  communityGalleryInfo?: CommunityGalleryInfo;
}

export function sharingProfileSerializer(item: SharingProfile): any {
  return {
    permissions: item["permissions"],
    communityGalleryInfo: !item["communityGalleryInfo"]
      ? item["communityGalleryInfo"]
      : communityGalleryInfoSerializer(item["communityGalleryInfo"]),
  };
}

export function sharingProfileDeserializer(item: any): SharingProfile {
  return {
    permissions: item["permissions"],
    groups: !item["groups"] ? item["groups"] : sharingProfileGroupArrayDeserializer(item["groups"]),
    communityGalleryInfo: !item["communityGalleryInfo"]
      ? item["communityGalleryInfo"]
      : communityGalleryInfoDeserializer(item["communityGalleryInfo"]),
  };
}

/** This property allows you to specify the permission of sharing gallery. Possible values are: **Private,** **Groups,** **Community.** */
export enum KnownGallerySharingPermissionTypes {
  /** Private */
  Private = "Private",
  /** Groups */
  Groups = "Groups",
  /** Community */
  Community = "Community",
}

/**
 * This property allows you to specify the permission of sharing gallery. Possible values are: **Private,** **Groups,** **Community.** \
 * {@link KnownGallerySharingPermissionTypes} can be used interchangeably with GallerySharingPermissionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Private** \
 * **Groups** \
 * **Community**
 */
export type GallerySharingPermissionTypes = string;

export function sharingProfileGroupArraySerializer(result: Array<SharingProfileGroup>): any[] {
  return result.map((item) => {
    return sharingProfileGroupSerializer(item);
  });
}

export function sharingProfileGroupArrayDeserializer(result: Array<SharingProfileGroup>): any[] {
  return result.map((item) => {
    return sharingProfileGroupDeserializer(item);
  });
}

/** Group of the gallery sharing profile */
export interface SharingProfileGroup {
  /** This property allows you to specify the type of sharing group. Possible values are: **Subscriptions,** **AADTenants.** */
  type?: SharingProfileGroupTypes;
  /** A list of subscription/tenant ids the gallery is aimed to be shared to. */
  ids?: string[];
}

export function sharingProfileGroupSerializer(item: SharingProfileGroup): any {
  return {
    type: item["type"],
    ids: !item["ids"]
      ? item["ids"]
      : item["ids"].map((p: any) => {
          return p;
        }),
  };
}

export function sharingProfileGroupDeserializer(item: any): SharingProfileGroup {
  return {
    type: item["type"],
    ids: !item["ids"]
      ? item["ids"]
      : item["ids"].map((p: any) => {
          return p;
        }),
  };
}

/** This property allows you to specify the type of sharing group. Possible values are: **Subscriptions,** **AADTenants.** */
export enum KnownSharingProfileGroupTypes {
  /** Subscriptions */
  Subscriptions = "Subscriptions",
  /** AADTenants */
  AADTenants = "AADTenants",
}

/**
 * This property allows you to specify the type of sharing group. Possible values are: **Subscriptions,** **AADTenants.** \
 * {@link KnownSharingProfileGroupTypes} can be used interchangeably with SharingProfileGroupTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Subscriptions** \
 * **AADTenants**
 */
export type SharingProfileGroupTypes = string;

/** Information of community gallery if current gallery is shared to community */
export interface CommunityGalleryInfo {
  /** The link to the publisher website. Visible to all users. */
  publisherUri?: string;
  /** Community gallery publisher support email. The email address of the publisher. Visible to all users. */
  publisherContact?: string;
  /** End-user license agreement for community gallery image. */
  eula?: string;
  /** The prefix of the gallery name that will be displayed publicly. Visible to all users. */
  publicNamePrefix?: string;
  /** Contains info about whether community gallery sharing is enabled. */
  readonly communityGalleryEnabled?: boolean;
  /** Community gallery public name list. */
  readonly publicNames?: string[];
}

export function communityGalleryInfoSerializer(item: CommunityGalleryInfo): any {
  return {
    publisherUri: item["publisherUri"],
    publisherContact: item["publisherContact"],
    eula: item["eula"],
    publicNamePrefix: item["publicNamePrefix"],
  };
}

export function communityGalleryInfoDeserializer(item: any): CommunityGalleryInfo {
  return {
    publisherUri: item["publisherUri"],
    publisherContact: item["publisherContact"],
    eula: item["eula"],
    publicNamePrefix: item["publicNamePrefix"],
    communityGalleryEnabled: item["communityGalleryEnabled"],
    publicNames: !item["publicNames"]
      ? item["publicNames"]
      : item["publicNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Contains information about the soft deletion policy of the gallery. */
export interface SoftDeletePolicy {
  /** Enables soft-deletion for resources in this gallery, allowing them to be recovered within retention time. */
  isSoftDeleteEnabled?: boolean;
}

export function softDeletePolicySerializer(item: SoftDeletePolicy): any {
  return { isSoftDeleteEnabled: item["isSoftDeleteEnabled"] };
}

export function softDeletePolicyDeserializer(item: any): SoftDeletePolicy {
  return {
    isSoftDeleteEnabled: item["isSoftDeleteEnabled"],
  };
}

/** Sharing status of current gallery. */
export interface SharingStatus {
  /** Aggregated sharing state of current gallery. */
  readonly aggregatedState?: SharingState;
  /** Summary of all regional sharing status. */
  summary?: RegionalSharingStatus[];
}

export function sharingStatusDeserializer(item: any): SharingStatus {
  return {
    aggregatedState: item["aggregatedState"],
    summary: !item["summary"]
      ? item["summary"]
      : regionalSharingStatusArrayDeserializer(item["summary"]),
  };
}

/** The sharing state of the gallery, which only appears in the response. */
export enum KnownSharingState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The sharing state of the gallery, which only appears in the response. \
 * {@link KnownSharingState} can be used interchangeably with SharingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **InProgress** \
 * **Failed** \
 * **Unknown**
 */
export type SharingState = string;

export function regionalSharingStatusArrayDeserializer(
  result: Array<RegionalSharingStatus>,
): any[] {
  return result.map((item) => {
    return regionalSharingStatusDeserializer(item);
  });
}

/** Gallery regional sharing status */
export interface RegionalSharingStatus {
  /** Region name */
  region?: string;
  /** Gallery sharing state in current region */
  readonly state?: SharingState;
  /** Details of gallery regional sharing failure. */
  details?: string;
}

export function regionalSharingStatusDeserializer(item: any): RegionalSharingStatus {
  return {
    region: item["region"],
    state: item["state"],
    details: item["details"],
  };
}

/** Identity for the virtual machine. */
export interface GalleryIdentity {
  /** The principal id of the gallery identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The AAD tenant id of the gallery identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the gallery. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove all identities from the gallery. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the gallery. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function galleryIdentitySerializer(item: GalleryIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function galleryIdentityDeserializer(item: any): GalleryIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Specifies information about the Shared Image Gallery that you want to update. */
export interface GalleryUpdate extends UpdateResourceDefinition {
  /** The identity of the gallery, if configured. */
  identity?: GalleryIdentity;
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** Profile for gallery sharing to subscription or tenant */
  sharingProfile?: SharingProfile;
  /** Contains information about the soft deletion policy of the gallery. */
  softDeletePolicy?: SoftDeletePolicy;
  /** Sharing status of current gallery. */
  readonly sharingStatus?: SharingStatus;
}

export function galleryUpdateSerializer(item: GalleryUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "identifier",
      "sharingProfile",
      "softDeletePolicy",
    ])
      ? undefined
      : _galleryUpdatePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : galleryIdentitySerializer(item["identity"]),
  };
}

/** The Update Resource model definition. */
export interface UpdateResourceDefinition {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function updateResourceDefinitionSerializer(item: UpdateResourceDefinition): any {
  return { tags: item["tags"] };
}

/** The List Galleries operation response. */
export interface _GalleryList {
  /** A list of galleries. */
  value: Gallery[];
  /** The uri to fetch the next page of galleries. Call ListNext() with this to fetch the next page of galleries. */
  nextLink?: string;
  /** The security profile of a gallery image version */
  securityProfile?: ImageVersionSecurityProfile;
}

export function _galleryListDeserializer(item: any): _GalleryList {
  return {
    value: galleryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileDeserializer(item["securityProfile"]),
  };
}

export function galleryArraySerializer(result: Array<Gallery>): any[] {
  return result.map((item) => {
    return gallerySerializer(item);
  });
}

export function galleryArrayDeserializer(result: Array<Gallery>): any[] {
  return result.map((item) => {
    return galleryDeserializer(item);
  });
}

/** The security profile of a gallery image version */
export interface ImageVersionSecurityProfile {
  /** Contains UEFI settings for the image version. */
  uefiSettings?: GalleryImageVersionUefiSettings;
}

export function imageVersionSecurityProfileSerializer(item: ImageVersionSecurityProfile): any {
  return {
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : galleryImageVersionUefiSettingsSerializer(item["uefiSettings"]),
  };
}

export function imageVersionSecurityProfileDeserializer(item: any): ImageVersionSecurityProfile {
  return {
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : galleryImageVersionUefiSettingsDeserializer(item["uefiSettings"]),
  };
}

/** Contains UEFI settings for the image version. */
export interface GalleryImageVersionUefiSettings {
  /** The name of the template(s) that contains default UEFI key signatures that will be added to the image. */
  signatureTemplateNames?: UefiSignatureTemplateName[];
  /** Additional UEFI key signatures that will be added to the image in addition to the signature templates */
  additionalSignatures?: UefiKeySignatures;
}

export function galleryImageVersionUefiSettingsSerializer(
  item: GalleryImageVersionUefiSettings,
): any {
  return {
    signatureTemplateNames: !item["signatureTemplateNames"]
      ? item["signatureTemplateNames"]
      : item["signatureTemplateNames"].map((p: any) => {
          return p;
        }),
    additionalSignatures: !item["additionalSignatures"]
      ? item["additionalSignatures"]
      : uefiKeySignaturesSerializer(item["additionalSignatures"]),
  };
}

export function galleryImageVersionUefiSettingsDeserializer(
  item: any,
): GalleryImageVersionUefiSettings {
  return {
    signatureTemplateNames: !item["signatureTemplateNames"]
      ? item["signatureTemplateNames"]
      : item["signatureTemplateNames"].map((p: any) => {
          return p;
        }),
    additionalSignatures: !item["additionalSignatures"]
      ? item["additionalSignatures"]
      : uefiKeySignaturesDeserializer(item["additionalSignatures"]),
  };
}

/** The name of the signature template that contains default UEFI keys. */
export enum KnownUefiSignatureTemplateName {
  /** NoSignatureTemplate */
  NoSignatureTemplate = "NoSignatureTemplate",
  /** MicrosoftUefiCertificateAuthorityTemplate */
  MicrosoftUefiCertificateAuthorityTemplate = "MicrosoftUefiCertificateAuthorityTemplate",
  /** MicrosoftWindowsTemplate */
  MicrosoftWindowsTemplate = "MicrosoftWindowsTemplate",
}

/**
 * The name of the signature template that contains default UEFI keys. \
 * {@link KnownUefiSignatureTemplateName} can be used interchangeably with UefiSignatureTemplateName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoSignatureTemplate** \
 * **MicrosoftUefiCertificateAuthorityTemplate** \
 * **MicrosoftWindowsTemplate**
 */
export type UefiSignatureTemplateName = string;

/** Additional UEFI key signatures that will be added to the image in addition to the signature templates */
export interface UefiKeySignatures {
  /** The Platform Key of this image version. */
  pk?: UefiKey;
  /** The Key Encryption Keys of this image version. */
  kek?: UefiKey[];
  /** The database of UEFI keys for this image version. */
  db?: UefiKey[];
  /** The database of revoked UEFI keys for this image version. */
  dbx?: UefiKey[];
}

export function uefiKeySignaturesSerializer(item: UefiKeySignatures): any {
  return {
    pk: !item["pk"] ? item["pk"] : uefiKeySerializer(item["pk"]),
    kek: !item["kek"] ? item["kek"] : uefiKeyArraySerializer(item["kek"]),
    db: !item["db"] ? item["db"] : uefiKeyArraySerializer(item["db"]),
    dbx: !item["dbx"] ? item["dbx"] : uefiKeyArraySerializer(item["dbx"]),
  };
}

export function uefiKeySignaturesDeserializer(item: any): UefiKeySignatures {
  return {
    pk: !item["pk"] ? item["pk"] : uefiKeyDeserializer(item["pk"]),
    kek: !item["kek"] ? item["kek"] : uefiKeyArrayDeserializer(item["kek"]),
    db: !item["db"] ? item["db"] : uefiKeyArrayDeserializer(item["db"]),
    dbx: !item["dbx"] ? item["dbx"] : uefiKeyArrayDeserializer(item["dbx"]),
  };
}

/** A UEFI key signature. */
export interface UefiKey {
  /** The type of key signature. */
  type?: UefiKeyType;
  /** The value of the key signature. */
  value?: string[];
}

export function uefiKeySerializer(item: UefiKey): any {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function uefiKeyDeserializer(item: any): UefiKey {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of key signature. */
export enum KnownUefiKeyType {
  /** sha256 */
  Sha256 = "sha256",
  /** x509 */
  X509 = "x509",
}

/**
 * The type of key signature. \
 * {@link KnownUefiKeyType} can be used interchangeably with UefiKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **sha256** \
 * **x509**
 */
export type UefiKeyType = string;

export function uefiKeyArraySerializer(result: Array<UefiKey>): any[] {
  return result.map((item) => {
    return uefiKeySerializer(item);
  });
}

export function uefiKeyArrayDeserializer(result: Array<UefiKey>): any[] {
  return result.map((item) => {
    return uefiKeyDeserializer(item);
  });
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface GalleryImage extends TrackedResource {
  /** The description of this gallery image definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery image definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery image definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Optional. Must be set to true if the gallery image features are being updated. */
  allowUpdateImage?: boolean;
}

export function galleryImageSerializer(item: GalleryImage): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "description",
      "eula",
      "privacyStatementUri",
      "releaseNoteUri",
      "osType",
      "osState",
      "hyperVGeneration",
      "endOfLifeDate",
      "identifier",
      "recommended",
      "disallowed",
      "purchasePlan",
      "features",
      "architecture",
      "allowUpdateImage",
    ])
      ? undefined
      : _galleryImagePropertiesSerializer(item),
  };
}

export function galleryImageDeserializer(item: any): GalleryImage {
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
      : _galleryImagePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image definition. */
export interface GalleryImageProperties {
  /** The description of this gallery image definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery image definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: OperatingSystemStateTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Optional. Must be set to true if the gallery image features are being updated. */
  allowUpdateImage?: boolean;
}

export function galleryImagePropertiesSerializer(item: GalleryImageProperties): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    identifier: galleryImageIdentifierSerializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationSerializer(item["recommended"]),
    disallowed: !item["disallowed"] ? item["disallowed"] : disallowedSerializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanSerializer(item["purchasePlan"]),
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArraySerializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

export function galleryImagePropertiesDeserializer(item: any): GalleryImageProperties {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: galleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    provisioningState: item["provisioningState"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

/** This is the gallery image definition identifier. */
export interface GalleryImageIdentifier {
  /** The name of the gallery image definition publisher. */
  publisher: string;
  /** The name of the gallery image definition offer. */
  offer: string;
  /** The name of the gallery image definition SKU. */
  sku: string;
}

export function galleryImageIdentifierSerializer(item: GalleryImageIdentifier): any {
  return { publisher: item["publisher"], offer: item["offer"], sku: item["sku"] };
}

export function galleryImageIdentifierDeserializer(item: any): GalleryImageIdentifier {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
  };
}

/** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
export interface RecommendedMachineConfiguration {
  /** Describes the resource range. */
  vCPUs?: ResourceRange;
  /** Describes the resource range. */
  memory?: ResourceRange;
}

export function recommendedMachineConfigurationSerializer(
  item: RecommendedMachineConfiguration,
): any {
  return {
    vCPUs: !item["vCPUs"] ? item["vCPUs"] : resourceRangeSerializer(item["vCPUs"]),
    memory: !item["memory"] ? item["memory"] : resourceRangeSerializer(item["memory"]),
  };
}

export function recommendedMachineConfigurationDeserializer(
  item: any,
): RecommendedMachineConfiguration {
  return {
    vCPUs: !item["vCPUs"] ? item["vCPUs"] : resourceRangeDeserializer(item["vCPUs"]),
    memory: !item["memory"] ? item["memory"] : resourceRangeDeserializer(item["memory"]),
  };
}

/** Describes the resource range. */
export interface ResourceRange {
  /** The minimum number of the resource. */
  min?: number;
  /** The maximum number of the resource. */
  max?: number;
}

export function resourceRangeSerializer(item: ResourceRange): any {
  return { min: item["min"], max: item["max"] };
}

export function resourceRangeDeserializer(item: any): ResourceRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** Describes the disallowed disk types. */
export interface Disallowed {
  /** A list of disk types. */
  diskTypes?: string[];
}

export function disallowedSerializer(item: Disallowed): any {
  return {
    diskTypes: !item["diskTypes"]
      ? item["diskTypes"]
      : item["diskTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function disallowedDeserializer(item: any): Disallowed {
  return {
    diskTypes: !item["diskTypes"]
      ? item["diskTypes"]
      : item["diskTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Describes the gallery image definition purchase plan. This is used by marketplace images. */
export interface ImagePurchasePlan {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** The product ID. */
  product?: string;
}

export function imagePurchasePlanSerializer(item: ImagePurchasePlan): any {
  return { name: item["name"], publisher: item["publisher"], product: item["product"] };
}

export function imagePurchasePlanDeserializer(item: any): ImagePurchasePlan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
  };
}

export function galleryImageFeatureArraySerializer(result: Array<GalleryImageFeature>): any[] {
  return result.map((item) => {
    return galleryImageFeatureSerializer(item);
  });
}

export function galleryImageFeatureArrayDeserializer(result: Array<GalleryImageFeature>): any[] {
  return result.map((item) => {
    return galleryImageFeatureDeserializer(item);
  });
}

/** A feature for gallery image. */
export interface GalleryImageFeature {
  /** The name of the gallery image feature. */
  name?: string;
  /** The value of the gallery image feature. */
  value?: string;
  /** The minimum gallery image version which supports this feature. */
  startsAtVersion?: string;
}

export function galleryImageFeatureSerializer(item: GalleryImageFeature): any {
  return { name: item["name"], value: item["value"], startsAtVersion: item["startsAtVersion"] };
}

export function galleryImageFeatureDeserializer(item: any): GalleryImageFeature {
  return {
    name: item["name"],
    value: item["value"],
    startsAtVersion: item["startsAtVersion"],
  };
}

/** Specifies information about the gallery image definition that you want to update. */
export interface GalleryImageUpdate extends UpdateResourceDefinition {
  /** The description of this gallery image definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery image definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery image definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Optional. Must be set to true if the gallery image features are being updated. */
  allowUpdateImage?: boolean;
}

export function galleryImageUpdateSerializer(item: GalleryImageUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "eula",
      "privacyStatementUri",
      "releaseNoteUri",
      "osType",
      "osState",
      "hyperVGeneration",
      "endOfLifeDate",
      "identifier",
      "recommended",
      "disallowed",
      "purchasePlan",
      "features",
      "architecture",
      "allowUpdateImage",
    ])
      ? undefined
      : _galleryImageUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery Images operation response. */
export interface _GalleryImageList {
  /** A list of Shared Image Gallery images. */
  value: GalleryImage[];
  /** The uri to fetch the next page of Image Definitions in the Shared Image Gallery. Call ListNext() with this to fetch the next page of gallery image definitions. */
  nextLink?: string;
}

export function _galleryImageListDeserializer(item: any): _GalleryImageList {
  return {
    value: galleryImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryImageArraySerializer(result: Array<GalleryImage>): any[] {
  return result.map((item) => {
    return galleryImageSerializer(item);
  });
}

export function galleryImageArrayDeserializer(result: Array<GalleryImage>): any[] {
  return result.map((item) => {
    return galleryImageDeserializer(item);
  });
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface GalleryImageVersion extends TrackedResource {
  /** The publishing profile of a gallery image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile?: GalleryImageVersionStorageProfile;
  /** This is the safety profile of the Gallery Image Version. */
  safetyProfile?: GalleryImageVersionSafetyProfile;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
  /** The security profile of a gallery image version */
  securityProfile?: ImageVersionSecurityProfile;
  /** Indicates if this is a soft-delete resource restoration request. */
  restore?: boolean;
  /** This is the validations profile of a Gallery Image Version. */
  readonly validationsProfile?: ValidationsProfile;
}

export function galleryImageVersionSerializer(item: GalleryImageVersion): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "publishingProfile",
      "storageProfile",
      "safetyProfile",
      "securityProfile",
      "restore",
    ])
      ? undefined
      : _galleryImageVersionPropertiesSerializer(item),
  };
}

export function galleryImageVersionDeserializer(item: any): GalleryImageVersion {
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
      : _galleryImageVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image version. */
export interface GalleryImageVersionProperties {
  /** The publishing profile of a gallery image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile: GalleryImageVersionStorageProfile;
  /** This is the safety profile of the Gallery Image Version. */
  safetyProfile?: GalleryImageVersionSafetyProfile;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
  /** The security profile of a gallery image version */
  securityProfile?: ImageVersionSecurityProfile;
  /** Indicates if this is a soft-delete resource restoration request. */
  restore?: boolean;
  /** This is the validations profile of a Gallery Image Version. */
  readonly validationsProfile?: ValidationsProfile;
}

export function galleryImageVersionPropertiesSerializer(item: GalleryImageVersionProperties): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileSerializer(item["publishingProfile"]),
    storageProfile: galleryImageVersionStorageProfileSerializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileSerializer(item["safetyProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileSerializer(item["securityProfile"]),
    restore: item["restore"],
  };
}

export function galleryImageVersionPropertiesDeserializer(
  item: any,
): GalleryImageVersionProperties {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileDeserializer(item["publishingProfile"]),
    provisioningState: item["provisioningState"],
    storageProfile: galleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileDeserializer(item["safetyProfile"]),
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileDeserializer(item["securityProfile"]),
    restore: item["restore"],
    validationsProfile: !item["validationsProfile"]
      ? item["validationsProfile"]
      : validationsProfileDeserializer(item["validationsProfile"]),
  };
}

/** The publishing profile of a gallery image Version. */
export interface GalleryImageVersionPublishingProfile extends GalleryArtifactPublishingProfileBase {}

export function galleryImageVersionPublishingProfileSerializer(
  item: GalleryImageVersionPublishingProfile,
): any {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArraySerializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArraySerializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
  };
}

export function galleryImageVersionPublishingProfileDeserializer(
  item: any,
): GalleryImageVersionPublishingProfile {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArrayDeserializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArrayDeserializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
  };
}

/** This is the storage profile of a Gallery Image Version. */
export interface GalleryImageVersionStorageProfile {
  /** The source of the gallery artifact version. */
  source?: GalleryArtifactVersionFullSource;
  /** This is the OS disk image. */
  osDiskImage?: GalleryOSDiskImage;
  /** A list of data disk images. */
  dataDiskImages?: GalleryDataDiskImage[];
}

export function galleryImageVersionStorageProfileSerializer(
  item: GalleryImageVersionStorageProfile,
): any {
  return {
    source: !item["source"]
      ? item["source"]
      : galleryArtifactVersionFullSourceSerializer(item["source"]),
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : galleryOSDiskImageSerializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : galleryDataDiskImageArraySerializer(item["dataDiskImages"]),
  };
}

export function galleryImageVersionStorageProfileDeserializer(
  item: any,
): GalleryImageVersionStorageProfile {
  return {
    source: !item["source"]
      ? item["source"]
      : galleryArtifactVersionFullSourceDeserializer(item["source"]),
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : galleryOSDiskImageDeserializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : galleryDataDiskImageArrayDeserializer(item["dataDiskImages"]),
  };
}

/** The source of the gallery artifact version. */
export interface GalleryArtifactVersionFullSource extends GalleryArtifactVersionSource {
  /** The resource Id of the source Community Gallery Image.  Only required when using Community Gallery Image as a source. */
  communityGalleryImageId?: string;
  /** The resource Id of the source virtual machine.  Only required when capturing a virtual machine to source this Gallery Image Version. */
  virtualMachineId?: string;
}

export function galleryArtifactVersionFullSourceSerializer(
  item: GalleryArtifactVersionFullSource,
): any {
  return {
    id: item["id"],
    communityGalleryImageId: item["communityGalleryImageId"],
    virtualMachineId: item["virtualMachineId"],
  };
}

export function galleryArtifactVersionFullSourceDeserializer(
  item: any,
): GalleryArtifactVersionFullSource {
  return {
    id: item["id"],
    communityGalleryImageId: item["communityGalleryImageId"],
    virtualMachineId: item["virtualMachineId"],
  };
}

/** This is the OS disk image. */
export interface GalleryOSDiskImage extends GalleryDiskImage {}

export function galleryOSDiskImageSerializer(item: GalleryOSDiskImage): any {
  return {
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceSerializer(item["source"]),
  };
}

export function galleryOSDiskImageDeserializer(item: any): GalleryOSDiskImage {
  return {
    sizeInGB: item["sizeInGB"],
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceDeserializer(item["source"]),
  };
}

export function galleryDataDiskImageArraySerializer(result: Array<GalleryDataDiskImage>): any[] {
  return result.map((item) => {
    return galleryDataDiskImageSerializer(item);
  });
}

export function galleryDataDiskImageArrayDeserializer(result: Array<GalleryDataDiskImage>): any[] {
  return result.map((item) => {
    return galleryDataDiskImageDeserializer(item);
  });
}

/** This is the data disk image. */
export interface GalleryDataDiskImage extends GalleryDiskImage {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

export function galleryDataDiskImageSerializer(item: GalleryDataDiskImage): any {
  return {
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceSerializer(item["source"]),
    lun: item["lun"],
  };
}

export function galleryDataDiskImageDeserializer(item: any): GalleryDataDiskImage {
  return {
    sizeInGB: item["sizeInGB"],
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceDeserializer(item["source"]),
    lun: item["lun"],
  };
}

/** This is the safety profile of the Gallery Image Version. */
export interface GalleryImageVersionSafetyProfile extends GalleryArtifactSafetyProfileBase {
  /** Indicates whether this image has been reported as violating Microsoft's policies. */
  readonly reportedForPolicyViolation?: boolean;
  /** A list of Policy Violations that have been reported for this Gallery Image Version. */
  readonly policyViolations?: PolicyViolation[];
  /** Indicates whether or not the deletion is blocked for this Gallery Image Version if its End Of Life has not expired. */
  blockDeletionBeforeEndOfLife?: boolean;
}

export function galleryImageVersionSafetyProfileSerializer(
  item: GalleryImageVersionSafetyProfile,
): any {
  return {
    allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"],
    blockDeletionBeforeEndOfLife: item["blockDeletionBeforeEndOfLife"],
  };
}

export function galleryImageVersionSafetyProfileDeserializer(
  item: any,
): GalleryImageVersionSafetyProfile {
  return {
    allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"],
    reportedForPolicyViolation: item["reportedForPolicyViolation"],
    policyViolations: !item["policyViolations"]
      ? item["policyViolations"]
      : policyViolationArrayDeserializer(item["policyViolations"]),
    blockDeletionBeforeEndOfLife: item["blockDeletionBeforeEndOfLife"],
  };
}

export function policyViolationArrayDeserializer(result: Array<PolicyViolation>): any[] {
  return result.map((item) => {
    return policyViolationDeserializer(item);
  });
}

/** A policy violation reported against a gallery artifact. */
export interface PolicyViolation {
  /** Describes the nature of the policy violation. */
  category?: PolicyViolationCategory;
  /** Describes specific details about why this policy violation was reported. */
  details?: string;
}

export function policyViolationDeserializer(item: any): PolicyViolation {
  return {
    category: item["category"],
    details: item["details"],
  };
}

/** Describes the nature of the policy violation. */
export enum KnownPolicyViolationCategory {
  /** Other */
  Other = "Other",
  /** ImageFlaggedUnsafe */
  ImageFlaggedUnsafe = "ImageFlaggedUnsafe",
  /** CopyrightValidation */
  CopyrightValidation = "CopyrightValidation",
  /** IpTheft */
  IpTheft = "IpTheft",
}

/**
 * Describes the nature of the policy violation. \
 * {@link KnownPolicyViolationCategory} can be used interchangeably with PolicyViolationCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other** \
 * **ImageFlaggedUnsafe** \
 * **CopyrightValidation** \
 * **IpTheft**
 */
export type PolicyViolationCategory = string;

/** This is the replication status of the gallery image version. */
export interface ReplicationStatus {
  /** This is the aggregated replication status based on all the regional replication status flags. */
  readonly aggregatedState?: AggregatedReplicationState;
  /** This is a summary of replication status for each region. */
  readonly summary?: RegionalReplicationStatus[];
}

export function replicationStatusDeserializer(item: any): ReplicationStatus {
  return {
    aggregatedState: item["aggregatedState"],
    summary: !item["summary"]
      ? item["summary"]
      : regionalReplicationStatusArrayDeserializer(item["summary"]),
  };
}

/** This is the aggregated replication status based on all the regional replication status flags. */
export enum KnownAggregatedReplicationState {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * This is the aggregated replication status based on all the regional replication status flags. \
 * {@link KnownAggregatedReplicationState} can be used interchangeably with AggregatedReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Completed** \
 * **Failed**
 */
export type AggregatedReplicationState = string;

export function regionalReplicationStatusArrayDeserializer(
  result: Array<RegionalReplicationStatus>,
): any[] {
  return result.map((item) => {
    return regionalReplicationStatusDeserializer(item);
  });
}

/** This is the regional replication status. */
export interface RegionalReplicationStatus {
  /** The region to which the gallery image version is being replicated to. */
  readonly region?: string;
  /** This is the regional replication state. */
  readonly state?: ReplicationState;
  /** The details of the replication status. */
  readonly details?: string;
  /** It indicates progress of the replication job. */
  readonly progress?: number;
}

export function regionalReplicationStatusDeserializer(item: any): RegionalReplicationStatus {
  return {
    region: item["region"],
    state: item["state"],
    details: item["details"],
    progress: item["progress"],
  };
}

/** This is the regional replication state. */
export enum KnownReplicationState {
  /** Unknown */
  Unknown = "Unknown",
  /** Replicating */
  Replicating = "Replicating",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * This is the regional replication state. \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Replicating** \
 * **Completed** \
 * **Failed**
 */
export type ReplicationState = string;

/** This is the validations profile of a Gallery Image Version. */
export interface ValidationsProfile {
  /** The published time of the image version */
  validationEtag?: string;
  executedValidations?: ExecutedValidation[];
  /** This specifies the pub, offer, sku and version of the image version metadata */
  platformAttributes?: PlatformAttribute[];
}

export function validationsProfileDeserializer(item: any): ValidationsProfile {
  return {
    validationEtag: item["validationEtag"],
    executedValidations: !item["executedValidations"]
      ? item["executedValidations"]
      : executedValidationArrayDeserializer(item["executedValidations"]),
    platformAttributes: !item["platformAttributes"]
      ? item["platformAttributes"]
      : platformAttributeArrayDeserializer(item["platformAttributes"]),
  };
}

export function executedValidationArrayDeserializer(result: Array<ExecutedValidation>): any[] {
  return result.map((item) => {
    return executedValidationDeserializer(item);
  });
}

/** This is the executed Validation. */
export interface ExecutedValidation {
  /** This property specifies the type of image version validation. */
  type?: string;
  /** This property specifies the status of the validationProfile of the image version. */
  status?: ValidationStatus;
  /** This property specifies the valid version of the validation. */
  version?: string;
  /** This property specifies the starting timestamp. */
  executionTime?: Date;
}

export function executedValidationDeserializer(item: any): ExecutedValidation {
  return {
    type: item["type"],
    status: item["status"],
    version: item["version"],
    executionTime: !item["executionTime"] ? item["executionTime"] : new Date(item["executionTime"]),
  };
}

/** This property specifies the status of the validationProfile of the image version. */
export enum KnownValidationStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * This property specifies the status of the validationProfile of the image version. \
 * {@link KnownValidationStatus} can be used interchangeably with ValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Failed** \
 * **Succeeded**
 */
export type ValidationStatus = string;

export function platformAttributeArrayDeserializer(result: Array<PlatformAttribute>): any[] {
  return result.map((item) => {
    return platformAttributeDeserializer(item);
  });
}

/** This is the platform attribute of the image version. */
export interface PlatformAttribute {
  /** This property specifies the name of the platformAttribute. It is read-only. */
  readonly name?: string;
  /** This property specifies the value of the corresponding name property. It is read-only. */
  readonly value?: string;
}

export function platformAttributeDeserializer(item: any): PlatformAttribute {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Describes the basic gallery artifact publishing profile. */
export interface GalleryArtifactPublishingProfileBase {
  /** The target regions where the Image Version is going to be replicated to. This property is updatable. */
  targetRegions?: TargetRegion[];
  /** The number of replicas of the Image Version to be created per region. This property would take effect for a region when regionalReplicaCount is not specified. This property is updatable. */
  replicaCount?: number;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** The timestamp for when the gallery image version is published. */
  readonly publishedDate?: Date;
  /** The end of life date of the gallery image version. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** Specifies the storage account type to be used to store the image. Cannot be specified along with storageAccountStrategy. This property is not updatable. */
  storageAccountType?: StorageAccountType;
  /** Optional parameter which specifies the mode to be used for replication. This property is not updatable. */
  replicationMode?: ReplicationMode;
  /** The target extended locations where the Image Version is going to be replicated to. This property is updatable. */
  targetExtendedLocations?: GalleryTargetExtendedLocation[];
  /** Specifies the strategy to be used when selecting the storage account type. Cannot be specified along with storageAccountType, but can be overridden per region by specifying targetRegions[].storageAccountType. This property is not updatable. */
  storageAccountStrategy?: StorageAccountStrategy;
}

export function galleryArtifactPublishingProfileBaseSerializer(
  item: GalleryArtifactPublishingProfileBase,
): any {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArraySerializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArraySerializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
  };
}

export function galleryArtifactPublishingProfileBaseDeserializer(
  item: any,
): GalleryArtifactPublishingProfileBase {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArrayDeserializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArrayDeserializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
  };
}

export function targetRegionArraySerializer(result: Array<TargetRegion>): any[] {
  return result.map((item) => {
    return targetRegionSerializer(item);
  });
}

export function targetRegionArrayDeserializer(result: Array<TargetRegion>): any[] {
  return result.map((item) => {
    return targetRegionDeserializer(item);
  });
}

/** Describes the target region information. */
export interface TargetRegion {
  /** The name of the region. */
  name: string;
  /** The number of replicas of the Image Version to be created per region. This property is updatable. */
  regionalReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: StorageAccountType;
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImages;
  /** Contains the flag setting to hide an image when users specify version='latest' */
  excludeFromLatest?: boolean;
  /** List of storage sku with replica count to create direct drive replicas. */
  additionalReplicaSets?: AdditionalReplicaSet[];
}

export function targetRegionSerializer(item: TargetRegion): any {
  return {
    name: item["name"],
    regionalReplicaCount: item["regionalReplicaCount"],
    storageAccountType: item["storageAccountType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionImagesSerializer(item["encryption"]),
    excludeFromLatest: item["excludeFromLatest"],
    additionalReplicaSets: !item["additionalReplicaSets"]
      ? item["additionalReplicaSets"]
      : additionalReplicaSetArraySerializer(item["additionalReplicaSets"]),
  };
}

export function targetRegionDeserializer(item: any): TargetRegion {
  return {
    name: item["name"],
    regionalReplicaCount: item["regionalReplicaCount"],
    storageAccountType: item["storageAccountType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionImagesDeserializer(item["encryption"]),
    excludeFromLatest: item["excludeFromLatest"],
    additionalReplicaSets: !item["additionalReplicaSets"]
      ? item["additionalReplicaSets"]
      : additionalReplicaSetArrayDeserializer(item["additionalReplicaSets"]),
  };
}

/** Specifies the storage account type to be used to store the image. This property is not updatable. */
export enum KnownStorageAccountType {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Standard_ZRS */
  StandardZRS = "Standard_ZRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Specifies the storage account type to be used to store the image. This property is not updatable. \
 * {@link KnownStorageAccountType} can be used interchangeably with StorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Standard_ZRS** \
 * **Premium_LRS** \
 * **PremiumV2_LRS**
 */
export type StorageAccountType = string;

/** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
export interface EncryptionImages {
  /** Contains encryption settings for an OS disk image. */
  osDiskImage?: OSDiskImageEncryption;
  /** A list of encryption specifications for data disk images. */
  dataDiskImages?: DataDiskImageEncryption[];
}

export function encryptionImagesSerializer(item: EncryptionImages): any {
  return {
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : osDiskImageEncryptionSerializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : dataDiskImageEncryptionArraySerializer(item["dataDiskImages"]),
  };
}

export function encryptionImagesDeserializer(item: any): EncryptionImages {
  return {
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : osDiskImageEncryptionDeserializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : dataDiskImageEncryptionArrayDeserializer(item["dataDiskImages"]),
  };
}

/** Contains encryption settings for an OS disk image. */
export interface OSDiskImageEncryption extends DiskImageEncryption {
  /** This property specifies the security profile of an OS disk image. */
  securityProfile?: OSDiskImageSecurityProfile;
}

export function osDiskImageEncryptionSerializer(item: OSDiskImageEncryption): any {
  return {
    diskEncryptionSetId: item["diskEncryptionSetId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : osDiskImageSecurityProfileSerializer(item["securityProfile"]),
  };
}

export function osDiskImageEncryptionDeserializer(item: any): OSDiskImageEncryption {
  return {
    diskEncryptionSetId: item["diskEncryptionSetId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : osDiskImageSecurityProfileDeserializer(item["securityProfile"]),
  };
}

/** Contains security profile for an OS disk image. */
export interface OSDiskImageSecurityProfile {
  /** confidential VM encryption types */
  confidentialVMEncryptionType?: ConfidentialVMEncryptionType;
  /** secure VM disk encryption set id */
  secureVMDiskEncryptionSetId?: string;
}

export function osDiskImageSecurityProfileSerializer(item: OSDiskImageSecurityProfile): any {
  return {
    confidentialVMEncryptionType: item["confidentialVMEncryptionType"],
    secureVMDiskEncryptionSetId: item["secureVMDiskEncryptionSetId"],
  };
}

export function osDiskImageSecurityProfileDeserializer(item: any): OSDiskImageSecurityProfile {
  return {
    confidentialVMEncryptionType: item["confidentialVMEncryptionType"],
    secureVMDiskEncryptionSetId: item["secureVMDiskEncryptionSetId"],
  };
}

/** confidential VM encryption types */
export enum KnownConfidentialVMEncryptionType {
  /** EncryptedVMGuestStateOnlyWithPmk */
  EncryptedVMGuestStateOnlyWithPmk = "EncryptedVMGuestStateOnlyWithPmk",
  /** EncryptedWithPmk */
  EncryptedWithPmk = "EncryptedWithPmk",
  /** EncryptedWithCmk */
  EncryptedWithCmk = "EncryptedWithCmk",
  /** NonPersistedTPM */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * confidential VM encryption types \
 * {@link KnownConfidentialVMEncryptionType} can be used interchangeably with ConfidentialVMEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EncryptedVMGuestStateOnlyWithPmk** \
 * **EncryptedWithPmk** \
 * **EncryptedWithCmk** \
 * **NonPersistedTPM**
 */
export type ConfidentialVMEncryptionType = string;

export function dataDiskImageEncryptionArraySerializer(
  result: Array<DataDiskImageEncryption>,
): any[] {
  return result.map((item) => {
    return dataDiskImageEncryptionSerializer(item);
  });
}

export function dataDiskImageEncryptionArrayDeserializer(
  result: Array<DataDiskImageEncryption>,
): any[] {
  return result.map((item) => {
    return dataDiskImageEncryptionDeserializer(item);
  });
}

/** Contains encryption settings for a data disk image. */
export interface DataDiskImageEncryption extends DiskImageEncryption {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

export function dataDiskImageEncryptionSerializer(item: DataDiskImageEncryption): any {
  return { diskEncryptionSetId: item["diskEncryptionSetId"], lun: item["lun"] };
}

export function dataDiskImageEncryptionDeserializer(item: any): DataDiskImageEncryption {
  return {
    diskEncryptionSetId: item["diskEncryptionSetId"],
    lun: item["lun"],
  };
}

export function additionalReplicaSetArraySerializer(result: Array<AdditionalReplicaSet>): any[] {
  return result.map((item) => {
    return additionalReplicaSetSerializer(item);
  });
}

export function additionalReplicaSetArrayDeserializer(result: Array<AdditionalReplicaSet>): any[] {
  return result.map((item) => {
    return additionalReplicaSetDeserializer(item);
  });
}

/** Describes the additional replica set information. */
export interface AdditionalReplicaSet {
  /** Specifies the storage account type to be used to create the direct drive replicas */
  storageAccountType?: StorageAccountType;
  /** The number of direct drive replicas of the Image Version to be created.This Property is updatable */
  regionalReplicaCount?: number;
}

export function additionalReplicaSetSerializer(item: AdditionalReplicaSet): any {
  return {
    storageAccountType: item["storageAccountType"],
    regionalReplicaCount: item["regionalReplicaCount"],
  };
}

export function additionalReplicaSetDeserializer(item: any): AdditionalReplicaSet {
  return {
    storageAccountType: item["storageAccountType"],
    regionalReplicaCount: item["regionalReplicaCount"],
  };
}

/** Optional parameter which specifies the mode to be used for replication. This property is not updatable. */
export enum KnownReplicationMode {
  /** Full */
  Full = "Full",
  /** Shallow */
  Shallow = "Shallow",
}

/**
 * Optional parameter which specifies the mode to be used for replication. This property is not updatable. \
 * {@link KnownReplicationMode} can be used interchangeably with ReplicationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full** \
 * **Shallow**
 */
export type ReplicationMode = string;

export function galleryTargetExtendedLocationArraySerializer(
  result: Array<GalleryTargetExtendedLocation>,
): any[] {
  return result.map((item) => {
    return galleryTargetExtendedLocationSerializer(item);
  });
}

export function galleryTargetExtendedLocationArrayDeserializer(
  result: Array<GalleryTargetExtendedLocation>,
): any[] {
  return result.map((item) => {
    return galleryTargetExtendedLocationDeserializer(item);
  });
}

/** model interface GalleryTargetExtendedLocation */
export interface GalleryTargetExtendedLocation {
  /** The name of the region. */
  name?: string;
  /** The name of the extended location. */
  extendedLocation?: GalleryExtendedLocation;
  /** The number of replicas of the Image Version to be created per extended location. This property is updatable. */
  extendedLocationReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: EdgeZoneStorageAccountType;
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImages;
}

export function galleryTargetExtendedLocationSerializer(item: GalleryTargetExtendedLocation): any {
  return {
    name: item["name"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : galleryExtendedLocationSerializer(item["extendedLocation"]),
    extendedLocationReplicaCount: item["extendedLocationReplicaCount"],
    storageAccountType: item["storageAccountType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionImagesSerializer(item["encryption"]),
  };
}

export function galleryTargetExtendedLocationDeserializer(
  item: any,
): GalleryTargetExtendedLocation {
  return {
    name: item["name"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : galleryExtendedLocationDeserializer(item["extendedLocation"]),
    extendedLocationReplicaCount: item["extendedLocationReplicaCount"],
    storageAccountType: item["storageAccountType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionImagesDeserializer(item["encryption"]),
  };
}

/** The name of the extended location. */
export interface GalleryExtendedLocation {
  name?: string;
  /** It is type of the extended location. */
  type?: GalleryExtendedLocationType;
}

export function galleryExtendedLocationSerializer(item: GalleryExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function galleryExtendedLocationDeserializer(item: any): GalleryExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** It is type of the extended location. */
export enum KnownGalleryExtendedLocationType {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * It is type of the extended location. \
 * {@link KnownGalleryExtendedLocationType} can be used interchangeably with GalleryExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone** \
 * **Unknown**
 */
export type GalleryExtendedLocationType = string;

/** Specifies the storage account type to be used to store the image. This property is not updatable. */
export enum KnownEdgeZoneStorageAccountType {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Standard_ZRS */
  StandardZRS = "Standard_ZRS",
  /** StandardSSD_LRS */
  StandardSSDLRS = "StandardSSD_LRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
}

/**
 * Specifies the storage account type to be used to store the image. This property is not updatable. \
 * {@link KnownEdgeZoneStorageAccountType} can be used interchangeably with EdgeZoneStorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Standard_ZRS** \
 * **StandardSSD_LRS** \
 * **Premium_LRS**
 */
export type EdgeZoneStorageAccountType = string;

/** Specifies the strategy to be used when selecting the storage account type. Cannot be specified along with storageAccountType, but can be overridden per region by specifying targetRegions[].storageAccountType. This property is not updatable. */
export enum KnownStorageAccountStrategy {
  /** Choose Standard_ZRS storage if the region supports it, else choose Standard_LRS storage, unless overridden by specifying regional storageAccountType. If no storageAccountStrategy is specified, this is the default strategy (from API version 2025-03-03 onwards). */
  PreferStandardZRS = "PreferStandard_ZRS",
  /** Choose Standard_LRS storage unless overridden by specifying regional storageAccountType. */
  DefaultStandardLRS = "DefaultStandard_LRS",
}

/**
 * Specifies the strategy to be used when selecting the storage account type. Cannot be specified along with storageAccountType, but can be overridden per region by specifying targetRegions[].storageAccountType. This property is not updatable. \
 * {@link KnownStorageAccountStrategy} can be used interchangeably with StorageAccountStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PreferStandard_ZRS**: Choose Standard_ZRS storage if the region supports it, else choose Standard_LRS storage, unless overridden by specifying regional storageAccountType. If no storageAccountStrategy is specified, this is the default strategy (from API version 2025-03-03 onwards). \
 * **DefaultStandard_LRS**: Choose Standard_LRS storage unless overridden by specifying regional storageAccountType.
 */
export type StorageAccountStrategy = string;

/** This is the disk image encryption base class. */
export interface DiskImageEncryption {
  /** A relative URI containing the resource ID of the disk encryption set. */
  diskEncryptionSetId?: string;
}

export function diskImageEncryptionSerializer(item: DiskImageEncryption): any {
  return { diskEncryptionSetId: item["diskEncryptionSetId"] };
}

export function diskImageEncryptionDeserializer(item: any): DiskImageEncryption {
  return {
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

/** The gallery artifact version source. */
export interface GalleryArtifactVersionSource {
  /** The id of the gallery artifact version source. */
  id?: string;
}

export function galleryArtifactVersionSourceSerializer(item: GalleryArtifactVersionSource): any {
  return { id: item["id"] };
}

export function galleryArtifactVersionSourceDeserializer(item: any): GalleryArtifactVersionSource {
  return {
    id: item["id"],
  };
}

/** This is the disk image base class. */
export interface GalleryDiskImage {
  /** This property indicates the size of the VHD to be created. */
  readonly sizeInGB?: number;
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: HostCaching;
  /** The source for the disk image. */
  source?: GalleryDiskImageSource;
}

export function galleryDiskImageSerializer(item: GalleryDiskImage): any {
  return {
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceSerializer(item["source"]),
  };
}

export function galleryDiskImageDeserializer(item: any): GalleryDiskImage {
  return {
    sizeInGB: item["sizeInGB"],
    hostCaching: item["hostCaching"],
    source: !item["source"] ? item["source"] : galleryDiskImageSourceDeserializer(item["source"]),
  };
}

/** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
export type HostCaching = "None" | "ReadOnly" | "ReadWrite";

/** The source for the disk image. */
export interface GalleryDiskImageSource extends GalleryArtifactVersionSource {
  /** The uri of the gallery artifact version source. Currently used to specify vhd/blob source. */
  uri?: string;
  /** The Storage Account Id that contains the vhd blob being used as a source for this artifact version. */
  storageAccountId?: string;
}

export function galleryDiskImageSourceSerializer(item: GalleryDiskImageSource): any {
  return { id: item["id"], uri: item["uri"], storageAccountId: item["storageAccountId"] };
}

export function galleryDiskImageSourceDeserializer(item: any): GalleryDiskImageSource {
  return {
    id: item["id"],
    uri: item["uri"],
    storageAccountId: item["storageAccountId"],
  };
}

/** This is the safety profile of the Gallery Artifact Version. */
export interface GalleryArtifactSafetyProfileBase {
  /** Indicates whether or not removing this Gallery Image Version from replicated regions is allowed. */
  allowDeletionOfReplicatedLocations?: boolean;
}

export function galleryArtifactSafetyProfileBaseSerializer(
  item: GalleryArtifactSafetyProfileBase,
): any {
  return { allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"] };
}

export function galleryArtifactSafetyProfileBaseDeserializer(
  item: any,
): GalleryArtifactSafetyProfileBase {
  return {
    allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"],
  };
}

/** Specifies information about the gallery image version that you want to update. */
export interface GalleryImageVersionUpdate extends UpdateResourceDefinition {
  /** The publishing profile of a gallery image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile?: GalleryImageVersionStorageProfile;
  /** This is the safety profile of the Gallery Image Version. */
  safetyProfile?: GalleryImageVersionSafetyProfile;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
  /** The security profile of a gallery image version */
  securityProfile?: ImageVersionSecurityProfile;
  /** Indicates if this is a soft-delete resource restoration request. */
  restore?: boolean;
  /** This is the validations profile of a Gallery Image Version. */
  readonly validationsProfile?: ValidationsProfile;
}

export function galleryImageVersionUpdateSerializer(item: GalleryImageVersionUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "publishingProfile",
      "storageProfile",
      "safetyProfile",
      "securityProfile",
      "restore",
    ])
      ? undefined
      : _galleryImageVersionUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery Image version operation response. */
export interface _GalleryImageVersionList {
  /** A list of gallery image versions. */
  value: GalleryImageVersion[];
  /** The uri to fetch the next page of gallery image versions. Call ListNext() with this to fetch the next page of gallery image versions. */
  nextLink?: string;
}

export function _galleryImageVersionListDeserializer(item: any): _GalleryImageVersionList {
  return {
    value: galleryImageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryImageVersionArraySerializer(result: Array<GalleryImageVersion>): any[] {
  return result.map((item) => {
    return galleryImageVersionSerializer(item);
  });
}

export function galleryImageVersionArrayDeserializer(result: Array<GalleryImageVersion>): any[] {
  return result.map((item) => {
    return galleryImageVersionDeserializer(item);
  });
}

/** Specifies information about the gallery Application Definition that you want to create or update. */
export interface GalleryApplication extends TrackedResource {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
  supportedOSType?: OperatingSystemTypes;
  /** A list of custom actions that can be performed with all of the Gallery Application Versions within this Gallery Application. */
  customActions?: GalleryApplicationCustomAction[];
}

export function galleryApplicationSerializer(item: GalleryApplication): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "description",
      "eula",
      "privacyStatementUri",
      "releaseNoteUri",
      "endOfLifeDate",
      "supportedOSType",
      "customActions",
    ])
      ? undefined
      : _galleryApplicationPropertiesSerializer(item),
  };
}

export function galleryApplicationDeserializer(item: any): GalleryApplication {
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
      : _galleryApplicationPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery Application Definition. */
export interface GalleryApplicationProperties {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
  supportedOSType: OperatingSystemTypes;
  /** A list of custom actions that can be performed with all of the Gallery Application Versions within this Gallery Application. */
  customActions?: GalleryApplicationCustomAction[];
}

export function galleryApplicationPropertiesSerializer(item: GalleryApplicationProperties): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArraySerializer(item["customActions"]),
  };
}

export function galleryApplicationPropertiesDeserializer(item: any): GalleryApplicationProperties {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArrayDeserializer(item["customActions"]),
  };
}

export function galleryApplicationCustomActionArraySerializer(
  result: Array<GalleryApplicationCustomAction>,
): any[] {
  return result.map((item) => {
    return galleryApplicationCustomActionSerializer(item);
  });
}

export function galleryApplicationCustomActionArrayDeserializer(
  result: Array<GalleryApplicationCustomAction>,
): any[] {
  return result.map((item) => {
    return galleryApplicationCustomActionDeserializer(item);
  });
}

/** A custom action that can be performed with a Gallery Application Version. */
export interface GalleryApplicationCustomAction {
  /** The name of the custom action.  Must be unique within the Gallery Application Version. */
  name: string;
  /** The script to run when executing this custom action. */
  script: string;
  /** Description to help the users understand what this custom action does. */
  description?: string;
  /** The parameters that this custom action uses */
  parameters?: GalleryApplicationCustomActionParameter[];
}

export function galleryApplicationCustomActionSerializer(
  item: GalleryApplicationCustomAction,
): any {
  return {
    name: item["name"],
    script: item["script"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : galleryApplicationCustomActionParameterArraySerializer(item["parameters"]),
  };
}

export function galleryApplicationCustomActionDeserializer(
  item: any,
): GalleryApplicationCustomAction {
  return {
    name: item["name"],
    script: item["script"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : galleryApplicationCustomActionParameterArrayDeserializer(item["parameters"]),
  };
}

export function galleryApplicationCustomActionParameterArraySerializer(
  result: Array<GalleryApplicationCustomActionParameter>,
): any[] {
  return result.map((item) => {
    return galleryApplicationCustomActionParameterSerializer(item);
  });
}

export function galleryApplicationCustomActionParameterArrayDeserializer(
  result: Array<GalleryApplicationCustomActionParameter>,
): any[] {
  return result.map((item) => {
    return galleryApplicationCustomActionParameterDeserializer(item);
  });
}

/** The definition of a parameter that can be passed to a custom action of a Gallery Application Version. */
export interface GalleryApplicationCustomActionParameter {
  /** The name of the custom action.  Must be unique within the Gallery Application Version. */
  name: string;
  /** Indicates whether this parameter must be passed when running the custom action. */
  required?: boolean;
  /** Specifies the type of the custom action parameter. Possible values are: String, ConfigurationDataBlob or LogOutputBlob */
  type?: GalleryApplicationCustomActionParameterType;
  /** The default value of the parameter.  Only applies to string types */
  defaultValue?: string;
  /** A description to help users understand what this parameter means */
  description?: string;
}

export function galleryApplicationCustomActionParameterSerializer(
  item: GalleryApplicationCustomActionParameter,
): any {
  return {
    name: item["name"],
    required: item["required"],
    type: item["type"],
    defaultValue: item["defaultValue"],
    description: item["description"],
  };
}

export function galleryApplicationCustomActionParameterDeserializer(
  item: any,
): GalleryApplicationCustomActionParameter {
  return {
    name: item["name"],
    required: item["required"],
    type: item["type"],
    defaultValue: item["defaultValue"],
    description: item["description"],
  };
}

/** Specifies the type of the custom action parameter. Possible values are: String, ConfigurationDataBlob or LogOutputBlob */
export type GalleryApplicationCustomActionParameterType =
  | "String"
  | "ConfigurationDataBlob"
  | "LogOutputBlob";

/** Specifies information about the gallery Application Definition that you want to update. */
export interface GalleryApplicationUpdate extends UpdateResourceDefinition {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
  supportedOSType?: OperatingSystemTypes;
  /** A list of custom actions that can be performed with all of the Gallery Application Versions within this Gallery Application. */
  customActions?: GalleryApplicationCustomAction[];
}

export function galleryApplicationUpdateSerializer(item: GalleryApplicationUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "eula",
      "privacyStatementUri",
      "releaseNoteUri",
      "endOfLifeDate",
      "supportedOSType",
      "customActions",
    ])
      ? undefined
      : _galleryApplicationUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery Applications operation response. */
export interface _GalleryApplicationList {
  /** The GalleryApplication items on this page */
  value: GalleryApplication[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryApplicationListDeserializer(item: any): _GalleryApplicationList {
  return {
    value: galleryApplicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryApplicationArraySerializer(result: Array<GalleryApplication>): any[] {
  return result.map((item) => {
    return galleryApplicationSerializer(item);
  });
}

export function galleryApplicationArrayDeserializer(result: Array<GalleryApplication>): any[] {
  return result.map((item) => {
    return galleryApplicationDeserializer(item);
  });
}

/** Specifies information about the gallery Application Version that you want to create or update. */
export interface GalleryApplicationVersion extends TrackedResource {
  /** The publishing profile of a gallery image version. */
  publishingProfile?: GalleryApplicationVersionPublishingProfile;
  /** The safety profile of the Gallery Application Version. */
  safetyProfile?: GalleryApplicationVersionSafetyProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryApplicationVersionSerializer(item: GalleryApplicationVersion): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["publishingProfile", "safetyProfile"])
      ? undefined
      : _galleryApplicationVersionPropertiesSerializer(item),
  };
}

export function galleryApplicationVersionDeserializer(item: any): GalleryApplicationVersion {
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
      : _galleryApplicationVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image version. */
export interface GalleryApplicationVersionProperties {
  /** The publishing profile of a gallery image version. */
  publishingProfile: GalleryApplicationVersionPublishingProfile;
  /** The safety profile of the Gallery Application Version. */
  safetyProfile?: GalleryApplicationVersionSafetyProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryApplicationVersionPropertiesSerializer(
  item: GalleryApplicationVersionProperties,
): any {
  return {
    publishingProfile: galleryApplicationVersionPublishingProfileSerializer(
      item["publishingProfile"],
    ),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileSerializer(item["safetyProfile"]),
  };
}

export function galleryApplicationVersionPropertiesDeserializer(
  item: any,
): GalleryApplicationVersionProperties {
  return {
    publishingProfile: galleryApplicationVersionPublishingProfileDeserializer(
      item["publishingProfile"],
    ),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileDeserializer(item["safetyProfile"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

/** The publishing profile of a gallery image version. */
export interface GalleryApplicationVersionPublishingProfile extends GalleryArtifactPublishingProfileBase {
  /** The source image from which the Image Version is going to be created. */
  source: UserArtifactSource;
  manageActions?: UserArtifactManage;
  /** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
  settings?: UserArtifactSettings;
  /** Optional. Additional settings to pass to the vm-application-manager extension. For advanced use only. */
  advancedSettings?: Record<string, string>;
  /** Optional. Whether or not this application reports health. */
  enableHealthCheck?: boolean;
  /** A list of custom actions that can be performed with this Gallery Application Version. */
  customActions?: GalleryApplicationCustomAction[];
}

export function galleryApplicationVersionPublishingProfileSerializer(
  item: GalleryApplicationVersionPublishingProfile,
): any {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArraySerializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArraySerializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
    source: userArtifactSourceSerializer(item["source"]),
    manageActions: !item["manageActions"]
      ? item["manageActions"]
      : userArtifactManageSerializer(item["manageActions"]),
    settings: !item["settings"]
      ? item["settings"]
      : userArtifactSettingsSerializer(item["settings"]),
    advancedSettings: item["advancedSettings"],
    enableHealthCheck: item["enableHealthCheck"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArraySerializer(item["customActions"]),
  };
}

export function galleryApplicationVersionPublishingProfileDeserializer(
  item: any,
): GalleryApplicationVersionPublishingProfile {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArrayDeserializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArrayDeserializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
    source: userArtifactSourceDeserializer(item["source"]),
    manageActions: !item["manageActions"]
      ? item["manageActions"]
      : userArtifactManageDeserializer(item["manageActions"]),
    settings: !item["settings"]
      ? item["settings"]
      : userArtifactSettingsDeserializer(item["settings"]),
    advancedSettings: !item["advancedSettings"]
      ? item["advancedSettings"]
      : Object.fromEntries(
          Object.entries(item["advancedSettings"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    enableHealthCheck: item["enableHealthCheck"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArrayDeserializer(item["customActions"]),
  };
}

/** The source image from which the Image Version is going to be created. */
export interface UserArtifactSource {
  /** Required. The mediaLink of the artifact, must be a readable storage page blob. */
  mediaLink: string;
  /** Optional. The defaultConfigurationLink of the artifact, must be a readable storage page blob. */
  defaultConfigurationLink?: string;
}

export function userArtifactSourceSerializer(item: UserArtifactSource): any {
  return {
    mediaLink: item["mediaLink"],
    defaultConfigurationLink: item["defaultConfigurationLink"],
  };
}

export function userArtifactSourceDeserializer(item: any): UserArtifactSource {
  return {
    mediaLink: item["mediaLink"],
    defaultConfigurationLink: item["defaultConfigurationLink"],
  };
}

/** model interface UserArtifactManage */
export interface UserArtifactManage {
  /** Required. The path and arguments to install the gallery application. This is limited to 4096 characters. */
  install: string;
  /** Required. The path and arguments to remove the gallery application. This is limited to 4096 characters. */
  remove: string;
  /** Optional. The path and arguments to update the gallery application. If not present, then update operation will invoke remove command on the previous version and install command on the current version of the gallery application. This is limited to 4096 characters. */
  update?: string;
}

export function userArtifactManageSerializer(item: UserArtifactManage): any {
  return { install: item["install"], remove: item["remove"], update: item["update"] };
}

export function userArtifactManageDeserializer(item: any): UserArtifactManage {
  return {
    install: item["install"],
    remove: item["remove"],
    update: item["update"],
  };
}

/** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
export interface UserArtifactSettings {
  /** Optional. The name to assign the downloaded package file on the VM. This is limited to 4096 characters. If not specified, the package file will be named the same as the Gallery Application name. */
  packageFileName?: string;
  /** Optional. The name to assign the downloaded config file on the VM. This is limited to 4096 characters. If not specified, the config file will be named the Gallery Application name appended with "_config". */
  configFileName?: string;
  /** Optional. The action to be taken with regards to install/update/remove of the gallery application in the event of a reboot. */
  scriptBehaviorAfterReboot?: GalleryApplicationScriptRebootBehavior;
}

export function userArtifactSettingsSerializer(item: UserArtifactSettings): any {
  return {
    packageFileName: item["packageFileName"],
    configFileName: item["configFileName"],
    scriptBehaviorAfterReboot: item["scriptBehaviorAfterReboot"],
  };
}

export function userArtifactSettingsDeserializer(item: any): UserArtifactSettings {
  return {
    packageFileName: item["packageFileName"],
    configFileName: item["configFileName"],
    scriptBehaviorAfterReboot: item["scriptBehaviorAfterReboot"],
  };
}

/** Optional. The action to be taken with regards to install/update/remove of the gallery application in the event of a reboot. */
export enum KnownGalleryApplicationScriptRebootBehavior {
  /** None */
  None = "None",
  /** Rerun */
  Rerun = "Rerun",
}

/**
 * Optional. The action to be taken with regards to install/update/remove of the gallery application in the event of a reboot. \
 * {@link KnownGalleryApplicationScriptRebootBehavior} can be used interchangeably with GalleryApplicationScriptRebootBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Rerun**
 */
export type GalleryApplicationScriptRebootBehavior = string;

/** The safety profile of the Gallery Application Version. */
export interface GalleryApplicationVersionSafetyProfile extends GalleryArtifactSafetyProfileBase {}

export function galleryApplicationVersionSafetyProfileSerializer(
  item: GalleryApplicationVersionSafetyProfile,
): any {
  return { allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"] };
}

export function galleryApplicationVersionSafetyProfileDeserializer(
  item: any,
): GalleryApplicationVersionSafetyProfile {
  return {
    allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"],
  };
}

/** Specifies information about the gallery Application Version that you want to update. */
export interface GalleryApplicationVersionUpdate extends UpdateResourceDefinition {
  /** The publishing profile of a gallery image version. */
  publishingProfile?: GalleryApplicationVersionPublishingProfile;
  /** The safety profile of the Gallery Application Version. */
  safetyProfile?: GalleryApplicationVersionSafetyProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryApplicationVersionUpdateSerializer(
  item: GalleryApplicationVersionUpdate,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["publishingProfile", "safetyProfile"])
      ? undefined
      : _galleryApplicationVersionUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery Application version operation response. */
export interface _GalleryApplicationVersionList {
  /** A list of gallery Application Versions. */
  value: GalleryApplicationVersion[];
  /** The uri to fetch the next page of gallery Application Versions. Call ListNext() with this to fetch the next page of gallery Application Versions. */
  nextLink?: string;
}

export function _galleryApplicationVersionListDeserializer(
  item: any,
): _GalleryApplicationVersionList {
  return {
    value: galleryApplicationVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryApplicationVersionArraySerializer(
  result: Array<GalleryApplicationVersion>,
): any[] {
  return result.map((item) => {
    return galleryApplicationVersionSerializer(item);
  });
}

export function galleryApplicationVersionArrayDeserializer(
  result: Array<GalleryApplicationVersion>,
): any[] {
  return result.map((item) => {
    return galleryApplicationVersionDeserializer(item);
  });
}

/** Specifies information about the gallery Script Definition that you want to create or update. */
export interface GalleryScript extends TrackedResource {
  /** Describes the properties of a gallery Script Definition. */
  properties?: GalleryScriptProperties;
}

export function galleryScriptSerializer(item: GalleryScript): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryScriptPropertiesSerializer(item["properties"]),
  };
}

export function galleryScriptDeserializer(item: any): GalleryScript {
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
      : galleryScriptPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a gallery script definition. */
export interface GalleryScriptProperties {
  /** The description of this gallery script definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement (End User License Agreement) for the gallery Script Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Script Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
  supportedOSType: OperatingSystemTypes;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
}

export function galleryScriptPropertiesSerializer(item: GalleryScriptProperties): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    supportedOSType: item["supportedOSType"],
  };
}

export function galleryScriptPropertiesDeserializer(item: any): GalleryScriptProperties {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    supportedOSType: item["supportedOSType"],
    provisioningState: item["provisioningState"],
  };
}

/** Specifies information about the gallery Script Definition that you want to update. */
export interface GalleryScriptUpdate extends UpdateResourceDefinition {
  /** The description of this gallery script definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement (End User License Agreement) for the gallery Script Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Script Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
  supportedOSType?: OperatingSystemTypes;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
}

export function galleryScriptUpdateSerializer(item: GalleryScriptUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "eula",
      "privacyStatementUri",
      "releaseNoteUri",
      "endOfLifeDate",
      "supportedOSType",
    ])
      ? undefined
      : _galleryScriptUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery Script operation response. */
export interface _GalleryScriptList {
  /** The GalleryScript items on this page */
  value: GalleryScript[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryScriptListDeserializer(item: any): _GalleryScriptList {
  return {
    value: galleryScriptArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryScriptArraySerializer(result: Array<GalleryScript>): any[] {
  return result.map((item) => {
    return galleryScriptSerializer(item);
  });
}

export function galleryScriptArrayDeserializer(result: Array<GalleryScript>): any[] {
  return result.map((item) => {
    return galleryScriptDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface GalleryScriptVersion extends TrackedResource {
  /** Describes the properties of a gallery Script Version. */
  properties?: GalleryScriptVersionProperties;
}

export function galleryScriptVersionSerializer(item: GalleryScriptVersion): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryScriptVersionPropertiesSerializer(item["properties"]),
  };
}

export function galleryScriptVersionDeserializer(item: any): GalleryScriptVersion {
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
      : galleryScriptVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a gallery script version. */
export interface GalleryScriptVersionProperties {
  /** The publishing profile of a gallery image version. */
  publishingProfile: GalleryScriptVersionPublishingProfile;
  /** The safety profile of the Gallery Script Version. */
  safetyProfile?: GalleryScriptVersionSafetyProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryScriptVersionPropertiesSerializer(
  item: GalleryScriptVersionProperties,
): any {
  return {
    publishingProfile: galleryScriptVersionPublishingProfileSerializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryScriptVersionSafetyProfileSerializer(item["safetyProfile"]),
  };
}

export function galleryScriptVersionPropertiesDeserializer(
  item: any,
): GalleryScriptVersionProperties {
  return {
    publishingProfile: galleryScriptVersionPublishingProfileDeserializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryScriptVersionSafetyProfileDeserializer(item["safetyProfile"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

/** The publishing profile of a gallery image version. */
export interface GalleryScriptVersionPublishingProfile extends GalleryArtifactPublishingProfileBase {
  /** The source script from which the Script Version is going to be created. */
  source: ScriptSource;
}

export function galleryScriptVersionPublishingProfileSerializer(
  item: GalleryScriptVersionPublishingProfile,
): any {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArraySerializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArraySerializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
    source: scriptSourceSerializer(item["source"]),
  };
}

export function galleryScriptVersionPublishingProfileDeserializer(
  item: any,
): GalleryScriptVersionPublishingProfile {
  return {
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArrayDeserializer(item["targetRegions"]),
    replicaCount: item["replicaCount"],
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    storageAccountType: item["storageAccountType"],
    replicationMode: item["replicationMode"],
    targetExtendedLocations: !item["targetExtendedLocations"]
      ? item["targetExtendedLocations"]
      : galleryTargetExtendedLocationArrayDeserializer(item["targetExtendedLocations"]),
    storageAccountStrategy: item["storageAccountStrategy"],
    source: scriptSourceDeserializer(item["source"]),
  };
}

/** The source script from which the Script Version is going to be created. */
export interface ScriptSource {
  /** Required. The link of the source script, it must be a readable storage blob with SAS URI or publicly accessible URI or managed identity enabled. */
  scriptLink: string;
  /** Optional. Any input parameters that needs to passed to the script and are accessed within the script for its execution. */
  parameters?: GalleryScriptParameter[];
}

export function scriptSourceSerializer(item: ScriptSource): any {
  return {
    scriptLink: item["scriptLink"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : galleryScriptParameterArraySerializer(item["parameters"]),
  };
}

export function scriptSourceDeserializer(item: any): ScriptSource {
  return {
    scriptLink: item["scriptLink"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : galleryScriptParameterArrayDeserializer(item["parameters"]),
  };
}

export function galleryScriptParameterArraySerializer(
  result: Array<GalleryScriptParameter>,
): any[] {
  return result.map((item) => {
    return galleryScriptParameterSerializer(item);
  });
}

export function galleryScriptParameterArrayDeserializer(
  result: Array<GalleryScriptParameter>,
): any[] {
  return result.map((item) => {
    return galleryScriptParameterDeserializer(item);
  });
}

/** The definition of a parameter that can be passed to a script of a Gallery Script Version. */
export interface GalleryScriptParameter extends GenericGalleryParameter {
  /** Specifies the type of the Gallery Script parameter. Possible values are: String, Int, Double, Boolean, Enum */
  type?: GalleryScriptParameterType;
  /** The minimum value of parameter. */
  minValue?: string;
  /** The minimum value of parameter. */
  maxValue?: string;
  /** A list of permissible values. Only applicable values are from 'enum' values defined in 'GalleryScriptParameter'. */
  enumValues?: string[];
}

export function galleryScriptParameterSerializer(item: GalleryScriptParameter): any {
  return {
    name: item["name"],
    required: item["required"],
    defaultValue: item["defaultValue"],
    description: item["description"],
    type: item["type"],
    minValue: item["minValue"],
    maxValue: item["maxValue"],
    enumValues: !item["enumValues"]
      ? item["enumValues"]
      : item["enumValues"].map((p: any) => {
          return p;
        }),
  };
}

export function galleryScriptParameterDeserializer(item: any): GalleryScriptParameter {
  return {
    name: item["name"],
    required: item["required"],
    defaultValue: item["defaultValue"],
    description: item["description"],
    type: item["type"],
    minValue: item["minValue"],
    maxValue: item["maxValue"],
    enumValues: !item["enumValues"]
      ? item["enumValues"]
      : item["enumValues"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the type of the Gallery Script parameter. Possible values are: String, Int, Double, Boolean, Enum */
export enum KnownGalleryScriptParameterType {
  /** String gallery script parameter type */
  String = "String",
  /** Int gallery script parameter type */
  Int = "Int",
  /** Double gallery script parameter type */
  Double = "Double",
  /** Boolean gallery script parameter type */
  Boolean = "Boolean",
  /** Enum gallery script parameter type */
  Enum = "Enum",
}

/**
 * Specifies the type of the Gallery Script parameter. Possible values are: String, Int, Double, Boolean, Enum \
 * {@link KnownGalleryScriptParameterType} can be used interchangeably with GalleryScriptParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String gallery script parameter type \
 * **Int**: Int gallery script parameter type \
 * **Double**: Double gallery script parameter type \
 * **Boolean**: Boolean gallery script parameter type \
 * **Enum**: Enum gallery script parameter type
 */
export type GalleryScriptParameterType = string;

/** The safety profile of the Gallery Script Version. */
export interface GalleryScriptVersionSafetyProfile extends GalleryArtifactSafetyProfileBase {}

export function galleryScriptVersionSafetyProfileSerializer(
  item: GalleryScriptVersionSafetyProfile,
): any {
  return { allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"] };
}

export function galleryScriptVersionSafetyProfileDeserializer(
  item: any,
): GalleryScriptVersionSafetyProfile {
  return {
    allowDeletionOfReplicatedLocations: item["allowDeletionOfReplicatedLocations"],
  };
}

/** The definition of a generic gallery parameter. */
export interface GenericGalleryParameter {
  /** The name of the parameter. */
  name: string;
  /** Indicates whether this parameter must be passed. */
  required?: boolean;
  /** The default value of the parameter, only applies to string types. */
  defaultValue?: string;
  /** A description to help users understand what this parameter means */
  description?: string;
}

export function genericGalleryParameterSerializer(item: GenericGalleryParameter): any {
  return {
    name: item["name"],
    required: item["required"],
    defaultValue: item["defaultValue"],
    description: item["description"],
  };
}

export function genericGalleryParameterDeserializer(item: any): GenericGalleryParameter {
  return {
    name: item["name"],
    required: item["required"],
    defaultValue: item["defaultValue"],
    description: item["description"],
  };
}

/** Specifies information about the gallery Script Version that you want to update. */
export interface GalleryScriptVersionUpdate extends UpdateResourceDefinition {
  /** The publishing profile of a gallery image version. */
  publishingProfile?: GalleryScriptVersionPublishingProfile;
  /** The safety profile of the Gallery Script Version. */
  safetyProfile?: GalleryScriptVersionSafetyProfile;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryScriptVersionUpdateSerializer(item: GalleryScriptVersionUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["publishingProfile", "safetyProfile"])
      ? undefined
      : _galleryScriptVersionUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of GalleryScriptVersion items */
export interface _GalleryScriptVersionList {
  /** The GalleryScriptVersion items on this page */
  value: GalleryScriptVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryScriptVersionListDeserializer(item: any): _GalleryScriptVersionList {
  return {
    value: galleryScriptVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryScriptVersionArraySerializer(result: Array<GalleryScriptVersion>): any[] {
  return result.map((item) => {
    return galleryScriptVersionSerializer(item);
  });
}

export function galleryScriptVersionArrayDeserializer(result: Array<GalleryScriptVersion>): any[] {
  return result.map((item) => {
    return galleryScriptVersionDeserializer(item);
  });
}

/** Specifies information about the gallery inVMAccessControlProfile that you want to create or update. */
export interface GalleryInVMAccessControlProfile extends TrackedResource {
  /** Describes the properties of a gallery inVMAccessControlProfile. */
  properties?: GalleryInVMAccessControlProfileProperties;
}

export function galleryInVMAccessControlProfileSerializer(
  item: GalleryInVMAccessControlProfile,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryInVMAccessControlProfilePropertiesSerializer(item["properties"]),
  };
}

export function galleryInVMAccessControlProfileDeserializer(
  item: any,
): GalleryInVMAccessControlProfile {
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
      : galleryInVMAccessControlProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a gallery inVMAccessControlProfile. */
export interface GalleryInVMAccessControlProfileProperties extends GalleryResourceProfilePropertiesBase {
  /** The description of this gallery inVMAccessControlProfile resources. This property is updatable. */
  description?: string;
  /** This property allows you to specify the OS type of the VMs/VMSS for which this profile can be used against. Possible values are: 'Windows' or 'Linux' */
  osType: OperatingSystemTypes;
  /** This property allows you to specify the Endpoint type for which this profile is defining the access control for. Possible values are: 'WireServer' or 'IMDS' */
  applicableHostEndpoint: EndpointTypes;
}

export function galleryInVMAccessControlProfilePropertiesSerializer(
  item: GalleryInVMAccessControlProfileProperties,
): any {
  return {
    description: item["description"],
    osType: item["osType"],
    applicableHostEndpoint: item["applicableHostEndpoint"],
  };
}

export function galleryInVMAccessControlProfilePropertiesDeserializer(
  item: any,
): GalleryInVMAccessControlProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    osType: item["osType"],
    applicableHostEndpoint: item["applicableHostEndpoint"],
  };
}

/** This property allows you to specify the Endpoint type for which this profile is defining the access control for. Possible values are: 'WireServer' or 'IMDS' */
export type EndpointTypes = "WireServer" | "IMDS";

/** The properties of a gallery ResourceProfile. */
export interface GalleryResourceProfilePropertiesBase {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
}

export function galleryResourceProfilePropertiesBaseSerializer(
  _item: GalleryResourceProfilePropertiesBase,
): any {
  return {};
}

export function galleryResourceProfilePropertiesBaseDeserializer(
  item: any,
): GalleryResourceProfilePropertiesBase {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Specifies information about the gallery inVMAccessControlProfile that you want to update. */
export interface GalleryInVMAccessControlProfileUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a gallery inVMAccessControlProfile. */
  properties?: GalleryInVMAccessControlProfileProperties;
}

export function galleryInVMAccessControlProfileUpdateSerializer(
  item: GalleryInVMAccessControlProfileUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryInVMAccessControlProfilePropertiesSerializer(item["properties"]),
  };
}

/** The List Gallery InVMAccessControlProfiles operation response. */
export interface _GalleryInVMAccessControlProfileList {
  /** The GalleryInVMAccessControlProfile items on this page */
  value: GalleryInVMAccessControlProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryInVMAccessControlProfileListDeserializer(
  item: any,
): _GalleryInVMAccessControlProfileList {
  return {
    value: galleryInVMAccessControlProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryInVMAccessControlProfileArraySerializer(
  result: Array<GalleryInVMAccessControlProfile>,
): any[] {
  return result.map((item) => {
    return galleryInVMAccessControlProfileSerializer(item);
  });
}

export function galleryInVMAccessControlProfileArrayDeserializer(
  result: Array<GalleryInVMAccessControlProfile>,
): any[] {
  return result.map((item) => {
    return galleryInVMAccessControlProfileDeserializer(item);
  });
}

/** Specifies information about the gallery inVMAccessControlProfile version that you want to create or update. */
export interface GalleryInVMAccessControlProfileVersion extends TrackedResource {
  /** The target regions where the Resource Profile version is going to be replicated to. This property is updatable. */
  targetLocations?: TargetRegion[];
  /** If set to true, Virtual Machines deployed from the latest version of the Resource Profile won't use this Profile version. */
  excludeFromLatest?: boolean;
  /** The timestamp for when the Resource Profile Version is published. */
  readonly publishedDate?: Date;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
  /** This property allows you to specify whether the access control rules are in Audit mode, in Enforce mode or Disabled. Possible values are: 'Audit', 'Enforce' or 'Disabled'. */
  mode?: AccessControlRulesMode;
  /** This property allows you to specify if the requests will be allowed to access the host endpoints. Possible values are: 'Allow', 'Deny'. */
  defaultAccess?: EndpointAccess;
  /** This is the Access Control Rules specification for an inVMAccessControlProfile version. */
  rules?: AccessControlRules;
}

export function galleryInVMAccessControlProfileVersionSerializer(
  item: GalleryInVMAccessControlProfileVersion,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "targetLocations",
      "excludeFromLatest",
      "mode",
      "defaultAccess",
      "rules",
    ])
      ? undefined
      : _galleryInVMAccessControlProfileVersionPropertiesSerializer(item),
  };
}

export function galleryInVMAccessControlProfileVersionDeserializer(
  item: any,
): GalleryInVMAccessControlProfileVersion {
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
      : _galleryInVMAccessControlProfileVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of an inVMAccessControlProfile version. */
export interface GalleryInVMAccessControlProfileVersionProperties extends GalleryResourceProfileVersionPropertiesBase {
  /** This property allows you to specify whether the access control rules are in Audit mode, in Enforce mode or Disabled. Possible values are: 'Audit', 'Enforce' or 'Disabled'. */
  mode: AccessControlRulesMode;
  /** This property allows you to specify if the requests will be allowed to access the host endpoints. Possible values are: 'Allow', 'Deny'. */
  defaultAccess: EndpointAccess;
  /** This is the Access Control Rules specification for an inVMAccessControlProfile version. */
  rules?: AccessControlRules;
}

export function galleryInVMAccessControlProfileVersionPropertiesSerializer(
  item: GalleryInVMAccessControlProfileVersionProperties,
): any {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArraySerializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesSerializer(item["rules"]),
  };
}

export function galleryInVMAccessControlProfileVersionPropertiesDeserializer(
  item: any,
): GalleryInVMAccessControlProfileVersionProperties {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArrayDeserializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesDeserializer(item["rules"]),
  };
}

/** This property allows you to specify whether the access control rules are in Audit mode, in Enforce mode or Disabled. Possible values are: 'Audit', 'Enforce' or 'Disabled'. */
export enum KnownAccessControlRulesMode {
  /** Audit */
  Audit = "Audit",
  /** Enforce */
  Enforce = "Enforce",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * This property allows you to specify whether the access control rules are in Audit mode, in Enforce mode or Disabled. Possible values are: 'Audit', 'Enforce' or 'Disabled'. \
 * {@link KnownAccessControlRulesMode} can be used interchangeably with AccessControlRulesMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit** \
 * **Enforce** \
 * **Disabled**
 */
export type AccessControlRulesMode = string;

/** This property allows you to specify if the requests will be allowed to access the host endpoints. Possible values are: 'Allow', 'Deny'. */
export enum KnownEndpointAccess {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * This property allows you to specify if the requests will be allowed to access the host endpoints. Possible values are: 'Allow', 'Deny'. \
 * {@link KnownEndpointAccess} can be used interchangeably with EndpointAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type EndpointAccess = string;

/** This is the Access Control Rules specification for an inVMAccessControlProfile version. */
export interface AccessControlRules {
  /** A list of privileges. */
  privileges?: AccessControlRulesPrivilege[];
  /** A list of roles. */
  roles?: AccessControlRulesRole[];
  /** A list of identities. */
  identities?: AccessControlRulesIdentity[];
  /** A list of role assignments. */
  roleAssignments?: AccessControlRulesRoleAssignment[];
}

export function accessControlRulesSerializer(item: AccessControlRules): any {
  return {
    privileges: !item["privileges"]
      ? item["privileges"]
      : accessControlRulesPrivilegeArraySerializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : accessControlRulesRoleArraySerializer(item["roles"]),
    identities: !item["identities"]
      ? item["identities"]
      : accessControlRulesIdentityArraySerializer(item["identities"]),
    roleAssignments: !item["roleAssignments"]
      ? item["roleAssignments"]
      : accessControlRulesRoleAssignmentArraySerializer(item["roleAssignments"]),
  };
}

export function accessControlRulesDeserializer(item: any): AccessControlRules {
  return {
    privileges: !item["privileges"]
      ? item["privileges"]
      : accessControlRulesPrivilegeArrayDeserializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : accessControlRulesRoleArrayDeserializer(item["roles"]),
    identities: !item["identities"]
      ? item["identities"]
      : accessControlRulesIdentityArrayDeserializer(item["identities"]),
    roleAssignments: !item["roleAssignments"]
      ? item["roleAssignments"]
      : accessControlRulesRoleAssignmentArrayDeserializer(item["roleAssignments"]),
  };
}

export function accessControlRulesPrivilegeArraySerializer(
  result: Array<AccessControlRulesPrivilege>,
): any[] {
  return result.map((item) => {
    return accessControlRulesPrivilegeSerializer(item);
  });
}

export function accessControlRulesPrivilegeArrayDeserializer(
  result: Array<AccessControlRulesPrivilege>,
): any[] {
  return result.map((item) => {
    return accessControlRulesPrivilegeDeserializer(item);
  });
}

/** The properties of an Access Control Rule Privilege. */
export interface AccessControlRulesPrivilege {
  /** The name of the privilege. */
  name: string;
  /** The HTTP path corresponding to the privilege. */
  path: string;
  /** The query parameters to match in the path. */
  queryParameters?: Record<string, string>;
}

export function accessControlRulesPrivilegeSerializer(item: AccessControlRulesPrivilege): any {
  return { name: item["name"], path: item["path"], queryParameters: item["queryParameters"] };
}

export function accessControlRulesPrivilegeDeserializer(item: any): AccessControlRulesPrivilege {
  return {
    name: item["name"],
    path: item["path"],
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : Object.fromEntries(
          Object.entries(item["queryParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function accessControlRulesRoleArraySerializer(
  result: Array<AccessControlRulesRole>,
): any[] {
  return result.map((item) => {
    return accessControlRulesRoleSerializer(item);
  });
}

export function accessControlRulesRoleArrayDeserializer(
  result: Array<AccessControlRulesRole>,
): any[] {
  return result.map((item) => {
    return accessControlRulesRoleDeserializer(item);
  });
}

/** The properties of an Access Control Rule Role. */
export interface AccessControlRulesRole {
  /** The name of the role. */
  name: string;
  /** A list of privileges needed by this role. */
  privileges: string[];
}

export function accessControlRulesRoleSerializer(item: AccessControlRulesRole): any {
  return {
    name: item["name"],
    privileges: item["privileges"].map((p: any) => {
      return p;
    }),
  };
}

export function accessControlRulesRoleDeserializer(item: any): AccessControlRulesRole {
  return {
    name: item["name"],
    privileges: item["privileges"].map((p: any) => {
      return p;
    }),
  };
}

export function accessControlRulesIdentityArraySerializer(
  result: Array<AccessControlRulesIdentity>,
): any[] {
  return result.map((item) => {
    return accessControlRulesIdentitySerializer(item);
  });
}

export function accessControlRulesIdentityArrayDeserializer(
  result: Array<AccessControlRulesIdentity>,
): any[] {
  return result.map((item) => {
    return accessControlRulesIdentityDeserializer(item);
  });
}

/** The properties of an Access Control Rule Identity. */
export interface AccessControlRulesIdentity {
  /** The name of the identity. */
  name: string;
  /** The username corresponding to this identity. */
  userName?: string;
  /** The groupName corresponding to this identity. */
  groupName?: string;
  /** The path to the executable. */
  exePath?: string;
  /** The process name of the executable. */
  processName?: string;
}

export function accessControlRulesIdentitySerializer(item: AccessControlRulesIdentity): any {
  return {
    name: item["name"],
    userName: item["userName"],
    groupName: item["groupName"],
    exePath: item["exePath"],
    processName: item["processName"],
  };
}

export function accessControlRulesIdentityDeserializer(item: any): AccessControlRulesIdentity {
  return {
    name: item["name"],
    userName: item["userName"],
    groupName: item["groupName"],
    exePath: item["exePath"],
    processName: item["processName"],
  };
}

export function accessControlRulesRoleAssignmentArraySerializer(
  result: Array<AccessControlRulesRoleAssignment>,
): any[] {
  return result.map((item) => {
    return accessControlRulesRoleAssignmentSerializer(item);
  });
}

export function accessControlRulesRoleAssignmentArrayDeserializer(
  result: Array<AccessControlRulesRoleAssignment>,
): any[] {
  return result.map((item) => {
    return accessControlRulesRoleAssignmentDeserializer(item);
  });
}

/** The properties of an Access Control Rule RoleAssignment. */
export interface AccessControlRulesRoleAssignment {
  /** The name of the role. */
  role: string;
  /** A list of identities that can access the privileges defined by the role. */
  identities: string[];
}

export function accessControlRulesRoleAssignmentSerializer(
  item: AccessControlRulesRoleAssignment,
): any {
  return {
    role: item["role"],
    identities: item["identities"].map((p: any) => {
      return p;
    }),
  };
}

export function accessControlRulesRoleAssignmentDeserializer(
  item: any,
): AccessControlRulesRoleAssignment {
  return {
    role: item["role"],
    identities: item["identities"].map((p: any) => {
      return p;
    }),
  };
}

/** The properties of a gallery ResourceProfile version. */
export interface GalleryResourceProfileVersionPropertiesBase {
  /** The target regions where the Resource Profile version is going to be replicated to. This property is updatable. */
  targetLocations?: TargetRegion[];
  /** If set to true, Virtual Machines deployed from the latest version of the Resource Profile won't use this Profile version. */
  excludeFromLatest?: boolean;
  /** The timestamp for when the Resource Profile Version is published. */
  readonly publishedDate?: Date;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
}

export function galleryResourceProfileVersionPropertiesBaseSerializer(
  item: GalleryResourceProfileVersionPropertiesBase,
): any {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArraySerializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
  };
}

export function galleryResourceProfileVersionPropertiesBaseDeserializer(
  item: any,
): GalleryResourceProfileVersionPropertiesBase {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArrayDeserializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

/** Specifies information about the gallery inVMAccessControlProfile version that you want to update. */
export interface GalleryInVMAccessControlProfileVersionUpdate extends UpdateResourceDefinition {
  /** The target regions where the Resource Profile version is going to be replicated to. This property is updatable. */
  targetLocations?: TargetRegion[];
  /** If set to true, Virtual Machines deployed from the latest version of the Resource Profile won't use this Profile version. */
  excludeFromLatest?: boolean;
  /** The timestamp for when the Resource Profile Version is published. */
  readonly publishedDate?: Date;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: GalleryProvisioningState;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatus;
  /** This property allows you to specify whether the access control rules are in Audit mode, in Enforce mode or Disabled. Possible values are: 'Audit', 'Enforce' or 'Disabled'. */
  mode?: AccessControlRulesMode;
  /** This property allows you to specify if the requests will be allowed to access the host endpoints. Possible values are: 'Allow', 'Deny'. */
  defaultAccess?: EndpointAccess;
  /** This is the Access Control Rules specification for an inVMAccessControlProfile version. */
  rules?: AccessControlRules;
}

export function galleryInVMAccessControlProfileVersionUpdateSerializer(
  item: GalleryInVMAccessControlProfileVersionUpdate,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "targetLocations",
      "excludeFromLatest",
      "mode",
      "defaultAccess",
      "rules",
    ])
      ? undefined
      : _galleryInVMAccessControlProfileVersionUpdatePropertiesSerializer(item),
  };
}

/** The List Gallery InVMAccessControlProfile Versions operation response. */
export interface _GalleryInVMAccessControlProfileVersionList {
  /** The GalleryInVMAccessControlProfileVersion items on this page */
  value: GalleryInVMAccessControlProfileVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryInVMAccessControlProfileVersionListDeserializer(
  item: any,
): _GalleryInVMAccessControlProfileVersionList {
  return {
    value: galleryInVMAccessControlProfileVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryInVMAccessControlProfileVersionArraySerializer(
  result: Array<GalleryInVMAccessControlProfileVersion>,
): any[] {
  return result.map((item) => {
    return galleryInVMAccessControlProfileVersionSerializer(item);
  });
}

export function galleryInVMAccessControlProfileVersionArrayDeserializer(
  result: Array<GalleryInVMAccessControlProfileVersion>,
): any[] {
  return result.map((item) => {
    return galleryInVMAccessControlProfileVersionDeserializer(item);
  });
}

/** Specifies information about the Shared Gallery that you want to create or update. */
export interface SharedGallery extends PirSharedGalleryResource {
  /** The artifact tags of a shared gallery resource. */
  readonly artifactTags?: Record<string, string>;
}

export function sharedGalleryDeserializer(item: any): SharedGallery {
  return {
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirSharedGalleryResourceIdentifierDeserializer(item["identifier"])),
    name: item["name"],
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _sharedGalleryPropertiesDeserializer(item["properties"])),
  };
}

/** Specifies the properties of a shared gallery */
export interface SharedGalleryProperties {
  /** The artifact tags of a shared gallery resource. */
  readonly artifactTags?: Record<string, string>;
}

export function sharedGalleryPropertiesDeserializer(item: any): SharedGalleryProperties {
  return {
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Base information about the shared gallery resource in pir. */
export interface PirSharedGalleryResource extends PirResource {
  /** The unique id of this shared gallery. */
  uniqueId?: string;
}

export function pirSharedGalleryResourceDeserializer(item: any): PirSharedGalleryResource {
  return {
    name: item["name"],
    location: item["location"],
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirSharedGalleryResourceIdentifierDeserializer(item["identifier"])),
  };
}

/** The identifier information of shared gallery. */
export interface SharedGalleryIdentifier {
  /** The unique id of this shared gallery. */
  uniqueId?: string;
}

export function sharedGalleryIdentifierDeserializer(item: any): SharedGalleryIdentifier {
  return {
    uniqueId: item["uniqueId"],
  };
}

/** The Resource model definition. */
export interface PirResource {
  /** Resource name */
  readonly name?: string;
  /** Resource location */
  readonly location?: string;
}

export function pirResourceDeserializer(item: any): PirResource {
  return {
    name: item["name"],
    location: item["location"],
  };
}

/** The List Shared Galleries operation response. */
export interface _SharedGalleryList {
  /** A list of shared galleries. */
  value: SharedGallery[];
  /** The uri to fetch the next page of shared galleries. Call ListNext() with this to fetch the next page of shared galleries. */
  nextLink?: string;
}

export function _sharedGalleryListDeserializer(item: any): _SharedGalleryList {
  return {
    value: sharedGalleryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedGalleryArrayDeserializer(result: Array<SharedGallery>): any[] {
  return result.map((item) => {
    return sharedGalleryDeserializer(item);
  });
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface SharedGalleryImage extends PirSharedGalleryResource {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery image definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Privacy statement uri for the current community gallery image. */
  privacyStatementUri?: string;
  /** End-user license agreement for the current community gallery image. */
  eula?: string;
  /** The artifact tags of a shared gallery resource. */
  artifactTags?: Record<string, string>;
}

export function sharedGalleryImageDeserializer(item: any): SharedGalleryImage {
  return {
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirSharedGalleryResourceIdentifierDeserializer(item["identifier"])),
    name: item["name"],
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _sharedGalleryImagePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image definition. */
export interface SharedGalleryImageProperties {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: OperatingSystemStateTypes;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Privacy statement uri for the current community gallery image. */
  privacyStatementUri?: string;
  /** End-user license agreement for the current community gallery image. */
  eula?: string;
  /** The artifact tags of a shared gallery resource. */
  artifactTags?: Record<string, string>;
}

export function sharedGalleryImagePropertiesDeserializer(item: any): SharedGalleryImageProperties {
  return {
    osType: item["osType"],
    osState: item["osState"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: galleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    hyperVGeneration: item["hyperVGeneration"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    architecture: item["architecture"],
    privacyStatementUri: item["privacyStatementUri"],
    eula: item["eula"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The List Shared Gallery Images operation response. */
export interface _SharedGalleryImageList {
  /** A list of shared gallery images. */
  value: SharedGalleryImage[];
  /** The uri to fetch the next page of shared gallery images. Call ListNext() with this to fetch the next page of shared gallery images. */
  nextLink?: string;
}

export function _sharedGalleryImageListDeserializer(item: any): _SharedGalleryImageList {
  return {
    value: sharedGalleryImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedGalleryImageArrayDeserializer(result: Array<SharedGalleryImage>): any[] {
  return result.map((item) => {
    return sharedGalleryImageDeserializer(item);
  });
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface SharedGalleryImageVersion extends PirSharedGalleryResource {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: Date;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfile;
  /** The artifact tags of a shared gallery resource. */
  artifactTags?: Record<string, string>;
}

export function sharedGalleryImageVersionDeserializer(item: any): SharedGalleryImageVersion {
  return {
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirSharedGalleryResourceIdentifierDeserializer(item["identifier"])),
    name: item["name"],
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _sharedGalleryImageVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image version. */
export interface SharedGalleryImageVersionProperties {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: Date;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfile;
  /** The artifact tags of a shared gallery resource. */
  artifactTags?: Record<string, string>;
}

export function sharedGalleryImageVersionPropertiesDeserializer(
  item: any,
): SharedGalleryImageVersionProperties {
  return {
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    excludeFromLatest: item["excludeFromLatest"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : sharedGalleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** This is the storage profile of a Gallery Image Version. */
export interface SharedGalleryImageVersionStorageProfile {
  /** This is the OS disk image. */
  osDiskImage?: SharedGalleryOSDiskImage;
  /** A list of data disk images. */
  dataDiskImages?: SharedGalleryDataDiskImage[];
}

export function sharedGalleryImageVersionStorageProfileDeserializer(
  item: any,
): SharedGalleryImageVersionStorageProfile {
  return {
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : sharedGalleryOSDiskImageDeserializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : sharedGalleryDataDiskImageArrayDeserializer(item["dataDiskImages"]),
  };
}

/** This is the OS disk image. */
export interface SharedGalleryOSDiskImage extends SharedGalleryDiskImage {}

export function sharedGalleryOSDiskImageDeserializer(item: any): SharedGalleryOSDiskImage {
  return {
    diskSizeGB: item["diskSizeGB"],
    hostCaching: item["hostCaching"],
  };
}

export function sharedGalleryDataDiskImageArrayDeserializer(
  result: Array<SharedGalleryDataDiskImage>,
): any[] {
  return result.map((item) => {
    return sharedGalleryDataDiskImageDeserializer(item);
  });
}

/** This is the data disk image. */
export interface SharedGalleryDataDiskImage extends SharedGalleryDiskImage {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

export function sharedGalleryDataDiskImageDeserializer(item: any): SharedGalleryDataDiskImage {
  return {
    diskSizeGB: item["diskSizeGB"],
    hostCaching: item["hostCaching"],
    lun: item["lun"],
  };
}

/** This is the disk image base class. */
export interface SharedGalleryDiskImage {
  /** This property indicates the size of the VHD to be created. */
  readonly diskSizeGB?: number;
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: SharedGalleryHostCaching;
}

export function sharedGalleryDiskImageDeserializer(item: any): SharedGalleryDiskImage {
  return {
    diskSizeGB: item["diskSizeGB"],
    hostCaching: item["hostCaching"],
  };
}

/** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
export enum KnownSharedGalleryHostCaching {
  /** None */
  None = "None",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' \
 * {@link KnownSharedGalleryHostCaching} can be used interchangeably with SharedGalleryHostCaching,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ReadOnly** \
 * **ReadWrite**
 */
export type SharedGalleryHostCaching = string;

/** The List Shared Gallery Image versions operation response. */
export interface _SharedGalleryImageVersionList {
  /** The SharedGalleryImageVersion items on this page */
  value: SharedGalleryImageVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedGalleryImageVersionListDeserializer(
  item: any,
): _SharedGalleryImageVersionList {
  return {
    value: sharedGalleryImageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedGalleryImageVersionArrayDeserializer(
  result: Array<SharedGalleryImageVersion>,
): any[] {
  return result.map((item) => {
    return sharedGalleryImageVersionDeserializer(item);
  });
}

/** Specifies information about the Community Gallery that you want to create or update. */
export interface CommunityGallery extends PirCommunityGalleryResource {
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
  /** The metadata of community gallery. */
  communityMetadata?: CommunityGalleryMetadata;
}

export function communityGalleryDeserializer(item: any): CommunityGallery {
  return {
    name: item["name"],
    location: item["location"],
    type: item["type"],
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirCommunityGalleryResourceIdentifierDeserializer(item["identifier"])),
    ...(!item["properties"]
      ? item["properties"]
      : _communityGalleryPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a community gallery. */
export interface CommunityGalleryProperties {
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
  /** The metadata of community gallery. */
  communityMetadata?: CommunityGalleryMetadata;
}

export function communityGalleryPropertiesDeserializer(item: any): CommunityGalleryProperties {
  return {
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    communityMetadata: !item["communityMetadata"]
      ? item["communityMetadata"]
      : communityGalleryMetadataDeserializer(item["communityMetadata"]),
  };
}

/** The metadata of community gallery. */
export interface CommunityGalleryMetadata {
  /** The publisher URI of this community gallery. */
  publisherUri?: string;
  /** The publisher email id of this community gallery. */
  publisherContact: string;
  /** The end-user license agreement for this community gallery. */
  eula?: string;
  /** A list of public names the gallery has. */
  publicNames: string[];
  /** The link for the privacy statement of this community gallery from the gallery publisher. */
  privacyStatementUri?: string;
}

export function communityGalleryMetadataDeserializer(item: any): CommunityGalleryMetadata {
  return {
    publisherUri: item["publisherUri"],
    publisherContact: item["publisherContact"],
    eula: item["eula"],
    publicNames: item["publicNames"].map((p: any) => {
      return p;
    }),
    privacyStatementUri: item["privacyStatementUri"],
  };
}

/** Base information about the community gallery resource in azure compute gallery. */
export interface PirCommunityGalleryResource {
  /** Resource name */
  readonly name?: string;
  /** Resource location */
  readonly location?: string;
  /** Resource type */
  readonly type?: string;
  /** The unique id of this community gallery. */
  uniqueId?: string;
}

export function pirCommunityGalleryResourceDeserializer(item: any): PirCommunityGalleryResource {
  return {
    name: item["name"],
    location: item["location"],
    type: item["type"],
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirCommunityGalleryResourceIdentifierDeserializer(item["identifier"])),
  };
}

/** The identifier information of community gallery. */
export interface CommunityGalleryIdentifier {
  /** The unique id of this community gallery. */
  uniqueId?: string;
}

export function communityGalleryIdentifierDeserializer(item: any): CommunityGalleryIdentifier {
  return {
    uniqueId: item["uniqueId"],
  };
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface CommunityGalleryImage extends PirCommunityGalleryResource {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the community gallery image definition identifier. */
  identifier?: CommunityGalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Privacy statement URI for the current community gallery image. */
  privacyStatementUri?: string;
  /** The end-user license agreement for the current community gallery image. */
  eula?: string;
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
}

export function communityGalleryImageDeserializer(item: any): CommunityGalleryImage {
  return {
    name: item["name"],
    location: item["location"],
    type: item["type"],
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirCommunityGalleryResourceIdentifierDeserializer(item["identifier"])),
    ...(!item["properties"]
      ? item["properties"]
      : _communityGalleryImagePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image definition. */
export interface CommunityGalleryImageProperties {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. Possible values are: **Windows,** **Linux.** */
  osType: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: OperatingSystemStateTypes;
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the community gallery image definition identifier. */
  identifier: CommunityGalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** A list of gallery image features. */
  features?: GalleryImageFeature[];
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: Architecture;
  /** Privacy statement URI for the current community gallery image. */
  privacyStatementUri?: string;
  /** The end-user license agreement for the current community gallery image. */
  eula?: string;
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
}

export function communityGalleryImagePropertiesDeserializer(
  item: any,
): CommunityGalleryImageProperties {
  return {
    osType: item["osType"],
    osState: item["osState"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: communityGalleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    hyperVGeneration: item["hyperVGeneration"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    architecture: item["architecture"],
    privacyStatementUri: item["privacyStatementUri"],
    eula: item["eula"],
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** This is the community gallery image definition identifier. */
export interface CommunityGalleryImageIdentifier {
  /** The name of the gallery image definition publisher. */
  publisher?: string;
  /** The name of the gallery image definition offer. */
  offer?: string;
  /** The name of the gallery image definition SKU. */
  sku?: string;
}

export function communityGalleryImageIdentifierDeserializer(
  item: any,
): CommunityGalleryImageIdentifier {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
  };
}

/** The List Community Gallery Images operation response. */
export interface _CommunityGalleryImageList {
  /** A list of community gallery images. */
  value: CommunityGalleryImage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _communityGalleryImageListDeserializer(item: any): _CommunityGalleryImageList {
  return {
    value: communityGalleryImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communityGalleryImageArrayDeserializer(
  result: Array<CommunityGalleryImage>,
): any[] {
  return result.map((item) => {
    return communityGalleryImageDeserializer(item);
  });
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface CommunityGalleryImageVersion extends PirCommunityGalleryResource {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: Date;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfile;
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
}

export function communityGalleryImageVersionDeserializer(item: any): CommunityGalleryImageVersion {
  return {
    name: item["name"],
    location: item["location"],
    type: item["type"],
    ...(!item["identifier"]
      ? item["identifier"]
      : _pirCommunityGalleryResourceIdentifierDeserializer(item["identifier"])),
    ...(!item["properties"]
      ? item["properties"]
      : _communityGalleryImageVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image version. */
export interface CommunityGalleryImageVersionProperties {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: Date;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfile;
  /** The disclaimer for a community gallery resource. */
  disclaimer?: string;
  /** The artifact tags of a community gallery resource. */
  artifactTags?: Record<string, string>;
}

export function communityGalleryImageVersionPropertiesDeserializer(
  item: any,
): CommunityGalleryImageVersionProperties {
  return {
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    excludeFromLatest: item["excludeFromLatest"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : sharedGalleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The List Community Gallery Image versions operation response. */
export interface _CommunityGalleryImageVersionList {
  /** A list of community gallery image versions. */
  value: CommunityGalleryImageVersion[];
  /** The URI to fetch the next page of community gallery image versions. Call ListNext() with this to fetch the next page of community gallery image versions. */
  nextLink?: string;
}

export function _communityGalleryImageVersionListDeserializer(
  item: any,
): _CommunityGalleryImageVersionList {
  return {
    value: communityGalleryImageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communityGalleryImageVersionArrayDeserializer(
  result: Array<CommunityGalleryImageVersion>,
): any[] {
  return result.map((item) => {
    return communityGalleryImageVersionDeserializer(item);
  });
}

/** The List Soft-deleted Resources operation response. */
export interface _GallerySoftDeletedResourceList {
  /** The GallerySoftDeletedResource items on this page */
  value: GallerySoftDeletedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gallerySoftDeletedResourceListDeserializer(
  item: any,
): _GallerySoftDeletedResourceList {
  return {
    value: gallerySoftDeletedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gallerySoftDeletedResourceArrayDeserializer(
  result: Array<GallerySoftDeletedResource>,
): any[] {
  return result.map((item) => {
    return gallerySoftDeletedResourceDeserializer(item);
  });
}

/** The details information of soft-deleted resource. */
export interface GallerySoftDeletedResource extends TrackedResource {
  /** arm id of the soft-deleted resource */
  resourceArmId?: string;
  /** artifact type of the soft-deleted resource */
  softDeletedArtifactType?: SoftDeletedArtifactTypes;
  /** The timestamp for when the resource is soft-deleted. In dateTime offset format. */
  softDeletedTime?: string;
}

export function gallerySoftDeletedResourceDeserializer(item: any): GallerySoftDeletedResource {
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
      : _gallerySoftDeletedResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a soft-deleted resource. */
export interface GallerySoftDeletedResourceProperties {
  /** arm id of the soft-deleted resource */
  resourceArmId?: string;
  /** artifact type of the soft-deleted resource */
  softDeletedArtifactType?: SoftDeletedArtifactTypes;
  /** The timestamp for when the resource is soft-deleted. In dateTime offset format. */
  softDeletedTime?: string;
}

export function gallerySoftDeletedResourcePropertiesDeserializer(
  item: any,
): GallerySoftDeletedResourceProperties {
  return {
    resourceArmId: item["resourceArmId"],
    softDeletedArtifactType: item["softDeletedArtifactType"],
    softDeletedTime: item["softDeletedTime"],
  };
}

/** artifact type of the soft-deleted resource */
export enum KnownSoftDeletedArtifactTypes {
  /** Images */
  Images = "Images",
}

/**
 * artifact type of the soft-deleted resource \
 * {@link KnownSoftDeletedArtifactTypes} can be used interchangeably with SoftDeletedArtifactTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Images**
 */
export type SoftDeletedArtifactTypes = string;

/** Specifies information about the gallery sharing profile update. */
export interface SharingUpdate {
  /** This property allows you to specify the operation type of gallery sharing update. Possible values are: **Add,** **Remove,** **Reset.** */
  operationType: SharingUpdateOperationTypes;
  /** A list of sharing profile groups. */
  groups?: SharingProfileGroup[];
}

export function sharingUpdateSerializer(item: SharingUpdate): any {
  return {
    operationType: item["operationType"],
    groups: !item["groups"] ? item["groups"] : sharingProfileGroupArraySerializer(item["groups"]),
  };
}

export function sharingUpdateDeserializer(item: any): SharingUpdate {
  return {
    operationType: item["operationType"],
    groups: !item["groups"] ? item["groups"] : sharingProfileGroupArrayDeserializer(item["groups"]),
  };
}

/** This property allows you to specify the operation type of gallery sharing update. Possible values are: **Add,** **Remove,** **Reset.** */
export enum KnownSharingUpdateOperationTypes {
  /** Add */
  Add = "Add",
  /** Remove */
  Remove = "Remove",
  /** Reset */
  Reset = "Reset",
  /** EnableCommunity */
  EnableCommunity = "EnableCommunity",
}

/**
 * This property allows you to specify the operation type of gallery sharing update. Possible values are: **Add,** **Remove,** **Reset.** \
 * {@link KnownSharingUpdateOperationTypes} can be used interchangeably with SharingUpdateOperationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Add** \
 * **Remove** \
 * **Reset** \
 * **EnableCommunity**
 */
export type SharingUpdateOperationTypes = string;

/** Known values of {@link SelectPermissions} that the service accepts. */
export enum KnownSelectPermissions {
  /** Permissions */
  Permissions = "Permissions",
}

/** Type of SelectPermissions */
export type SelectPermissions = string;

/** Known values of {@link GalleryExpandParams} that the service accepts. */
export enum KnownGalleryExpandParams {
  /** SharingProfile/Groups */
  SharingProfileGroups = "SharingProfile/Groups",
}

/** Type of GalleryExpandParams */
export type GalleryExpandParams = string;

/** Known values of {@link ReplicationStatusTypes} that the service accepts. */
export enum KnownReplicationStatusTypes {
  /** ReplicationStatus */
  ReplicationStatus = "ReplicationStatus",
  /** UefiSettings */
  UefiSettings = "UefiSettings",
}

/** Type of ReplicationStatusTypes */
export type ReplicationStatusTypes = string;

/** Known values of {@link SharedToValues} that the service accepts. */
export enum KnownSharedToValues {
  /** tenant */
  Tenant = "tenant",
}

/** Type of SharedToValues */
export type SharedToValues = string;

export function _galleryPropertiesSerializer(item: Gallery): any {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierSerializer(item["identifier"]),
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileSerializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicySerializer(item["softDeletePolicy"]),
  };
}

export function _galleryPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierDeserializer(item["identifier"]),
    provisioningState: item["provisioningState"],
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileDeserializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicyDeserializer(item["softDeletePolicy"]),
    sharingStatus: !item["sharingStatus"]
      ? item["sharingStatus"]
      : sharingStatusDeserializer(item["sharingStatus"]),
  };
}

export function _galleryUpdatePropertiesSerializer(item: GalleryUpdate): any {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierSerializer(item["identifier"]),
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileSerializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicySerializer(item["softDeletePolicy"]),
  };
}

export function _galleryUpdatePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryIdentifierDeserializer(item["identifier"]),
    provisioningState: item["provisioningState"],
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : sharingProfileDeserializer(item["sharingProfile"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicyDeserializer(item["softDeletePolicy"]),
    sharingStatus: !item["sharingStatus"]
      ? item["sharingStatus"]
      : sharingStatusDeserializer(item["sharingStatus"]),
  };
}

export function _galleryImagePropertiesSerializer(item: GalleryImage): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierSerializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationSerializer(item["recommended"]),
    disallowed: !item["disallowed"] ? item["disallowed"] : disallowedSerializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanSerializer(item["purchasePlan"]),
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArraySerializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

export function _galleryImagePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    provisioningState: item["provisioningState"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

export function _galleryImageUpdatePropertiesSerializer(item: GalleryImageUpdate): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierSerializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationSerializer(item["recommended"]),
    disallowed: !item["disallowed"] ? item["disallowed"] : disallowedSerializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanSerializer(item["purchasePlan"]),
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArraySerializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

export function _galleryImageUpdatePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    osType: item["osType"],
    osState: item["osState"],
    hyperVGeneration: item["hyperVGeneration"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    provisioningState: item["provisioningState"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    architecture: item["architecture"],
    allowUpdateImage: item["allowUpdateImage"],
  };
}

export function _galleryImageVersionPropertiesSerializer(item: GalleryImageVersion): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileSerializer(item["publishingProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileSerializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileSerializer(item["safetyProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileSerializer(item["securityProfile"]),
    restore: item["restore"],
  };
}

export function _galleryImageVersionPropertiesDeserializer(item: any) {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileDeserializer(item["publishingProfile"]),
    provisioningState: item["provisioningState"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileDeserializer(item["safetyProfile"]),
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileDeserializer(item["securityProfile"]),
    restore: item["restore"],
    validationsProfile: !item["validationsProfile"]
      ? item["validationsProfile"]
      : validationsProfileDeserializer(item["validationsProfile"]),
  };
}

export function _galleryImageVersionUpdatePropertiesSerializer(
  item: GalleryImageVersionUpdate,
): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileSerializer(item["publishingProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileSerializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileSerializer(item["safetyProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileSerializer(item["securityProfile"]),
    restore: item["restore"],
  };
}

export function _galleryImageVersionUpdatePropertiesDeserializer(item: any) {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryImageVersionPublishingProfileDeserializer(item["publishingProfile"]),
    provisioningState: item["provisioningState"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryImageVersionSafetyProfileDeserializer(item["safetyProfile"]),
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : imageVersionSecurityProfileDeserializer(item["securityProfile"]),
    restore: item["restore"],
    validationsProfile: !item["validationsProfile"]
      ? item["validationsProfile"]
      : validationsProfileDeserializer(item["validationsProfile"]),
  };
}

export function _galleryApplicationPropertiesSerializer(item: GalleryApplication): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArraySerializer(item["customActions"]),
  };
}

export function _galleryApplicationPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArrayDeserializer(item["customActions"]),
  };
}

export function _galleryApplicationUpdatePropertiesSerializer(item: GalleryApplicationUpdate): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArraySerializer(item["customActions"]),
  };
}

export function _galleryApplicationUpdatePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    supportedOSType: item["supportedOSType"],
    customActions: !item["customActions"]
      ? item["customActions"]
      : galleryApplicationCustomActionArrayDeserializer(item["customActions"]),
  };
}

export function _galleryApplicationVersionPropertiesSerializer(
  item: GalleryApplicationVersion,
): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryApplicationVersionPublishingProfileSerializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileSerializer(item["safetyProfile"]),
  };
}

export function _galleryApplicationVersionPropertiesDeserializer(item: any) {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryApplicationVersionPublishingProfileDeserializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileDeserializer(item["safetyProfile"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

export function _galleryApplicationVersionUpdatePropertiesSerializer(
  item: GalleryApplicationVersionUpdate,
): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryApplicationVersionPublishingProfileSerializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileSerializer(item["safetyProfile"]),
  };
}

export function _galleryApplicationVersionUpdatePropertiesDeserializer(item: any) {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryApplicationVersionPublishingProfileDeserializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryApplicationVersionSafetyProfileDeserializer(item["safetyProfile"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

export function _galleryScriptUpdatePropertiesSerializer(item: GalleryScriptUpdate): any {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"]
      ? item["endOfLifeDate"]
      : item["endOfLifeDate"].toISOString(),
    supportedOSType: item["supportedOSType"],
  };
}

export function _galleryScriptUpdatePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    eula: item["eula"],
    privacyStatementUri: item["privacyStatementUri"],
    releaseNoteUri: item["releaseNoteUri"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    supportedOSType: item["supportedOSType"],
    provisioningState: item["provisioningState"],
  };
}

export function _galleryScriptVersionUpdatePropertiesSerializer(
  item: GalleryScriptVersionUpdate,
): any {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryScriptVersionPublishingProfileSerializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryScriptVersionSafetyProfileSerializer(item["safetyProfile"]),
  };
}

export function _galleryScriptVersionUpdatePropertiesDeserializer(item: any) {
  return {
    publishingProfile: !item["publishingProfile"]
      ? item["publishingProfile"]
      : galleryScriptVersionPublishingProfileDeserializer(item["publishingProfile"]),
    safetyProfile: !item["safetyProfile"]
      ? item["safetyProfile"]
      : galleryScriptVersionSafetyProfileDeserializer(item["safetyProfile"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
  };
}

export function _galleryInVMAccessControlProfileVersionPropertiesSerializer(
  item: GalleryInVMAccessControlProfileVersion,
): any {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArraySerializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesSerializer(item["rules"]),
  };
}

export function _galleryInVMAccessControlProfileVersionPropertiesDeserializer(item: any) {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArrayDeserializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesDeserializer(item["rules"]),
  };
}

export function _galleryInVMAccessControlProfileVersionUpdatePropertiesSerializer(
  item: GalleryInVMAccessControlProfileVersionUpdate,
): any {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArraySerializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesSerializer(item["rules"]),
  };
}

export function _galleryInVMAccessControlProfileVersionUpdatePropertiesDeserializer(item: any) {
  return {
    targetLocations: !item["targetLocations"]
      ? item["targetLocations"]
      : targetRegionArrayDeserializer(item["targetLocations"]),
    excludeFromLatest: item["excludeFromLatest"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    provisioningState: item["provisioningState"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : replicationStatusDeserializer(item["replicationStatus"]),
    mode: item["mode"],
    defaultAccess: item["defaultAccess"],
    rules: !item["rules"] ? item["rules"] : accessControlRulesDeserializer(item["rules"]),
  };
}

export function _sharedGalleryPropertiesDeserializer(item: any) {
  return {
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _pirSharedGalleryResourceIdentifierDeserializer(item: any) {
  return {
    uniqueId: item["uniqueId"],
  };
}

export function _sharedGalleryImagePropertiesDeserializer(item: any) {
  return {
    osType: item["osType"],
    osState: item["osState"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    hyperVGeneration: item["hyperVGeneration"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    architecture: item["architecture"],
    privacyStatementUri: item["privacyStatementUri"],
    eula: item["eula"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _sharedGalleryImageVersionPropertiesDeserializer(item: any) {
  return {
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    excludeFromLatest: item["excludeFromLatest"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : sharedGalleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _communityGalleryPropertiesDeserializer(item: any) {
  return {
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    communityMetadata: !item["communityMetadata"]
      ? item["communityMetadata"]
      : communityGalleryMetadataDeserializer(item["communityMetadata"]),
  };
}

export function _pirCommunityGalleryResourceIdentifierDeserializer(item: any) {
  return {
    uniqueId: item["uniqueId"],
  };
}

export function _communityGalleryImagePropertiesDeserializer(item: any) {
  return {
    osType: item["osType"],
    osState: item["osState"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    identifier: !item["identifier"]
      ? item["identifier"]
      : communityGalleryImageIdentifierDeserializer(item["identifier"]),
    recommended: !item["recommended"]
      ? item["recommended"]
      : recommendedMachineConfigurationDeserializer(item["recommended"]),
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedDeserializer(item["disallowed"]),
    hyperVGeneration: item["hyperVGeneration"],
    features: !item["features"]
      ? item["features"]
      : galleryImageFeatureArrayDeserializer(item["features"]),
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : imagePurchasePlanDeserializer(item["purchasePlan"]),
    architecture: item["architecture"],
    privacyStatementUri: item["privacyStatementUri"],
    eula: item["eula"],
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _communityGalleryImageVersionPropertiesDeserializer(item: any) {
  return {
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    excludeFromLatest: item["excludeFromLatest"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : sharedGalleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
    disclaimer: item["disclaimer"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _gallerySoftDeletedResourcePropertiesDeserializer(item: any) {
  return {
    resourceArmId: item["resourceArmId"],
    softDeletedArtifactType: item["softDeletedArtifactType"],
    softDeletedTime: item["softDeletedTime"],
  };
}
