// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../client";
import type { ClientContext } from "../ClientContext";
import type { PartitionKeyRangeCache } from "../routing";
import { BulkExecutor } from "./BulkExecutor";

/**
 * Cache to create and share Executor instances across the client's lifetime.
 * key - containerUrl
 * @internal
 */

export class BulkExecutorCache {
    private readonly executorPerContainer: Map<string, BulkExecutor>;

    constructor() {
        this.executorPerContainer = new Map<string, BulkExecutor>();
    }

    public getOrCreateExecutor(container: Container, clientContext: ClientContext, partitionKeyRangeCache: PartitionKeyRangeCache): BulkExecutor {
        if (!this.executorPerContainer.has(container.url)) {
            this.executorPerContainer.set(container.url, new BulkExecutor(container, clientContext, partitionKeyRangeCache));
        }

        return this.executorPerContainer.get(container.url);
    }

}
