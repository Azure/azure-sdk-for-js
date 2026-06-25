// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Application Insights WebTest definition. */
export interface WebTest extends WebtestsResource {
  /** The kind of WebTest that this web test watches. Choices are ping, multistep and standard. */
  kind?: WebTestKind;
  /** Unique ID of this WebTest. This is typically the same value as the Name field. */
  syntheticMonitorId?: string;
  /** User defined name if this WebTest. */
  webTestName?: string;
  /** User defined description for this WebTest. */
  description?: string;
  /** Is the test actively being monitored. */
  enabled?: boolean;
  /** Interval in seconds between test runs for this WebTest. Default value is 300. */
  frequency?: number;
  /** Seconds until this WebTest will timeout and fail. Default value is 30. */
  timeout?: number;
  /** The kind of web test this is, valid choices are ping, multistep and standard. */
  webTestKind?: WebTestKind;
  /** Allow for retries should this WebTest fail. */
  retryEnabled?: boolean;
  /** A list of where to physically run the tests from to give global coverage for accessibility of your application. */
  locations?: WebTestGeolocation[];
  /** An XML configuration specification for a WebTest. */
  configuration?: WebTestPropertiesConfiguration;
  /** Current state of this component, whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
  /** The collection of request properties */
  request?: WebTestPropertiesRequest;
  /** The collection of validation rule properties */
  validationRules?: WebTestPropertiesValidationRules;
}

export function webTestSerializer(item: WebTest): any {
  return {
    location: item["location"],
    tags: item["tags"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "syntheticMonitorId",
      "webTestName",
      "description",
      "enabled",
      "frequency",
      "timeout",
      "webTestKind",
      "retryEnabled",
      "locations",
      "configuration",
      "request",
      "validationRules",
    ])
      ? undefined
      : _webTestPropertiesSerializer(item),
  };
}

export function webTestDeserializer(item: any): WebTest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    kind: item["kind"],
    ...(!item["properties"]
      ? item["properties"]
      : _webTestPropertiesDeserializer(item["properties"])),
  };
}

/** The kind of WebTest that this web test watches. Choices are ping, multistep and standard. */
export type WebTestKind = "ping" | "multistep" | "standard";

/** Metadata describing a web test for an Azure resource. */
export interface WebTestProperties {
  /** Unique ID of this WebTest. This is typically the same value as the Name field. */
  syntheticMonitorId: string;
  /** User defined name if this WebTest. */
  webTestName: string;
  /** User defined description for this WebTest. */
  description?: string;
  /** Is the test actively being monitored. */
  enabled?: boolean;
  /** Interval in seconds between test runs for this WebTest. Default value is 300. */
  frequency?: number;
  /** Seconds until this WebTest will timeout and fail. Default value is 30. */
  timeout?: number;
  /** The kind of web test this is, valid choices are ping, multistep and standard. */
  webTestKind: WebTestKind;
  /** Allow for retries should this WebTest fail. */
  retryEnabled?: boolean;
  /** A list of where to physically run the tests from to give global coverage for accessibility of your application. */
  locations: WebTestGeolocation[];
  /** An XML configuration specification for a WebTest. */
  configuration?: WebTestPropertiesConfiguration;
  /** Current state of this component, whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
  /** The collection of request properties */
  request?: WebTestPropertiesRequest;
  /** The collection of validation rule properties */
  validationRules?: WebTestPropertiesValidationRules;
}

export function webTestPropertiesSerializer(item: WebTestProperties): any {
  return {
    SyntheticMonitorId: item["syntheticMonitorId"],
    Name: item["webTestName"],
    Description: item["description"],
    Enabled: item["enabled"],
    Frequency: item["frequency"],
    Timeout: item["timeout"],
    Kind: item["webTestKind"],
    RetryEnabled: item["retryEnabled"],
    Locations: webTestGeolocationArraySerializer(item["locations"]),
    Configuration: !item["configuration"]
      ? item["configuration"]
      : webTestPropertiesConfigurationSerializer(item["configuration"]),
    Request: !item["request"]
      ? item["request"]
      : webTestPropertiesRequestSerializer(item["request"]),
    ValidationRules: !item["validationRules"]
      ? item["validationRules"]
      : webTestPropertiesValidationRulesSerializer(item["validationRules"]),
  };
}

export function webTestPropertiesDeserializer(item: any): WebTestProperties {
  return {
    syntheticMonitorId: item["SyntheticMonitorId"],
    webTestName: item["Name"],
    description: item["Description"],
    enabled: item["Enabled"],
    frequency: item["Frequency"],
    timeout: item["Timeout"],
    webTestKind: item["Kind"],
    retryEnabled: item["RetryEnabled"],
    locations: webTestGeolocationArrayDeserializer(item["Locations"]),
    configuration: !item["Configuration"]
      ? item["Configuration"]
      : webTestPropertiesConfigurationDeserializer(item["Configuration"]),
    provisioningState: item["provisioningState"],
    request: !item["Request"]
      ? item["Request"]
      : webTestPropertiesRequestDeserializer(item["Request"]),
    validationRules: !item["ValidationRules"]
      ? item["ValidationRules"]
      : webTestPropertiesValidationRulesDeserializer(item["ValidationRules"]),
  };
}

