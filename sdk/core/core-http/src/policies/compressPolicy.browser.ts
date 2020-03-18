// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from './requestPolicy';
import { WebResource } from '../webResource';
import { HttpOperationResponse } from '../httpOperationResponse';

const compressNotSupportedInBrowser = new Error("CompressPolicy is not supported in browser environment");

export interface CompressOptions {
  enable: boolean;
}

export function compressPolicy(_compressOptions?: CompressOptions) {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      throw compressNotSupportedInBrowser;
    }
  };
}

export class CompressPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
  ) {
    super(nextPolicy, options);
    throw compressNotSupportedInBrowser;
  }

  public async sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
    throw compressNotSupportedInBrowser;
  }
}
