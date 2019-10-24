import { createHmac } from "crypto";
import { UserDelegationKey } from "../BlobServiceClient";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
 *
 * @export
 * @class UserDelegationKeyCredential
 */
export class UserDelegationKeyCredential {
  /**
   * Azure Storage account name; readonly.
   *
   * @type {string}
   * @memberof UserDelegationKeyCredential
   */
  public readonly accountName: string;

  /**
   * Azure Storage user delegation key; readonly.
   *
   * @type {UserDelegationKey}
   * @memberof UserDelegationKeyCredential
   */
  public readonly userDelegationKey: UserDelegationKey;

  /**
   * Key value in Buffer type.
   *
   * @private
   * @type {Buffer}
   * @memberof UserDelegationKeyCredential
   */
  private readonly key: Buffer;

  /**
   * Creates an instance of UserDelegationKeyCredential.
   * @param {string} accountName
   * @param {UserDelegationKey} userDelegationKey
   * @memberof UserDelegationKeyCredential
   */
  constructor(accountName: string, userDelegationKey: UserDelegationKey) {
    this.accountName = accountName;
    this.userDelegationKey = userDelegationKey;
    this.key = Buffer.from(userDelegationKey.value, "base64");
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param {string} stringToSign
   * @returns {string}
   * @memberof UserDelegationKeyCredential
   */
  public computeHMACSHA256(stringToSign: string): string {
    // console.log(`stringToSign: ${JSON.stringify(stringToSign)}`);

    return createHmac("sha256", this.key)
      .update(stringToSign, "utf8")
      .digest("base64");
  }
}
