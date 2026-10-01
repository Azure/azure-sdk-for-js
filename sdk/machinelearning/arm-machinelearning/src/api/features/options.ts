// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FeaturesListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** feature name. */
  featureName?: string;
  /** Description of the featureset. */
  description?: string;
  /** [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
  /** Page size. */
  pageSize?: number;
}

/** Optional parameters. */
export interface FeaturesGetOptionalParams extends OperationOptions {}