export function webTestGeolocationArraySerializer(result: Array<WebTestGeolocation>): any[] {
  return result.map((item) => {
    return webTestGeolocationSerializer(item);
  });
}

export function webTestGeolocationArrayDeserializer(result: Array<WebTestGeolocation>): any[] {
  return result.map((item) => {
    return webTestGeolocationDeserializer(item);
  });
}

/** Geo-physical location to run a WebTest from. You must specify one or more locations for the test to run from. */
export interface WebTestGeolocation {
  /** Location ID for the WebTest to run from. */
  location?: string;
}

export function webTestGeolocationSerializer(item: WebTestGeolocation): any {
  return { Id: item["location"] };
}

export function webTestGeolocationDeserializer(item: any): WebTestGeolocation {
  return {
    location: item["Id"],
  };
}

/** An XML configuration specification for a WebTest. */
export interface WebTestPropertiesConfiguration {
  /** The XML specification of a WebTest to run against an application. */
  webTest?: string;
}

export function webTestPropertiesConfigurationSerializer(
  item: WebTestPropertiesConfiguration,
): any {
  return { WebTest: item["webTest"] };
}

export function webTestPropertiesConfigurationDeserializer(
  item: any,
): WebTestPropertiesConfiguration {
  return {
    webTest: item["WebTest"],
  };
}

/** The collection of request properties */
export interface WebTestPropertiesRequest {
  /** Url location to test. */
  requestUrl?: string;
  /** List of headers and their values to add to the WebTest call. */
  headers?: HeaderField[];
  /** Http verb to use for this web test. */
  httpVerb?: string;
  /** Base64 encoded string body to send with this web test. */
  requestBody?: string;
  /** Parse Dependent request for this WebTest. */
  parseDependentRequests?: boolean;
  /** Follow redirects for this web test. */
  followRedirects?: boolean;
}

export function webTestPropertiesRequestSerializer(item: WebTestPropertiesRequest): any {
  return {
    RequestUrl: item["requestUrl"],
    Headers: !item["headers"] ? item["headers"] : headerFieldArraySerializer(item["headers"]),
    HttpVerb: item["httpVerb"],
    RequestBody: item["requestBody"],
    ParseDependentRequests: item["parseDependentRequests"],
    FollowRedirects: item["followRedirects"],
  };
}

export function webTestPropertiesRequestDeserializer(item: any): WebTestPropertiesRequest {
  return {
    requestUrl: item["RequestUrl"],
    headers: !item["Headers"] ? item["Headers"] : headerFieldArrayDeserializer(item["Headers"]),
    httpVerb: item["HttpVerb"],
    requestBody: item["RequestBody"],
    parseDependentRequests: item["ParseDependentRequests"],
    followRedirects: item["FollowRedirects"],
  };
}

export function headerFieldArraySerializer(result: Array<HeaderField>): any[] {
  return result.map((item) => {
    return headerFieldSerializer(item);
  });
}

export function headerFieldArrayDeserializer(result: Array<HeaderField>): any[] {
  return result.map((item) => {
    return headerFieldDeserializer(item);
  });
}

/** A header to add to the WebTest. */
export interface HeaderField {
  /** The name of the header. */
  headerFieldName?: string;
  /** The value of the header. */
  headerFieldValue?: string;
}

export function headerFieldSerializer(item: HeaderField): any {
  return { key: item["headerFieldName"], value: item["headerFieldValue"] };
}

export function headerFieldDeserializer(item: any): HeaderField {
  return {
    headerFieldName: item["key"],
    headerFieldValue: item["value"],
  };
}

/** The collection of validation rule properties */
export interface WebTestPropertiesValidationRules {
  /** The collection of content validation properties */
  contentValidation?: WebTestPropertiesValidationRulesContentValidation;
  /** Checks to see if the SSL cert is still valid. */
  sSLCheck?: boolean;
  /** A number of days to check still remain before the the existing SSL cert expires.  Value must be positive and the SSLCheck must be set to true. */
  sSLCertRemainingLifetimeCheck?: number;
  /** Validate that the WebTest returns the http status code provided. */
  expectedHttpStatusCode?: number;
  /** When set, validation will ignore the status code. */
  ignoreHttpStatusCode?: boolean;
}

