// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "./Pipeline.js";
import { StorageClient } from "./StorageClient.js";
import type {
  ShareRestoreOptionalParams,
  ShareRestoreResponse,
} from "./generated-classic-models.js";
import type { ShareOperations } from "./generated/index.js";
import { adjustResponse } from "./utils/utils.common.js";

/**
 * ShareClientInternal is the thin wrapper for Share which contains internal helper methods.
 */
export class ShareClientInternal extends StorageClient {
  private context: ShareOperations;

  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = this.storageClientContext.share;
  }

  public async restore(options: ShareRestoreOptionalParams = {}): Promise<ShareRestoreResponse> {
    return adjustResponse(await this.context.restore(options));
  }
}
