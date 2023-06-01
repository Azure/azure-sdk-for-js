// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createBar,
  BarClientOptions,
  Client,
  Resource,
  getBinary,
  getArray,
  createWithHeaders,
  deleteWithHeaders,
  GetBinaryOptions,
  GetArrayOptions,
  CreateWithHeadersOptions,
  DeleteWithHeadersOptions,
} from "./api/bar/index.js";

export { BarClientOptions } from "./api/bar/BarContext.js";

export class BarClient {
  private _client: Client.BarContext;

  /** Bar */
  constructor(endpoint: string, options: BarClientOptions = {}) {
    this._client = createBar(endpoint, options);
  }

  /** */
  getBinary(options: GetBinaryOptions = { requestOptions: {} }): Promise<any> {
    return getBinary(this._client, options);
  }

  /** */
  getArray(
    options: GetArrayOptions = { requestOptions: {} }
  ): Promise<Resource[]> {
    return getArray(this._client, options);
  }

  /** */
  createWithHeaders(
    options: CreateWithHeadersOptions = { requestOptions: {} }
  ): Promise<Resource> {
    return createWithHeaders(this._client, options);
  }

  /** */
  deleteWithHeaders(
    options: DeleteWithHeadersOptions = { requestOptions: {} }
  ): Promise<void> {
    return deleteWithHeaders(this._client, options);
  }
}
