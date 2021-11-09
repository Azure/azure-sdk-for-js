// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { DownloadContentOptions } from "./models";
import * as Parameters from "./parameters";
import * as Mappers from "./generated/src/models/mappers";
import * as ExtraMappers from "./mappers";
import { CallingServerApiClientContext } from "./generated/src/callingServerApiClientContext";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";

import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  OperationArguments,
  Serializer,
  OperationSpec
} from "@azure/core-http";
import { ContentDownloadResponse } from ".";
import { CallingServerUtils } from "./utils/utils";

/**
 * The ContentDownloader interface represents related APIs.
 */
export interface ContentDownloader {
  /**
   * Download recording's content.
   * @param contentUrl - The content Url.
   * @param options - The options parameters.
   */
  downloadContent(
    contentUrl: string,
    options: DownloadContentOptions
  ): Promise<ContentDownloadResponse>;
}

/**
 * The ContentDownloader contains operations.
 */
export class ContentDownloaderImpl implements ContentDownloader {
  private readonly client: CallingServerApiClientContext;

  constructor(client: CallingServerApiClientContext) {
    this.client = client;
  }

  /**
   * Download recording's content.
   * @param contentUrl - The content Url.
   * @param options - The options parameters.
   */
  public async downloadContent(
    contentUrl: string,
    options: DownloadContentOptions = {}
  ): Promise<ContentDownloadResponse> {
    const { span, updatedOptions } = createSpan(
      "ContentDownloaderRestClient-downloadContent",
      options
    );

    try {
      return await this.download_content(
        contentUrl,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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

  /**
   * Download recording's content.
   * @param contentUrl - The content Url.
   * @param options - The options parameters.
   */
  download_content(
    contentUrl: string,
    options?: OperationOptions
  ): Promise<ContentDownloadResponse> {
    const operationArguments: OperationArguments = {
      options: operationOptionsToRequestOptionsBase(options || {})
    };
    const stringToSign = CallingServerUtils.getStringToSign(this.client.endpoint, contentUrl);
    return this.client.sendOperationRequest(
      operationArguments,
      getDownloadContentOperationSpec(contentUrl, stringToSign)
    ) as Promise<ContentDownloadResponse>;
  }
}

// Operation Specifications
const serializer = new Serializer(Mappers, /* isXml */ false);

function getDownloadContentOperationSpec(url: string, stringToSign: string): OperationSpec {
  const stringToSignHeader = CallingServerUtils.getStringToSignHeader(stringToSign);

  const downloadContentOperationSpec: OperationSpec = {
    path: "",
    baseUrl: url,
    httpMethod: "GET",
    responses: {
      200: {
        bodyMapper: {
          type: { name: "Stream" },
          serializedName: "parsedResponse"
        },
        headersMapper: ExtraMappers.ContentDownloadHeaders
      },
      default: {
        bodyMapper: Mappers.CommunicationErrorResponse
      }
    },
    requestBody: undefined,
    queryParameters: [],
    urlParameters: [],
    headerParameters: [stringToSignHeader, Parameters.range],
    serializer
  };

  return downloadContentOperationSpec;
}
