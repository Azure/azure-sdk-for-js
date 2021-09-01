// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { ShareRestoreOptionalParams, ShareRestoreResponse } from "./generated/src/models";
import { Share } from "./generated/src/operations";

/**
 * ShareClientInternal is the thin wrapper for Share which contains internal helper methods.
 */
export class ShareClientInternal extends StorageClient {
  private context: Share;

  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new Share(this.storageClientContext);
  }

  public async restore(options: ShareRestoreOptionalParams = {}): Promise<ShareRestoreResponse> {
    return this.context.restore(options);
  }
}
