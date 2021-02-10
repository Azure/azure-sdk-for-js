// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { UserDelegationKey } from "../models";
import { ipRangeToString, SasIPRange } from "./SasIPRange";
import { truncatedISO8061Date } from "../utils/utils.common";

/**
 * Protocols for generated SAS.
 *
 * @export
 * @enum {number}
 */
export enum SASProtocol {
  /**
   * Protocol that allows HTTPS only
   */
  Https = "https",

  /**
   * Protocol that allows both HTTPS and HTTP
   */
  HttpsAndHttp = "https,http"
}

/**
 * Options to construct {@link SASQueryParameters}.
 *
 * @export
 * @interface SASQueryParametersOptions
 */
export interface SASQueryParametersOptions {
  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSASPermissions}, {@link BlobSASPermissions}, or {@link ContainerSASPermissions} for
   * more details.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  permissions?: string;
  /**
   * Optional. The storage services being accessed (only for Account SAS). Please refer to {@link AccountSASServices}
   * for more details.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  services?: string;
  /**
   * Optional. The storage resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSASResourceTypes} for more details.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  resourceTypes?: string;
  /**
   * Optional. The allowed HTTP protocol(s).
   *
   * @type {SASProtocol}
   * @memberof SASQueryParametersOptions
   */
  protocol?: SASProtocol;
  /**
   * Optional. The start time for this SAS token.
   *
   * @type {Date}
   * @memberof SASQueryParametersOptions
   */
  startsOn?: Date;
  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   *
   * @type {Date}
   * @memberof SASQueryParametersOptions
   */
  expiresOn?: Date;
  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {SasIPRange}
   * @memberof SASQueryParametersOptions
   */
  ipRange?: SasIPRange;
  /**
   * Optional. The signed identifier (only for {@link BlobSASSignatureValues}).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  identifier?: string;
  /**
   * Optional. Specifies which resources are accessible via the SAS (only for {@link BlobSASSignatureValues}).
   * @see https://docs.microsoft.com/rest/api/storageservices/create-service-sas#specifying-the-signed-resource-blob-service-only
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  resource?: string;
  /**
   * Value for cache-control header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  cacheControl?: string;
  /**
   * Value for content-disposition header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  contentDisposition?: string;
  /**
   * Value for content-encoding header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  contentEncoding?: string;
  /**
   * Value for content-length header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  contentLanguage?: string;
  /**
   * Value for content-type header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  contentType?: string;
  /**
   * User delegation key properties.
   *
   * @type {UserDelegationKey}
   * @memberof SASQueryParametersOptions
   */
  userDelegationKey?: UserDelegationKey;
  /**
   * Indicate the depth of the directory specified in the canonicalizedresource field of the string-to-sign.
   * The depth of the directory is the number of directories beneath the root folder.
   *
   * @type {number}
   * @memberof SASQueryParametersOptions
   */
  directoryDepth?: number;
  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Storage service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This cannot be used in conjuction with {@link signedUnauthorizedUserObjectId}.
   * This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  preauthorizedAgentObjectId?: string;
  /**
   * Unauthorized AAD Object ID in GUID format. The AAD Object ID of a user that is assumed to be unauthorized by the owner of the User Delegation Key.
   * The Azure Storage Service will perform an additional POSIX ACL check to determine if the user is authorized to perform the requested operation.
   * This cannot be used in conjuction with {@link signedAuthorizedUserObjectId}. This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  agentObjectId?: string;
  /**
   * A GUID value that will be logged in the storage diagnostic logs and can be used to correlate SAS generation with storage resource access.
   * This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParametersOptions
   */
  correlationId?: string;
}

/**
 * Represents the components that make up an Azure Storage SAS' query parameters. This type is not constructed directly
 * by the user; it is only generated by the {@link AccountSASSignatureValues} and {@link BlobSASSignatureValues}
 * types. Once generated, it can be encoded into a {@code String} and appended to a URL directly (though caution should
 * be taken here in case there are existing query parameters, which might affect the appropriate means of appending
 * these query parameters).
 *
 * NOTE: Instances of this class are immutable.
 *
 * @export
 * @class SASQueryParameters
 */
export class SASQueryParameters {
  /**
   * The storage API version.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly version: string;

  /**
   * Optional. The allowed HTTP protocol(s).
   *
   * @type {SASProtocol}
   * @memberof SASQueryParameters
   */
  public readonly protocol?: SASProtocol;

