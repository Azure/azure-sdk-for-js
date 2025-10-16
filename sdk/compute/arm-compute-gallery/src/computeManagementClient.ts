// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeManagementContext,
  ComputeManagementClientOptionalParams,
} from "./api/index.js";
import { createComputeManagement } from "./api/index.js";
import type { CommunityGalleriesOperations } from "./classic/communityGalleries/index.js";
import { _getCommunityGalleriesOperations } from "./classic/communityGalleries/index.js";
import type { CommunityGalleryImageVersionsOperations } from "./classic/communityGalleryImageVersions/index.js";
import { _getCommunityGalleryImageVersionsOperations } from "./classic/communityGalleryImageVersions/index.js";
import type { CommunityGalleryImagesOperations } from "./classic/communityGalleryImages/index.js";
import { _getCommunityGalleryImagesOperations } from "./classic/communityGalleryImages/index.js";
import type { GalleriesOperations } from "./classic/galleries/index.js";
import { _getGalleriesOperations } from "./classic/galleries/index.js";
import type { GalleryApplicationVersionsOperations } from "./classic/galleryApplicationVersions/index.js";
import { _getGalleryApplicationVersionsOperations } from "./classic/galleryApplicationVersions/index.js";
import type { GalleryApplicationsOperations } from "./classic/galleryApplications/index.js";
import { _getGalleryApplicationsOperations } from "./classic/galleryApplications/index.js";
import type { GalleryImageVersionsOperations } from "./classic/galleryImageVersions/index.js";
import { _getGalleryImageVersionsOperations } from "./classic/galleryImageVersions/index.js";
import type { GalleryImagesOperations } from "./classic/galleryImages/index.js";
import { _getGalleryImagesOperations } from "./classic/galleryImages/index.js";
import type { GalleryInVMAccessControlProfileVersionsOperations } from "./classic/galleryInVMAccessControlProfileVersions/index.js";
import { _getGalleryInVMAccessControlProfileVersionsOperations } from "./classic/galleryInVMAccessControlProfileVersions/index.js";
import type { GalleryInVMAccessControlProfilesOperations } from "./classic/galleryInVMAccessControlProfiles/index.js";
import { _getGalleryInVMAccessControlProfilesOperations } from "./classic/galleryInVMAccessControlProfiles/index.js";
import type { SharedGalleriesOperations } from "./classic/sharedGalleries/index.js";
import { _getSharedGalleriesOperations } from "./classic/sharedGalleries/index.js";
import type { SharedGalleryImageVersionsOperations } from "./classic/sharedGalleryImageVersions/index.js";
import { _getSharedGalleryImageVersionsOperations } from "./classic/sharedGalleryImageVersions/index.js";
import type { SharedGalleryImagesOperations } from "./classic/sharedGalleryImages/index.js";
import { _getSharedGalleryImagesOperations } from "./classic/sharedGalleryImages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeManagementClientOptionalParams } from "./api/computeManagementContext.js";

export class ComputeManagementClient {
  private _client: ComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.communityGalleryImageVersions = _getCommunityGalleryImageVersionsOperations(this._client);
    this.communityGalleryImages = _getCommunityGalleryImagesOperations(this._client);
    this.communityGalleries = _getCommunityGalleriesOperations(this._client);
    this.sharedGalleryImageVersions = _getSharedGalleryImageVersionsOperations(this._client);
    this.sharedGalleryImages = _getSharedGalleryImagesOperations(this._client);
    this.sharedGalleries = _getSharedGalleriesOperations(this._client);
    this.galleryInVMAccessControlProfileVersions =
      _getGalleryInVMAccessControlProfileVersionsOperations(this._client);
    this.galleryInVMAccessControlProfiles = _getGalleryInVMAccessControlProfilesOperations(
      this._client,
    );
    this.galleryApplicationVersions = _getGalleryApplicationVersionsOperations(this._client);
    this.galleryApplications = _getGalleryApplicationsOperations(this._client);
    this.galleryImageVersions = _getGalleryImageVersionsOperations(this._client);
    this.galleryImages = _getGalleryImagesOperations(this._client);
    this.galleries = _getGalleriesOperations(this._client);
  }

  /** The operation groups for communityGalleryImageVersions */
  public readonly communityGalleryImageVersions: CommunityGalleryImageVersionsOperations;
  /** The operation groups for communityGalleryImages */
  public readonly communityGalleryImages: CommunityGalleryImagesOperations;
  /** The operation groups for communityGalleries */
  public readonly communityGalleries: CommunityGalleriesOperations;
  /** The operation groups for sharedGalleryImageVersions */
  public readonly sharedGalleryImageVersions: SharedGalleryImageVersionsOperations;
  /** The operation groups for sharedGalleryImages */
  public readonly sharedGalleryImages: SharedGalleryImagesOperations;
  /** The operation groups for sharedGalleries */
  public readonly sharedGalleries: SharedGalleriesOperations;
  /** The operation groups for galleryInVMAccessControlProfileVersions */
  public readonly galleryInVMAccessControlProfileVersions: GalleryInVMAccessControlProfileVersionsOperations;
  /** The operation groups for galleryInVMAccessControlProfiles */
  public readonly galleryInVMAccessControlProfiles: GalleryInVMAccessControlProfilesOperations;
  /** The operation groups for galleryApplicationVersions */
  public readonly galleryApplicationVersions: GalleryApplicationVersionsOperations;
  /** The operation groups for galleryApplications */
  public readonly galleryApplications: GalleryApplicationsOperations;
  /** The operation groups for galleryImageVersions */
  public readonly galleryImageVersions: GalleryImageVersionsOperations;
  /** The operation groups for galleryImages */
  public readonly galleryImages: GalleryImagesOperations;
  /** The operation groups for galleries */
  public readonly galleries: GalleriesOperations;
}
