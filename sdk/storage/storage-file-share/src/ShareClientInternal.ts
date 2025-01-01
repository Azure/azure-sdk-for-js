// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "./Pipeline.js";
import { StorageClient } from "./StorageClient.js";
import type {
  ShareRestoreOptionalParams,
  ShareRestoreResponse,
} from "./generated/src/models/index.js";
import type { Share } from "./generated/src/operationsInterfaces/index.js";

/**
 * ShareClientInternal is the thin wrapper for Share which contains internal helper methods.
 */
export class ShareClientInternal extends StorageClient {
  private context: Share;

  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = this.storageClientContext.share;
  }

  public async restore(options: ShareRestoreOptionalParams = {}): Promise<ShareRestoreResponse> {
    return this.context.restore(options);
  }
}
