import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  RestError
} from "../../lib";

export interface INextInjectErrorHolder {
  nextInjectError?: RestError;
}

export type Injector = () => RestError | undefined;

/**
 * InjectorPolicy will inject a customized error before next HTTP request.
 *
 * @class InjectorPolicy
 * @extends {BaseRequestPolicy}
 */
export class InjectorPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of InjectorPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof InjectorPolicy
   */
  public constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    injector: Injector
  ) {
    super(nextPolicy, options);
    this.injector = injector;
  }

  /**
   * Sends request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof InjectorPolicy
   */
  public async sendRequest(
    request: WebResource
  ): Promise<HttpOperationResponse> {
    const error = this.injector();
    if (error) {
      throw error;
    }
    return this._nextPolicy.sendRequest(request);
  }

  private injector: Injector;
}
