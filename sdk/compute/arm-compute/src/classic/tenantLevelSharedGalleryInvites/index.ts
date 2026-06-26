// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  tenantLevelGallerySharingReject,
  tenantLevelGallerySharingAccept,
} from "../../api/tenantLevelSharedGalleryInvites/operations.js";
import {
  TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
  TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
} from "../../api/tenantLevelSharedGalleryInvites/options.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TenantLevelSharedGalleryInvites operations. */
export interface TenantLevelSharedGalleryInvitesOperations {
  /** Reject sharing of a tenant-level shared gallery. */
  tenantLevelGallerySharingReject: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use tenantLevelGallerySharingReject instead */
  beginTenantLevelGallerySharingReject: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use tenantLevelGallerySharingReject instead */
  beginTenantLevelGallerySharingRejectAndWait: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
  ) => Promise<void>;
  /** Accept sharing of a tenant-level shared gallery. */
  tenantLevelGallerySharingAccept: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use tenantLevelGallerySharingAccept instead */
  beginTenantLevelGallerySharingAccept: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use tenantLevelGallerySharingAccept instead */
  beginTenantLevelGallerySharingAcceptAndWait: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
  ) => Promise<void>;
}

function _getTenantLevelSharedGalleryInvites(context: ComputeManagementContext) {
  return {
    tenantLevelGallerySharingReject: (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
    ) =>
      tenantLevelGallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      ),
    beginTenantLevelGallerySharingReject: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
    ) => {
      const poller = tenantLevelGallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTenantLevelGallerySharingRejectAndWait: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
    ) => {
      return await tenantLevelGallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
    },
    tenantLevelGallerySharingAccept: (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
    ) =>
      tenantLevelGallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      ),
    beginTenantLevelGallerySharingAccept: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
    ) => {
      const poller = tenantLevelGallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTenantLevelGallerySharingAcceptAndWait: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
    ) => {
      return await tenantLevelGallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
    },
  };
}

export function _getTenantLevelSharedGalleryInvitesOperations(
  context: ComputeManagementContext,
): TenantLevelSharedGalleryInvitesOperations {
  return {
    ..._getTenantLevelSharedGalleryInvites(context),
  };
}
