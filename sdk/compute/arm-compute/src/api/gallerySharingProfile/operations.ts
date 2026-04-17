// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { SharingUpdate } from "../../models/computeGallery/models.js";
import {
  sharingUpdateSerializer,
  sharingUpdateDeserializer,
} from "../../models/computeGallery/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GallerySharingProfileUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  sharingUpdate: SharingUpdate,
  options: GallerySharingProfileUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      "api%2Dversion": "2025-03-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sharingUpdateSerializer(sharingUpdate),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SharingUpdate> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sharingUpdateDeserializer(result.body);
}

/** Update sharing profile of a gallery. */
export function update(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  sharingUpdate: SharingUpdate,
  options: GallerySharingProfileUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SharingUpdate>, SharingUpdate> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, galleryName, sharingUpdate, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-03-03",
  }) as PollerLike<OperationState<SharingUpdate>, SharingUpdate>;
}
