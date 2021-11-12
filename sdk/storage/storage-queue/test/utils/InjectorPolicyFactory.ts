// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Injector, InjectorPolicy } from "./InjectorPolicy";
import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "../../src";

/**
 * InjectorPolicyFactory is a factory class injects customized errors for retry policy testing.
 */
export class InjectorPolicyFactory implements RequestPolicyFactory {
  public readonly injector: Injector;

  public constructor(injector: Injector) {
    this.injector = injector;
  }

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): InjectorPolicy {
    return new InjectorPolicy(nextPolicy, options, this.injector);
  }
}
