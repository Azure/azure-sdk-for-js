// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  LibraryResource,
  LibraryListOperationResponse,
  LibraryGetOperationResultResponse,
  LibraryGetResponse,
  LibraryCreateOrAppendOptionalParams,
  LibraryListNextResponse
} from "../models";

/** Class representing a Library. */
export class Library {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Library class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists Library.
   * @param options The options parameters.
   */
  public list(options?: coreHttp.OperationOptions): PagedAsyncIterableIterator<LibraryResource> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<LibraryResource[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<LibraryResource> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists Library.
   * @param options The options parameters.
   */
  private async _list(options?: coreHttp.OperationOptions): Promise<LibraryListOperationResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_list",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, listOperationSpec);
      return result as LibraryListOperationResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Flush Library
   * @param libraryName file name to upload. Minimum length of the filename should be 1 excluding the
   *                    extension length.
   * @param options The options parameters.
   */
  async flush(
    libraryName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-flush",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      libraryName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(operationArguments, flushOperationSpec);
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: flushOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Get Operation result for Library
   * @param operationId operation id for which status is requested
   * @param options The options parameters.
   */
  async getOperationResult(
    operationId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LibraryGetOperationResultResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-getOperationResult",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      operationId,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getOperationResultOperationSpec
      );
      return result as LibraryGetOperationResultResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Delete Library
   * @param libraryName file name to upload. Minimum length of the filename should be 1 excluding the
   *                    extension length.
   * @param options The options parameters.
   */
  async delete(
    libraryName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-delete",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      libraryName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(operationArguments, deleteOperationSpec);
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Get Library
   * @param libraryName file name to upload. Minimum length of the filename should be 1 excluding the
   *                    extension length.
   * @param options The options parameters.
   */
  async get(libraryName: string, options?: coreHttp.OperationOptions): Promise<LibraryGetResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-get",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      libraryName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, getOperationSpec);
      return result as LibraryGetResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a library with the library name. Use query param 'comp=appendblock' to append the data to
   * the library resource created using the create operation.
   * @param libraryName file name to upload. Minimum length of the filename should be 1 excluding the
   *                    extension length.
   * @param content Library file chunk. Use this content in with append operation.
   * @param options The options parameters.
   */
  async createOrAppend(
    libraryName: string,
    content: coreHttp.HttpRequestBody,
    options?: LibraryCreateOrAppendOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-createOrAppend",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      libraryName,
      content,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrAppendOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrAppendOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private async _listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<LibraryListNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_listNext",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        listNextOperationSpec
      );
      return result as LibraryListNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/libraries",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LibraryListResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const flushOperationSpec: coreHttp.OperationSpec = {
  path: "/libraries/{libraryName}/flush",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.libraryName],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationResultOperationSpec: coreHttp.OperationSpec = {
  path: "/libraryOperationResults/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LibraryResource
    },
    202: {
      bodyMapper: Mappers.OperationResult
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.operationId],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/libraries/{libraryName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.libraryName],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/libraries/{libraryName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LibraryResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.libraryName],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrAppendOperationSpec: coreHttp.OperationSpec = {
  path: "/libraries/{libraryName}",
  httpMethod: "PUT",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.content,
  queryParameters: [Parameters.apiVersion, Parameters.comp],
  urlParameters: [Parameters.endpoint, Parameters.libraryName],
  headerParameters: [
    Parameters.contentType1,
    Parameters.accept1,
    Parameters.xMsBlobConditionAppendpos
  ],
  mediaType: "binary",
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LibraryListResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
