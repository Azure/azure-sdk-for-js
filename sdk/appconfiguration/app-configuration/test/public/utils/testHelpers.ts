// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient, AppConfigurationClientOptions } from "../../../src";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ConfigurationSetting,
  ListConfigurationSettingPage,
  ListRevisionsPage,
} from "../../../src";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isPlaybackMode,
  record,
} from "@azure-tools/test-recorder";
import { assert } from "chai";

import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { RestError } from "@azure/core-rest-pipeline";
import { HttpMethods, ProxySettings } from "@azure/core-rest-pipeline";
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders as HttpHeadersV2, PipelineRequest } from "@azure/core-rest-pipeline";

let connectionStringNotPresentWarning = false;
let tokenCredentialsNotPresentWarning = false;

export interface CredsAndEndpoint {
  credential: TokenCredential;
  endpoint: string;
}

export function startRecorder(that: Mocha.Context): Recorder {
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      APPCONFIG_CONNECTION_STRING:
        "Endpoint=https://myappconfig.azconfig.io;Id=123456;Secret=123456",
      AZ_CONFIG_ENDPOINT: "https://myappconfig.azconfig.io",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azuretenantid",
    },
    customizationsOnRecordings: [],
    queryParametersToSkip: [],
  };

  return record(that, recorderEnvSetup);
}

export function getTokenAuthenticationCredential(): CredsAndEndpoint | undefined {
  const requiredEnvironmentVariables = [
    "AZ_CONFIG_ENDPOINT",
    "AZURE_CLIENT_ID",
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_SECRET",
  ];

  for (const name of requiredEnvironmentVariables) {
    const value = env[name];

    if (value == null) {
      if (tokenCredentialsNotPresentWarning) {
        tokenCredentialsNotPresentWarning = true;
        console.log("Functional tests not running - set client identity variables to activate");
      }

      return undefined;
    }
  }

  return {
    credential: new DefaultAzureCredential(),
    endpoint: env["AZ_CONFIG_ENDPOINT"]!,
  };
}

export function createAppConfigurationClientForTests<
  Options extends AppConfigurationClientOptions = AppConfigurationClientOptions
>(options?: Options): AppConfigurationClient | undefined {
  const connectionString = env["APPCONFIG_CONNECTION_STRING"];

  if (connectionString == null) {
    if (!connectionStringNotPresentWarning) {
      connectionStringNotPresentWarning = true;
      console.log(
        "Functional tests not running - set APPCONFIG_CONNECTION_STRING to a valid AppConfig connection string to activate"
      );
    }
    return undefined;
  }

  return new AppConfigurationClient(connectionString, options);
}

export async function deleteKeyCompletely(
  keys: string[],
  client: AppConfigurationClient
): Promise<void> {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    if (setting.isReadOnly) {
      await client.setReadOnly(setting, false);
    }

    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

export async function toSortedArray(
  pagedIterator: PagedAsyncIterableIterator<
    ConfigurationSetting,
    ListConfigurationSettingPage | ListRevisionsPage
  >,
  compareFn?: (a: ConfigurationSetting, b: ConfigurationSetting) => number
): Promise<ConfigurationSetting[]> {
  const settings: ConfigurationSetting[] = [];

  for await (const setting of pagedIterator) {
    settings.push(setting);
  }

  let settingsViaPageIterator: ConfigurationSetting[] = [];

  for await (const page of pagedIterator.byPage()) {
    settingsViaPageIterator = settingsViaPageIterator.concat(page.items);
  }

  // just a sanity-check
  assert.deepEqual(settings, settingsViaPageIterator);

  settings.sort((a, b) =>
    compareFn
      ? compareFn(a, b)
      : `${a.key}-${a.label}-${a.value}`.localeCompare(`${b.key}-${b.label}-${b.value}`)
  );

  return settings;
}

export function assertEqualSettings(
  expected: Pick<ConfigurationSetting, "key" | "value" | "label" | "isReadOnly">[],
  actual: ConfigurationSetting[]
): void {
  actual = actual.map((setting) => {
    return {
      key: setting.key,
      label: setting.label || undefined,
      value: setting.value,
      isReadOnly: setting.isReadOnly,
    };
  });

  assert.deepEqual(expected, actual);
}

export async function assertThrowsRestError(
  testFunction: () => Promise<any>,
  expectedStatusCode: number,
  message: string = ""
): Promise<Error> {
  try {
    await testFunction();
    assert.fail(`${message}: No error thrown`);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw new Error("Error is not recognized");
    }
    if (err.name === "RestError") {
      const restError = err as RestError;
      assert.equal(expectedStatusCode, restError.statusCode, message);
      return err;
    }

    assert.fail(`${message}: Caught error but wasn't a RestError: ${err}`);
  }

  return new Error("We won't reach this - both cases above throw because of assert.fail()");
}

