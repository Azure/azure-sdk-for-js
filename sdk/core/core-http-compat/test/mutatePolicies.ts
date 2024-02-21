// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CompatResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
  WebResourceLike,
} from "../src/index.js";

export interface MutateOptions {
  headersToSet?: { [name: string]: string };
}

export interface RequestMutateOptions extends MutateOptions {
  url?: string;
  timeout?: number;
}

export function mutateRequestPolicy(mutateOptions: RequestMutateOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new MutateRequestPolicy(nextPolicy, options, mutateOptions);
    },
  };
}

export class MutateRequestPolicy {
  constructor(
    private _nextPolicy: RequestPolicy,
    _options: RequestPolicyOptionsLike,
    private readonly _mutateOptions: RequestMutateOptions,
  ) {
    /** Nothing much to do here */
  }

  public async sendRequest(request: WebResourceLike): Promise<CompatResponse> {
    const headersToSet = this._mutateOptions.headersToSet;
    for (const [name, value] of Object.entries(headersToSet ?? {})) {
      request.headers.set(name, value);
    }
    if (this._mutateOptions.url) {
      request.url = this._mutateOptions.url;
    }
    if (typeof this._mutateOptions.timeout === "number") {
      request.timeout = this._mutateOptions.timeout;
    }
    return this._nextPolicy.sendRequest(request);
  }
}

export function mutateResponsePolicy(mutateOptions: MutateOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new MutateResponsePolicy(nextPolicy, options, mutateOptions);
    },
  };
}

export class MutateResponsePolicy {
  constructor(
    private _nextPolicy: RequestPolicy,
    _options: RequestPolicyOptionsLike,
    private readonly _mutateOptions: MutateOptions,
  ) {
    /** Nothing much to do here */
  }

  public async sendRequest(request: WebResourceLike): Promise<CompatResponse> {
    const response = await this._nextPolicy.sendRequest(request);
    const headersToSet = this._mutateOptions.headersToSet;
    for (const [name, value] of Object.entries(headersToSet ?? {})) {
      response.headers.set(name, value);
    }
    return response;
  }
}
