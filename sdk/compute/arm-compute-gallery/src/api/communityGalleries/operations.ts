// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type { CommunityGallery } from "../../models/models.js";
import { cloudErrorDeserializer, communityGalleryDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CommunityGalleriesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  publicGalleryName: string,
  options: CommunityGalleriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publicGalleryName: publicGalleryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CommunityGallery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return communityGalleryDeserializer(result.body);
}

/** Get a community gallery by gallery public name. */
export async function get(
  context: Client,
  location: string,
  publicGalleryName: string,
  options: CommunityGalleriesGetOptionalParams = { requestOptions: {} },
): Promise<CommunityGallery> {
  const result = await _getSend(context, location, publicGalleryName, options);
  return _getDeserialize(result);
}