export async function assertThrowsAbortError(
  testFunction: () => Promise<any>,
  message = ""
): Promise<Error> {
  try {
    await testFunction();
    assert.fail(`${message}: No error thrown`);
  } catch (e) {
    if (!(e instanceof Error)) {
      throw new Error("Error is not recognized");
    }
    if (isPlaybackMode() && (e.name === "FetchError" || e.name === "AbortError")) {
      return e;
    } else {
      assert.equal(e.name, "AbortError");
      return e;
    }
  }
}



export function toWebResourceLike(request: PipelineRequest): WebResourceLike {
  return {
    url: request.url,
    method: request.method,
    headers: toHttpHeaderLike(request.headers),
    withCredentials: request.withCredentials,
    timeout: request.timeout,
    requestId: request.headers.get("x-ms-client-request-id") || "",
  };
}

export function toHttpHeaderLike(headers: HttpHeadersV2): HttpHeadersLike {
  return new HttpHeaders(headers.toJSON({ preserveCase: true }));
}

/**
 * A collection of HttpHeaders that can be sent with a HTTP request.
 */
function getHeaderKey(headerName: string): string {
  return headerName.toLowerCase();
}

/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
  /**
   * The name of the header.
   */
  name: string;

  /**
   * The value of the header.
   */
  value: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A collection of HTTP header key/value pairs.
 */
