// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ShareClient
} from "./ShareClient";
import { ShareRestoreOptionalParams, ShareRestoreResponse } from './generated/src/models';

/**
 * ShareClientInternal is thin shim for using ShareClient's context internally.
 * Note: This class is not intended to be exposed.
 *
 * @export
 * @class ShareClientInternal
 */
export class ShareClientInternal extends ShareClient {
  
  
  public async restore(options: ShareRestoreOptionalParams = {}): Promise<ShareRestoreResponse> {
    return await this.context.restore(options);
  }

}
