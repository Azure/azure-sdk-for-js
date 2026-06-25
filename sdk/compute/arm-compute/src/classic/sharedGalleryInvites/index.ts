// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  gallerySharingReject,
  gallerySharingAccept,
} from "../../api/sharedGalleryInvites/operations.js";
import {
  SharedGalleryInvitesGallerySharingRejectOptionalParams,
  SharedGalleryInvitesGallerySharingAcceptOptionalParams,
} from "../../api/sharedGalleryInvites/options.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SharedGalleryInvites operations. */
export interface SharedGalleryInvitesOperations {
  /** Reject sharing of a subscription-level shared gallery. */
  gallerySharingReject: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use gallerySharingReject instead */
  beginGallerySharingReject: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use gallerySharingReject instead */
  beginGallerySharingRejectAndWait: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
  ) => Promise<void>;
  /** Accept sharing of a subscription-level shared gallery. */
  gallerySharingAccept: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use gallerySharingAccept instead */
  beginGallerySharingAccept: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use gallerySharingAccept instead */
  beginGallerySharingAcceptAndWait: (
    location: string,
    sharedGallerySubscriptionId: string,
    sharedGalleryName: string,
    options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
  ) => Promise<void>;
}

function _getSharedGalleryInvites(context: ComputeManagementContext) {
  return {
    gallerySharingReject: (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
    ) =>
      gallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      ),
    beginGallerySharingReject: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
    ) => {
      const poller = gallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGallerySharingRejectAndWait: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingRejectOptionalParams,
    ) => {
      return await gallerySharingReject(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
    },
    gallerySharingAccept: (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
    ) =>
      gallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      ),
    beginGallerySharingAccept: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
    ) => {
      const poller = gallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGallerySharingAcceptAndWait: async (
      location: string,
      sharedGallerySubscriptionId: string,
      sharedGalleryName: string,
      options?: SharedGalleryInvitesGallerySharingAcceptOptionalParams,
    ) => {
      return await gallerySharingAccept(
        context,
        location,
        sharedGallerySubscriptionId,
        sharedGalleryName,
        options,
      );
    },
  };
}

export function _getSharedGalleryInvitesOperations(
  context: ComputeManagementContext,
): SharedGalleryInvitesOperations {
  return {
    ..._getSharedGalleryInvites(context),
  };
}
