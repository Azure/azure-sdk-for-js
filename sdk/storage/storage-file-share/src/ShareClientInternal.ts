// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { ShareRestoreOptionalParams, ShareRestoreResponse } from "./generated/src/models";
import { Share } from "./generated/src/operationsInterfaces";

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
