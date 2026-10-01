// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import { list, getEntity } from "../../api/metadata/operations.js";
import {
  MetadataListOptionalParams,
  MetadataGetEntityOptionalParams,
} from "../../api/metadata/options.js";
import { MetadataEntity } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Metadata operations. */
export interface MetadataOperations {
  /** Gets the list of metadata entities. */
  list: (options?: MetadataListOptionalParams) => PagedAsyncIterableIterator<MetadataEntity>;
  /** Gets the list of metadata entities. */
  getEntity: (name: string, options?: MetadataGetEntityOptionalParams) => Promise<MetadataEntity>;
}

function _getMetadata(context: MicrosoftResourceHealthContext) {
  return {
    list: (options?: MetadataListOptionalParams) => list(context, options),
    getEntity: (name: string, options?: MetadataGetEntityOptionalParams) =>
      getEntity(context, name, options),
  };
}

export function _getMetadataOperations(
  context: MicrosoftResourceHealthContext,
): MetadataOperations {
  return {
    ..._getMetadata(context),
  };
}
