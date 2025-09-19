// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/elasticVersions/operations.js";
import type { ElasticVersionsListOptionalParams } from "../../api/elasticVersions/options.js";
import type { ElasticVersionListFormat } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ElasticVersions operations. */
export interface ElasticVersionsOperations {
  /** Retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment. */
  list: (
    region: string,
    options?: ElasticVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticVersionListFormat>;
}

function _getElasticVersions(context: MicrosoftElasticContext) {
  return {
    list: (region: string, options?: ElasticVersionsListOptionalParams) =>
      list(context, region, options),
  };
}

export function _getElasticVersionsOperations(
  context: MicrosoftElasticContext,
): ElasticVersionsOperations {
  return {
    ..._getElasticVersions(context),
  };
}
