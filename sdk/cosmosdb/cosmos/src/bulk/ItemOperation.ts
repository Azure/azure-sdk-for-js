// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKey } from "../documents";
import type { JSONObject } from "../queryExecutionContext";
import type { PatchRequestBody } from "../utils/patch";

/**
 * Represents an item operation in bulk execution.
 */
export interface ItemOperation {
  /**
   * The operation type.
   */
  operationType: string;
  /**
   * The partition key associated with the resource.
   */
  partitionKey: PartitionKey;
  /**
   * The ID of the resource.
   */
  id?: string;
  /**
   * The resource body.
   */
  resourceBody?: JSONObject | PatchRequestBody;
}
