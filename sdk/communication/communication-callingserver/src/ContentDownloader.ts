// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { DownloadContentOptions } from "./models";
import * as Mappers from "./generated/src/models/mappers"
import * as ExtraMappers from "./mappers"
import * as Parameters from "./generated/src/models/parameters";
import { CallingServerApiClientContext } from "./generated/src/callingServerApiClientContext";
var urlModule = require('url');
import { OperationQueryParameter } from "@azure/core-http";

import { createSpan } from "./tracing";
import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  OperationArguments,
  Serializer,
  OperationSpec
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { ContentDownloadResponse } from ".";


export class ContentDownloader {
  private readonly client: CallingServerApiClientContext;
  constructor(client: CallingServerApiClientContext) {
    this.client = client;
  }

  public async downloadContent(contentUri: string,
    options: DownloadContentOptions = {}
  ): Promise<ContentDownloadResponse> {
    const { span, updatedOptions } = createSpan("ContentDownloaderRestClient-Recording", options);

    try {
      const result = await this.download_content(
        contentUri,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      return result;

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
* Get call recording properties.
* @param contentUri The content Uri.
* @param options The options parameters.
*/
  download_content(
    contentUri: string,
    options?: OperationOptions
  ): Promise<ContentDownloadResponse> {
    const operationArguments: OperationArguments = {
      options: operationOptionsToRequestOptionsBase(options || {})
    };

    var q = urlModule.parse(contentUri, true);
    var formattedUrl = q.pathname.startsWith('/') ? q.pathname.substr(1) : q.pathname
    var stringToSign = this.client.endpoint + formattedUrl;

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
    path: '',
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
      400: {
        bodyMapper: Mappers.CommunicationErrorResponse,
        isError: true
      },
      401: {
        bodyMapper: Mappers.CommunicationErrorResponse,
        isError: true
      },
      403: {
        bodyMapper: Mappers.CommunicationErrorResponse,
        isError: true
      },
      404: {
        bodyMapper: Mappers.CommunicationErrorResponse,
        isError: true
      },
      500: {
        bodyMapper: Mappers.CommunicationErrorResponse,
        isError: true
      }
    },
    requestBody: undefined,
    queryParameters: [],
    urlParameters: [],
    headerParameters: [Parameters.contentType, Parameters.accept, stringToSignHeader],
    mediaType: "json",
    serializer
  };

  return downloadContentOperationSpec;
}
