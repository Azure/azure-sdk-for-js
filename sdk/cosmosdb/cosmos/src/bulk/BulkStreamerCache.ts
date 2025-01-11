// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../client";
import type { ClientContext } from "../ClientContext";
import type { PartitionKeyRangeCache } from "../routing";
import { BulkStreamer } from "./BulkStreamer";

/**
 * @hidden
 * Cache to create and share Streamer instances across the client's lifetime.
 * key - containerUrl
 */
export class BulkStreamerCache {
  private readonly streamerPerContainer: Map<string, BulkStreamer>;

  constructor() {
    this.streamerPerContainer = new Map<string, BulkStreamer>();
  }

  public getOrCreateStreamer(
    container: Container,
    clientContext: ClientContext,
    partitionKeyRangeCache: PartitionKeyRangeCache,
  ): BulkStreamer {
    if (!this.streamerPerContainer.has(container.url)) {
      this.streamerPerContainer.set(
        container.url,
        new BulkStreamer(container, clientContext, partitionKeyRangeCache),
      );
    }

    return this.streamerPerContainer.get(container.url);
  }
}
