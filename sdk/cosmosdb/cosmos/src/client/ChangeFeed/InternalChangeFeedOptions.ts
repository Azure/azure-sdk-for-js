// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChangeFeedMode } from "./ChangeFeedMode.js";

/**
 * @hidden
 * Internal Change Feed Iterator Options used only by ChangeFeedForEpkRange and ChangeFeedForPartitionKey.
 */
export interface InternalChangeFeedIteratorOptions {
  maxItemCount?: number;

  sessionToken?: string;

  continuationToken?: string;

  startTime?: Date;

  changeFeedMode?: ChangeFeedMode;

  startFromNow?: boolean;

  excludedLocations?: string[];
}
