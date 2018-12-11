import * as Crypto from "crypto";
import { RequestPolicy, RequestPolicyOptions } from "ms-rest-js";

import { SharedKeyCredentialPolicy } from "../policies/SharedKeyCredentialPolicy";
import { Credential } from "./Credential";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * SharedKeyCredential for account key authorization of Azure Storage service.
 *
 * @export
 * @class SharedKeyCredential
 * @extends {Credential}
 */
export class SharedKeyCredential extends Credential {
  /**
   * Azure Storage account name; readonly.
   *
   * @type {string}
   * @memberof SharedKeyCredential
   */
  public readonly accountName: string;

  /**
   * Azure Storage account key; readonly.
   *
   * @type {Buffer}
   * @memberof SharedKeyCredential
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of SharedKeyCredential.
   * @param {string} accountName
   * @param {string} accountKey
   * @memberof SharedKeyCredential
   */
  constructor(accountName: string, accountKey: string) {
    super();
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Creates a SharedKeyCredentialPolicy object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {SharedKeyCredentialPolicy}
   * @memberof SharedKeyCredential
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): SharedKeyCredentialPolicy {
    return new SharedKeyCredentialPolicy(nextPolicy, options, this);
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param {string} stringToSign
   * @returns {string}
   * @memberof SharedKeyCredential
   */
  public computeHMACSHA256(stringToSign: string): string {
    return Crypto.createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }
}
