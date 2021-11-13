// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  RestResponse
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { logger, createSpan, SDK_VERSION } from "./utils";
import { ShortCodesClient as ShortCodesGeneratedClient } from "./generated/src";
import { ShortCodes as GeneratedClient } from "./generated/src/operations";
import {
  ShortCode,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief
} from "./generated/src/models/";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  DeleteUSProgramBriefOptions,
  GetUSProgramBriefOptions,
  ListShortCodesOptions,
  ListUSProgramBriefsOptions,
  SubmitUSProgramBriefOptions
} from "./models";

/**
 * Client options used to configure the ShortCodesClient API requests.
 */
export interface ShortCodesClientOptions extends PipelineOptions {}

const isShortCodesClientOptions = (options: any): options is ShortCodesClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class ShortCodesClient {
  /**
   * A reference to the auto-generated ShortCodes HTTP client.
   */
  private readonly client: GeneratedClient;

  public constructor(connectionString: string, options?: ShortCodesClientOptions);

  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: ShortCodesClientOptions
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: ShortCodesClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | ShortCodesClientOptions,
    maybeOptions: ShortCodesClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isShortCodesClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;
    const libInfo = `azsdk-js-communication-short-codes/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new ShortCodesGeneratedClient(url, pipeline).shortCodes;
  }

  public listShortCodes(
    options: ListShortCodesOptions = {}
  ): PagedAsyncIterableIterator<ShortCode> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-listShortCodes", options);
    try {
      return this.client.listShortCodes(updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async upsertUSProgramBrief(
    programBriefId: string,
    options: ShortCodesUpsertUSProgramBriefOptionalParams = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-upsertUSProgramBrief", options);
    try {
      return await this.client.upsertUSProgramBrief(programBriefId, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async deleteUSProgramBrief(
    programBriefId: string,
    options?: DeleteUSProgramBriefOptions
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-deleteUSProgramBrief", options);
    try {
      return await this.client.deleteUSProgramBrief(programBriefId, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getUSProgramBrief(
    programBriefId: string,
    options?: GetUSProgramBriefOptions
  ): Promise<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-getUSProgramBrief", options);
    try {
      return await this.client.getUSProgramBrief(programBriefId, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public listUSProgramBriefs(
    options: ListUSProgramBriefsOptions = {}
  ): PagedAsyncIterableIterator<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-listUSProgramBriefs", options);
    try {
      return this.client.listUSProgramBriefs(updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async submitUSProgramBrief(
    programBriefId: string,
    options?: SubmitUSProgramBriefOptions
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-submitUSProgramBrief", options);
    try {
      return await this.client.submitUSProgramBrief(programBriefId, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
