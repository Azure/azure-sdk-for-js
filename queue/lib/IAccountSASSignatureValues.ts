import { AccountSASPermissions } from "./AccountSASPermissions";
import { AccountSASResourceTypes } from "./AccountSASResourceTypes";
import { AccountSASServices } from "./AccountSASServices";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { IIPRange, ipRangeToString } from "./IIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * IAccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call generateSASQueryParameters() to obtain a representation of the SAS
 * which can actually be applied to queue urls. Note: that both this class and {@link SASQueryParameters} exist because
 * the former is mutable and a logical representation while the latter is immutable and used to generate actual REST
 * requests.
 *
 * @see https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 *
 * @export
 * @class IAccountSASSignatureValues
 */
export interface IAccountSASSignatureValues {
  /**
   * If not provided, this defaults to the service version targeted by this version of the library.
   *
   * @type {string}
   * @memberof IAccountSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   *
   * @type {SASProtocol}
   * @memberof IAccountSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof IAccountSASSignatureValues
   */
  startTime?: Date;

  /**
   * The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof IAccountSASSignatureValues
   */
  expiryTime: Date;

  /**
   * Specifies which operations the SAS user may perform. Please refer to {@link AccountSASPermissions} for help
   * constructing the permissions string.
   *
   * @type {string}
   * @memberof IAccountSASSignatureValues
   */
  permissions: string;

  /**
   * Optional. IP range allowed.
   *
   * @type {IIPRange}
   * @memberof IAccountSASSignatureValues
   */
  ipRange?: IIPRange;

  /**
   * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSASService} to
   * construct this value.
   *
   * @type {string}
   * @memberof IAccountSASSignatureValues
   */
  services: string;

  /**
   * The values that indicate the resource types accessible with this SAS. Please refer
   * to {@link AccountSASResourceType} to construct this value.
   *
   * @type {string}
   * @memberof IAccountSASSignatureValues
   */
  resourceTypes: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 * @memberof IAccountSASSignatureValues
 */
export function generateAccountSASQueryParameters(
  accountSASSignatureValues: IAccountSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  const version = accountSASSignatureValues.version
    ? accountSASSignatureValues.version
    : SERVICE_VERSION;

  const parsedPermissions = AccountSASPermissions.parse(
    accountSASSignatureValues.permissions
  ).toString();
  const parsedServices = AccountSASServices.parse(
    accountSASSignatureValues.services
  ).toString();
  const parsedResourceTypes = AccountSASResourceTypes.parse(
    accountSASSignatureValues.resourceTypes
  ).toString();

  const stringToSign = [
    sharedKeyCredential.accountName,
    parsedPermissions,
    parsedServices,
    parsedResourceTypes,
    accountSASSignatureValues.startTime
      ? truncatedISO8061Date(accountSASSignatureValues.startTime, false)
      : "",
    truncatedISO8061Date(accountSASSignatureValues.expiryTime, false),
    accountSASSignatureValues.ipRange
      ? ipRangeToString(accountSASSignatureValues.ipRange)
      : "",
    accountSASSignatureValues.protocol
      ? accountSASSignatureValues.protocol
      : "",
    version,
    "" // Account SAS requires an additional newline character
  ].join("\n");

  const signature: string = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    parsedPermissions,
    parsedServices,
    parsedResourceTypes,
    accountSASSignatureValues.protocol,
    accountSASSignatureValues.startTime,
    accountSASSignatureValues.expiryTime,
    accountSASSignatureValues.ipRange
  );
}
