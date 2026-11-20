// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CompatResponse,
  HttpHeader,
  HttpHeadersLike,
  HttpResponseField,
  RawHttpHeaders,
  WebResourceLike,
} from "../../src/index.js";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { describe, expectTypeOf, it } from "vitest";

describe("legacy response types", () => {
  it("preserves legacy header methods and their return types", () => {
    expectTypeOf<HttpHeadersLike>().toEqualTypeOf<{
      set(headerName: string, headerValue: string | number): void;
      get(headerName: string): string | undefined;
      contains(headerName: string): boolean;
      remove(headerName: string): boolean;
      rawHeaders(): RawHttpHeaders;
      headersArray(): HttpHeader[];
      headerNames(): string[];
      headerValues(): string[];
      clone(): HttpHeadersLike;
      toJson(options?: { preserveCase?: boolean }): RawHttpHeaders;
    }>();
    expectTypeOf<RawHttpHeaders>().toEqualTypeOf<{ [headerName: string]: string }>();
    expectTypeOf<HttpHeader>().toEqualTypeOf<{ name: string; value: string }>();
  });

  it("preserves legacy request properties and recursive methods", () => {
    expectTypeOf<keyof WebResourceLike>().toEqualTypeOf<
      | "url"
      | "method"
      | "body"
      | "headers"
      | "streamResponseBody"
      | "streamResponseStatusCodes"
      | "formData"
      | "query"
      | "withCredentials"
      | "timeout"
      | "proxySettings"
      | "keepAlive"
      | "decompressResponse"
      | "requestId"
      | "abortSignal"
      | "onUploadProgress"
      | "onDownloadProgress"
      | "agent"
      | "requestOverrides"
      | "clone"
      | "validateRequestProperties"
      | "prepare"
    >();
    expectTypeOf<WebResourceLike["headers"]>().toEqualTypeOf<HttpHeadersLike>();
    expectTypeOf<WebResourceLike["clone"]>().toEqualTypeOf<() => WebResourceLike>();
    expectTypeOf<WebResourceLike["prepare"]>().toEqualTypeOf<
      (options: unknown) => WebResourceLike
    >();
    expectTypeOf<WebResourceLike["validateRequestProperties"]>().toEqualTypeOf<() => void>();
    expectTypeOf<WebResourceLike["body"]>().toBeAny();
    expectTypeOf<WebResourceLike["formData"]>().toBeAny();
    expectTypeOf<NonNullable<WebResourceLike["query"]>[string]>().toBeAny();
    expectTypeOf<WebResourceLike>().not.toMatchObjectType<{ keepAlive: boolean }>();
    expectTypeOf<WebResourceLike>().not.toMatchObjectType<{ streamResponseBody: boolean }>();
  });

  it("preserves response body and parsed header types", () => {
    expectTypeOf<
      Omit<CompatResponse, "request" | "headers" | "parsedHeaders" | "parsedBody">
    >().toEqualTypeOf<Omit<PipelineResponse, "request" | "headers">>();
    expectTypeOf<CompatResponse["request"]>().toEqualTypeOf<WebResourceLike>();
    expectTypeOf<CompatResponse["headers"]>().toEqualTypeOf<HttpHeadersLike>();
    expectTypeOf<CompatResponse["parsedHeaders"]>().toEqualTypeOf<
      { [key: string]: unknown } | undefined
    >();
    expectTypeOf<CompatResponse["parsedBody"]>().toBeAny();
    expectTypeOf<HttpResponseField<{ etag: string }>["_response"]["parsedHeaders"]>().toEqualTypeOf<
      { [key: string]: unknown } & { etag: string }
    >();
    expectTypeOf<HttpResponseField<unknown>["_response"]["bodyAsText"]>().toEqualTypeOf<string>();
  });
});
