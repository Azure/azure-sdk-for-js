import { PipelineOptions, RawHttpHeaders, PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * General options that a Rest Level Client can take
 */
export type ClientOptions = PipelineOptions & {
  credentials?: {
    scopes?: string | string[];
    apiKeyHeaderName?: string;
  };
  baseUrl?: string;
};

/**
 * Represents the shape of an HttpResponse
 */
export type HttpResponse = Omit<PipelineResponse, "headers"> & {
  /**
   * The HTTP response headers.
   */
  headers: RawHttpHeaders;
  /**
   * Parsed body
   */
  body: unknown;
};