export interface HttpHeadersLike {
  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName - The name of the header to set. This value is case-insensitive.
   * @param headerValue - The value of the header to set.
   */
  set(headerName: string, headerValue: string | number): void;
  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName - The name of the header.
   */
  get(headerName: string): string | undefined;
  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  contains(headerName: string): boolean;
  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName - The name of the header to remove.
   */
  remove(headerName: string): boolean;
  /**
   * Get the headers that are contained this collection as an object.
   */
  rawHeaders(): RawHttpHeaders;
  /**
   * Get the headers that are contained in this collection as an array.
   */
  headersArray(): HttpHeader[];
  /**
   * Get the header names that are contained in this collection.
   */
  headerNames(): string[];
  /**
   * Get the header values that are contained in this collection.
   */
  headerValues(): string[];
  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  clone(): HttpHeadersLike;
  /**
   * Get the JSON object representation of this HTTP header collection.
   * The result is the same as `rawHeaders()`.
   */
  toJson(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * A collection of HTTP header key/value pairs.
 */
export class HttpHeaders implements HttpHeadersLike {
  private readonly _headersMap: { [headerKey: string]: HttpHeader };

  constructor(rawHeaders?: RawHttpHeaders) {
    this._headersMap = {};
    if (rawHeaders) {
      for (const headerName in rawHeaders) {
        this.set(headerName, rawHeaders[headerName]);
      }
    }
  }

  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName - The name of the header to set. This value is case-insensitive.
   * @param headerValue - The value of the header to set.
   */
  public set(headerName: string, headerValue: string | number): void {
    this._headersMap[getHeaderKey(headerName)] = {
      name: headerName,
      value: headerValue.toString(),
    };
  }

  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName - The name of the header.
   */
  public get(headerName: string): string | undefined {
    const header: HttpHeader = this._headersMap[getHeaderKey(headerName)];
    return !header ? undefined : header.value;
  }

  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  public contains(headerName: string): boolean {
    return !!this._headersMap[getHeaderKey(headerName)];
  }

  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName - The name of the header to remove.
   */
  public remove(headerName: string): boolean {
    const result: boolean = this.contains(headerName);
    delete this._headersMap[getHeaderKey(headerName)];
    return result;
  }

  /**
   * Get the headers that are contained this collection as an object.
   */
  public rawHeaders(): RawHttpHeaders {
    return this.toJson({ preserveCase: true });
  }

  /**
   * Get the headers that are contained in this collection as an array.
   */
  public headersArray(): HttpHeader[] {
    const headers: HttpHeader[] = [];
    for (const headerKey in this._headersMap) {
      headers.push(this._headersMap[headerKey]);
    }
    return headers;
  }

  /**
   * Get the header names that are contained in this collection.
   */
  public headerNames(): string[] {
    const headerNames: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerNames.push(headers[i].name);
    }
    return headerNames;
  }

  /**
   * Get the header values that are contained in this collection.
   */
  public headerValues(): string[] {
    const headerValues: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerValues.push(headers[i].value);
    }
    return headerValues;
  }

  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  public toJson(options: { preserveCase?: boolean } = {}): RawHttpHeaders {
    const result: RawHttpHeaders = {};
    if (options.preserveCase) {
      for (const headerKey in this._headersMap) {
        const header: HttpHeader = this._headersMap[headerKey];
        result[header.name] = header.value;
      }
    } else {
      for (const headerKey in this._headersMap) {
        const header: HttpHeader = this._headersMap[headerKey];
        result[getHeaderKey(header.name)] = header.value;
      }
    }
    return result;
  }

  /**
   * Get the string representation of this HTTP header collection.
   */
  public toString(): string {
    return JSON.stringify(this.toJson({ preserveCase: true }));
  }

  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  public clone(): HttpHeaders {
    const resultPreservingCasing: RawHttpHeaders = {};
    for (const headerKey in this._headersMap) {
      const header: HttpHeader = this._headersMap[headerKey];
      resultPreservingCasing[header.name] = header.value;
    }
    return new HttpHeaders(resultPreservingCasing);
  }
}

/**
 * A description of a HTTP request to be made to a remote server.
 */
export interface WebResourceLike {
  /**
   * The URL being accessed by the request.
   */
  url: string;
  /**
   * The HTTP method to use when making the request.
   */
  method: HttpMethods;
  /**
   * The HTTP body contents of the request.
   */
  body?: any;
  /**
   * The HTTP headers to use when making the request.
   */
  headers: HttpHeadersLike;
  /**
   * Whether or not the body of the HttpOperationResponse should be treated as a stream.
   * @deprecated Use streamResponseStatusCodes property instead.
   */
  streamResponseBody?: boolean;
  /**
   * A list of response status codes whose corresponding HttpOperationResponse body should be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;
  /**
   * Form data, used to build the request body.
   */
  formData?: any;
  /**
   * A query string represented as an object.
   */
  query?: { [key: string]: any };
  /**
   * If credentials (cookies) should be sent along during an XHR.
   */
  withCredentials: boolean;
  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   */
  timeout: number;
  /**
   * Proxy configuration.
   */
  proxySettings?: ProxySettings;
  /**
   * If the connection should be reused.
   */
  keepAlive?: boolean;
  /**
   * Whether or not to decompress response according to Accept-Encoding header (node-fetch only)
   */
  decompressResponse?: boolean;
  /**
   * A unique identifier for the request. Used for logging and tracing.
   */
  requestId: string;

  /**
   * Signal of an abort controller. Can be used to abort both sending a network request and waiting for a response.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Fired in response to upload or download progress.
 */
export type TransferProgressEvent = {
  /**
   * The number of bytes loaded so far.
   */
  loadedBytes: number;
};
