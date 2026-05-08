// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  _GallerySoftDeletedResourceList,
  GallerySoftDeletedResource,
} from "../../models/computeGallery/models.js";
import { _gallerySoftDeletedResourceListDeserializer } from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SoftDeletedResourceListByArtifactNameOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByArtifactNameSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  artifactType: string,
  artifactName: string,
  options: SoftDeletedResourceListByArtifactNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/softdeletedartifacttypes/{artifactType}/artifacts/{artifactName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      artifactType: artifactType,
      artifactName: artifactName,
      "api%2Dversion": "2025-03-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByArtifactNameDeserialize(
  result: PathUncheckedResponse,
): Promise<_GallerySoftDeletedResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _gallerySoftDeletedResourceListDeserializer(result.body);
}

/** List soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image. */
export function listByArtifactName(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  artifactType: string,
  artifactName: string,
  options: SoftDeletedResourceListByArtifactNameOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GallerySoftDeletedResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByArtifactNameSend(
        context,
        resourceGroupName,
        galleryName,
        artifactType,
        artifactName,
        options,
      ),
    _listByArtifactNameDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-03-03" },
  );
}
