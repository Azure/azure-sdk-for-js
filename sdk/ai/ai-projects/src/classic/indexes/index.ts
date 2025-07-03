// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { IndexUnion } from "../../models/models.js";
import {
  IndexesCreateOrUpdateOptionalParams,
  IndexesDeleteOptionalParams,
  IndexesGetOptionalParams,
  IndexesListOptionalParams,
  IndexesListVersionsOptionalParams,
} from "../../api/indexes/options.js";
import {
  createOrUpdate,
  $delete,
  get,
  list,
  listVersions,
} from "../../api/indexes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Indexes operations. */
export interface IndexesOperations {
  /** Create a new or update an existing Index with the given version id */
  createOrUpdate: (
    name: string,
    body: IndexUnion,
    version: string,
    options?: IndexesCreateOrUpdateOptionalParams,
  ) => Promise<IndexUnion>;
  /** Delete the specific version of the Index */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    name: string,
    version: string,
    options?: IndexesDeleteOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the Index */
  get: (
    name: string,
    version: string,
    options?: IndexesGetOptionalParams,
  ) => Promise<IndexUnion>;
  /** List the latest version of each Index */
  list: (
    options?: IndexesListOptionalParams,
  ) => PagedAsyncIterableIterator<IndexUnion>;
  /** List all versions of the given Index */
  listVersions: (
    name: string,
    options?: IndexesListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<IndexUnion>;
}

function _getIndexes(context: AIProjectContext) {
  return {
    createOrUpdate: (
      name: string,
      body: IndexUnion,
      version: string,
      options?: IndexesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, body, version, options),
    delete: (
      name: string,
      version: string,
      options?: IndexesDeleteOptionalParams,
    ) => $delete(context, name, version, options),
    get: (name: string, version: string, options?: IndexesGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: IndexesListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: IndexesListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getIndexesOperations(
  context: AIProjectContext,
): IndexesOperations {
  return {
    ..._getIndexes(context),
  };
}
