// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from './requestPolicy';
import { WebResource } from '../webResource';
import { HttpOperationResponse } from '../httpOperationResponse';

/**
 * Options for how HTTP connections should handle the gzip/defalte encoding for future
 * requests.
 */
export interface CompressOptions {
  /*
   * When true, enables the support of gzip/defalte content encoding in node-fetch client.
   */
  enable: boolean;
}

export function compressPolicy(compressOptions: CompressOptions = { enable: true }) {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new CompressPolicy(nextPolicy, options, compressOptions);
    }
  };
}

/**
 * CompressPolicy is a policy used to control fetch() compress option for every request.
 */
export class CompressPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of CompressPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {CompressOptions} [compressOptions]
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    public readonly compressOptions: CompressOptions
  ) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof CompressPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.compress = this.compressOptions.enable;
    return this._nextPolicy.sendRequest(request);
  }
}
