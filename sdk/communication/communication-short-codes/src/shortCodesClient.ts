// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import {
  AttachmentType,
  DeleteUSProgramBriefOptions,
  FileType,
  GetUSProgramBriefOptions,
  ListShortCodesOptions,
  ListUSProgramBriefsOptions,
  ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams,
  ShortCodesDeleteUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentsOptionalParams,
  SubmitUSProgramBriefOptions,
} from "./models";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  ProgramBriefAttachment,
  ShortCode,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "./generated/src/models/";
import { logger, tracingClient } from "./utils";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ShortCodesClient as ShortCodesGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
/**
 * Client options used to configure the ShortCodesClient API requests.
 */
export interface ShortCodesClientOptions extends CommonClientOptions {}

const isShortCodesClientOptions = (options: any): options is ShortCodesClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class ShortCodesClient {
  /**
   * A reference to the auto-generated ShortCodes HTTP client.
   */
  private readonly client: ShortCodesGeneratedClient;

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

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new ShortCodesGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public listShortCodes(
    options: ListShortCodesOptions = {}
  ): PagedAsyncIterableIterator<ShortCode> {
    const { span, updatedOptions } = tracingClient.startSpan("ShortCodesClient-listShortCodes", options);
    try {
      return this.client.shortCodesOperations.listShortCodes(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async upsertUSProgramBrief(
    programBriefId: string,
    options: ShortCodesUpsertUSProgramBriefOptionalParams = {}
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan("ShortCodesClient-upsertUSProgramBrief", options, async (updatedOptions) => {
      return await this.client.shortCodesOperations.upsertUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    });
  }

  public async deleteUSProgramBrief(
    programBriefId: string,
    options: DeleteUSProgramBriefOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan("ShortCodesClient-deleteUSProgramBrief", options, async (updatedOptions) => {
      return await this.client.shortCodesOperations.deleteUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    });
  }

  public async getUSProgramBrief(
    programBriefId: string,
    options: GetUSProgramBriefOptions = {}
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan("ShortCodesClient-getUSProgramBrief", options, async (updatedOptions) => {
      return await this.client.shortCodesOperations.getUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    });
  }

  public listUSProgramBriefs(
    options: ListUSProgramBriefsOptions = {}
  ): PagedAsyncIterableIterator<USProgramBrief> {
    const { span, updatedOptions } = tracingClient.startSpan("ShortCodesClient-listUSProgramBriefs", options);
    try {
      return this.client.shortCodesOperations.listUSProgramBriefs(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async submitUSProgramBrief(
    programBriefId: string,
    options: SubmitUSProgramBriefOptions = {}
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan("ShortCodesClient-submitUSProgramBrief", options, async (updatedOptions) => {
      return await this.client.shortCodesOperations.submitUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    });
  }

  public async getUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options: ShortCodesGetUSProgramBriefAttachmentOptionalParams = {}
  ): Promise<ProgramBriefAttachment> {
    return tracingClient.withSpan(
      "ShortCodesClient-getUSProgramBriefAttachment",
      options,
      async (updatedOptions) => {
        return await this.client.shortCodesOperations.getUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          updatedOptions
        );
      }
    );
  }

  public listUSProgramBriefAttachments(
    programBriefId: string,
    options: ShortCodesGetUSProgramBriefAttachmentsOptionalParams = {}
  ): PagedAsyncIterableIterator<ProgramBriefAttachment> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ShortCodesClient-listUSProgramBriefAttachments",
      options
    );
    try {
      return this.client.shortCodesOperations.listUSProgramBriefAttachments(
        programBriefId,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async deleteUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options: ShortCodesDeleteUSProgramBriefAttachmentOptionalParams = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShortCodesClient-deleteUSProgramBriefAttachment",
      options,
      async (updatedOptions) => {
        return await this.client.shortCodesOperations.deleteUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          updatedOptions
        );
      }
    );
  }

  public async createOrReplaceUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    fileName: string,
    fileType: FileType,
    fileContent: string,
    attachmentType: AttachmentType,
    options: ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams = {}
  ): Promise<ProgramBriefAttachment> {
    return tracingClient.withSpan(
      "ShortCodesClient-createOrReplaceUSProgramBriefAttachment",
      options,
      async (updatedOptions) => {
        return await this.client.shortCodesOperations.createOrReplaceUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          attachmentId,
          fileName,
          fileType,
          fileContent,
          attachmentType,
          updatedOptions
        );
      }
    );
  }
}
