import {
  HttpHeaders,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "ms-rest-js";

import { TokenCredential } from "../credentials/TokenCredential";
import { HeaderConstants } from "../utils/constants";
import { CredentialPolicy } from "./CredentialPolicy";

/**
 * TokenCredentialPolicy is a policy used to sign HTTP request with a token.
 * Such as an OAuth bearer token.
 *
 * @export
 * @class TokenCredentialPolicy
 * @extends {CredentialPolicy}
 */
export class TokenCredentialPolicy extends CredentialPolicy {
  /**
   * The value of token.
   *
   * @type {TokenCredential}
   * @memberof TokenCredentialPolicy
   */
  public readonly tokenCredential: TokenCredential;

  /**
   * Token authorization scheme, default header is "Bearer".
   *
   * @type {string}
   * @memberof TokenCredentialPolicy
   */
  public readonly authorizationScheme: string;

  /**
   * Creates an instance of TokenCredentialPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {TokenCredential} tokenCredential
   * @memberof TokenCredentialPolicy
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    tokenCredential: TokenCredential
  ) {
    super(nextPolicy, options);
    this.tokenCredential = tokenCredential;
    this.authorizationScheme = HeaderConstants.AUTHORIZATION_SCHEME;
  }

  /**
   * Sign request with token.
   *
   * @protected
   * @param {WebResource} request
   * @returns {WebResource}
   * @memberof TokenCredentialPolicy
   */
  protected signRequest(request: WebResource): WebResource {
    if (!request.headers) {
      request.headers = new HttpHeaders();
    }
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `${this.authorizationScheme} ${this.tokenCredential.token}`
    );
    return request;
  }
}
