// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  BackupInstanceResource,
  cloudErrorDeserializer,
  _BackupInstanceResourceList,
  _backupInstanceResourceListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BackupInstancesExtensionRoutingListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceId: string,
  options: BackupInstancesExtensionRoutingListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.DataProtection/backupInstances{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupInstanceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _backupInstanceResourceListDeserializer(result.body);
}

/** Gets a list of backup instances associated with a tracked resource */
export function list(
  context: Client,
  resourceId: string,
  options: BackupInstancesExtensionRoutingListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupInstanceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}
