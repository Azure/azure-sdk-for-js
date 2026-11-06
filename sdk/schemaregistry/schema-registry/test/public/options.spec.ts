// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdditionalPolicyConfig } from "@azure-rest/core-client";
import type {
  HttpClient,
  PipelineOptions,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";
import type { OperationTracingOptions } from "@azure/core-tracing";
import type {
  FullOperationResponse,
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  OperationOptions,
  OperationRequestOptions,
  RawResponseCallback,
  RegisterSchemaOptions,
  SchemaRegistryClientOptions,
  SerializerOptions,
  XmlOptions,
} from "../../src/index.js";
import { describe, expectTypeOf, it } from "vitest";

// Snapshot the classic option shapes without retaining a dependency on core-client.
interface LegacyXmlOptions {
  rootName?: string;
  includeRoot?: boolean;
  xmlCharKey?: string;
}

interface LegacySerializerOptions {
  xml: LegacyXmlOptions;
  ignoreUnknownProperties?: boolean;
}

interface LegacyFullOperationResponse extends PipelineResponse {
  parsedHeaders?: { [key: string]: unknown };
  parsedBody?: any;
  request: PipelineRequest;
}

type LegacyRawResponseCallback = (
  rawResponse: LegacyFullOperationResponse,
  flatResponse: unknown,
  error?: unknown,
) => void;

interface LegacyOperationRequestOptions {
  customHeaders?: { [key: string]: string };
  timeout?: number;
  onUploadProgress?: (progress: TransferProgressEvent) => void;
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
  allowInsecureConnection?: boolean;
}

interface LegacyOperationOptions {
  abortSignal?: NonNullable<PipelineRequest["abortSignal"]>;
  requestOptions?: LegacyOperationRequestOptions;
  tracingOptions?: OperationTracingOptions;
  serializerOptions?: LegacySerializerOptions;
  onResponse?: LegacyRawResponseCallback;
}

interface LegacyClientOptions extends PipelineOptions {
  httpClient?: HttpClient;
  allowInsecureConnection?: boolean;
  additionalPolicies?: AdditionalPolicyConfig[];
  apiVersion?: string;
}

describe("option type compatibility", () => {
  it("preserves all classic client options", () => {
    expectTypeOf<SchemaRegistryClientOptions>().toEqualTypeOf<LegacyClientOptions>();
  });

  it("preserves classic operation options on every method", () => {
    expectTypeOf<OperationOptions>().toEqualTypeOf<LegacyOperationOptions>();
    expectTypeOf<RegisterSchemaOptions>().toEqualTypeOf<LegacyOperationOptions>();
    expectTypeOf<GetSchemaPropertiesOptions>().toEqualTypeOf<LegacyOperationOptions>();
    expectTypeOf<GetSchemaOptions>().toEqualTypeOf<LegacyOperationOptions>();
    expectTypeOf<OperationRequestOptions>().toEqualTypeOf<LegacyOperationRequestOptions>();
  });

  it("preserves required XML options and optional XML properties", () => {
    expectTypeOf<SerializerOptions>().toEqualTypeOf<LegacySerializerOptions>();
    expectTypeOf<XmlOptions>().toEqualTypeOf<LegacyXmlOptions>();
    expectTypeOf<SerializerOptions>().toEqualTypeOf<{
      xml: XmlOptions;
      ignoreUnknownProperties?: boolean;
    }>();
  });

  it("preserves callback parameters and the permissive parsed body", () => {
    expectTypeOf<FullOperationResponse>().toEqualTypeOf<LegacyFullOperationResponse>();
    expectTypeOf<RawResponseCallback>().toEqualTypeOf<LegacyRawResponseCallback>();
    expectTypeOf<Parameters<RawResponseCallback>>().toEqualTypeOf<
      [rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown]
    >();
    expectTypeOf<FullOperationResponse["parsedBody"]>().toBeAny();
  });
});
