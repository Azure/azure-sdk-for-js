// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams,
  TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _tenantLevelGallerySharingRejectSend(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Compute/locations/{location}/tenantLevelSharedGallerySubscriptions/{sharedGallerySubscriptionId}/sharedGalleries/{sharedGalleryName}/reject{?api%2Dversion}",
    {
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

export async function _tenantLevelGallerySharingRejectDeserialize(
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

/** Reject sharing of a tenant-level shared gallery. */
export function tenantLevelGallerySharingReject(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingRejectOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _tenantLevelGallerySharingRejectDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _tenantLevelGallerySharingRejectSend(
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

export function _tenantLevelGallerySharingAcceptSend(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Compute/locations/{location}/tenantLevelSharedGallerySubscriptions/{sharedGallerySubscriptionId}/sharedGalleries/{sharedGalleryName}/accept{?api%2Dversion}",
    {
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

export async function _tenantLevelGallerySharingAcceptDeserialize(
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

/** Accept sharing of a tenant-level shared gallery. */
export function tenantLevelGallerySharingAccept(
  context: Client,
  location: string,
  sharedGallerySubscriptionId: string,
  sharedGalleryName: string,
  options: TenantLevelSharedGalleryInvitesTenantLevelGallerySharingAcceptOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _tenantLevelGallerySharingAcceptDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _tenantLevelGallerySharingAcceptSend(
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
