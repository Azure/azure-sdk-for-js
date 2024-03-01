// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChangeFeedMode } from "./ChangeFeedMode";

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
}
