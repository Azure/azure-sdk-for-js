// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, get } from "../../api/updateContents/operations.js";
import {
  UpdateContentsListOptionalParams,
  UpdateContentsGetOptionalParams,
} from "../../api/updateContents/options.js";
import { UpdateContent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UpdateContents operations. */
export interface UpdateContentsOperations {
  /** List all update contents. */
  list: (
    location: string,
    options?: UpdateContentsListOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateContent>;
  /** Gets content for an update. */
  get: (
    location: string,
    updateContentName: string,
    options?: UpdateContentsGetOptionalParams,
  ) => Promise<UpdateContent>;
}

function _getUpdateContents(context: AzureStackHCIContext) {
  return {
    list: (location: string, options?: UpdateContentsListOptionalParams) =>
      list(context, location, options),
    get: (location: string, updateContentName: string, options?: UpdateContentsGetOptionalParams) =>
      get(context, location, updateContentName, options),
  };
}

export function _getUpdateContentsOperations(
  context: AzureStackHCIContext,
): UpdateContentsOperations {
  return {
    ..._getUpdateContents(context),
  };
}
