// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** API details. */
export interface ApiContract extends ProxyResource {
  /** Description of the API. May include HTML formatting tags. */
  description?: string;
  /** Collection of authentication settings included into this API. */
  authenticationSettings?: AuthenticationSettingsContract;
  /** Protocols over which API is made available. */
  subscriptionKeyParameterNames?: SubscriptionKeyParameterNamesContract;
  /** Type of API. */
  apiType?: ApiType;
  /** Describes the revision of the API. If no value is provided, default revision 1 is created */
  apiRevision?: string;
  /** Indicates the version identifier of the API if the API is versioned */
  apiVersion?: string;
  /** Indicates if API revision is current api revision. */
  isCurrent?: boolean;
  /** Indicates if API revision is accessible via the gateway. */
  readonly isOnline?: boolean;
  /** Description of the API Revision. */
  apiRevisionDescription?: string;
  /** Description of the API Version. */
  apiVersionDescription?: string;
  /** A resource identifier for the related ApiVersionSet. */
  apiVersionSetId?: string;
  /** Specifies whether an API or Product subscription is required for accessing the API. */
  subscriptionRequired?: boolean;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfServiceUrl?: string;
  /** Contact information for the API. */
  contact?: ApiContactInformation;
  /** License information for the API. */
  license?: ApiLicenseInformation;
  /** API identifier of the source API. */
  sourceApiId?: string;
  /** API name. Must be 1 to 300 characters long. */
  displayName?: string;
  /** Absolute URL of the backend service implementing this API. Cannot be more than 2000 characters long. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path?: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
  /** Version set details */
  apiVersionSet?: ApiVersionSetContractDetails;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function apiContractDeserializer(item: any): ApiContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _apiContractPropertiesDeserializer(item["properties"])),
  };
}

/** API Entity Properties */
export interface ApiContractProperties extends ApiEntityBaseContract {
  /** API identifier of the source API. */
  sourceApiId?: string;
  /** API name. Must be 1 to 300 characters long. */
  displayName?: string;
  /** Absolute URL of the backend service implementing this API. Cannot be more than 2000 characters long. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
  /** Version set details */
  apiVersionSet?: ApiVersionSetContractDetails;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function apiContractPropertiesSerializer(item: ApiContractProperties): any {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsSerializer(item["apiVersionSet"]),
  };
}

export function apiContractPropertiesDeserializer(item: any): ApiContractProperties {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractDeserializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractDeserializer(item["subscriptionKeyParameterNames"]),
    apiType: item["type"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    isOnline: item["isOnline"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"]
      ? item["contact"]
      : apiContactInformationDeserializer(item["contact"]),
    license: !item["license"]
      ? item["license"]
      : apiLicenseInformationDeserializer(item["license"]),
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsDeserializer(item["apiVersionSet"]),
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link Protocol} that the service accepts. */
export enum KnownProtocol {
  /** http */
  Http = "http",
  /** https */
  Https = "https",
  /** ws */
  Ws = "ws",
  /** wss */
  Wss = "wss",
}

/** Type of Protocol */
export type Protocol = string;

/** An API Version Set contains the common configuration for a set of API Versions relating */
export interface ApiVersionSetContractDetails {
  /** Identifier for existing API Version Set. Omit this value to create a new Version Set. */
  id?: string;
  /** The display Name of the API Version Set. */
  name?: string;
  /** Description of API Version Set. */
  description?: string;
  /** An value that determines where the API Version identifier will be located in a HTTP request. */
  versioningScheme?: VersioningScheme;
  /** Name of query parameter that indicates the API Version if versioningScheme is set to `query`. */
  versionQueryName?: string;
  /** Name of HTTP header parameter that indicates the API Version if versioningScheme is set to `header`. */
  versionHeaderName?: string;
}

export function apiVersionSetContractDetailsSerializer(item: ApiVersionSetContractDetails): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    versioningScheme: item["versioningScheme"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
  };
}

export function apiVersionSetContractDetailsDeserializer(item: any): ApiVersionSetContractDetails {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    versioningScheme: item["versioningScheme"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
  };
}

/** An value that determines where the API Version identifier will be located in a HTTP request. */
export enum KnownVersioningScheme {
  /** The API Version is passed in a path segment. */
  Segment = "Segment",
  /** The API Version is passed in a query parameter. */
  Query = "Query",
  /** The API Version is passed in a HTTP header. */
  Header = "Header",
}

/**
 * An value that determines where the API Version identifier will be located in a HTTP request. \
 * {@link KnownVersioningScheme} can be used interchangeably with VersioningScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Segment**: The API Version is passed in a path segment. \
 * **Query**: The API Version is passed in a query parameter. \
 * **Header**: The API Version is passed in a HTTP header.
 */
export type VersioningScheme = string;

/** API base contract details. */
export interface ApiEntityBaseContract {
  /** Description of the API. May include HTML formatting tags. */
  description?: string;
  /** Collection of authentication settings included into this API. */
  authenticationSettings?: AuthenticationSettingsContract;
  /** Protocols over which API is made available. */
  subscriptionKeyParameterNames?: SubscriptionKeyParameterNamesContract;
  /** Type of API. */
  apiType?: ApiType;
  /** Describes the revision of the API. If no value is provided, default revision 1 is created */
  apiRevision?: string;
  /** Indicates the version identifier of the API if the API is versioned */
  apiVersion?: string;
  /** Indicates if API revision is current api revision. */
  isCurrent?: boolean;
  /** Indicates if API revision is accessible via the gateway. */
  readonly isOnline?: boolean;
  /** Description of the API Revision. */
  apiRevisionDescription?: string;
  /** Description of the API Version. */
  apiVersionDescription?: string;
  /** A resource identifier for the related ApiVersionSet. */
  apiVersionSetId?: string;
  /** Specifies whether an API or Product subscription is required for accessing the API. */
  subscriptionRequired?: boolean;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfServiceUrl?: string;
  /** Contact information for the API. */
  contact?: ApiContactInformation;
  /** License information for the API. */
  license?: ApiLicenseInformation;
}

export function apiEntityBaseContractSerializer(item: ApiEntityBaseContract): any {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
  };
}

export function apiEntityBaseContractDeserializer(item: any): ApiEntityBaseContract {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractDeserializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractDeserializer(item["subscriptionKeyParameterNames"]),
    apiType: item["type"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    isOnline: item["isOnline"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"]
      ? item["contact"]
      : apiContactInformationDeserializer(item["contact"]),
    license: !item["license"]
      ? item["license"]
      : apiLicenseInformationDeserializer(item["license"]),
  };
}

/** API Authentication Settings. */
export interface AuthenticationSettingsContract {
  /** OAuth2 Authentication settings */
  oAuth2?: OAuth2AuthenticationSettingsContract;
  /** OpenID Connect Authentication Settings */
  openid?: OpenIdAuthenticationSettingsContract;
  /** Collection of OAuth2 authentication settings included into this API. */
  oAuth2AuthenticationSettings?: OAuth2AuthenticationSettingsContract[];
  /** Collection of Open ID Connect authentication settings included into this API. */
  openidAuthenticationSettings?: OpenIdAuthenticationSettingsContract[];
}

export function authenticationSettingsContractSerializer(
  item: AuthenticationSettingsContract,
): any {
  return {
    oAuth2: !item["oAuth2"]
      ? item["oAuth2"]
      : oAuth2AuthenticationSettingsContractSerializer(item["oAuth2"]),
    openid: !item["openid"]
      ? item["openid"]
      : openIdAuthenticationSettingsContractSerializer(item["openid"]),
    oAuth2AuthenticationSettings: !item["oAuth2AuthenticationSettings"]
      ? item["oAuth2AuthenticationSettings"]
      : oAuth2AuthenticationSettingsContractArraySerializer(item["oAuth2AuthenticationSettings"]),
    openidAuthenticationSettings: !item["openidAuthenticationSettings"]
      ? item["openidAuthenticationSettings"]
      : openIdAuthenticationSettingsContractArraySerializer(item["openidAuthenticationSettings"]),
  };
}

export function authenticationSettingsContractDeserializer(
  item: any,
): AuthenticationSettingsContract {
  return {
    oAuth2: !item["oAuth2"]
      ? item["oAuth2"]
      : oAuth2AuthenticationSettingsContractDeserializer(item["oAuth2"]),
    openid: !item["openid"]
      ? item["openid"]
      : openIdAuthenticationSettingsContractDeserializer(item["openid"]),
    oAuth2AuthenticationSettings: !item["oAuth2AuthenticationSettings"]
      ? item["oAuth2AuthenticationSettings"]
      : oAuth2AuthenticationSettingsContractArrayDeserializer(item["oAuth2AuthenticationSettings"]),
    openidAuthenticationSettings: !item["openidAuthenticationSettings"]
      ? item["openidAuthenticationSettings"]
      : openIdAuthenticationSettingsContractArrayDeserializer(item["openidAuthenticationSettings"]),
  };
}

/** API OAuth2 Authentication settings details. */
export interface OAuth2AuthenticationSettingsContract {
  /** OAuth authorization server identifier. */
  authorizationServerId?: string;
  /** operations scope. */
  scope?: string;
}

export function oAuth2AuthenticationSettingsContractSerializer(
  item: OAuth2AuthenticationSettingsContract,
): any {
  return { authorizationServerId: item["authorizationServerId"], scope: item["scope"] };
}

export function oAuth2AuthenticationSettingsContractDeserializer(
  item: any,
): OAuth2AuthenticationSettingsContract {
  return {
    authorizationServerId: item["authorizationServerId"],
    scope: item["scope"],
  };
}

/** API OAuth2 Authentication settings details. */
export interface OpenIdAuthenticationSettingsContract {
  /** OAuth authorization server identifier. */
  openidProviderId?: string;
  /** How to send token to the server. */
  bearerTokenSendingMethods?: BearerTokenSendingMethods[];
}

export function openIdAuthenticationSettingsContractSerializer(
  item: OpenIdAuthenticationSettingsContract,
): any {
  return {
    openidProviderId: item["openidProviderId"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
  };
}

export function openIdAuthenticationSettingsContractDeserializer(
  item: any,
): OpenIdAuthenticationSettingsContract {
  return {
    openidProviderId: item["openidProviderId"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
  };
}

/** Form of an authorization grant, which the client uses to request the access token. */
export enum KnownBearerTokenSendingMethods {
  /** Access token will be transmitted in the Authorization header using Bearer schema */
  AuthorizationHeader = "authorizationHeader",
  /** Access token will be transmitted as query parameters. */
  Query = "query",
}

/**
 * Form of an authorization grant, which the client uses to request the access token. \
 * {@link KnownBearerTokenSendingMethods} can be used interchangeably with BearerTokenSendingMethods,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **authorizationHeader**: Access token will be transmitted in the Authorization header using Bearer schema \
 * **query**: Access token will be transmitted as query parameters.
 */
export type BearerTokenSendingMethods = string;

export function oAuth2AuthenticationSettingsContractArraySerializer(
  result: Array<OAuth2AuthenticationSettingsContract>,
): any[] {
  return result.map((item) => {
    return oAuth2AuthenticationSettingsContractSerializer(item);
  });
}

export function oAuth2AuthenticationSettingsContractArrayDeserializer(
  result: Array<OAuth2AuthenticationSettingsContract>,
): any[] {
  return result.map((item) => {
    return oAuth2AuthenticationSettingsContractDeserializer(item);
  });
}

export function openIdAuthenticationSettingsContractArraySerializer(
  result: Array<OpenIdAuthenticationSettingsContract>,
): any[] {
  return result.map((item) => {
    return openIdAuthenticationSettingsContractSerializer(item);
  });
}

export function openIdAuthenticationSettingsContractArrayDeserializer(
  result: Array<OpenIdAuthenticationSettingsContract>,
): any[] {
  return result.map((item) => {
    return openIdAuthenticationSettingsContractDeserializer(item);
  });
}

/** Subscription key parameter names details. */
export interface SubscriptionKeyParameterNamesContract {
  /** Subscription key header name. */
  header?: string;
  /** Subscription key query string parameter name. */
  query?: string;
}

export function subscriptionKeyParameterNamesContractSerializer(
  item: SubscriptionKeyParameterNamesContract,
): any {
  return { header: item["header"], query: item["query"] };
}

export function subscriptionKeyParameterNamesContractDeserializer(
  item: any,
): SubscriptionKeyParameterNamesContract {
  return {
    header: item["header"],
    query: item["query"],
  };
}

/** Type of API. */
export enum KnownApiType {
  /** http */
  Http = "http",
  /** soap */
  Soap = "soap",
  /** websocket */
  Websocket = "websocket",
  /** graphql */
  Graphql = "graphql",
  /** odata */
  Odata = "odata",
  /** grpc */
  Grpc = "grpc",
}

/**
 * Type of API. \
 * {@link KnownApiType} can be used interchangeably with ApiType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http** \
 * **soap** \
 * **websocket** \
 * **graphql** \
 * **odata** \
 * **grpc**
 */
export type ApiType = string;

/** API contact information */
export interface ApiContactInformation {
  /** The identifying name of the contact person/organization */
  name?: string;
  /** The URL pointing to the contact information. MUST be in the format of a URL */
  url?: string;
  /** The email address of the contact person/organization. MUST be in the format of an email address */
  email?: string;
}

export function apiContactInformationSerializer(item: ApiContactInformation): any {
  return { name: item["name"], url: item["url"], email: item["email"] };
}

export function apiContactInformationDeserializer(item: any): ApiContactInformation {
  return {
    name: item["name"],
    url: item["url"],
    email: item["email"],
  };
}

/** API license information */
export interface ApiLicenseInformation {
  /** The license name used for the API */
  name?: string;
  /** A URL to the license used for the API. MUST be in the format of a URL */
  url?: string;
}

export function apiLicenseInformationSerializer(item: ApiLicenseInformation): any {
  return { name: item["name"], url: item["url"] };
}

export function apiLicenseInformationDeserializer(item: any): ApiLicenseInformation {
  return {
    name: item["name"],
    url: item["url"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** API Create or Update Parameters. */
export interface ApiCreateOrUpdateParameter {
  /** API identifier of the source API. */
  sourceApiId?: string;
  /** API name. Must be 1 to 300 characters long. */
  displayName?: string;
  /** Absolute URL of the backend service implementing this API. Cannot be more than 2000 characters long. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path?: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
  /** Version set details */
  apiVersionSet?: ApiVersionSetContractDetails;
  /** The provisioning state */
  readonly provisioningState?: string;
  /** Description of the API. May include HTML formatting tags. */
  description?: string;
  /** Collection of authentication settings included into this API. */
  authenticationSettings?: AuthenticationSettingsContract;
  /** Protocols over which API is made available. */
  subscriptionKeyParameterNames?: SubscriptionKeyParameterNamesContract;
  /** Type of API. */
  apiType?: ApiType;
  /** Describes the revision of the API. If no value is provided, default revision 1 is created */
  apiRevision?: string;
  /** Indicates the version identifier of the API if the API is versioned */
  apiVersion?: string;
  /** Indicates if API revision is current api revision. */
  isCurrent?: boolean;
  /** Indicates if API revision is accessible via the gateway. */
  readonly isOnline?: boolean;
  /** Description of the API Revision. */
  apiRevisionDescription?: string;
  /** Description of the API Version. */
  apiVersionDescription?: string;
  /** A resource identifier for the related ApiVersionSet. */
  apiVersionSetId?: string;
  /** Specifies whether an API or Product subscription is required for accessing the API. */
  subscriptionRequired?: boolean;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfServiceUrl?: string;
  /** Contact information for the API. */
  contact?: ApiContactInformation;
  /** License information for the API. */
  license?: ApiLicenseInformation;
  /** Content value when Importing an API. */
  value?: string;
  /** Format of the Content in which the API is getting imported. New formats can be added in the future */
  format?: ContentFormat;
  /** Criteria to limit import of WSDL to a subset of the document. */
  wsdlSelector?: ApiCreateOrUpdatePropertiesWsdlSelector;
  /**
   * Type of API to create.
   * * `http` creates a REST API
   * * `soap` creates a SOAP pass-through API
   * * `websocket` creates websocket API
   * * `graphql` creates GraphQL API.
   * New types can be added in the future.
   */
  soapApiType?: SoapApiType;
  /** Strategy of translating required query parameters to template ones. By default has value 'template'. Possible values: 'template', 'query' */
  translateRequiredQueryParametersConduct?: TranslateRequiredQueryParametersConduct;
}

export function apiCreateOrUpdateParameterSerializer(item: ApiCreateOrUpdateParameter): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourceApiId",
      "displayName",
      "serviceUrl",
      "path",
      "protocols",
      "apiVersionSet",
      "description",
      "authenticationSettings",
      "subscriptionKeyParameterNames",
      "ApiType",
      "apiRevision",
      "apiVersion",
      "isCurrent",
      "apiRevisionDescription",
      "apiVersionDescription",
      "apiVersionSetId",
      "subscriptionRequired",
      "termsOfServiceUrl",
      "contact",
      "license",
      "value",
      "format",
      "wsdlSelector",
      "SoapApiType",
      "TranslateRequiredQueryParametersConduct",
    ])
      ? undefined
      : _apiCreateOrUpdateParameterPropertiesSerializer(item),
  };
}

/** API Create or Update Properties. */
export interface ApiCreateOrUpdateProperties extends ApiContractProperties {
  /** Content value when Importing an API. */
  value?: string;
  /** Format of the Content in which the API is getting imported. New formats can be added in the future */
  format?: ContentFormat;
  /** Criteria to limit import of WSDL to a subset of the document. */
  wsdlSelector?: ApiCreateOrUpdatePropertiesWsdlSelector;
  /**
   * Type of API to create.
   * * `http` creates a REST API
   * * `soap` creates a SOAP pass-through API
   * * `websocket` creates websocket API
   * * `graphql` creates GraphQL API.
   * New types can be added in the future.
   */
  soapApiType?: SoapApiType;
  /** Strategy of translating required query parameters to template ones. By default has value 'template'. Possible values: 'template', 'query' */
  translateRequiredQueryParametersConduct?: TranslateRequiredQueryParametersConduct;
}

export function apiCreateOrUpdatePropertiesSerializer(item: ApiCreateOrUpdateProperties): any {
  return {
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsSerializer(item["apiVersionSet"]),
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    value: item["value"],
    format: item["format"],
    wsdlSelector: !item["wsdlSelector"]
      ? item["wsdlSelector"]
      : apiCreateOrUpdatePropertiesWsdlSelectorSerializer(item["wsdlSelector"]),
    apiType: item["soapApiType"],
    translateRequiredQueryParameters: item["translateRequiredQueryParametersConduct"],
  };
}

/** Format of the Content in which the API is getting imported. New formats can be added in the future */
export enum KnownContentFormat {
  /** The contents are inline and Content type is a WADL document. */
  WadlXml = "wadl-xml",
  /** The WADL document is hosted on a publicly accessible internet address. */
  WadlLinkJson = "wadl-link-json",
  /** The contents are inline and Content Type is a OpenAPI 2.0 JSON Document. */
  SwaggerJson = "swagger-json",
  /** The OpenAPI 2.0 JSON document is hosted on a publicly accessible internet address. */
  SwaggerLinkJson = "swagger-link-json",
  /** The contents are inline and the document is a WSDL/Soap document. */
  Wsdl = "wsdl",
  /** The WSDL document is hosted on a publicly accessible internet address. */
  WsdlLink = "wsdl-link",
  /** The contents are inline and Content Type is a OpenAPI 3.0 YAML Document. */
  Openapi = "openapi",
  /** The contents are inline and Content Type is a OpenAPI 3.0 JSON Document. */
  OpenapiJson = "openapi+json",
  /** The OpenAPI 3.0 YAML document is hosted on a publicly accessible internet address. */
  OpenapiLink = "openapi-link",
  /** The OpenAPI 3.0 JSON document is hosted on a publicly accessible internet address. */
  OpenapiJsonLink = "openapi+json-link",
  /** The GraphQL API endpoint hosted on a publicly accessible internet address. */
  GraphqlLink = "graphql-link",
  /** The contents are inline and Content Type is a OData XML Document. */
  Odata = "odata",
  /** The OData metadata document hosted on a publicly accessible internet address. */
  OdataLink = "odata-link",
  /** The contents are inline and Content Type is a gRPC protobuf file. */
  Grpc = "grpc",
  /** The gRPC protobuf file is hosted on a publicly accessible internet address. */
  GrpcLink = "grpc-link",
}

/**
 * Format of the Content in which the API is getting imported. New formats can be added in the future \
 * {@link KnownContentFormat} can be used interchangeably with ContentFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **wadl-xml**: The contents are inline and Content type is a WADL document. \
 * **wadl-link-json**: The WADL document is hosted on a publicly accessible internet address. \
 * **swagger-json**: The contents are inline and Content Type is a OpenAPI 2.0 JSON Document. \
 * **swagger-link-json**: The OpenAPI 2.0 JSON document is hosted on a publicly accessible internet address. \
 * **wsdl**: The contents are inline and the document is a WSDL\/Soap document. \
 * **wsdl-link**: The WSDL document is hosted on a publicly accessible internet address. \
 * **openapi**: The contents are inline and Content Type is a OpenAPI 3.0 YAML Document. \
 * **openapi+json**: The contents are inline and Content Type is a OpenAPI 3.0 JSON Document. \
 * **openapi-link**: The OpenAPI 3.0 YAML document is hosted on a publicly accessible internet address. \
 * **openapi+json-link**: The OpenAPI 3.0 JSON document is hosted on a publicly accessible internet address. \
 * **graphql-link**: The GraphQL API endpoint hosted on a publicly accessible internet address. \
 * **odata**: The contents are inline and Content Type is a OData XML Document. \
 * **odata-link**: The OData metadata document hosted on a publicly accessible internet address. \
 * **grpc**: The contents are inline and Content Type is a gRPC protobuf file. \
 * **grpc-link**: The gRPC protobuf file is hosted on a publicly accessible internet address.
 */
export type ContentFormat = string;

/** Criteria to limit import of WSDL to a subset of the document. */
export interface ApiCreateOrUpdatePropertiesWsdlSelector {
  /** Name of service to import from WSDL */
  wsdlServiceName?: string;
  /** Name of endpoint(port) to import from WSDL */
  wsdlEndpointName?: string;
}

export function apiCreateOrUpdatePropertiesWsdlSelectorSerializer(
  item: ApiCreateOrUpdatePropertiesWsdlSelector,
): any {
  return { wsdlServiceName: item["wsdlServiceName"], wsdlEndpointName: item["wsdlEndpointName"] };
}

/**
 * Type of API to create.
 * * `http` creates a REST API
 * * `soap` creates a SOAP pass-through API
 * * `websocket` creates websocket API
 * * `graphql` creates GraphQL API.
 * New types can be added in the future.
 */
export enum KnownSoapApiType {
  /** Imports a SOAP API having a RESTful front end. */
  SoapToRest = "http",
  /** Imports the SOAP API having a SOAP front end. */
  SoapPassThrough = "soap",
  /** Imports the API having a Websocket front end. */
  WebSocket = "websocket",
  /** Imports the API having a GraphQL front end. */
  GraphQL = "graphql",
  /** Imports the API having a OData front end. */
  OData = "odata",
  /** Imports the API having a gRPC front end. */
  GRPC = "grpc",
}

/**
 * Type of API to create.
 * * `http` creates a REST API
 * * `soap` creates a SOAP pass-through API
 * * `websocket` creates websocket API
 * * `graphql` creates GraphQL API.
 * New types can be added in the future. \
 * {@link KnownSoapApiType} can be used interchangeably with SoapApiType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http**: Imports a SOAP API having a RESTful front end. \
 * **soap**: Imports the SOAP API having a SOAP front end. \
 * **websocket**: Imports the API having a Websocket front end. \
 * **graphql**: Imports the API having a GraphQL front end. \
 * **odata**: Imports the API having a OData front end. \
 * **grpc**: Imports the API having a gRPC front end.
 */
export type SoapApiType = string;

/** Strategy of translating required query parameters to template ones. By default has value 'template'. Possible values: 'template', 'query' */
export enum KnownTranslateRequiredQueryParametersConduct {
  /** Translates required query parameters to template ones. Is a default value */
  Template = "template",
  /** Leaves required query parameters as they are (no translation done). */
  Query = "query",
}

/**
 * Strategy of translating required query parameters to template ones. By default has value 'template'. Possible values: 'template', 'query' \
 * {@link KnownTranslateRequiredQueryParametersConduct} can be used interchangeably with TranslateRequiredQueryParametersConduct,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **template**: Translates required query parameters to template ones. Is a default value \
 * **query**: Leaves required query parameters as they are (no translation done).
 */
export type TranslateRequiredQueryParametersConduct = string;

/** API update contract details. */
export interface ApiUpdateContract {
  /** Description of the API. May include HTML formatting tags. */
  description?: string;
  /** Collection of authentication settings included into this API. */
  authenticationSettings?: AuthenticationSettingsContract;
  /** Protocols over which API is made available. */
  subscriptionKeyParameterNames?: SubscriptionKeyParameterNamesContract;
  /** Type of API. */
  apiType?: ApiType;
  /** Describes the revision of the API. If no value is provided, default revision 1 is created */
  apiRevision?: string;
  /** Indicates the version identifier of the API if the API is versioned */
  apiVersion?: string;
  /** Indicates if API revision is current api revision. */
  isCurrent?: boolean;
  /** Indicates if API revision is accessible via the gateway. */
  readonly isOnline?: boolean;
  /** Description of the API Revision. */
  apiRevisionDescription?: string;
  /** Description of the API Version. */
  apiVersionDescription?: string;
  /** A resource identifier for the related ApiVersionSet. */
  apiVersionSetId?: string;
  /** Specifies whether an API or Product subscription is required for accessing the API. */
  subscriptionRequired?: boolean;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfServiceUrl?: string;
  /** Contact information for the API. */
  contact?: ApiContactInformation;
  /** License information for the API. */
  license?: ApiLicenseInformation;
  /** API name. */
  displayName?: string;
  /** Absolute URL of the backend service implementing this API. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path?: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
}

export function apiUpdateContractSerializer(item: ApiUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "authenticationSettings",
      "subscriptionKeyParameterNames",
      "ApiType",
      "apiRevision",
      "apiVersion",
      "isCurrent",
      "apiRevisionDescription",
      "apiVersionDescription",
      "apiVersionSetId",
      "subscriptionRequired",
      "termsOfServiceUrl",
      "contact",
      "license",
      "displayName",
      "serviceUrl",
      "path",
      "protocols",
    ])
      ? undefined
      : _apiUpdateContractPropertiesSerializer(item),
  };
}

/** API update contract properties. */
export interface ApiContractUpdateProperties extends ApiEntityBaseContract {
  /** API name. */
  displayName?: string;
  /** Absolute URL of the backend service implementing this API. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path?: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
}

export function apiContractUpdatePropertiesSerializer(item: ApiContractUpdateProperties): any {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged API list representation. */
export interface _ApiCollection {
  /** Page values. */
  readonly value?: ApiContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _apiCollectionDeserializer(item: any): _ApiCollection {
  return {
    value: !item["value"] ? item["value"] : apiContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function apiContractArrayDeserializer(result: Array<ApiContract>): any[] {
  return result.map((item) => {
    return apiContractDeserializer(item);
  });
}

/** A request to perform the connectivity check operation on a API Management service. */
export interface ConnectivityCheckRequest {
  /** Definitions about the connectivity check origin. */
  source: ConnectivityCheckRequestSource;
  /** The connectivity check operation destination. */
  destination: ConnectivityCheckRequestDestination;
  /** The IP version to be used. Only IPv4 is supported for now. */
  preferredIPVersion?: PreferredIPVersion;
  /** The request's protocol. Specific protocol configuration can be available based on this selection. The specified destination address must be coherent with this value. */
  protocol?: ConnectivityCheckProtocol;
  /** Protocol-specific configuration. */
  protocolConfiguration?: ConnectivityCheckRequestProtocolConfiguration;
}

export function connectivityCheckRequestSerializer(item: ConnectivityCheckRequest): any {
  return {
    source: connectivityCheckRequestSourceSerializer(item["source"]),
    destination: connectivityCheckRequestDestinationSerializer(item["destination"]),
    preferredIPVersion: item["preferredIPVersion"],
    protocol: item["protocol"],
    protocolConfiguration: !item["protocolConfiguration"]
      ? item["protocolConfiguration"]
      : connectivityCheckRequestProtocolConfigurationSerializer(item["protocolConfiguration"]),
  };
}

/** Definitions about the connectivity check origin. */
export interface ConnectivityCheckRequestSource {
  /** The API Management service region from where to start the connectivity check operation. */
  region: string;
  /** The particular VMSS instance from which to fire the request. */
  instance?: number;
}

export function connectivityCheckRequestSourceSerializer(
  item: ConnectivityCheckRequestSource,
): any {
  return { region: item["region"], instance: item["instance"] };
}

/** The connectivity check operation destination. */
export interface ConnectivityCheckRequestDestination {
  /** Destination address. Can either be an IP address or a FQDN. */
  address: string;
  /** Destination port. */
  port: number;
}

export function connectivityCheckRequestDestinationSerializer(
  item: ConnectivityCheckRequestDestination,
): any {
  return { address: item["address"], port: item["port"] };
}

/** The IP version to be used. Only IPv4 is supported for now. */
export enum KnownPreferredIPVersion {
  /** IPv4 */
  IPv4 = "IPv4",
}

/**
 * The IP version to be used. Only IPv4 is supported for now. \
 * {@link KnownPreferredIPVersion} can be used interchangeably with PreferredIPVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**
 */
export type PreferredIPVersion = string;

/** The request's protocol. Specific protocol configuration can be available based on this selection. The specified destination address must be coherent with this value. */
export enum KnownConnectivityCheckProtocol {
  /** TCP */
  TCP = "TCP",
  /** HTTP */
  Http = "HTTP",
  /** HTTPS */
  Https = "HTTPS",
}

/**
 * The request's protocol. Specific protocol configuration can be available based on this selection. The specified destination address must be coherent with this value. \
 * {@link KnownConnectivityCheckProtocol} can be used interchangeably with ConnectivityCheckProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP** \
 * **HTTP** \
 * **HTTPS**
 */
export type ConnectivityCheckProtocol = string;

/** Protocol-specific configuration. */
export interface ConnectivityCheckRequestProtocolConfiguration {
  /** Configuration for HTTP or HTTPS requests. */
  httpConfiguration?: ConnectivityCheckRequestProtocolConfigurationHttpConfiguration;
}

export function connectivityCheckRequestProtocolConfigurationSerializer(
  item: ConnectivityCheckRequestProtocolConfiguration,
): any {
  return {
    HTTPConfiguration: !item["httpConfiguration"]
      ? item["httpConfiguration"]
      : connectivityCheckRequestProtocolConfigurationHttpConfigurationSerializer(
          item["httpConfiguration"],
        ),
  };
}

/** Configuration for HTTP or HTTPS requests. */
export interface ConnectivityCheckRequestProtocolConfigurationHttpConfiguration {
  /** The HTTP method to be used. */
  method?: Method;
  /** List of HTTP status codes considered valid for the request response. */
  validStatusCodes?: number[];
  /** List of headers to be included in the request. */
  headers?: HttpHeader[];
}

export function connectivityCheckRequestProtocolConfigurationHttpConfigurationSerializer(
  item: ConnectivityCheckRequestProtocolConfigurationHttpConfiguration,
): any {
  return {
    method: item["method"],
    validStatusCodes: !item["validStatusCodes"]
      ? item["validStatusCodes"]
      : item["validStatusCodes"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"] ? item["headers"] : httpHeaderArraySerializer(item["headers"]),
  };
}

/** The HTTP method to be used. */
export enum KnownMethod {
  /** GET */
  GET = "GET",
  /** POST */
  Post = "POST",
}

/**
 * The HTTP method to be used. \
 * {@link KnownMethod} can be used interchangeably with Method,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GET** \
 * **POST**
 */
export type Method = string;

export function httpHeaderArraySerializer(result: Array<HttpHeader>): any[] {
  return result.map((item) => {
    return httpHeaderSerializer(item);
  });
}

/** HTTP header and it's value. */
export interface HttpHeader {
  /** Header name. */
  name: string;
  /** Header value. */
  value: string;
}

export function httpHeaderSerializer(item: HttpHeader): any {
  return { name: item["name"], value: item["value"] };
}

/** Information on the connectivity status. */
export interface ConnectivityCheckResponse {
  /** List of hops between the source and the destination. */
  readonly hops?: ConnectivityHop[];
  /** The connection status. */
  readonly connectionStatus?: ConnectionStatus;
  /** Average latency in milliseconds. */
  readonly avgLatencyInMs?: number;
  /** Minimum latency in milliseconds. */
  readonly minLatencyInMs?: number;
  /** Maximum latency in milliseconds. */
  readonly maxLatencyInMs?: number;
  /** Total number of probes sent. */
  readonly probesSent?: number;
  /** Number of failed probes. */
  readonly probesFailed?: number;
}

export function connectivityCheckResponseDeserializer(item: any): ConnectivityCheckResponse {
  return {
    hops: !item["hops"] ? item["hops"] : connectivityHopArrayDeserializer(item["hops"]),
    connectionStatus: item["connectionStatus"],
    avgLatencyInMs: item["avgLatencyInMs"],
    minLatencyInMs: item["minLatencyInMs"],
    maxLatencyInMs: item["maxLatencyInMs"],
    probesSent: item["probesSent"],
    probesFailed: item["probesFailed"],
  };
}

export function connectivityHopArrayDeserializer(result: Array<ConnectivityHop>): any[] {
  return result.map((item) => {
    return connectivityHopDeserializer(item);
  });
}

/** Information about a hop between the source and the destination. */
export interface ConnectivityHop {
  /** The type of the hop. */
  readonly type?: string;
  /** The ID of the hop. */
  readonly id?: string;
  /** The IP address of the hop. */
  readonly address?: string;
  /** The ID of the resource corresponding to this hop. */
  readonly resourceId?: string;
  /** List of next hop identifiers. */
  readonly nextHopIds?: string[];
  /** List of issues. */
  readonly issues?: ConnectivityIssue[];
}

export function connectivityHopDeserializer(item: any): ConnectivityHop {
  return {
    type: item["type"],
    id: item["id"],
    address: item["address"],
    resourceId: item["resourceId"],
    nextHopIds: !item["nextHopIds"]
      ? item["nextHopIds"]
      : item["nextHopIds"].map((p: any) => {
          return p;
        }),
    issues: !item["issues"] ? item["issues"] : connectivityIssueArrayDeserializer(item["issues"]),
  };
}

export function connectivityIssueArrayDeserializer(result: Array<ConnectivityIssue>): any[] {
  return result.map((item) => {
    return connectivityIssueDeserializer(item);
  });
}

/** Information about an issue encountered in the process of checking for connectivity. */
export interface ConnectivityIssue {
  /** The origin of the issue. */
  readonly origin?: Origin;
  /** The severity of the issue. */
  readonly severity?: Severity;
  /** The type of issue. */
  readonly type?: IssueType;
  /** Provides additional context on the issue. */
  readonly context?: Record<string, string>[];
}

export function connectivityIssueDeserializer(item: any): ConnectivityIssue {
  return {
    origin: item["origin"],
    severity: item["severity"],
    type: item["type"],
    context: !item["context"]
      ? item["context"]
      : item["context"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
  };
}

/** The origin of the issue. */
export enum KnownOrigin {
  /** Local */
  Local = "Local",
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * The origin of the issue. \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local** \
 * **Inbound** \
 * **Outbound**
 */
export type Origin = string;

/** The severity of the issue. */
export enum KnownSeverity {
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
}

/**
 * The severity of the issue. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error** \
 * **Warning**
 */
export type Severity = string;

/** The type of issue. */
export enum KnownIssueType {
  /** Unknown */
  Unknown = "Unknown",
  /** AgentStopped */
  AgentStopped = "AgentStopped",
  /** GuestFirewall */
  GuestFirewall = "GuestFirewall",
  /** DnsResolution */
  DnsResolution = "DnsResolution",
  /** SocketBind */
  SocketBind = "SocketBind",
  /** NetworkSecurityRule */
  NetworkSecurityRule = "NetworkSecurityRule",
  /** UserDefinedRoute */
  UserDefinedRoute = "UserDefinedRoute",
  /** PortThrottled */
  PortThrottled = "PortThrottled",
  /** Platform */
  Platform = "Platform",
}

/**
 * The type of issue. \
 * {@link KnownIssueType} can be used interchangeably with IssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **AgentStopped** \
 * **GuestFirewall** \
 * **DnsResolution** \
 * **SocketBind** \
 * **NetworkSecurityRule** \
 * **UserDefinedRoute** \
 * **PortThrottled** \
 * **Platform**
 */
export type IssueType = string;

/** The connection status. */
export enum KnownConnectionStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Degraded */
  Degraded = "Degraded",
}

/**
 * The connection status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Connected** \
 * **Disconnected** \
 * **Degraded**
 */
export type ConnectionStatus = string;

/** ApiRelease details. */
export interface ApiReleaseContract extends ProxyResource {
  /** Identifier of the API the release belongs to. */
  apiId?: string;
  /** The time the API was released. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly createdDateTime?: Date;
  /** The time the API release was updated. */
  readonly updatedDateTime?: Date;
  /** Release Notes */
  notes?: string;
}

export function apiReleaseContractSerializer(item: ApiReleaseContract): any {
  return {
    properties: areAllPropsUndefined(item, ["apiId", "notes"])
      ? undefined
      : _apiReleaseContractPropertiesSerializer(item),
  };
}

export function apiReleaseContractDeserializer(item: any): ApiReleaseContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _apiReleaseContractPropertiesDeserializer(item["properties"])),
  };
}

/** API Release details */
export interface ApiReleaseContractProperties {
  /** Identifier of the API the release belongs to. */
  apiId?: string;
  /** The time the API was released. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly createdDateTime?: Date;
  /** The time the API release was updated. */
  readonly updatedDateTime?: Date;
  /** Release Notes */
  notes?: string;
}

export function apiReleaseContractPropertiesSerializer(item: ApiReleaseContractProperties): any {
  return { apiId: item["apiId"], notes: item["notes"] };
}

export function apiReleaseContractPropertiesDeserializer(item: any): ApiReleaseContractProperties {
  return {
    apiId: item["apiId"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    updatedDateTime: !item["updatedDateTime"]
      ? item["updatedDateTime"]
      : new Date(item["updatedDateTime"]),
    notes: item["notes"],
  };
}

/** Paged ApiRelease list representation. */
export interface _ApiReleaseCollection {
  /** Page values. */
  readonly value?: ApiReleaseContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _apiReleaseCollectionDeserializer(item: any): _ApiReleaseCollection {
  return {
    value: !item["value"] ? item["value"] : apiReleaseContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function apiReleaseContractArraySerializer(result: Array<ApiReleaseContract>): any[] {
  return result.map((item) => {
    return apiReleaseContractSerializer(item);
  });
}

export function apiReleaseContractArrayDeserializer(result: Array<ApiReleaseContract>): any[] {
  return result.map((item) => {
    return apiReleaseContractDeserializer(item);
  });
}

/** API Operation details. */
export interface OperationContract extends ProxyResource {
  /** Collection of URL template parameters. */
  templateParameters?: ParameterContract[];
  /** Description of the operation. May include HTML formatting tags. */
  description?: string;
  /** An entity containing request details. */
  request?: RequestContract;
  /** Array of Operation responses. */
  responses?: ResponseContract[];
  /** Operation Policies */
  policies?: string;
  /** Operation Name. */
  displayName?: string;
  /** A Valid HTTP Operation Method. Typical Http Methods like GET, PUT, POST but not limited by only them. */
  method?: string;
  /** Relative URL template identifying the target resource for this operation. May include parameters. Example: /customers/{cid}/orders/{oid}/?date={date} */
  urlTemplate?: string;
}

export function operationContractSerializer(item: OperationContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "templateParameters",
      "description",
      "request",
      "responses",
      "policies",
      "displayName",
      "method",
      "urlTemplate",
    ])
      ? undefined
      : _operationContractPropertiesSerializer(item),
  };
}

export function operationContractDeserializer(item: any): OperationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _operationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Operation Contract Properties */
export interface OperationContractProperties extends OperationEntityBaseContract {
  /** Operation Name. */
  displayName: string;
  /** A Valid HTTP Operation Method. Typical Http Methods like GET, PUT, POST but not limited by only them. */
  method: string;
  /** Relative URL template identifying the target resource for this operation. May include parameters. Example: /customers/{cid}/orders/{oid}/?date={date} */
  urlTemplate: string;
}

export function operationContractPropertiesSerializer(item: OperationContractProperties): any {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArraySerializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractSerializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArraySerializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

export function operationContractPropertiesDeserializer(item: any): OperationContractProperties {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArrayDeserializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractDeserializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArrayDeserializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

/** API Operation Entity Base Contract details. */
export interface OperationEntityBaseContract {
  /** Collection of URL template parameters. */
  templateParameters?: ParameterContract[];
  /** Description of the operation. May include HTML formatting tags. */
  description?: string;
  /** An entity containing request details. */
  request?: RequestContract;
  /** Array of Operation responses. */
  responses?: ResponseContract[];
  /** Operation Policies */
  policies?: string;
}

export function operationEntityBaseContractSerializer(item: OperationEntityBaseContract): any {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArraySerializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractSerializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArraySerializer(item["responses"]),
    policies: item["policies"],
  };
}

export function operationEntityBaseContractDeserializer(item: any): OperationEntityBaseContract {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArrayDeserializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractDeserializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArrayDeserializer(item["responses"]),
    policies: item["policies"],
  };
}

export function parameterContractArraySerializer(result: Array<ParameterContract>): any[] {
  return result.map((item) => {
    return parameterContractSerializer(item);
  });
}

export function parameterContractArrayDeserializer(result: Array<ParameterContract>): any[] {
  return result.map((item) => {
    return parameterContractDeserializer(item);
  });
}

/** Operation parameters details. */
export interface ParameterContract {
  /** Parameter name. */
  name: string;
  /** Parameter description. */
  description?: string;
  /** Parameter type. */
  type: string;
  /** Default parameter value. */
  defaultValue?: string;
  /** Specifies whether parameter is required or not. */
  required?: boolean;
  /** Parameter values. */
  values?: string[];
  /** Schema identifier. */
  schemaId?: string;
  /** Type name defined by the schema. */
  typeName?: string;
  /** Exampled defined for the parameter. */
  examples?: Record<string, ParameterExampleContract>;
}

export function parameterContractSerializer(item: ParameterContract): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    defaultValue: item["defaultValue"],
    required: item["required"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    schemaId: item["schemaId"],
    typeName: item["typeName"],
    examples: !item["examples"]
      ? item["examples"]
      : parameterExampleContractRecordSerializer(item["examples"]),
  };
}

export function parameterContractDeserializer(item: any): ParameterContract {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    defaultValue: item["defaultValue"],
    required: item["required"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    schemaId: item["schemaId"],
    typeName: item["typeName"],
    examples: !item["examples"]
      ? item["examples"]
      : parameterExampleContractRecordDeserializer(item["examples"]),
  };
}

export function parameterExampleContractRecordSerializer(
  item: Record<string, ParameterExampleContract>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterExampleContractSerializer(item[key]);
  });
  return result;
}

export function parameterExampleContractRecordDeserializer(
  item: Record<string, any>,
): Record<string, ParameterExampleContract> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterExampleContractDeserializer(item[key]);
  });
  return result;
}

/** Parameter example. */
export interface ParameterExampleContract {
  /** Short description for the example */
  summary?: string;
  /** Long description for the example */
  description?: string;
  /** Example value. May be a primitive value, or an object. */
  value?: any;
  /** A URL that points to the literal example */
  externalValue?: string;
}

export function parameterExampleContractSerializer(item: ParameterExampleContract): any {
  return {
    summary: item["summary"],
    description: item["description"],
    value: item["value"],
    externalValue: item["externalValue"],
  };
}

export function parameterExampleContractDeserializer(item: any): ParameterExampleContract {
  return {
    summary: item["summary"],
    description: item["description"],
    value: item["value"],
    externalValue: item["externalValue"],
  };
}

/** Operation request details. */
export interface RequestContract {
  /** Operation request description. */
  description?: string;
  /** Collection of operation request query parameters. */
  queryParameters?: ParameterContract[];
  /** Collection of operation request headers. */
  headers?: ParameterContract[];
  /** Collection of operation request representations. */
  representations?: RepresentationContract[];
}

export function requestContractSerializer(item: RequestContract): any {
  return {
    description: item["description"],
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : parameterContractArraySerializer(item["queryParameters"]),
    headers: !item["headers"] ? item["headers"] : parameterContractArraySerializer(item["headers"]),
    representations: !item["representations"]
      ? item["representations"]
      : representationContractArraySerializer(item["representations"]),
  };
}

export function requestContractDeserializer(item: any): RequestContract {
  return {
    description: item["description"],
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : parameterContractArrayDeserializer(item["queryParameters"]),
    headers: !item["headers"]
      ? item["headers"]
      : parameterContractArrayDeserializer(item["headers"]),
    representations: !item["representations"]
      ? item["representations"]
      : representationContractArrayDeserializer(item["representations"]),
  };
}

export function representationContractArraySerializer(
  result: Array<RepresentationContract>,
): any[] {
  return result.map((item) => {
    return representationContractSerializer(item);
  });
}

export function representationContractArrayDeserializer(
  result: Array<RepresentationContract>,
): any[] {
  return result.map((item) => {
    return representationContractDeserializer(item);
  });
}

/** Operation request/response representation details. */
export interface RepresentationContract {
  /** Specifies a registered or custom content type for this representation, e.g. application/xml. */
  contentType: string;
  /** Schema identifier. Applicable only if 'contentType' value is neither 'application/x-www-form-urlencoded' nor 'multipart/form-data'. */
  schemaId?: string;
  /** Type name defined by the schema. Applicable only if 'contentType' value is neither 'application/x-www-form-urlencoded' nor 'multipart/form-data'. */
  typeName?: string;
  /** Collection of form parameters. Required if 'contentType' value is either 'application/x-www-form-urlencoded' or 'multipart/form-data'.. */
  formParameters?: ParameterContract[];
  /** Exampled defined for the representation. */
  examples?: Record<string, ParameterExampleContract>;
}

export function representationContractSerializer(item: RepresentationContract): any {
  return {
    contentType: item["contentType"],
    schemaId: item["schemaId"],
    typeName: item["typeName"],
    formParameters: !item["formParameters"]
      ? item["formParameters"]
      : parameterContractArraySerializer(item["formParameters"]),
    examples: !item["examples"]
      ? item["examples"]
      : parameterExampleContractRecordSerializer(item["examples"]),
  };
}

export function representationContractDeserializer(item: any): RepresentationContract {
  return {
    contentType: item["contentType"],
    schemaId: item["schemaId"],
    typeName: item["typeName"],
    formParameters: !item["formParameters"]
      ? item["formParameters"]
      : parameterContractArrayDeserializer(item["formParameters"]),
    examples: !item["examples"]
      ? item["examples"]
      : parameterExampleContractRecordDeserializer(item["examples"]),
  };
}

export function responseContractArraySerializer(result: Array<ResponseContract>): any[] {
  return result.map((item) => {
    return responseContractSerializer(item);
  });
}

export function responseContractArrayDeserializer(result: Array<ResponseContract>): any[] {
  return result.map((item) => {
    return responseContractDeserializer(item);
  });
}

/** Operation response details. */
export interface ResponseContract {
  /** Operation response HTTP status code. */
  statusCode: number;
  /** Operation response description. */
  description?: string;
  /** Collection of operation response representations. */
  representations?: RepresentationContract[];
  /** Collection of operation response headers. */
  headers?: ParameterContract[];
}

export function responseContractSerializer(item: ResponseContract): any {
  return {
    statusCode: item["statusCode"],
    description: item["description"],
    representations: !item["representations"]
      ? item["representations"]
      : representationContractArraySerializer(item["representations"]),
    headers: !item["headers"] ? item["headers"] : parameterContractArraySerializer(item["headers"]),
  };
}

export function responseContractDeserializer(item: any): ResponseContract {
  return {
    statusCode: item["statusCode"],
    description: item["description"],
    representations: !item["representations"]
      ? item["representations"]
      : representationContractArrayDeserializer(item["representations"]),
    headers: !item["headers"]
      ? item["headers"]
      : parameterContractArrayDeserializer(item["headers"]),
  };
}

/** API Operation Update Contract details. */
export interface OperationUpdateContract {
  /** Collection of URL template parameters. */
  templateParameters?: ParameterContract[];
  /** Description of the operation. May include HTML formatting tags. */
  description?: string;
  /** An entity containing request details. */
  request?: RequestContract;
  /** Array of Operation responses. */
  responses?: ResponseContract[];
  /** Operation Policies */
  policies?: string;
  /** Operation Name. */
  displayName?: string;
  /** A Valid HTTP Operation Method. Typical Http Methods like GET, PUT, POST but not limited by only them. */
  method?: string;
  /** Relative URL template identifying the target resource for this operation. May include parameters. Example: /customers/{cid}/orders/{oid}/?date={date} */
  urlTemplate?: string;
}

export function operationUpdateContractSerializer(item: OperationUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "templateParameters",
      "description",
      "request",
      "responses",
      "policies",
      "displayName",
      "method",
      "urlTemplate",
    ])
      ? undefined
      : _operationUpdateContractPropertiesSerializer(item),
  };
}

/** Operation Update Contract Properties. */
export interface OperationUpdateContractProperties extends OperationEntityBaseContract {
  /** Operation Name. */
  displayName?: string;
  /** A Valid HTTP Operation Method. Typical Http Methods like GET, PUT, POST but not limited by only them. */
  method?: string;
  /** Relative URL template identifying the target resource for this operation. May include parameters. Example: /customers/{cid}/orders/{oid}/?date={date} */
  urlTemplate?: string;
}

export function operationUpdateContractPropertiesSerializer(
  item: OperationUpdateContractProperties,
): any {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArraySerializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractSerializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArraySerializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

/** Paged Operation list representation. */
export interface _OperationCollection {
  /** Page values. */
  readonly value?: OperationContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _operationCollectionDeserializer(item: any): _OperationCollection {
  return {
    value: !item["value"] ? item["value"] : operationContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function operationContractArraySerializer(result: Array<OperationContract>): any[] {
  return result.map((item) => {
    return operationContractSerializer(item);
  });
}

export function operationContractArrayDeserializer(result: Array<OperationContract>): any[] {
  return result.map((item) => {
    return operationContractDeserializer(item);
  });
}

/** Policy Contract details. */
export interface PolicyContract extends ProxyResource {
  /** Contents of the Policy as defined by the format. */
  value?: string;
  /** Format of the policyContent. */
  format?: PolicyContentFormat;
}

export function policyContractSerializer(item: PolicyContract): any {
  return {
    properties: areAllPropsUndefined(item, ["value", "format"])
      ? undefined
      : _policyContractPropertiesSerializer(item),
  };
}

export function policyContractDeserializer(item: any): PolicyContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyContractPropertiesDeserializer(item["properties"])),
  };
}

/** Policy contract Properties. */
export interface PolicyContractProperties {
  /** Contents of the Policy as defined by the format. */
  value: string;
  /** Format of the policyContent. */
  format?: PolicyContentFormat;
}

export function policyContractPropertiesSerializer(item: PolicyContractProperties): any {
  return { value: item["value"], format: item["format"] };
}

export function policyContractPropertiesDeserializer(item: any): PolicyContractProperties {
  return {
    value: item["value"],
    format: item["format"],
  };
}

/** Format of the policyContent. */
export enum KnownPolicyContentFormat {
  /** The contents are inline and Content type is an XML document. */
  Xml = "xml",
  /** The policy XML document is hosted on a HTTP endpoint accessible from the API Management service. */
  XmlLink = "xml-link",
  /** The contents are inline and Content type is a non XML encoded policy document. */
  Rawxml = "rawxml",
  /** The policy document is not XML encoded and is hosted on a HTTP endpoint accessible from the API Management service. */
  RawxmlLink = "rawxml-link",
}

/**
 * Format of the policyContent. \
 * {@link KnownPolicyContentFormat} can be used interchangeably with PolicyContentFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **xml**: The contents are inline and Content type is an XML document. \
 * **xml-link**: The policy XML document is hosted on a HTTP endpoint accessible from the API Management service. \
 * **rawxml**: The contents are inline and Content type is a non XML encoded policy document. \
 * **rawxml-link**: The policy document is not XML encoded and is hosted on a HTTP endpoint accessible from the API Management service.
 */
export type PolicyContentFormat = string;

/** Known values of {@link PolicyIdName} that the service accepts. */
export enum KnownPolicyIdName {
  /** policy */
  Policy = "policy",
}

/** Type of PolicyIdName */
export type PolicyIdName = string;

/** The response of the list policy operation. */
export interface _PolicyCollection {
  /** Policy Contract value. */
  value?: PolicyContract[];
  /** Total record count number. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _policyCollectionDeserializer(item: any): _PolicyCollection {
  return {
    value: !item["value"] ? item["value"] : policyContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function policyContractArraySerializer(result: Array<PolicyContract>): any[] {
  return result.map((item) => {
    return policyContractSerializer(item);
  });
}

export function policyContractArrayDeserializer(result: Array<PolicyContract>): any[] {
  return result.map((item) => {
    return policyContractDeserializer(item);
  });
}

/** Tag Contract details. */
export interface TagContract extends ProxyResource {
  /** Tag name. */
  displayName?: string;
}

export function tagContractDeserializer(item: any): TagContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tag contract Properties. */
export interface TagContractProperties {
  /** Tag name. */
  displayName: string;
}

export function tagContractPropertiesSerializer(item: TagContractProperties): any {
  return { displayName: item["displayName"] };
}

export function tagContractPropertiesDeserializer(item: any): TagContractProperties {
  return {
    displayName: item["displayName"],
  };
}

/** Paged Tag list representation. */
export interface _TagCollection {
  /** Page values. */
  value?: TagContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagCollectionDeserializer(item: any): _TagCollection {
  return {
    value: !item["value"] ? item["value"] : tagContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagContractArrayDeserializer(result: Array<TagContract>): any[] {
  return result.map((item) => {
    return tagContractDeserializer(item);
  });
}

/** Parameters supplied to Create/Update Tag operations. */
export interface TagCreateUpdateParameters {
  /** Tag name. */
  displayName?: string;
}

export function tagCreateUpdateParametersSerializer(item: TagCreateUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName"])
      ? undefined
      : _tagCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** API Schema Contract details. */
export interface SchemaContract extends ProxyResource {
  /** Must be a valid a media type used in a Content-Type header as defined in the RFC 2616. Media type of the schema document (e.g. application/json, application/xml). </br> - `Swagger` Schema use `application/vnd.ms-azure-apim.swagger.definitions+json` </br> - `WSDL` Schema use `application/vnd.ms-azure-apim.xsd+xml` </br> - `OpenApi` Schema use `application/vnd.oai.openapi.components+json` </br> - `WADL Schema` use `application/vnd.ms-azure-apim.wadl.grammars+xml` </br> - `OData Schema` use `application/vnd.ms-azure-apim.odata.schema` </br> - `gRPC Schema` use `text/protobuf`. */
  contentType?: string;
  /** Create or update Properties of the API Schema Document. */
  document?: SchemaDocumentProperties;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function schemaContractSerializer(item: SchemaContract): any {
  return {
    properties: areAllPropsUndefined(item, ["contentType", "document"])
      ? undefined
      : _schemaContractPropertiesSerializer(item),
  };
}

export function schemaContractDeserializer(item: any): SchemaContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _schemaContractPropertiesDeserializer(item["properties"])),
  };
}

/** API Schema create or update contract Properties. */
export interface SchemaContractProperties {
  /** Must be a valid a media type used in a Content-Type header as defined in the RFC 2616. Media type of the schema document (e.g. application/json, application/xml). </br> - `Swagger` Schema use `application/vnd.ms-azure-apim.swagger.definitions+json` </br> - `WSDL` Schema use `application/vnd.ms-azure-apim.xsd+xml` </br> - `OpenApi` Schema use `application/vnd.oai.openapi.components+json` </br> - `WADL Schema` use `application/vnd.ms-azure-apim.wadl.grammars+xml` </br> - `OData Schema` use `application/vnd.ms-azure-apim.odata.schema` </br> - `gRPC Schema` use `text/protobuf`. */
  contentType: string;
  /** The provisioning state */
  readonly provisioningState?: string;
  /** Json escaped string defining the document representing the Schema. Used for schemas other than Swagger/OpenAPI. */
  value?: string;
  /** Types definitions. Used for Swagger/OpenAPI v1 schemas only, null otherwise. */
  definitions?: any;
  /** Types definitions. Used for Swagger/OpenAPI v2/v3 schemas only, null otherwise. */
  components?: any;
}

export function schemaContractPropertiesSerializer(item: SchemaContractProperties): any {
  return {
    contentType: item["contentType"],
    document: _schemaContractPropertiesDocumentSerializer(item),
  };
}

export function schemaContractPropertiesDeserializer(item: any): SchemaContractProperties {
  return {
    contentType: item["contentType"],
    ..._schemaContractPropertiesDocumentDeserializer(item["document"]),
    provisioningState: item["provisioningState"],
  };
}

/** Api Schema Document Properties. */
export interface SchemaDocumentProperties {
  /** Json escaped string defining the document representing the Schema. Used for schemas other than Swagger/OpenAPI. */
  value?: string;
  /** Types definitions. Used for Swagger/OpenAPI v1 schemas only, null otherwise. */
  definitions?: any;
  /** Types definitions. Used for Swagger/OpenAPI v2/v3 schemas only, null otherwise. */
  components?: any;
}

export function schemaDocumentPropertiesSerializer(item: SchemaDocumentProperties): any {
  return { value: item["value"], definitions: item["definitions"], components: item["components"] };
}

export function schemaDocumentPropertiesDeserializer(item: any): SchemaDocumentProperties {
  return {
    value: item["value"],
    definitions: item["definitions"],
    components: item["components"],
  };
}

/** The response of the list schema operation. */
export interface _SchemaCollection {
  /** API Schema Contract value. */
  readonly value?: SchemaContract[];
  /** Total record count number. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _schemaCollectionDeserializer(item: any): _SchemaCollection {
  return {
    value: !item["value"] ? item["value"] : schemaContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function schemaContractArraySerializer(result: Array<SchemaContract>): any[] {
  return result.map((item) => {
    return schemaContractSerializer(item);
  });
}

export function schemaContractArrayDeserializer(result: Array<SchemaContract>): any[] {
  return result.map((item) => {
    return schemaContractDeserializer(item);
  });
}

/** Diagnostic details. */
export interface DiagnosticContract extends ProxyResource {
  /** Specifies for what type of messages sampling settings should not apply. */
  alwaysLog?: AlwaysLog;
  /** Resource Id of a target logger. */
  loggerId?: string;
  /** Sampling settings for Diagnostic. */
  sampling?: SamplingSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Gateway. */
  frontend?: PipelineDiagnosticSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Backend */
  backend?: PipelineDiagnosticSettings;
  /** Large Language Models diagnostic settings */
  largeLanguageModel?: LLMDiagnosticSettings;
  /** Log the ClientIP. Default is false. */
  logClientIp?: boolean;
  /** Sets correlation protocol to use for Application Insights diagnostics. */
  httpCorrelationProtocol?: HttpCorrelationProtocol;
  /** The verbosity level applied to traces emitted by trace policies. */
  verbosity?: Verbosity;
  /** The format of the Operation Name for Application Insights telemetries. Default is Name. */
  operationNameFormat?: OperationNameFormat;
  /** Emit custom metrics via emit-metric policy. Applicable only to Application Insights diagnostic settings. */
  metrics?: boolean;
}

export function diagnosticContractSerializer(item: DiagnosticContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "alwaysLog",
      "loggerId",
      "sampling",
      "frontend",
      "backend",
      "largeLanguageModel",
      "logClientIp",
      "httpCorrelationProtocol",
      "verbosity",
      "operationNameFormat",
      "metrics",
    ])
      ? undefined
      : _diagnosticContractPropertiesSerializer(item),
  };
}

export function diagnosticContractDeserializer(item: any): DiagnosticContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticContractPropertiesDeserializer(item["properties"])),
  };
}

/** Diagnostic Entity Properties */
export interface DiagnosticContractProperties {
  /** Specifies for what type of messages sampling settings should not apply. */
  alwaysLog?: AlwaysLog;
  /** Resource Id of a target logger. */
  loggerId: string;
  /** Sampling settings for Diagnostic. */
  sampling?: SamplingSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Gateway. */
  frontend?: PipelineDiagnosticSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Backend */
  backend?: PipelineDiagnosticSettings;
  /** Large Language Models diagnostic settings */
  largeLanguageModel?: LLMDiagnosticSettings;
  /** Log the ClientIP. Default is false. */
  logClientIp?: boolean;
  /** Sets correlation protocol to use for Application Insights diagnostics. */
  httpCorrelationProtocol?: HttpCorrelationProtocol;
  /** The verbosity level applied to traces emitted by trace policies. */
  verbosity?: Verbosity;
  /** The format of the Operation Name for Application Insights telemetries. Default is Name. */
  operationNameFormat?: OperationNameFormat;
  /** Emit custom metrics via emit-metric policy. Applicable only to Application Insights diagnostic settings. */
  metrics?: boolean;
}

export function diagnosticContractPropertiesSerializer(item: DiagnosticContractProperties): any {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsSerializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsSerializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsSerializer(item["backend"]),
    largeLanguageModel: !item["largeLanguageModel"]
      ? item["largeLanguageModel"]
      : llmDiagnosticSettingsSerializer(item["largeLanguageModel"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

export function diagnosticContractPropertiesDeserializer(item: any): DiagnosticContractProperties {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsDeserializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsDeserializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsDeserializer(item["backend"]),
    largeLanguageModel: !item["largeLanguageModel"]
      ? item["largeLanguageModel"]
      : llmDiagnosticSettingsDeserializer(item["largeLanguageModel"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

/** Specifies for what type of messages sampling settings should not apply. */
export enum KnownAlwaysLog {
  /** Always log all erroneous request regardless of sampling settings. */
  AllErrors = "allErrors",
}

/**
 * Specifies for what type of messages sampling settings should not apply. \
 * {@link KnownAlwaysLog} can be used interchangeably with AlwaysLog,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **allErrors**: Always log all erroneous request regardless of sampling settings.
 */
export type AlwaysLog = string;

/** Sampling settings for Diagnostic. */
export interface SamplingSettings {
  /** Sampling type. */
  samplingType?: SamplingType;
  /** Rate of sampling for fixed-rate sampling. */
  percentage?: number;
}

export function samplingSettingsSerializer(item: SamplingSettings): any {
  return { samplingType: item["samplingType"], percentage: item["percentage"] };
}

export function samplingSettingsDeserializer(item: any): SamplingSettings {
  return {
    samplingType: item["samplingType"],
    percentage: item["percentage"],
  };
}

/** Sampling type. */
export enum KnownSamplingType {
  /** Fixed-rate sampling. */
  Fixed = "fixed",
}

/**
 * Sampling type. \
 * {@link KnownSamplingType} can be used interchangeably with SamplingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **fixed**: Fixed-rate sampling.
 */
export type SamplingType = string;

/** Diagnostic settings for incoming/outgoing HTTP messages to the Gateway. */
export interface PipelineDiagnosticSettings {
  /** Diagnostic settings for request. */
  request?: HttpMessageDiagnostic;
  /** Diagnostic settings for response. */
  response?: HttpMessageDiagnostic;
}

export function pipelineDiagnosticSettingsSerializer(item: PipelineDiagnosticSettings): any {
  return {
    request: !item["request"] ? item["request"] : httpMessageDiagnosticSerializer(item["request"]),
    response: !item["response"]
      ? item["response"]
      : httpMessageDiagnosticSerializer(item["response"]),
  };
}

export function pipelineDiagnosticSettingsDeserializer(item: any): PipelineDiagnosticSettings {
  return {
    request: !item["request"]
      ? item["request"]
      : httpMessageDiagnosticDeserializer(item["request"]),
    response: !item["response"]
      ? item["response"]
      : httpMessageDiagnosticDeserializer(item["response"]),
  };
}

/** Http message diagnostic settings. */
export interface HttpMessageDiagnostic {
  /** Array of HTTP Headers to log. */
  headers?: string[];
  /** Body logging settings. */
  body?: BodyDiagnosticSettings;
  /** Data masking settings. */
  dataMasking?: DataMasking;
}

export function httpMessageDiagnosticSerializer(item: HttpMessageDiagnostic): any {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    body: !item["body"] ? item["body"] : bodyDiagnosticSettingsSerializer(item["body"]),
    dataMasking: !item["dataMasking"]
      ? item["dataMasking"]
      : dataMaskingSerializer(item["dataMasking"]),
  };
}

export function httpMessageDiagnosticDeserializer(item: any): HttpMessageDiagnostic {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    body: !item["body"] ? item["body"] : bodyDiagnosticSettingsDeserializer(item["body"]),
    dataMasking: !item["dataMasking"]
      ? item["dataMasking"]
      : dataMaskingDeserializer(item["dataMasking"]),
  };
}

/** Body logging settings. */
export interface BodyDiagnosticSettings {
  /** Number of request body bytes to log. */
  bytes?: number;
}

export function bodyDiagnosticSettingsSerializer(item: BodyDiagnosticSettings): any {
  return { bytes: item["bytes"] };
}

export function bodyDiagnosticSettingsDeserializer(item: any): BodyDiagnosticSettings {
  return {
    bytes: item["bytes"],
  };
}

/** model interface DataMasking */
export interface DataMasking {
  /** Masking settings for Url query parameters */
  queryParams?: DataMaskingEntity[];
  /** Masking settings for headers */
  headers?: DataMaskingEntity[];
}

export function dataMaskingSerializer(item: DataMasking): any {
  return {
    queryParams: !item["queryParams"]
      ? item["queryParams"]
      : dataMaskingEntityArraySerializer(item["queryParams"]),
    headers: !item["headers"] ? item["headers"] : dataMaskingEntityArraySerializer(item["headers"]),
  };
}

export function dataMaskingDeserializer(item: any): DataMasking {
  return {
    queryParams: !item["queryParams"]
      ? item["queryParams"]
      : dataMaskingEntityArrayDeserializer(item["queryParams"]),
    headers: !item["headers"]
      ? item["headers"]
      : dataMaskingEntityArrayDeserializer(item["headers"]),
  };
}

export function dataMaskingEntityArraySerializer(result: Array<DataMaskingEntity>): any[] {
  return result.map((item) => {
    return dataMaskingEntitySerializer(item);
  });
}

export function dataMaskingEntityArrayDeserializer(result: Array<DataMaskingEntity>): any[] {
  return result.map((item) => {
    return dataMaskingEntityDeserializer(item);
  });
}

/** model interface DataMaskingEntity */
export interface DataMaskingEntity {
  /** The name of an entity to mask (e.g. a name of a header or a query parameter). */
  value?: string;
  /** Data masking mode. */
  mode?: DataMaskingMode;
}

export function dataMaskingEntitySerializer(item: DataMaskingEntity): any {
  return { value: item["value"], mode: item["mode"] };
}

export function dataMaskingEntityDeserializer(item: any): DataMaskingEntity {
  return {
    value: item["value"],
    mode: item["mode"],
  };
}

/** Data masking mode. */
export enum KnownDataMaskingMode {
  /** Mask the value of an entity. */
  Mask = "Mask",
  /** Hide the presence of an entity. */
  Hide = "Hide",
}

/**
 * Data masking mode. \
 * {@link KnownDataMaskingMode} can be used interchangeably with DataMaskingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mask**: Mask the value of an entity. \
 * **Hide**: Hide the presence of an entity.
 */
export type DataMaskingMode = string;

/** Diagnostic settings for Large Language Models */
export interface LLMDiagnosticSettings {
  /** Specifies whether default diagnostic should be enabled for Large Language Models or not. */
  logs?: LlmDiagnosticSettings;
  /** Diagnostic settings for Large Language Models requests. */
  requests?: LLMMessageDiagnosticSettings;
  /** Diagnostic settings for Large Language Models responses. */
  responses?: LLMMessageDiagnosticSettings;
}

export function llmDiagnosticSettingsSerializer(item: LLMDiagnosticSettings): any {
  return {
    logs: item["logs"],
    requests: !item["requests"]
      ? item["requests"]
      : llmMessageDiagnosticSettingsSerializer(item["requests"]),
    responses: !item["responses"]
      ? item["responses"]
      : llmMessageDiagnosticSettingsSerializer(item["responses"]),
  };
}

export function llmDiagnosticSettingsDeserializer(item: any): LLMDiagnosticSettings {
  return {
    logs: item["logs"],
    requests: !item["requests"]
      ? item["requests"]
      : llmMessageDiagnosticSettingsDeserializer(item["requests"]),
    responses: !item["responses"]
      ? item["responses"]
      : llmMessageDiagnosticSettingsDeserializer(item["responses"]),
  };
}

/** Known values of {@link Llm-diagnostic-settings} that the service accepts. */
export enum KnownLlmDiagnosticSettings {
  /** Default LLM logs are enabled. */
  Enabled = "enabled",
  /** Default LLM logs are disabled. */
  Disabled = "disabled",
}

/** Type of LlmDiagnosticSettings */
export type LlmDiagnosticSettings = string;

/** Diagnostic settings for Large Language Models Messages */
export interface LLMMessageDiagnosticSettings {
  /** Specifies which message should be logged. Currently there is only 'all' option. */
  messages?: LlmMessageLogTypes;
  /** Maximum size of message to logs in bytes. The default size is 32KB. */
  maxSizeInBytes?: number;
}

export function llmMessageDiagnosticSettingsSerializer(item: LLMMessageDiagnosticSettings): any {
  return { messages: item["messages"], maxSizeInBytes: item["maxSizeInBytes"] };
}

export function llmMessageDiagnosticSettingsDeserializer(item: any): LLMMessageDiagnosticSettings {
  return {
    messages: item["messages"],
    maxSizeInBytes: item["maxSizeInBytes"],
  };
}

/** Known values of {@link Llm-message-log-types} that the service accepts. */
export enum KnownLlmMessageLogTypes {
  /** Log all messages. */
  All = "all",
}

/** Type of LlmMessageLogTypes */
export type LlmMessageLogTypes = string;

/** Sets correlation protocol to use for Application Insights diagnostics. */
export enum KnownHttpCorrelationProtocol {
  /** Do not read and inject correlation headers. */
  None = "None",
  /** Inject Request-Id and Request-Context headers with request correlation data. See https://github.com/dotnet/corefx/blob/master/src/System.Diagnostics.DiagnosticSource/src/HttpCorrelationProtocol.md. */
  Legacy = "Legacy",
  /** Inject Trace Context headers. See https://w3c.github.io/trace-context. */
  W3C = "W3C",
}

/**
 * Sets correlation protocol to use for Application Insights diagnostics. \
 * {@link KnownHttpCorrelationProtocol} can be used interchangeably with HttpCorrelationProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Do not read and inject correlation headers. \
 * **Legacy**: Inject Request-Id and Request-Context headers with request correlation data. See https:\//github.com\/dotnet\/corefx\/blob\/master\/src\/System.Diagnostics.DiagnosticSource\/src\/HttpCorrelationProtocol.md. \
 * **W3C**: Inject Trace Context headers. See https:\//w3c.github.io\/trace-context.
 */
export type HttpCorrelationProtocol = string;

/** The verbosity level applied to traces emitted by trace policies. */
export enum KnownVerbosity {
  /** All the traces emitted by trace policies will be sent to the logger attached to this diagnostic instance. */
  Verbose = "verbose",
  /** Traces with 'severity' set to 'information' and 'error' will be sent to the logger attached to this diagnostic instance. */
  Information = "information",
  /** Only traces with 'severity' set to 'error' will be sent to the logger attached to this diagnostic instance. */
  Error = "error",
}

/**
 * The verbosity level applied to traces emitted by trace policies. \
 * {@link KnownVerbosity} can be used interchangeably with Verbosity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **verbose**: All the traces emitted by trace policies will be sent to the logger attached to this diagnostic instance. \
 * **information**: Traces with 'severity' set to 'information' and 'error' will be sent to the logger attached to this diagnostic instance. \
 * **error**: Only traces with 'severity' set to 'error' will be sent to the logger attached to this diagnostic instance.
 */
export type Verbosity = string;

/** The format of the Operation Name for Application Insights telemetries. Default is Name. */
export enum KnownOperationNameFormat {
  /** API_NAME;rev=API_REVISION - OPERATION_NAME */
  Name = "Name",
  /** HTTP_VERB URL */
  Url = "Url",
}

/**
 * The format of the Operation Name for Application Insights telemetries. Default is Name. \
 * {@link KnownOperationNameFormat} can be used interchangeably with OperationNameFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Name**: API_NAME;rev=API_REVISION - OPERATION_NAME \
 * **Url**: HTTP_VERB URL
 */
export type OperationNameFormat = string;

/** Paged Diagnostic list representation. */
export interface _DiagnosticCollection {
  /** Page values. */
  value?: DiagnosticContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _diagnosticCollectionDeserializer(item: any): _DiagnosticCollection {
  return {
    value: !item["value"] ? item["value"] : diagnosticContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function diagnosticContractArraySerializer(result: Array<DiagnosticContract>): any[] {
  return result.map((item) => {
    return diagnosticContractSerializer(item);
  });
}

export function diagnosticContractArrayDeserializer(result: Array<DiagnosticContract>): any[] {
  return result.map((item) => {
    return diagnosticContractDeserializer(item);
  });
}

/** Diagnostic details. */
export interface DiagnosticUpdateContract extends ProxyResource {
  /** Specifies for what type of messages sampling settings should not apply. */
  alwaysLog?: AlwaysLog;
  /** Resource Id of a target logger. */
  loggerId?: string;
  /** Sampling settings for Diagnostic. */
  sampling?: SamplingSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Gateway. */
  frontend?: PipelineDiagnosticSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Backend */
  backend?: PipelineDiagnosticSettings;
  /** Log the ClientIP. Default is false. */
  logClientIp?: boolean;
  /** Sets correlation protocol to use for Application Insights diagnostics. */
  httpCorrelationProtocol?: HttpCorrelationProtocol;
  /** The verbosity level applied to traces emitted by trace policies. */
  verbosity?: Verbosity;
  /** The format of the Operation Name for Application Insights telemetries. Default is Name. */
  operationNameFormat?: OperationNameFormat;
  /** Emit custom metrics via emit-metric policy. Applicable only to Application Insights diagnostic settings. */
  metrics?: boolean;
}

export function diagnosticUpdateContractSerializer(item: DiagnosticUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "alwaysLog",
      "loggerId",
      "sampling",
      "frontend",
      "backend",
      "logClientIp",
      "httpCorrelationProtocol",
      "verbosity",
      "operationNameFormat",
      "metrics",
    ])
      ? undefined
      : _diagnosticUpdateContractPropertiesSerializer(item),
  };
}

/** Diagnostic Entity Properties */
export interface DiagnosticContractUpdateProperties {
  /** Specifies for what type of messages sampling settings should not apply. */
  alwaysLog?: AlwaysLog;
  /** Resource Id of a target logger. */
  loggerId?: string;
  /** Sampling settings for Diagnostic. */
  sampling?: SamplingSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Gateway. */
  frontend?: PipelineDiagnosticSettings;
  /** Diagnostic settings for incoming/outgoing HTTP messages to the Backend */
  backend?: PipelineDiagnosticSettings;
  /** Log the ClientIP. Default is false. */
  logClientIp?: boolean;
  /** Sets correlation protocol to use for Application Insights diagnostics. */
  httpCorrelationProtocol?: HttpCorrelationProtocol;
  /** The verbosity level applied to traces emitted by trace policies. */
  verbosity?: Verbosity;
  /** The format of the Operation Name for Application Insights telemetries. Default is Name. */
  operationNameFormat?: OperationNameFormat;
  /** Emit custom metrics via emit-metric policy. Applicable only to Application Insights diagnostic settings. */
  metrics?: boolean;
}

export function diagnosticContractUpdatePropertiesSerializer(
  item: DiagnosticContractUpdateProperties,
): any {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsSerializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsSerializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsSerializer(item["backend"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

/** Issue Contract details. */
export interface IssueContract extends ProxyResource {
  /** Date and time when the issue was created. */
  createdDate?: Date;
  /** Status of the issue. */
  state?: State;
  /** A resource identifier for the API the issue was created for. */
  apiId?: string;
  /** The issue title. */
  title?: string;
  /** Text describing the issue. */
  description?: string;
  /** A resource identifier for the user created the issue. */
  userId?: string;
}

export function issueContractSerializer(item: IssueContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "createdDate",
      "state",
      "apiId",
      "title",
      "description",
      "userId",
    ])
      ? undefined
      : _issueContractPropertiesSerializer(item),
  };
}

export function issueContractDeserializer(item: any): IssueContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _issueContractPropertiesDeserializer(item["properties"])),
  };
}

/** Issue contract Properties. */
export interface IssueContractProperties extends IssueContractBaseProperties {
  /** The issue title. */
  title: string;
  /** Text describing the issue. */
  description: string;
  /** A resource identifier for the user created the issue. */
  userId: string;
}

export function issueContractPropertiesSerializer(item: IssueContractProperties): any {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

export function issueContractPropertiesDeserializer(item: any): IssueContractProperties {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

/** Issue contract Base Properties. */
export interface IssueContractBaseProperties {
  /** Date and time when the issue was created. */
  createdDate?: Date;
  /** Status of the issue. */
  state?: State;
  /** A resource identifier for the API the issue was created for. */
  apiId?: string;
}

export function issueContractBasePropertiesSerializer(item: IssueContractBaseProperties): any {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    state: item["state"],
    apiId: item["apiId"],
  };
}

export function issueContractBasePropertiesDeserializer(item: any): IssueContractBaseProperties {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    state: item["state"],
    apiId: item["apiId"],
  };
}

/** Status of the issue. */
export enum KnownState {
  /** The issue is proposed. */
  Proposed = "proposed",
  /** The issue is opened. */
  Open = "open",
  /** The issue was removed. */
  Removed = "removed",
  /** The issue is now resolved. */
  Resolved = "resolved",
  /** The issue was closed. */
  Closed = "closed",
}

/**
 * Status of the issue. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **proposed**: The issue is proposed. \
 * **open**: The issue is opened. \
 * **removed**: The issue was removed. \
 * **resolved**: The issue is now resolved. \
 * **closed**: The issue was closed.
 */
export type State = string;

/** Paged Issue list representation. */
export interface _IssueCollection {
  /** Issue values. */
  readonly value?: IssueContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _issueCollectionDeserializer(item: any): _IssueCollection {
  return {
    value: !item["value"] ? item["value"] : issueContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function issueContractArraySerializer(result: Array<IssueContract>): any[] {
  return result.map((item) => {
    return issueContractSerializer(item);
  });
}

export function issueContractArrayDeserializer(result: Array<IssueContract>): any[] {
  return result.map((item) => {
    return issueContractDeserializer(item);
  });
}

/** Wiki properties */
export interface WikiContract extends ProxyResource {
  /** Collection wiki documents included into this wiki. */
  documents?: WikiDocumentationContract[];
}

export function wikiContractSerializer(item: WikiContract): any {
  return {
    properties: areAllPropsUndefined(item, ["documents"])
      ? undefined
      : _wikiContractPropertiesSerializer(item),
  };
}

export function wikiContractDeserializer(item: any): WikiContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _wikiContractPropertiesDeserializer(item["properties"])),
  };
}

/** Wiki contract details */
export interface WikiContractProperties {
  /** Collection wiki documents included into this wiki. */
  documents?: WikiDocumentationContract[];
}

export function wikiContractPropertiesSerializer(item: WikiContractProperties): any {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArraySerializer(item["documents"]),
  };
}

export function wikiContractPropertiesDeserializer(item: any): WikiContractProperties {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArrayDeserializer(item["documents"]),
  };
}

export function wikiDocumentationContractArraySerializer(
  result: Array<WikiDocumentationContract>,
): any[] {
  return result.map((item) => {
    return wikiDocumentationContractSerializer(item);
  });
}

export function wikiDocumentationContractArrayDeserializer(
  result: Array<WikiDocumentationContract>,
): any[] {
  return result.map((item) => {
    return wikiDocumentationContractDeserializer(item);
  });
}

/** Wiki documentation details. */
export interface WikiDocumentationContract {
  /** Documentation Identifier */
  documentationId?: string;
}

export function wikiDocumentationContractSerializer(item: WikiDocumentationContract): any {
  return { documentationId: item["documentationId"] };
}

export function wikiDocumentationContractDeserializer(item: any): WikiDocumentationContract {
  return {
    documentationId: item["documentationId"],
  };
}

/** Wiki update contract details. */
export interface WikiUpdateContract {
  /** Collection wiki documents included into this wiki. */
  documents?: WikiDocumentationContract[];
}

export function wikiUpdateContractSerializer(item: WikiUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, ["documents"])
      ? undefined
      : _wikiUpdateContractPropertiesSerializer(item),
  };
}

/** API Version Set Contract details. */
export interface ApiVersionSetContract extends ProxyResource {
  /** Description of API Version Set. */
  description?: string;
  /** Name of query parameter that indicates the API Version if versioningScheme is set to `query`. */
  versionQueryName?: string;
  /** Name of HTTP header parameter that indicates the API Version if versioningScheme is set to `header`. */
  versionHeaderName?: string;
  /** Name of API Version Set */
  displayName?: string;
  /** An value that determines where the API Version identifier will be located in a HTTP request. */
  versioningScheme?: VersioningScheme;
}

export function apiVersionSetContractSerializer(item: ApiVersionSetContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "versionQueryName",
      "versionHeaderName",
      "displayName",
      "versioningScheme",
    ])
      ? undefined
      : _apiVersionSetContractPropertiesSerializer(item),
  };
}

export function apiVersionSetContractDeserializer(item: any): ApiVersionSetContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _apiVersionSetContractPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an API Version Set. */
export interface ApiVersionSetContractProperties extends ApiVersionSetEntityBase {
  /** Name of API Version Set */
  displayName: string;
  /** An value that determines where the API Version identifier will be located in a HTTP request. */
  versioningScheme: VersioningScheme;
}

export function apiVersionSetContractPropertiesSerializer(
  item: ApiVersionSetContractProperties,
): any {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

export function apiVersionSetContractPropertiesDeserializer(
  item: any,
): ApiVersionSetContractProperties {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

/** API Version set base parameters */
export interface ApiVersionSetEntityBase {
  /** Description of API Version Set. */
  description?: string;
  /** Name of query parameter that indicates the API Version if versioningScheme is set to `query`. */
  versionQueryName?: string;
  /** Name of HTTP header parameter that indicates the API Version if versioningScheme is set to `header`. */
  versionHeaderName?: string;
}

export function apiVersionSetEntityBaseSerializer(item: ApiVersionSetEntityBase): any {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
  };
}

export function apiVersionSetEntityBaseDeserializer(item: any): ApiVersionSetEntityBase {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
  };
}

/** Parameters to update or create an API Version Set Contract. */
export interface ApiVersionSetUpdateParameters {
  /** Description of API Version Set. */
  description?: string;
  /** Name of query parameter that indicates the API Version if versioningScheme is set to `query`. */
  versionQueryName?: string;
  /** Name of HTTP header parameter that indicates the API Version if versioningScheme is set to `header`. */
  versionHeaderName?: string;
  /** Name of API Version Set */
  displayName?: string;
  /** An value that determines where the API Version identifier will be located in a HTTP request. */
  versioningScheme?: VersioningScheme;
}

export function apiVersionSetUpdateParametersSerializer(item: ApiVersionSetUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "versionQueryName",
      "versionHeaderName",
      "displayName",
      "versioningScheme",
    ])
      ? undefined
      : _apiVersionSetUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties used to create or update an API Version Set. */
export interface ApiVersionSetUpdateParametersProperties extends ApiVersionSetEntityBase {
  /** Name of API Version Set */
  displayName?: string;
  /** An value that determines where the API Version identifier will be located in a HTTP request. */
  versioningScheme?: VersioningScheme;
}

export function apiVersionSetUpdateParametersPropertiesSerializer(
  item: ApiVersionSetUpdateParametersProperties,
): any {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

/** Paged API Version Set list representation. */
export interface _ApiVersionSetCollection {
  /** Page values. */
  value?: ApiVersionSetContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _apiVersionSetCollectionDeserializer(item: any): _ApiVersionSetCollection {
  return {
    value: !item["value"] ? item["value"] : apiVersionSetContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function apiVersionSetContractArraySerializer(result: Array<ApiVersionSetContract>): any[] {
  return result.map((item) => {
    return apiVersionSetContractSerializer(item);
  });
}

export function apiVersionSetContractArrayDeserializer(
  result: Array<ApiVersionSetContract>,
): any[] {
  return result.map((item) => {
    return apiVersionSetContractDeserializer(item);
  });
}

/** Backend details. */
export interface BackendContract extends ProxyResource {
  /** Backend Title. */
  title?: string;
  /** Backend Description. */
  description?: string;
  /** Management Uri of the Resource in External System. This URL can be the Arm Resource Id of Logic Apps, Function Apps or API Apps. */
  resourceId?: string;
  /** Backend Properties contract */
  properties?: BackendProperties;
  /** Backend Credentials Contract Properties */
  credentials?: BackendCredentialsContract;
  /** Backend gateway Contract Properties */
  proxy?: BackendProxyContract;
  /** Backend TLS Properties */
  tls?: BackendTlsProperties;
  /** Backend Circuit Breaker Configuration */
  circuitBreaker?: BackendCircuitBreaker;
  /** Azure region in which the backend is deployed. Can be optionally specified to use features such as carbon-optimized load balancer. */
  azureRegion?: string;
  /** Backend Pool Properties */
  pool?: BackendBaseParametersPool;
  /** Type of the backend. A backend can be either Single or Pool. */
  typePropertiesType?: BackendType;
  /** Runtime Url of the Backend. Required when backend type is 'Single'. */
  url?: string;
  /** Backend communication protocol. Required when backend type is 'Single'. */
  protocol?: BackendProtocol;
}

export function backendContractSerializer(item: BackendContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "title",
      "description",
      "resourceId",
      "properties",
      "credentials",
      "proxy",
      "tls",
      "circuitBreaker",
      "azureRegion",
      "pool",
      "type",
      "url",
      "protocol",
    ])
      ? undefined
      : _backendContractPropertiesSerializer(item),
  };
}

export function backendContractDeserializer(item: any): BackendContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _backendContractPropertiesDeserializer(item["properties"])),
  };
}

/** Parameters supplied to the Create Backend operation. */
export interface BackendContractProperties extends BackendBaseParameters {
  /** Runtime Url of the Backend. Required when backend type is 'Single'. */
  url?: string;
  /** Backend communication protocol. Required when backend type is 'Single'. */
  protocol?: BackendProtocol;
}

export function backendContractPropertiesSerializer(item: BackendContractProperties): any {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesSerializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractSerializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractSerializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesSerializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerSerializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolSerializer(item["pool"]),
    type: item["type"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

export function backendContractPropertiesDeserializer(item: any): BackendContractProperties {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesDeserializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractDeserializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractDeserializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesDeserializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerDeserializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolDeserializer(item["pool"]),
    type: item["type"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

/** Backend communication protocol. Required when backend type is 'Single'. */
export enum KnownBackendProtocol {
  /** The Backend is a RESTful service. */
  Http = "http",
  /** The Backend is a SOAP service. */
  Soap = "soap",
}

/**
 * Backend communication protocol. Required when backend type is 'Single'. \
 * {@link KnownBackendProtocol} can be used interchangeably with BackendProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http**: The Backend is a RESTful service. \
 * **soap**: The Backend is a SOAP service.
 */
export type BackendProtocol = string;

/** Backend entity base Parameter set. */
export interface BackendBaseParameters {
  /** Backend Title. */
  title?: string;
  /** Backend Description. */
  description?: string;
  /** Management Uri of the Resource in External System. This URL can be the Arm Resource Id of Logic Apps, Function Apps or API Apps. */
  resourceId?: string;
  /** Backend Properties contract */
  properties?: BackendProperties;
  /** Backend Credentials Contract Properties */
  credentials?: BackendCredentialsContract;
  /** Backend gateway Contract Properties */
  proxy?: BackendProxyContract;
  /** Backend TLS Properties */
  tls?: BackendTlsProperties;
  /** Backend Circuit Breaker Configuration */
  circuitBreaker?: BackendCircuitBreaker;
  /** Azure region in which the backend is deployed. Can be optionally specified to use features such as carbon-optimized load balancer. */
  azureRegion?: string;
  /** Backend Pool Properties */
  pool?: BackendBaseParametersPool;
  /** Type of the backend. A backend can be either Single or Pool. */
  type?: BackendType;
}

export function backendBaseParametersSerializer(item: BackendBaseParameters): any {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesSerializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractSerializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractSerializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesSerializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerSerializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolSerializer(item["pool"]),
    type: item["type"],
  };
}

export function backendBaseParametersDeserializer(item: any): BackendBaseParameters {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesDeserializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractDeserializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractDeserializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesDeserializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerDeserializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolDeserializer(item["pool"]),
    type: item["type"],
  };
}

/** Properties specific to the Backend Type. */
export interface BackendProperties {
  /** Backend Service Fabric Cluster Properties */
  serviceFabricCluster?: BackendServiceFabricClusterProperties;
}

export function backendPropertiesSerializer(item: BackendProperties): any {
  return {
    serviceFabricCluster: !item["serviceFabricCluster"]
      ? item["serviceFabricCluster"]
      : backendServiceFabricClusterPropertiesSerializer(item["serviceFabricCluster"]),
  };
}

export function backendPropertiesDeserializer(item: any): BackendProperties {
  return {
    serviceFabricCluster: !item["serviceFabricCluster"]
      ? item["serviceFabricCluster"]
      : backendServiceFabricClusterPropertiesDeserializer(item["serviceFabricCluster"]),
  };
}

/** Properties of the Service Fabric Type Backend. */
export interface BackendServiceFabricClusterProperties {
  /** The client certificate id for the management endpoint. */
  clientCertificateId?: string;
  /** The client certificate thumbprint for the management endpoint. Will be ignored if certificatesIds are provided */
  clientCertificatethumbprint?: string;
  /** Maximum number of retries while attempting resolve the partition. */
  maxPartitionResolutionRetries?: number;
  /** The cluster management endpoint. */
  managementEndpoints: string[];
  /** Thumbprints of certificates cluster management service uses for tls communication */
  serverCertificateThumbprints?: string[];
  /** Server X509 Certificate Names Collection */
  serverX509Names?: X509CertificateName[];
}

export function backendServiceFabricClusterPropertiesSerializer(
  item: BackendServiceFabricClusterProperties,
): any {
  return {
    clientCertificateId: item["clientCertificateId"],
    clientCertificatethumbprint: item["clientCertificatethumbprint"],
    maxPartitionResolutionRetries: item["maxPartitionResolutionRetries"],
    managementEndpoints: item["managementEndpoints"].map((p: any) => {
      return p;
    }),
    serverCertificateThumbprints: !item["serverCertificateThumbprints"]
      ? item["serverCertificateThumbprints"]
      : item["serverCertificateThumbprints"].map((p: any) => {
          return p;
        }),
    serverX509Names: !item["serverX509Names"]
      ? item["serverX509Names"]
      : x509CertificateNameArraySerializer(item["serverX509Names"]),
  };
}

export function backendServiceFabricClusterPropertiesDeserializer(
  item: any,
): BackendServiceFabricClusterProperties {
  return {
    clientCertificateId: item["clientCertificateId"],
    clientCertificatethumbprint: item["clientCertificatethumbprint"],
    maxPartitionResolutionRetries: item["maxPartitionResolutionRetries"],
    managementEndpoints: item["managementEndpoints"].map((p: any) => {
      return p;
    }),
    serverCertificateThumbprints: !item["serverCertificateThumbprints"]
      ? item["serverCertificateThumbprints"]
      : item["serverCertificateThumbprints"].map((p: any) => {
          return p;
        }),
    serverX509Names: !item["serverX509Names"]
      ? item["serverX509Names"]
      : x509CertificateNameArrayDeserializer(item["serverX509Names"]),
  };
}

export function x509CertificateNameArraySerializer(result: Array<X509CertificateName>): any[] {
  return result.map((item) => {
    return x509CertificateNameSerializer(item);
  });
}

export function x509CertificateNameArrayDeserializer(result: Array<X509CertificateName>): any[] {
  return result.map((item) => {
    return x509CertificateNameDeserializer(item);
  });
}

/** Properties of server X509Names. */
export interface X509CertificateName {
  /** Common Name of the Certificate. */
  name?: string;
  /** Thumbprint for the Issuer of the Certificate. */
  issuerCertificateThumbprint?: string;
}

export function x509CertificateNameSerializer(item: X509CertificateName): any {
  return { name: item["name"], issuerCertificateThumbprint: item["issuerCertificateThumbprint"] };
}

export function x509CertificateNameDeserializer(item: any): X509CertificateName {
  return {
    name: item["name"],
    issuerCertificateThumbprint: item["issuerCertificateThumbprint"],
  };
}

/** Details of the Credentials used to connect to Backend. */
export interface BackendCredentialsContract {
  /** List of Client Certificate Ids. */
  certificateIds?: string[];
  /** List of Client Certificate Thumbprints. Will be ignored if certificatesIds are provided. */
  certificate?: string[];
  /** Query Parameter description. */
  query?: Record<string, string[]>;
  /** Header Parameter description. */
  header?: Record<string, string[]>;
  /** Authorization header authentication */
  authorization?: BackendAuthorizationHeaderCredentials;
}

export function backendCredentialsContractSerializer(item: BackendCredentialsContract): any {
  return {
    certificateIds: !item["certificateIds"]
      ? item["certificateIds"]
      : item["certificateIds"].map((p: any) => {
          return p;
        }),
    certificate: !item["certificate"]
      ? item["certificate"]
      : item["certificate"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    header: item["header"],
    authorization: !item["authorization"]
      ? item["authorization"]
      : backendAuthorizationHeaderCredentialsSerializer(item["authorization"]),
  };
}

export function backendCredentialsContractDeserializer(item: any): BackendCredentialsContract {
  return {
    certificateIds: !item["certificateIds"]
      ? item["certificateIds"]
      : item["certificateIds"].map((p: any) => {
          return p;
        }),
    certificate: !item["certificate"]
      ? item["certificate"]
      : item["certificate"].map((p: any) => {
          return p;
        }),
    query: !item["query"]
      ? item["query"]
      : Object.fromEntries(
          Object.entries(item["query"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    header: !item["header"]
      ? item["header"]
      : Object.fromEntries(
          Object.entries(item["header"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    authorization: !item["authorization"]
      ? item["authorization"]
      : backendAuthorizationHeaderCredentialsDeserializer(item["authorization"]),
  };
}

/** Authorization header information. */
export interface BackendAuthorizationHeaderCredentials {
  /** Authentication Scheme name. */
  scheme: string;
  /** Authentication Parameter value. */
  parameter: string;
}

export function backendAuthorizationHeaderCredentialsSerializer(
  item: BackendAuthorizationHeaderCredentials,
): any {
  return { scheme: item["scheme"], parameter: item["parameter"] };
}

export function backendAuthorizationHeaderCredentialsDeserializer(
  item: any,
): BackendAuthorizationHeaderCredentials {
  return {
    scheme: item["scheme"],
    parameter: item["parameter"],
  };
}

/** Details of the Backend WebProxy Server to use in the Request to Backend. */
export interface BackendProxyContract {
  /** WebProxy Server AbsoluteUri property which includes the entire URI stored in the Uri instance, including all fragments and query strings. */
  url: string;
  /** Username to connect to the WebProxy server */
  username?: string;
  /** Password to connect to the WebProxy Server */
  password?: string;
}

export function backendProxyContractSerializer(item: BackendProxyContract): any {
  return { url: item["url"], username: item["username"], password: item["password"] };
}

export function backendProxyContractDeserializer(item: any): BackendProxyContract {
  return {
    url: item["url"],
    username: item["username"],
    password: item["password"],
  };
}

/** Properties controlling TLS Certificate Validation. */
export interface BackendTlsProperties {
  /** Flag indicating whether SSL certificate chain validation should be done when using self-signed certificates for this backend host. */
  validateCertificateChain?: boolean;
  /** Flag indicating whether SSL certificate name validation should be done when using self-signed certificates for this backend host. */
  validateCertificateName?: boolean;
  /** Thumbprints of certificates used by the backend host for TLS communication. */
  serverCertificateThumbprints?: string[];
  /** Server X509 Certificate Names of the Backend Host. */
  serverX509Names?: X509CertificateName[];
}

export function backendTlsPropertiesSerializer(item: BackendTlsProperties): any {
  return {
    validateCertificateChain: item["validateCertificateChain"],
    validateCertificateName: item["validateCertificateName"],
    serverCertificateThumbprints: !item["serverCertificateThumbprints"]
      ? item["serverCertificateThumbprints"]
      : item["serverCertificateThumbprints"].map((p: any) => {
          return p;
        }),
    serverX509Names: !item["serverX509Names"]
      ? item["serverX509Names"]
      : x509CertificateNameArraySerializer(item["serverX509Names"]),
  };
}

export function backendTlsPropertiesDeserializer(item: any): BackendTlsProperties {
  return {
    validateCertificateChain: item["validateCertificateChain"],
    validateCertificateName: item["validateCertificateName"],
    serverCertificateThumbprints: !item["serverCertificateThumbprints"]
      ? item["serverCertificateThumbprints"]
      : item["serverCertificateThumbprints"].map((p: any) => {
          return p;
        }),
    serverX509Names: !item["serverX509Names"]
      ? item["serverX509Names"]
      : x509CertificateNameArrayDeserializer(item["serverX509Names"]),
  };
}

/** The configuration of the backend circuit breaker */
export interface BackendCircuitBreaker {
  /** The rules for tripping the backend. */
  rules?: CircuitBreakerRule[];
}

export function backendCircuitBreakerSerializer(item: BackendCircuitBreaker): any {
  return {
    rules: !item["rules"] ? item["rules"] : circuitBreakerRuleArraySerializer(item["rules"]),
  };
}

export function backendCircuitBreakerDeserializer(item: any): BackendCircuitBreaker {
  return {
    rules: !item["rules"] ? item["rules"] : circuitBreakerRuleArrayDeserializer(item["rules"]),
  };
}

export function circuitBreakerRuleArraySerializer(result: Array<CircuitBreakerRule>): any[] {
  return result.map((item) => {
    return circuitBreakerRuleSerializer(item);
  });
}

export function circuitBreakerRuleArrayDeserializer(result: Array<CircuitBreakerRule>): any[] {
  return result.map((item) => {
    return circuitBreakerRuleDeserializer(item);
  });
}

/** Rule configuration to trip the backend. */
export interface CircuitBreakerRule {
  /** The rule name. */
  name?: string;
  /** The conditions for tripping the circuit breaker. */
  failureCondition?: CircuitBreakerFailureCondition;
  /** The duration for which the circuit will be tripped. */
  tripDuration?: string;
  /** flag to accept Retry-After header from the backend. */
  acceptRetryAfter?: boolean;
  /** The response of the backend when the circuit breaker gets open. */
  failureResponse?: BackendFailureResponse;
}

export function circuitBreakerRuleSerializer(item: CircuitBreakerRule): any {
  return {
    name: item["name"],
    failureCondition: !item["failureCondition"]
      ? item["failureCondition"]
      : circuitBreakerFailureConditionSerializer(item["failureCondition"]),
    tripDuration: item["tripDuration"],
    acceptRetryAfter: item["acceptRetryAfter"],
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseSerializer(item["failureResponse"]),
  };
}

export function circuitBreakerRuleDeserializer(item: any): CircuitBreakerRule {
  return {
    name: item["name"],
    failureCondition: !item["failureCondition"]
      ? item["failureCondition"]
      : circuitBreakerFailureConditionDeserializer(item["failureCondition"]),
    tripDuration: item["tripDuration"],
    acceptRetryAfter: item["acceptRetryAfter"],
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseDeserializer(item["failureResponse"]),
  };
}

/** The trip conditions of the circuit breaker */
export interface CircuitBreakerFailureCondition {
  /** The threshold for opening the circuit. */
  count?: number;
  /** The threshold for opening the circuit. */
  percentage?: number;
  /** The interval during which the failures are counted. */
  interval?: string;
  /** The status code ranges which are considered as failure. */
  statusCodeRanges?: FailureStatusCodeRange[];
  /** The error reasons which are considered as failure. */
  errorReasons?: string[];
}

export function circuitBreakerFailureConditionSerializer(
  item: CircuitBreakerFailureCondition,
): any {
  return {
    count: item["count"],
    percentage: item["percentage"],
    interval: item["interval"],
    statusCodeRanges: !item["statusCodeRanges"]
      ? item["statusCodeRanges"]
      : failureStatusCodeRangeArraySerializer(item["statusCodeRanges"]),
    errorReasons: !item["errorReasons"]
      ? item["errorReasons"]
      : item["errorReasons"].map((p: any) => {
          return p;
        }),
  };
}

export function circuitBreakerFailureConditionDeserializer(
  item: any,
): CircuitBreakerFailureCondition {
  return {
    count: item["count"],
    percentage: item["percentage"],
    interval: item["interval"],
    statusCodeRanges: !item["statusCodeRanges"]
      ? item["statusCodeRanges"]
      : failureStatusCodeRangeArrayDeserializer(item["statusCodeRanges"]),
    errorReasons: !item["errorReasons"]
      ? item["errorReasons"]
      : item["errorReasons"].map((p: any) => {
          return p;
        }),
  };
}

export function failureStatusCodeRangeArraySerializer(
  result: Array<FailureStatusCodeRange>,
): any[] {
  return result.map((item) => {
    return failureStatusCodeRangeSerializer(item);
  });
}

export function failureStatusCodeRangeArrayDeserializer(
  result: Array<FailureStatusCodeRange>,
): any[] {
  return result.map((item) => {
    return failureStatusCodeRangeDeserializer(item);
  });
}

/** The failure http status code range */
export interface FailureStatusCodeRange {
  /** The minimum http status code. */
  min?: number;
  /** The maximum http status code. */
  max?: number;
}

export function failureStatusCodeRangeSerializer(item: FailureStatusCodeRange): any {
  return { min: item["min"], max: item["max"] };
}

export function failureStatusCodeRangeDeserializer(item: any): FailureStatusCodeRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** The response to be returned when a backend fails to respond */
export interface BackendFailureResponse {
  /** The status code of the response. */
  statusCode?: number;
}

export function backendFailureResponseSerializer(item: BackendFailureResponse): any {
  return { statusCode: item["statusCode"] };
}

export function backendFailureResponseDeserializer(item: any): BackendFailureResponse {
  return {
    statusCode: item["statusCode"],
  };
}

/** model interface BackendBaseParametersPool */
export interface BackendBaseParametersPool extends BackendPool {}

export function backendBaseParametersPoolSerializer(item: BackendBaseParametersPool): any {
  return {
    services: !item["services"]
      ? item["services"]
      : backendPoolItemArraySerializer(item["services"]),
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseSerializer(item["failureResponse"]),
    sessionAffinity: !item["sessionAffinity"]
      ? item["sessionAffinity"]
      : backendSessionAffinitySerializer(item["sessionAffinity"]),
  };
}

export function backendBaseParametersPoolDeserializer(item: any): BackendBaseParametersPool {
  return {
    services: !item["services"]
      ? item["services"]
      : backendPoolItemArrayDeserializer(item["services"]),
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseDeserializer(item["failureResponse"]),
    sessionAffinity: !item["sessionAffinity"]
      ? item["sessionAffinity"]
      : backendSessionAffinityDeserializer(item["sessionAffinity"]),
  };
}

/** Type of the backend. A backend can be either Single or Pool. */
export enum KnownBackendType {
  /** supports single backend */
  Single = "Single",
  /** supports pool backend */
  Pool = "Pool",
}

/**
 * Type of the backend. A backend can be either Single or Pool. \
 * {@link KnownBackendType} can be used interchangeably with BackendType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: supports single backend \
 * **Pool**: supports pool backend
 */
export type BackendType = string;

/** Backend pool information */
export interface BackendPool {
  /** The list of backend entities belonging to a pool. */
  services?: BackendPoolItem[];
  /** The response to be returned when all the backends in the pool are inactive. */
  failureResponse?: BackendFailureResponse;
  /** The session stickiness properties of the backend pool. */
  sessionAffinity?: BackendSessionAffinity;
}

export function backendPoolSerializer(item: BackendPool): any {
  return {
    services: !item["services"]
      ? item["services"]
      : backendPoolItemArraySerializer(item["services"]),
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseSerializer(item["failureResponse"]),
    sessionAffinity: !item["sessionAffinity"]
      ? item["sessionAffinity"]
      : backendSessionAffinitySerializer(item["sessionAffinity"]),
  };
}

export function backendPoolDeserializer(item: any): BackendPool {
  return {
    services: !item["services"]
      ? item["services"]
      : backendPoolItemArrayDeserializer(item["services"]),
    failureResponse: !item["failureResponse"]
      ? item["failureResponse"]
      : backendFailureResponseDeserializer(item["failureResponse"]),
    sessionAffinity: !item["sessionAffinity"]
      ? item["sessionAffinity"]
      : backendSessionAffinityDeserializer(item["sessionAffinity"]),
  };
}

export function backendPoolItemArraySerializer(result: Array<BackendPoolItem>): any[] {
  return result.map((item) => {
    return backendPoolItemSerializer(item);
  });
}

export function backendPoolItemArrayDeserializer(result: Array<BackendPoolItem>): any[] {
  return result.map((item) => {
    return backendPoolItemDeserializer(item);
  });
}

/** Backend pool service information */
export interface BackendPoolItem {
  /** The unique ARM id of the backend entity. The ARM id should refer to an already existing backend entity. */
  id: string;
  /** The weight of the backend entity in the backend pool. Must be between 0 and 100. It can be also null if the value not specified. */
  weight?: number;
  /** The priority of the backend entity in the backend pool. Must be between 0 and 100. It can be also null if the value not specified. */
  priority?: number;
  /** Scope 2 carbon emission preference for the backend. When specified, the load balancer will optimize traffic flow by routing to regions that have carbon emission less than or equal to the specified category. However, when all other backends are not available it will route traffic to these regions anyway. This requires the backend to be attributed with 'azureRegion' information. */
  preferredCarbonEmission?: CarbonEmissionCategory;
}

export function backendPoolItemSerializer(item: BackendPoolItem): any {
  return {
    id: item["id"],
    weight: item["weight"],
    priority: item["priority"],
    preferredCarbonEmission: item["preferredCarbonEmission"],
  };
}

export function backendPoolItemDeserializer(item: any): BackendPoolItem {
  return {
    id: item["id"],
    weight: item["weight"],
    priority: item["priority"],
    preferredCarbonEmission: item["preferredCarbonEmission"],
  };
}

/** Scope 2 carbon emission preference for the backend. When specified, the load balancer will optimize traffic flow by routing to regions that have carbon emission less than or equal to the specified category. However, when all other backends are not available it will route traffic to these regions anyway. This requires the backend to be attributed with 'azureRegion' information. */
export enum KnownCarbonEmissionCategory {
  /** Carbon intensity of less than or equal to 150 grams CO₂e per KWh */
  VeryLow = "VeryLow",
  /** Carbon intensity between 151 & 300 (incl) grams CO₂e per KWh */
  Low = "Low",
  /** Carbon intensity between 301 & 500 (incl) grams CO₂e per KWh */
  Medium = "Medium",
  /** Carbon intensity between 501 & 700 (incl) grams CO₂e per KWh */
  High = "High",
  /** Carbon intensity of more than 700 grams CO₂e per KWh */
  VeryHigh = "VeryHigh",
}

/**
 * Scope 2 carbon emission preference for the backend. When specified, the load balancer will optimize traffic flow by routing to regions that have carbon emission less than or equal to the specified category. However, when all other backends are not available it will route traffic to these regions anyway. This requires the backend to be attributed with 'azureRegion' information. \
 * {@link KnownCarbonEmissionCategory} can be used interchangeably with CarbonEmissionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VeryLow**: Carbon intensity of less than or equal to 150 grams CO₂e per KWh \
 * **Low**: Carbon intensity between 151 & 300 (incl) grams CO₂e per KWh \
 * **Medium**: Carbon intensity between 301 & 500 (incl) grams CO₂e per KWh \
 * **High**: Carbon intensity between 501 & 700 (incl) grams CO₂e per KWh \
 * **VeryHigh**: Carbon intensity of more than 700 grams CO₂e per KWh
 */
export type CarbonEmissionCategory = string;

/** The session stickiness properties of the backend pool. */
export interface BackendSessionAffinity {
  /** The id that identifies the requests belonging to the same session. */
  sessionId?: BackendSessionId;
}

export function backendSessionAffinitySerializer(item: BackendSessionAffinity): any {
  return {
    sessionId: !item["sessionId"]
      ? item["sessionId"]
      : backendSessionIdSerializer(item["sessionId"]),
  };
}

export function backendSessionAffinityDeserializer(item: any): BackendSessionAffinity {
  return {
    sessionId: !item["sessionId"]
      ? item["sessionId"]
      : backendSessionIdDeserializer(item["sessionId"]),
  };
}

/** The properties of the id that identifies the requests belonging to the same session. */
export interface BackendSessionId {
  /** Source from where the session id is extracted. */
  source?: BackendSessionIdSource;
  /** Name of the variable that refers to the session id. */
  name?: string;
}

export function backendSessionIdSerializer(item: BackendSessionId): any {
  return { source: item["source"], name: item["name"] };
}

export function backendSessionIdDeserializer(item: any): BackendSessionId {
  return {
    source: item["source"],
    name: item["name"],
  };
}

/** Source from where the session id is extracted. */
export enum KnownBackendSessionIdSource {
  /** The session id is set by APIM gateway in a cookie and is extracted from the cookies in client requests. */
  Cookie = "cookie",
}

/**
 * Source from where the session id is extracted. \
 * {@link KnownBackendSessionIdSource} can be used interchangeably with BackendSessionIdSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cookie**: The session id is set by APIM gateway in a cookie and is extracted from the cookies in client requests.
 */
export type BackendSessionIdSource = string;

/** Backend update parameters. */
export interface BackendUpdateParameters {
  /** Backend Title. */
  title?: string;
  /** Backend Description. */
  description?: string;
  /** Management Uri of the Resource in External System. This URL can be the Arm Resource Id of Logic Apps, Function Apps or API Apps. */
  resourceId?: string;
  /** Backend Properties contract */
  properties?: BackendProperties;
  /** Backend Credentials Contract Properties */
  credentials?: BackendCredentialsContract;
  /** Backend gateway Contract Properties */
  proxy?: BackendProxyContract;
  /** Backend TLS Properties */
  tls?: BackendTlsProperties;
  /** Backend Circuit Breaker Configuration */
  circuitBreaker?: BackendCircuitBreaker;
  /** Azure region in which the backend is deployed. Can be optionally specified to use features such as carbon-optimized load balancer. */
  azureRegion?: string;
  /** Backend Pool Properties */
  pool?: BackendBaseParametersPool;
  /** Type of the backend. A backend can be either Single or Pool. */
  type?: BackendType;
  /** Runtime Url of the Backend. */
  url?: string;
  /** Backend communication protocol. */
  protocol?: BackendProtocol;
}

export function backendUpdateParametersSerializer(item: BackendUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "title",
      "description",
      "resourceId",
      "properties",
      "credentials",
      "proxy",
      "tls",
      "circuitBreaker",
      "azureRegion",
      "pool",
      "type",
      "url",
      "protocol",
    ])
      ? undefined
      : _backendUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Backend operation. */
export interface BackendUpdateParameterProperties extends BackendBaseParameters {
  /** Runtime Url of the Backend. */
  url?: string;
  /** Backend communication protocol. */
  protocol?: BackendProtocol;
}

export function backendUpdateParameterPropertiesSerializer(
  item: BackendUpdateParameterProperties,
): any {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesSerializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractSerializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractSerializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesSerializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerSerializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolSerializer(item["pool"]),
    type: item["type"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

/** Paged Backend list representation. */
export interface _BackendCollection {
  /** Backend values. */
  value?: BackendContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _backendCollectionDeserializer(item: any): _BackendCollection {
  return {
    value: !item["value"] ? item["value"] : backendContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function backendContractArraySerializer(result: Array<BackendContract>): any[] {
  return result.map((item) => {
    return backendContractSerializer(item);
  });
}

export function backendContractArrayDeserializer(result: Array<BackendContract>): any[] {
  return result.map((item) => {
    return backendContractDeserializer(item);
  });
}

/** Certificate details. */
export interface CertificateContract extends ProxyResource {
  /** Subject attribute of the certificate. */
  subject?: string;
  /** Thumbprint of the certificate. */
  thumbprint?: string;
  /** Expiration date of the certificate. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate?: Date;
  /** KeyVault location details of the certificate. */
  keyVault?: KeyVaultContractProperties;
}

export function certificateContractDeserializer(item: any): CertificateContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _certificateContractPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Certificate contract. */
export interface CertificateContractProperties {
  /** Subject attribute of the certificate. */
  subject: string;
  /** Thumbprint of the certificate. */
  thumbprint: string;
  /** Expiration date of the certificate. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate: Date;
  /** KeyVault location details of the certificate. */
  keyVault?: KeyVaultContractProperties;
}

export function certificateContractPropertiesDeserializer(
  item: any,
): CertificateContractProperties {
  return {
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    expirationDate: new Date(item["expirationDate"]),
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractPropertiesDeserializer(item["keyVault"]),
  };
}

/** KeyVault contract details. */
export interface KeyVaultContractProperties extends KeyVaultContractCreateProperties {
  /** Last time sync and refresh status of secret from key vault. */
  lastStatus?: KeyVaultLastAccessStatusContractProperties;
}

export function keyVaultContractPropertiesDeserializer(item: any): KeyVaultContractProperties {
  return {
    secretIdentifier: item["secretIdentifier"],
    identityClientId: item["identityClientId"],
    lastStatus: !item["lastStatus"]
      ? item["lastStatus"]
      : keyVaultLastAccessStatusContractPropertiesDeserializer(item["lastStatus"]),
  };
}

/** Issue contract Update Properties. */
export interface KeyVaultLastAccessStatusContractProperties {
  /** Last status code for sync and refresh of secret from key vault. */
  code?: string;
  /** Details of the error else empty. */
  message?: string;
  /** Last time secret was accessed. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  timeStampUtc?: Date;
}

export function keyVaultLastAccessStatusContractPropertiesDeserializer(
  item: any,
): KeyVaultLastAccessStatusContractProperties {
  return {
    code: item["code"],
    message: item["message"],
    timeStampUtc: !item["timeStampUtc"] ? item["timeStampUtc"] : new Date(item["timeStampUtc"]),
  };
}

/** Create keyVault contract details. */
export interface KeyVaultContractCreateProperties {
  /** Key vault secret identifier for fetching secret. Providing a versioned secret will prevent auto-refresh. This requires API Management service to be configured with aka.ms/apimmsi */
  secretIdentifier?: string;
  /** Null for SystemAssignedIdentity or Client Id for UserAssignedIdentity , which will be used to access key vault secret. */
  identityClientId?: string;
}

export function keyVaultContractCreatePropertiesSerializer(
  item: KeyVaultContractCreateProperties,
): any {
  return { secretIdentifier: item["secretIdentifier"], identityClientId: item["identityClientId"] };
}

export function keyVaultContractCreatePropertiesDeserializer(
  item: any,
): KeyVaultContractCreateProperties {
  return {
    secretIdentifier: item["secretIdentifier"],
    identityClientId: item["identityClientId"],
  };
}

/** Certificate create or update details. */
export interface CertificateCreateOrUpdateParameters {
  /** Base 64 encoded certificate using the application/x-pkcs12 representation. */
  data?: string;
  /** Password for the Certificate */
  password?: string;
  /** KeyVault location details of the certificate. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function certificateCreateOrUpdateParametersSerializer(
  item: CertificateCreateOrUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["data", "password", "keyVault"])
      ? undefined
      : _certificateCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the CreateOrUpdate certificate operation. */
export interface CertificateCreateOrUpdateProperties {
  /** Base 64 encoded certificate using the application/x-pkcs12 representation. */
  data?: string;
  /** Password for the Certificate */
  password?: string;
  /** KeyVault location details of the certificate. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function certificateCreateOrUpdatePropertiesSerializer(
  item: CertificateCreateOrUpdateProperties,
): any {
  return {
    data: item["data"],
    password: item["password"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

/** Paged Certificates list representation. */
export interface _CertificateCollection {
  /** Page values. */
  value?: CertificateContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _certificateCollectionDeserializer(item: any): _CertificateCollection {
  return {
    value: !item["value"] ? item["value"] : certificateContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function certificateContractArrayDeserializer(result: Array<CertificateContract>): any[] {
  return result.map((item) => {
    return certificateContractDeserializer(item);
  });
}

/** Contract details. */
export interface GroupContract extends ProxyResource {
  /** Group name. */
  displayName?: string;
  /** Group description. Can contain HTML formatting tags. */
  description?: string;
  /** true if the group is one of the three system groups (Administrators, Developers, or Guests); otherwise false. */
  readonly builtIn?: boolean;
  /** Group type. */
  typePropertiesType?: GroupType;
  /** For external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupContractDeserializer(item: any): GroupContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _groupContractPropertiesDeserializer(item["properties"])),
  };
}

/** Group contract Properties. */
export interface GroupContractProperties {
  /** Group name. */
  displayName: string;
  /** Group description. Can contain HTML formatting tags. */
  description?: string;
  /** true if the group is one of the three system groups (Administrators, Developers, or Guests); otherwise false. */
  readonly builtIn?: boolean;
  /** Group type. */
  type?: GroupType;
  /** For external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupContractPropertiesDeserializer(item: any): GroupContractProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    builtIn: item["builtIn"],
    type: item["type"],
    externalId: item["externalId"],
  };
}

/** Group type. */
export type GroupType = "custom" | "system" | "external";

/** Parameters supplied to the Create Group operation. */
export interface GroupCreateParameters {
  /** Group name. */
  displayName?: string;
  /** Group description. */
  description?: string;
  /** Group type. */
  type?: GroupType;
  /** Identifier of the external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupCreateParametersSerializer(item: GroupCreateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "description", "type", "externalId"])
      ? undefined
      : _groupCreateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Create Group operation. */
export interface GroupCreateParametersProperties {
  /** Group name. */
  displayName: string;
  /** Group description. */
  description?: string;
  /** Group type. */
  type?: GroupType;
  /** Identifier of the external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupCreateParametersPropertiesSerializer(
  item: GroupCreateParametersProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    type: item["type"],
    externalId: item["externalId"],
  };
}

/** Parameters supplied to the Update Group operation. */
export interface GroupUpdateParameters {
  /** Group name. */
  displayName?: string;
  /** Group description. */
  description?: string;
  /** Group type. */
  type?: GroupType;
  /** Identifier of the external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupUpdateParametersSerializer(item: GroupUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "description", "type", "externalId"])
      ? undefined
      : _groupUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Group operation. */
export interface GroupUpdateParametersProperties {
  /** Group name. */
  displayName?: string;
  /** Group description. */
  description?: string;
  /** Group type. */
  type?: GroupType;
  /** Identifier of the external groups, this property contains the id of the group from the external identity provider, e.g. for Azure Active Directory `aad://<tenant>.onmicrosoft.com/groups/<group object id>`; otherwise the value is null. */
  externalId?: string;
}

export function groupUpdateParametersPropertiesSerializer(
  item: GroupUpdateParametersProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    type: item["type"],
    externalId: item["externalId"],
  };
}

/** Paged Group list representation. */
export interface _GroupCollection {
  /** Page values. */
  value?: GroupContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _groupCollectionDeserializer(item: any): _GroupCollection {
  return {
    value: !item["value"] ? item["value"] : groupContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function groupContractArrayDeserializer(result: Array<GroupContract>): any[] {
  return result.map((item) => {
    return groupContractDeserializer(item);
  });
}

/** Logger details. */
export interface LoggerContract extends ProxyResource {
  /** Logger type. */
  loggerType?: LoggerType;
  /** Logger description. */
  description?: string;
  /**
   * The name and SendRule connection string of the event hub for azureEventHub logger.
   * Instrumentation key for applicationInsights logger.
   */
  credentials?: Record<string, string>;
  /** Whether records are buffered in the logger before publishing. Default is assumed to be true. */
  isBuffered?: boolean;
  /** Azure Resource Id of a log target (either Azure Event Hub resource or Azure Application Insights resource). */
  resourceId?: string;
}

export function loggerContractSerializer(item: LoggerContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "loggerType",
      "description",
      "credentials",
      "isBuffered",
      "resourceId",
    ])
      ? undefined
      : _loggerContractPropertiesSerializer(item),
  };
}

export function loggerContractDeserializer(item: any): LoggerContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _loggerContractPropertiesDeserializer(item["properties"])),
  };
}

/** The Logger entity in API Management represents an event sink that you can use to log API Management events. Currently the Logger entity supports logging API Management events to Azure Event Hubs. */
export interface LoggerContractProperties {
  /** Logger type. */
  loggerType: LoggerType;
  /** Logger description. */
  description?: string;
  /**
   * The name and SendRule connection string of the event hub for azureEventHub logger.
   * Instrumentation key for applicationInsights logger.
   */
  credentials?: Record<string, string>;
  /** Whether records are buffered in the logger before publishing. Default is assumed to be true. */
  isBuffered?: boolean;
  /** Azure Resource Id of a log target (either Azure Event Hub resource or Azure Application Insights resource). */
  resourceId?: string;
}

export function loggerContractPropertiesSerializer(item: LoggerContractProperties): any {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: item["credentials"],
    isBuffered: item["isBuffered"],
    resourceId: item["resourceId"],
  };
}

export function loggerContractPropertiesDeserializer(item: any): LoggerContractProperties {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : Object.fromEntries(
          Object.entries(item["credentials"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isBuffered: item["isBuffered"],
    resourceId: item["resourceId"],
  };
}

/** Logger type. */
export enum KnownLoggerType {
  /** Azure Event Hub as log destination. */
  AzureEventHub = "azureEventHub",
  /** Azure Application Insights as log destination. */
  ApplicationInsights = "applicationInsights",
  /** Azure Monitor */
  AzureMonitor = "azureMonitor",
}

/**
 * Logger type. \
 * {@link KnownLoggerType} can be used interchangeably with LoggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureEventHub**: Azure Event Hub as log destination. \
 * **applicationInsights**: Azure Application Insights as log destination. \
 * **azureMonitor**: Azure Monitor
 */
export type LoggerType = string;

/** Logger update contract. */
export interface LoggerUpdateContract {
  /** Logger type. */
  loggerType?: LoggerType;
  /** Logger description. */
  description?: string;
  /** Logger credentials. */
  credentials?: Record<string, string>;
  /** Whether records are buffered in the logger before publishing. Default is assumed to be true. */
  isBuffered?: boolean;
}

export function loggerUpdateContractSerializer(item: LoggerUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "loggerType",
      "description",
      "credentials",
      "isBuffered",
    ])
      ? undefined
      : _loggerUpdateContractPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Logger operation. */
export interface LoggerUpdateParameters {
  /** Logger type. */
  loggerType?: LoggerType;
  /** Logger description. */
  description?: string;
  /** Logger credentials. */
  credentials?: Record<string, string>;
  /** Whether records are buffered in the logger before publishing. Default is assumed to be true. */
  isBuffered?: boolean;
}

export function loggerUpdateParametersSerializer(item: LoggerUpdateParameters): any {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: item["credentials"],
    isBuffered: item["isBuffered"],
  };
}

/** Paged Logger list representation. */
export interface _LoggerCollection {
  /** Logger values. */
  value?: LoggerContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _loggerCollectionDeserializer(item: any): _LoggerCollection {
  return {
    value: !item["value"] ? item["value"] : loggerContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function loggerContractArraySerializer(result: Array<LoggerContract>): any[] {
  return result.map((item) => {
    return loggerContractSerializer(item);
  });
}

export function loggerContractArrayDeserializer(result: Array<LoggerContract>): any[] {
  return result.map((item) => {
    return loggerContractDeserializer(item);
  });
}

/** NamedValue details. */
export interface NamedValueContract extends ProxyResource {
  /** Optional tags that when provided can be used to filter the NamedValue list. */
  tags?: string[];
  /** Determines whether the value is a secret and should be encrypted or not. Default value is false. */
  secret?: boolean;
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName?: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractProperties;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function namedValueContractDeserializer(item: any): NamedValueContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _namedValueContractPropertiesDeserializer(item["properties"])),
  };
}

/** NamedValue Contract properties. */
export interface NamedValueContractProperties extends NamedValueEntityBaseParameters {
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractProperties;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function namedValueContractPropertiesDeserializer(item: any): NamedValueContractProperties {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractPropertiesDeserializer(item["keyVault"]),
    provisioningState: item["provisioningState"],
  };
}

/** NamedValue Entity Base Parameters set. */
export interface NamedValueEntityBaseParameters {
  /** Optional tags that when provided can be used to filter the NamedValue list. */
  tags?: string[];
  /** Determines whether the value is a secret and should be encrypted or not. Default value is false. */
  secret?: boolean;
}

export function namedValueEntityBaseParametersSerializer(
  item: NamedValueEntityBaseParameters,
): any {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
  };
}

export function namedValueEntityBaseParametersDeserializer(
  item: any,
): NamedValueEntityBaseParameters {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
  };
}

/** NamedValue details. */
export interface NamedValueCreateContract extends ProxyResource {
  /** Optional tags that when provided can be used to filter the NamedValue list. */
  tags?: string[];
  /** Determines whether the value is a secret and should be encrypted or not. Default value is false. */
  secret?: boolean;
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName?: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function namedValueCreateContractSerializer(item: NamedValueCreateContract): any {
  return {
    properties: areAllPropsUndefined(item, ["tags", "secret", "displayName", "value", "keyVault"])
      ? undefined
      : _namedValueCreateContractPropertiesSerializer(item),
  };
}

/** NamedValue Contract properties. */
export interface NamedValueCreateContractProperties extends NamedValueEntityBaseParameters {
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function namedValueCreateContractPropertiesSerializer(
  item: NamedValueCreateContractProperties,
): any {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

/** NamedValue update Parameters. */
export interface NamedValueUpdateParameters {
  /** Optional tags that when provided can be used to filter the NamedValue list. */
  tags?: string[];
  /** Determines whether the value is a secret and should be encrypted or not. Default value is false. */
  secret?: boolean;
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName?: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function namedValueUpdateParametersSerializer(item: NamedValueUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["tags", "secret", "displayName", "value", "keyVault"])
      ? undefined
      : _namedValueUpdateParametersPropertiesSerializer(item),
  };
}

/** NamedValue Contract properties. */
export interface NamedValueUpdateParameterProperties extends NamedValueEntityBaseParameters {
  /** Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters. */
  displayName?: string;
  /** Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace. */
  value?: string;
  /** KeyVault location details of the namedValue. */
  keyVault?: KeyVaultContractCreateProperties;
}

export function namedValueUpdateParameterPropertiesSerializer(
  item: NamedValueUpdateParameterProperties,
): any {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

/** Paged NamedValue list representation. */
export interface _NamedValueCollection {
  /** Page values. */
  value?: NamedValueContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _namedValueCollectionDeserializer(item: any): _NamedValueCollection {
  return {
    value: !item["value"] ? item["value"] : namedValueContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function namedValueContractArrayDeserializer(result: Array<NamedValueContract>): any[] {
  return result.map((item) => {
    return namedValueContractDeserializer(item);
  });
}

/** Client or app secret used in IdentityProviders, Aad, OpenID or OAuth. */
export interface NamedValueSecretContract {
  /** This is secret value of the NamedValue entity. */
  value?: string;
}

export function namedValueSecretContractDeserializer(item: any): NamedValueSecretContract {
  return {
    value: item["value"],
  };
}

/** Notification details. */
export interface NotificationContract extends ProxyResource {
  /** Title of the Notification. */
  title?: string;
  /** Description of the Notification. */
  description?: string;
  /** Recipient Parameter values. */
  recipients?: RecipientsContractProperties;
}

export function notificationContractDeserializer(item: any): NotificationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _notificationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Notification Contract properties. */
export interface NotificationContractProperties {
  /** Title of the Notification. */
  title: string;
  /** Description of the Notification. */
  description?: string;
  /** Recipient Parameter values. */
  recipients?: RecipientsContractProperties;
}

export function notificationContractPropertiesDeserializer(
  item: any,
): NotificationContractProperties {
  return {
    title: item["title"],
    description: item["description"],
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientsContractPropertiesDeserializer(item["recipients"]),
  };
}

/** Notification Parameter contract. */
export interface RecipientsContractProperties {
  /** List of Emails subscribed for the notification. */
  emails?: string[];
  /** List of Users subscribed for the notification. */
  users?: string[];
}

export function recipientsContractPropertiesDeserializer(item: any): RecipientsContractProperties {
  return {
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
    users: !item["users"]
      ? item["users"]
      : item["users"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link NotificationName} that the service accepts. */
export enum KnownNotificationName {
  /** The following email recipients and users will receive email notifications about subscription requests for API products requiring approval. */
  RequestPublisherNotificationMessage = "RequestPublisherNotificationMessage",
  /** The following email recipients and users will receive email notifications about new API product subscriptions. */
  PurchasePublisherNotificationMessage = "PurchasePublisherNotificationMessage",
  /** The following email recipients and users will receive email notifications when new applications are submitted to the application gallery. */
  NewApplicationNotificationMessage = "NewApplicationNotificationMessage",
  /** The following recipients will receive blind carbon copies of all emails sent to developers. */
  BCC = "BCC",
  /** The following email recipients and users will receive email notifications when a new issue or comment is submitted on the developer portal. */
  NewIssuePublisherNotificationMessage = "NewIssuePublisherNotificationMessage",
  /** The following email recipients and users will receive email notifications when developer closes his account. */
  AccountClosedPublisher = "AccountClosedPublisher",
  /** The following email recipients and users will receive email notifications when subscription usage gets close to usage quota. */
  QuotaLimitApproachingPublisherNotificationMessage = "QuotaLimitApproachingPublisherNotificationMessage",
}

/** Type of NotificationName */
export type NotificationName = string;

/** Paged Notification list representation. */
export interface _NotificationCollection {
  /** Page values. */
  value?: NotificationContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _notificationCollectionDeserializer(item: any): _NotificationCollection {
  return {
    value: !item["value"] ? item["value"] : notificationContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function notificationContractArrayDeserializer(result: Array<NotificationContract>): any[] {
  return result.map((item) => {
    return notificationContractDeserializer(item);
  });
}

/** Policy fragment contract details. */
export interface PolicyFragmentContract extends ProxyResource {
  /** Contents of the policy fragment. */
  value?: string;
  /** Policy fragment description. */
  description?: string;
  /** Format of the policy fragment content. */
  format?: PolicyFragmentContentFormat;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function policyFragmentContractSerializer(item: PolicyFragmentContract): any {
  return {
    properties: areAllPropsUndefined(item, ["value", "description", "format"])
      ? undefined
      : _policyFragmentContractPropertiesSerializer(item),
  };
}

export function policyFragmentContractDeserializer(item: any): PolicyFragmentContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyFragmentContractPropertiesDeserializer(item["properties"])),
  };
}

/** Policy fragment contract properties. */
export interface PolicyFragmentContractProperties {
  /** Contents of the policy fragment. */
  value: string;
  /** Policy fragment description. */
  description?: string;
  /** Format of the policy fragment content. */
  format?: PolicyFragmentContentFormat;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function policyFragmentContractPropertiesSerializer(
  item: PolicyFragmentContractProperties,
): any {
  return { value: item["value"], description: item["description"], format: item["format"] };
}

export function policyFragmentContractPropertiesDeserializer(
  item: any,
): PolicyFragmentContractProperties {
  return {
    value: item["value"],
    description: item["description"],
    format: item["format"],
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link PolicyFragmentContentFormat} that the service accepts. */
export enum KnownPolicyFragmentContentFormat {
  /** The contents are inline and Content type is an XML document. */
  Xml = "xml",
  /** The contents are inline and Content type is a non XML encoded policy document. */
  Rawxml = "rawxml",
}

/** Type of PolicyFragmentContentFormat */
export type PolicyFragmentContentFormat = string;

/** The response of the get policy fragments operation. */
export interface _PolicyFragmentCollection {
  /** Policy fragment contract value. */
  value?: PolicyFragmentContract[];
  /** Total record count number. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _policyFragmentCollectionDeserializer(item: any): _PolicyFragmentCollection {
  return {
    value: !item["value"] ? item["value"] : policyFragmentContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function policyFragmentContractArraySerializer(
  result: Array<PolicyFragmentContract>,
): any[] {
  return result.map((item) => {
    return policyFragmentContractSerializer(item);
  });
}

export function policyFragmentContractArrayDeserializer(
  result: Array<PolicyFragmentContract>,
): any[] {
  return result.map((item) => {
    return policyFragmentContractDeserializer(item);
  });
}

/** A collection of resources. */
export interface ResourceCollection {
  /** A collection of resources. */
  value?: ResourceCollectionValueItem[];
  /** Total record count number. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function resourceCollectionDeserializer(item: any): ResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : resourceCollectionValueItemArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function resourceCollectionValueItemArrayDeserializer(
  result: Array<ResourceCollectionValueItem>,
): any[] {
  return result.map((item) => {
    return resourceCollectionValueItemDeserializer(item);
  });
}

/** model interface ResourceCollectionValueItem */
export interface ResourceCollectionValueItem extends ProxyResource {}

export function resourceCollectionValueItemDeserializer(item: any): ResourceCollectionValueItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Sign-In settings for the Developer Portal. */
export interface PortalSigninSettings extends ProxyResource {
  /** Redirect Anonymous users to the Sign-In page. */
  enabled?: boolean;
}

export function portalSigninSettingsSerializer(item: PortalSigninSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _portalSigninSettingsPropertiesSerializer(item),
  };
}

export function portalSigninSettingsDeserializer(item: any): PortalSigninSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalSigninSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Sign-in settings contract properties. */
export interface PortalSigninSettingProperties {
  /** Redirect Anonymous users to the Sign-In page. */
  enabled?: boolean;
}

export function portalSigninSettingPropertiesSerializer(item: PortalSigninSettingProperties): any {
  return { enabled: item["enabled"] };
}

export function portalSigninSettingPropertiesDeserializer(
  item: any,
): PortalSigninSettingProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Sign-Up settings for a developer portal. */
export interface PortalSignupSettings extends ProxyResource {
  /** Allow users to sign up on a developer portal. */
  enabled?: boolean;
  /** Terms of service contract properties. */
  termsOfService?: TermsOfServiceProperties;
}

export function portalSignupSettingsSerializer(item: PortalSignupSettings): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled", "termsOfService"])
      ? undefined
      : _portalSignupSettingsPropertiesSerializer(item),
  };
}

export function portalSignupSettingsDeserializer(item: any): PortalSignupSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalSignupSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Sign-up settings contract properties. */
export interface PortalSignupSettingsProperties {
  /** Allow users to sign up on a developer portal. */
  enabled?: boolean;
  /** Terms of service contract properties. */
  termsOfService?: TermsOfServiceProperties;
}

export function portalSignupSettingsPropertiesSerializer(
  item: PortalSignupSettingsProperties,
): any {
  return {
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesSerializer(item["termsOfService"]),
  };
}

export function portalSignupSettingsPropertiesDeserializer(
  item: any,
): PortalSignupSettingsProperties {
  return {
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesDeserializer(item["termsOfService"]),
  };
}

/** Terms of service contract properties. */
export interface TermsOfServiceProperties {
  /** A terms of service text. */
  text?: string;
  /** Display terms of service during a sign-up process. */
  enabled?: boolean;
  /** Ask user for consent to the terms of service. */
  consentRequired?: boolean;
}

export function termsOfServicePropertiesSerializer(item: TermsOfServiceProperties): any {
  return { text: item["text"], enabled: item["enabled"], consentRequired: item["consentRequired"] };
}

export function termsOfServicePropertiesDeserializer(item: any): TermsOfServiceProperties {
  return {
    text: item["text"],
    enabled: item["enabled"],
    consentRequired: item["consentRequired"],
  };
}

/** Delegation settings for a developer portal. */
export interface PortalDelegationSettings extends ProxyResource {
  /** A delegation Url. */
  url?: string;
  /** A base64-encoded validation key to validate, that a request is coming from Azure API Management. */
  validationKey?: string;
  /** Subscriptions delegation settings. */
  subscriptions?: SubscriptionsDelegationSettingsProperties;
  /** User registration delegation settings. */
  userRegistration?: RegistrationDelegationSettingsProperties;
}

export function portalDelegationSettingsSerializer(item: PortalDelegationSettings): any {
  return {
    properties: areAllPropsUndefined(item, [
      "url",
      "validationKey",
      "subscriptions",
      "userRegistration",
    ])
      ? undefined
      : _portalDelegationSettingsPropertiesSerializer(item),
  };
}

export function portalDelegationSettingsDeserializer(item: any): PortalDelegationSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalDelegationSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Delegation settings contract properties. */
export interface PortalDelegationSettingsProperties {
  /** A delegation Url. */
  url?: string;
  /** A base64-encoded validation key to validate, that a request is coming from Azure API Management. */
  validationKey?: string;
  /** Subscriptions delegation settings. */
  subscriptions?: SubscriptionsDelegationSettingsProperties;
  /** User registration delegation settings. */
  userRegistration?: RegistrationDelegationSettingsProperties;
}

export function portalDelegationSettingsPropertiesSerializer(
  item: PortalDelegationSettingsProperties,
): any {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesSerializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesSerializer(item["userRegistration"]),
  };
}

export function portalDelegationSettingsPropertiesDeserializer(
  item: any,
): PortalDelegationSettingsProperties {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesDeserializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesDeserializer(item["userRegistration"]),
  };
}

/** Subscriptions delegation settings properties. */
export interface SubscriptionsDelegationSettingsProperties {
  /** Enable or disable delegation for subscriptions. */
  enabled?: boolean;
}

export function subscriptionsDelegationSettingsPropertiesSerializer(
  item: SubscriptionsDelegationSettingsProperties,
): any {
  return { enabled: item["enabled"] };
}

export function subscriptionsDelegationSettingsPropertiesDeserializer(
  item: any,
): SubscriptionsDelegationSettingsProperties {
  return {
    enabled: item["enabled"],
  };
}

/** User registration delegation settings properties. */
export interface RegistrationDelegationSettingsProperties {
  /** Enable or disable delegation for user registration. */
  enabled?: boolean;
}

export function registrationDelegationSettingsPropertiesSerializer(
  item: RegistrationDelegationSettingsProperties,
): any {
  return { enabled: item["enabled"] };
}

export function registrationDelegationSettingsPropertiesDeserializer(
  item: any,
): RegistrationDelegationSettingsProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Client or app secret used in IdentityProviders, Aad, OpenID or OAuth. */
export interface PortalSettingValidationKeyContract {
  /** This is secret value of the validation key in portal settings. */
  validationKey?: string;
}

export function portalSettingValidationKeyContractDeserializer(
  item: any,
): PortalSettingValidationKeyContract {
  return {
    validationKey: item["validationKey"],
  };
}

/** Product details. */
export interface ProductContract extends ProxyResource {
  /** Product description. May include HTML formatting tags. */
  description?: string;
  /** Product terms of use. Developers trying to subscribe to the product will be presented and required to accept these terms before they can complete the subscription process. */
  terms?: string;
  /** Whether a product subscription is required for accessing APIs included in this product. If true, the product is referred to as "protected" and a valid subscription key is required for a request to an API included in the product to succeed. If false, the product is referred to as "open" and requests to an API included in the product can be made without a subscription key. If property is omitted when creating a new product it's value is assumed to be true. */
  subscriptionRequired?: boolean;
  /** whether subscription approval is required. If false, new subscriptions will be approved automatically enabling developers to call the product’s APIs immediately after subscribing. If true, administrators must manually approve the subscription before the developer can any of the product’s APIs. Can be present only if subscriptionRequired property is present and has a value of false. */
  approvalRequired?: boolean;
  /** Whether the number of subscriptions a user can have to this product at the same time. Set to null or omit to allow unlimited per user subscriptions. Can be present only if subscriptionRequired property is present and has a value of false. */
  subscriptionsLimit?: number;
  /** Type of supported authentication for the product. The application configuration is required for application-token authentication type. The subscription-key authentication type is used by default. If the property is omitted, the subscription-key authentication type is used. */
  authenticationType?: ProductAuthType[];
  /** Specifies identity provider settings needed to authorize applications API calls. */
  application?: ProductEntityBaseParametersApplication;
  /** whether product is published or not. Published products are discoverable by users of developer portal. Non published products are visible only to administrators. Default state of Product is notPublished. */
  state?: ProductState;
  /** Product name. */
  displayName?: string;
}

export function productContractSerializer(item: ProductContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "terms",
      "subscriptionRequired",
      "approvalRequired",
      "subscriptionsLimit",
      "authenticationType",
      "application",
      "state",
      "displayName",
    ])
      ? undefined
      : _productContractPropertiesSerializer(item),
  };
}

export function productContractDeserializer(item: any): ProductContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _productContractPropertiesDeserializer(item["properties"])),
  };
}

/** Product profile. */
export interface ProductContractProperties extends ProductEntityBaseParameters {
  /** Product name. */
  displayName: string;
}

export function productContractPropertiesSerializer(item: ProductContractProperties): any {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationSerializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

export function productContractPropertiesDeserializer(item: any): ProductContractProperties {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationDeserializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

/** Product Entity Base Parameters */
export interface ProductEntityBaseParameters {
  /** Product description. May include HTML formatting tags. */
  description?: string;
  /** Product terms of use. Developers trying to subscribe to the product will be presented and required to accept these terms before they can complete the subscription process. */
  terms?: string;
  /** Whether a product subscription is required for accessing APIs included in this product. If true, the product is referred to as "protected" and a valid subscription key is required for a request to an API included in the product to succeed. If false, the product is referred to as "open" and requests to an API included in the product can be made without a subscription key. If property is omitted when creating a new product it's value is assumed to be true. */
  subscriptionRequired?: boolean;
  /** whether subscription approval is required. If false, new subscriptions will be approved automatically enabling developers to call the product’s APIs immediately after subscribing. If true, administrators must manually approve the subscription before the developer can any of the product’s APIs. Can be present only if subscriptionRequired property is present and has a value of false. */
  approvalRequired?: boolean;
  /** Whether the number of subscriptions a user can have to this product at the same time. Set to null or omit to allow unlimited per user subscriptions. Can be present only if subscriptionRequired property is present and has a value of false. */
  subscriptionsLimit?: number;
  /** Type of supported authentication for the product. The application configuration is required for application-token authentication type. The subscription-key authentication type is used by default. If the property is omitted, the subscription-key authentication type is used. */
  authenticationType?: ProductAuthType[];
  /** Specifies identity provider settings needed to authorize applications API calls. */
  application?: ProductEntityBaseParametersApplication;
  /** whether product is published or not. Published products are discoverable by users of developer portal. Non published products are visible only to administrators. Default state of Product is notPublished. */
  state?: ProductState;
}

export function productEntityBaseParametersSerializer(item: ProductEntityBaseParameters): any {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationSerializer(item["application"]),
    state: item["state"],
  };
}

export function productEntityBaseParametersDeserializer(item: any): ProductEntityBaseParameters {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationDeserializer(item["application"]),
    state: item["state"],
  };
}

/** Known values of {@link ProductAuthType} that the service accepts. */
export enum KnownProductAuthType {
  /** subscription-key */
  SubscriptionKey = "subscription-key",
  /** application-token */
  ApplicationToken = "application-token",
}

/** Type of ProductAuthType */
export type ProductAuthType = string;

/** Specifies identity provider settings needed to authorize applications API calls. */
export interface ProductEntityBaseParametersApplication extends ProductApplicationContract {}

export function productEntityBaseParametersApplicationSerializer(
  item: ProductEntityBaseParametersApplication,
): any {
  return {
    entra: !item["entra"]
      ? item["entra"]
      : productApplicationContractEntraSerializer(item["entra"]),
  };
}

export function productEntityBaseParametersApplicationDeserializer(
  item: any,
): ProductEntityBaseParametersApplication {
  return {
    entra: !item["entra"]
      ? item["entra"]
      : productApplicationContractEntraDeserializer(item["entra"]),
  };
}

/** whether product is published or not. Published products are discoverable by users of developer portal. Non published products are visible only to administrators. Default state of Product is notPublished. */
export type ProductState = "notPublished" | "published";

/** Specifies Microsoft Entra settings needed to authorize product API calls using client applications. */
export interface ProductApplicationContract {
  /** Specifies Microsoft Entra settings needed to authorize product API calls using client application with Microsoft Entra OAuth token. */
  entra?: ProductApplicationContractEntra;
}

export function productApplicationContractSerializer(item: ProductApplicationContract): any {
  return {
    entra: !item["entra"]
      ? item["entra"]
      : productApplicationContractEntraSerializer(item["entra"]),
  };
}

export function productApplicationContractDeserializer(item: any): ProductApplicationContract {
  return {
    entra: !item["entra"]
      ? item["entra"]
      : productApplicationContractEntraDeserializer(item["entra"]),
  };
}

/** Specifies Microsoft Entra settings needed to authorize product API calls using client application with Microsoft Entra OAuth token. */
export interface ProductApplicationContractEntra {
  /** Product facing EntraID application client ID. */
  applicationId?: string;
  /** The EntraID application audience claim. The audience claim is used to validate the token. */
  audience?: string;
}

export function productApplicationContractEntraSerializer(
  item: ProductApplicationContractEntra,
): any {
  return { applicationId: item["applicationId"], audience: item["audience"] };
}

export function productApplicationContractEntraDeserializer(
  item: any,
): ProductApplicationContractEntra {
  return {
    applicationId: item["applicationId"],
    audience: item["audience"],
  };
}

/** Product Update parameters. */
export interface ProductUpdateParameters {
  /** Product description. May include HTML formatting tags. */
  description?: string;
  /** Product terms of use. Developers trying to subscribe to the product will be presented and required to accept these terms before they can complete the subscription process. */
  terms?: string;
  /** Whether a product subscription is required for accessing APIs included in this product. If true, the product is referred to as "protected" and a valid subscription key is required for a request to an API included in the product to succeed. If false, the product is referred to as "open" and requests to an API included in the product can be made without a subscription key. If property is omitted when creating a new product it's value is assumed to be true. */
  subscriptionRequired?: boolean;
  /** whether subscription approval is required. If false, new subscriptions will be approved automatically enabling developers to call the product’s APIs immediately after subscribing. If true, administrators must manually approve the subscription before the developer can any of the product’s APIs. Can be present only if subscriptionRequired property is present and has a value of false. */
  approvalRequired?: boolean;
  /** Whether the number of subscriptions a user can have to this product at the same time. Set to null or omit to allow unlimited per user subscriptions. Can be present only if subscriptionRequired property is present and has a value of false. */
  subscriptionsLimit?: number;
  /** Type of supported authentication for the product. The application configuration is required for application-token authentication type. The subscription-key authentication type is used by default. If the property is omitted, the subscription-key authentication type is used. */
  authenticationType?: ProductAuthType[];
  /** Specifies identity provider settings needed to authorize applications API calls. */
  application?: ProductEntityBaseParametersApplication;
  /** whether product is published or not. Published products are discoverable by users of developer portal. Non published products are visible only to administrators. Default state of Product is notPublished. */
  state?: ProductState;
  /** Product name. */
  displayName?: string;
}

export function productUpdateParametersSerializer(item: ProductUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "terms",
      "subscriptionRequired",
      "approvalRequired",
      "subscriptionsLimit",
      "authenticationType",
      "application",
      "state",
      "displayName",
    ])
      ? undefined
      : _productUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Product operation. */
export interface ProductUpdateProperties extends ProductEntityBaseParameters {
  /** Product name. */
  displayName?: string;
}

export function productUpdatePropertiesSerializer(item: ProductUpdateProperties): any {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationSerializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

/** Paged Products list representation. */
export interface _ProductCollection {
  /** Page values. */
  value?: ProductContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _productCollectionDeserializer(item: any): _ProductCollection {
  return {
    value: !item["value"] ? item["value"] : productContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function productContractArraySerializer(result: Array<ProductContract>): any[] {
  return result.map((item) => {
    return productContractSerializer(item);
  });
}

export function productContractArrayDeserializer(result: Array<ProductContract>): any[] {
  return result.map((item) => {
    return productContractDeserializer(item);
  });
}

/** Product-API link details. */
export interface ProductApiLinkContract extends ProxyResource {
  /** Full resource Id of an API. */
  apiId?: string;
}

export function productApiLinkContractSerializer(item: ProductApiLinkContract): any {
  return {
    properties: areAllPropsUndefined(item, ["apiId"])
      ? undefined
      : _productApiLinkContractPropertiesSerializer(item),
  };
}

export function productApiLinkContractDeserializer(item: any): ProductApiLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _productApiLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** Product-API link entity properties. */
export interface ProductApiLinkContractProperties {
  /** Full resource Id of an API. */
  apiId: string;
}

export function productApiLinkContractPropertiesSerializer(
  item: ProductApiLinkContractProperties,
): any {
  return { apiId: item["apiId"] };
}

export function productApiLinkContractPropertiesDeserializer(
  item: any,
): ProductApiLinkContractProperties {
  return {
    apiId: item["apiId"],
  };
}

/** Paged Product-API link list representation. */
export interface _ProductApiLinkCollection {
  /** Page values. */
  value?: ProductApiLinkContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _productApiLinkCollectionDeserializer(item: any): _ProductApiLinkCollection {
  return {
    value: !item["value"] ? item["value"] : productApiLinkContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function productApiLinkContractArraySerializer(
  result: Array<ProductApiLinkContract>,
): any[] {
  return result.map((item) => {
    return productApiLinkContractSerializer(item);
  });
}

export function productApiLinkContractArrayDeserializer(
  result: Array<ProductApiLinkContract>,
): any[] {
  return result.map((item) => {
    return productApiLinkContractDeserializer(item);
  });
}

/** Product-group link details. */
export interface ProductGroupLinkContract extends ProxyResource {
  /** Full resource Id of a group. */
  groupId?: string;
}

export function productGroupLinkContractSerializer(item: ProductGroupLinkContract): any {
  return {
    properties: areAllPropsUndefined(item, ["groupId"])
      ? undefined
      : _productGroupLinkContractPropertiesSerializer(item),
  };
}

export function productGroupLinkContractDeserializer(item: any): ProductGroupLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _productGroupLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** Product-group link entity properties. */
export interface ProductGroupLinkContractProperties {
  /** Full resource Id of a group. */
  groupId: string;
}

export function productGroupLinkContractPropertiesSerializer(
  item: ProductGroupLinkContractProperties,
): any {
  return { groupId: item["groupId"] };
}

export function productGroupLinkContractPropertiesDeserializer(
  item: any,
): ProductGroupLinkContractProperties {
  return {
    groupId: item["groupId"],
  };
}

/** Paged Product-group link list representation. */
export interface _ProductGroupLinkCollection {
  /** Page values. */
  value?: ProductGroupLinkContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _productGroupLinkCollectionDeserializer(item: any): _ProductGroupLinkCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : productGroupLinkContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function productGroupLinkContractArraySerializer(
  result: Array<ProductGroupLinkContract>,
): any[] {
  return result.map((item) => {
    return productGroupLinkContractSerializer(item);
  });
}

export function productGroupLinkContractArrayDeserializer(
  result: Array<ProductGroupLinkContract>,
): any[] {
  return result.map((item) => {
    return productGroupLinkContractDeserializer(item);
  });
}

/** Global Schema Contract details. */
export interface GlobalSchemaContract extends ProxyResource {
  /** Schema Type. Immutable. */
  schemaType?: SchemaType;
  /** Free-form schema entity description. */
  description?: string;
  /** Json-encoded string for non json-based schema. */
  value?: any;
  /** Global Schema document object for json-based schema formats(e.g. json schema). */
  document?: any;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function globalSchemaContractSerializer(item: GlobalSchemaContract): any {
  return {
    properties: areAllPropsUndefined(item, ["SchemaType", "description", "value", "document"])
      ? undefined
      : _globalSchemaContractPropertiesSerializer(item),
  };
}

export function globalSchemaContractDeserializer(item: any): GlobalSchemaContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _globalSchemaContractPropertiesDeserializer(item["properties"])),
  };
}

/** Schema create or update contract Properties. */
export interface GlobalSchemaContractProperties {
  /** Schema Type. Immutable. */
  schemaType: SchemaType;
  /** Free-form schema entity description. */
  description?: string;
  /** Json-encoded string for non json-based schema. */
  value?: any;
  /** Global Schema document object for json-based schema formats(e.g. json schema). */
  document?: any;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function globalSchemaContractPropertiesSerializer(
  item: GlobalSchemaContractProperties,
): any {
  return {
    schemaType: item["schemaType"],
    description: item["description"],
    value: item["value"],
    document: item["document"],
  };
}

export function globalSchemaContractPropertiesDeserializer(
  item: any,
): GlobalSchemaContractProperties {
  return {
    schemaType: item["schemaType"],
    description: item["description"],
    value: item["value"],
    document: item["document"],
    provisioningState: item["provisioningState"],
  };
}

/** Schema Type. Immutable. */
export enum KnownSchemaType {
  /** XML schema type. */
  Xml = "xml",
  /** Json schema type. */
  Json = "json",
}

/**
 * Schema Type. Immutable. \
 * {@link KnownSchemaType} can be used interchangeably with SchemaType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **xml**: XML schema type. \
 * **json**: Json schema type.
 */
export type SchemaType = string;

/** The response of the list schema operation. */
export interface _GlobalSchemaCollection {
  /** Global Schema Contract value. */
  readonly value?: GlobalSchemaContract[];
  /** Total record count number. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _globalSchemaCollectionDeserializer(item: any): _GlobalSchemaCollection {
  return {
    value: !item["value"] ? item["value"] : globalSchemaContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function globalSchemaContractArraySerializer(result: Array<GlobalSchemaContract>): any[] {
  return result.map((item) => {
    return globalSchemaContractSerializer(item);
  });
}

export function globalSchemaContractArrayDeserializer(result: Array<GlobalSchemaContract>): any[] {
  return result.map((item) => {
    return globalSchemaContractDeserializer(item);
  });
}

/** Subscription details. */
export interface SubscriptionContract extends ProxyResource {
  /** The user resource identifier of the subscription owner. The value is a valid relative URL in the format of /users/{userId} where {userId} is a user identifier. */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId}. */
  scope?: string;
  /** The name of the subscription, or null if the subscription has no name. */
  displayName?: string;
  /** Subscription state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state?: SubscriptionState;
  /** Subscription creation date. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdDate?: Date;
  /** Subscription activation date. The setting is for audit purposes only and the subscription is not automatically activated. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  startDate?: Date;
  /** Subscription expiration date. The setting is for audit purposes only and the subscription is not automatically expired. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate?: Date;
  /** Date when subscription was cancelled or expired. The setting is for audit purposes only and the subscription is not automatically cancelled. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  endDate?: Date;
  /** Upcoming subscription expiration notification date. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  notificationDate?: Date;
  /** Subscription primary key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  primaryKey?: string;
  /** Subscription secondary key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  secondaryKey?: string;
  /** Optional subscription comment added by an administrator when the state is changed to the 'rejected'. */
  stateComment?: string;
  /** Determines whether tracing is enabled */
  allowTracing?: boolean;
}

export function subscriptionContractDeserializer(item: any): SubscriptionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _subscriptionContractPropertiesDeserializer(item["properties"])),
  };
}

/** Subscription details. */
export interface SubscriptionContractProperties {
  /** The user resource identifier of the subscription owner. The value is a valid relative URL in the format of /users/{userId} where {userId} is a user identifier. */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId}. */
  scope: string;
  /** The name of the subscription, or null if the subscription has no name. */
  displayName?: string;
  /** Subscription state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state: SubscriptionState;
  /** Subscription creation date. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdDate?: Date;
  /** Subscription activation date. The setting is for audit purposes only and the subscription is not automatically activated. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  startDate?: Date;
  /** Subscription expiration date. The setting is for audit purposes only and the subscription is not automatically expired. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate?: Date;
  /** Date when subscription was cancelled or expired. The setting is for audit purposes only and the subscription is not automatically cancelled. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  endDate?: Date;
  /** Upcoming subscription expiration notification date. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  notificationDate?: Date;
  /** Subscription primary key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  primaryKey?: string;
  /** Subscription secondary key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  secondaryKey?: string;
  /** Optional subscription comment added by an administrator when the state is changed to the 'rejected'. */
  stateComment?: string;
  /** Determines whether tracing is enabled */
  allowTracing?: boolean;
}

export function subscriptionContractPropertiesDeserializer(
  item: any,
): SubscriptionContractProperties {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    displayName: item["displayName"],
    state: item["state"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    notificationDate: !item["notificationDate"]
      ? item["notificationDate"]
      : new Date(item["notificationDate"]),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    stateComment: item["stateComment"],
    allowTracing: item["allowTracing"],
  };
}

/** Subscription state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
export type SubscriptionState =
  | "suspended"
  | "active"
  | "expired"
  | "submitted"
  | "rejected"
  | "cancelled";

/** Paged Subscriptions list representation. */
export interface _SubscriptionCollection {
  /** Page values. */
  value?: SubscriptionContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _subscriptionCollectionDeserializer(item: any): _SubscriptionCollection {
  return {
    value: !item["value"] ? item["value"] : subscriptionContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function subscriptionContractArrayDeserializer(result: Array<SubscriptionContract>): any[] {
  return result.map((item) => {
    return subscriptionContractDeserializer(item);
  });
}

/** Subscription create details. */
export interface SubscriptionCreateParameters {
  /** User (user id path) for whom subscription is being created in form /users/{userId} */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId}. */
  scope?: string;
  /** Subscription name. */
  displayName?: string;
  /** Primary subscription key. If not specified during request key will be generated automatically. */
  primaryKey?: string;
  /** Secondary subscription key. If not specified during request key will be generated automatically. */
  secondaryKey?: string;
  /** Initial subscription state. If no value is specified, subscription is created with Submitted state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state?: SubscriptionState;
  /** Determines whether tracing can be enabled */
  allowTracing?: boolean;
}

export function subscriptionCreateParametersSerializer(item: SubscriptionCreateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "ownerId",
      "scope",
      "displayName",
      "primaryKey",
      "secondaryKey",
      "state",
      "allowTracing",
    ])
      ? undefined
      : _subscriptionCreateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Create subscription operation. */
export interface SubscriptionCreateParameterProperties {
  /** User (user id path) for whom subscription is being created in form /users/{userId} */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId}. */
  scope: string;
  /** Subscription name. */
  displayName: string;
  /** Primary subscription key. If not specified during request key will be generated automatically. */
  primaryKey?: string;
  /** Secondary subscription key. If not specified during request key will be generated automatically. */
  secondaryKey?: string;
  /** Initial subscription state. If no value is specified, subscription is created with Submitted state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state?: SubscriptionState;
  /** Determines whether tracing can be enabled */
  allowTracing?: boolean;
}

export function subscriptionCreateParameterPropertiesSerializer(
  item: SubscriptionCreateParameterProperties,
): any {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    displayName: item["displayName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    state: item["state"],
    allowTracing: item["allowTracing"],
  };
}

/** Subscription update details. */
export interface SubscriptionUpdateParameters {
  /** User identifier path: /users/{userId} */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId} */
  scope?: string;
  /** Subscription expiration date. The setting is for audit purposes only and the subscription is not automatically expired. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate?: Date;
  /** Subscription name. */
  displayName?: string;
  /** Primary subscription key. */
  primaryKey?: string;
  /** Secondary subscription key. */
  secondaryKey?: string;
  /** Subscription state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state?: SubscriptionState;
  /** Comments describing subscription state change by the administrator when the state is changed to the 'rejected'. */
  stateComment?: string;
  /** Determines whether tracing can be enabled */
  allowTracing?: boolean;
}

export function subscriptionUpdateParametersSerializer(item: SubscriptionUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "ownerId",
      "scope",
      "expirationDate",
      "displayName",
      "primaryKey",
      "secondaryKey",
      "state",
      "stateComment",
      "allowTracing",
    ])
      ? undefined
      : _subscriptionUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update subscription operation. */
export interface SubscriptionUpdateParameterProperties {
  /** User identifier path: /users/{userId} */
  ownerId?: string;
  /** Scope like /products/{productId} or /apis or /apis/{apiId} */
  scope?: string;
  /** Subscription expiration date. The setting is for audit purposes only and the subscription is not automatically expired. The subscription lifecycle can be managed by using the `state` property. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expirationDate?: Date;
  /** Subscription name. */
  displayName?: string;
  /** Primary subscription key. */
  primaryKey?: string;
  /** Secondary subscription key. */
  secondaryKey?: string;
  /** Subscription state. Possible states are * active – the subscription is active, * suspended – the subscription is blocked, and the subscriber cannot call any APIs of the product, * submitted – the subscription request has been made by the developer, but has not yet been approved or rejected, * rejected – the subscription request has been denied by an administrator, * cancelled – the subscription has been cancelled by the developer or administrator, * expired – the subscription reached its expiration date and was deactivated. */
  state?: SubscriptionState;
  /** Comments describing subscription state change by the administrator when the state is changed to the 'rejected'. */
  stateComment?: string;
  /** Determines whether tracing can be enabled */
  allowTracing?: boolean;
}

export function subscriptionUpdateParameterPropertiesSerializer(
  item: SubscriptionUpdateParameterProperties,
): any {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
    displayName: item["displayName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    state: item["state"],
    stateComment: item["stateComment"],
    allowTracing: item["allowTracing"],
  };
}

/** Subscription keys. */
export interface SubscriptionKeysContract {
  /** Subscription primary key. */
  primaryKey?: string;
  /** Subscription secondary key. */
  secondaryKey?: string;
}

export function subscriptionKeysContractDeserializer(item: any): SubscriptionKeysContract {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** Tag-API link details. */
export interface TagApiLinkContract extends ProxyResource {
  /** Full resource Id of an API. */
  apiId?: string;
}

export function tagApiLinkContractSerializer(item: TagApiLinkContract): any {
  return {
    properties: areAllPropsUndefined(item, ["apiId"])
      ? undefined
      : _tagApiLinkContractPropertiesSerializer(item),
  };
}

export function tagApiLinkContractDeserializer(item: any): TagApiLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagApiLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tag-API link entity properties. */
export interface TagApiLinkContractProperties {
  /** Full resource Id of an API. */
  apiId: string;
}

export function tagApiLinkContractPropertiesSerializer(item: TagApiLinkContractProperties): any {
  return { apiId: item["apiId"] };
}

export function tagApiLinkContractPropertiesDeserializer(item: any): TagApiLinkContractProperties {
  return {
    apiId: item["apiId"],
  };
}

/** Paged Tag-API link list representation. */
export interface _TagApiLinkCollection {
  /** Page values. */
  value?: TagApiLinkContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagApiLinkCollectionDeserializer(item: any): _TagApiLinkCollection {
  return {
    value: !item["value"] ? item["value"] : tagApiLinkContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagApiLinkContractArraySerializer(result: Array<TagApiLinkContract>): any[] {
  return result.map((item) => {
    return tagApiLinkContractSerializer(item);
  });
}

export function tagApiLinkContractArrayDeserializer(result: Array<TagApiLinkContract>): any[] {
  return result.map((item) => {
    return tagApiLinkContractDeserializer(item);
  });
}

/** Tag-operation link details. */
export interface TagOperationLinkContract extends ProxyResource {
  /** Full resource Id of an API operation. */
  operationId?: string;
}

export function tagOperationLinkContractSerializer(item: TagOperationLinkContract): any {
  return {
    properties: areAllPropsUndefined(item, ["operationId"])
      ? undefined
      : _tagOperationLinkContractPropertiesSerializer(item),
  };
}

export function tagOperationLinkContractDeserializer(item: any): TagOperationLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagOperationLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tag-operation link entity properties. */
export interface TagOperationLinkContractProperties {
  /** Full resource Id of an API operation. */
  operationId: string;
}

export function tagOperationLinkContractPropertiesSerializer(
  item: TagOperationLinkContractProperties,
): any {
  return { operationId: item["operationId"] };
}

export function tagOperationLinkContractPropertiesDeserializer(
  item: any,
): TagOperationLinkContractProperties {
  return {
    operationId: item["operationId"],
  };
}

/** Paged Tag-operation link list representation. */
export interface _TagOperationLinkCollection {
  /** Page values. */
  value?: TagOperationLinkContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagOperationLinkCollectionDeserializer(item: any): _TagOperationLinkCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : tagOperationLinkContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagOperationLinkContractArraySerializer(
  result: Array<TagOperationLinkContract>,
): any[] {
  return result.map((item) => {
    return tagOperationLinkContractSerializer(item);
  });
}

export function tagOperationLinkContractArrayDeserializer(
  result: Array<TagOperationLinkContract>,
): any[] {
  return result.map((item) => {
    return tagOperationLinkContractDeserializer(item);
  });
}

/** Tag-product link details. */
export interface TagProductLinkContract extends ProxyResource {
  /** Full resource Id of a product. */
  productId?: string;
}

export function tagProductLinkContractSerializer(item: TagProductLinkContract): any {
  return {
    properties: areAllPropsUndefined(item, ["productId"])
      ? undefined
      : _tagProductLinkContractPropertiesSerializer(item),
  };
}

export function tagProductLinkContractDeserializer(item: any): TagProductLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagProductLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tag-product link entity properties. */
export interface TagProductLinkContractProperties {
  /** Full resource Id of a product. */
  productId: string;
}

export function tagProductLinkContractPropertiesSerializer(
  item: TagProductLinkContractProperties,
): any {
  return { productId: item["productId"] };
}

export function tagProductLinkContractPropertiesDeserializer(
  item: any,
): TagProductLinkContractProperties {
  return {
    productId: item["productId"],
  };
}

/** Paged Tag-product link list representation. */
export interface _TagProductLinkCollection {
  /** Page values. */
  value?: TagProductLinkContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagProductLinkCollectionDeserializer(item: any): _TagProductLinkCollection {
  return {
    value: !item["value"] ? item["value"] : tagProductLinkContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagProductLinkContractArraySerializer(
  result: Array<TagProductLinkContract>,
): any[] {
  return result.map((item) => {
    return tagProductLinkContractSerializer(item);
  });
}

export function tagProductLinkContractArrayDeserializer(
  result: Array<TagProductLinkContract>,
): any[] {
  return result.map((item) => {
    return tagProductLinkContractDeserializer(item);
  });
}

/** Result of the request to list REST API operations. It contains a list of operations and a URL nextLink to get the next set of results. */
export interface _OperationListResult {
  /** List of operations supported by the resource provider. */
  value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that describes the operation. */
  display?: OperationDisplay;
  /** The operation origin. */
  origin?: string;
  /** The operation properties. */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider */
  provider?: string;
  /** Operation type: read, write, delete, listKeys/action, etc. */
  operation?: string;
  /** Resource type on which the operation is performed. */
  resource?: string;
  /** Friendly name of the operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
  };
}

/** A single API Management gateway resource in List or Get response. */
export interface ApiManagementGatewayResource extends TrackedResource {
  /** SKU properties of the API Management gateway. */
  sku: ApiManagementGatewaySkuProperties;
  /** ETag of the resource. */
  readonly etag?: string;
  /** The current provisioning state of the API Management gateway which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management gateway, which is targeted by the long running operation started on the gateway. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management gateway.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Information regarding how the gateway should be exposed. */
  frontend?: FrontendConfiguration;
  /** Information regarding how the gateway should integrate with backend systems. */
  backend?: BackendConfiguration;
  /** Information regarding the Configuration API of the API Management gateway. This is only applicable for API gateway with Standard SKU. */
  configurationApi?: GatewayConfigurationApi;
  /** The type of VPN in which API Management gateway needs to be configured in. */
  virtualNetworkType?: VirtualNetworkType;
}

export function apiManagementGatewayResourceSerializer(item: ApiManagementGatewayResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _apiManagementGatewayResourcePropertiesSerializer(item),
    sku: apiManagementGatewaySkuPropertiesSerializer(item["sku"]),
  };
}

export function apiManagementGatewayResourceDeserializer(item: any): ApiManagementGatewayResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._apiManagementGatewayResourcePropertiesDeserializer(item["properties"]),
    sku: apiManagementGatewaySkuPropertiesDeserializer(item["sku"]),
    etag: item["etag"],
  };
}

/** Properties of an API Management gateway resource description. */
export interface ApiManagementGatewayProperties extends ApiManagementGatewayBaseProperties {}

export function apiManagementGatewayPropertiesSerializer(
  item: ApiManagementGatewayProperties,
): any {
  return {
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationSerializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationSerializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiSerializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

export function apiManagementGatewayPropertiesDeserializer(
  item: any,
): ApiManagementGatewayProperties {
  return {
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationDeserializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationDeserializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiDeserializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

/** API Management gateway resource SKU properties. */
export interface ApiManagementGatewaySkuProperties {
  /** Name of the Sku. */
  name: ApiGatewaySkuType;
  /** Capacity of the SKU (number of deployed units of the SKU) */
  capacity?: number;
}

export function apiManagementGatewaySkuPropertiesSerializer(
  item: ApiManagementGatewaySkuProperties,
): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function apiManagementGatewaySkuPropertiesDeserializer(
  item: any,
): ApiManagementGatewaySkuProperties {
  return {
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** Name of the Sku. */
export enum KnownApiGatewaySkuType {
  /** Standard SKU of the API gateway. */
  Standard = "Standard",
  /** Standard SKU of the API gateway to be used in Workspaces. */
  WorkspaceGatewayStandard = "WorkspaceGatewayStandard",
  /** Premium SKU of the API gateway to be used in Workspaces. */
  WorkspaceGatewayPremium = "WorkspaceGatewayPremium",
}

/**
 * Name of the Sku. \
 * {@link KnownApiGatewaySkuType} can be used interchangeably with ApiGatewaySkuType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard SKU of the API gateway. \
 * **WorkspaceGatewayStandard**: Standard SKU of the API gateway to be used in Workspaces. \
 * **WorkspaceGatewayPremium**: Premium SKU of the API gateway to be used in Workspaces.
 */
export type ApiGatewaySkuType = string;

/** Base Properties of an API Management gateway resource description. */
export interface ApiManagementGatewayBaseProperties {
  /** The current provisioning state of the API Management gateway which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management gateway, which is targeted by the long running operation started on the gateway. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management gateway.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Information regarding how the gateway should be exposed. */
  frontend?: FrontendConfiguration;
  /** Information regarding how the gateway should integrate with backend systems. */
  backend?: BackendConfiguration;
  /** Information regarding the Configuration API of the API Management gateway. This is only applicable for API gateway with Standard SKU. */
  configurationApi?: GatewayConfigurationApi;
  /** The type of VPN in which API Management gateway needs to be configured in. */
  virtualNetworkType?: VirtualNetworkType;
}

export function apiManagementGatewayBasePropertiesSerializer(
  item: ApiManagementGatewayBaseProperties,
): any {
  return {
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationSerializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationSerializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiSerializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

export function apiManagementGatewayBasePropertiesDeserializer(
  item: any,
): ApiManagementGatewayBaseProperties {
  return {
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationDeserializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationDeserializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiDeserializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

/** Information regarding how the gateway should be exposed. */
export interface FrontendConfiguration {
  /** The default hostname of the data-plane gateway to which requests can be sent. This is only applicable for API gateway with Standard SKU. */
  readonly defaultHostname?: string;
}

export function frontendConfigurationSerializer(item: FrontendConfiguration): any {
  return item;
}

export function frontendConfigurationDeserializer(item: any): FrontendConfiguration {
  return {
    defaultHostname: item["defaultHostname"],
  };
}

/** Information regarding how the gateway should integrate with backend systems. */
export interface BackendConfiguration {
  /** The default hostname of the data-plane gateway to which requests can be sent. */
  subnet?: BackendSubnetConfiguration;
}

export function backendConfigurationSerializer(item: BackendConfiguration): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : backendSubnetConfigurationSerializer(item["subnet"]),
  };
}

export function backendConfigurationDeserializer(item: any): BackendConfiguration {
  return {
    subnet: !item["subnet"]
      ? item["subnet"]
      : backendSubnetConfigurationDeserializer(item["subnet"]),
  };
}

/** Information regarding how the subnet to which the gateway should be injected. */
export interface BackendSubnetConfiguration {
  /** The ARM ID of the subnet in which the backend systems are hosted. */
  id?: string;
}

export function backendSubnetConfigurationSerializer(item: BackendSubnetConfiguration): any {
  return { id: item["id"] };
}

export function backendSubnetConfigurationDeserializer(item: any): BackendSubnetConfiguration {
  return {
    id: item["id"],
  };
}

/** Information regarding the Configuration API of the API Management gateway. This is only applicable for API gateway with Standard SKU. */
export interface GatewayConfigurationApi {
  /** Hostname to which the agent connects to propagate configuration to the cloud. */
  readonly hostname?: string;
}

export function gatewayConfigurationApiSerializer(item: GatewayConfigurationApi): any {
  return item;
}

export function gatewayConfigurationApiDeserializer(item: any): GatewayConfigurationApi {
  return {
    hostname: item["hostname"],
  };
}

/** The type of VPN in which API Management gateway needs to be configured in. */
export enum KnownVirtualNetworkType {
  /** The API Management gateway is not part of any Virtual Network. */
  None = "None",
  /** The API Management gateway is part of Virtual Network and it is accessible from Internet. */
  External = "External",
  /** The API Management gateway is part of Virtual Network and it is only accessible from within the virtual network. */
  Internal = "Internal",
}

/**
 * The type of VPN in which API Management gateway needs to be configured in. \
 * {@link KnownVirtualNetworkType} can be used interchangeably with VirtualNetworkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The API Management gateway is not part of any Virtual Network. \
 * **External**: The API Management gateway is part of Virtual Network and it is accessible from Internet. \
 * **Internal**: The API Management gateway is part of Virtual Network and it is only accessible from within the virtual network.
 */
export type VirtualNetworkType = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Parameter supplied to Update API Management gateway. */
export interface ApiManagementGatewayUpdateParameters extends ApimResource {
  /** SKU properties of the API Management gateway. */
  sku?: ApiManagementGatewaySkuPropertiesForPatch;
  /** ETag of the resource. */
  readonly etag?: string;
  /** The current provisioning state of the API Management gateway which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management gateway, which is targeted by the long running operation started on the gateway. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management gateway.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Information regarding how the gateway should be exposed. */
  frontend?: FrontendConfiguration;
  /** Information regarding how the gateway should integrate with backend systems. */
  backend?: BackendConfiguration;
  /** Information regarding the Configuration API of the API Management gateway. This is only applicable for API gateway with Standard SKU. */
  configurationApi?: GatewayConfigurationApi;
  /** The type of VPN in which API Management gateway needs to be configured in. */
  virtualNetworkType?: VirtualNetworkType;
}

export function apiManagementGatewayUpdateParametersSerializer(
  item: ApiManagementGatewayUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "frontend",
      "backend",
      "configurationApi",
      "virtualNetworkType",
    ])
      ? undefined
      : _apiManagementGatewayUpdateParametersPropertiesSerializer(item),
    sku: !item["sku"]
      ? item["sku"]
      : apiManagementGatewaySkuPropertiesForPatchSerializer(item["sku"]),
  };
}

/** Properties of an API Management gateway resource description. */
export interface ApiManagementGatewayUpdateProperties extends ApiManagementGatewayBaseProperties {}

export function apiManagementGatewayUpdatePropertiesSerializer(
  item: ApiManagementGatewayUpdateProperties,
): any {
  return {
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationSerializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationSerializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiSerializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

/** API Management gateway resource SKU properties for PATCH operations given nothing should be required. */
export interface ApiManagementGatewaySkuPropertiesForPatch {
  /** Name of the Sku. */
  name?: ApiGatewaySkuType;
  /** Capacity of the SKU (number of deployed units of the SKU) */
  capacity?: number;
}

export function apiManagementGatewaySkuPropertiesForPatchSerializer(
  item: ApiManagementGatewaySkuPropertiesForPatch,
): any {
  return { name: item["name"], capacity: item["capacity"] };
}

/** The Resource definition. */
export interface ApimResource {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type for API Management resource is set to Microsoft.ApiManagement. */
  readonly type?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function apimResourceSerializer(item: ApimResource): any {
  return { tags: item["tags"] };
}

/** The response of the List API Management gateway operation. */
export interface _ApiManagementGatewayListResult {
  /** Result of the List API Management gateway operation. */
  value: ApiManagementGatewayResource[];
  /** Link to the next set of results. Not empty if Value contains incomplete list of API Management services. */
  nextLink?: string;
}

export function _apiManagementGatewayListResultDeserializer(
  item: any,
): _ApiManagementGatewayListResult {
  return {
    value: apiManagementGatewayResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiManagementGatewayResourceArraySerializer(
  result: Array<ApiManagementGatewayResource>,
): any[] {
  return result.map((item) => {
    return apiManagementGatewayResourceSerializer(item);
  });
}

export function apiManagementGatewayResourceArrayDeserializer(
  result: Array<ApiManagementGatewayResource>,
): any[] {
  return result.map((item) => {
    return apiManagementGatewayResourceDeserializer(item);
  });
}

/** The API Management gateway SKUs operation response. */
export interface _GatewayResourceSkuResults {
  /** The list of skus available for the gateway. */
  value: GatewayResourceSkuResult[];
  /** The uri to fetch the next page of API Management gateway Skus. */
  nextLink?: string;
}

export function _gatewayResourceSkuResultsDeserializer(item: any): _GatewayResourceSkuResults {
  return {
    value: gatewayResourceSkuResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayResourceSkuResultArrayDeserializer(
  result: Array<GatewayResourceSkuResult>,
): any[] {
  return result.map((item) => {
    return gatewayResourceSkuResultDeserializer(item);
  });
}

/** Describes an available API Management gateway SKU. */
export interface GatewayResourceSkuResult {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** Specifies API Management gateway SKU. */
  readonly sku?: GatewaySku;
  /** Specifies the number of API Management gateway units. */
  readonly capacity?: GatewaySkuCapacity;
}

export function gatewayResourceSkuResultDeserializer(item: any): GatewayResourceSkuResult {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : gatewaySkuDeserializer(item["sku"]),
    capacity: !item["capacity"]
      ? item["capacity"]
      : gatewaySkuCapacityDeserializer(item["capacity"]),
  };
}

/** Describes an available API Management SKU for gateways. */
export interface GatewaySku {
  /** Name of the Sku. */
  name?: ApiGatewaySkuType;
}

export function gatewaySkuDeserializer(item: any): GatewaySku {
  return {
    name: item["name"],
  };
}

/** Describes scaling information of a SKU. */
export interface GatewaySkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: GatewaySkuCapacityScaleType;
}

export function gatewaySkuCapacityDeserializer(item: any): GatewaySkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export enum KnownGatewaySkuCapacityScaleType {
  /** Supported scale type automatic. */
  Automatic = "Automatic",
  /** Supported scale type manual. */
  Manual = "Manual",
  /** Scaling not supported. */
  None = "None",
}

/**
 * The scale type applicable to the sku. \
 * {@link KnownGatewaySkuCapacityScaleType} can be used interchangeably with GatewaySkuCapacityScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Supported scale type automatic. \
 * **Manual**: Supported scale type manual. \
 * **None**: Scaling not supported.
 */
export type GatewaySkuCapacityScaleType = string;

/** Paged Tag list representation. */
export interface _TagResourceCollection {
  /** Page values. */
  value?: TagResourceContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagResourceCollectionDeserializer(item: any): _TagResourceCollection {
  return {
    value: !item["value"] ? item["value"] : tagResourceContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagResourceContractArrayDeserializer(result: Array<TagResourceContract>): any[] {
  return result.map((item) => {
    return tagResourceContractDeserializer(item);
  });
}

/** TagResource contract properties. */
export interface TagResourceContract {
  /** Tag associated with the resource. */
  tag: TagTagResourceContractProperties;
  /** API associated with the tag. */
  api?: ApiTagResourceContractProperties;
  /** Operation associated with the tag. */
  operation?: OperationTagResourceContractProperties;
  /** Product associated with the tag. */
  product?: ProductTagResourceContractProperties;
}

export function tagResourceContractDeserializer(item: any): TagResourceContract {
  return {
    tag: tagTagResourceContractPropertiesDeserializer(item["tag"]),
    api: !item["api"] ? item["api"] : apiTagResourceContractPropertiesDeserializer(item["api"]),
    operation: !item["operation"]
      ? item["operation"]
      : operationTagResourceContractPropertiesDeserializer(item["operation"]),
    product: !item["product"]
      ? item["product"]
      : productTagResourceContractPropertiesDeserializer(item["product"]),
  };
}

/** Contract defining the Tag property in the Tag Resource Contract */
export interface TagTagResourceContractProperties {
  /** Tag identifier */
  id?: string;
  /** Tag Name */
  name?: string;
}

export function tagTagResourceContractPropertiesDeserializer(
  item: any,
): TagTagResourceContractProperties {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** API contract properties for the Tag Resources. */
export interface ApiTagResourceContractProperties extends ApiEntityBaseContract {
  /** API identifier in the form /apis/{apiId}. */
  id?: string;
  /** API name. */
  name?: string;
  /** Absolute URL of the backend service implementing this API. */
  serviceUrl?: string;
  /** Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API. */
  path?: string;
  /** Describes on which protocols the operations in this API can be invoked. */
  protocols?: Protocol[];
}

export function apiTagResourceContractPropertiesDeserializer(
  item: any,
): ApiTagResourceContractProperties {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractDeserializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractDeserializer(item["subscriptionKeyParameterNames"]),
    apiType: item["type"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    isOnline: item["isOnline"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"]
      ? item["contact"]
      : apiContactInformationDeserializer(item["contact"]),
    license: !item["license"]
      ? item["license"]
      : apiLicenseInformationDeserializer(item["license"]),
    id: item["id"],
    name: item["name"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
  };
}

/** Operation Entity contract Properties. */
export interface OperationTagResourceContractProperties {
  /** Identifier of the operation in form /operations/{operationId}. */
  id?: string;
  /** Operation name. */
  readonly name?: string;
  /** API Name. */
  readonly apiName?: string;
  /** API Revision. */
  readonly apiRevision?: string;
  /** API Version. */
  readonly apiVersion?: string;
  /** Operation Description. */
  readonly description?: string;
  /** A Valid HTTP Operation Method. Typical Http Methods like GET, PUT, POST but not limited by only them. */
  readonly method?: string;
  /** Relative URL template identifying the target resource for this operation. May include parameters. Example: /customers/{cid}/orders/{oid}/?date={date} */
  readonly urlTemplate?: string;
}

export function operationTagResourceContractPropertiesDeserializer(
  item: any,
): OperationTagResourceContractProperties {
  return {
    id: item["id"],
    name: item["name"],
    apiName: item["apiName"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    description: item["description"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

/** Product profile. */
export interface ProductTagResourceContractProperties extends ProductEntityBaseParameters {
  /** Identifier of the product in the form of /products/{productId} */
  id?: string;
  /** Product name. */
  name: string;
}

export function productTagResourceContractPropertiesDeserializer(
  item: any,
): ProductTagResourceContractProperties {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationDeserializer(item["application"]),
    state: item["state"],
    id: item["id"],
    name: item["name"],
  };
}

/** Paged API Revision list representation. */
export interface _ApiRevisionCollection {
  /** Page values. */
  readonly value?: ApiRevisionContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _apiRevisionCollectionDeserializer(item: any): _ApiRevisionCollection {
  return {
    value: !item["value"] ? item["value"] : apiRevisionContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function apiRevisionContractArrayDeserializer(result: Array<ApiRevisionContract>): any[] {
  return result.map((item) => {
    return apiRevisionContractDeserializer(item);
  });
}

/** Summary of revision metadata. */
export interface ApiRevisionContract {
  /** Identifier of the API Revision. */
  readonly apiId?: string;
  /** Revision number of API. */
  readonly apiRevision?: string;
  /** The time the API Revision was created. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly createdDateTime?: Date;
  /** The time the API Revision were updated. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly updatedDateTime?: Date;
  /** Description of the API Revision. */
  readonly description?: string;
  /** Gateway URL for accessing the non-current API Revision. */
  readonly privateUrl?: string;
  /** Indicates if API revision is the current api revision. */
  readonly isOnline?: boolean;
  /** Indicates if API revision is accessible via the gateway. */
  readonly isCurrent?: boolean;
}

export function apiRevisionContractDeserializer(item: any): ApiRevisionContract {
  return {
    apiId: item["apiId"],
    apiRevision: item["apiRevision"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    updatedDateTime: !item["updatedDateTime"]
      ? item["updatedDateTime"]
      : new Date(item["updatedDateTime"]),
    description: item["description"],
    privateUrl: item["privateUrl"],
    isOnline: item["isOnline"],
    isCurrent: item["isCurrent"],
  };
}

/** A single API Management service resource in List or Get response. */
export interface ApiManagementServiceResource extends TrackedResource {
  /** SKU properties of the API Management service. */
  sku: ApiManagementServiceSkuProperties;
  /** Managed service identity of the Api Management service. */
  identity?: ApiManagementServiceIdentity;
  /** ETag of the resource. */
  readonly etag?: string;
  /** The availability zones. */
  zones?: string[];
  /** Email address from which the notification will be sent. */
  notificationSenderEmail?: string;
  /** The current provisioning state of the API Management service which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management service, which is targeted by the long running operation started on the service. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management service.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Gateway URL of the API Management service. */
  readonly gatewayUrl?: string;
  /** Gateway URL of the API Management service in the Default Region. */
  readonly gatewayRegionalUrl?: string;
  /** Publisher portal endpoint Url of the API Management service. */
  readonly portalUrl?: string;
  /** Management API endpoint URL of the API Management service. */
  readonly managementApiUrl?: string;
  /** SCM endpoint URL of the API Management service. */
  readonly scmUrl?: string;
  /** DEveloper Portal endpoint URL of the API Management service. */
  readonly developerPortalUrl?: string;
  /** Custom hostname configuration of the API Management service. */
  hostnameConfigurations?: HostnameConfiguration[];
  /** Public Static Load Balanced IP addresses of the API Management service in Primary region. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly publicIPAddresses?: string[];
  /** Private Static Load Balanced IP addresses of the API Management service in Primary region which is deployed in an Internal Virtual Network. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly privateIPAddresses?: string[];
  /** Public Standard SKU IP V4 based IP address to be associated with Virtual Network deployed service in the region. Supported only for Developer and Premium SKU being deployed in Virtual Network. */
  publicIpAddressId?: string;
  /** Whether or not public endpoint access is allowed for this API Management service.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Configuration API configuration of the API Management service. */
  configurationApi?: ConfigurationApi;
  /** Virtual network configuration of the API Management service. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** Additional datacenter locations of the API Management service. */
  additionalLocations?: AdditionalLocation[];
  /** Custom properties of the API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168` will disable the cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA for all TLS(1.0, 1.1 and 1.2).</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11` can be used to disable just TLS 1.1.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10` can be used to disable TLS 1.0 on an API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11` can be used to disable just TLS 1.1 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10` can be used to disable TLS 1.0 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2` can be used to enable HTTP2 protocol on an API Management service.</br>Not specifying any of these properties on PATCH operation will reset omitted properties' values to their defaults. For all the settings except Http2 the default value is `True` if the service was created on or before April 1, 2018 and `False` otherwise. Http2 setting's default value is `False`.</br></br>You can disable any of the following ciphers by using settings `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.[cipher_name]`: TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA256, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA. For example, `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TLS_RSA_WITH_AES_128_CBC_SHA256`:`false`. The default value is `true` for them.</br> Note: The following ciphers can't be disabled since they are required by internal platform components: TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 */
  customProperties?: Record<string, string>;
  /** List of Certificates that need to be installed in the API Management service. Max supported certificates that can be installed is 10. */
  certificates?: CertificateConfiguration[];
  /** Property only meant to be used for Consumption SKU Service. This enforces a client certificate to be presented on each request to the gateway. This also enables the ability to authenticate the certificate in the policy on the gateway. */
  enableClientCertificate?: boolean;
  /** Property can be used to enable NAT Gateway for this API Management service. */
  natGatewayState?: NatGatewayState;
  /** Outbound public IPV4 address prefixes associated with NAT Gateway deployed service. Available only for Premium SKU on stv2 platform. */
  readonly outboundPublicIPAddresses?: string[];
  /** Property only valid for an Api Management service deployed in multiple locations. This can be used to disable the gateway in master region. */
  disableGateway?: boolean;
  /** The type of VPN in which API Management service needs to be configured in. None (Default Value) means the API Management service is not part of any Virtual Network, External means the API Management deployment is set up inside a Virtual Network having an Internet Facing Endpoint, and Internal means that API Management deployment is setup inside a Virtual Network having an Intranet Facing Endpoint only. */
  virtualNetworkType?: VirtualNetworkType;
  /** Control Plane Apis version constraint for the API Management service. */
  apiVersionConstraint?: ApiVersionConstraint;
  /** Undelete Api Management Service if it was previously soft-deleted. If this flag is specified and set to True all other properties will be ignored. */
  restore?: boolean;
  /** List of Private Endpoint Connections of this service. */
  privateEndpointConnections?: RemotePrivateEndpointConnectionWrapper[];
  /** Compute Platform Version running the service in this location. */
  readonly platformVersion?: PlatformVersion;
  /** Status of legacy portal in the API Management service. */
  legacyPortalStatus?: LegacyPortalStatus;
  /** Status of developer portal in this API Management service. */
  developerPortalStatus?: DeveloperPortalStatus;
  /** Release Channel of this API Management service. */
  releaseChannel?: ReleaseChannel;
  /** Zone Redundant Requirement when creating StandardV2 and PremiumV2. If this flag is set to True, will return a APIM service with Zone redundant or fail the request if any underneath component cannot be zone redundant. */
  zoneRedundant?: boolean;
  /** Publisher email. */
  publisherEmail: string;
  /** Publisher name. */
  publisherName: string;
}

export function apiManagementServiceResourceSerializer(item: ApiManagementServiceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _apiManagementServiceResourcePropertiesSerializer(item),
    sku: apiManagementServiceSkuPropertiesSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : apiManagementServiceIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function apiManagementServiceResourceDeserializer(item: any): ApiManagementServiceResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._apiManagementServiceResourcePropertiesDeserializer(item["properties"]),
    sku: apiManagementServiceSkuPropertiesDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : apiManagementServiceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of an API Management service resource description. */
export interface ApiManagementServiceProperties extends ApiManagementServiceBaseProperties {
  /** Publisher email. */
  publisherEmail: string;
  /** Publisher name. */
  publisherName: string;
}

export function apiManagementServicePropertiesSerializer(
  item: ApiManagementServiceProperties,
): any {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArraySerializer(item["hostnameConfigurations"]),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiSerializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArraySerializer(item["additionalLocations"]),
    customProperties: item["customProperties"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArraySerializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintSerializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArraySerializer(item["privateEndpointConnections"]),
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

export function apiManagementServicePropertiesDeserializer(
  item: any,
): ApiManagementServiceProperties {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    gatewayUrl: item["gatewayUrl"],
    gatewayRegionalUrl: item["gatewayRegionalUrl"],
    portalUrl: item["portalUrl"],
    managementApiUrl: item["managementApiUrl"],
    scmUrl: item["scmUrl"],
    developerPortalUrl: item["developerPortalUrl"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArrayDeserializer(item["hostnameConfigurations"]),
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : item["publicIPAddresses"].map((p: any) => {
          return p;
        }),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : item["privateIPAddresses"].map((p: any) => {
          return p;
        }),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiDeserializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArrayDeserializer(item["additionalLocations"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : Object.fromEntries(
          Object.entries(item["customProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArrayDeserializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    outboundPublicIPAddresses: !item["outboundPublicIPAddresses"]
      ? item["outboundPublicIPAddresses"]
      : item["outboundPublicIPAddresses"].map((p: any) => {
          return p;
        }),
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintDeserializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArrayDeserializer(item["privateEndpointConnections"]),
    platformVersion: item["platformVersion"],
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

/** API Management service resource SKU properties. */
export interface ApiManagementServiceSkuProperties {
  /** Name of the Sku. */
  name: SkuType;
  /** Capacity of the SKU (number of deployed units of the SKU). For Consumption SKU capacity must be specified as 0. */
  capacity: number;
}

export function apiManagementServiceSkuPropertiesSerializer(
  item: ApiManagementServiceSkuProperties,
): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function apiManagementServiceSkuPropertiesDeserializer(
  item: any,
): ApiManagementServiceSkuProperties {
  return {
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** Name of the Sku. */
export enum KnownSkuType {
  /** Developer SKU of Api Management. */
  Developer = "Developer",
  /** Standard SKU of Api Management. */
  Standard = "Standard",
  /** Premium SKU of Api Management. */
  Premium = "Premium",
  /** Basic SKU of Api Management. */
  Basic = "Basic",
  /** Consumption SKU of Api Management. */
  Consumption = "Consumption",
  /** Isolated SKU of Api Management. */
  Isolated = "Isolated",
  /** BasicV2 SKU of Api Management. */
  BasicV2 = "BasicV2",
  /** StandardV2 SKU of Api Management. */
  StandardV2 = "StandardV2",
  /** PremiumV2 SKU of Api Management. */
  PremiumV2 = "PremiumV2",
}

/**
 * Name of the Sku. \
 * {@link KnownSkuType} can be used interchangeably with SkuType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Developer**: Developer SKU of Api Management. \
 * **Standard**: Standard SKU of Api Management. \
 * **Premium**: Premium SKU of Api Management. \
 * **Basic**: Basic SKU of Api Management. \
 * **Consumption**: Consumption SKU of Api Management. \
 * **Isolated**: Isolated SKU of Api Management. \
 * **BasicV2**: BasicV2 SKU of Api Management. \
 * **StandardV2**: StandardV2 SKU of Api Management. \
 * **PremiumV2**: PremiumV2 SKU of Api Management.
 */
export type SkuType = string;

/** Identity properties of the Api Management service resource. */
export interface ApiManagementServiceIdentity {
  /** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
  type: ApimIdentityType;
  /** The principal id of the identity. */
  readonly principalId?: string;
  /** The client tenant id of the identity. */
  readonly tenantId?: string;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function apiManagementServiceIdentitySerializer(item: ApiManagementServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function apiManagementServiceIdentityDeserializer(item: any): ApiManagementServiceIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
export enum KnownApimIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
  /** None */
  None = "None",
}

/**
 * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. \
 * {@link KnownApimIdentityType} can be used interchangeably with ApimIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned, UserAssigned** \
 * **None**
 */
export type ApimIdentityType = string;

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** model interface UserIdentityProperties */
export interface UserIdentityProperties {
  /** The principal id of user assigned identity. */
  principalId?: string;
  /** The client id of user assigned identity. */
  clientId?: string;
}

export function userIdentityPropertiesSerializer(item: UserIdentityProperties): any {
  return { principalId: item["principalId"], clientId: item["clientId"] };
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Base Properties of an API Management service resource description. */
export interface ApiManagementServiceBaseProperties {
  /** Email address from which the notification will be sent. */
  notificationSenderEmail?: string;
  /** The current provisioning state of the API Management service which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management service, which is targeted by the long running operation started on the service. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management service.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Gateway URL of the API Management service. */
  readonly gatewayUrl?: string;
  /** Gateway URL of the API Management service in the Default Region. */
  readonly gatewayRegionalUrl?: string;
  /** Publisher portal endpoint Url of the API Management service. */
  readonly portalUrl?: string;
  /** Management API endpoint URL of the API Management service. */
  readonly managementApiUrl?: string;
  /** SCM endpoint URL of the API Management service. */
  readonly scmUrl?: string;
  /** DEveloper Portal endpoint URL of the API Management service. */
  readonly developerPortalUrl?: string;
  /** Custom hostname configuration of the API Management service. */
  hostnameConfigurations?: HostnameConfiguration[];
  /** Public Static Load Balanced IP addresses of the API Management service in Primary region. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly publicIPAddresses?: string[];
  /** Private Static Load Balanced IP addresses of the API Management service in Primary region which is deployed in an Internal Virtual Network. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly privateIPAddresses?: string[];
  /** Public Standard SKU IP V4 based IP address to be associated with Virtual Network deployed service in the region. Supported only for Developer and Premium SKU being deployed in Virtual Network. */
  publicIpAddressId?: string;
  /** Whether or not public endpoint access is allowed for this API Management service.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Configuration API configuration of the API Management service. */
  configurationApi?: ConfigurationApi;
  /** Virtual network configuration of the API Management service. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** Additional datacenter locations of the API Management service. */
  additionalLocations?: AdditionalLocation[];
  /** Custom properties of the API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168` will disable the cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA for all TLS(1.0, 1.1 and 1.2).</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11` can be used to disable just TLS 1.1.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10` can be used to disable TLS 1.0 on an API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11` can be used to disable just TLS 1.1 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10` can be used to disable TLS 1.0 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2` can be used to enable HTTP2 protocol on an API Management service.</br>Not specifying any of these properties on PATCH operation will reset omitted properties' values to their defaults. For all the settings except Http2 the default value is `True` if the service was created on or before April 1, 2018 and `False` otherwise. Http2 setting's default value is `False`.</br></br>You can disable any of the following ciphers by using settings `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.[cipher_name]`: TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA256, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA. For example, `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TLS_RSA_WITH_AES_128_CBC_SHA256`:`false`. The default value is `true` for them.</br> Note: The following ciphers can't be disabled since they are required by internal platform components: TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 */
  customProperties?: Record<string, string>;
  /** List of Certificates that need to be installed in the API Management service. Max supported certificates that can be installed is 10. */
  certificates?: CertificateConfiguration[];
  /** Property only meant to be used for Consumption SKU Service. This enforces a client certificate to be presented on each request to the gateway. This also enables the ability to authenticate the certificate in the policy on the gateway. */
  enableClientCertificate?: boolean;
  /** Property can be used to enable NAT Gateway for this API Management service. */
  natGatewayState?: NatGatewayState;
  /** Outbound public IPV4 address prefixes associated with NAT Gateway deployed service. Available only for Premium SKU on stv2 platform. */
  readonly outboundPublicIPAddresses?: string[];
  /** Property only valid for an Api Management service deployed in multiple locations. This can be used to disable the gateway in master region. */
  disableGateway?: boolean;
  /** The type of VPN in which API Management service needs to be configured in. None (Default Value) means the API Management service is not part of any Virtual Network, External means the API Management deployment is set up inside a Virtual Network having an Internet Facing Endpoint, and Internal means that API Management deployment is setup inside a Virtual Network having an Intranet Facing Endpoint only. */
  virtualNetworkType?: VirtualNetworkType;
  /** Control Plane Apis version constraint for the API Management service. */
  apiVersionConstraint?: ApiVersionConstraint;
  /** Undelete Api Management Service if it was previously soft-deleted. If this flag is specified and set to True all other properties will be ignored. */
  restore?: boolean;
  /** List of Private Endpoint Connections of this service. */
  privateEndpointConnections?: RemotePrivateEndpointConnectionWrapper[];
  /** Compute Platform Version running the service in this location. */
  readonly platformVersion?: PlatformVersion;
  /** Status of legacy portal in the API Management service. */
  legacyPortalStatus?: LegacyPortalStatus;
  /** Status of developer portal in this API Management service. */
  developerPortalStatus?: DeveloperPortalStatus;
  /** Release Channel of this API Management service. */
  releaseChannel?: ReleaseChannel;
  /** Zone Redundant Requirement when creating StandardV2 and PremiumV2. If this flag is set to True, will return a APIM service with Zone redundant or fail the request if any underneath component cannot be zone redundant. */
  zoneRedundant?: boolean;
}

export function apiManagementServiceBasePropertiesSerializer(
  item: ApiManagementServiceBaseProperties,
): any {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArraySerializer(item["hostnameConfigurations"]),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiSerializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArraySerializer(item["additionalLocations"]),
    customProperties: item["customProperties"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArraySerializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintSerializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArraySerializer(item["privateEndpointConnections"]),
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
  };
}

export function apiManagementServiceBasePropertiesDeserializer(
  item: any,
): ApiManagementServiceBaseProperties {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    gatewayUrl: item["gatewayUrl"],
    gatewayRegionalUrl: item["gatewayRegionalUrl"],
    portalUrl: item["portalUrl"],
    managementApiUrl: item["managementApiUrl"],
    scmUrl: item["scmUrl"],
    developerPortalUrl: item["developerPortalUrl"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArrayDeserializer(item["hostnameConfigurations"]),
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : item["publicIPAddresses"].map((p: any) => {
          return p;
        }),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : item["privateIPAddresses"].map((p: any) => {
          return p;
        }),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiDeserializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArrayDeserializer(item["additionalLocations"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : Object.fromEntries(
          Object.entries(item["customProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArrayDeserializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    outboundPublicIPAddresses: !item["outboundPublicIPAddresses"]
      ? item["outboundPublicIPAddresses"]
      : item["outboundPublicIPAddresses"].map((p: any) => {
          return p;
        }),
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintDeserializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArrayDeserializer(item["privateEndpointConnections"]),
    platformVersion: item["platformVersion"],
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
  };
}

export function hostnameConfigurationArraySerializer(result: Array<HostnameConfiguration>): any[] {
  return result.map((item) => {
    return hostnameConfigurationSerializer(item);
  });
}

export function hostnameConfigurationArrayDeserializer(
  result: Array<HostnameConfiguration>,
): any[] {
  return result.map((item) => {
    return hostnameConfigurationDeserializer(item);
  });
}

/** Custom hostname configuration. */
export interface HostnameConfiguration {
  /** Hostname type. */
  type: HostnameType;
  /** Hostname to configure on the Api Management service. */
  hostName: string;
  /** Url to the KeyVault Secret containing the Ssl Certificate. If absolute Url containing version is provided, auto-update of ssl certificate will not work. This requires Api Management service to be configured with aka.ms/apimmsi. The secret should be of type *application/x-pkcs12* */
  keyVaultId?: string;
  /** System or User Assigned Managed identity clientId as generated by Azure AD, which has GET access to the keyVault containing the SSL certificate. */
  identityClientId?: string;
  /** Base64 Encoded certificate. */
  encodedCertificate?: string;
  /** Certificate Password. */
  certificatePassword?: string;
  /** Specify true to setup the certificate associated with this Hostname as the Default SSL Certificate. If a client does not send the SNI header, then this will be the certificate that will be challenged. The property is useful if a service has multiple custom hostname enabled and it needs to decide on the default ssl certificate. The setting only applied to gateway Hostname Type. */
  defaultSslBinding?: boolean;
  /** Specify true to always negotiate client certificate on the hostname. Default Value is false. */
  negotiateClientCertificate?: boolean;
  /** Certificate information. */
  certificate?: CertificateInformation;
  /** Certificate Source. */
  certificateSource?: CertificateSource;
  /** Certificate Status. */
  certificateStatus?: CertificateStatus;
}

export function hostnameConfigurationSerializer(item: HostnameConfiguration): any {
  return {
    type: item["type"],
    hostName: item["hostName"],
    keyVaultId: item["keyVaultId"],
    identityClientId: item["identityClientId"],
    encodedCertificate: item["encodedCertificate"],
    certificatePassword: item["certificatePassword"],
    defaultSslBinding: item["defaultSslBinding"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateInformationSerializer(item["certificate"]),
    certificateSource: item["certificateSource"],
    certificateStatus: item["certificateStatus"],
  };
}

export function hostnameConfigurationDeserializer(item: any): HostnameConfiguration {
  return {
    type: item["type"],
    hostName: item["hostName"],
    keyVaultId: item["keyVaultId"],
    identityClientId: item["identityClientId"],
    encodedCertificate: item["encodedCertificate"],
    certificatePassword: item["certificatePassword"],
    defaultSslBinding: item["defaultSslBinding"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateInformationDeserializer(item["certificate"]),
    certificateSource: item["certificateSource"],
    certificateStatus: item["certificateStatus"],
  };
}

/** Hostname type. */
export enum KnownHostnameType {
  /** Proxy */
  Proxy = "Proxy",
  /** Portal */
  Portal = "Portal",
  /** Management */
  Management = "Management",
  /** Scm */
  Scm = "Scm",
  /** DeveloperPortal */
  DeveloperPortal = "DeveloperPortal",
  /** ConfigurationApi */
  ConfigurationApi = "ConfigurationApi",
}

/**
 * Hostname type. \
 * {@link KnownHostnameType} can be used interchangeably with HostnameType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Proxy** \
 * **Portal** \
 * **Management** \
 * **Scm** \
 * **DeveloperPortal** \
 * **ConfigurationApi**
 */
export type HostnameType = string;

/** SSL certificate information. */
export interface CertificateInformation {
  /** Expiration date of the certificate. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expiry: Date;
  /** Thumbprint of the certificate. */
  thumbprint: string;
  /** Subject of the certificate. */
  subject: string;
}

export function certificateInformationSerializer(item: CertificateInformation): any {
  return {
    expiry: item["expiry"].toISOString(),
    thumbprint: item["thumbprint"],
    subject: item["subject"],
  };
}

export function certificateInformationDeserializer(item: any): CertificateInformation {
  return {
    expiry: new Date(item["expiry"]),
    thumbprint: item["thumbprint"],
    subject: item["subject"],
  };
}

/** Certificate Source. */
export enum KnownCertificateSource {
  /** Managed */
  Managed = "Managed",
  /** KeyVault */
  KeyVault = "KeyVault",
  /** Custom */
  Custom = "Custom",
  /** BuiltIn */
  BuiltIn = "BuiltIn",
}

/**
 * Certificate Source. \
 * {@link KnownCertificateSource} can be used interchangeably with CertificateSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed** \
 * **KeyVault** \
 * **Custom** \
 * **BuiltIn**
 */
export type CertificateSource = string;

/** Certificate Status. */
export enum KnownCertificateStatus {
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * Certificate Status. \
 * {@link KnownCertificateStatus} can be used interchangeably with CertificateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed** \
 * **Failed** \
 * **InProgress**
 */
export type CertificateStatus = string;

/** Whether or not public endpoint access is allowed for this API Management service.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not public endpoint access is allowed for this API Management service.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Information regarding the Configuration API of the API Management service. */
export interface ConfigurationApi {
  /** Indication whether or not the legacy Configuration API (v1) should be exposed on the API Management service. Value is optional but must be 'Enabled' or 'Disabled'. If 'Disabled', legacy Configuration API (v1) will not be available for self-hosted gateways. Default value is 'Enabled' */
  legacyApi?: LegacyApiState;
}

export function configurationApiSerializer(item: ConfigurationApi): any {
  return { legacyApi: item["legacyApi"] };
}

export function configurationApiDeserializer(item: any): ConfigurationApi {
  return {
    legacyApi: item["legacyApi"],
  };
}

/** Indication whether or not the legacy Configuration API (v1) should be exposed on the API Management service. Value is optional but must be 'Enabled' or 'Disabled'. If 'Disabled', legacy Configuration API (v1) will not be available for self-hosted gateways. Default value is 'Enabled' */
export enum KnownLegacyApiState {
  /** Legacy Configuration API (v1) is enabled for the service and self-hosted gateways can connect to it. */
  Enabled = "Enabled",
  /** Legacy Configuration API (v1) is disabled for the service and self-hosted gateways can not connect to it. */
  Disabled = "Disabled",
}

/**
 * Indication whether or not the legacy Configuration API (v1) should be exposed on the API Management service. Value is optional but must be 'Enabled' or 'Disabled'. If 'Disabled', legacy Configuration API (v1) will not be available for self-hosted gateways. Default value is 'Enabled' \
 * {@link KnownLegacyApiState} can be used interchangeably with LegacyApiState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Legacy Configuration API (v1) is enabled for the service and self-hosted gateways can connect to it. \
 * **Disabled**: Legacy Configuration API (v1) is disabled for the service and self-hosted gateways can not connect to it.
 */
export type LegacyApiState = string;

/** Configuration of a virtual network to which API Management service is deployed. */
export interface VirtualNetworkConfiguration {
  /** The virtual network ID. This is typically a GUID. Expect a null GUID by default. */
  readonly vnetid?: string;
  /** The name of the subnet. */
  readonly subnetname?: string;
  /** The full resource ID of a subnet in a virtual network to deploy the API Management service in. */
  subnetResourceId?: string;
}

export function virtualNetworkConfigurationSerializer(item: VirtualNetworkConfiguration): any {
  return { subnetResourceId: item["subnetResourceId"] };
}

export function virtualNetworkConfigurationDeserializer(item: any): VirtualNetworkConfiguration {
  return {
    vnetid: item["vnetid"],
    subnetname: item["subnetname"],
    subnetResourceId: item["subnetResourceId"],
  };
}

export function additionalLocationArraySerializer(result: Array<AdditionalLocation>): any[] {
  return result.map((item) => {
    return additionalLocationSerializer(item);
  });
}

export function additionalLocationArrayDeserializer(result: Array<AdditionalLocation>): any[] {
  return result.map((item) => {
    return additionalLocationDeserializer(item);
  });
}

/** Description of an additional API Management resource location. */
export interface AdditionalLocation {
  /** The location name of the additional region among Azure Data center regions. */
  location: string;
  /** SKU properties of the API Management service. */
  sku: ApiManagementServiceSkuProperties;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: string[];
  /** Public Static Load Balanced IP addresses of the API Management service in the additional location. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly publicIPAddresses?: string[];
  /** Private Static Load Balanced IP addresses of the API Management service which is deployed in an Internal Virtual Network in a particular additional location. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly privateIPAddresses?: string[];
  /** Public Standard SKU IP V4 based IP address to be associated with Virtual Network deployed service in the location. Supported only for Premium SKU being deployed in Virtual Network. */
  publicIpAddressId?: string;
  /** Virtual network configuration for the location. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** Gateway URL of the API Management service in the Region. */
  readonly gatewayRegionalUrl?: string;
  /** Property can be used to enable NAT Gateway for this API Management service. */
  natGatewayState?: NatGatewayState;
  /** Outbound public IPV4 address prefixes associated with NAT Gateway deployed service. Available only for Premium SKU on stv2 platform. */
  readonly outboundPublicIPAddresses?: string[];
  /** Property only valid for an Api Management service deployed in multiple locations. This can be used to disable the gateway in this additional location. */
  disableGateway?: boolean;
  /** Compute Platform Version running the service. */
  readonly platformVersion?: PlatformVersion;
}

export function additionalLocationSerializer(item: AdditionalLocation): any {
  return {
    location: item["location"],
    sku: apiManagementServiceSkuPropertiesSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    publicIpAddressId: item["publicIpAddressId"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
  };
}

export function additionalLocationDeserializer(item: any): AdditionalLocation {
  return {
    location: item["location"],
    sku: apiManagementServiceSkuPropertiesDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : item["publicIPAddresses"].map((p: any) => {
          return p;
        }),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : item["privateIPAddresses"].map((p: any) => {
          return p;
        }),
    publicIpAddressId: item["publicIpAddressId"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    gatewayRegionalUrl: item["gatewayRegionalUrl"],
    natGatewayState: item["natGatewayState"],
    outboundPublicIPAddresses: !item["outboundPublicIPAddresses"]
      ? item["outboundPublicIPAddresses"]
      : item["outboundPublicIPAddresses"].map((p: any) => {
          return p;
        }),
    disableGateway: item["disableGateway"],
    platformVersion: item["platformVersion"],
  };
}

/** Property can be used to enable NAT Gateway for this API Management service. */
export enum KnownNatGatewayState {
  /** Nat Gateway is enabled for the service. */
  Enabled = "Enabled",
  /** Nat Gateway is disabled for the service. */
  Disabled = "Disabled",
}

/**
 * Property can be used to enable NAT Gateway for this API Management service. \
 * {@link KnownNatGatewayState} can be used interchangeably with NatGatewayState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Nat Gateway is enabled for the service. \
 * **Disabled**: Nat Gateway is disabled for the service.
 */
export type NatGatewayState = string;

/** Compute Platform Version running the service. */
export enum KnownPlatformVersion {
  /** Platform version cannot be determined, as compute platform is not deployed. */
  Undetermined = "undetermined",
  /** Platform running the service on Single Tenant V1 platform. */
  Stv1 = "stv1",
  /** Platform running the service on Single Tenant V2 platform. */
  Stv2 = "stv2",
  /** Platform running the service on Multi Tenant V1 platform. */
  Mtv1 = "mtv1",
  /** Platform running the service on Single Tenant V2 platform on newer Hardware. */
  Stv21 = "stv2.1",
}

/**
 * Compute Platform Version running the service. \
 * {@link KnownPlatformVersion} can be used interchangeably with PlatformVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **undetermined**: Platform version cannot be determined, as compute platform is not deployed. \
 * **stv1**: Platform running the service on Single Tenant V1 platform. \
 * **stv2**: Platform running the service on Single Tenant V2 platform. \
 * **mtv1**: Platform running the service on Multi Tenant V1 platform. \
 * **stv2.1**: Platform running the service on Single Tenant V2 platform on newer Hardware.
 */
export type PlatformVersion = string;

export function certificateConfigurationArraySerializer(
  result: Array<CertificateConfiguration>,
): any[] {
  return result.map((item) => {
    return certificateConfigurationSerializer(item);
  });
}

export function certificateConfigurationArrayDeserializer(
  result: Array<CertificateConfiguration>,
): any[] {
  return result.map((item) => {
    return certificateConfigurationDeserializer(item);
  });
}

/** Certificate configuration which consist of non-trusted intermediates and root certificates. */
export interface CertificateConfiguration {
  /** Base64 Encoded certificate. */
  encodedCertificate?: string;
  /** Certificate Password. */
  certificatePassword?: string;
  /** The System.Security.Cryptography.x509certificates.StoreName certificate store location. Only Root and CertificateAuthority are valid locations. */
  storeName: CertificateConfigurationStoreName;
  /** Certificate information. */
  certificate?: CertificateInformation;
}

export function certificateConfigurationSerializer(item: CertificateConfiguration): any {
  return {
    encodedCertificate: item["encodedCertificate"],
    certificatePassword: item["certificatePassword"],
    storeName: item["storeName"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateInformationSerializer(item["certificate"]),
  };
}

export function certificateConfigurationDeserializer(item: any): CertificateConfiguration {
  return {
    encodedCertificate: item["encodedCertificate"],
    certificatePassword: item["certificatePassword"],
    storeName: item["storeName"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateInformationDeserializer(item["certificate"]),
  };
}

/** The System.Security.Cryptography.x509certificates.StoreName certificate store location. Only Root and CertificateAuthority are valid locations. */
export enum KnownCertificateConfigurationStoreName {
  /** CertificateAuthority */
  CertificateAuthority = "CertificateAuthority",
  /** Root */
  Root = "Root",
}

/**
 * The System.Security.Cryptography.x509certificates.StoreName certificate store location. Only Root and CertificateAuthority are valid locations. \
 * {@link KnownCertificateConfigurationStoreName} can be used interchangeably with CertificateConfigurationStoreName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CertificateAuthority** \
 * **Root**
 */
export type CertificateConfigurationStoreName = string;

/** Control Plane Apis version constraint for the API Management service. */
export interface ApiVersionConstraint {
  /** Limit control plane API calls to API Management service with version equal to or newer than this value. */
  minApiVersion?: string;
}

export function apiVersionConstraintSerializer(item: ApiVersionConstraint): any {
  return { minApiVersion: item["minApiVersion"] };
}

export function apiVersionConstraintDeserializer(item: any): ApiVersionConstraint {
  return {
    minApiVersion: item["minApiVersion"],
  };
}

export function remotePrivateEndpointConnectionWrapperArraySerializer(
  result: Array<RemotePrivateEndpointConnectionWrapper>,
): any[] {
  return result.map((item) => {
    return remotePrivateEndpointConnectionWrapperSerializer(item);
  });
}

export function remotePrivateEndpointConnectionWrapperArrayDeserializer(
  result: Array<RemotePrivateEndpointConnectionWrapper>,
): any[] {
  return result.map((item) => {
    return remotePrivateEndpointConnectionWrapperDeserializer(item);
  });
}

/** Remote Private Endpoint Connection resource. */
export interface RemotePrivateEndpointConnectionWrapper {
  /** Private Endpoint connection resource id */
  id?: string;
  /** Private Endpoint Connection Name */
  name?: string;
  /** Private Endpoint Connection Resource Type */
  type?: string;
  /** The resource of private end point. */
  privateEndpoint?: ArmIdWrapper;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: string;
  /** All the Group ids. */
  readonly groupIds?: string[];
}

export function remotePrivateEndpointConnectionWrapperSerializer(
  item: RemotePrivateEndpointConnectionWrapper,
): any {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _remotePrivateEndpointConnectionWrapperPropertiesSerializer(item),
  };
}

export function remotePrivateEndpointConnectionWrapperDeserializer(
  item: any,
): RemotePrivateEndpointConnectionWrapper {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _remotePrivateEndpointConnectionWrapperPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionWrapperProperties {
  /** The resource of private end point. */
  privateEndpoint?: ArmIdWrapper;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: string;
  /** All the Group ids. */
  readonly groupIds?: string[];
}

export function privateEndpointConnectionWrapperPropertiesSerializer(
  item: PrivateEndpointConnectionWrapperProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionWrapperPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionWrapperProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** A wrapper for an ARM resource id */
export interface ArmIdWrapper {
  readonly id?: string;
}

export function armIdWrapperSerializer(item: ArmIdWrapper): any {
  return item;
}

export function armIdWrapperDeserializer(item: any): ArmIdWrapper {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** Status of legacy portal in the API Management service. */
export enum KnownLegacyPortalStatus {
  /** Legacy Portal is enabled for the service. */
  Enabled = "Enabled",
  /** Legacy Portal is disabled for the service. */
  Disabled = "Disabled",
}

/**
 * Status of legacy portal in the API Management service. \
 * {@link KnownLegacyPortalStatus} can be used interchangeably with LegacyPortalStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Legacy Portal is enabled for the service. \
 * **Disabled**: Legacy Portal is disabled for the service.
 */
export type LegacyPortalStatus = string;

/** Status of developer portal in this API Management service. */
export enum KnownDeveloperPortalStatus {
  /** Developer Portal is enabled for the service. */
  Enabled = "Enabled",
  /** Developer Portal is disabled for the service. */
  Disabled = "Disabled",
}

/**
 * Status of developer portal in this API Management service. \
 * {@link KnownDeveloperPortalStatus} can be used interchangeably with DeveloperPortalStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Developer Portal is enabled for the service. \
 * **Disabled**: Developer Portal is disabled for the service.
 */
export type DeveloperPortalStatus = string;

/** Release Channel of this API Management service. */
export enum KnownReleaseChannel {
  /** Preview Channel of the service. */
  Preview = "Preview",
  /** Default Channel of the service. */
  Default = "Default",
  /** Stable Channel of the service. */
  Stable = "Stable",
}

/**
 * Release Channel of this API Management service. \
 * {@link KnownReleaseChannel} can be used interchangeably with ReleaseChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: Preview Channel of the service. \
 * **Default**: Default Channel of the service. \
 * **Stable**: Stable Channel of the service.
 */
export type ReleaseChannel = string;

/** Parameter supplied to Update Api Management Service. */
export interface ApiManagementServiceUpdateParameters extends ApimResource {
  /** SKU properties of the API Management service. */
  sku?: ApiManagementServiceSkuProperties;
  /** Managed service identity of the Api Management service. */
  identity?: ApiManagementServiceIdentity;
  /** ETag of the resource. */
  readonly etag?: string;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: string[];
  /** Email address from which the notification will be sent. */
  notificationSenderEmail?: string;
  /** The current provisioning state of the API Management service which can be one of the following: Created/Activating/Succeeded/Updating/Failed/Stopped/Terminating/TerminationFailed/Deleted. */
  readonly provisioningState?: string;
  /** The provisioning state of the API Management service, which is targeted by the long running operation started on the service. */
  readonly targetProvisioningState?: string;
  /** Creation UTC date of the API Management service.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly createdAtUtc?: Date;
  /** Gateway URL of the API Management service. */
  readonly gatewayUrl?: string;
  /** Gateway URL of the API Management service in the Default Region. */
  readonly gatewayRegionalUrl?: string;
  /** Publisher portal endpoint Url of the API Management service. */
  readonly portalUrl?: string;
  /** Management API endpoint URL of the API Management service. */
  readonly managementApiUrl?: string;
  /** SCM endpoint URL of the API Management service. */
  readonly scmUrl?: string;
  /** DEveloper Portal endpoint URL of the API Management service. */
  readonly developerPortalUrl?: string;
  /** Custom hostname configuration of the API Management service. */
  hostnameConfigurations?: HostnameConfiguration[];
  /** Public Static Load Balanced IP addresses of the API Management service in Primary region. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly publicIPAddresses?: string[];
  /** Private Static Load Balanced IP addresses of the API Management service in Primary region which is deployed in an Internal Virtual Network. Available only for Basic, Standard, Premium and Isolated SKU. */
  readonly privateIPAddresses?: string[];
  /** Public Standard SKU IP V4 based IP address to be associated with Virtual Network deployed service in the region. Supported only for Developer and Premium SKU being deployed in Virtual Network. */
  publicIpAddressId?: string;
  /** Whether or not public endpoint access is allowed for this API Management service.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Configuration API configuration of the API Management service. */
  configurationApi?: ConfigurationApi;
  /** Virtual network configuration of the API Management service. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** Additional datacenter locations of the API Management service. */
  additionalLocations?: AdditionalLocation[];
  /** Custom properties of the API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168` will disable the cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA for all TLS(1.0, 1.1 and 1.2).</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11` can be used to disable just TLS 1.1.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10` can be used to disable TLS 1.0 on an API Management service.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11` can be used to disable just TLS 1.1 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10` can be used to disable TLS 1.0 for communications with backends.</br>Setting `Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2` can be used to enable HTTP2 protocol on an API Management service.</br>Not specifying any of these properties on PATCH operation will reset omitted properties' values to their defaults. For all the settings except Http2 the default value is `True` if the service was created on or before April 1, 2018 and `False` otherwise. Http2 setting's default value is `False`.</br></br>You can disable any of the following ciphers by using settings `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.[cipher_name]`: TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA256, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA. For example, `Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TLS_RSA_WITH_AES_128_CBC_SHA256`:`false`. The default value is `true` for them.</br> Note: The following ciphers can't be disabled since they are required by internal platform components: TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 */
  customProperties?: Record<string, string>;
  /** List of Certificates that need to be installed in the API Management service. Max supported certificates that can be installed is 10. */
  certificates?: CertificateConfiguration[];
  /** Property only meant to be used for Consumption SKU Service. This enforces a client certificate to be presented on each request to the gateway. This also enables the ability to authenticate the certificate in the policy on the gateway. */
  enableClientCertificate?: boolean;
  /** Property can be used to enable NAT Gateway for this API Management service. */
  natGatewayState?: NatGatewayState;
  /** Outbound public IPV4 address prefixes associated with NAT Gateway deployed service. Available only for Premium SKU on stv2 platform. */
  readonly outboundPublicIPAddresses?: string[];
  /** Property only valid for an Api Management service deployed in multiple locations. This can be used to disable the gateway in master region. */
  disableGateway?: boolean;
  /** The type of VPN in which API Management service needs to be configured in. None (Default Value) means the API Management service is not part of any Virtual Network, External means the API Management deployment is set up inside a Virtual Network having an Internet Facing Endpoint, and Internal means that API Management deployment is setup inside a Virtual Network having an Intranet Facing Endpoint only. */
  virtualNetworkType?: VirtualNetworkType;
  /** Control Plane Apis version constraint for the API Management service. */
  apiVersionConstraint?: ApiVersionConstraint;
  /** Undelete Api Management Service if it was previously soft-deleted. If this flag is specified and set to True all other properties will be ignored. */
  restore?: boolean;
  /** List of Private Endpoint Connections of this service. */
  privateEndpointConnections?: RemotePrivateEndpointConnectionWrapper[];
  /** Compute Platform Version running the service in this location. */
  readonly platformVersion?: PlatformVersion;
  /** Status of legacy portal in the API Management service. */
  legacyPortalStatus?: LegacyPortalStatus;
  /** Status of developer portal in this API Management service. */
  developerPortalStatus?: DeveloperPortalStatus;
  /** Release Channel of this API Management service. */
  releaseChannel?: ReleaseChannel;
  /** Zone Redundant Requirement when creating StandardV2 and PremiumV2. If this flag is set to True, will return a APIM service with Zone redundant or fail the request if any underneath component cannot be zone redundant. */
  zoneRedundant?: boolean;
  /** Publisher email. */
  publisherEmail?: string;
  /** Publisher name. */
  publisherName?: string;
}

export function apiManagementServiceUpdateParametersSerializer(
  item: ApiManagementServiceUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "notificationSenderEmail",
      "hostnameConfigurations",
      "publicIpAddressId",
      "publicNetworkAccess",
      "configurationApi",
      "virtualNetworkConfiguration",
      "additionalLocations",
      "customProperties",
      "certificates",
      "enableClientCertificate",
      "natGatewayState",
      "disableGateway",
      "virtualNetworkType",
      "apiVersionConstraint",
      "restore",
      "privateEndpointConnections",
      "legacyPortalStatus",
      "developerPortalStatus",
      "releaseChannel",
      "zoneRedundant",
      "publisherEmail",
      "publisherName",
    ])
      ? undefined
      : _apiManagementServiceUpdateParametersPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : apiManagementServiceSkuPropertiesSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : apiManagementServiceIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of an API Management service resource description. */
export interface ApiManagementServiceUpdateProperties extends ApiManagementServiceBaseProperties {
  /** Publisher email. */
  publisherEmail?: string;
  /** Publisher name. */
  publisherName?: string;
}

export function apiManagementServiceUpdatePropertiesSerializer(
  item: ApiManagementServiceUpdateProperties,
): any {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArraySerializer(item["hostnameConfigurations"]),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiSerializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArraySerializer(item["additionalLocations"]),
    customProperties: item["customProperties"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArraySerializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintSerializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArraySerializer(item["privateEndpointConnections"]),
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

/** The response of the List API Management services operation. */
export interface _ApiManagementServiceListResult {
  /** Result of the List API Management services operation. */
  value: ApiManagementServiceResource[];
  /** Link to the next set of results. Not empty if Value contains incomplete list of API Management services. */
  nextLink?: string;
}

export function _apiManagementServiceListResultDeserializer(
  item: any,
): _ApiManagementServiceListResult {
  return {
    value: apiManagementServiceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiManagementServiceResourceArraySerializer(
  result: Array<ApiManagementServiceResource>,
): any[] {
  return result.map((item) => {
    return apiManagementServiceResourceSerializer(item);
  });
}

export function apiManagementServiceResourceArrayDeserializer(
  result: Array<ApiManagementServiceResource>,
): any[] {
  return result.map((item) => {
    return apiManagementServiceResourceDeserializer(item);
  });
}

/** Parameters supplied to the Backup/Restore of an API Management service operation. */
export interface ApiManagementServiceBackupRestoreParameters {
  /** The name of the Azure storage account (used to place/retrieve the backup). */
  storageAccount: string;
  /** The name of the blob container (used to place/retrieve the backup). */
  containerName: string;
  /** The name of the backup file to create/retrieve. */
  backupName: string;
  /** The type of access to be used for the storage account. */
  accessType?: AccessType;
  /** Storage account access key. Required only if `accessType` is set to `AccessKey`. */
  accessKey?: string;
  /** The Client ID of user assigned managed identity. Required only if `accessType` is set to `UserAssignedManagedIdentity`. */
  clientId?: string;
}

export function apiManagementServiceBackupRestoreParametersSerializer(
  item: ApiManagementServiceBackupRestoreParameters,
): any {
  return {
    storageAccount: item["storageAccount"],
    containerName: item["containerName"],
    backupName: item["backupName"],
    accessType: item["accessType"],
    accessKey: item["accessKey"],
    clientId: item["clientId"],
  };
}

/** The type of access to be used for the storage account. */
export enum KnownAccessType {
  /** Use access key. */
  AccessKey = "AccessKey",
  /** Use system assigned managed identity. */
  SystemAssignedManagedIdentity = "SystemAssignedManagedIdentity",
  /** Use user assigned managed identity. */
  UserAssignedManagedIdentity = "UserAssignedManagedIdentity",
}

/**
 * The type of access to be used for the storage account. \
 * {@link KnownAccessType} can be used interchangeably with AccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessKey**: Use access key. \
 * **SystemAssignedManagedIdentity**: Use system assigned managed identity. \
 * **UserAssignedManagedIdentity**: Use user assigned managed identity.
 */
export type AccessType = string;

/** Describes an available API Management SKU. */
export interface MigrateToStv2Contract {
  /** Mode of Migration to stv2. Default is PreserveIp. */
  mode?: MigrateToStv2Mode;
}

export function migrateToStv2ContractSerializer(item: MigrateToStv2Contract): any {
  return { mode: item["mode"] };
}

/** Mode of Migration to stv2. Default is PreserveIp. */
export enum KnownMigrateToStv2Mode {
  /** Migrate API Management service to stv2 from stv1, by reserving the IP Address of the service. This will have a downtime of upto 15 minutes, while the IP address is getting migrate to new infrastructure. */
  PreserveIp = "PreserveIp",
  /** Migrate API Management service to stv2 from stv1. This will have no downtime as the service configuration will be migrated to new infrastructure, but the IP address will changed. */
  NewIP = "NewIP",
}

/**
 * Mode of Migration to stv2. Default is PreserveIp. \
 * {@link KnownMigrateToStv2Mode} can be used interchangeably with MigrateToStv2Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PreserveIp**: Migrate API Management service to stv2 from stv1, by reserving the IP Address of the service. This will have a downtime of upto 15 minutes, while the IP address is getting migrate to new infrastructure. \
 * **NewIP**: Migrate API Management service to stv2 from stv1. This will have no downtime as the service configuration will be migrated to new infrastructure, but the IP address will changed.
 */
export type MigrateToStv2Mode = string;

/** The response of the GetSsoToken operation. */
export interface ApiManagementServiceGetSsoTokenResult {
  /** Redirect URL to the Publisher Portal containing the SSO token. */
  redirectUri?: string;
}

export function apiManagementServiceGetSsoTokenResultDeserializer(
  item: any,
): ApiManagementServiceGetSsoTokenResult {
  return {
    redirectUri: item["redirectUri"],
  };
}

/** Parameter supplied to the Apply Network configuration operation. */
export interface ApiManagementServiceApplyNetworkConfigurationParameters {
  /** Location of the Api Management service to update for a multi-region service. For a service deployed in a single region, this parameter is not required. */
  location?: string;
}

export function apiManagementServiceApplyNetworkConfigurationParametersSerializer(
  item: ApiManagementServiceApplyNetworkConfigurationParameters,
): any {
  return { location: item["location"] };
}

/** Parameters supplied to the CheckNameAvailability operation. */
export interface ApiManagementServiceCheckNameAvailabilityParameters {
  /** The name to check for availability. */
  name: string;
}

export function apiManagementServiceCheckNameAvailabilityParametersSerializer(
  item: ApiManagementServiceCheckNameAvailabilityParameters,
): any {
  return { name: item["name"] };
}

/** Response of the CheckNameAvailability operation. */
export interface ApiManagementServiceNameAvailabilityResult {
  /** True if the name is available and can be used to create a new API Management service; otherwise false. */
  readonly nameAvailable?: boolean;
  /** If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that <resourceName> is already in use, and direct them to select a different name. */
  readonly message?: string;
  /** Invalid indicates the name provided does not match the resource provider’s naming requirements (incorrect length, unsupported characters, etc.)  AlreadyExists indicates that the name is already in use and is therefore unavailable. */
  reason?: NameAvailabilityReason;
}

export function apiManagementServiceNameAvailabilityResultDeserializer(
  item: any,
): ApiManagementServiceNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    message: item["message"],
    reason: item["reason"],
  };
}

/** Invalid indicates the name provided does not match the resource provider’s naming requirements (incorrect length, unsupported characters, etc.)  AlreadyExists indicates that the name is already in use and is therefore unavailable. */
export type NameAvailabilityReason = "Valid" | "Invalid" | "AlreadyExists";

/** Response of the GetDomainOwnershipIdentifier operation. */
export interface ApiManagementServiceGetDomainOwnershipIdentifierResult {
  /** The domain ownership identifier value. */
  readonly domainOwnershipIdentifier?: string;
}

export function apiManagementServiceGetDomainOwnershipIdentifierResultDeserializer(
  item: any,
): ApiManagementServiceGetDomainOwnershipIdentifierResult {
  return {
    domainOwnershipIdentifier: item["domainOwnershipIdentifier"],
  };
}

/** The response of All Policies. */
export interface _AllPoliciesCollection {
  /** AllPolicies Contract value. */
  value?: AllPoliciesContract[];
  /** Next page link if any. */
  nextLink?: string;
}

export function _allPoliciesCollectionDeserializer(item: any): _AllPoliciesCollection {
  return {
    value: !item["value"] ? item["value"] : allPoliciesContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function allPoliciesContractArrayDeserializer(result: Array<AllPoliciesContract>): any[] {
  return result.map((item) => {
    return allPoliciesContractDeserializer(item);
  });
}

/** AllPolicies Contract details. */
export interface AllPoliciesContract extends ProxyResource {
  /** Policy Identifier */
  referencePolicyId?: string;
  /** Policy Restriction Compliance State */
  complianceState?: PolicyComplianceState;
}

export function allPoliciesContractDeserializer(item: any): AllPoliciesContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _allPoliciesContractPropertiesDeserializer(item["properties"])),
  };
}

/** AllPolicies Properties. */
export interface AllPoliciesContractProperties {
  /** Policy Identifier */
  referencePolicyId?: string;
  /** Policy Restriction Compliance State */
  complianceState?: PolicyComplianceState;
}

export function allPoliciesContractPropertiesDeserializer(
  item: any,
): AllPoliciesContractProperties {
  return {
    referencePolicyId: item["referencePolicyId"],
    complianceState: item["complianceState"],
  };
}

/** Policy Restriction Compliance State */
export enum KnownPolicyComplianceState {
  /** The policy restriction compliance state has not yet been determined. */
  Pending = "Pending",
  /** The scope in restriction is out of compliance. */
  NonCompliant = "NonCompliant",
  /** The scope in restriction is in compliance. */
  Compliant = "Compliant",
}

/**
 * Policy Restriction Compliance State \
 * {@link KnownPolicyComplianceState} can be used interchangeably with PolicyComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The policy restriction compliance state has not yet been determined. \
 * **NonCompliant**: The scope in restriction is out of compliance. \
 * **Compliant**: The scope in restriction is in compliance.
 */
export type PolicyComplianceState = string;

/** The API Management service SKUs operation response. */
export interface _ResourceSkuResults {
  /** The list of skus available for the service. */
  value: ResourceSkuResult[];
  /** The uri to fetch the next page of API Management service Skus. */
  nextLink?: string;
}

export function _resourceSkuResultsDeserializer(item: any): _ResourceSkuResults {
  return {
    value: resourceSkuResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuResultArrayDeserializer(result: Array<ResourceSkuResult>): any[] {
  return result.map((item) => {
    return resourceSkuResultDeserializer(item);
  });
}

/** Describes an available API Management service SKU. */
export interface ResourceSkuResult {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** Specifies API Management SKU. */
  readonly sku?: ResourceSku;
  /** Specifies the number of API Management units. */
  readonly capacity?: ResourceSkuCapacity;
}

export function resourceSkuResultDeserializer(item: any): ResourceSkuResult {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    capacity: !item["capacity"]
      ? item["capacity"]
      : resourceSkuCapacityDeserializer(item["capacity"]),
  };
}

/** Describes an available API Management SKU. */
export interface ResourceSku {
  /** Name of the Sku. */
  name?: SkuType;
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
  };
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: ResourceSkuCapacityScaleType;
}

export function resourceSkuCapacityDeserializer(item: any): ResourceSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export enum KnownResourceSkuCapacityScaleType {
  /** Supported scale type automatic. */
  Automatic = "automatic",
  /** Supported scale type manual. */
  Manual = "manual",
  /** Scaling not supported. */
  None = "none",
}

/**
 * The scale type applicable to the sku. \
 * {@link KnownResourceSkuCapacityScaleType} can be used interchangeably with ResourceSkuCapacityScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **automatic**: Supported scale type automatic. \
 * **manual**: Supported scale type manual. \
 * **none**: Scaling not supported.
 */
export type ResourceSkuCapacityScaleType = string;

/** Network Status in the Location */
export interface NetworkStatusContractByLocation {
  /** Location of service */
  location?: string;
  /** Network status in Location */
  networkStatus?: NetworkStatusContract;
}

export function networkStatusContractByLocationDeserializer(
  item: any,
): NetworkStatusContractByLocation {
  return {
    location: item["location"],
    networkStatus: !item["networkStatus"]
      ? item["networkStatus"]
      : networkStatusContractDeserializer(item["networkStatus"]),
  };
}

/** Network Status details. */
export interface NetworkStatusContract {
  /** Gets the list of DNS servers IPV4 addresses. */
  dnsServers: string[];
  /** Gets the list of Connectivity Status to the Resources on which the service depends upon. */
  connectivityStatus: ConnectivityStatusContract[];
}

export function networkStatusContractDeserializer(item: any): NetworkStatusContract {
  return {
    dnsServers: item["dnsServers"].map((p: any) => {
      return p;
    }),
    connectivityStatus: connectivityStatusContractArrayDeserializer(item["connectivityStatus"]),
  };
}

export function connectivityStatusContractArrayDeserializer(
  result: Array<ConnectivityStatusContract>,
): any[] {
  return result.map((item) => {
    return connectivityStatusContractDeserializer(item);
  });
}

/** Details about connectivity to a resource. */
export interface ConnectivityStatusContract {
  /** The hostname of the resource which the service depends on. This can be the database, storage or any other azure resource on which the service depends upon. */
  name: string;
  /** Resource Connectivity Status Type identifier. */
  status: ConnectivityStatusType;
  /** Error details of the connectivity to the resource. */
  error?: string;
  /** The date when the resource connectivity status was last updated. This status should be updated every 15 minutes. If this status has not been updated, then it means that the service has lost network connectivity to the resource, from inside the Virtual Network.The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  lastUpdated: Date;
  /** The date when the resource connectivity status last Changed from success to failure or vice-versa. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  lastStatusChange: Date;
  /** Resource Type. */
  resourceType: string;
  /** Whether this is optional. */
  isOptional: boolean;
}

export function connectivityStatusContractDeserializer(item: any): ConnectivityStatusContract {
  return {
    name: item["name"],
    status: item["status"],
    error: item["error"],
    lastUpdated: new Date(item["lastUpdated"]),
    lastStatusChange: new Date(item["lastStatusChange"]),
    resourceType: item["resourceType"],
    isOptional: item["isOptional"],
  };
}

/** Resource Connectivity Status Type identifier. */
export enum KnownConnectivityStatusType {
  /** initializing */
  Initializing = "initializing",
  /** success */
  Success = "success",
  /** failure */
  Failure = "failure",
}

/**
 * Resource Connectivity Status Type identifier. \
 * {@link KnownConnectivityStatusType} can be used interchangeably with ConnectivityStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **initializing** \
 * **success** \
 * **failure**
 */
export type ConnectivityStatusType = string;

/** Collection of Outbound Environment Endpoints */
export interface OutboundEnvironmentEndpointList {
  /** Collection of resources. */
  value: OutboundEnvironmentEndpoint[];
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

export function outboundEnvironmentEndpointListDeserializer(
  item: any,
): OutboundEnvironmentEndpointList {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** Endpoints accessed for a common purpose that the Api Management Service requires outbound network access to. */
export interface OutboundEnvironmentEndpoint {
  /** The type of service accessed by the Api Management Service, e.g., Azure Storage, Azure SQL Database, and Azure Active Directory. */
  category?: string;
  /** The endpoints that the Api Management Service reaches the service at. */
  endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that a service is reached at. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports used when connecting to DomainName. */
  endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Current TCP connectivity information from the Api Management Service to a single endpoint. */
export interface EndpointDetail {
  /** The port an endpoint is connected to. */
  port?: number;
  /** The region of the dependency. */
  region?: string;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    port: item["port"],
    region: item["region"],
  };
}

/** Descriptions of API Management policies. */
export interface PolicyDescriptionCollection {
  /** Descriptions of API Management policies. */
  value?: PolicyDescriptionContract[];
  /** Total record count number. */
  count?: number;
}

export function policyDescriptionCollectionDeserializer(item: any): PolicyDescriptionCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : policyDescriptionContractArrayDeserializer(item["value"]),
    count: item["count"],
  };
}

export function policyDescriptionContractArrayDeserializer(
  result: Array<PolicyDescriptionContract>,
): any[] {
  return result.map((item) => {
    return policyDescriptionContractDeserializer(item);
  });
}

/** Policy description details. */
export interface PolicyDescriptionContract extends ProxyResource {
  /** Policy description. */
  readonly description?: string;
  /** Binary OR value of the Snippet scope. */
  readonly scope?: number;
}

export function policyDescriptionContractDeserializer(item: any): PolicyDescriptionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyDescriptionContractPropertiesDeserializer(item["properties"])),
  };
}

/** Policy description properties. */
export interface PolicyDescriptionContractProperties {
  /** Policy description. */
  readonly description?: string;
  /** Binary OR value of the Snippet scope. */
  readonly scope?: number;
}

export function policyDescriptionContractPropertiesDeserializer(
  item: any,
): PolicyDescriptionContractProperties {
  return {
    description: item["description"],
    scope: item["scope"],
  };
}

/** Long Running Git Operation Results. */
export interface OperationResultContract extends ProxyResource {
  /** Operation result identifier. */
  idPropertiesId?: string;
  /** Status of an async operation. */
  status?: AsyncOperationStatus;
  /** Start time of an async operation. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  started?: Date;
  /** Last update time of an async operation. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  updated?: Date;
  /** Optional result info. */
  resultInfo?: string;
  /** Error Body Contract */
  error?: ErrorResponseBody;
  /** This property if only provided as part of the TenantConfiguration_Validate operation. It contains the log the entities which will be updated/created/deleted as part of the TenantConfiguration_Deploy operation. */
  readonly actionLog?: OperationResultLogItemContract[];
}

export function operationResultContractDeserializer(item: any): OperationResultContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _operationResultContractPropertiesDeserializer(item["properties"])),
  };
}

/** Operation Result. */
export interface OperationResultContractProperties {
  /** Operation result identifier. */
  id?: string;
  /** Status of an async operation. */
  status?: AsyncOperationStatus;
  /** Start time of an async operation. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  started?: Date;
  /** Last update time of an async operation. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  updated?: Date;
  /** Optional result info. */
  resultInfo?: string;
  /** Error Body Contract */
  error?: ErrorResponseBody;
  /** This property if only provided as part of the TenantConfiguration_Validate operation. It contains the log the entities which will be updated/created/deleted as part of the TenantConfiguration_Deploy operation. */
  readonly actionLog?: OperationResultLogItemContract[];
}

export function operationResultContractPropertiesDeserializer(
  item: any,
): OperationResultContractProperties {
  return {
    id: item["id"],
    status: item["status"],
    started: !item["started"] ? item["started"] : new Date(item["started"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    resultInfo: item["resultInfo"],
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
    actionLog: !item["actionLog"]
      ? item["actionLog"]
      : operationResultLogItemContractArrayDeserializer(item["actionLog"]),
  };
}

/** Status of an async operation. */
export type AsyncOperationStatus = "Started" | "InProgress" | "Succeeded" | "Failed";

/** Error Body contract. */
export interface ErrorResponseBody {
  /** Service-defined error code. This code serves as a sub-status for the HTTP error code specified in the response. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
  /** The list of invalid fields send in request, in case of validation error. */
  details?: ErrorFieldContract[];
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : errorFieldContractArrayDeserializer(item["details"]),
  };
}

export function errorFieldContractArrayDeserializer(result: Array<ErrorFieldContract>): any[] {
  return result.map((item) => {
    return errorFieldContractDeserializer(item);
  });
}

/** Error Field contract. */
export interface ErrorFieldContract {
  /** Property level error code. */
  code?: string;
  /** Human-readable representation of property-level error. */
  message?: string;
  /** Property name. */
  target?: string;
}

export function errorFieldContractDeserializer(item: any): ErrorFieldContract {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

export function operationResultLogItemContractArrayDeserializer(
  result: Array<OperationResultLogItemContract>,
): any[] {
  return result.map((item) => {
    return operationResultLogItemContractDeserializer(item);
  });
}

/** Log of the entity being created, updated or deleted. */
export interface OperationResultLogItemContract {
  /** The type of entity contract. */
  objectType?: string;
  /** Action like create/update/delete. */
  action?: string;
  /** Identifier of the entity being created/updated/deleted. */
  objectKey?: string;
}

export function operationResultLogItemContractDeserializer(
  item: any,
): OperationResultLogItemContract {
  return {
    objectType: item["objectType"],
    action: item["action"],
    objectKey: item["objectKey"],
  };
}

/** Descriptions of API Management policies. */
export interface PortalSettingsCollection {
  /** Descriptions of API Management policies. */
  value?: PortalSettingsContract[];
  /** Total record count number. */
  count?: number;
}

export function portalSettingsCollectionDeserializer(item: any): PortalSettingsCollection {
  return {
    value: !item["value"] ? item["value"] : portalSettingsContractArrayDeserializer(item["value"]),
    count: item["count"],
  };
}

export function portalSettingsContractArrayDeserializer(
  result: Array<PortalSettingsContract>,
): any[] {
  return result.map((item) => {
    return portalSettingsContractDeserializer(item);
  });
}

/** Portal Settings for the Developer Portal. */
export interface PortalSettingsContract extends ProxyResource {
  /** A delegation Url. */
  url?: string;
  /** A base64-encoded validation key to validate, that a request is coming from Azure API Management. */
  validationKey?: string;
  /** Subscriptions delegation settings. */
  subscriptions?: SubscriptionsDelegationSettingsProperties;
  /** User registration delegation settings. */
  userRegistration?: RegistrationDelegationSettingsProperties;
  /** Redirect Anonymous users to the Sign-In page. */
  enabled?: boolean;
  /** Terms of service contract properties. */
  termsOfService?: TermsOfServiceProperties;
}

export function portalSettingsContractDeserializer(item: any): PortalSettingsContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalSettingsContractPropertiesDeserializer(item["properties"])),
  };
}

/** Sign-in settings contract properties. */
export interface PortalSettingsContractProperties {
  /** A delegation Url. */
  url?: string;
  /** A base64-encoded validation key to validate, that a request is coming from Azure API Management. */
  validationKey?: string;
  /** Subscriptions delegation settings. */
  subscriptions?: SubscriptionsDelegationSettingsProperties;
  /** User registration delegation settings. */
  userRegistration?: RegistrationDelegationSettingsProperties;
  /** Redirect Anonymous users to the Sign-In page. */
  enabled?: boolean;
  /** Terms of service contract properties. */
  termsOfService?: TermsOfServiceProperties;
}

export function portalSettingsContractPropertiesDeserializer(
  item: any,
): PortalSettingsContractProperties {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesDeserializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesDeserializer(item["userRegistration"]),
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesDeserializer(item["termsOfService"]),
  };
}

/** Paged Quota Counter list representation. */
export interface QuotaCounterCollection {
  /** Quota counter values. */
  value?: QuotaCounterContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function quotaCounterCollectionDeserializer(item: any): QuotaCounterCollection {
  return {
    value: !item["value"] ? item["value"] : quotaCounterContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function quotaCounterContractArrayDeserializer(result: Array<QuotaCounterContract>): any[] {
  return result.map((item) => {
    return quotaCounterContractDeserializer(item);
  });
}

/** Quota counter details. */
export interface QuotaCounterContract {
  /** The Key value of the Counter. Must not be empty. */
  counterKey: string;
  /** Identifier of the Period for which the counter was collected. Must not be empty. */
  periodKey: string;
  /** The date of the start of Counter Period. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  periodStartTime: Date;
  /** The date of the end of Counter Period. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  periodEndTime: Date;
  /** Quota Value Properties */
  value?: QuotaCounterValueContractProperties;
}

export function quotaCounterContractDeserializer(item: any): QuotaCounterContract {
  return {
    counterKey: item["counterKey"],
    periodKey: item["periodKey"],
    periodStartTime: new Date(item["periodStartTime"]),
    periodEndTime: new Date(item["periodEndTime"]),
    value: !item["value"]
      ? item["value"]
      : quotaCounterValueContractPropertiesDeserializer(item["value"]),
  };
}

/** Quota counter value details. */
export interface QuotaCounterValueContractProperties {
  /** Number of times Counter was called. */
  callsCount?: number;
  /** Data Transferred in KiloBytes. */
  kbTransferred?: number;
}

export function quotaCounterValueContractPropertiesSerializer(
  item: QuotaCounterValueContractProperties,
): any {
  return { callsCount: item["callsCount"], kbTransferred: item["kbTransferred"] };
}

export function quotaCounterValueContractPropertiesDeserializer(
  item: any,
): QuotaCounterValueContractProperties {
  return {
    callsCount: item["callsCount"],
    kbTransferred: item["kbTransferred"],
  };
}

/** Quota counter value details. */
export interface QuotaCounterValueUpdateContract {
  /** Number of times Counter was called. */
  callsCount?: number;
  /** Data Transferred in KiloBytes. */
  kbTransferred?: number;
}

export function quotaCounterValueUpdateContractSerializer(
  item: QuotaCounterValueUpdateContract,
): any {
  return {
    properties: areAllPropsUndefined(item, ["callsCount", "kbTransferred"])
      ? undefined
      : _quotaCounterValueUpdateContractPropertiesSerializer(item),
  };
}

/** Lists Regions operation response details. */
export interface _RegionListResult {
  /** Lists of Regions. */
  value?: RegionContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _regionListResultDeserializer(item: any): _RegionListResult {
  return {
    value: !item["value"] ? item["value"] : regionContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function regionContractArrayDeserializer(result: Array<RegionContract>): any[] {
  return result.map((item) => {
    return regionContractDeserializer(item);
  });
}

/** Region profile. */
export interface RegionContract {
  /** Region name. */
  readonly name?: string;
  /** whether Region is the master region. */
  isMasterRegion?: boolean;
  /** whether Region is deleted. */
  isDeleted?: boolean;
}

export function regionContractDeserializer(item: any): RegionContract {
  return {
    name: item["name"],
    isMasterRegion: item["isMasterRegion"],
    isDeleted: item["isDeleted"],
  };
}

/** Paged Report records list representation. */
export interface _ReportCollection {
  /** Page values. */
  value?: ReportRecordContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _reportCollectionDeserializer(item: any): _ReportCollection {
  return {
    value: !item["value"] ? item["value"] : reportRecordContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function reportRecordContractArrayDeserializer(result: Array<ReportRecordContract>): any[] {
  return result.map((item) => {
    return reportRecordContractDeserializer(item);
  });
}

/** Report data. */
export interface ReportRecordContract {
  /** Name depending on report endpoint specifies product, API, operation or developer name. */
  name?: string;
  /** Start of aggregation period. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  timestamp?: Date;
  /** Length of aggregation period.  Interval must be multiple of 15 minutes and may not be zero. The value should be in ISO 8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations). */
  interval?: string;
  /** Country to which this record data is related. */
  country?: string;
  /** Country region to which this record data is related. */
  region?: string;
  /** Zip code to which this record data is related. */
  zip?: string;
  /** User identifier path. /users/{userId} */
  readonly userId?: string;
  /** Product identifier path. /products/{productId} */
  readonly productId?: string;
  /** API identifier path. /apis/{apiId} */
  apiId?: string;
  /** Operation identifier path. /apis/{apiId}/operations/{operationId} */
  operationId?: string;
  /** API region identifier. */
  apiRegion?: string;
  /** Subscription identifier path. /subscriptions/{subscriptionId} */
  subscriptionId?: string;
  /** Number of successful calls. This includes calls returning HttpStatusCode <= 301 and HttpStatusCode.NotModified and HttpStatusCode.TemporaryRedirect */
  callCountSuccess?: number;
  /** Number of calls blocked due to invalid credentials. This includes calls returning HttpStatusCode.Unauthorized and HttpStatusCode.Forbidden and HttpStatusCode.TooManyRequests */
  callCountBlocked?: number;
  /** Number of calls failed due to gateway or backend errors. This includes calls returning HttpStatusCode.BadRequest(400) and any Code between HttpStatusCode.InternalServerError (500) and 600 */
  callCountFailed?: number;
  /** Number of other calls. */
  callCountOther?: number;
  /** Total number of calls. */
  callCountTotal?: number;
  /** Bandwidth consumed. */
  bandwidth?: number;
  /** Number of times when content was served from cache policy. */
  cacheHitCount?: number;
  /** Number of times content was fetched from backend. */
  cacheMissCount?: number;
  /** Average time it took to process request. */
  apiTimeAvg?: number;
  /** Minimum time it took to process request. */
  apiTimeMin?: number;
  /** Maximum time it took to process request. */
  apiTimeMax?: number;
  /** Average time it took to process request on backend. */
  serviceTimeAvg?: number;
  /** Minimum time it took to process request on backend. */
  serviceTimeMin?: number;
  /** Maximum time it took to process request on backend. */
  serviceTimeMax?: number;
}

export function reportRecordContractDeserializer(item: any): ReportRecordContract {
  return {
    name: item["name"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    interval: item["interval"],
    country: item["country"],
    region: item["region"],
    zip: item["zip"],
    userId: item["userId"],
    productId: item["productId"],
    apiId: item["apiId"],
    operationId: item["operationId"],
    apiRegion: item["apiRegion"],
    subscriptionId: item["subscriptionId"],
    callCountSuccess: item["callCountSuccess"],
    callCountBlocked: item["callCountBlocked"],
    callCountFailed: item["callCountFailed"],
    callCountOther: item["callCountOther"],
    callCountTotal: item["callCountTotal"],
    bandwidth: item["bandwidth"],
    cacheHitCount: item["cacheHitCount"],
    cacheMissCount: item["cacheMissCount"],
    apiTimeAvg: item["apiTimeAvg"],
    apiTimeMin: item["apiTimeMin"],
    apiTimeMax: item["apiTimeMax"],
    serviceTimeAvg: item["serviceTimeAvg"],
    serviceTimeMin: item["serviceTimeMin"],
    serviceTimeMax: item["serviceTimeMax"],
  };
}

/** Paged Report records list representation. */
export interface _RequestReportCollection {
  /** Page values. */
  value?: RequestReportRecordContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _requestReportCollectionDeserializer(item: any): _RequestReportCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : requestReportRecordContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function requestReportRecordContractArrayDeserializer(
  result: Array<RequestReportRecordContract>,
): any[] {
  return result.map((item) => {
    return requestReportRecordContractDeserializer(item);
  });
}

/** Request Report data. */
export interface RequestReportRecordContract {
  /** API identifier path. /apis/{apiId} */
  apiId?: string;
  /** Operation identifier path. /apis/{apiId}/operations/{operationId} */
  operationId?: string;
  /** Product identifier path. /products/{productId} */
  readonly productId?: string;
  /** User identifier path. /users/{userId} */
  readonly userId?: string;
  /** The HTTP method associated with this request.. */
  method?: string;
  /** The full URL associated with this request. */
  url?: string;
  /** The client IP address associated with this request. */
  ipAddress?: string;
  /** The HTTP status code received by the gateway as a result of forwarding this request to the backend. */
  backendResponseCode?: string;
  /** The HTTP status code returned by the gateway. */
  responseCode?: number;
  /** The size of the response returned by the gateway. */
  responseSize?: number;
  /** The date and time when this request was received by the gateway in ISO 8601 format. */
  timestamp?: Date;
  /** Specifies if response cache was involved in generating the response. If the value is none, the cache was not used. If the value is hit, cached response was returned. If the value is miss, the cache was used but lookup resulted in a miss and request was fulfilled by the backend. */
  cache?: string;
  /** The total time it took to process this request. */
  apiTime?: number;
  /** he time it took to forward this request to the backend and get the response back. */
  serviceTime?: number;
  /** Azure region where the gateway that processed this request is located. */
  apiRegion?: string;
  /** Subscription identifier path. /subscriptions/{subscriptionId} */
  subscriptionId?: string;
  /** Request Identifier. */
  requestId?: string;
  /** The size of this request.. */
  requestSize?: number;
}

export function requestReportRecordContractDeserializer(item: any): RequestReportRecordContract {
  return {
    apiId: item["apiId"],
    operationId: item["operationId"],
    productId: item["productId"],
    userId: item["userId"],
    method: item["method"],
    url: item["url"],
    ipAddress: item["ipAddress"],
    backendResponseCode: item["backendResponseCode"],
    responseCode: item["responseCode"],
    responseSize: item["responseSize"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    cache: item["cache"],
    apiTime: item["apiTime"],
    serviceTime: item["serviceTime"],
    apiRegion: item["apiRegion"],
    subscriptionId: item["subscriptionId"],
    requestId: item["requestId"],
    requestSize: item["requestSize"],
  };
}

/** GraphQL API Resolver details. */
export interface ResolverContract extends ProxyResource {
  /** Resolver Name. */
  displayName?: string;
  /** Path is type/field being resolved. */
  path?: string;
  /** Description of the resolver. May include HTML formatting tags. */
  description?: string;
}

export function resolverContractSerializer(item: ResolverContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "path", "description"])
      ? undefined
      : _resolverContractPropertiesSerializer(item),
  };
}

export function resolverContractDeserializer(item: any): ResolverContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _resolverContractPropertiesDeserializer(item["properties"])),
  };
}

/** GraphQL API Resolver Entity Base Contract details. */
export interface ResolverEntityBaseContract {
  /** Resolver Name. */
  displayName?: string;
  /** Path is type/field being resolved. */
  path?: string;
  /** Description of the resolver. May include HTML formatting tags. */
  description?: string;
}

export function resolverEntityBaseContractSerializer(item: ResolverEntityBaseContract): any {
  return { displayName: item["displayName"], path: item["path"], description: item["description"] };
}

export function resolverEntityBaseContractDeserializer(item: any): ResolverEntityBaseContract {
  return {
    displayName: item["displayName"],
    path: item["path"],
    description: item["description"],
  };
}

/** GraphQL API Resolver Update Contract details. */
export interface ResolverUpdateContract {
  /** Resolver Name. */
  displayName?: string;
  /** Path is type/field being resolved. */
  path?: string;
  /** Description of the resolver. May include HTML formatting tags. */
  description?: string;
}

export function resolverUpdateContractSerializer(item: ResolverUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "path", "description"])
      ? undefined
      : _resolverUpdateContractPropertiesSerializer(item),
  };
}

/** Resolver Update Contract Properties. */
export interface ResolverUpdateContractProperties {
  /** Resolver Name. */
  displayName?: string;
  /** Path is type/field being resolved. */
  path?: string;
  /** Description of the resolver. May include HTML formatting tags. */
  description?: string;
}

export function resolverUpdateContractPropertiesSerializer(
  item: ResolverUpdateContractProperties,
): any {
  return { displayName: item["displayName"], path: item["path"], description: item["description"] };
}

/** Paged Resolver list representation. */
export interface _ResolverCollection {
  /** Page values. */
  readonly value?: ResolverContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _resolverCollectionDeserializer(item: any): _ResolverCollection {
  return {
    value: !item["value"] ? item["value"] : resolverContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function resolverContractArraySerializer(result: Array<ResolverContract>): any[] {
  return result.map((item) => {
    return resolverContractSerializer(item);
  });
}

export function resolverContractArrayDeserializer(result: Array<ResolverContract>): any[] {
  return result.map((item) => {
    return resolverContractDeserializer(item);
  });
}

/** Issue update Parameters. */
export interface IssueUpdateContract {
  /** Date and time when the issue was created. */
  createdDate?: Date;
  /** Status of the issue. */
  state?: State;
  /** A resource identifier for the API the issue was created for. */
  apiId?: string;
  /** The issue title. */
  title?: string;
  /** Text describing the issue. */
  description?: string;
  /** A resource identifier for the user created the issue. */
  userId?: string;
}

export function issueUpdateContractSerializer(item: IssueUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "createdDate",
      "state",
      "apiId",
      "title",
      "description",
      "userId",
    ])
      ? undefined
      : _issueUpdateContractPropertiesSerializer(item),
  };
}

/** Issue contract Update Properties. */
export interface IssueUpdateContractProperties extends IssueContractBaseProperties {
  /** The issue title. */
  title?: string;
  /** Text describing the issue. */
  description?: string;
  /** A resource identifier for the user created the issue. */
  userId?: string;
}

export function issueUpdateContractPropertiesSerializer(item: IssueUpdateContractProperties): any {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

/** Issue Comment Contract details. */
export interface IssueCommentContract extends ProxyResource {
  /** Comment text. */
  text?: string;
  /** Date and time when the comment was created. */
  createdDate?: Date;
  /** A resource identifier for the user who left the comment. */
  userId?: string;
}

export function issueCommentContractSerializer(item: IssueCommentContract): any {
  return {
    properties: areAllPropsUndefined(item, ["text", "createdDate", "userId"])
      ? undefined
      : _issueCommentContractPropertiesSerializer(item),
  };
}

export function issueCommentContractDeserializer(item: any): IssueCommentContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _issueCommentContractPropertiesDeserializer(item["properties"])),
  };
}

/** Issue Comment contract Properties. */
export interface IssueCommentContractProperties {
  /** Comment text. */
  text: string;
  /** Date and time when the comment was created. */
  createdDate?: Date;
  /** A resource identifier for the user who left the comment. */
  userId: string;
}

export function issueCommentContractPropertiesSerializer(
  item: IssueCommentContractProperties,
): any {
  return {
    text: item["text"],
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    userId: item["userId"],
  };
}

export function issueCommentContractPropertiesDeserializer(
  item: any,
): IssueCommentContractProperties {
  return {
    text: item["text"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    userId: item["userId"],
  };
}

/** Paged Issue Comment list representation. */
export interface _IssueCommentCollection {
  /** Issue Comment values. */
  readonly value?: IssueCommentContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _issueCommentCollectionDeserializer(item: any): _IssueCommentCollection {
  return {
    value: !item["value"] ? item["value"] : issueCommentContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function issueCommentContractArraySerializer(result: Array<IssueCommentContract>): any[] {
  return result.map((item) => {
    return issueCommentContractSerializer(item);
  });
}

export function issueCommentContractArrayDeserializer(result: Array<IssueCommentContract>): any[] {
  return result.map((item) => {
    return issueCommentContractDeserializer(item);
  });
}

/** Issue Attachment Contract details. */
export interface IssueAttachmentContract extends ProxyResource {
  /** Filename by which the binary data will be saved. */
  title?: string;
  /** Either 'link' if content is provided via an HTTP link or the MIME type of the Base64-encoded binary data provided in the 'content' property. */
  contentFormat?: string;
  /** An HTTP link or Base64-encoded binary data. */
  content?: string;
}

export function issueAttachmentContractSerializer(item: IssueAttachmentContract): any {
  return {
    properties: areAllPropsUndefined(item, ["title", "contentFormat", "content"])
      ? undefined
      : _issueAttachmentContractPropertiesSerializer(item),
  };
}

export function issueAttachmentContractDeserializer(item: any): IssueAttachmentContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _issueAttachmentContractPropertiesDeserializer(item["properties"])),
  };
}

/** Issue Attachment contract Properties. */
export interface IssueAttachmentContractProperties {
  /** Filename by which the binary data will be saved. */
  title: string;
  /** Either 'link' if content is provided via an HTTP link or the MIME type of the Base64-encoded binary data provided in the 'content' property. */
  contentFormat: string;
  /** An HTTP link or Base64-encoded binary data. */
  content: string;
}

export function issueAttachmentContractPropertiesSerializer(
  item: IssueAttachmentContractProperties,
): any {
  return { title: item["title"], contentFormat: item["contentFormat"], content: item["content"] };
}

export function issueAttachmentContractPropertiesDeserializer(
  item: any,
): IssueAttachmentContractProperties {
  return {
    title: item["title"],
    contentFormat: item["contentFormat"],
    content: item["content"],
  };
}

/** Paged Issue Attachment list representation. */
export interface _IssueAttachmentCollection {
  /** Issue Attachment values. */
  readonly value?: IssueAttachmentContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _issueAttachmentCollectionDeserializer(item: any): _IssueAttachmentCollection {
  return {
    value: !item["value"] ? item["value"] : issueAttachmentContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function issueAttachmentContractArraySerializer(
  result: Array<IssueAttachmentContract>,
): any[] {
  return result.map((item) => {
    return issueAttachmentContractSerializer(item);
  });
}

export function issueAttachmentContractArrayDeserializer(
  result: Array<IssueAttachmentContract>,
): any[] {
  return result.map((item) => {
    return issueAttachmentContractDeserializer(item);
  });
}

/** Contract details. */
export interface TagDescriptionContract extends ProxyResource {
  /** Description of the Tag. */
  description?: string;
  /** Absolute URL of external resources describing the tag. */
  externalDocsUrl?: string;
  /** Description of the external resources describing the tag. */
  externalDocsDescription?: string;
  /** Identifier of the tag in the form of /tags/{tagId} */
  tagId?: string;
  /** Tag name. */
  displayName?: string;
}

export function tagDescriptionContractDeserializer(item: any): TagDescriptionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagDescriptionContractPropertiesDeserializer(item["properties"])),
  };
}

/** TagDescription contract Properties. */
export interface TagDescriptionContractProperties extends TagDescriptionBaseProperties {
  /** Identifier of the tag in the form of /tags/{tagId} */
  tagId?: string;
  /** Tag name. */
  displayName?: string;
}

export function tagDescriptionContractPropertiesDeserializer(
  item: any,
): TagDescriptionContractProperties {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
    tagId: item["tagId"],
    displayName: item["displayName"],
  };
}

/** Parameters supplied to the Create TagDescription operation. */
export interface TagDescriptionBaseProperties {
  /** Description of the Tag. */
  description?: string;
  /** Absolute URL of external resources describing the tag. */
  externalDocsUrl?: string;
  /** Description of the external resources describing the tag. */
  externalDocsDescription?: string;
}

export function tagDescriptionBasePropertiesSerializer(item: TagDescriptionBaseProperties): any {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
  };
}

export function tagDescriptionBasePropertiesDeserializer(item: any): TagDescriptionBaseProperties {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
  };
}

/** Parameters supplied to the Create TagDescription operation. */
export interface TagDescriptionCreateParameters {
  /** Description of the Tag. */
  description?: string;
  /** Absolute URL of external resources describing the tag. */
  externalDocsUrl?: string;
  /** Description of the external resources describing the tag. */
  externalDocsDescription?: string;
}

export function tagDescriptionCreateParametersSerializer(
  item: TagDescriptionCreateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "externalDocsUrl",
      "externalDocsDescription",
    ])
      ? undefined
      : _tagDescriptionCreateParametersPropertiesSerializer(item),
  };
}

/** Paged TagDescription list representation. */
export interface _TagDescriptionCollection {
  /** Page values. */
  value?: TagDescriptionContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _tagDescriptionCollectionDeserializer(item: any): _TagDescriptionCollection {
  return {
    value: !item["value"] ? item["value"] : tagDescriptionContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function tagDescriptionContractArrayDeserializer(
  result: Array<TagDescriptionContract>,
): any[] {
  return result.map((item) => {
    return tagDescriptionContractDeserializer(item);
  });
}

/** Paged Wiki list representation. */
export interface _WikiCollection {
  /** Page values. */
  readonly value?: WikiContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _wikiCollectionDeserializer(item: any): _WikiCollection {
  return {
    value: !item["value"] ? item["value"] : wikiContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function wikiContractArraySerializer(result: Array<WikiContract>): any[] {
  return result.map((item) => {
    return wikiContractSerializer(item);
  });
}

export function wikiContractArrayDeserializer(result: Array<WikiContract>): any[] {
  return result.map((item) => {
    return wikiContractDeserializer(item);
  });
}

/** Tool details. */
export interface ToolContract extends ProxyResource {
  /** Tool Name. MCP tool name must contain only letters, numbers, underscores, and hyphens. */
  displayName?: string;
  /** Description of the tool. */
  description?: string;
  /** Identifier of the operation this MCP tool is associated with in the form of /apis/{apiId}/operations/{operationId}. */
  operationId?: string;
}

export function toolContractSerializer(item: ToolContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "description", "operationId"])
      ? undefined
      : _toolContractPropertiesSerializer(item),
  };
}

export function toolContractDeserializer(item: any): ToolContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _toolContractPropertiesDeserializer(item["properties"])),
  };
}

/** model interface ToolContractProperties */
export interface ToolContractProperties {
  /** Tool Name. MCP tool name must contain only letters, numbers, underscores, and hyphens. */
  displayName?: string;
  /** Description of the tool. */
  description?: string;
  /** Identifier of the operation this MCP tool is associated with in the form of /apis/{apiId}/operations/{operationId}. */
  operationId?: string;
}

export function toolContractPropertiesSerializer(item: ToolContractProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    operationId: item["operationId"],
  };
}

export function toolContractPropertiesDeserializer(item: any): ToolContractProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    operationId: item["operationId"],
  };
}

/** Paged Tool list representation. */
export interface _ToolCollection {
  /** Page values of Tools contract. */
  readonly value?: ToolContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _toolCollectionDeserializer(item: any): _ToolCollection {
  return {
    value: !item["value"] ? item["value"] : toolContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function toolContractArraySerializer(result: Array<ToolContract>): any[] {
  return result.map((item) => {
    return toolContractSerializer(item);
  });
}

export function toolContractArrayDeserializer(result: Array<ToolContract>): any[] {
  return result.map((item) => {
    return toolContractDeserializer(item);
  });
}

/** Authorization Provider contract. */
export interface AuthorizationProviderContract extends ProxyResource {
  /** Authorization Provider name. Must be 1 to 300 characters long. */
  displayName?: string;
  /** Identity provider name. Must be 1 to 300 characters long. */
  identityProvider?: string;
  /** OAuth2 settings */
  oauth2?: AuthorizationProviderOAuth2Settings;
}

export function authorizationProviderContractSerializer(item: AuthorizationProviderContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "identityProvider", "oauth2"])
      ? undefined
      : _authorizationProviderContractPropertiesSerializer(item),
  };
}

export function authorizationProviderContractDeserializer(
  item: any,
): AuthorizationProviderContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authorizationProviderContractPropertiesDeserializer(item["properties"])),
  };
}

/** Authorization Provider details. */
export interface AuthorizationProviderContractProperties {
  /** Authorization Provider name. Must be 1 to 300 characters long. */
  displayName?: string;
  /** Identity provider name. Must be 1 to 300 characters long. */
  identityProvider?: string;
  /** OAuth2 settings */
  oauth2?: AuthorizationProviderOAuth2Settings;
}

export function authorizationProviderContractPropertiesSerializer(
  item: AuthorizationProviderContractProperties,
): any {
  return {
    displayName: item["displayName"],
    identityProvider: item["identityProvider"],
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : authorizationProviderOAuth2SettingsSerializer(item["oauth2"]),
  };
}

export function authorizationProviderContractPropertiesDeserializer(
  item: any,
): AuthorizationProviderContractProperties {
  return {
    displayName: item["displayName"],
    identityProvider: item["identityProvider"],
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : authorizationProviderOAuth2SettingsDeserializer(item["oauth2"]),
  };
}

/** OAuth2 settings details */
export interface AuthorizationProviderOAuth2Settings {
  /** Redirect URL to be set in the OAuth application. */
  redirectUrl?: string;
  /** OAuth2 settings */
  grantTypes?: AuthorizationProviderOAuth2GrantTypes;
  /** Key Vault reference for client secret storage */
  keyVault?: AuthorizationProviderKeyVaultContract;
}

export function authorizationProviderOAuth2SettingsSerializer(
  item: AuthorizationProviderOAuth2Settings,
): any {
  return {
    redirectUrl: item["redirectUrl"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : authorizationProviderOAuth2GrantTypesSerializer(item["grantTypes"]),
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : authorizationProviderKeyVaultContractSerializer(item["keyVault"]),
  };
}

export function authorizationProviderOAuth2SettingsDeserializer(
  item: any,
): AuthorizationProviderOAuth2Settings {
  return {
    redirectUrl: item["redirectUrl"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : authorizationProviderOAuth2GrantTypesDeserializer(item["grantTypes"]),
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : authorizationProviderKeyVaultContractDeserializer(item["keyVault"]),
  };
}

/** Authorization Provider oauth2 grant types settings */
export interface AuthorizationProviderOAuth2GrantTypes {
  /** OAuth2 authorization code grant parameters */
  authorizationCode?: Record<string, string>;
  /** OAuth2 client credential grant parameters */
  clientCredentials?: Record<string, string>;
}

export function authorizationProviderOAuth2GrantTypesSerializer(
  item: AuthorizationProviderOAuth2GrantTypes,
): any {
  return {
    authorizationCode: item["authorizationCode"],
    clientCredentials: item["clientCredentials"],
  };
}

export function authorizationProviderOAuth2GrantTypesDeserializer(
  item: any,
): AuthorizationProviderOAuth2GrantTypes {
  return {
    authorizationCode: !item["authorizationCode"]
      ? item["authorizationCode"]
      : Object.fromEntries(
          Object.entries(item["authorizationCode"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    clientCredentials: !item["clientCredentials"]
      ? item["clientCredentials"]
      : Object.fromEntries(
          Object.entries(item["clientCredentials"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Authorization Provider KeyVault contract properties. */
export interface AuthorizationProviderKeyVaultContract extends AuthorizationProviderKeyVaultCreateProperties {
  /** When the secret was last updated in key vault. */
  readonly updated?: Date;
  /** Last time sync and refresh of secret from key vault. */
  readonly lastStatus?: KeyVaultLastAccessStatusContractProperties;
}

export function authorizationProviderKeyVaultContractSerializer(
  item: AuthorizationProviderKeyVaultContract,
): any {
  return { secretIdentifier: item["secretIdentifier"] };
}

export function authorizationProviderKeyVaultContractDeserializer(
  item: any,
): AuthorizationProviderKeyVaultContract {
  return {
    secretIdentifier: item["secretIdentifier"],
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    lastStatus: !item["lastStatus"]
      ? item["lastStatus"]
      : keyVaultLastAccessStatusContractPropertiesDeserializer(item["lastStatus"]),
  };
}

/** Authorization Provider KeyVault create contract properties. */
export interface AuthorizationProviderKeyVaultCreateProperties {
  /** Key vault secret identifier for client secret. When provided, client secret will be retrieved from the provided key vault secret. */
  secretIdentifier?: string;
}

export function authorizationProviderKeyVaultCreatePropertiesSerializer(
  item: AuthorizationProviderKeyVaultCreateProperties,
): any {
  return { secretIdentifier: item["secretIdentifier"] };
}

export function authorizationProviderKeyVaultCreatePropertiesDeserializer(
  item: any,
): AuthorizationProviderKeyVaultCreateProperties {
  return {
    secretIdentifier: item["secretIdentifier"],
  };
}

/** Paged Authorization Provider list representation. */
export interface _AuthorizationProviderCollection {
  /** Page values. */
  value?: AuthorizationProviderContract[];
  /** Next page link if any. */
  nextLink?: string;
}

export function _authorizationProviderCollectionDeserializer(
  item: any,
): _AuthorizationProviderCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : authorizationProviderContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authorizationProviderContractArraySerializer(
  result: Array<AuthorizationProviderContract>,
): any[] {
  return result.map((item) => {
    return authorizationProviderContractSerializer(item);
  });
}

export function authorizationProviderContractArrayDeserializer(
  result: Array<AuthorizationProviderContract>,
): any[] {
  return result.map((item) => {
    return authorizationProviderContractDeserializer(item);
  });
}

/** Authorization contract. */
export interface AuthorizationContract extends ProxyResource {
  /** Authorization type options */
  authorizationType?: AuthorizationType;
  /** OAuth2 grant type options */
  oAuth2GrantType?: OAuth2GrantType;
  /** Authorization parameters */
  parameters?: Record<string, string>;
  /** Authorization error details. */
  error?: AuthorizationError;
  /** Status of the Authorization */
  status?: string;
}

export function authorizationContractSerializer(item: AuthorizationContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "AuthorizationType",
      "OAuth2GrantType",
      "parameters",
      "error",
      "status",
    ])
      ? undefined
      : _authorizationContractPropertiesSerializer(item),
  };
}

export function authorizationContractDeserializer(item: any): AuthorizationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authorizationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Authorization details. */
export interface AuthorizationContractProperties {
  /** Authorization type options */
  authorizationType?: AuthorizationType;
  /** OAuth2 grant type options */
  oAuth2GrantType?: OAuth2GrantType;
  /** Authorization parameters */
  parameters?: Record<string, string>;
  /** Authorization error details. */
  error?: AuthorizationError;
  /** Status of the Authorization */
  status?: string;
}

export function authorizationContractPropertiesSerializer(
  item: AuthorizationContractProperties,
): any {
  return {
    authorizationType: item["authorizationType"],
    oauth2grantType: item["oAuth2GrantType"],
    parameters: item["parameters"],
    error: !item["error"] ? item["error"] : authorizationErrorSerializer(item["error"]),
    status: item["status"],
  };
}

export function authorizationContractPropertiesDeserializer(
  item: any,
): AuthorizationContractProperties {
  return {
    authorizationType: item["authorizationType"],
    oAuth2GrantType: item["oauth2grantType"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    error: !item["error"] ? item["error"] : authorizationErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Authorization type options */
export enum KnownAuthorizationType {
  /** OAuth2 authorization type */
  OAuth2 = "OAuth2",
}

/**
 * Authorization type options \
 * {@link KnownAuthorizationType} can be used interchangeably with AuthorizationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OAuth2**: OAuth2 authorization type
 */
export type AuthorizationType = string;

/** OAuth2 grant type options */
export enum KnownOAuth2GrantType {
  /** Authorization Code grant */
  AuthorizationCode = "AuthorizationCode",
  /** Client Credential grant */
  ClientCredentials = "ClientCredentials",
}

/**
 * OAuth2 grant type options \
 * {@link KnownOAuth2GrantType} can be used interchangeably with OAuth2GrantType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AuthorizationCode**: Authorization Code grant \
 * **ClientCredentials**: Client Credential grant
 */
export type OAuth2GrantType = string;

/** Authorization error details. */
export interface AuthorizationError {
  /** Error code */
  code?: string;
  /** Error message */
  message?: string;
}

export function authorizationErrorSerializer(item: AuthorizationError): any {
  return { code: item["code"], message: item["message"] };
}

export function authorizationErrorDeserializer(item: any): AuthorizationError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Paged Authorization list representation. */
export interface _AuthorizationCollection {
  /** Page values. */
  value?: AuthorizationContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _authorizationCollectionDeserializer(item: any): _AuthorizationCollection {
  return {
    value: !item["value"] ? item["value"] : authorizationContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function authorizationContractArraySerializer(result: Array<AuthorizationContract>): any[] {
  return result.map((item) => {
    return authorizationContractSerializer(item);
  });
}

export function authorizationContractArrayDeserializer(
  result: Array<AuthorizationContract>,
): any[] {
  return result.map((item) => {
    return authorizationContractDeserializer(item);
  });
}

/** Authorization confirm consent code request contract. */
export interface AuthorizationConfirmConsentCodeRequestContract {
  /** The consent code from the authorization server after authorizing and consenting. */
  consentCode?: string;
}

export function authorizationConfirmConsentCodeRequestContractSerializer(
  item: AuthorizationConfirmConsentCodeRequestContract,
): any {
  return { consentCode: item["consentCode"] };
}

/** Authorization login request contract. */
export interface AuthorizationLoginRequestContract {
  /** The redirect URL after login has completed. */
  postLoginRedirectUrl?: string;
}

export function authorizationLoginRequestContractSerializer(
  item: AuthorizationLoginRequestContract,
): any {
  return { postLoginRedirectUrl: item["postLoginRedirectUrl"] };
}

/** Authorization login response contract. */
export interface AuthorizationLoginResponseContract {
  /** The login link */
  loginLink?: string;
}

export function authorizationLoginResponseContractDeserializer(
  item: any,
): AuthorizationLoginResponseContract {
  return {
    loginLink: item["loginLink"],
  };
}

/** Authorization access policy contract. */
export interface AuthorizationAccessPolicyContract extends ProxyResource {
  /** The allowed Azure Active Directory Application IDs */
  appIds?: string[];
  /** The Tenant Id */
  tenantId?: string;
  /** The Object Id */
  objectId?: string;
}

export function authorizationAccessPolicyContractSerializer(
  item: AuthorizationAccessPolicyContract,
): any {
  return {
    properties: areAllPropsUndefined(item, ["appIds", "tenantId", "objectId"])
      ? undefined
      : _authorizationAccessPolicyContractPropertiesSerializer(item),
  };
}

export function authorizationAccessPolicyContractDeserializer(
  item: any,
): AuthorizationAccessPolicyContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authorizationAccessPolicyContractPropertiesDeserializer(item["properties"])),
  };
}

/** Authorization Access Policy details. */
export interface AuthorizationAccessPolicyContractProperties {
  /** The allowed Azure Active Directory Application IDs */
  appIds?: string[];
  /** The Tenant Id */
  tenantId?: string;
  /** The Object Id */
  objectId?: string;
}

export function authorizationAccessPolicyContractPropertiesSerializer(
  item: AuthorizationAccessPolicyContractProperties,
): any {
  return {
    appIds: !item["appIds"]
      ? item["appIds"]
      : item["appIds"].map((p: any) => {
          return p;
        }),
    tenantId: item["tenantId"],
    objectId: item["objectId"],
  };
}

export function authorizationAccessPolicyContractPropertiesDeserializer(
  item: any,
): AuthorizationAccessPolicyContractProperties {
  return {
    appIds: !item["appIds"]
      ? item["appIds"]
      : item["appIds"].map((p: any) => {
          return p;
        }),
    tenantId: item["tenantId"],
    objectId: item["objectId"],
  };
}

/** Paged Authorization Access Policy list representation. */
export interface _AuthorizationAccessPolicyCollection {
  /** Page values. */
  value?: AuthorizationAccessPolicyContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Paged Authorization Access Policy list representation. */
  nextLink?: string;
}

export function _authorizationAccessPolicyCollectionDeserializer(
  item: any,
): _AuthorizationAccessPolicyCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : authorizationAccessPolicyContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function authorizationAccessPolicyContractArraySerializer(
  result: Array<AuthorizationAccessPolicyContract>,
): any[] {
  return result.map((item) => {
    return authorizationAccessPolicyContractSerializer(item);
  });
}

export function authorizationAccessPolicyContractArrayDeserializer(
  result: Array<AuthorizationAccessPolicyContract>,
): any[] {
  return result.map((item) => {
    return authorizationAccessPolicyContractDeserializer(item);
  });
}

/** External OAuth authorization server settings. */
export interface AuthorizationServerContract extends ProxyResource {
  /** Description of the authorization server. Can contain HTML formatting tags. */
  description?: string;
  /** HTTP verbs supported by the authorization endpoint. GET must be always present. POST is optional. */
  authorizationMethods?: AuthorizationMethod[];
  /** Method of authentication supported by the token endpoint of this authorization server. Possible values are Basic and/or Body. When Body is specified, client credentials and other parameters are passed within the request body in the application/x-www-form-urlencoded format. */
  clientAuthenticationMethod?: ClientAuthenticationMethod[];
  /** Additional parameters required by the token endpoint of this authorization server represented as an array of JSON objects with name and value string properties, i.e. {"name" : "name value", "value": "a value"}. */
  tokenBodyParameters?: TokenBodyParameterContract[];
  /** OAuth token endpoint. Contains absolute URI to entity being referenced. */
  tokenEndpoint?: string;
  /** If true, authorization server will include state parameter from the authorization request to its response. Client may use state parameter to raise protocol security. */
  supportState?: boolean;
  /** Access token scope that is going to be requested by default. Can be overridden at the API level. Should be provided in the form of a string containing space-delimited values. */
  defaultScope?: string;
  /** Specifies the mechanism by which access token is passed to the API. */
  bearerTokenSendingMethods?: BearerTokenSendingMethod[];
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner username. */
  resourceOwnerUsername?: string;
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner password. */
  resourceOwnerPassword?: string;
  /** User-friendly authorization server name. */
  displayName?: string;
  /** If true, the authorization server may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the authorization server will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
  /** Optional reference to a page where client or app registration for this authorization server is performed. Contains absolute URL to entity being referenced. */
  clientRegistrationEndpoint?: string;
  /** OAuth authorization endpoint. See http://tools.ietf.org/html/rfc6749#section-3.2. */
  authorizationEndpoint?: string;
  /** Form of an authorization grant, which the client uses to request the access token. */
  grantTypes?: GrantType[];
  /** Client or app id registered with this authorization server. */
  clientId?: string;
  /** Client or app secret registered with this authorization server. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
}

export function authorizationServerContractSerializer(item: AuthorizationServerContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "authorizationMethods",
      "clientAuthenticationMethod",
      "tokenBodyParameters",
      "tokenEndpoint",
      "supportState",
      "defaultScope",
      "bearerTokenSendingMethods",
      "resourceOwnerUsername",
      "resourceOwnerPassword",
      "displayName",
      "useInTestConsole",
      "useInApiDocumentation",
      "clientRegistrationEndpoint",
      "authorizationEndpoint",
      "grantTypes",
      "clientId",
      "clientSecret",
    ])
      ? undefined
      : _authorizationServerContractPropertiesSerializer(item),
  };
}

export function authorizationServerContractDeserializer(item: any): AuthorizationServerContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authorizationServerContractPropertiesDeserializer(item["properties"])),
  };
}

/** External OAuth authorization server settings Properties. */
export interface AuthorizationServerContractProperties extends AuthorizationServerContractBaseProperties {
  /** User-friendly authorization server name. */
  displayName: string;
  /** If true, the authorization server may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the authorization server will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
  /** Optional reference to a page where client or app registration for this authorization server is performed. Contains absolute URL to entity being referenced. */
  clientRegistrationEndpoint: string;
  /** OAuth authorization endpoint. See http://tools.ietf.org/html/rfc6749#section-3.2. */
  authorizationEndpoint: string;
  /** Form of an authorization grant, which the client uses to request the access token. */
  grantTypes: GrantType[];
  /** Client or app id registered with this authorization server. */
  clientId: string;
  /** Client or app secret registered with this authorization server. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
}

export function authorizationServerContractPropertiesSerializer(
  item: AuthorizationServerContractProperties,
): any {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArraySerializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: item["grantTypes"].map((p: any) => {
      return p;
    }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

export function authorizationServerContractPropertiesDeserializer(
  item: any,
): AuthorizationServerContractProperties {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArrayDeserializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: item["grantTypes"].map((p: any) => {
      return p;
    }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

/** Known values of {@link GrantType} that the service accepts. */
export enum KnownGrantType {
  /** Authorization Code Grant flow as described https://tools.ietf.org/html/rfc6749#section-4.1. */
  AuthorizationCode = "authorizationCode",
  /** Implicit Code Grant flow as described https://tools.ietf.org/html/rfc6749#section-4.2. */
  Implicit = "implicit",
  /** Resource Owner Password Grant flow as described https://tools.ietf.org/html/rfc6749#section-4.3. */
  ResourceOwnerPassword = "resourceOwnerPassword",
  /** Client Credentials Grant flow as described https://tools.ietf.org/html/rfc6749#section-4.4. */
  ClientCredentials = "clientCredentials",
}

/** Type of GrantType */
export type GrantType = string;

/** External OAuth authorization server Update settings contract. */
export interface AuthorizationServerContractBaseProperties {
  /** Description of the authorization server. Can contain HTML formatting tags. */
  description?: string;
  /** HTTP verbs supported by the authorization endpoint. GET must be always present. POST is optional. */
  authorizationMethods?: AuthorizationMethod[];
  /** Method of authentication supported by the token endpoint of this authorization server. Possible values are Basic and/or Body. When Body is specified, client credentials and other parameters are passed within the request body in the application/x-www-form-urlencoded format. */
  clientAuthenticationMethod?: ClientAuthenticationMethod[];
  /** Additional parameters required by the token endpoint of this authorization server represented as an array of JSON objects with name and value string properties, i.e. {"name" : "name value", "value": "a value"}. */
  tokenBodyParameters?: TokenBodyParameterContract[];
  /** OAuth token endpoint. Contains absolute URI to entity being referenced. */
  tokenEndpoint?: string;
  /** If true, authorization server will include state parameter from the authorization request to its response. Client may use state parameter to raise protocol security. */
  supportState?: boolean;
  /** Access token scope that is going to be requested by default. Can be overridden at the API level. Should be provided in the form of a string containing space-delimited values. */
  defaultScope?: string;
  /** Specifies the mechanism by which access token is passed to the API. */
  bearerTokenSendingMethods?: BearerTokenSendingMethod[];
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner username. */
  resourceOwnerUsername?: string;
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner password. */
  resourceOwnerPassword?: string;
}

export function authorizationServerContractBasePropertiesSerializer(
  item: AuthorizationServerContractBaseProperties,
): any {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArraySerializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
  };
}

export function authorizationServerContractBasePropertiesDeserializer(
  item: any,
): AuthorizationServerContractBaseProperties {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArrayDeserializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
  };
}

/** Type of AuthorizationMethod */
export type AuthorizationMethod =
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

/** Known values of {@link ClientAuthenticationMethod} that the service accepts. */
export enum KnownClientAuthenticationMethod {
  /** Basic Client Authentication method. */
  Basic = "Basic",
  /** Body based Authentication method. */
  Body = "Body",
}

/** Type of ClientAuthenticationMethod */
export type ClientAuthenticationMethod = string;

export function tokenBodyParameterContractArraySerializer(
  result: Array<TokenBodyParameterContract>,
): any[] {
  return result.map((item) => {
    return tokenBodyParameterContractSerializer(item);
  });
}

export function tokenBodyParameterContractArrayDeserializer(
  result: Array<TokenBodyParameterContract>,
): any[] {
  return result.map((item) => {
    return tokenBodyParameterContractDeserializer(item);
  });
}

/** OAuth acquire token request body parameter (www-url-form-encoded). */
export interface TokenBodyParameterContract {
  /** body parameter name. */
  name: string;
  /** body parameter value. */
  value: string;
}

export function tokenBodyParameterContractSerializer(item: TokenBodyParameterContract): any {
  return { name: item["name"], value: item["value"] };
}

export function tokenBodyParameterContractDeserializer(item: any): TokenBodyParameterContract {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Known values of {@link BearerTokenSendingMethod} that the service accepts. */
export enum KnownBearerTokenSendingMethod {
  /** authorizationHeader */
  AuthorizationHeader = "authorizationHeader",
  /** query */
  Query = "query",
}

/** Type of BearerTokenSendingMethod */
export type BearerTokenSendingMethod = string;

/** External OAuth authorization server settings. */
export interface AuthorizationServerUpdateContract extends ProxyResource {
  /** Description of the authorization server. Can contain HTML formatting tags. */
  description?: string;
  /** HTTP verbs supported by the authorization endpoint. GET must be always present. POST is optional. */
  authorizationMethods?: AuthorizationMethod[];
  /** Method of authentication supported by the token endpoint of this authorization server. Possible values are Basic and/or Body. When Body is specified, client credentials and other parameters are passed within the request body in the application/x-www-form-urlencoded format. */
  clientAuthenticationMethod?: ClientAuthenticationMethod[];
  /** Additional parameters required by the token endpoint of this authorization server represented as an array of JSON objects with name and value string properties, i.e. {"name" : "name value", "value": "a value"}. */
  tokenBodyParameters?: TokenBodyParameterContract[];
  /** OAuth token endpoint. Contains absolute URI to entity being referenced. */
  tokenEndpoint?: string;
  /** If true, authorization server will include state parameter from the authorization request to its response. Client may use state parameter to raise protocol security. */
  supportState?: boolean;
  /** Access token scope that is going to be requested by default. Can be overridden at the API level. Should be provided in the form of a string containing space-delimited values. */
  defaultScope?: string;
  /** Specifies the mechanism by which access token is passed to the API. */
  bearerTokenSendingMethods?: BearerTokenSendingMethod[];
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner username. */
  resourceOwnerUsername?: string;
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner password. */
  resourceOwnerPassword?: string;
  /** User-friendly authorization server name. */
  displayName?: string;
  /** If true, the authorization server may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the authorization server will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
  /** Optional reference to a page where client or app registration for this authorization server is performed. Contains absolute URL to entity being referenced. */
  clientRegistrationEndpoint?: string;
  /** OAuth authorization endpoint. See http://tools.ietf.org/html/rfc6749#section-3.2. */
  authorizationEndpoint?: string;
  /** Form of an authorization grant, which the client uses to request the access token. */
  grantTypes?: GrantType[];
  /** Client or app id registered with this authorization server. */
  clientId?: string;
  /** Client or app secret registered with this authorization server. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
}

export function authorizationServerUpdateContractSerializer(
  item: AuthorizationServerUpdateContract,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "authorizationMethods",
      "clientAuthenticationMethod",
      "tokenBodyParameters",
      "tokenEndpoint",
      "supportState",
      "defaultScope",
      "bearerTokenSendingMethods",
      "resourceOwnerUsername",
      "resourceOwnerPassword",
      "displayName",
      "useInTestConsole",
      "useInApiDocumentation",
      "clientRegistrationEndpoint",
      "authorizationEndpoint",
      "grantTypes",
      "clientId",
      "clientSecret",
    ])
      ? undefined
      : _authorizationServerUpdateContractPropertiesSerializer(item),
  };
}

/** External OAuth authorization server Update settings contract. */
export interface AuthorizationServerUpdateContractProperties extends AuthorizationServerContractBaseProperties {
  /** User-friendly authorization server name. */
  displayName?: string;
  /** If true, the authorization server may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the authorization server will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
  /** Optional reference to a page where client or app registration for this authorization server is performed. Contains absolute URL to entity being referenced. */
  clientRegistrationEndpoint?: string;
  /** OAuth authorization endpoint. See http://tools.ietf.org/html/rfc6749#section-3.2. */
  authorizationEndpoint?: string;
  /** Form of an authorization grant, which the client uses to request the access token. */
  grantTypes?: GrantType[];
  /** Client or app id registered with this authorization server. */
  clientId?: string;
  /** Client or app secret registered with this authorization server. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
}

export function authorizationServerUpdateContractPropertiesSerializer(
  item: AuthorizationServerUpdateContractProperties,
): any {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArraySerializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : item["grantTypes"].map((p: any) => {
          return p;
        }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

/** Paged OAuth2 Authorization Servers list representation. */
export interface _AuthorizationServerCollection {
  /** Page values. */
  value?: AuthorizationServerContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _authorizationServerCollectionDeserializer(
  item: any,
): _AuthorizationServerCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : authorizationServerContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function authorizationServerContractArraySerializer(
  result: Array<AuthorizationServerContract>,
): any[] {
  return result.map((item) => {
    return authorizationServerContractSerializer(item);
  });
}

export function authorizationServerContractArrayDeserializer(
  result: Array<AuthorizationServerContract>,
): any[] {
  return result.map((item) => {
    return authorizationServerContractDeserializer(item);
  });
}

/** OAuth Server Secrets Contract. */
export interface AuthorizationServerSecretsContract {
  /** oAuth Authorization Server Secrets. */
  clientSecret?: string;
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner username. */
  resourceOwnerUsername?: string;
  /** Can be optionally specified when resource owner password grant type is supported by this authorization server. Default resource owner password. */
  resourceOwnerPassword?: string;
}

export function authorizationServerSecretsContractDeserializer(
  item: any,
): AuthorizationServerSecretsContract {
  return {
    clientSecret: item["clientSecret"],
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
  };
}

/** Reconnect request parameters. */
export interface BackendReconnectContract extends ProxyResource {
  /** Duration in ISO8601 format after which reconnect will be initiated. Minimum duration of the Reconnect is PT2M. */
  after?: string;
}

export function backendReconnectContractSerializer(item: BackendReconnectContract): any {
  return {
    properties: areAllPropsUndefined(item, ["after"])
      ? undefined
      : _backendReconnectContractPropertiesSerializer(item),
  };
}

/** Properties to control reconnect requests. */
export interface BackendReconnectProperties {
  /** Duration in ISO8601 format after which reconnect will be initiated. Minimum duration of the Reconnect is PT2M. */
  after?: string;
}

export function backendReconnectPropertiesSerializer(item: BackendReconnectProperties): any {
  return { after: item["after"] };
}

/** Cache details. */
export interface CacheContract extends ProxyResource {
  /** Cache description */
  description?: string;
  /** Runtime connection string to cache */
  connectionString?: string;
  /** Location identifier to use cache from (should be either 'default' or valid Azure region identifier) */
  useFromLocation?: string;
  /** Original uri of entity in external system cache points to */
  resourceId?: string;
}

export function cacheContractSerializer(item: CacheContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "connectionString",
      "useFromLocation",
      "resourceId",
    ])
      ? undefined
      : _cacheContractPropertiesSerializer(item),
  };
}

export function cacheContractDeserializer(item: any): CacheContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cacheContractPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Cache contract. */
export interface CacheContractProperties {
  /** Cache description */
  description?: string;
  /** Runtime connection string to cache */
  connectionString: string;
  /** Location identifier to use cache from (should be either 'default' or valid Azure region identifier) */
  useFromLocation: string;
  /** Original uri of entity in external system cache points to */
  resourceId?: string;
}

export function cacheContractPropertiesSerializer(item: CacheContractProperties): any {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

export function cacheContractPropertiesDeserializer(item: any): CacheContractProperties {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

/** Cache update details. */
export interface CacheUpdateParameters {
  /** Cache description */
  description?: string;
  /** Runtime connection string to cache */
  connectionString?: string;
  /** Location identifier to use cache from (should be either 'default' or valid Azure region identifier) */
  useFromLocation?: string;
  /** Original uri of entity in external system cache points to */
  resourceId?: string;
}

export function cacheUpdateParametersSerializer(item: CacheUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "connectionString",
      "useFromLocation",
      "resourceId",
    ])
      ? undefined
      : _cacheUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Cache operation. */
export interface CacheUpdateProperties {
  /** Cache description */
  description?: string;
  /** Runtime connection string to cache */
  connectionString?: string;
  /** Location identifier to use cache from (should be either 'default' or valid Azure region identifier) */
  useFromLocation?: string;
  /** Original uri of entity in external system cache points to */
  resourceId?: string;
}

export function cacheUpdatePropertiesSerializer(item: CacheUpdateProperties): any {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

/** Paged Caches list representation. */
export interface _CacheCollection {
  /** Page values. */
  value?: CacheContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _cacheCollectionDeserializer(item: any): _CacheCollection {
  return {
    value: !item["value"] ? item["value"] : cacheContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function cacheContractArraySerializer(result: Array<CacheContract>): any[] {
  return result.map((item) => {
    return cacheContractSerializer(item);
  });
}

export function cacheContractArrayDeserializer(result: Array<CacheContract>): any[] {
  return result.map((item) => {
    return cacheContractDeserializer(item);
  });
}

/** Content type contract details. */
export interface ContentTypeContract extends ProxyResource {
  /** Content type identifier */
  idPropertiesId?: string;
  /** Content type name. Must be 1 to 250 characters long. */
  namePropertiesName?: string;
  /** Content type description. */
  description?: string;
  /** Content type schema. */
  schema?: any;
  /** Content type version. */
  version?: string;
}

export function contentTypeContractSerializer(item: ContentTypeContract): any {
  return {
    properties: areAllPropsUndefined(item, ["id", "name", "description", "schema", "version"])
      ? undefined
      : _contentTypeContractPropertiesSerializer(item),
  };
}

export function contentTypeContractDeserializer(item: any): ContentTypeContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _contentTypeContractPropertiesDeserializer(item["properties"])),
  };
}

/** model interface ContentTypeContractProperties */
export interface ContentTypeContractProperties {
  /** Content type identifier */
  id?: string;
  /** Content type name. Must be 1 to 250 characters long. */
  name?: string;
  /** Content type description. */
  description?: string;
  /** Content type schema. */
  schema?: any;
  /** Content type version. */
  version?: string;
}

export function contentTypeContractPropertiesSerializer(item: ContentTypeContractProperties): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    schema: item["schema"],
    version: item["version"],
  };
}

export function contentTypeContractPropertiesDeserializer(
  item: any,
): ContentTypeContractProperties {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    schema: item["schema"],
    version: item["version"],
  };
}

/** Paged list of content types. */
export interface _ContentTypeCollection {
  /** Collection of content items. */
  readonly value?: ContentTypeContract[];
  /** Next page link, if any. */
  readonly nextLink?: string;
}

export function _contentTypeCollectionDeserializer(item: any): _ContentTypeCollection {
  return {
    value: !item["value"] ? item["value"] : contentTypeContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function contentTypeContractArraySerializer(result: Array<ContentTypeContract>): any[] {
  return result.map((item) => {
    return contentTypeContractSerializer(item);
  });
}

export function contentTypeContractArrayDeserializer(result: Array<ContentTypeContract>): any[] {
  return result.map((item) => {
    return contentTypeContractDeserializer(item);
  });
}

/** Content type contract details. */
export interface ContentItemContract extends ProxyResource {
  /** Properties of the content item. */
  properties?: Record<string, any>;
}

export function contentItemContractSerializer(item: ContentItemContract): any {
  return { properties: item["properties"] };
}

export function contentItemContractDeserializer(item: any): ContentItemContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Paged list of content items. */
export interface _ContentItemCollection {
  /** Collection of content items. */
  readonly value?: ContentItemContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _contentItemCollectionDeserializer(item: any): _ContentItemCollection {
  return {
    value: !item["value"] ? item["value"] : contentItemContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function contentItemContractArraySerializer(result: Array<ContentItemContract>): any[] {
  return result.map((item) => {
    return contentItemContractSerializer(item);
  });
}

export function contentItemContractArrayDeserializer(result: Array<ContentItemContract>): any[] {
  return result.map((item) => {
    return contentItemContractDeserializer(item);
  });
}

/** Deleted API Management Service information. */
export interface DeletedServiceContract extends ProxyResource {
  /** API Management Service Master Location. */
  readonly location?: string;
  /** Fully-qualified API Management Service Resource ID */
  serviceId?: string;
  /** UTC Date and Time when the service will be automatically purged. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  scheduledPurgeDate?: Date;
  /** UTC Timestamp when the service was soft-deleted. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  deletionDate?: Date;
}

export function deletedServiceContractDeserializer(item: any): DeletedServiceContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deletedServiceContractPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** model interface DeletedServiceContractProperties */
export interface DeletedServiceContractProperties {
  /** Fully-qualified API Management Service Resource ID */
  serviceId?: string;
  /** UTC Date and Time when the service will be automatically purged. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  scheduledPurgeDate?: Date;
  /** UTC Timestamp when the service was soft-deleted. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  deletionDate?: Date;
}

export function deletedServiceContractPropertiesDeserializer(
  item: any,
): DeletedServiceContractProperties {
  return {
    serviceId: item["serviceId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
  };
}

/** Paged deleted API Management Services List Representation. */
export interface _DeletedServicesCollection {
  /** Page values. */
  readonly value?: DeletedServiceContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _deletedServicesCollectionDeserializer(item: any): _DeletedServicesCollection {
  return {
    value: !item["value"] ? item["value"] : deletedServiceContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedServiceContractArrayDeserializer(
  result: Array<DeletedServiceContract>,
): any[] {
  return result.map((item) => {
    return deletedServiceContractDeserializer(item);
  });
}

/** Markdown documentation details. */
export interface DocumentationContract extends ProxyResource {
  /** documentation title. */
  title?: string;
  /** Markdown documentation content. */
  content?: string;
}

export function documentationContractSerializer(item: DocumentationContract): any {
  return {
    properties: areAllPropsUndefined(item, ["title", "content"])
      ? undefined
      : _documentationContractPropertiesSerializer(item),
  };
}

export function documentationContractDeserializer(item: any): DocumentationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _documentationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Markdown documentation details. */
export interface DocumentationContractProperties {
  /** documentation title. */
  title?: string;
  /** Markdown documentation content. */
  content?: string;
}

export function documentationContractPropertiesSerializer(
  item: DocumentationContractProperties,
): any {
  return { title: item["title"], content: item["content"] };
}

export function documentationContractPropertiesDeserializer(
  item: any,
): DocumentationContractProperties {
  return {
    title: item["title"],
    content: item["content"],
  };
}

/** Documentation update contract details. */
export interface DocumentationUpdateContract {
  /** documentation title. */
  title?: string;
  /** Markdown documentation content. */
  content?: string;
}

export function documentationUpdateContractSerializer(item: DocumentationUpdateContract): any {
  return {
    properties: areAllPropsUndefined(item, ["title", "content"])
      ? undefined
      : _documentationUpdateContractPropertiesSerializer(item),
  };
}

/** Paged Documentation list representation. */
export interface _DocumentationCollection {
  /** Page values. */
  readonly value?: DocumentationContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _documentationCollectionDeserializer(item: any): _DocumentationCollection {
  return {
    value: !item["value"] ? item["value"] : documentationContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function documentationContractArraySerializer(result: Array<DocumentationContract>): any[] {
  return result.map((item) => {
    return documentationContractSerializer(item);
  });
}

export function documentationContractArrayDeserializer(
  result: Array<DocumentationContract>,
): any[] {
  return result.map((item) => {
    return documentationContractDeserializer(item);
  });
}

/** Email Template details. */
export interface EmailTemplateContract extends ProxyResource {
  /** Subject of the Template. */
  subject?: string;
  /** Email Template Body. This should be a valid XDocument */
  body?: string;
  /** Title of the Template. */
  title?: string;
  /** Description of the Email Template. */
  description?: string;
  /** Whether the template is the default template provided by API Management or has been edited. */
  readonly isDefault?: boolean;
  /** Email Template Parameter values. */
  parameters?: EmailTemplateParametersContractProperties[];
}

export function emailTemplateContractDeserializer(item: any): EmailTemplateContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _emailTemplateContractPropertiesDeserializer(item["properties"])),
  };
}

/** Email Template Contract properties. */
export interface EmailTemplateContractProperties {
  /** Subject of the Template. */
  subject: string;
  /** Email Template Body. This should be a valid XDocument */
  body: string;
  /** Title of the Template. */
  title?: string;
  /** Description of the Email Template. */
  description?: string;
  /** Whether the template is the default template provided by API Management or has been edited. */
  readonly isDefault?: boolean;
  /** Email Template Parameter values. */
  parameters?: EmailTemplateParametersContractProperties[];
}

export function emailTemplateContractPropertiesDeserializer(
  item: any,
): EmailTemplateContractProperties {
  return {
    subject: item["subject"],
    body: item["body"],
    title: item["title"],
    description: item["description"],
    isDefault: item["isDefault"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emailTemplateParametersContractPropertiesArrayDeserializer(item["parameters"]),
  };
}

export function emailTemplateParametersContractPropertiesArraySerializer(
  result: Array<EmailTemplateParametersContractProperties>,
): any[] {
  return result.map((item) => {
    return emailTemplateParametersContractPropertiesSerializer(item);
  });
}

export function emailTemplateParametersContractPropertiesArrayDeserializer(
  result: Array<EmailTemplateParametersContractProperties>,
): any[] {
  return result.map((item) => {
    return emailTemplateParametersContractPropertiesDeserializer(item);
  });
}

/** Email Template Parameter contract. */
export interface EmailTemplateParametersContractProperties {
  /** Template parameter name. */
  name?: string;
  /** Template parameter title. */
  title?: string;
  /** Template parameter description. */
  description?: string;
}

export function emailTemplateParametersContractPropertiesSerializer(
  item: EmailTemplateParametersContractProperties,
): any {
  return { name: item["name"], title: item["title"], description: item["description"] };
}

export function emailTemplateParametersContractPropertiesDeserializer(
  item: any,
): EmailTemplateParametersContractProperties {
  return {
    name: item["name"],
    title: item["title"],
    description: item["description"],
  };
}

/** Known values of {@link TemplateName} that the service accepts. */
export enum KnownTemplateName {
  /** applicationApprovedNotificationMessage */
  ApplicationApprovedNotificationMessage = "applicationApprovedNotificationMessage",
  /** accountClosedDeveloper */
  AccountClosedDeveloper = "accountClosedDeveloper",
  /** quotaLimitApproachingDeveloperNotificationMessage */
  QuotaLimitApproachingDeveloperNotificationMessage = "quotaLimitApproachingDeveloperNotificationMessage",
  /** newDeveloperNotificationMessage */
  NewDeveloperNotificationMessage = "newDeveloperNotificationMessage",
  /** emailChangeIdentityDefault */
  EmailChangeIdentityDefault = "emailChangeIdentityDefault",
  /** inviteUserNotificationMessage */
  InviteUserNotificationMessage = "inviteUserNotificationMessage",
  /** newCommentNotificationMessage */
  NewCommentNotificationMessage = "newCommentNotificationMessage",
  /** confirmSignUpIdentityDefault */
  ConfirmSignUpIdentityDefault = "confirmSignUpIdentityDefault",
  /** newIssueNotificationMessage */
  NewIssueNotificationMessage = "newIssueNotificationMessage",
  /** purchaseDeveloperNotificationMessage */
  PurchaseDeveloperNotificationMessage = "purchaseDeveloperNotificationMessage",
  /** passwordResetIdentityDefault */
  PasswordResetIdentityDefault = "passwordResetIdentityDefault",
  /** passwordResetByAdminNotificationMessage */
  PasswordResetByAdminNotificationMessage = "passwordResetByAdminNotificationMessage",
  /** rejectDeveloperNotificationMessage */
  RejectDeveloperNotificationMessage = "rejectDeveloperNotificationMessage",
  /** requestDeveloperNotificationMessage */
  RequestDeveloperNotificationMessage = "requestDeveloperNotificationMessage",
}

/** Type of TemplateName */
export type TemplateName = string;

/** Email Template update Parameters. */
export interface EmailTemplateUpdateParameters {
  /** Subject of the Template. */
  subject?: string;
  /** Title of the Template. */
  title?: string;
  /** Description of the Email Template. */
  description?: string;
  /** Email Template Body. This should be a valid XDocument */
  body?: string;
  /** Email Template Parameter values. */
  parameters?: EmailTemplateParametersContractProperties[];
}

export function emailTemplateUpdateParametersSerializer(item: EmailTemplateUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "subject",
      "title",
      "description",
      "body",
      "parameters",
    ])
      ? undefined
      : _emailTemplateUpdateParametersPropertiesSerializer(item),
  };
}

/** Email Template Update Contract properties. */
export interface EmailTemplateUpdateParameterProperties {
  /** Subject of the Template. */
  subject?: string;
  /** Title of the Template. */
  title?: string;
  /** Description of the Email Template. */
  description?: string;
  /** Email Template Body. This should be a valid XDocument */
  body?: string;
  /** Email Template Parameter values. */
  parameters?: EmailTemplateParametersContractProperties[];
}

export function emailTemplateUpdateParameterPropertiesSerializer(
  item: EmailTemplateUpdateParameterProperties,
): any {
  return {
    subject: item["subject"],
    title: item["title"],
    description: item["description"],
    body: item["body"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emailTemplateParametersContractPropertiesArraySerializer(item["parameters"]),
  };
}

/** Paged email template list representation. */
export interface _EmailTemplateCollection {
  /** Page values. */
  value?: EmailTemplateContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _emailTemplateCollectionDeserializer(item: any): _EmailTemplateCollection {
  return {
    value: !item["value"] ? item["value"] : emailTemplateContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function emailTemplateContractArrayDeserializer(
  result: Array<EmailTemplateContract>,
): any[] {
  return result.map((item) => {
    return emailTemplateContractDeserializer(item);
  });
}

/** A single API Management gateway resource in List or Get response. */
export interface ApiManagementGatewayConfigConnectionResource extends ProxyResource {
  /** ETag of the resource. */
  readonly etag?: string;
  /** The current provisioning state of the API Management gateway config connection */
  readonly provisioningState?: string;
  /** The link to the API Management service workspace. */
  sourceId?: string;
  /** The default hostname of the data-plane gateway. */
  readonly defaultHostname?: string;
  /** The hostnames of the data-plane gateway to which requests can be sent. */
  hostnames?: string[];
}

export function apiManagementGatewayConfigConnectionResourceSerializer(
  item: ApiManagementGatewayConfigConnectionResource,
): any {
  return { properties: _apiManagementGatewayConfigConnectionResourcePropertiesSerializer(item) };
}

export function apiManagementGatewayConfigConnectionResourceDeserializer(
  item: any,
): ApiManagementGatewayConfigConnectionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._apiManagementGatewayConfigConnectionResourcePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** model interface GatewayConfigConnectionBaseProperties */
export interface GatewayConfigConnectionBaseProperties {
  /** The current provisioning state of the API Management gateway config connection */
  readonly provisioningState?: string;
  /** The link to the API Management service workspace. */
  sourceId?: string;
  /** The default hostname of the data-plane gateway. */
  readonly defaultHostname?: string;
  /** The hostnames of the data-plane gateway to which requests can be sent. */
  hostnames?: string[];
}

export function gatewayConfigConnectionBasePropertiesSerializer(
  item: GatewayConfigConnectionBaseProperties,
): any {
  return {
    sourceId: item["sourceId"],
    hostnames: !item["hostnames"]
      ? item["hostnames"]
      : item["hostnames"].map((p: any) => {
          return p;
        }),
  };
}

export function gatewayConfigConnectionBasePropertiesDeserializer(
  item: any,
): GatewayConfigConnectionBaseProperties {
  return {
    provisioningState: item["provisioningState"],
    sourceId: item["sourceId"],
    defaultHostname: item["defaultHostname"],
    hostnames: !item["hostnames"]
      ? item["hostnames"]
      : item["hostnames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of the List API Management gateway operation. */
export interface _ApiManagementGatewayConfigConnectionListResult {
  /** Result of the List API Management gateway config connection operation. */
  value: ApiManagementGatewayConfigConnectionResource[];
  /** Link to the next set of results. Not empty if Value contains incomplete list of API Management services. */
  nextLink?: string;
}

export function _apiManagementGatewayConfigConnectionListResultDeserializer(
  item: any,
): _ApiManagementGatewayConfigConnectionListResult {
  return {
    value: apiManagementGatewayConfigConnectionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiManagementGatewayConfigConnectionResourceArraySerializer(
  result: Array<ApiManagementGatewayConfigConnectionResource>,
): any[] {
  return result.map((item) => {
    return apiManagementGatewayConfigConnectionResourceSerializer(item);
  });
}

export function apiManagementGatewayConfigConnectionResourceArrayDeserializer(
  result: Array<ApiManagementGatewayConfigConnectionResource>,
): any[] {
  return result.map((item) => {
    return apiManagementGatewayConfigConnectionResourceDeserializer(item);
  });
}

/** A single API Management gateway hostname binding resource in List or Get response. */
export interface GatewayHostnameBindingResource extends ProxyResource {
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** The current provisioning state of the API Management gateway hostname binding. */
  readonly provisioningState?: string;
  /** The default hostname of the data-plane gateway. */
  hostname: string;
  /** The link to the API Management service workspace. */
  keyVault: GatewayHostnameBindingKeyVault;
  /** The hostnames of the data-plane gateway to which requests can be sent. */
  readonly certificate?: GatewayHostnameBindingCertificate;
}

export function gatewayHostnameBindingResourceSerializer(
  item: GatewayHostnameBindingResource,
): any {
  return { properties: _gatewayHostnameBindingResourcePropertiesSerializer(item) };
}

export function gatewayHostnameBindingResourceDeserializer(
  item: any,
): GatewayHostnameBindingResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._gatewayHostnameBindingResourcePropertiesDeserializer(item["properties"]),
    eTag: item["etag"],
  };
}

/** model interface GatewayHostnameBindingBaseProperties */
export interface GatewayHostnameBindingBaseProperties {
  /** The current provisioning state of the API Management gateway hostname binding. */
  readonly provisioningState?: string;
  /** The default hostname of the data-plane gateway. */
  hostname: string;
  /** The link to the API Management service workspace. */
  keyVault: GatewayHostnameBindingKeyVault;
  /** The hostnames of the data-plane gateway to which requests can be sent. */
  readonly certificate?: GatewayHostnameBindingCertificate;
}

export function gatewayHostnameBindingBasePropertiesSerializer(
  item: GatewayHostnameBindingBaseProperties,
): any {
  return {
    hostname: item["hostname"],
    keyVault: gatewayHostnameBindingKeyVaultSerializer(item["keyVault"]),
  };
}

export function gatewayHostnameBindingBasePropertiesDeserializer(
  item: any,
): GatewayHostnameBindingBaseProperties {
  return {
    provisioningState: item["provisioningState"],
    hostname: item["hostname"],
    keyVault: gatewayHostnameBindingKeyVaultDeserializer(item["keyVault"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : gatewayHostnameBindingCertificateDeserializer(item["certificate"]),
  };
}

/** model interface GatewayHostnameBindingKeyVault */
export interface GatewayHostnameBindingKeyVault {
  /** The current provisioning state of the API Management gateway hostname binding. */
  secretId: string;
  /** The default hostname of the data-plane gateway. */
  identityClientId?: string;
  /** The last status of the Key Vault certificate fetch process. */
  lastStatus?: GatewayHostnameBindingKeyVaultLastStatus;
}

export function gatewayHostnameBindingKeyVaultSerializer(
  item: GatewayHostnameBindingKeyVault,
): any {
  return {
    secretId: item["secretId"],
    identityClientId: item["identityClientId"],
    lastStatus: !item["lastStatus"]
      ? item["lastStatus"]
      : gatewayHostnameBindingKeyVaultLastStatusSerializer(item["lastStatus"]),
  };
}

export function gatewayHostnameBindingKeyVaultDeserializer(
  item: any,
): GatewayHostnameBindingKeyVault {
  return {
    secretId: item["secretId"],
    identityClientId: item["identityClientId"],
    lastStatus: !item["lastStatus"]
      ? item["lastStatus"]
      : gatewayHostnameBindingKeyVaultLastStatusDeserializer(item["lastStatus"]),
  };
}

/** model interface GatewayHostnameBindingKeyVaultLastStatus */
export interface GatewayHostnameBindingKeyVaultLastStatus {
  /** The last status of the Key Vault certificate fetch process. */
  readonly code?: KeyVaultFetchCode;
  /** The last time the Key Vault certificate fetch process was attempted. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly timeStampUtc?: Date;
  /** The last time the Key Vault certificate fetch process was successful. Only when the fetch process has succeeded at least once and current state is failed.  The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  readonly lastSuccessTimeStampUtc?: Date;
}

export function gatewayHostnameBindingKeyVaultLastStatusSerializer(
  item: GatewayHostnameBindingKeyVaultLastStatus,
): any {
  return item;
}

export function gatewayHostnameBindingKeyVaultLastStatusDeserializer(
  item: any,
): GatewayHostnameBindingKeyVaultLastStatus {
  return {
    code: item["code"],
    timeStampUtc: !item["timeStampUtc"] ? item["timeStampUtc"] : new Date(item["timeStampUtc"]),
    lastSuccessTimeStampUtc: !item["lastSuccessTimeStampUtc"]
      ? item["lastSuccessTimeStampUtc"]
      : new Date(item["lastSuccessTimeStampUtc"]),
  };
}

/** The last status of the Key Vault certificate fetch process. */
export type KeyVaultFetchCode = "Success" | "Failed";

/** model interface GatewayHostnameBindingCertificate */
export interface GatewayHostnameBindingCertificate {
  /** The thumbprint of the certificate. */
  readonly thumbprint?: string;
  /** The subject of the certificate. */
  readonly subject?: string;
  /** The expiration date of the certificate. */
  readonly expiry?: Date;
}

export function gatewayHostnameBindingCertificateDeserializer(
  item: any,
): GatewayHostnameBindingCertificate {
  return {
    thumbprint: item["thumbprint"],
    subject: item["subject"],
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
  };
}

/** The response of the List API Management gateway hostname binding operation. */
export interface _GatewayHostnameBindingListResult {
  /** Result of the List API Management gateway hostname binding operation. */
  value: GatewayHostnameBindingResource[];
  /** Link to the next set of results. Not empty if Value contains incomplete list of API Management gateway hostname bindings. */
  nextLink?: string;
}

export function _gatewayHostnameBindingListResultDeserializer(
  item: any,
): _GatewayHostnameBindingListResult {
  return {
    value: gatewayHostnameBindingResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayHostnameBindingResourceArraySerializer(
  result: Array<GatewayHostnameBindingResource>,
): any[] {
  return result.map((item) => {
    return gatewayHostnameBindingResourceSerializer(item);
  });
}

export function gatewayHostnameBindingResourceArrayDeserializer(
  result: Array<GatewayHostnameBindingResource>,
): any[] {
  return result.map((item) => {
    return gatewayHostnameBindingResourceDeserializer(item);
  });
}

/** Gateway details. */
export interface GatewayContract extends ProxyResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Gateway location. */
  locationData?: ResourceLocationDataContract;
  /** Gateway description */
  description?: string;
}

export function gatewayContractSerializer(item: GatewayContract): any {
  return {
    properties: areAllPropsUndefined(item, ["locationData", "description"])
      ? undefined
      : _gatewayContractPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function gatewayContractDeserializer(item: any): GatewayContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gatewayContractPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the Gateway contract. */
export interface GatewayContractProperties {
  /** Gateway location. */
  locationData?: ResourceLocationDataContract;
  /** Gateway description */
  description?: string;
}

export function gatewayContractPropertiesSerializer(item: GatewayContractProperties): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : resourceLocationDataContractSerializer(item["locationData"]),
    description: item["description"],
  };
}

export function gatewayContractPropertiesDeserializer(item: any): GatewayContractProperties {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : resourceLocationDataContractDeserializer(item["locationData"]),
    description: item["description"],
  };
}

/** Resource location data properties. */
export interface ResourceLocationDataContract {
  /** A canonical name for the geographic or physical location. */
  name: string;
  /** The city or locality where the resource is located. */
  city?: string;
  /** The district, state, or province where the resource is located. */
  district?: string;
  /** The country or region where the resource is located. */
  countryOrRegion?: string;
}

export function resourceLocationDataContractSerializer(item: ResourceLocationDataContract): any {
  return {
    name: item["name"],
    city: item["city"],
    district: item["district"],
    countryOrRegion: item["countryOrRegion"],
  };
}

export function resourceLocationDataContractDeserializer(item: any): ResourceLocationDataContract {
  return {
    name: item["name"],
    city: item["city"],
    district: item["district"],
    countryOrRegion: item["countryOrRegion"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Paged Gateway list representation. */
export interface _GatewayCollection {
  /** Page values. */
  readonly value?: GatewayContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _gatewayCollectionDeserializer(item: any): _GatewayCollection {
  return {
    value: !item["value"] ? item["value"] : gatewayContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function gatewayContractArraySerializer(result: Array<GatewayContract>): any[] {
  return result.map((item) => {
    return gatewayContractSerializer(item);
  });
}

export function gatewayContractArrayDeserializer(result: Array<GatewayContract>): any[] {
  return result.map((item) => {
    return gatewayContractDeserializer(item);
  });
}

/** Gateway authentication keys. */
export interface GatewayKeysContract {
  /** Primary gateway key. */
  primary?: string;
  /** Secondary gateway key. */
  secondary?: string;
}

export function gatewayKeysContractDeserializer(item: any): GatewayKeysContract {
  return {
    primary: item["primary"],
    secondary: item["secondary"],
  };
}

/** Gateway key regeneration request contract properties. */
export interface GatewayKeyRegenerationRequestContract {
  /** The Key being regenerated. */
  keyType: KeyType;
}

export function gatewayKeyRegenerationRequestContractSerializer(
  item: GatewayKeyRegenerationRequestContract,
): any {
  return { keyType: item["keyType"] };
}

/** The Key to be used to generate token for user. */
export type KeyType = "primary" | "secondary";

/** Gateway token request contract properties. */
export interface GatewayTokenRequestContract {
  /** The Key to be used to generate gateway token. */
  keyType: KeyType;
  /** The Expiry time of the Token. Maximum token expiry time is set to 30 days. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expiry: Date;
}

export function gatewayTokenRequestContractSerializer(item: GatewayTokenRequestContract): any {
  return { keyType: item["keyType"], expiry: item["expiry"].toISOString() };
}

/** Gateway access token. */
export interface GatewayTokenContract {
  /** Shared Access Authentication token value for the Gateway. */
  value?: string;
}

export function gatewayTokenContractDeserializer(item: any): GatewayTokenContract {
  return {
    value: item["value"],
  };
}

/** List debug credentials properties. */
export interface GatewayListDebugCredentialsContract {
  /** Credentials expiration in ISO8601 format. Maximum duration of the credentials is PT1H. When property is not specified, them value PT1H is used. */
  credentialsExpireAfter?: string;
  /** Purposes of debug credential. */
  purposes: GatewayListDebugCredentialsContractPurpose[];
  /** Full resource Id of an API. */
  apiId: string;
}

export function gatewayListDebugCredentialsContractSerializer(
  item: GatewayListDebugCredentialsContract,
): any {
  return {
    credentialsExpireAfter: item["credentialsExpireAfter"],
    purposes: item["purposes"].map((p: any) => {
      return p;
    }),
    apiId: item["apiId"],
  };
}

/** Purpose of debug credential. */
export enum KnownGatewayListDebugCredentialsContractPurpose {
  /** The tracing purpose. */
  Tracing = "tracing",
}

/**
 * Purpose of debug credential. \
 * {@link KnownGatewayListDebugCredentialsContractPurpose} can be used interchangeably with GatewayListDebugCredentialsContractPurpose,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tracing**: The tracing purpose.
 */
export type GatewayListDebugCredentialsContractPurpose = string;

/** Gateway debug credentials. */
export interface GatewayDebugCredentialsContract {
  /** Gateway debug token. */
  token?: string;
}

export function gatewayDebugCredentialsContractDeserializer(
  item: any,
): GatewayDebugCredentialsContract {
  return {
    token: item["token"],
  };
}

/** List trace properties. */
export interface GatewayListTraceContract {
  /** Trace id. */
  traceId?: string;
}

export function gatewayListTraceContractSerializer(item: GatewayListTraceContract): any {
  return { traceId: item["traceId"] };
}

/** Association entity details. */
export interface AssociationContract extends ProxyResource {
  /** Provisioning state. */
  provisioningState?: "created";
}

export function associationContractSerializer(item: AssociationContract): any {
  return {
    properties: areAllPropsUndefined(item, ["provisioningState"])
      ? undefined
      : _associationContractPropertiesSerializer(item),
  };
}

/** Association entity contract properties. */
export interface AssociationContractProperties {
  /** Provisioning state. */
  provisioningState?: "created";
}

export function associationContractPropertiesSerializer(item: AssociationContractProperties): any {
  return { provisioningState: item["provisioningState"] };
}

/** Gateway hostname configuration details. */
export interface GatewayHostnameConfigurationContract extends ProxyResource {
  /** Hostname value. Supports valid domain name, partial or full wildcard */
  hostname?: string;
  /** Identifier of Certificate entity that will be used for TLS connection establishment */
  certificateId?: string;
  /** Determines whether gateway requests client certificate */
  negotiateClientCertificate?: boolean;
  /** Specifies if TLS 1.0 is supported */
  tls10Enabled?: boolean;
  /** Specifies if TLS 1.1 is supported */
  tls11Enabled?: boolean;
  /** Specifies if HTTP/2.0 is supported */
  http2Enabled?: boolean;
}

export function gatewayHostnameConfigurationContractSerializer(
  item: GatewayHostnameConfigurationContract,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "hostname",
      "certificateId",
      "negotiateClientCertificate",
      "tls10Enabled",
      "tls11Enabled",
      "http2Enabled",
    ])
      ? undefined
      : _gatewayHostnameConfigurationContractPropertiesSerializer(item),
  };
}

export function gatewayHostnameConfigurationContractDeserializer(
  item: any,
): GatewayHostnameConfigurationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gatewayHostnameConfigurationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Gateway hostname configuration details. */
export interface GatewayHostnameConfigurationContractProperties {
  /** Hostname value. Supports valid domain name, partial or full wildcard */
  hostname?: string;
  /** Identifier of Certificate entity that will be used for TLS connection establishment */
  certificateId?: string;
  /** Determines whether gateway requests client certificate */
  negotiateClientCertificate?: boolean;
  /** Specifies if TLS 1.0 is supported */
  tls10Enabled?: boolean;
  /** Specifies if TLS 1.1 is supported */
  tls11Enabled?: boolean;
  /** Specifies if HTTP/2.0 is supported */
  http2Enabled?: boolean;
}

export function gatewayHostnameConfigurationContractPropertiesSerializer(
  item: GatewayHostnameConfigurationContractProperties,
): any {
  return {
    hostname: item["hostname"],
    certificateId: item["certificateId"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    tls10Enabled: item["tls10Enabled"],
    tls11Enabled: item["tls11Enabled"],
    http2Enabled: item["http2Enabled"],
  };
}

export function gatewayHostnameConfigurationContractPropertiesDeserializer(
  item: any,
): GatewayHostnameConfigurationContractProperties {
  return {
    hostname: item["hostname"],
    certificateId: item["certificateId"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    tls10Enabled: item["tls10Enabled"],
    tls11Enabled: item["tls11Enabled"],
    http2Enabled: item["http2Enabled"],
  };
}

/** Paged Gateway hostname configuration list representation. */
export interface _GatewayHostnameConfigurationCollection {
  /** Page values. */
  readonly value?: GatewayHostnameConfigurationContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _gatewayHostnameConfigurationCollectionDeserializer(
  item: any,
): _GatewayHostnameConfigurationCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : gatewayHostnameConfigurationContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayHostnameConfigurationContractArraySerializer(
  result: Array<GatewayHostnameConfigurationContract>,
): any[] {
  return result.map((item) => {
    return gatewayHostnameConfigurationContractSerializer(item);
  });
}

export function gatewayHostnameConfigurationContractArrayDeserializer(
  result: Array<GatewayHostnameConfigurationContract>,
): any[] {
  return result.map((item) => {
    return gatewayHostnameConfigurationContractDeserializer(item);
  });
}

/** Gateway certificate authority details. */
export interface GatewayCertificateAuthorityContract extends ProxyResource {
  /** Determines whether certificate authority is trusted. */
  isTrusted?: boolean;
}

export function gatewayCertificateAuthorityContractSerializer(
  item: GatewayCertificateAuthorityContract,
): any {
  return {
    properties: areAllPropsUndefined(item, ["isTrusted"])
      ? undefined
      : _gatewayCertificateAuthorityContractPropertiesSerializer(item),
  };
}

export function gatewayCertificateAuthorityContractDeserializer(
  item: any,
): GatewayCertificateAuthorityContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gatewayCertificateAuthorityContractPropertiesDeserializer(item["properties"])),
  };
}

/** Gateway certificate authority details. */
export interface GatewayCertificateAuthorityContractProperties {
  /** Determines whether certificate authority is trusted. */
  isTrusted?: boolean;
}

export function gatewayCertificateAuthorityContractPropertiesSerializer(
  item: GatewayCertificateAuthorityContractProperties,
): any {
  return { isTrusted: item["isTrusted"] };
}

export function gatewayCertificateAuthorityContractPropertiesDeserializer(
  item: any,
): GatewayCertificateAuthorityContractProperties {
  return {
    isTrusted: item["isTrusted"],
  };
}

/** Paged Gateway certificate authority list representation. */
export interface _GatewayCertificateAuthorityCollection {
  /** Page values. */
  readonly value?: GatewayCertificateAuthorityContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _gatewayCertificateAuthorityCollectionDeserializer(
  item: any,
): _GatewayCertificateAuthorityCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : gatewayCertificateAuthorityContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayCertificateAuthorityContractArraySerializer(
  result: Array<GatewayCertificateAuthorityContract>,
): any[] {
  return result.map((item) => {
    return gatewayCertificateAuthorityContractSerializer(item);
  });
}

export function gatewayCertificateAuthorityContractArrayDeserializer(
  result: Array<GatewayCertificateAuthorityContract>,
): any[] {
  return result.map((item) => {
    return gatewayCertificateAuthorityContractDeserializer(item);
  });
}

/** Paged Users list representation. */
export interface _UserCollection {
  /** Page values. */
  value?: UserContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _userCollectionDeserializer(item: any): _UserCollection {
  return {
    value: !item["value"] ? item["value"] : userContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function userContractArrayDeserializer(result: Array<UserContract>): any[] {
  return result.map((item) => {
    return userContractDeserializer(item);
  });
}

/** User details. */
export interface UserContract extends ProxyResource {
  /** Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. */
  state?: UserState;
  /** Optional note about a user set by the administrator. */
  note?: string;
  /** Collection of user identities. */
  identities?: UserIdentityContract[];
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** Email address. */
  email?: string;
  /** Date of user registration. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  registrationDate?: Date;
  /** Collection of groups user is part of. */
  readonly groups?: GroupContractProperties[];
}

export function userContractDeserializer(item: any): UserContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _userContractPropertiesDeserializer(item["properties"])),
  };
}

/** User profile. */
export interface UserContractProperties extends UserEntityBaseParameters {
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** Email address. */
  email?: string;
  /** Date of user registration. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  registrationDate?: Date;
  /** Collection of groups user is part of. */
  readonly groups?: GroupContractProperties[];
}

export function userContractPropertiesDeserializer(item: any): UserContractProperties {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArrayDeserializer(item["identities"]),
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    registrationDate: !item["registrationDate"]
      ? item["registrationDate"]
      : new Date(item["registrationDate"]),
    groups: !item["groups"]
      ? item["groups"]
      : groupContractPropertiesArrayDeserializer(item["groups"]),
  };
}

export function groupContractPropertiesArrayDeserializer(
  result: Array<GroupContractProperties>,
): any[] {
  return result.map((item) => {
    return groupContractPropertiesDeserializer(item);
  });
}

/** User Entity Base Parameters set. */
export interface UserEntityBaseParameters {
  /** Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. */
  state?: UserState;
  /** Optional note about a user set by the administrator. */
  note?: string;
  /** Collection of user identities. */
  identities?: UserIdentityContract[];
}

export function userEntityBaseParametersSerializer(item: UserEntityBaseParameters): any {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArraySerializer(item["identities"]),
  };
}

export function userEntityBaseParametersDeserializer(item: any): UserEntityBaseParameters {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArrayDeserializer(item["identities"]),
  };
}

/** Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. */
export enum KnownUserState {
  /** User state is active. */
  Active = "active",
  /** User is blocked. Blocked users cannot authenticate at developer portal or call API. */
  Blocked = "blocked",
  /** User account is pending. Requires identity confirmation before it can be made active. */
  Pending = "pending",
  /** User account is closed. All identities and related entities are removed. */
  Deleted = "deleted",
}

/**
 * Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. \
 * {@link KnownUserState} can be used interchangeably with UserState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: User state is active. \
 * **blocked**: User is blocked. Blocked users cannot authenticate at developer portal or call API. \
 * **pending**: User account is pending. Requires identity confirmation before it can be made active. \
 * **deleted**: User account is closed. All identities and related entities are removed.
 */
export type UserState = string;

export function userIdentityContractArraySerializer(result: Array<UserIdentityContract>): any[] {
  return result.map((item) => {
    return userIdentityContractSerializer(item);
  });
}

export function userIdentityContractArrayDeserializer(result: Array<UserIdentityContract>): any[] {
  return result.map((item) => {
    return userIdentityContractDeserializer(item);
  });
}

/** User identity details. */
export interface UserIdentityContract {
  /** Identity provider name. */
  provider?: string;
  /** Identifier value within provider. */
  id?: string;
}

export function userIdentityContractSerializer(item: UserIdentityContract): any {
  return { provider: item["provider"], id: item["id"] };
}

export function userIdentityContractDeserializer(item: any): UserIdentityContract {
  return {
    provider: item["provider"],
    id: item["id"],
  };
}

/** Identity Provider details. */
export interface IdentityProviderContract extends ProxyResource {
  /** Identity Provider Type identifier. */
  typePropertiesType?: IdentityProviderType;
  /** The TenantId to use instead of Common when logging into Active Directory */
  signinTenant?: string;
  /** List of Allowed Tenants when configuring Azure Active Directory login. */
  allowedTenants?: string[];
  /** OpenID Connect discovery endpoint hostname for AAD or AAD B2C. */
  authority?: string;
  /** Signup Policy Name. Only applies to AAD B2C Identity Provider. */
  signupPolicyName?: string;
  /** Signin Policy Name. Only applies to AAD B2C Identity Provider. */
  signinPolicyName?: string;
  /** Profile Editing Policy Name. Only applies to AAD B2C Identity Provider. */
  profileEditingPolicyName?: string;
  /** Password Reset Policy Name. Only applies to AAD B2C Identity Provider. */
  passwordResetPolicyName?: string;
  /** The client library to be used in the developer portal. Only applies to AAD and AAD B2C Identity Provider. */
  clientLibrary?: string;
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId?: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderContractDeserializer(item: any): IdentityProviderContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _identityProviderContractPropertiesDeserializer(item["properties"])),
  };
}

/** The external Identity Providers like Facebook, Google, Microsoft, Twitter or Azure Active Directory which can be used to enable access to the API Management service developer portal for all users. */
export interface IdentityProviderContractProperties extends IdentityProviderBaseParameters {
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderContractPropertiesDeserializer(
  item: any,
): IdentityProviderContractProperties {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

/** Known values of {@link IdentityProviderType} that the service accepts. */
export enum KnownIdentityProviderType {
  /** Facebook as Identity provider. */
  Facebook = "facebook",
  /** Google as Identity provider. */
  Google = "google",
  /** Microsoft Live as Identity provider. */
  Microsoft = "microsoft",
  /** Twitter as Identity provider. */
  Twitter = "twitter",
  /** Azure Active Directory as Identity provider. */
  Aad = "aad",
  /** Azure Active Directory B2C as Identity provider. */
  AadB2C = "aadB2C",
}

/** Type of IdentityProviderType */
export type IdentityProviderType = string;

/** Identity Provider Base Parameter Properties. */
export interface IdentityProviderBaseParameters {
  /** Identity Provider Type identifier. */
  type?: IdentityProviderType;
  /** The TenantId to use instead of Common when logging into Active Directory */
  signinTenant?: string;
  /** List of Allowed Tenants when configuring Azure Active Directory login. */
  allowedTenants?: string[];
  /** OpenID Connect discovery endpoint hostname for AAD or AAD B2C. */
  authority?: string;
  /** Signup Policy Name. Only applies to AAD B2C Identity Provider. */
  signupPolicyName?: string;
  /** Signin Policy Name. Only applies to AAD B2C Identity Provider. */
  signinPolicyName?: string;
  /** Profile Editing Policy Name. Only applies to AAD B2C Identity Provider. */
  profileEditingPolicyName?: string;
  /** Password Reset Policy Name. Only applies to AAD B2C Identity Provider. */
  passwordResetPolicyName?: string;
  /** The client library to be used in the developer portal. Only applies to AAD and AAD B2C Identity Provider. */
  clientLibrary?: string;
}

export function identityProviderBaseParametersSerializer(
  item: IdentityProviderBaseParameters,
): any {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
  };
}

export function identityProviderBaseParametersDeserializer(
  item: any,
): IdentityProviderBaseParameters {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
  };
}

/** Identity Provider details. */
export interface IdentityProviderCreateContract extends ProxyResource {
  /** Identity Provider Type identifier. */
  typePropertiesType?: IdentityProviderType;
  /** The TenantId to use instead of Common when logging into Active Directory */
  signinTenant?: string;
  /** List of Allowed Tenants when configuring Azure Active Directory login. */
  allowedTenants?: string[];
  /** OpenID Connect discovery endpoint hostname for AAD or AAD B2C. */
  authority?: string;
  /** Signup Policy Name. Only applies to AAD B2C Identity Provider. */
  signupPolicyName?: string;
  /** Signin Policy Name. Only applies to AAD B2C Identity Provider. */
  signinPolicyName?: string;
  /** Profile Editing Policy Name. Only applies to AAD B2C Identity Provider. */
  profileEditingPolicyName?: string;
  /** Password Reset Policy Name. Only applies to AAD B2C Identity Provider. */
  passwordResetPolicyName?: string;
  /** The client library to be used in the developer portal. Only applies to AAD and AAD B2C Identity Provider. */
  clientLibrary?: string;
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId?: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret?: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderCreateContractSerializer(
  item: IdentityProviderCreateContract,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "type",
      "signinTenant",
      "allowedTenants",
      "authority",
      "signupPolicyName",
      "signinPolicyName",
      "profileEditingPolicyName",
      "passwordResetPolicyName",
      "clientLibrary",
      "clientId",
      "clientSecret",
      "certificateId",
    ])
      ? undefined
      : _identityProviderCreateContractPropertiesSerializer(item),
  };
}

/** The external Identity Providers like Facebook, Google, Microsoft, Twitter or Azure Active Directory which can be used to enable access to the API Management service developer portal for all users. */
export interface IdentityProviderCreateContractProperties extends IdentityProviderBaseParameters {
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  clientSecret: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderCreateContractPropertiesSerializer(
  item: IdentityProviderCreateContractProperties,
): any {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

/** Parameters supplied to update Identity Provider */
export interface IdentityProviderUpdateParameters {
  /** Identity Provider Type identifier. */
  type?: IdentityProviderType;
  /** The TenantId to use instead of Common when logging into Active Directory */
  signinTenant?: string;
  /** List of Allowed Tenants when configuring Azure Active Directory login. */
  allowedTenants?: string[];
  /** OpenID Connect discovery endpoint hostname for AAD or AAD B2C. */
  authority?: string;
  /** Signup Policy Name. Only applies to AAD B2C Identity Provider. */
  signupPolicyName?: string;
  /** Signin Policy Name. Only applies to AAD B2C Identity Provider. */
  signinPolicyName?: string;
  /** Profile Editing Policy Name. Only applies to AAD B2C Identity Provider. */
  profileEditingPolicyName?: string;
  /** Password Reset Policy Name. Only applies to AAD B2C Identity Provider. */
  passwordResetPolicyName?: string;
  /** The client library to be used in the developer portal. Only applies to AAD and AAD B2C Identity Provider. */
  clientLibrary?: string;
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId?: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. */
  clientSecret?: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderUpdateParametersSerializer(
  item: IdentityProviderUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "type",
      "signinTenant",
      "allowedTenants",
      "authority",
      "signupPolicyName",
      "signinPolicyName",
      "profileEditingPolicyName",
      "passwordResetPolicyName",
      "clientLibrary",
      "clientId",
      "clientSecret",
      "certificateId",
    ])
      ? undefined
      : _identityProviderUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update Identity Provider operation. */
export interface IdentityProviderUpdateProperties extends IdentityProviderBaseParameters {
  /** Client Id of the Application in the external Identity Provider. It is App ID for Facebook login, Client ID for Google login, App ID for Microsoft. */
  clientId?: string;
  /** Client secret of the Application in external Identity Provider, used to authenticate login request. For example, it is App Secret for Facebook login, API Key for Google login, Public Key for Microsoft. */
  clientSecret?: string;
  /** Certificate full resource ID used in external Identity Provider */
  certificateId?: string;
}

export function identityProviderUpdatePropertiesSerializer(
  item: IdentityProviderUpdateProperties,
): any {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

/** List of all the Identity Providers configured on the service instance. */
export interface _IdentityProviderList {
  /** Identity Provider configuration values. */
  value?: IdentityProviderContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _identityProviderListDeserializer(item: any): _IdentityProviderList {
  return {
    value: !item["value"]
      ? item["value"]
      : identityProviderContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function identityProviderContractArrayDeserializer(
  result: Array<IdentityProviderContract>,
): any[] {
  return result.map((item) => {
    return identityProviderContractDeserializer(item);
  });
}

/** Client or app secret used in IdentityProviders, Aad, OpenID or OAuth. */
export interface ClientSecretContract {
  /** Client or app secret used in IdentityProviders, Aad, OpenID or OAuth. */
  clientSecret?: string;
}

export function clientSecretContractDeserializer(item: any): ClientSecretContract {
  return {
    clientSecret: item["clientSecret"],
  };
}

/** Paged Recipient User list representation. */
export interface RecipientUserCollection {
  /** Page values. */
  value?: RecipientUserContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function recipientUserCollectionDeserializer(item: any): RecipientUserCollection {
  return {
    value: !item["value"] ? item["value"] : recipientUserContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function recipientUserContractArrayDeserializer(
  result: Array<RecipientUserContract>,
): any[] {
  return result.map((item) => {
    return recipientUserContractDeserializer(item);
  });
}

/** Recipient User details. */
export interface RecipientUserContract extends ProxyResource {
  /** API Management UserId subscribed to notification. */
  userId?: string;
}

export function recipientUserContractDeserializer(item: any): RecipientUserContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recipientUserContractPropertiesDeserializer(item["properties"])),
  };
}

/** Recipient User Contract Properties. */
export interface RecipientUsersContractProperties {
  /** API Management UserId subscribed to notification. */
  userId?: string;
}

export function recipientUsersContractPropertiesDeserializer(
  item: any,
): RecipientUsersContractProperties {
  return {
    userId: item["userId"],
  };
}

/** Paged Recipient User list representation. */
export interface RecipientEmailCollection {
  /** Page values. */
  value?: RecipientEmailContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function recipientEmailCollectionDeserializer(item: any): RecipientEmailCollection {
  return {
    value: !item["value"] ? item["value"] : recipientEmailContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function recipientEmailContractArrayDeserializer(
  result: Array<RecipientEmailContract>,
): any[] {
  return result.map((item) => {
    return recipientEmailContractDeserializer(item);
  });
}

/** Recipient Email details. */
export interface RecipientEmailContract extends ProxyResource {
  /** User Email subscribed to notification. */
  email?: string;
}

export function recipientEmailContractDeserializer(item: any): RecipientEmailContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recipientEmailContractPropertiesDeserializer(item["properties"])),
  };
}

/** Recipient Email Contract Properties. */
export interface RecipientEmailContractProperties {
  /** User Email subscribed to notification. */
  email?: string;
}

export function recipientEmailContractPropertiesDeserializer(
  item: any,
): RecipientEmailContractProperties {
  return {
    email: item["email"],
  };
}

/** OpenId Connect Provider details. */
export interface OpenidConnectProviderContract extends ProxyResource {
  /** User-friendly OpenID Connect Provider name. */
  displayName?: string;
  /** User-friendly description of OpenID Connect Provider. */
  description?: string;
  /** Metadata endpoint URI. */
  metadataEndpoint?: string;
  /** Client ID of developer console which is the client application. */
  clientId?: string;
  /** Client Secret of developer console which is the client application. */
  clientSecret?: string;
  /** If true, the Open ID Connect provider may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the Open ID Connect provider will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
}

export function openidConnectProviderContractSerializer(item: OpenidConnectProviderContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "metadataEndpoint",
      "clientId",
      "clientSecret",
      "useInTestConsole",
      "useInApiDocumentation",
    ])
      ? undefined
      : _openidConnectProviderContractPropertiesSerializer(item),
  };
}

export function openidConnectProviderContractDeserializer(
  item: any,
): OpenidConnectProviderContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _openidConnectProviderContractPropertiesDeserializer(item["properties"])),
  };
}

/** OpenID Connect Providers Contract. */
export interface OpenidConnectProviderContractProperties {
  /** User-friendly OpenID Connect Provider name. */
  displayName: string;
  /** User-friendly description of OpenID Connect Provider. */
  description?: string;
  /** Metadata endpoint URI. */
  metadataEndpoint: string;
  /** Client ID of developer console which is the client application. */
  clientId: string;
  /** Client Secret of developer console which is the client application. */
  clientSecret?: string;
  /** If true, the Open ID Connect provider may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the Open ID Connect provider will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
}

export function openidConnectProviderContractPropertiesSerializer(
  item: OpenidConnectProviderContractProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

export function openidConnectProviderContractPropertiesDeserializer(
  item: any,
): OpenidConnectProviderContractProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

/** Parameters supplied to the Update OpenID Connect Provider operation. */
export interface OpenidConnectProviderUpdateContract {
  /** User-friendly OpenID Connect Provider name. */
  displayName?: string;
  /** User-friendly description of OpenID Connect Provider. */
  description?: string;
  /** Metadata endpoint URI. */
  metadataEndpoint?: string;
  /** Client ID of developer console which is the client application. */
  clientId?: string;
  /** Client Secret of developer console which is the client application. */
  clientSecret?: string;
  /** If true, the Open ID Connect provider may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the Open ID Connect provider will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
}

export function openidConnectProviderUpdateContractSerializer(
  item: OpenidConnectProviderUpdateContract,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "metadataEndpoint",
      "clientId",
      "clientSecret",
      "useInTestConsole",
      "useInApiDocumentation",
    ])
      ? undefined
      : _openidConnectProviderUpdateContractPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update OpenID Connect Provider operation. */
export interface OpenidConnectProviderUpdateContractProperties {
  /** User-friendly OpenID Connect Provider name. */
  displayName?: string;
  /** User-friendly description of OpenID Connect Provider. */
  description?: string;
  /** Metadata endpoint URI. */
  metadataEndpoint?: string;
  /** Client ID of developer console which is the client application. */
  clientId?: string;
  /** Client Secret of developer console which is the client application. */
  clientSecret?: string;
  /** If true, the Open ID Connect provider may be used in the developer portal test console. True by default if no value is provided. */
  useInTestConsole?: boolean;
  /** If true, the Open ID Connect provider will be used in the API documentation in the developer portal. False by default if no value is provided. */
  useInApiDocumentation?: boolean;
}

export function openidConnectProviderUpdateContractPropertiesSerializer(
  item: OpenidConnectProviderUpdateContractProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

/** Paged OpenIdProviders list representation. */
export interface _OpenIdConnectProviderCollection {
  /** Page values. */
  value?: OpenidConnectProviderContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _openIdConnectProviderCollectionDeserializer(
  item: any,
): _OpenIdConnectProviderCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : openidConnectProviderContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function openidConnectProviderContractArraySerializer(
  result: Array<OpenidConnectProviderContract>,
): any[] {
  return result.map((item) => {
    return openidConnectProviderContractSerializer(item);
  });
}

export function openidConnectProviderContractArrayDeserializer(
  result: Array<OpenidConnectProviderContract>,
): any[] {
  return result.map((item) => {
    return openidConnectProviderContractDeserializer(item);
  });
}

/** Policy restriction contract details. */
export interface PolicyRestrictionContract extends ProxyResource {
  /** Path to the policy document. */
  scope?: string;
  /** Indicates if base policy should be enforced for the policy document. */
  requireBase?: PolicyRestrictionRequireBase;
}

export function policyRestrictionContractSerializer(item: PolicyRestrictionContract): any {
  return {
    properties: areAllPropsUndefined(item, ["scope", "requireBase"])
      ? undefined
      : _policyRestrictionContractPropertiesSerializer(item),
  };
}

export function policyRestrictionContractDeserializer(item: any): PolicyRestrictionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyRestrictionContractPropertiesDeserializer(item["properties"])),
  };
}

/** Policy restrictions contract properties. */
export interface PolicyRestrictionContractProperties {
  /** Path to the policy document. */
  scope?: string;
  /** Indicates if base policy should be enforced for the policy document. */
  requireBase?: PolicyRestrictionRequireBase;
}

export function policyRestrictionContractPropertiesSerializer(
  item: PolicyRestrictionContractProperties,
): any {
  return { scope: item["scope"], requireBase: item["requireBase"] };
}

export function policyRestrictionContractPropertiesDeserializer(
  item: any,
): PolicyRestrictionContractProperties {
  return {
    scope: item["scope"],
    requireBase: item["requireBase"],
  };
}

/** Indicates if base policy should be enforced for the policy document. */
export enum KnownPolicyRestrictionRequireBase {
  /** The policy is required to have base policy */
  True = "true",
  /** The policy does not require to have base policy */
  False = "false",
}

/**
 * Indicates if base policy should be enforced for the policy document. \
 * {@link KnownPolicyRestrictionRequireBase} can be used interchangeably with PolicyRestrictionRequireBase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true**: The policy is required to have base policy \
 * **false**: The policy does not require to have base policy
 */
export type PolicyRestrictionRequireBase = string;

/** Policy restriction contract details. */
export interface PolicyRestrictionUpdateContract {
  /** Path to the policy document. */
  scope?: string;
  /** Indicates if base policy should be enforced for the policy document. */
  requireBase?: PolicyRestrictionRequireBase;
}

export function policyRestrictionUpdateContractSerializer(
  item: PolicyRestrictionUpdateContract,
): any {
  return {
    properties: areAllPropsUndefined(item, ["scope", "requireBase"])
      ? undefined
      : _policyRestrictionUpdateContractPropertiesSerializer(item),
  };
}

/** The response of the get policy restrictions operation. */
export interface _PolicyRestrictionCollection {
  /** Page values. */
  value?: PolicyRestrictionContract[];
  /** Next page link if any. */
  nextLink?: string;
}

export function _policyRestrictionCollectionDeserializer(item: any): _PolicyRestrictionCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : policyRestrictionContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyRestrictionContractArraySerializer(
  result: Array<PolicyRestrictionContract>,
): any[] {
  return result.map((item) => {
    return policyRestrictionContractSerializer(item);
  });
}

export function policyRestrictionContractArrayDeserializer(
  result: Array<PolicyRestrictionContract>,
): any[] {
  return result.map((item) => {
    return policyRestrictionContractDeserializer(item);
  });
}

/** The developer portal configuration contract. */
export interface PortalConfigContract extends ProxyResource {
  /** Enable or disable Basic authentication method. */
  enableBasicAuth?: boolean;
  signin?: PortalConfigPropertiesSignin;
  signup?: PortalConfigPropertiesSignup;
  /** The developer portal delegation settings. */
  delegation?: PortalConfigDelegationProperties;
  /** The developer portal Cross-Origin Resource Sharing (CORS) settings. */
  cors?: PortalConfigCorsProperties;
  /** The developer portal Content Security Policy (CSP) settings. */
  csp?: PortalConfigCspProperties;
}

export function portalConfigContractSerializer(item: PortalConfigContract): any {
  return {
    properties: areAllPropsUndefined(item, [
      "enableBasicAuth",
      "signin",
      "signup",
      "delegation",
      "cors",
      "csp",
    ])
      ? undefined
      : _portalConfigContractPropertiesSerializer(item),
  };
}

export function portalConfigContractDeserializer(item: any): PortalConfigContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalConfigContractPropertiesDeserializer(item["properties"])),
  };
}

/** The developer portal configuration contract properties. */
export interface PortalConfigProperties {
  /** Enable or disable Basic authentication method. */
  enableBasicAuth?: boolean;
  signin?: PortalConfigPropertiesSignin;
  signup?: PortalConfigPropertiesSignup;
  /** The developer portal delegation settings. */
  delegation?: PortalConfigDelegationProperties;
  /** The developer portal Cross-Origin Resource Sharing (CORS) settings. */
  cors?: PortalConfigCorsProperties;
  /** The developer portal Content Security Policy (CSP) settings. */
  csp?: PortalConfigCspProperties;
}

export function portalConfigPropertiesSerializer(item: PortalConfigProperties): any {
  return {
    enableBasicAuth: item["enableBasicAuth"],
    signin: !item["signin"]
      ? item["signin"]
      : portalConfigPropertiesSigninSerializer(item["signin"]),
    signup: !item["signup"]
      ? item["signup"]
      : portalConfigPropertiesSignupSerializer(item["signup"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : portalConfigDelegationPropertiesSerializer(item["delegation"]),
    cors: !item["cors"] ? item["cors"] : portalConfigCorsPropertiesSerializer(item["cors"]),
    csp: !item["csp"] ? item["csp"] : portalConfigCspPropertiesSerializer(item["csp"]),
  };
}

export function portalConfigPropertiesDeserializer(item: any): PortalConfigProperties {
  return {
    enableBasicAuth: item["enableBasicAuth"],
    signin: !item["signin"]
      ? item["signin"]
      : portalConfigPropertiesSigninDeserializer(item["signin"]),
    signup: !item["signup"]
      ? item["signup"]
      : portalConfigPropertiesSignupDeserializer(item["signup"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : portalConfigDelegationPropertiesDeserializer(item["delegation"]),
    cors: !item["cors"] ? item["cors"] : portalConfigCorsPropertiesDeserializer(item["cors"]),
    csp: !item["csp"] ? item["csp"] : portalConfigCspPropertiesDeserializer(item["csp"]),
  };
}

/** model interface PortalConfigPropertiesSignin */
export interface PortalConfigPropertiesSignin {
  /** Redirect anonymous users to the sign-in page. */
  require?: boolean;
}

export function portalConfigPropertiesSigninSerializer(item: PortalConfigPropertiesSignin): any {
  return { require: item["require"] };
}

export function portalConfigPropertiesSigninDeserializer(item: any): PortalConfigPropertiesSignin {
  return {
    require: item["require"],
  };
}

/** model interface PortalConfigPropertiesSignup */
export interface PortalConfigPropertiesSignup {
  /** Terms of service settings. */
  termsOfService?: PortalConfigTermsOfServiceProperties;
}

export function portalConfigPropertiesSignupSerializer(item: PortalConfigPropertiesSignup): any {
  return {
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : portalConfigTermsOfServicePropertiesSerializer(item["termsOfService"]),
  };
}

export function portalConfigPropertiesSignupDeserializer(item: any): PortalConfigPropertiesSignup {
  return {
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : portalConfigTermsOfServicePropertiesDeserializer(item["termsOfService"]),
  };
}

/** Terms of service contract properties. */
export interface PortalConfigTermsOfServiceProperties {
  /** A terms of service text. */
  text?: string;
  /** Ask user for consent to the terms of service. */
  requireConsent?: boolean;
}

export function portalConfigTermsOfServicePropertiesSerializer(
  item: PortalConfigTermsOfServiceProperties,
): any {
  return { text: item["text"], requireConsent: item["requireConsent"] };
}

export function portalConfigTermsOfServicePropertiesDeserializer(
  item: any,
): PortalConfigTermsOfServiceProperties {
  return {
    text: item["text"],
    requireConsent: item["requireConsent"],
  };
}

/** model interface PortalConfigDelegationProperties */
export interface PortalConfigDelegationProperties {
  /** Enable or disable delegation for user registration. */
  delegateRegistration?: boolean;
  /** Enable or disable delegation for product subscriptions. */
  delegateSubscription?: boolean;
  /** A delegation endpoint URL. */
  delegationUrl?: string;
  /** A base64-encoded validation key to ensure requests originate from Azure API Management service. */
  validationKey?: string;
}

export function portalConfigDelegationPropertiesSerializer(
  item: PortalConfigDelegationProperties,
): any {
  return {
    delegateRegistration: item["delegateRegistration"],
    delegateSubscription: item["delegateSubscription"],
    delegationUrl: item["delegationUrl"],
    validationKey: item["validationKey"],
  };
}

export function portalConfigDelegationPropertiesDeserializer(
  item: any,
): PortalConfigDelegationProperties {
  return {
    delegateRegistration: item["delegateRegistration"],
    delegateSubscription: item["delegateSubscription"],
    delegationUrl: item["delegationUrl"],
    validationKey: item["validationKey"],
  };
}

/** The developer portal Cross-Origin Resource Sharing (CORS) settings. */
export interface PortalConfigCorsProperties {
  /** Allowed origins, e.g. `https://trusted.com`. */
  allowedOrigins?: string[];
}

export function portalConfigCorsPropertiesSerializer(item: PortalConfigCorsProperties): any {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
  };
}

export function portalConfigCorsPropertiesDeserializer(item: any): PortalConfigCorsProperties {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
  };
}

/** The developer portal Content Security Policy (CSP) settings. */
export interface PortalConfigCspProperties {
  /** The mode of the developer portal Content Security Policy (CSP). */
  mode?: PortalSettingsCspMode;
  /** The URLs used by the browser to report CSP violations. */
  reportUri?: string[];
  /** Allowed sources, e.g. `*.trusted.com`, `trusted.com`, `https://`. */
  allowedSources?: string[];
}

export function portalConfigCspPropertiesSerializer(item: PortalConfigCspProperties): any {
  return {
    mode: item["mode"],
    reportUri: !item["reportUri"]
      ? item["reportUri"]
      : item["reportUri"].map((p: any) => {
          return p;
        }),
    allowedSources: !item["allowedSources"]
      ? item["allowedSources"]
      : item["allowedSources"].map((p: any) => {
          return p;
        }),
  };
}

export function portalConfigCspPropertiesDeserializer(item: any): PortalConfigCspProperties {
  return {
    mode: item["mode"],
    reportUri: !item["reportUri"]
      ? item["reportUri"]
      : item["reportUri"].map((p: any) => {
          return p;
        }),
    allowedSources: !item["allowedSources"]
      ? item["allowedSources"]
      : item["allowedSources"].map((p: any) => {
          return p;
        }),
  };
}

/** The mode of the developer portal Content Security Policy (CSP). */
export enum KnownPortalSettingsCspMode {
  /** The browser will block requests not matching allowed origins. */
  Enabled = "enabled",
  /** The browser will not apply the origin restrictions. */
  Disabled = "disabled",
  /** The browser will report requests not matching allowed origins without blocking them. */
  ReportOnly = "reportOnly",
}

/**
 * The mode of the developer portal Content Security Policy (CSP). \
 * {@link KnownPortalSettingsCspMode} can be used interchangeably with PortalSettingsCspMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: The browser will block requests not matching allowed origins. \
 * **disabled**: The browser will not apply the origin restrictions. \
 * **reportOnly**: The browser will report requests not matching allowed origins without blocking them.
 */
export type PortalSettingsCspMode = string;

/** The collection of the developer portal configurations. */
export interface _PortalConfigCollection {
  /** The developer portal configurations. */
  value?: PortalConfigContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _portalConfigCollectionDeserializer(item: any): _PortalConfigCollection {
  return {
    value: !item["value"] ? item["value"] : portalConfigContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function portalConfigContractArraySerializer(result: Array<PortalConfigContract>): any[] {
  return result.map((item) => {
    return portalConfigContractSerializer(item);
  });
}

export function portalConfigContractArrayDeserializer(result: Array<PortalConfigContract>): any[] {
  return result.map((item) => {
    return portalConfigContractDeserializer(item);
  });
}

/** Client application details. */
export interface ClientApplicationContract extends ProxyResource {
  /** Client application name. */
  displayName?: string;
  /** Client application description. */
  description?: string;
  /** A resource identifier for the user who owns the application. */
  ownerId?: string;
  /** Microsoft EntraID Application ID (Client ID). This is the value that is used to identify the application when it is requesting access tokens from Microsoft EntraID. This property is read-only and will be set by the system when the application is created. */
  readonly entraApplicationId?: string;
  /** Tenant ID is a unique identifier (a GUID) for an organization directory in Microsoft’s cloud. It’s used to identify tenants across Microsoft services. */
  readonly entraTenantId?: string;
  /** Client application state. The value derives the state of an application based on the statuses of its associated ClientApplicationProductLinks. */
  readonly state?: ClientApplicationState;
}

export function clientApplicationContractSerializer(item: ClientApplicationContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "description", "ownerId"])
      ? undefined
      : _clientApplicationContractPropertiesSerializer(item),
  };
}

export function clientApplicationContractDeserializer(item: any): ClientApplicationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clientApplicationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Client Application Entity Properties */
export interface ClientApplicationContractProperties {
  /** Client application name. */
  displayName: string;
  /** Client application description. */
  description?: string;
  /** A resource identifier for the user who owns the application. */
  ownerId: string;
  /** Microsoft EntraID Application ID (Client ID). This is the value that is used to identify the application when it is requesting access tokens from Microsoft EntraID. This property is read-only and will be set by the system when the application is created. */
  readonly entraApplicationId?: string;
  /** Tenant ID is a unique identifier (a GUID) for an organization directory in Microsoft’s cloud. It’s used to identify tenants across Microsoft services. */
  readonly entraTenantId?: string;
  /** Client application state. The value derives the state of an application based on the statuses of its associated ClientApplicationProductLinks. */
  readonly state?: ClientApplicationState;
}

export function clientApplicationContractPropertiesSerializer(
  item: ClientApplicationContractProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    ownerId: item["ownerId"],
  };
}

export function clientApplicationContractPropertiesDeserializer(
  item: any,
): ClientApplicationContractProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    ownerId: item["ownerId"],
    entraApplicationId: item["entraApplicationId"],
    entraTenantId: item["entraTenantId"],
    state: item["state"],
  };
}

/** Client application state. The value derives the state of an application based on the statuses of its associated ClientApplicationProductLinks. */
export enum KnownClientApplicationState {
  /** If there are no associated ClientApplicationLinks or all ClientApplicationLinks are in a state that doesn't meet the criteria for the states: active, rejected, approved (e.g., a mix of active and rejected without any approved). */
  Pending = "pending",
  /** If there are no approved ClientApplicationLink, but at least one ClientApplicationLink is active, the Application is considered active */
  Active = "active",
  /** If all ClientApplicationLinks are rejected, the Application is considered rejected */
  Rejected = "rejected",
  /** If at least one ClientApplicationLink is approved, the Application is considered approved */
  Approved = "approved",
}

/**
 * Client application state. The value derives the state of an application based on the statuses of its associated ClientApplicationProductLinks. \
 * {@link KnownClientApplicationState} can be used interchangeably with ClientApplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: If there are no associated ClientApplicationLinks or all ClientApplicationLinks are in a state that doesn't meet the criteria for the states: active, rejected, approved (e.g., a mix of active and rejected without any approved). \
 * **active**: If there are no approved ClientApplicationLink, but at least one ClientApplicationLink is active, the Application is considered active \
 * **rejected**: If all ClientApplicationLinks are rejected, the Application is considered rejected \
 * **approved**: If at least one ClientApplicationLink is approved, the Application is considered approved
 */
export type ClientApplicationState = string;

/** Paged ClientApplication list representation. */
export interface _ClientApplicationCollection {
  /** Page values. */
  value?: ClientApplicationContract[];
  /** Next page link if any. */
  nextLink?: string;
}

export function _clientApplicationCollectionDeserializer(item: any): _ClientApplicationCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : clientApplicationContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientApplicationContractArraySerializer(
  result: Array<ClientApplicationContract>,
): any[] {
  return result.map((item) => {
    return clientApplicationContractSerializer(item);
  });
}

export function clientApplicationContractArrayDeserializer(
  result: Array<ClientApplicationContract>,
): any[] {
  return result.map((item) => {
    return clientApplicationContractDeserializer(item);
  });
}

/** Specifies client application secrets needed to authorize applications API calls */
export interface ClientApplicationSecretsContract {
  /** Microsoft EntraID client application secrets */
  entra?: ClientApplicationSecretsContractEntra;
}

export function clientApplicationSecretsContractDeserializer(
  item: any,
): ClientApplicationSecretsContract {
  return {
    entra: !item["entra"]
      ? item["entra"]
      : clientApplicationSecretsContractEntraDeserializer(item["entra"]),
  };
}

/** Microsoft EntraID client application secrets */
export interface ClientApplicationSecretsContractEntra {
  /** EntraID client application secret */
  clientSecret?: string;
  /** EntraID client application secret expiration date. */
  readonly expiresAt?: Date;
}

export function clientApplicationSecretsContractEntraDeserializer(
  item: any,
): ClientApplicationSecretsContractEntra {
  return {
    clientSecret: item["clientSecret"],
    expiresAt: !item["expiresAt"] ? item["expiresAt"] : new Date(item["expiresAt"]),
  };
}

/** Specifies Client Application - Product link assignment */
export interface ClientApplicationProductLinkContract extends ProxyResource {
  /** The unique resource identifier of the Product. */
  productId?: string;
}

export function clientApplicationProductLinkContractSerializer(
  item: ClientApplicationProductLinkContract,
): any {
  return {
    properties: areAllPropsUndefined(item, ["productId"])
      ? undefined
      : _clientApplicationProductLinkContractPropertiesSerializer(item),
  };
}

export function clientApplicationProductLinkContractDeserializer(
  item: any,
): ClientApplicationProductLinkContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clientApplicationProductLinkContractPropertiesDeserializer(item["properties"])),
  };
}

/** model interface ClientApplicationProductLinkContractProperties */
export interface ClientApplicationProductLinkContractProperties {
  /** The unique resource identifier of the Product. */
  productId: string;
}

export function clientApplicationProductLinkContractPropertiesSerializer(
  item: ClientApplicationProductLinkContractProperties,
): any {
  return { productId: item["productId"] };
}

export function clientApplicationProductLinkContractPropertiesDeserializer(
  item: any,
): ClientApplicationProductLinkContractProperties {
  return {
    productId: item["productId"],
  };
}

/** Paged ClientApplicationProductLinkContract list representation. */
export interface _ClientApplicationProductLinkCollection {
  /** Page values. */
  value?: ClientApplicationProductLinkContract[];
  /** Next page link if any. */
  nextLink?: string;
}

export function _clientApplicationProductLinkCollectionDeserializer(
  item: any,
): _ClientApplicationProductLinkCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : clientApplicationProductLinkContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientApplicationProductLinkContractArraySerializer(
  result: Array<ClientApplicationProductLinkContract>,
): any[] {
  return result.map((item) => {
    return clientApplicationProductLinkContractSerializer(item);
  });
}

export function clientApplicationProductLinkContractArrayDeserializer(
  result: Array<ClientApplicationProductLinkContract>,
): any[] {
  return result.map((item) => {
    return clientApplicationProductLinkContractDeserializer(item);
  });
}

/** Portal Revision's contract details. */
export interface PortalRevisionContract extends ProxyResource {
  /** Portal revision description. */
  description?: string;
  /** Portal revision publishing status details. */
  readonly statusDetails?: string;
  /** Status of the portal's revision. */
  readonly status?: PortalRevisionStatus;
  /** Indicates if the portal's revision is public. */
  isCurrent?: boolean;
  /** Portal's revision creation date and time. */
  readonly createdDateTime?: Date;
  /** Last updated date and time. */
  readonly updatedDateTime?: Date;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function portalRevisionContractSerializer(item: PortalRevisionContract): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "isCurrent"])
      ? undefined
      : _portalRevisionContractPropertiesSerializer(item),
  };
}

export function portalRevisionContractDeserializer(item: any): PortalRevisionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _portalRevisionContractPropertiesDeserializer(item["properties"])),
  };
}

/** model interface PortalRevisionContractProperties */
export interface PortalRevisionContractProperties {
  /** Portal revision description. */
  description?: string;
  /** Portal revision publishing status details. */
  readonly statusDetails?: string;
  /** Status of the portal's revision. */
  readonly status?: PortalRevisionStatus;
  /** Indicates if the portal's revision is public. */
  isCurrent?: boolean;
  /** Portal's revision creation date and time. */
  readonly createdDateTime?: Date;
  /** Last updated date and time. */
  readonly updatedDateTime?: Date;
  /** The provisioning state */
  readonly provisioningState?: string;
}

export function portalRevisionContractPropertiesSerializer(
  item: PortalRevisionContractProperties,
): any {
  return { description: item["description"], isCurrent: item["isCurrent"] };
}

export function portalRevisionContractPropertiesDeserializer(
  item: any,
): PortalRevisionContractProperties {
  return {
    description: item["description"],
    statusDetails: item["statusDetails"],
    status: item["status"],
    isCurrent: item["isCurrent"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    updatedDateTime: !item["updatedDateTime"]
      ? item["updatedDateTime"]
      : new Date(item["updatedDateTime"]),
    provisioningState: item["provisioningState"],
  };
}

/** Status of the portal's revision. */
export enum KnownPortalRevisionStatus {
  /** Portal's revision has been queued. */
  Pending = "pending",
  /** Portal's revision is being published. */
  Publishing = "publishing",
  /** Portal's revision publishing completed. */
  Completed = "completed",
  /** Portal's revision publishing failed. */
  Failed = "failed",
}

/**
 * Status of the portal's revision. \
 * {@link KnownPortalRevisionStatus} can be used interchangeably with PortalRevisionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: Portal's revision has been queued. \
 * **publishing**: Portal's revision is being published. \
 * **completed**: Portal's revision publishing completed. \
 * **failed**: Portal's revision publishing failed.
 */
export type PortalRevisionStatus = string;

/** Paged list of portal revisions. */
export interface _PortalRevisionCollection {
  /** Collection of portal revisions. */
  readonly value?: PortalRevisionContract[];
  /** Next page link, if any. */
  readonly nextLink?: string;
}

export function _portalRevisionCollectionDeserializer(item: any): _PortalRevisionCollection {
  return {
    value: !item["value"] ? item["value"] : portalRevisionContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function portalRevisionContractArraySerializer(
  result: Array<PortalRevisionContract>,
): any[] {
  return result.map((item) => {
    return portalRevisionContractSerializer(item);
  });
}

export function portalRevisionContractArrayDeserializer(
  result: Array<PortalRevisionContract>,
): any[] {
  return result.map((item) => {
    return portalRevisionContractDeserializer(item);
  });
}

/** A private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** A request to approve or reject a private endpoint connection */
export interface PrivateEndpointConnectionRequest {
  /** Private Endpoint Connection Resource Id. */
  id?: string;
  /** The connection state of the private endpoint connection. */
  properties?: PrivateEndpointConnectionRequestProperties;
}

export function privateEndpointConnectionRequestSerializer(
  item: PrivateEndpointConnectionRequest,
): any {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionRequestPropertiesSerializer(item["properties"]),
  };
}

/** The connection state of the private endpoint connection. */
export interface PrivateEndpointConnectionRequestProperties {
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionRequestPropertiesSerializer(
  item: PrivateEndpointConnectionRequestProperties,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends Resource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Tenant Settings. */
export interface TenantSettingsContract extends ProxyResource {
  /** Tenant settings */
  settings?: Record<string, string>;
}

export function tenantSettingsContractDeserializer(item: any): TenantSettingsContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tenantSettingsContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tenant access information contract of the API Management service. */
export interface TenantSettingsContractProperties {
  /** Tenant settings */
  settings?: Record<string, string>;
}

export function tenantSettingsContractPropertiesDeserializer(
  item: any,
): TenantSettingsContractProperties {
  return {
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Known values of {@link SettingsTypeName} that the service accepts. */
export enum KnownSettingsTypeName {
  /** public */
  Public = "public",
}

/** Type of SettingsTypeName */
export type SettingsTypeName = string;

/** Paged AccessInformation list representation. */
export interface _TenantSettingsCollection {
  /** Page values. */
  readonly value?: TenantSettingsContract[];
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _tenantSettingsCollectionDeserializer(item: any): _TenantSettingsCollection {
  return {
    value: !item["value"] ? item["value"] : tenantSettingsContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tenantSettingsContractArrayDeserializer(
  result: Array<TenantSettingsContract>,
): any[] {
  return result.map((item) => {
    return tenantSettingsContractDeserializer(item);
  });
}

/** Tenant Settings. */
export interface AccessInformationContract extends ProxyResource {
  /** Access Information type ('access' or 'gitAccess') */
  idPropertiesId?: string;
  /** Principal (User) Identifier. */
  principalId?: string;
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationContractDeserializer(item: any): AccessInformationContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessInformationContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tenant access information contract of the API Management service. */
export interface AccessInformationContractProperties {
  /** Access Information type ('access' or 'gitAccess') */
  id?: string;
  /** Principal (User) Identifier. */
  principalId?: string;
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationContractPropertiesDeserializer(
  item: any,
): AccessInformationContractProperties {
  return {
    id: item["id"],
    principalId: item["principalId"],
    enabled: item["enabled"],
  };
}

/** Known values of {@link AccessIdName} that the service accepts. */
export enum KnownAccessIdName {
  /** access */
  Access = "access",
  /** gitAccess */
  GitAccess = "gitAccess",
}

/** Type of AccessIdName */
export type AccessIdName = string;

/** Tenant access information update parameters. */
export interface AccessInformationCreateParameters {
  /** Principal (User) Identifier. */
  principalId?: string;
  /** Primary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  primaryKey?: string;
  /** Secondary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  secondaryKey?: string;
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationCreateParametersSerializer(
  item: AccessInformationCreateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["principalId", "primaryKey", "secondaryKey", "enabled"])
      ? undefined
      : _accessInformationCreateParametersPropertiesSerializer(item),
  };
}

/** Tenant access information update parameters of the API Management service */
export interface AccessInformationCreateParameterProperties {
  /** Principal (User) Identifier. */
  principalId?: string;
  /** Primary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  primaryKey?: string;
  /** Secondary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  secondaryKey?: string;
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationCreateParameterPropertiesSerializer(
  item: AccessInformationCreateParameterProperties,
): any {
  return {
    principalId: item["principalId"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    enabled: item["enabled"],
  };
}

/** Tenant access information update parameters. */
export interface AccessInformationUpdateParameters {
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationUpdateParametersSerializer(
  item: AccessInformationUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _accessInformationUpdateParametersPropertiesSerializer(item),
  };
}

/** Tenant access information update parameters of the API Management service */
export interface AccessInformationUpdateParameterProperties {
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationUpdateParameterPropertiesSerializer(
  item: AccessInformationUpdateParameterProperties,
): any {
  return { enabled: item["enabled"] };
}

/** Paged AccessInformation list representation. */
export interface _AccessInformationCollection {
  /** Page values. */
  readonly value?: AccessInformationContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  readonly nextLink?: string;
}

export function _accessInformationCollectionDeserializer(item: any): _AccessInformationCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : accessInformationContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function accessInformationContractArrayDeserializer(
  result: Array<AccessInformationContract>,
): any[] {
  return result.map((item) => {
    return accessInformationContractDeserializer(item);
  });
}

/** Tenant access information contract of the API Management service. */
export interface AccessInformationSecretsContract {
  /** Access Information type ('access' or 'gitAccess') */
  id?: string;
  /** Principal (User) Identifier. */
  principalId?: string;
  /** Primary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  primaryKey?: string;
  /** Secondary access key. This property will not be filled on 'GET' operations! Use '/listSecrets' POST request to get the value. */
  secondaryKey?: string;
  /** Determines whether direct access is enabled. */
  enabled?: boolean;
}

export function accessInformationSecretsContractDeserializer(
  item: any,
): AccessInformationSecretsContract {
  return {
    id: item["id"],
    principalId: item["principalId"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    enabled: item["enabled"],
  };
}

/** Deploy Tenant Configuration Contract. */
export interface DeployConfigurationParameters {
  /** The name of the Git branch from which the configuration is to be deployed to the configuration database. */
  branch?: string;
  /** The value enforcing deleting subscriptions to products that are deleted in this update. */
  force?: boolean;
}

export function deployConfigurationParametersSerializer(item: DeployConfigurationParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["branch", "force"])
      ? undefined
      : _deployConfigurationParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Deploy Configuration operation. */
export interface DeployConfigurationParameterProperties {
  /** The name of the Git branch from which the configuration is to be deployed to the configuration database. */
  branch: string;
  /** The value enforcing deleting subscriptions to products that are deleted in this update. */
  force?: boolean;
}

export function deployConfigurationParameterPropertiesSerializer(
  item: DeployConfigurationParameterProperties,
): any {
  return { branch: item["branch"], force: item["force"] };
}

/** Save Tenant Configuration Contract details. */
export interface SaveConfigurationParameter {
  /** The name of the Git branch in which to commit the current configuration snapshot. */
  branch?: string;
  /** The value if true, the current configuration database is committed to the Git repository, even if the Git repository has newer changes that would be overwritten. */
  force?: boolean;
}

export function saveConfigurationParameterSerializer(item: SaveConfigurationParameter): any {
  return {
    properties: areAllPropsUndefined(item, ["branch", "force"])
      ? undefined
      : _saveConfigurationParameterPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Save Tenant Configuration operation. */
export interface SaveConfigurationParameterProperties {
  /** The name of the Git branch in which to commit the current configuration snapshot. */
  branch: string;
  /** The value if true, the current configuration database is committed to the Git repository, even if the Git repository has newer changes that would be overwritten. */
  force?: boolean;
}

export function saveConfigurationParameterPropertiesSerializer(
  item: SaveConfigurationParameterProperties,
): any {
  return { branch: item["branch"], force: item["force"] };
}

/** Result of Tenant Configuration Sync State. */
export interface TenantConfigurationSyncStateContract extends ProxyResource {
  /** The name of Git branch. */
  branch?: string;
  /** The latest commit Id. */
  commitId?: string;
  /** value indicating if last sync was save (true) or deploy (false) operation. */
  isExport?: boolean;
  /** value indicating if last synchronization was later than the configuration change. */
  isSynced?: boolean;
  /** value indicating whether Git configuration access is enabled. */
  isGitEnabled?: boolean;
  /** The date of the latest synchronization. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  syncDate?: Date;
  /** The date of the latest configuration change. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  configurationChangeDate?: Date;
  /** Most recent tenant configuration operation identifier */
  lastOperationId?: string;
}

export function tenantConfigurationSyncStateContractDeserializer(
  item: any,
): TenantConfigurationSyncStateContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tenantConfigurationSyncStateContractPropertiesDeserializer(item["properties"])),
  };
}

/** Tenant Configuration Synchronization State. */
export interface TenantConfigurationSyncStateContractProperties {
  /** The name of Git branch. */
  branch?: string;
  /** The latest commit Id. */
  commitId?: string;
  /** value indicating if last sync was save (true) or deploy (false) operation. */
  isExport?: boolean;
  /** value indicating if last synchronization was later than the configuration change. */
  isSynced?: boolean;
  /** value indicating whether Git configuration access is enabled. */
  isGitEnabled?: boolean;
  /** The date of the latest synchronization. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  syncDate?: Date;
  /** The date of the latest configuration change. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  configurationChangeDate?: Date;
  /** Most recent tenant configuration operation identifier */
  lastOperationId?: string;
}

export function tenantConfigurationSyncStateContractPropertiesDeserializer(
  item: any,
): TenantConfigurationSyncStateContractProperties {
  return {
    branch: item["branch"],
    commitId: item["commitId"],
    isExport: item["isExport"],
    isSynced: item["isSynced"],
    isGitEnabled: item["isGitEnabled"],
    syncDate: !item["syncDate"] ? item["syncDate"] : new Date(item["syncDate"]),
    configurationChangeDate: !item["configurationChangeDate"]
      ? item["configurationChangeDate"]
      : new Date(item["configurationChangeDate"]),
    lastOperationId: item["lastOperationId"],
  };
}

/** User create details. */
export interface UserCreateParameters {
  /** Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. */
  state?: UserState;
  /** Optional note about a user set by the administrator. */
  note?: string;
  /** Collection of user identities. */
  identities?: UserIdentityContract[];
  /** Email address. Must not be empty and must be unique within the service instance. */
  email?: string;
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** User Password. If no value is provided, a default password is generated. */
  password?: string;
  /** Determines the type of application which send the create user request. Default is legacy portal. */
  appType?: AppType;
  /** Determines the type of confirmation e-mail that will be sent to the newly created user. */
  confirmation?: Confirmation;
}

export function userCreateParametersSerializer(item: UserCreateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "note",
      "identities",
      "email",
      "firstName",
      "lastName",
      "password",
      "appType",
      "confirmation",
    ])
      ? undefined
      : _userCreateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Create User operation. */
export interface UserCreateParameterProperties extends UserEntityBaseParameters {
  /** Email address. Must not be empty and must be unique within the service instance. */
  email: string;
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
  /** User Password. If no value is provided, a default password is generated. */
  password?: string;
  /** Determines the type of application which send the create user request. Default is legacy portal. */
  appType?: AppType;
  /** Determines the type of confirmation e-mail that will be sent to the newly created user. */
  confirmation?: Confirmation;
}

export function userCreateParameterPropertiesSerializer(item: UserCreateParameterProperties): any {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArraySerializer(item["identities"]),
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    password: item["password"],
    appType: item["appType"],
    confirmation: item["confirmation"],
  };
}

/** Known values of {@link AppType} that the service accepts. */
export enum KnownAppType {
  /** User create request was sent by legacy developer portal. */
  Portal = "portal",
  /** User create request was sent by new developer portal. */
  DeveloperPortal = "developerPortal",
}

/** Type of AppType */
export type AppType = string;

/** Determines the type of confirmation e-mail that will be sent to the newly created user. */
export enum KnownConfirmation {
  /** Send an e-mail to the user confirming they have successfully signed up. */
  Signup = "signup",
  /** Send an e-mail inviting the user to sign-up and complete registration. */
  Invite = "invite",
}

/**
 * Determines the type of confirmation e-mail that will be sent to the newly created user. \
 * {@link KnownConfirmation} can be used interchangeably with Confirmation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **signup**: Send an e-mail to the user confirming they have successfully signed up. \
 * **invite**: Send an e-mail inviting the user to sign-up and complete registration.
 */
export type Confirmation = string;

/** User update parameters. */
export interface UserUpdateParameters {
  /** Account state. Specifies whether the user is active or not. Blocked users are unable to sign into the developer portal or call any APIs of subscribed products. Default state is Active. */
  state?: UserState;
  /** Optional note about a user set by the administrator. */
  note?: string;
  /** Collection of user identities. */
  identities?: UserIdentityContract[];
  /** Email address. Must not be empty and must be unique within the service instance. */
  email?: string;
  /** User Password. */
  password?: string;
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
}

export function userUpdateParametersSerializer(item: UserUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "note",
      "identities",
      "email",
      "password",
      "firstName",
      "lastName",
    ])
      ? undefined
      : _userUpdateParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Update User operation. */
export interface UserUpdateParametersProperties extends UserEntityBaseParameters {
  /** Email address. Must not be empty and must be unique within the service instance. */
  email?: string;
  /** User Password. */
  password?: string;
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
}

export function userUpdateParametersPropertiesSerializer(
  item: UserUpdateParametersProperties,
): any {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArraySerializer(item["identities"]),
    email: item["email"],
    password: item["password"],
    firstName: item["firstName"],
    lastName: item["lastName"],
  };
}

/** Generate SSO Url operations response details. */
export interface GenerateSsoUrlResult {
  /** Redirect Url containing the SSO URL value. */
  value?: string;
}

export function generateSsoUrlResultDeserializer(item: any): GenerateSsoUrlResult {
  return {
    value: item["value"],
  };
}

/** Get User Token parameters. */
export interface UserTokenParameters {
  /** The Key to be used to generate token for user. */
  keyType?: KeyType;
  /** The Expiry time of the Token. Maximum token expiry time is set to 30 days. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expiry?: Date;
}

export function userTokenParametersSerializer(item: UserTokenParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["keyType", "expiry"])
      ? undefined
      : _userTokenParametersPropertiesSerializer(item),
  };
}

/** Parameters supplied to the Get User Token operation. */
export interface UserTokenParameterProperties {
  /** The Key to be used to generate token for user. */
  keyType: KeyType;
  /** The Expiry time of the Token. Maximum token expiry time is set to 30 days. The date conforms to the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. */
  expiry: Date;
}

export function userTokenParameterPropertiesSerializer(item: UserTokenParameterProperties): any {
  return { keyType: item["keyType"], expiry: item["expiry"].toISOString() };
}

/** Get User Token response details. */
export interface UserTokenResult {
  /** Shared Access Authorization token for the User. */
  value?: string;
}

export function userTokenResultDeserializer(item: any): UserTokenResult {
  return {
    value: item["value"],
  };
}

/** List of Users Identity list representation. */
export interface _UserIdentityCollection {
  /** User Identity values. */
  value?: UserIdentityContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _userIdentityCollectionDeserializer(item: any): _UserIdentityCollection {
  return {
    value: !item["value"] ? item["value"] : userIdentityContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

/** A single API Management WorkspaceLinks in List or Get response. */
export interface ApiManagementWorkspaceLinksResource extends ProxyResource {
  /** ETag of the resource. */
  readonly etag?: string;
  /** The link to the API Management service workspace. */
  workspaceId?: string;
  /** The array of linked gateways. */
  gateways?: WorkspaceLinksGateway[];
}

export function apiManagementWorkspaceLinksResourceDeserializer(
  item: any,
): ApiManagementWorkspaceLinksResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._apiManagementWorkspaceLinksResourcePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Properties of an API Management workspaceLinks resource. */
export interface ApiManagementWorkspaceLinksProperties extends WorkspaceLinksBaseProperties {}

export function apiManagementWorkspaceLinksPropertiesDeserializer(
  item: any,
): ApiManagementWorkspaceLinksProperties {
  return {
    workspaceId: item["workspaceId"],
    gateways: !item["gateways"]
      ? item["gateways"]
      : workspaceLinksGatewayArrayDeserializer(item["gateways"]),
  };
}

/** model interface WorkspaceLinksBaseProperties */
export interface WorkspaceLinksBaseProperties {
  /** The link to the API Management service workspace. */
  workspaceId?: string;
  /** The array of linked gateways. */
  gateways?: WorkspaceLinksGateway[];
}

export function workspaceLinksBasePropertiesDeserializer(item: any): WorkspaceLinksBaseProperties {
  return {
    workspaceId: item["workspaceId"],
    gateways: !item["gateways"]
      ? item["gateways"]
      : workspaceLinksGatewayArrayDeserializer(item["gateways"]),
  };
}

export function workspaceLinksGatewayArrayDeserializer(
  result: Array<WorkspaceLinksGateway>,
): any[] {
  return result.map((item) => {
    return workspaceLinksGatewayDeserializer(item);
  });
}

/** model interface WorkspaceLinksGateway */
export interface WorkspaceLinksGateway {
  /** The link to the API Management gateway. */
  id?: string;
}

export function workspaceLinksGatewayDeserializer(item: any): WorkspaceLinksGateway {
  return {
    id: item["id"],
  };
}

/** The response of the List API Management WorkspaceLink operation. */
export interface _ApiManagementWorkspaceLinksListResult {
  /** Result of the List API Management WorkspaceLinks operation. */
  value: ApiManagementWorkspaceLinksResource[];
  /** Link to the next set of results. Not empty if Value contains incomplete list of API Management services. */
  nextLink?: string;
}

export function _apiManagementWorkspaceLinksListResultDeserializer(
  item: any,
): _ApiManagementWorkspaceLinksListResult {
  return {
    value: apiManagementWorkspaceLinksResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiManagementWorkspaceLinksResourceArrayDeserializer(
  result: Array<ApiManagementWorkspaceLinksResource>,
): any[] {
  return result.map((item) => {
    return apiManagementWorkspaceLinksResourceDeserializer(item);
  });
}

/** Workspace details. */
export interface WorkspaceContract extends ProxyResource {
  /** Name of the workspace. */
  displayName?: string;
  /** Description of the workspace. */
  description?: string;
}

export function workspaceContractSerializer(item: WorkspaceContract): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "description"])
      ? undefined
      : _workspaceContractPropertiesSerializer(item),
  };
}

export function workspaceContractDeserializer(item: any): WorkspaceContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceContractPropertiesDeserializer(item["properties"])),
  };
}

/** Workspace entity properties. */
export interface WorkspaceContractProperties {
  /** Name of the workspace. */
  displayName: string;
  /** Description of the workspace. */
  description?: string;
}

export function workspaceContractPropertiesSerializer(item: WorkspaceContractProperties): any {
  return { displayName: item["displayName"], description: item["description"] };
}

export function workspaceContractPropertiesDeserializer(item: any): WorkspaceContractProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
  };
}

/** Paged workspace list representation. */
export interface _WorkspaceCollection {
  /** Page values. */
  value?: WorkspaceContract[];
  /** Total record count number across all pages. */
  count?: number;
  /** Next page link if any. */
  nextLink?: string;
}

export function _workspaceCollectionDeserializer(item: any): _WorkspaceCollection {
  return {
    value: !item["value"] ? item["value"] : workspaceContractArrayDeserializer(item["value"]),
    count: item["count"],
    nextLink: item["nextLink"],
  };
}

export function workspaceContractArraySerializer(result: Array<WorkspaceContract>): any[] {
  return result.map((item) => {
    return workspaceContractSerializer(item);
  });
}

export function workspaceContractArrayDeserializer(result: Array<WorkspaceContract>): any[] {
  return result.map((item) => {
    return workspaceContractDeserializer(item);
  });
}

/** API Export result. */
export interface ApiExportResult {
  /** ResourceId of the API which was exported. */
  id?: string;
  /** Format in which the API Details are exported to the Storage Blob with Sas Key valid for 5 minutes. */
  exportResultFormat?: ExportResultFormat;
  /** The object defining the schema of the exported API Detail */
  value?: ApiExportResultValue;
}

export function apiExportResultDeserializer(item: any): ApiExportResult {
  return {
    id: item["id"],
    exportResultFormat: item["format"],
    value: !item["value"] ? item["value"] : apiExportResultValueDeserializer(item["value"]),
  };
}

/** Format in which the API Details are exported to the Storage Blob with Sas Key valid for 5 minutes. */
export enum KnownExportResultFormat {
  /** The API Definition is exported in OpenAPI Specification 2.0 format to the Storage Blob. */
  Swagger = "swagger-link-json",
  /** Export the API Definition in WADL Schema to Storage Blob. */
  Wadl = "wadl-link-json",
  /** The API Definition is exported in WSDL Schema to Storage Blob. This is only supported for APIs of Type `soap` */
  Wsdl = "wsdl-link+xml",
  /** Export the API Definition in OpenAPI Specification 3.0 to Storage Blob. */
  OpenApi = "openapi-link",
}

/**
 * Format in which the API Details are exported to the Storage Blob with Sas Key valid for 5 minutes. \
 * {@link KnownExportResultFormat} can be used interchangeably with ExportResultFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **swagger-link-json**: The API Definition is exported in OpenAPI Specification 2.0 format to the Storage Blob. \
 * **wadl-link-json**: Export the API Definition in WADL Schema to Storage Blob. \
 * **wsdl-link+xml**: The API Definition is exported in WSDL Schema to Storage Blob. This is only supported for APIs of Type `soap` \
 * **openapi-link**: Export the API Definition in OpenAPI Specification 3.0 to Storage Blob.
 */
export type ExportResultFormat = string;

/** The object defining the schema of the exported API Detail */
export interface ApiExportResultValue {
  /** Link to the Storage Blob containing the result of the export operation. The Blob Uri is only valid for 5 minutes. */
  link?: string;
}

export function apiExportResultValueDeserializer(item: any): ApiExportResultValue {
  return {
    link: item["link"],
  };
}

/** The List Resource Skus operation response. */
export interface _ApiManagementSkusResult {
  /** The list of skus available for the subscription. */
  value: ApiManagementSku[];
  /** The URI to fetch the next page of Resource Skus. Call ListNext() with this URI to fetch the next page of Resource Skus */
  readonly nextLink?: string;
}

export function _apiManagementSkusResultDeserializer(item: any): _ApiManagementSkusResult {
  return {
    value: apiManagementSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiManagementSkuArrayDeserializer(result: Array<ApiManagementSku>): any[] {
  return result.map((item) => {
    return apiManagementSkuDeserializer(item);
  });
}

/** Describes an available ApiManagement SKU. */
export interface ApiManagementSku {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** The name of SKU. */
  readonly name?: string;
  /** Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** */
  readonly tier?: string;
  /** The Size of the SKU. */
  readonly size?: string;
  /** The Family of this particular SKU. */
  readonly family?: string;
  /** The Kind of resources that are supported in this SKU. */
  readonly kind?: string;
  /** Specifies the number of virtual machines in the scale set. */
  readonly capacity?: ApiManagementSkuCapacity;
  /** The set of locations that the SKU is available. */
  readonly locations?: string[];
  /** A list of locations and availability zones in those locations where the SKU is available. */
  readonly locationInfo?: ApiManagementSkuLocationInfo[];
  /** The api versions that support this SKU. */
  readonly apiVersions?: string[];
  /** Metadata for retrieving price info. */
  readonly costs?: ApiManagementSkuCosts[];
  /** A name value pair to describe the capability. */
  readonly capabilities?: ApiManagementSkuCapabilities[];
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  readonly restrictions?: ApiManagementSkuRestrictions[];
}

export function apiManagementSkuDeserializer(item: any): ApiManagementSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    kind: item["kind"],
    capacity: !item["capacity"]
      ? item["capacity"]
      : apiManagementSkuCapacityDeserializer(item["capacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : apiManagementSkuLocationInfoArrayDeserializer(item["locationInfo"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    costs: !item["costs"] ? item["costs"] : apiManagementSkuCostsArrayDeserializer(item["costs"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : apiManagementSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : apiManagementSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

/** Describes scaling information of a SKU. */
export interface ApiManagementSkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: ApiManagementSkuCapacityScaleType;
}

export function apiManagementSkuCapacityDeserializer(item: any): ApiManagementSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export type ApiManagementSkuCapacityScaleType = "Automatic" | "Manual" | "None";

export function apiManagementSkuLocationInfoArrayDeserializer(
  result: Array<ApiManagementSkuLocationInfo>,
): any[] {
  return result.map((item) => {
    return apiManagementSkuLocationInfoDeserializer(item);
  });
}

/** model interface ApiManagementSkuLocationInfo */
export interface ApiManagementSkuLocationInfo {
  /** Location of the SKU */
  readonly location?: string;
  /** List of availability zones where the SKU is supported. */
  readonly zones?: string[];
  /** Details of capabilities available to a SKU in specific zones. */
  readonly zoneDetails?: ApiManagementSkuZoneDetails[];
}

export function apiManagementSkuLocationInfoDeserializer(item: any): ApiManagementSkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : apiManagementSkuZoneDetailsArrayDeserializer(item["zoneDetails"]),
  };
}

export function apiManagementSkuZoneDetailsArrayDeserializer(
  result: Array<ApiManagementSkuZoneDetails>,
): any[] {
  return result.map((item) => {
    return apiManagementSkuZoneDetailsDeserializer(item);
  });
}

/** Describes The zonal capabilities of a SKU. */
export interface ApiManagementSkuZoneDetails {
  /** The set of zones that the SKU is available in with the specified capabilities. */
  readonly name?: string[];
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  readonly capabilities?: ApiManagementSkuCapabilities[];
}

export function apiManagementSkuZoneDetailsDeserializer(item: any): ApiManagementSkuZoneDetails {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : apiManagementSkuCapabilitiesArrayDeserializer(item["capabilities"]),
  };
}

export function apiManagementSkuCapabilitiesArrayDeserializer(
  result: Array<ApiManagementSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return apiManagementSkuCapabilitiesDeserializer(item);
  });
}

/** Describes The SKU capabilities object. */
export interface ApiManagementSkuCapabilities {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

export function apiManagementSkuCapabilitiesDeserializer(item: any): ApiManagementSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function apiManagementSkuCostsArrayDeserializer(
  result: Array<ApiManagementSkuCosts>,
): any[] {
  return result.map((item) => {
    return apiManagementSkuCostsDeserializer(item);
  });
}

/** Describes metadata for retrieving price info. */
export interface ApiManagementSkuCosts {
  /** Used for querying price from commerce. */
  readonly meterID?: string;
  /** The multiplier is needed to extend the base metered cost. */
  readonly quantity?: number;
  /** An invariant to show the extended unit. */
  readonly extendedUnit?: string;
}

export function apiManagementSkuCostsDeserializer(item: any): ApiManagementSkuCosts {
  return {
    meterID: item["meterID"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

export function apiManagementSkuRestrictionsArrayDeserializer(
  result: Array<ApiManagementSkuRestrictions>,
): any[] {
  return result.map((item) => {
    return apiManagementSkuRestrictionsDeserializer(item);
  });
}

/** Describes scaling information of a SKU. */
export interface ApiManagementSkuRestrictions {
  /** The type of restrictions. */
  readonly type?: ApiManagementSkuRestrictionsType;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  readonly values?: string[];
  /** The information about the restriction where the SKU cannot be used. */
  readonly restrictionInfo?: ApiManagementSkuRestrictionInfo;
  /** The reason for restriction. */
  readonly reasonCode?: ApiManagementSkuRestrictionsReasonCode;
}

export function apiManagementSkuRestrictionsDeserializer(item: any): ApiManagementSkuRestrictions {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    restrictionInfo: !item["restrictionInfo"]
      ? item["restrictionInfo"]
      : apiManagementSkuRestrictionInfoDeserializer(item["restrictionInfo"]),
    reasonCode: item["reasonCode"],
  };
}

/** The type of restrictions. */
export type ApiManagementSkuRestrictionsType = "Location" | "Zone";

/** model interface ApiManagementSkuRestrictionInfo */
export interface ApiManagementSkuRestrictionInfo {
  /** Locations where the SKU is restricted */
  readonly locations?: string[];
  /** List of availability zones where the SKU is restricted. */
  readonly zones?: string[];
}

export function apiManagementSkuRestrictionInfoDeserializer(
  item: any,
): ApiManagementSkuRestrictionInfo {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The reason for restriction. */
export type ApiManagementSkuRestrictionsReasonCode = "QuotaId" | "NotAvailableForSubscription";

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** Known values of {@link PolicyExportFormat} that the service accepts. */
export enum KnownPolicyExportFormat {
  /** The contents are inline and Content type is an XML document. */
  Xml = "xml",
  /** The contents are inline and Content type is a non XML encoded policy document. */
  Rawxml = "rawxml",
}

/** Type of PolicyExportFormat */
export type PolicyExportFormat = string;

/** Known values of {@link KeyVaultRefreshState} that the service accepts. */
export enum KnownKeyVaultRefreshState {
  /** Entities for which KeyVault refresh failed. */
  True = "true",
  /** Entities for which KeyVault refresh succeeded */
  False = "false",
}

/** Type of KeyVaultRefreshState */
export type KeyVaultRefreshState = string;
/** Type of PolicyScopeContract */
export type PolicyScopeContract = "Tenant" | "Product" | "Api" | "Operation" | "All";

/** Known values of {@link ConfigurationIdName} that the service accepts. */
export enum KnownConfigurationIdName {
  /** configuration */
  Configuration = "configuration",
}

/** Type of ConfigurationIdName */
export type ConfigurationIdName = string;

/** Known values of {@link ExportFormat} that the service accepts. */
export enum KnownExportFormat {
  /** Export the Api Definition in OpenAPI 2.0 Specification as JSON document to the Storage Blob. */
  Swagger = "swagger-link",
  /** Export the Api Definition in WSDL Schema to Storage Blob. This is only supported for APIs of Type `soap` */
  Wsdl = "wsdl-link",
  /** Export the Api Definition in WADL Schema to Storage Blob. */
  Wadl = "wadl-link",
  /** Export the Api Definition in OpenAPI 3.0 Specification as YAML document to Storage Blob. */
  Openapi = "openapi-link",
  /** Export the Api Definition in OpenAPI 3.0 Specification as JSON document to Storage Blob. */
  OpenapiJson = "openapi+json-link",
}

/** Type of ExportFormat */
export type ExportFormat = string;

/** Known values of {@link ExportApi} that the service accepts. */
export enum KnownExportApi {
  /** true */
  True = "true",
}

/** Type of ExportApi */
export type ExportApi = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01-preview API version. */
  V20250301Preview = "2025-03-01-preview",
}

export function networkStatusContractByLocationArrayDeserializer(
  result: Array<NetworkStatusContractByLocation>,
): any[] {
  return result.map((item) => {
    return networkStatusContractByLocationDeserializer(item);
  });
}

export function _apiContractPropertiesSerializer(item: ApiContract): any {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsSerializer(item["apiVersionSet"]),
  };
}

export function _apiContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractDeserializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractDeserializer(item["subscriptionKeyParameterNames"]),
    apiType: item["type"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    isOnline: item["isOnline"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"]
      ? item["contact"]
      : apiContactInformationDeserializer(item["contact"]),
    license: !item["license"]
      ? item["license"]
      : apiLicenseInformationDeserializer(item["license"]),
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsDeserializer(item["apiVersionSet"]),
    provisioningState: item["provisioningState"],
  };
}

export function _apiCreateOrUpdateParameterPropertiesSerializer(
  item: ApiCreateOrUpdateParameter,
): any {
  return {
    sourceApiId: item["sourceApiId"],
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    apiVersionSet: !item["apiVersionSet"]
      ? item["apiVersionSet"]
      : apiVersionSetContractDetailsSerializer(item["apiVersionSet"]),
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    value: item["value"],
    format: item["format"],
    wsdlSelector: !item["wsdlSelector"]
      ? item["wsdlSelector"]
      : apiCreateOrUpdatePropertiesWsdlSelectorSerializer(item["wsdlSelector"]),
    apiType: item["soapApiType"],
    translateRequiredQueryParameters: item["translateRequiredQueryParametersConduct"],
  };
}

export function _apiUpdateContractPropertiesSerializer(item: ApiUpdateContract): any {
  return {
    description: item["description"],
    authenticationSettings: !item["authenticationSettings"]
      ? item["authenticationSettings"]
      : authenticationSettingsContractSerializer(item["authenticationSettings"]),
    subscriptionKeyParameterNames: !item["subscriptionKeyParameterNames"]
      ? item["subscriptionKeyParameterNames"]
      : subscriptionKeyParameterNamesContractSerializer(item["subscriptionKeyParameterNames"]),
    type: item["apiType"],
    apiRevision: item["apiRevision"],
    apiVersion: item["apiVersion"],
    isCurrent: item["isCurrent"],
    apiRevisionDescription: item["apiRevisionDescription"],
    apiVersionDescription: item["apiVersionDescription"],
    apiVersionSetId: item["apiVersionSetId"],
    subscriptionRequired: item["subscriptionRequired"],
    termsOfServiceUrl: item["termsOfServiceUrl"],
    contact: !item["contact"] ? item["contact"] : apiContactInformationSerializer(item["contact"]),
    license: !item["license"] ? item["license"] : apiLicenseInformationSerializer(item["license"]),
    displayName: item["displayName"],
    serviceUrl: item["serviceUrl"],
    path: item["path"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
  };
}

export function _apiReleaseContractPropertiesSerializer(item: ApiReleaseContract): any {
  return { apiId: item["apiId"], notes: item["notes"] };
}

export function _apiReleaseContractPropertiesDeserializer(item: any) {
  return {
    apiId: item["apiId"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    updatedDateTime: !item["updatedDateTime"]
      ? item["updatedDateTime"]
      : new Date(item["updatedDateTime"]),
    notes: item["notes"],
  };
}

export function _operationContractPropertiesSerializer(item: OperationContract): any {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArraySerializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractSerializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArraySerializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

export function _operationContractPropertiesDeserializer(item: any) {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArrayDeserializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractDeserializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArrayDeserializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

export function _operationUpdateContractPropertiesSerializer(item: OperationUpdateContract): any {
  return {
    templateParameters: !item["templateParameters"]
      ? item["templateParameters"]
      : parameterContractArraySerializer(item["templateParameters"]),
    description: item["description"],
    request: !item["request"] ? item["request"] : requestContractSerializer(item["request"]),
    responses: !item["responses"]
      ? item["responses"]
      : responseContractArraySerializer(item["responses"]),
    policies: item["policies"],
    displayName: item["displayName"],
    method: item["method"],
    urlTemplate: item["urlTemplate"],
  };
}

export function _policyContractPropertiesSerializer(item: PolicyContract): any {
  return { value: item["value"], format: item["format"] };
}

export function _policyContractPropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    format: item["format"],
  };
}

export function _tagContractPropertiesSerializer(item: TagContract): any {
  return { displayName: item["displayName"] };
}

export function _tagContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
  };
}

export function _tagCreateUpdateParametersPropertiesSerializer(
  item: TagCreateUpdateParameters,
): any {
  return { displayName: item["displayName"] };
}

export function _tagCreateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
  };
}

export function _schemaContractPropertiesDocumentSerializer(item: SchemaContractProperties): any {
  return { value: item["value"], definitions: item["definitions"], components: item["components"] };
}

export function _schemaContractPropertiesDocumentDeserializer(item: any) {
  return {
    value: item["value"],
    definitions: item["definitions"],
    components: item["components"],
  };
}

export function _schemaContractPropertiesSerializer(item: SchemaContract): any {
  return {
    contentType: item["contentType"],
    document: !item["document"]
      ? item["document"]
      : schemaDocumentPropertiesSerializer(item["document"]),
  };
}

export function _schemaContractPropertiesDeserializer(item: any) {
  return {
    contentType: item["contentType"],
    document: !item["document"]
      ? item["document"]
      : schemaDocumentPropertiesDeserializer(item["document"]),
    provisioningState: item["provisioningState"],
  };
}

export function _diagnosticContractPropertiesSerializer(item: DiagnosticContract): any {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsSerializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsSerializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsSerializer(item["backend"]),
    largeLanguageModel: !item["largeLanguageModel"]
      ? item["largeLanguageModel"]
      : llmDiagnosticSettingsSerializer(item["largeLanguageModel"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

export function _diagnosticContractPropertiesDeserializer(item: any) {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsDeserializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsDeserializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsDeserializer(item["backend"]),
    largeLanguageModel: !item["largeLanguageModel"]
      ? item["largeLanguageModel"]
      : llmDiagnosticSettingsDeserializer(item["largeLanguageModel"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

export function _diagnosticUpdateContractPropertiesSerializer(item: DiagnosticUpdateContract): any {
  return {
    alwaysLog: item["alwaysLog"],
    loggerId: item["loggerId"],
    sampling: !item["sampling"] ? item["sampling"] : samplingSettingsSerializer(item["sampling"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : pipelineDiagnosticSettingsSerializer(item["frontend"]),
    backend: !item["backend"]
      ? item["backend"]
      : pipelineDiagnosticSettingsSerializer(item["backend"]),
    logClientIp: item["logClientIp"],
    httpCorrelationProtocol: item["httpCorrelationProtocol"],
    verbosity: item["verbosity"],
    operationNameFormat: item["operationNameFormat"],
    metrics: item["metrics"],
  };
}

export function _issueContractPropertiesSerializer(item: IssueContract): any {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

export function _issueContractPropertiesDeserializer(item: any) {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

export function _wikiContractPropertiesSerializer(item: WikiContract): any {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArraySerializer(item["documents"]),
  };
}

export function _wikiContractPropertiesDeserializer(item: any) {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArrayDeserializer(item["documents"]),
  };
}

export function _wikiUpdateContractPropertiesSerializer(item: WikiUpdateContract): any {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArraySerializer(item["documents"]),
  };
}

export function _wikiUpdateContractPropertiesDeserializer(item: any) {
  return {
    documents: !item["documents"]
      ? item["documents"]
      : wikiDocumentationContractArrayDeserializer(item["documents"]),
  };
}

export function _apiVersionSetContractPropertiesSerializer(item: ApiVersionSetContract): any {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

export function _apiVersionSetContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

export function _apiVersionSetUpdateParametersPropertiesSerializer(
  item: ApiVersionSetUpdateParameters,
): any {
  return {
    description: item["description"],
    versionQueryName: item["versionQueryName"],
    versionHeaderName: item["versionHeaderName"],
    displayName: item["displayName"],
    versioningScheme: item["versioningScheme"],
  };
}

export function _backendContractPropertiesSerializer(item: BackendContract): any {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesSerializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractSerializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractSerializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesSerializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerSerializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolSerializer(item["pool"]),
    type: item["typePropertiesType"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

export function _backendContractPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesDeserializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractDeserializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractDeserializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesDeserializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerDeserializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolDeserializer(item["pool"]),
    typePropertiesType: item["type"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

export function _backendUpdateParametersPropertiesSerializer(item: BackendUpdateParameters): any {
  return {
    title: item["title"],
    description: item["description"],
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : backendPropertiesSerializer(item["properties"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : backendCredentialsContractSerializer(item["credentials"]),
    proxy: !item["proxy"] ? item["proxy"] : backendProxyContractSerializer(item["proxy"]),
    tls: !item["tls"] ? item["tls"] : backendTlsPropertiesSerializer(item["tls"]),
    circuitBreaker: !item["circuitBreaker"]
      ? item["circuitBreaker"]
      : backendCircuitBreakerSerializer(item["circuitBreaker"]),
    azureRegion: item["azureRegion"],
    pool: !item["pool"] ? item["pool"] : backendBaseParametersPoolSerializer(item["pool"]),
    type: item["type"],
    url: item["url"],
    protocol: item["protocol"],
  };
}

export function _certificateContractPropertiesDeserializer(item: any) {
  return {
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractPropertiesDeserializer(item["keyVault"]),
  };
}

export function _certificateCreateOrUpdateParametersPropertiesSerializer(
  item: CertificateCreateOrUpdateParameters,
): any {
  return {
    data: item["data"],
    password: item["password"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

export function _groupContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    builtIn: item["builtIn"],
    typePropertiesType: item["type"],
    externalId: item["externalId"],
  };
}

export function _groupCreateParametersPropertiesSerializer(item: GroupCreateParameters): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    type: item["type"],
    externalId: item["externalId"],
  };
}

export function _groupUpdateParametersPropertiesSerializer(item: GroupUpdateParameters): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    type: item["type"],
    externalId: item["externalId"],
  };
}

export function _loggerContractPropertiesSerializer(item: LoggerContract): any {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: item["credentials"],
    isBuffered: item["isBuffered"],
    resourceId: item["resourceId"],
  };
}

export function _loggerContractPropertiesDeserializer(item: any) {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : Object.fromEntries(
          Object.entries(item["credentials"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isBuffered: item["isBuffered"],
    resourceId: item["resourceId"],
  };
}

export function _loggerUpdateContractPropertiesSerializer(item: LoggerUpdateContract): any {
  return {
    loggerType: item["loggerType"],
    description: item["description"],
    credentials: item["credentials"],
    isBuffered: item["isBuffered"],
  };
}

export function _namedValueContractPropertiesDeserializer(item: any) {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractPropertiesDeserializer(item["keyVault"]),
    provisioningState: item["provisioningState"],
  };
}

export function _namedValueCreateContractPropertiesSerializer(item: NamedValueCreateContract): any {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

export function _namedValueUpdateParametersPropertiesSerializer(
  item: NamedValueUpdateParameters,
): any {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    secret: item["secret"],
    displayName: item["displayName"],
    value: item["value"],
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultContractCreatePropertiesSerializer(item["keyVault"]),
  };
}

export function _notificationContractPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    description: item["description"],
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientsContractPropertiesDeserializer(item["recipients"]),
  };
}

export function _policyFragmentContractPropertiesSerializer(item: PolicyFragmentContract): any {
  return { value: item["value"], description: item["description"], format: item["format"] };
}

export function _policyFragmentContractPropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    description: item["description"],
    format: item["format"],
    provisioningState: item["provisioningState"],
  };
}

export function _portalSigninSettingsPropertiesSerializer(item: PortalSigninSettings): any {
  return { enabled: item["enabled"] };
}

export function _portalSigninSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
  };
}

export function _portalSignupSettingsPropertiesSerializer(item: PortalSignupSettings): any {
  return {
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesSerializer(item["termsOfService"]),
  };
}

export function _portalSignupSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesDeserializer(item["termsOfService"]),
  };
}

export function _portalDelegationSettingsPropertiesSerializer(item: PortalDelegationSettings): any {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesSerializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesSerializer(item["userRegistration"]),
  };
}

export function _portalDelegationSettingsPropertiesDeserializer(item: any) {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesDeserializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesDeserializer(item["userRegistration"]),
  };
}

export function _productContractPropertiesSerializer(item: ProductContract): any {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationSerializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

export function _productContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationDeserializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

export function _productUpdateParametersPropertiesSerializer(item: ProductUpdateParameters): any {
  return {
    description: item["description"],
    terms: item["terms"],
    subscriptionRequired: item["subscriptionRequired"],
    approvalRequired: item["approvalRequired"],
    subscriptionsLimit: item["subscriptionsLimit"],
    authenticationType: !item["authenticationType"]
      ? item["authenticationType"]
      : item["authenticationType"].map((p: any) => {
          return p;
        }),
    application: !item["application"]
      ? item["application"]
      : productEntityBaseParametersApplicationSerializer(item["application"]),
    state: item["state"],
    displayName: item["displayName"],
  };
}

export function _productApiLinkContractPropertiesSerializer(item: ProductApiLinkContract): any {
  return { apiId: item["apiId"] };
}

export function _productApiLinkContractPropertiesDeserializer(item: any) {
  return {
    apiId: item["apiId"],
  };
}

export function _productGroupLinkContractPropertiesSerializer(item: ProductGroupLinkContract): any {
  return { groupId: item["groupId"] };
}

export function _productGroupLinkContractPropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
  };
}

export function _globalSchemaContractPropertiesSerializer(item: GlobalSchemaContract): any {
  return {
    schemaType: item["schemaType"],
    description: item["description"],
    value: item["value"],
    document: item["document"],
  };
}

export function _globalSchemaContractPropertiesDeserializer(item: any) {
  return {
    schemaType: item["schemaType"],
    description: item["description"],
    value: item["value"],
    document: item["document"],
    provisioningState: item["provisioningState"],
  };
}

export function _subscriptionContractPropertiesDeserializer(item: any) {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    displayName: item["displayName"],
    state: item["state"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    notificationDate: !item["notificationDate"]
      ? item["notificationDate"]
      : new Date(item["notificationDate"]),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    stateComment: item["stateComment"],
    allowTracing: item["allowTracing"],
  };
}

export function _subscriptionCreateParametersPropertiesSerializer(
  item: SubscriptionCreateParameters,
): any {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    displayName: item["displayName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    state: item["state"],
    allowTracing: item["allowTracing"],
  };
}

export function _subscriptionUpdateParametersPropertiesSerializer(
  item: SubscriptionUpdateParameters,
): any {
  return {
    ownerId: item["ownerId"],
    scope: item["scope"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
    displayName: item["displayName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    state: item["state"],
    stateComment: item["stateComment"],
    allowTracing: item["allowTracing"],
  };
}

export function _tagApiLinkContractPropertiesSerializer(item: TagApiLinkContract): any {
  return { apiId: item["apiId"] };
}

export function _tagApiLinkContractPropertiesDeserializer(item: any) {
  return {
    apiId: item["apiId"],
  };
}

export function _tagOperationLinkContractPropertiesSerializer(item: TagOperationLinkContract): any {
  return { operationId: item["operationId"] };
}

export function _tagOperationLinkContractPropertiesDeserializer(item: any) {
  return {
    operationId: item["operationId"],
  };
}

export function _tagProductLinkContractPropertiesSerializer(item: TagProductLinkContract): any {
  return { productId: item["productId"] };
}

export function _tagProductLinkContractPropertiesDeserializer(item: any) {
  return {
    productId: item["productId"],
  };
}

export function _apiManagementGatewayResourcePropertiesSerializer(
  item: ApiManagementGatewayResource,
): any {
  return {
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationSerializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationSerializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiSerializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

export function _apiManagementGatewayResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationDeserializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationDeserializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiDeserializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

export function _apiManagementGatewayUpdateParametersPropertiesSerializer(
  item: ApiManagementGatewayUpdateParameters,
): any {
  return {
    frontend: !item["frontend"]
      ? item["frontend"]
      : frontendConfigurationSerializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : backendConfigurationSerializer(item["backend"]),
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : gatewayConfigurationApiSerializer(item["configurationApi"]),
    virtualNetworkType: item["virtualNetworkType"],
  };
}

export function _apiManagementServiceResourcePropertiesSerializer(
  item: ApiManagementServiceResource,
): any {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArraySerializer(item["hostnameConfigurations"]),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiSerializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArraySerializer(item["additionalLocations"]),
    customProperties: item["customProperties"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArraySerializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintSerializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArraySerializer(item["privateEndpointConnections"]),
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

export function _apiManagementServiceResourcePropertiesDeserializer(item: any) {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    provisioningState: item["provisioningState"],
    targetProvisioningState: item["targetProvisioningState"],
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    gatewayUrl: item["gatewayUrl"],
    gatewayRegionalUrl: item["gatewayRegionalUrl"],
    portalUrl: item["portalUrl"],
    managementApiUrl: item["managementApiUrl"],
    scmUrl: item["scmUrl"],
    developerPortalUrl: item["developerPortalUrl"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArrayDeserializer(item["hostnameConfigurations"]),
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : item["publicIPAddresses"].map((p: any) => {
          return p;
        }),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : item["privateIPAddresses"].map((p: any) => {
          return p;
        }),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiDeserializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArrayDeserializer(item["additionalLocations"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : Object.fromEntries(
          Object.entries(item["customProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArrayDeserializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    outboundPublicIPAddresses: !item["outboundPublicIPAddresses"]
      ? item["outboundPublicIPAddresses"]
      : item["outboundPublicIPAddresses"].map((p: any) => {
          return p;
        }),
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintDeserializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArrayDeserializer(item["privateEndpointConnections"]),
    platformVersion: item["platformVersion"],
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

export function _remotePrivateEndpointConnectionWrapperPropertiesSerializer(
  item: RemotePrivateEndpointConnectionWrapper,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _remotePrivateEndpointConnectionWrapperPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _apiManagementServiceUpdateParametersPropertiesSerializer(
  item: ApiManagementServiceUpdateParameters,
): any {
  return {
    notificationSenderEmail: item["notificationSenderEmail"],
    hostnameConfigurations: !item["hostnameConfigurations"]
      ? item["hostnameConfigurations"]
      : hostnameConfigurationArraySerializer(item["hostnameConfigurations"]),
    publicIpAddressId: item["publicIpAddressId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    configurationApi: !item["configurationApi"]
      ? item["configurationApi"]
      : configurationApiSerializer(item["configurationApi"]),
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    additionalLocations: !item["additionalLocations"]
      ? item["additionalLocations"]
      : additionalLocationArraySerializer(item["additionalLocations"]),
    customProperties: item["customProperties"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateConfigurationArraySerializer(item["certificates"]),
    enableClientCertificate: item["enableClientCertificate"],
    natGatewayState: item["natGatewayState"],
    disableGateway: item["disableGateway"],
    virtualNetworkType: item["virtualNetworkType"],
    apiVersionConstraint: !item["apiVersionConstraint"]
      ? item["apiVersionConstraint"]
      : apiVersionConstraintSerializer(item["apiVersionConstraint"]),
    restore: item["restore"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : remotePrivateEndpointConnectionWrapperArraySerializer(item["privateEndpointConnections"]),
    legacyPortalStatus: item["legacyPortalStatus"],
    developerPortalStatus: item["developerPortalStatus"],
    releaseChannel: item["releaseChannel"],
    zoneRedundant: item["zoneRedundant"],
    publisherEmail: item["publisherEmail"],
    publisherName: item["publisherName"],
  };
}

export function _allPoliciesContractPropertiesDeserializer(item: any) {
  return {
    referencePolicyId: item["referencePolicyId"],
    complianceState: item["complianceState"],
  };
}

export function _policyDescriptionContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    scope: item["scope"],
  };
}

export function _operationResultContractPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    status: item["status"],
    started: !item["started"] ? item["started"] : new Date(item["started"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    resultInfo: item["resultInfo"],
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
    actionLog: !item["actionLog"]
      ? item["actionLog"]
      : operationResultLogItemContractArrayDeserializer(item["actionLog"]),
  };
}

export function _portalSettingsContractPropertiesDeserializer(item: any) {
  return {
    url: item["url"],
    validationKey: item["validationKey"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : subscriptionsDelegationSettingsPropertiesDeserializer(item["subscriptions"]),
    userRegistration: !item["userRegistration"]
      ? item["userRegistration"]
      : registrationDelegationSettingsPropertiesDeserializer(item["userRegistration"]),
    enabled: item["enabled"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServicePropertiesDeserializer(item["termsOfService"]),
  };
}

export function _quotaCounterValueUpdateContractPropertiesSerializer(
  item: QuotaCounterValueUpdateContract,
): any {
  return { callsCount: item["callsCount"], kbTransferred: item["kbTransferred"] };
}

export function _quotaCounterValueUpdateContractPropertiesDeserializer(item: any) {
  return {
    callsCount: item["callsCount"],
    kbTransferred: item["kbTransferred"],
  };
}

export function _resolverContractPropertiesSerializer(item: ResolverContract): any {
  return { displayName: item["displayName"], path: item["path"], description: item["description"] };
}

export function _resolverContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    path: item["path"],
    description: item["description"],
  };
}

export function _resolverUpdateContractPropertiesSerializer(item: ResolverUpdateContract): any {
  return { displayName: item["displayName"], path: item["path"], description: item["description"] };
}

export function _issueUpdateContractPropertiesSerializer(item: IssueUpdateContract): any {
  return {
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    state: item["state"],
    apiId: item["apiId"],
    title: item["title"],
    description: item["description"],
    userId: item["userId"],
  };
}

export function _issueCommentContractPropertiesSerializer(item: IssueCommentContract): any {
  return {
    text: item["text"],
    createdDate: !item["createdDate"] ? item["createdDate"] : item["createdDate"].toISOString(),
    userId: item["userId"],
  };
}

export function _issueCommentContractPropertiesDeserializer(item: any) {
  return {
    text: item["text"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    userId: item["userId"],
  };
}

export function _issueAttachmentContractPropertiesSerializer(item: IssueAttachmentContract): any {
  return { title: item["title"], contentFormat: item["contentFormat"], content: item["content"] };
}

export function _issueAttachmentContractPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    contentFormat: item["contentFormat"],
    content: item["content"],
  };
}

export function _tagDescriptionContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
    tagId: item["tagId"],
    displayName: item["displayName"],
  };
}

export function _tagDescriptionCreateParametersPropertiesSerializer(
  item: TagDescriptionCreateParameters,
): any {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
  };
}

export function _tagDescriptionCreateParametersPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    externalDocsUrl: item["externalDocsUrl"],
    externalDocsDescription: item["externalDocsDescription"],
  };
}

export function _toolContractPropertiesSerializer(item: ToolContract): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    operationId: item["operationId"],
  };
}

export function _toolContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    operationId: item["operationId"],
  };
}

export function _authorizationProviderContractPropertiesSerializer(
  item: AuthorizationProviderContract,
): any {
  return {
    displayName: item["displayName"],
    identityProvider: item["identityProvider"],
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : authorizationProviderOAuth2SettingsSerializer(item["oauth2"]),
  };
}

export function _authorizationProviderContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    identityProvider: item["identityProvider"],
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : authorizationProviderOAuth2SettingsDeserializer(item["oauth2"]),
  };
}

export function _authorizationContractPropertiesSerializer(item: AuthorizationContract): any {
  return {
    authorizationType: item["authorizationType"],
    oauth2grantType: item["oAuth2GrantType"],
    parameters: item["parameters"],
    error: !item["error"] ? item["error"] : authorizationErrorSerializer(item["error"]),
    status: item["status"],
  };
}

export function _authorizationContractPropertiesDeserializer(item: any) {
  return {
    authorizationType: item["authorizationType"],
    oAuth2GrantType: item["oauth2grantType"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    error: !item["error"] ? item["error"] : authorizationErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

export function _authorizationAccessPolicyContractPropertiesSerializer(
  item: AuthorizationAccessPolicyContract,
): any {
  return {
    appIds: !item["appIds"]
      ? item["appIds"]
      : item["appIds"].map((p: any) => {
          return p;
        }),
    tenantId: item["tenantId"],
    objectId: item["objectId"],
  };
}

export function _authorizationAccessPolicyContractPropertiesDeserializer(item: any) {
  return {
    appIds: !item["appIds"]
      ? item["appIds"]
      : item["appIds"].map((p: any) => {
          return p;
        }),
    tenantId: item["tenantId"],
    objectId: item["objectId"],
  };
}

export function _authorizationServerContractPropertiesSerializer(
  item: AuthorizationServerContract,
): any {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArraySerializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : item["grantTypes"].map((p: any) => {
          return p;
        }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

export function _authorizationServerContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArrayDeserializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : item["grantTypes"].map((p: any) => {
          return p;
        }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

export function _authorizationServerUpdateContractPropertiesSerializer(
  item: AuthorizationServerUpdateContract,
): any {
  return {
    description: item["description"],
    authorizationMethods: !item["authorizationMethods"]
      ? item["authorizationMethods"]
      : item["authorizationMethods"].map((p: any) => {
          return p;
        }),
    clientAuthenticationMethod: !item["clientAuthenticationMethod"]
      ? item["clientAuthenticationMethod"]
      : item["clientAuthenticationMethod"].map((p: any) => {
          return p;
        }),
    tokenBodyParameters: !item["tokenBodyParameters"]
      ? item["tokenBodyParameters"]
      : tokenBodyParameterContractArraySerializer(item["tokenBodyParameters"]),
    tokenEndpoint: item["tokenEndpoint"],
    supportState: item["supportState"],
    defaultScope: item["defaultScope"],
    bearerTokenSendingMethods: !item["bearerTokenSendingMethods"]
      ? item["bearerTokenSendingMethods"]
      : item["bearerTokenSendingMethods"].map((p: any) => {
          return p;
        }),
    resourceOwnerUsername: item["resourceOwnerUsername"],
    resourceOwnerPassword: item["resourceOwnerPassword"],
    displayName: item["displayName"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
    clientRegistrationEndpoint: item["clientRegistrationEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    grantTypes: !item["grantTypes"]
      ? item["grantTypes"]
      : item["grantTypes"].map((p: any) => {
          return p;
        }),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

export function _backendReconnectContractPropertiesSerializer(item: BackendReconnectContract): any {
  return { after: item["after"] };
}

export function _cacheContractPropertiesSerializer(item: CacheContract): any {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

export function _cacheContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

export function _cacheUpdateParametersPropertiesSerializer(item: CacheUpdateParameters): any {
  return {
    description: item["description"],
    connectionString: item["connectionString"],
    useFromLocation: item["useFromLocation"],
    resourceId: item["resourceId"],
  };
}

export function _contentTypeContractPropertiesSerializer(item: ContentTypeContract): any {
  return {
    id: item["idPropertiesId"],
    name: item["namePropertiesName"],
    description: item["description"],
    schema: item["schema"],
    version: item["version"],
  };
}

export function _contentTypeContractPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    namePropertiesName: item["name"],
    description: item["description"],
    schema: item["schema"],
    version: item["version"],
  };
}

export function _deletedServiceContractPropertiesDeserializer(item: any) {
  return {
    serviceId: item["serviceId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
  };
}

export function _documentationContractPropertiesSerializer(item: DocumentationContract): any {
  return { title: item["title"], content: item["content"] };
}

export function _documentationContractPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    content: item["content"],
  };
}

export function _documentationUpdateContractPropertiesSerializer(
  item: DocumentationUpdateContract,
): any {
  return { title: item["title"], content: item["content"] };
}

export function _documentationUpdateContractPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    content: item["content"],
  };
}

export function _emailTemplateContractPropertiesDeserializer(item: any) {
  return {
    subject: item["subject"],
    body: item["body"],
    title: item["title"],
    description: item["description"],
    isDefault: item["isDefault"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emailTemplateParametersContractPropertiesArrayDeserializer(item["parameters"]),
  };
}

export function _emailTemplateUpdateParametersPropertiesSerializer(
  item: EmailTemplateUpdateParameters,
): any {
  return {
    subject: item["subject"],
    title: item["title"],
    description: item["description"],
    body: item["body"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emailTemplateParametersContractPropertiesArraySerializer(item["parameters"]),
  };
}

export function _apiManagementGatewayConfigConnectionResourcePropertiesSerializer(
  item: ApiManagementGatewayConfigConnectionResource,
): any {
  return {
    sourceId: item["sourceId"],
    hostnames: !item["hostnames"]
      ? item["hostnames"]
      : item["hostnames"].map((p: any) => {
          return p;
        }),
  };
}

export function _apiManagementGatewayConfigConnectionResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    sourceId: item["sourceId"],
    defaultHostname: item["defaultHostname"],
    hostnames: !item["hostnames"]
      ? item["hostnames"]
      : item["hostnames"].map((p: any) => {
          return p;
        }),
  };
}

export function _gatewayHostnameBindingResourcePropertiesSerializer(
  item: GatewayHostnameBindingResource,
): any {
  return {
    hostname: item["hostname"],
    keyVault: gatewayHostnameBindingKeyVaultSerializer(item["keyVault"]),
  };
}

export function _gatewayHostnameBindingResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    hostname: item["hostname"],
    keyVault: gatewayHostnameBindingKeyVaultDeserializer(item["keyVault"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : gatewayHostnameBindingCertificateDeserializer(item["certificate"]),
  };
}

export function _gatewayContractPropertiesSerializer(item: GatewayContract): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : resourceLocationDataContractSerializer(item["locationData"]),
    description: item["description"],
  };
}

export function _gatewayContractPropertiesDeserializer(item: any) {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : resourceLocationDataContractDeserializer(item["locationData"]),
    description: item["description"],
  };
}

export function _associationContractPropertiesSerializer(item: AssociationContract): any {
  return { provisioningState: item["provisioningState"] };
}

export function _gatewayHostnameConfigurationContractPropertiesSerializer(
  item: GatewayHostnameConfigurationContract,
): any {
  return {
    hostname: item["hostname"],
    certificateId: item["certificateId"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    tls10Enabled: item["tls10Enabled"],
    tls11Enabled: item["tls11Enabled"],
    http2Enabled: item["http2Enabled"],
  };
}

export function _gatewayHostnameConfigurationContractPropertiesDeserializer(item: any) {
  return {
    hostname: item["hostname"],
    certificateId: item["certificateId"],
    negotiateClientCertificate: item["negotiateClientCertificate"],
    tls10Enabled: item["tls10Enabled"],
    tls11Enabled: item["tls11Enabled"],
    http2Enabled: item["http2Enabled"],
  };
}

export function _gatewayCertificateAuthorityContractPropertiesSerializer(
  item: GatewayCertificateAuthorityContract,
): any {
  return { isTrusted: item["isTrusted"] };
}

export function _gatewayCertificateAuthorityContractPropertiesDeserializer(item: any) {
  return {
    isTrusted: item["isTrusted"],
  };
}

export function _userContractPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArrayDeserializer(item["identities"]),
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    registrationDate: !item["registrationDate"]
      ? item["registrationDate"]
      : new Date(item["registrationDate"]),
    groups: !item["groups"]
      ? item["groups"]
      : groupContractPropertiesArrayDeserializer(item["groups"]),
  };
}

export function _identityProviderContractPropertiesDeserializer(item: any) {
  return {
    typePropertiesType: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

export function _identityProviderCreateContractPropertiesSerializer(
  item: IdentityProviderCreateContract,
): any {
  return {
    type: item["typePropertiesType"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

export function _identityProviderUpdateParametersPropertiesSerializer(
  item: IdentityProviderUpdateParameters,
): any {
  return {
    type: item["type"],
    signinTenant: item["signinTenant"],
    allowedTenants: !item["allowedTenants"]
      ? item["allowedTenants"]
      : item["allowedTenants"].map((p: any) => {
          return p;
        }),
    authority: item["authority"],
    signupPolicyName: item["signupPolicyName"],
    signinPolicyName: item["signinPolicyName"],
    profileEditingPolicyName: item["profileEditingPolicyName"],
    passwordResetPolicyName: item["passwordResetPolicyName"],
    clientLibrary: item["clientLibrary"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    certificateId: item["certificateId"],
  };
}

export function _recipientUserContractPropertiesDeserializer(item: any) {
  return {
    userId: item["userId"],
  };
}

export function _recipientEmailContractPropertiesDeserializer(item: any) {
  return {
    email: item["email"],
  };
}

export function _openidConnectProviderContractPropertiesSerializer(
  item: OpenidConnectProviderContract,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

export function _openidConnectProviderContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

export function _openidConnectProviderUpdateContractPropertiesSerializer(
  item: OpenidConnectProviderUpdateContract,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    metadataEndpoint: item["metadataEndpoint"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    useInTestConsole: item["useInTestConsole"],
    useInApiDocumentation: item["useInApiDocumentation"],
  };
}

export function _policyRestrictionContractPropertiesSerializer(
  item: PolicyRestrictionContract,
): any {
  return { scope: item["scope"], requireBase: item["requireBase"] };
}

export function _policyRestrictionContractPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    requireBase: item["requireBase"],
  };
}

export function _policyRestrictionUpdateContractPropertiesSerializer(
  item: PolicyRestrictionUpdateContract,
): any {
  return { scope: item["scope"], requireBase: item["requireBase"] };
}

export function _policyRestrictionUpdateContractPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    requireBase: item["requireBase"],
  };
}

export function _portalConfigContractPropertiesSerializer(item: PortalConfigContract): any {
  return {
    enableBasicAuth: item["enableBasicAuth"],
    signin: !item["signin"]
      ? item["signin"]
      : portalConfigPropertiesSigninSerializer(item["signin"]),
    signup: !item["signup"]
      ? item["signup"]
      : portalConfigPropertiesSignupSerializer(item["signup"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : portalConfigDelegationPropertiesSerializer(item["delegation"]),
    cors: !item["cors"] ? item["cors"] : portalConfigCorsPropertiesSerializer(item["cors"]),
    csp: !item["csp"] ? item["csp"] : portalConfigCspPropertiesSerializer(item["csp"]),
  };
}

export function _portalConfigContractPropertiesDeserializer(item: any) {
  return {
    enableBasicAuth: item["enableBasicAuth"],
    signin: !item["signin"]
      ? item["signin"]
      : portalConfigPropertiesSigninDeserializer(item["signin"]),
    signup: !item["signup"]
      ? item["signup"]
      : portalConfigPropertiesSignupDeserializer(item["signup"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : portalConfigDelegationPropertiesDeserializer(item["delegation"]),
    cors: !item["cors"] ? item["cors"] : portalConfigCorsPropertiesDeserializer(item["cors"]),
    csp: !item["csp"] ? item["csp"] : portalConfigCspPropertiesDeserializer(item["csp"]),
  };
}

export function _clientApplicationContractPropertiesSerializer(
  item: ClientApplicationContract,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    ownerId: item["ownerId"],
  };
}

export function _clientApplicationContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    ownerId: item["ownerId"],
    entraApplicationId: item["entraApplicationId"],
    entraTenantId: item["entraTenantId"],
    state: item["state"],
  };
}

export function _clientApplicationProductLinkContractPropertiesSerializer(
  item: ClientApplicationProductLinkContract,
): any {
  return { productId: item["productId"] };
}

export function _clientApplicationProductLinkContractPropertiesDeserializer(item: any) {
  return {
    productId: item["productId"],
  };
}

export function _portalRevisionContractPropertiesSerializer(item: PortalRevisionContract): any {
  return { description: item["description"], isCurrent: item["isCurrent"] };
}

export function _portalRevisionContractPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    statusDetails: item["statusDetails"],
    status: item["status"],
    isCurrent: item["isCurrent"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    updatedDateTime: !item["updatedDateTime"]
      ? item["updatedDateTime"]
      : new Date(item["updatedDateTime"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _tenantSettingsContractPropertiesDeserializer(item: any) {
  return {
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _accessInformationContractPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    principalId: item["principalId"],
    enabled: item["enabled"],
  };
}

export function _accessInformationCreateParametersPropertiesSerializer(
  item: AccessInformationCreateParameters,
): any {
  return {
    principalId: item["principalId"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    enabled: item["enabled"],
  };
}

export function _accessInformationUpdateParametersPropertiesSerializer(
  item: AccessInformationUpdateParameters,
): any {
  return { enabled: item["enabled"] };
}

export function _deployConfigurationParametersPropertiesSerializer(
  item: DeployConfigurationParameters,
): any {
  return { branch: item["branch"], force: item["force"] };
}

export function _saveConfigurationParameterPropertiesSerializer(
  item: SaveConfigurationParameter,
): any {
  return { branch: item["branch"], force: item["force"] };
}

export function _tenantConfigurationSyncStateContractPropertiesDeserializer(item: any) {
  return {
    branch: item["branch"],
    commitId: item["commitId"],
    isExport: item["isExport"],
    isSynced: item["isSynced"],
    isGitEnabled: item["isGitEnabled"],
    syncDate: !item["syncDate"] ? item["syncDate"] : new Date(item["syncDate"]),
    configurationChangeDate: !item["configurationChangeDate"]
      ? item["configurationChangeDate"]
      : new Date(item["configurationChangeDate"]),
    lastOperationId: item["lastOperationId"],
  };
}

export function _userCreateParametersPropertiesSerializer(item: UserCreateParameters): any {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArraySerializer(item["identities"]),
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    password: item["password"],
    appType: item["appType"],
    confirmation: item["confirmation"],
  };
}

export function _userUpdateParametersPropertiesSerializer(item: UserUpdateParameters): any {
  return {
    state: item["state"],
    note: item["note"],
    identities: !item["identities"]
      ? item["identities"]
      : userIdentityContractArraySerializer(item["identities"]),
    email: item["email"],
    password: item["password"],
    firstName: item["firstName"],
    lastName: item["lastName"],
  };
}

export function _userTokenParametersPropertiesSerializer(item: UserTokenParameters): any {
  return {
    keyType: item["keyType"],
    expiry: !item["expiry"] ? item["expiry"] : item["expiry"].toISOString(),
  };
}

export function _apiManagementWorkspaceLinksResourcePropertiesDeserializer(item: any) {
  return {
    workspaceId: item["workspaceId"],
    gateways: !item["gateways"]
      ? item["gateways"]
      : workspaceLinksGatewayArrayDeserializer(item["gateways"]),
  };
}

export function _workspaceContractPropertiesSerializer(item: WorkspaceContract): any {
  return { displayName: item["displayName"], description: item["description"] };
}

export function _workspaceContractPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
  };
}

export type NetworkStatusListByServiceResponse = { body: NetworkStatusContractByLocation[] };