export function webTestPropertiesValidationRulesSerializer(
  item: WebTestPropertiesValidationRules,
): any {
  return {
    ContentValidation: !item["contentValidation"]
      ? item["contentValidation"]
      : webTestPropertiesValidationRulesContentValidationSerializer(item["contentValidation"]),
    SSLCheck: item["sSLCheck"],
    SSLCertRemainingLifetimeCheck: item["sSLCertRemainingLifetimeCheck"],
    ExpectedHttpStatusCode: item["expectedHttpStatusCode"],
    IgnoreHttpStatusCode: item["ignoreHttpStatusCode"],
  };
}

export function webTestPropertiesValidationRulesDeserializer(
  item: any,
): WebTestPropertiesValidationRules {
  return {
    contentValidation: !item["ContentValidation"]
      ? item["ContentValidation"]
      : webTestPropertiesValidationRulesContentValidationDeserializer(item["ContentValidation"]),
    sSLCheck: item["SSLCheck"],
    sSLCertRemainingLifetimeCheck: item["SSLCertRemainingLifetimeCheck"],
    expectedHttpStatusCode: item["ExpectedHttpStatusCode"],
    ignoreHttpStatusCode: item["IgnoreHttpStatusCode"],
  };
}

/** The collection of content validation properties */
export interface WebTestPropertiesValidationRulesContentValidation {
  /** Content to look for in the return of the WebTest.  Must not be null or empty. */
  contentMatch?: string;
  /** When set, this value makes the ContentMatch validation case insensitive. */
  ignoreCase?: boolean;
  /** When true, validation will pass if there is a match for the ContentMatch string.  If false, validation will fail if there is a match */
  passIfTextFound?: boolean;
}

export function webTestPropertiesValidationRulesContentValidationSerializer(
  item: WebTestPropertiesValidationRulesContentValidation,
): any {
  return {
    ContentMatch: item["contentMatch"],
    IgnoreCase: item["ignoreCase"],
    PassIfTextFound: item["passIfTextFound"],
  };
}

export function webTestPropertiesValidationRulesContentValidationDeserializer(
  item: any,
): WebTestPropertiesValidationRulesContentValidation {
  return {
    contentMatch: item["ContentMatch"],
    ignoreCase: item["IgnoreCase"],
    passIfTextFound: item["PassIfTextFound"],
  };
}

/** An azure resource object */
export interface WebtestsResource {
  /** Azure resource Id */
  readonly id?: string;
  /** Azure resource name */
  readonly name?: string;
  /** Azure resource type */
  readonly type?: string;
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function webtestsResourceSerializer(item: WebtestsResource): any {
  return { location: item["location"], tags: item["tags"] };
}

export function webtestsResourceDeserializer(item: any): WebtestsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Paged collection of WebTest items */
export interface _WebTestListResult {
  /** The WebTest items on this page */
  value: WebTest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webTestListResultDeserializer(item: any): _WebTestListResult {
  return {
    value: webTestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webTestArraySerializer(result: Array<WebTest>): any[] {
  return result.map((item) => {
    return webTestSerializer(item);
  });
}

export function webTestArrayDeserializer(result: Array<WebTest>): any[] {
  return result.map((item) => {
    return webTestDeserializer(item);
  });
}

export function _webTestPropertiesSerializer(item: WebTest): any {
  return {
    SyntheticMonitorId: item["syntheticMonitorId"],
    Name: item["webTestName"],
    Description: item["description"],
    Enabled: item["enabled"],
    Frequency: item["frequency"],
    Timeout: item["timeout"],
    Kind: item["webTestKind"],
    RetryEnabled: item["retryEnabled"],
    Locations: !item["locations"]
      ? item["locations"]
      : webTestGeolocationArraySerializer(item["locations"]),
    Configuration: !item["configuration"]
      ? item["configuration"]
      : webTestPropertiesConfigurationSerializer(item["configuration"]),
    Request: !item["request"]
      ? item["request"]
      : webTestPropertiesRequestSerializer(item["request"]),
    ValidationRules: !item["validationRules"]
      ? item["validationRules"]
      : webTestPropertiesValidationRulesSerializer(item["validationRules"]),
  };
}

export function _webTestPropertiesDeserializer(item: any) {
  return {
    syntheticMonitorId: item["SyntheticMonitorId"],
    webTestName: item["Name"],
    description: item["Description"],
    enabled: item["Enabled"],
    frequency: item["Frequency"],
    timeout: item["Timeout"],
    webTestKind: item["Kind"],
    retryEnabled: item["RetryEnabled"],
    locations: !item["Locations"]
      ? item["Locations"]
      : webTestGeolocationArrayDeserializer(item["Locations"]),
    configuration: !item["Configuration"]
      ? item["Configuration"]
      : webTestPropertiesConfigurationDeserializer(item["Configuration"]),
    provisioningState: item["provisioningState"],
    request: !item["Request"]
      ? item["Request"]
      : webTestPropertiesRequestDeserializer(item["Request"]),
    validationRules: !item["ValidationRules"]
      ? item["ValidationRules"]
      : webTestPropertiesValidationRulesDeserializer(item["ValidationRules"]),
  };
}
