// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "../../src";
import { MockPolicy } from "./MockPolicy";

/**
 * MockPolicyFactory is a factory class which tune the response for testing.
 */
export class MockPolicyFactory implements RequestPolicyFactory {
  private responseHeaders?: { [key: string]: any };

  public constructor(responseHeaders: { [key: string]: any } = {}) {
    this.responseHeaders = responseHeaders;
  }

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): MockPolicy {
    return new MockPolicy(nextPolicy, options, this.responseHeaders);
  }
}
