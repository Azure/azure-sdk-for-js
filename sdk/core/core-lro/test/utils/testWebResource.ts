// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { WebResource } from "@azure/core-http";

export class TestWebResource extends WebResource {
  constructor(abortSignal?: AbortSignalLike) {
    super(
      undefined, // url?: string,
      undefined, // method?: HttpMethods,
      undefined, // body?: any,
      undefined, // query?: { [key: string]: any },
      undefined, // headers?: { [key: string]: any } | HttpHeaders,
      undefined, // streamResponseBody?: boolean,
      undefined, // withCredentials?: boolean,
      abortSignal, // abortSignal?: AbortSignalLike,
      undefined, // timeout?: number,
      undefined, // onUploadProgress?: (progress: TransferProgressEvent) => void,
      undefined, // onDownloadProgress?: (progress: TransferProgressEvent) => void,
      undefined, // proxySettings?: ProxySettings,
      undefined // keepAlive?: boolean
    );
  }
}
