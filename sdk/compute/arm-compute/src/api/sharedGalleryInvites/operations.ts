// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SharedGalleryInvitesGallerySharingRejectOptionalParams,
  SharedGalleryInvitesGallerySharingAcceptOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _gallerySharingRejectSend(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: SharedGalleryInvitesGallerySharingRejectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGallerySubscriptions/{sharedGallerySubscriptionId}/sharedGalleries/{sharedGalleryName}/reject{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      sharedGallerySubscriptionId: sharedGallerySubscriptionId,
      sharedGalleryName: sharedGalleryName,
      "api%2Dversion": "2025-12-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _gallerySharingRejectDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Reject sharing of a subscription-level shared gallery. */
export function gallerySharingReject(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: SharedGalleryInvitesGallerySharingRejectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _gallerySharingRejectDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _gallerySharingRejectSend(
          context,
          location,
          sharedGallerySubscriptionId,
          sharedGalleryName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-12-03",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _gallerySharingAcceptSend(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: SharedGalleryInvitesGallerySharingAcceptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGallerySubscriptions/{sharedGallerySubscriptionId}/sharedGalleries/{sharedGalleryName}/accept{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      sharedGallerySubscriptionId: sharedGallerySubscriptionId,
      sharedGalleryName: sharedGalleryName,
      "api%2Dversion": "2025-12-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _gallerySharingAcceptDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Accept sharing of a subscription-level shared gallery. */
export function gallerySharingAccept(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: SharedGalleryInvitesGallerySharingAcceptOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _gallerySharingAcceptDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _gallerySharingAcceptSend(
          context,
          location,
          sharedGallerySubscriptionId,
          sharedGalleryName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-12-03",
    },
  ) as PollerLike<OperationState<void>, void>;
}
