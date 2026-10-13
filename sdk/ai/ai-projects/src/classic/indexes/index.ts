// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { createOrUpdate, $delete, get, list, listVersions } from "../../api/indexes/operations.js";
import type {
  IndexesCreateOrUpdateOptionalParams,
  IndexesDeleteOptionalParams,
  IndexesGetOptionalParams,
  IndexesListOptionalParams,
  IndexesListVersionsOptionalParams,
} from "../../api/indexes/options.js";
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/indexes/index.ts
import { IndexUnion, IndexUpdateUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/indexes/index.ts
import { IndexUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
=======
import type { IndexUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/indexes/index.ts

/** Interface representing a Indexes operations. */
export interface IndexesOperations {
  /** Create a new or update an existing Index with the given version id */
  createOrUpdate: (
    name: string,
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/indexes/index.ts
    index: IndexUpdateUnion,
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/indexes/index.ts
    index: IndexUnion,
=======
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/indexes/index.ts
    version: string,
    index: IndexUnion,
    options?: IndexesCreateOrUpdateOptionalParams,
  ) => Promise<IndexUnion>;
  /** Delete the specific version of the Index. The service returns 204 No Content if the Index was deleted successfully or if the Index does not exist. */
  delete: (name: string, version: string, options?: IndexesDeleteOptionalParams) => Promise<void>;
  /** Get the specific version of the Index. The service returns 404 Not Found error if the Index does not exist. */
  get: (name: string, version: string, options?: IndexesGetOptionalParams) => Promise<IndexUnion>;
  /** List the latest version of each Index */
  list: (options?: IndexesListOptionalParams) => PagedAsyncIterableIterator<IndexUnion>;
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
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/indexes/index.ts
      index: IndexUpdateUnion,
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/indexes/index.ts
      index: IndexUnion,
=======
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/indexes/index.ts
      version: string,
      index: IndexUnion,
      options?: IndexesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, index, version, options),
    delete: (name: string, version: string, options?: IndexesDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: IndexesGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: IndexesListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: IndexesListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getIndexesOperations(context: AIProjectContext): IndexesOperations {
  return {
    ..._getIndexes(context),
  };
}
