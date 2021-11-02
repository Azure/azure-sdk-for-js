// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { DownloadContentOptions } from "./models";
import * as Parameters from "./parameters";
import * as Mappers from "./generated/src/models/mappers";
import * as ExtraMappers from "./mappers";
import { CallingServerApiClientContext } from "./generated/src/callingServerApiClientContext";
import { URLBuilder } from "@azure/core-http";
import { OperationQueryParameter } from "@azure/core-http";
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

/**
 * The ContentDownloader interface represents related APIs.
 */
export interface ContentDownloader{
  /**
   * Download recording's content.
   * @param contentUri - The content Uri.
   * @param options - The options parameters.
   */
  downloadContent(
    contentUri: string,
    options: DownloadContentOptions
  ): Promise<ContentDownloadResponse>;

  /**
   * Download recording's content.
   * @param contentUri - The content Uri.
   * @param options - The options parameters.
   */
   download_content(
    contentUri: string,
    options?: OperationOptions
  ): Promise<ContentDownloadResponse>;

}

/**
 * The ContentDownloader contains operations.
 */
export class ContentDownloaderImpl implements ContentDownloader  {
  private readonly client: CallingServerApiClientContext;

  constructor(client: CallingServerApiClientContext) {
    this.client = client;
  }

  /**
   * Download recording's content.
   * @param contentUri - The content Uri.
   * @param options - The options parameters.
   */
  public async downloadContent(
    contentUri: string,
    options: DownloadContentOptions = {}
  ): Promise<ContentDownloadResponse> {
    const { span, updatedOptions } = createSpan(
      "ContentDownloaderRestClient-downloadContent",
      options
    );

    try {
      return await this.download_content(
        contentUri,
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
   * @param contentUri - The content Uri.
   * @param options - The options parameters.
   */
  download_content(
    contentUri: string,
    options?: OperationOptions
  ): Promise<ContentDownloadResponse> {
    const operationArguments: OperationArguments = {
      options: operationOptionsToRequestOptionsBase(options || {})
    };

    const q = URLBuilder.parse(contentUri);
    const formattedUrl = q.getPath()!.startsWith("/") ? q.getPath()!.substr(1) : q.getPath()!;
    const stringToSign = this.client.endpoint + formattedUrl;
    return this.client.sendOperationRequest(
      operationArguments,
      getDownloadContentOperationSpec(contentUri, stringToSign)
    ) as Promise<ContentDownloadResponse>;
  }
}

// Operation Specifications
const serializer = new Serializer(Mappers, /* isXml */ false);

function getDownloadContentOperationSpec(url: string, stringToSign: string): OperationSpec {
  const stringToSignHeader: OperationQueryParameter = {
    parameterPath: "UriToSignWith",
    mapper: {
      defaultValue: stringToSign,
      isConstant: true,
      serializedName: "UriToSignWith",
      type: {
        name: "String"
      }
    }
  };

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
