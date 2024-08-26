// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import {
  AttachmentType,
  DeleteUSProgramBriefOptions,
  FileType,
  GetUSProgramBriefOptions,
  ListShortCodesOptions,
  ListShortCodeCostsOptions,
  ListUSProgramBriefsOptions,
  ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams,
  ShortCodesDeleteUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentsOptionalParams,
  SubmitUSProgramBriefOptions,
} from "./models";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  ProgramBriefAttachment,
  ShortCode,
  ShortCodeCost,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "./generated/src/models/";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ShortCodesClient as ShortCodesGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
import { createShortCodesPagingPolicy } from "./utils/customPipelinePolicies";

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
    options?: ShortCodesClientOptions,
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: ShortCodesClientOptions,
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | ShortCodesClientOptions,
    maybeOptions: ShortCodesClientOptions = {},
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
    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const shortCodesPagingPolicy = createShortCodesPagingPolicy(url);
    this.client.pipeline.addPolicy(shortCodesPagingPolicy);
  }

  public listShortCodes(
    options: ListShortCodesOptions = {},
  ): PagedAsyncIterableIterator<ShortCode> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ShortCodesClient-listShortCodes",
      options,
    );
    try {
      return this.client.shortCodes.listShortCodes(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public listShortCodeCosts(
    options: ListShortCodeCostsOptions = {},
  ): PagedAsyncIterableIterator<ShortCodeCost> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ShortCodesClient-listShortCodeCosts",
      options,
    );
    try {
      return this.client.shortCodes.listCosts(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public upsertUSProgramBrief(
    programBriefId: string,
    options: ShortCodesUpsertUSProgramBriefOptionalParams = {},
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan(
      "ShortCodesClient-upsertUSProgramBrief",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.upsertUSProgramBrief(programBriefId, updatedOptions);
      },
    );
  }

  public deleteUSProgramBrief(
    programBriefId: string,
    options: DeleteUSProgramBriefOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShortCodesClient-deleteUSProgramBrief",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.deleteUSProgramBrief(programBriefId, updatedOptions);
      },
    );
  }

  public getUSProgramBrief(
    programBriefId: string,
    options: GetUSProgramBriefOptions = {},
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan(
      "ShortCodesClient-getUSProgramBrief",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.getUSProgramBrief(programBriefId, updatedOptions);
      },
    );
  }

  public listUSProgramBriefs(
    options: ListUSProgramBriefsOptions = {},
  ): PagedAsyncIterableIterator<USProgramBrief> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ShortCodesClient-listUSProgramBriefs",
      options,
    );
    try {
      return this.client.shortCodes.listUSProgramBriefs(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public submitUSProgramBrief(
    programBriefId: string,
    options: SubmitUSProgramBriefOptions = {},
  ): Promise<USProgramBrief> {
    return tracingClient.withSpan(
      "ShortCodesClient-submitUSProgramBrief",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.submitUSProgramBrief(programBriefId, updatedOptions);
      },
    );
  }

  public getUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options: ShortCodesGetUSProgramBriefAttachmentOptionalParams = {},
  ): Promise<ProgramBriefAttachment> {
    return tracingClient.withSpan(
      "ShortCodesClient-getUSProgramBriefAttachment",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.getUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          updatedOptions,
        );
      },
    );
  }

  public listUSProgramBriefAttachments(
    programBriefId: string,
    options: ShortCodesGetUSProgramBriefAttachmentsOptionalParams = {},
  ): PagedAsyncIterableIterator<ProgramBriefAttachment> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ShortCodesClient-listUSProgramBriefAttachments",
      options,
    );
    try {
      return this.client.shortCodes.listUSProgramBriefAttachments(programBriefId, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public deleteUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options: ShortCodesDeleteUSProgramBriefAttachmentOptionalParams = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShortCodesClient-deleteUSProgramBriefAttachment",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.deleteUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          updatedOptions,
        );
      },
    );
  }

  public createOrReplaceUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    fileName: string,
    fileType: FileType,
    fileContent: string,
    attachmentType: AttachmentType,
    options: ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams = {},
  ): Promise<ProgramBriefAttachment> {
    return tracingClient.withSpan(
      "ShortCodesClient-createOrReplaceUSProgramBriefAttachment",
      options,
      (updatedOptions) => {
        return this.client.shortCodes.createOrReplaceUSProgramBriefAttachment(
          programBriefId,
          attachmentId,
          attachmentId,
          fileName,
          fileType,
          fileContent,
          attachmentType,
          updatedOptions,
        );
      },
    );
  }
}