  /**
   * Optional. The start time for this SAS token.
   *
   * @type {Date}
   * @memberof SASQueryParameters
   */
  public readonly startsOn?: Date;

  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   *
   * @type {Date}
   * @memberof SASQueryParameters
   */
  public readonly expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSASPermissions}, {@link BlobSASPermissions}, or {@link ContainerSASPermissions} for
   * more details.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly permissions?: string;

  /**
   * Optional. The storage services being accessed (only for Account SAS). Please refer to {@link AccountSASServices}
   * for more details.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly services?: string;

  /**
   * Optional. The storage resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSASResourceTypes} for more details.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly resourceTypes?: string;

  /**
   * Optional. The signed identifier (only for {@link BlobSASSignatureValues}).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly identifier?: string;

  /**
   * Optional. Specifies which resources are accessible via the SAS (only for {@link BlobSASSignatureValues}).
   * @see https://docs.microsoft.com/rest/api/storageservices/create-service-sas#specifying-the-signed-resource-blob-service-only
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly resource?: string;

  /**
   * The signature for the SAS token.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly signature: string;

  /**
   * Value for cache-control header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly cacheControl?: string;

  /**
   * Value for content-disposition header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly contentDisposition?: string;

  /**
   * Value for content-encoding header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly contentEncoding?: string;

  /**
   * Value for content-length header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly contentLanguage?: string;

  /**
   * Value for content-type header in Blob/File Service SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly contentType?: string;

  /**
   * Inner value of getter ipRange.
   *
   * @private
   * @type {SasIPRange}
   * @memberof SASQueryParameters
   */
  private readonly ipRangeInner?: SasIPRange;

  /**
   * The Azure Active Directory object ID in GUID format.
   * Property of user delegation key.
   *
   * @private
   * @type {string}
   * @memberof SASQueryParameters
   */
  private readonly signedOid?: string;

  /**
   * The Azure Active Directory tenant ID in GUID format.
   * Property of user delegation key.
   *
   * @private
   * @type {string}
   * @memberof SASQueryParameters
   */
  private readonly signedTenantId?: string;

  /**
   * The date-time the key is active.
   * Property of user delegation key.
   *
   * @private
   * @type {Date}
   * @memberof SASQueryParameters
   */
  private readonly signedStartsOn?: Date;

  /**
   * The date-time the key expires.
   * Property of user delegation key.
   *
   * @private
   * @type {Date}
   * @memberof SASQueryParameters
   */
  private readonly signedExpiresOn?: Date;

  /**
   * Abbreviation of the Azure Storage service that accepts the user delegation key.
   * Property of user delegation key.
   *
   * @private
   * @type {string}
   * @memberof SASQueryParameters
   */
  private readonly signedService?: string;

  /**
   * The service version that created the user delegation key.
   * Property of user delegation key.
   *
   * @private
   * @type {string}
   * @memberof SASQueryParameters
   */
  private readonly signedVersion?: string;

  /**
   * Indicate the depth of the directory specified in the canonicalizedresource field of the string-to-sign.
   * The depth of the directory is the number of directories beneath the root folder.
   *
   * @type {number}
   * @memberof SASQueryParameters
   */
  public readonly directoryDepth?: number;

  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Storage service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This cannot be used in conjuction with {@link signedUnauthorizedUserObjectId}.
   * This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly preauthorizedAgentObjectId?: string;

  /**
   * Unauthorized AAD Object ID in GUID format. The AAD Object ID of a user that is assumed to be unauthorized by the owner of the User Delegation Key.
   * The Azure Storage Service will perform an additional POSIX ACL check to determine if the user is authorized to perform the requested operation.
   * This cannot be used in conjuction with {@link signedAuthorizedUserObjectId}.
   * This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly agentObjectId?: string;

  /**
   * A GUID value that will be logged in the storage diagnostic logs and can be used to correlate SAS generation with storage resource access.
   * This is only used for User Delegation SAS.
   *
   * @type {string}
   * @memberof SASQueryParameters
   */
  public readonly correlationId?: string;

  /**
   * Optional. IP range allowed for this SAS.
   *
   * @readonly
   * @type {(SasIPRange | undefined)}
   * @memberof SASQueryParameters
   */
  public get ipRange(): SasIPRange | undefined {
    if (this.ipRangeInner) {
      return {
        end: this.ipRangeInner.end,
        start: this.ipRangeInner.start
      };
    }
    return undefined;
  }

  /**
   * Creates an instance of SASQueryParameters.
   *
   * @param version - Representing the storage version
   * @param signature - Representing the signature for the SAS token
   * @param permissions - Representing the storage permissions
   * @param services - Representing the storage services being accessed (only for Account SAS)
   * @param resourceTypes - Representing the storage resource types being accessed (only for Account SAS)
   * @param protocol - Representing the allowed HTTP protocol(s)
   * @param startsOn - Representing the start time for this SAS token
   * @param expiresOn - Representing the expiry time for this SAS token
   * @param ipRange - Representing the range of valid IP addresses for this SAS token
   * @param identifier - Representing the signed identifier (only for Service SAS)
   * @param resource - Representing the storage container or blob (only for Service SAS)
   * @param cacheControl - Representing the cache-control header (only for Blob/File Service SAS)
   * @param contentDisposition - Representing the content-disposition header (only for Blob/File Service SAS)
   * @param contentEncoding - Representing the content-encoding header (only for Blob/File Service SAS)
   * @param contentLanguage - Representing the content-language header (only for Blob/File Service SAS)
   * @param contentType - Representing the content-type header (only for Blob/File Service SAS)
   * @param userDelegationKey - Representing the user delegation key properties
   * @param preauthorizedAgentObjectId - Representing the authorized AAD Object ID (only for User Delegation SAS)
   * @param agentObjectId - Representing the unauthorized AAD Object ID (only for User Delegation SAS)
   * @param correlationId - Representing the correlation ID (only for User Delegation SAS)
   * @memberof SASQueryParameters
   */
  constructor(
    version: string,
    signature: string,
    permissions?: string,
    services?: string,
    resourceTypes?: string,
    protocol?: SASProtocol,
    startsOn?: Date,
    expiresOn?: Date,
    ipRange?: SasIPRange,
    identifier?: string,
    resource?: string,
    cacheControl?: string,
    contentDisposition?: string,
    contentEncoding?: string,
    contentLanguage?: string,
    contentType?: string,
    userDelegationKey?: UserDelegationKey,
    directoryDepth?: number,
    preauthorizedAgentObjectId?: string,
    agentObjectId?: string,
    correlationId?: string
  );

  /**
   * Creates an instance of SASQueryParameters.
   *
   * @param version - Representing the storage version
   * @param signature - Representing the signature for the SAS token
   * @param options - Optional. Options to construct the SASQueryParameters.
   * @memberof SASQueryParameters
   */
  constructor(version: string, signature: string, options?: SASQueryParametersOptions);

  constructor(
    version: string,
    signature: string,
    permissionsOrOptions?: string | SASQueryParametersOptions,
    services?: string,
    resourceTypes?: string,
    protocol?: SASProtocol,
    startsOn?: Date,
    expiresOn?: Date,
    ipRange?: SasIPRange,
    identifier?: string,
    resource?: string,
    cacheControl?: string,
    contentDisposition?: string,
    contentEncoding?: string,
    contentLanguage?: string,
    contentType?: string,
    userDelegationKey?: UserDelegationKey,
    directoryDepth?: number,
    preauthorizedAgentObjectId?: string,
    agentObjectId?: string,
    correlationId?: string
  ) {
    this.version = version;
    this.signature = signature;

    if (permissionsOrOptions !== undefined && typeof permissionsOrOptions !== "string") {
      // SASQueryParametersOptions
      const options = permissionsOrOptions;
      this.services = options.services;
      this.resourceTypes = options.resourceTypes;
      this.expiresOn = options.expiresOn;
      this.permissions = options.permissions;
      this.protocol = options.protocol;
      this.startsOn = options.startsOn;
      this.ipRangeInner = options.ipRange;
      this.identifier = options.identifier;
      this.resource = options.resource;
      this.cacheControl = options.cacheControl;
      this.contentDisposition = options.contentDisposition;
      this.contentEncoding = options.contentEncoding;
      this.contentLanguage = options.contentLanguage;
      this.contentType = options.contentType;
      this.directoryDepth = options.directoryDepth;
      this.preauthorizedAgentObjectId = options.preauthorizedAgentObjectId;
      this.agentObjectId = options.agentObjectId;
      this.correlationId = options.correlationId;

      if (options.userDelegationKey) {
        this.signedOid = options.userDelegationKey.signedObjectId;
        this.signedTenantId = options.userDelegationKey.signedTenantId;
        this.signedStartsOn = options.userDelegationKey.signedStartsOn;
        this.signedExpiresOn = options.userDelegationKey.signedExpiresOn;
        this.signedService = options.userDelegationKey.signedService;
        this.signedVersion = options.userDelegationKey.signedVersion;
      }
    } else {
      this.services = services;
      this.resourceTypes = resourceTypes;
      this.expiresOn = expiresOn;
      this.permissions = permissionsOrOptions;
      this.protocol = protocol;
      this.startsOn = startsOn;
      this.ipRangeInner = ipRange;
      this.identifier = identifier;
      this.resource = resource;
      this.cacheControl = cacheControl;
      this.contentDisposition = contentDisposition;
      this.contentEncoding = contentEncoding;
      this.contentLanguage = contentLanguage;
      this.contentType = contentType;
      this.directoryDepth = directoryDepth;
      this.preauthorizedAgentObjectId = preauthorizedAgentObjectId;
      this.agentObjectId = agentObjectId;
      this.correlationId = correlationId;

      if (userDelegationKey) {
        this.signedOid = userDelegationKey.signedObjectId;
        this.signedTenantId = userDelegationKey.signedTenantId;
        this.signedStartsOn = userDelegationKey.signedStartsOn;
        this.signedExpiresOn = userDelegationKey.signedExpiresOn;
        this.signedService = userDelegationKey.signedService;
        this.signedVersion = userDelegationKey.signedVersion;
      }
    }
  }

  /**
   * Encodes all SAS query parameters into a string that can be appended to a URL.
   *
   *
   * @memberof SASQueryParameters
   */
  public toString(): string {
    const params: string[] = [
      "sv",
      "ss",
      "srt",
      "spr",
      "st",
      "se",
      "sip",
      "si",
      "skoid", // Signed object ID
      "sktid", // Signed tenant ID
      "skt", // Signed key start time
      "ske", // Signed key expiry time
      "sks", // Signed key service
      "skv", // Signed key version
      "sr",
      "sp",
      "sig",
      "rscc",
      "rscd",
      "rsce",
      "rscl",
      "rsct",
      "sdd",
      "saoid",
      "suoid",
      "scid"
    ];
    const queries: string[] = [];

    for (const param of params) {
      switch (param) {
        case "sv":
          this.tryAppendQueryParameter(queries, param, this.version);
          break;
        case "ss":
          this.tryAppendQueryParameter(queries, param, this.services);
          break;
        case "srt":
          this.tryAppendQueryParameter(queries, param, this.resourceTypes);
          break;
        case "spr":
          this.tryAppendQueryParameter(queries, param, this.protocol);
          break;
        case "st":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.startsOn ? truncatedISO8061Date(this.startsOn, false) : undefined
          );
          break;
        case "se":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.expiresOn ? truncatedISO8061Date(this.expiresOn, false) : undefined
          );
          break;
        case "sip":
          this.tryAppendQueryParameter(
            queries,
            param,
            this.ipRange ? ipRangeToString(this.ipRange) : undefined
          );
          break;
        case "si":
          this.tryAppendQueryParameter(queries, param, this.identifier);
          break;
        case "skoid": // Signed object ID
          this.tryAppendQueryParameter(queries, param, this.signedOid);
          break;
        case "sktid": // Signed tenant ID
          this.tryAppendQueryParameter(queries, param, this.signedTenantId);
          break;
        case "skt": // Signed key start time
          this.tryAppendQueryParameter(
            queries,
            param,
            this.signedStartsOn ? truncatedISO8061Date(this.signedStartsOn, false) : undefined
          );
          break;
        case "ske": // Signed key expiry time
          this.tryAppendQueryParameter(
            queries,
            param,
            this.signedExpiresOn ? truncatedISO8061Date(this.signedExpiresOn, false) : undefined
          );
          break;
        case "sks": // Signed key service
          this.tryAppendQueryParameter(queries, param, this.signedService);
          break;
        case "skv": // Signed key version
          this.tryAppendQueryParameter(queries, param, this.signedVersion);
          break;
        case "sr":
          this.tryAppendQueryParameter(queries, param, this.resource);
          break;
        case "sp":
          this.tryAppendQueryParameter(queries, param, this.permissions);
          break;
        case "sig":
          this.tryAppendQueryParameter(queries, param, this.signature);
          break;
        case "rscc":
          this.tryAppendQueryParameter(queries, param, this.cacheControl);
          break;
        case "rscd":
          this.tryAppendQueryParameter(queries, param, this.contentDisposition);
          break;
        case "rsce":
          this.tryAppendQueryParameter(queries, param, this.contentEncoding);
          break;
        case "rscl":
          this.tryAppendQueryParameter(queries, param, this.contentLanguage);
          break;
        case "rsct":
          this.tryAppendQueryParameter(queries, param, this.contentType);
          break;
        case "sdd":
          this.tryAppendQueryParameter(queries, param, this.directoryDepth?.toString());
          break;
        case "saoid":
          this.tryAppendQueryParameter(queries, param, this.preauthorizedAgentObjectId);
          break;
        case "suoid":
          this.tryAppendQueryParameter(queries, param, this.agentObjectId);
          break;
        case "scid":
          this.tryAppendQueryParameter(queries, param, this.correlationId);
          break;
      }
    }
    return queries.join("&");
  }

  /**
   * A private helper method used to filter and append query key/value pairs into an array.
   *
   * @private
   * @param queries -
   * @param key -
   * @param value -
   *
   * @memberof SASQueryParameters
   */
  private tryAppendQueryParameter(queries: string[], key: string, value?: string): void {
    if (!value) {
      return;
    }

    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    if (key.length > 0 && value.length > 0) {
      queries.push(`${key}=${value}`);
    }
  }
}
