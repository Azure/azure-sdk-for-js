import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "../../lib";
import { InjectorPolicy, Injector } from "./InjectorPolicy";

/**
 * InjectorPolicyFactory is a factory class which injects customized errors for retry policy testing.
 *
 * @export
 * @class InjectorPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class InjectorPolicyFactory implements RequestPolicyFactory {
  public readonly injector: Injector;

  public constructor(injector: Injector) {
    this.injector = injector;
  }

  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): InjectorPolicy {
    return new InjectorPolicy(nextPolicy, options, this.injector);
  }
}
