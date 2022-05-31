import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeviceUpdate } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DeviceUpdateClient } from "../deviceUpdateClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  Update,
  DeviceUpdateListUpdatesNextOptionalParams,
  DeviceUpdateListUpdatesOptionalParams,
  DeviceUpdateListProvidersNextOptionalParams,
  DeviceUpdateListProvidersOptionalParams,
  DeviceUpdateListNamesNextOptionalParams,
  DeviceUpdateListNamesOptionalParams,
  DeviceUpdateListVersionsNextOptionalParams,
  DeviceUpdateListVersionsOptionalParams,
  DeviceUpdateListFilesNextOptionalParams,
  DeviceUpdateListFilesOptionalParams,
  UpdateOperation,
  DeviceUpdateListOperationsNextOptionalParams,
  DeviceUpdateListOperationsOptionalParams,
  DeviceUpdateListUpdatesResponse,
  ImportUpdateInputItem,
  DeviceUpdateImportUpdateOptionalParams,
  DeviceUpdateImportUpdateResponse,
  DeviceUpdateGetUpdateOptionalParams,
  DeviceUpdateGetUpdateResponse,
  DeviceUpdateDeleteUpdateOptionalParams,
  DeviceUpdateDeleteUpdateResponse,
  DeviceUpdateListProvidersResponse,
  DeviceUpdateListNamesResponse,
  DeviceUpdateListVersionsResponse,
  DeviceUpdateListFilesResponse,
  DeviceUpdateGetFileOptionalParams,
  DeviceUpdateGetFileResponse,
  DeviceUpdateListOperationsResponse,
  DeviceUpdateGetOperationOptionalParams,
  DeviceUpdateGetOperationResponse,
  DeviceUpdateListUpdatesNextResponse,
  DeviceUpdateListProvidersNextResponse,
  DeviceUpdateListNamesNextResponse,
  DeviceUpdateListVersionsNextResponse,
  DeviceUpdateListFilesNextResponse,
  DeviceUpdateListOperationsNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DeviceUpdate operations. */
export class DeviceUpdateImpl implements DeviceUpdate {
  private readonly client: DeviceUpdateClient;

  /**
   * Initialize a new instance of the class DeviceUpdate class.
   * @param client Reference to the service client
   */
  constructor(client: DeviceUpdateClient) {
    this.client = client;
  }

  /**
   * Get a list of all updates that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  public listUpdates(
    options?: DeviceUpdateListUpdatesOptionalParams
  ): PagedAsyncIterableIterator<Update> {
    const iter = this.listUpdatesPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listUpdatesPagingPage(options);
      }
    };
  }

  private async *listUpdatesPagingPage(
    options?: DeviceUpdateListUpdatesOptionalParams
  ): AsyncIterableIterator<Update[]> {
    let result = await this._listUpdates(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listUpdatesNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listUpdatesPagingAll(
    options?: DeviceUpdateListUpdatesOptionalParams
  ): AsyncIterableIterator<Update> {
    for await (const page of this.listUpdatesPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get a list of all update providers that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  public listProviders(
    options?: DeviceUpdateListProvidersOptionalParams
  ): PagedAsyncIterableIterator<string> {
    const iter = this.listProvidersPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listProvidersPagingPage(options);
      }
    };
  }

  private async *listProvidersPagingPage(
    options?: DeviceUpdateListProvidersOptionalParams
  ): AsyncIterableIterator<string[]> {
    let result = await this._listProviders(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listProvidersNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listProvidersPagingAll(
    options?: DeviceUpdateListProvidersOptionalParams
  ): AsyncIterableIterator<string> {
    for await (const page of this.listProvidersPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get a list of all update names that match the specified provider.
   * @param provider Update provider.
   * @param options The options parameters.
   */
  public listNames(
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams
  ): PagedAsyncIterableIterator<string> {
    const iter = this.listNamesPagingAll(provider, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listNamesPagingPage(provider, options);
      }
    };
  }

  private async *listNamesPagingPage(
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams
  ): AsyncIterableIterator<string[]> {
    let result = await this._listNames(provider, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNamesNext(provider, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listNamesPagingAll(
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams
  ): AsyncIterableIterator<string> {
    for await (const page of this.listNamesPagingPage(provider, options)) {
      yield* page;
    }
  }

  /**
   * Get a list of all update versions that match the specified provider and name.
   * @param provider Update provider.
   * @param name Update name.
   * @param options The options parameters.
   */
  public listVersions(
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams
  ): PagedAsyncIterableIterator<string> {
    const iter = this.listVersionsPagingAll(provider, name, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listVersionsPagingPage(provider, name, options);
      }
    };
  }

  private async *listVersionsPagingPage(
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams
  ): AsyncIterableIterator<string[]> {
    let result = await this._listVersions(provider, name, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listVersionsNext(
        provider,
        name,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listVersionsPagingAll(
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams
  ): AsyncIterableIterator<string> {
    for await (const page of this.listVersionsPagingPage(
      provider,
      name,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get a list of all update file identifiers for the specified version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  public listFiles(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams
  ): PagedAsyncIterableIterator<string> {
    const iter = this.listFilesPagingAll(provider, name, version, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listFilesPagingPage(provider, name, version, options);
      }
    };
  }

  private async *listFilesPagingPage(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams
  ): AsyncIterableIterator<string[]> {
    let result = await this._listFiles(provider, name, version, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listFilesNext(
        provider,
        name,
        version,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listFilesPagingAll(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams
  ): AsyncIterableIterator<string> {
    for await (const page of this.listFilesPagingPage(
      provider,
      name,
      version,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get a list of all import update operations. Completed operations are kept for 7 days before
   * auto-deleted. Delete operations are not returned by this API version.
   * @param options The options parameters.
   */
  public listOperations(
    options?: DeviceUpdateListOperationsOptionalParams
  ): PagedAsyncIterableIterator<UpdateOperation> {
    const iter = this.listOperationsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listOperationsPagingPage(options);
      }
    };
  }

  private async *listOperationsPagingPage(
    options?: DeviceUpdateListOperationsOptionalParams
  ): AsyncIterableIterator<UpdateOperation[]> {
    let result = await this._listOperations(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listOperationsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listOperationsPagingAll(
    options?: DeviceUpdateListOperationsOptionalParams
  ): AsyncIterableIterator<UpdateOperation> {
    for await (const page of this.listOperationsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get a list of all updates that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  private _listUpdates(
    options?: DeviceUpdateListUpdatesOptionalParams
  ): Promise<DeviceUpdateListUpdatesResponse> {
    return this.client.sendOperationRequest(
      { options },
      listUpdatesOperationSpec
    );
  }

  /**
   * Import new update version. This is a long-running-operation; use Operation-Location response header
   * value to check for operation status.
   * @param updateToImport The update to be imported.
   * @param options The options parameters.
   */
  async beginImportUpdate(
    updateToImport: ImportUpdateInputItem[],
    options?: DeviceUpdateImportUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DeviceUpdateImportUpdateResponse>,
      DeviceUpdateImportUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DeviceUpdateImportUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { updateToImport, options },
      importUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Import new update version. This is a long-running-operation; use Operation-Location response header
   * value to check for operation status.
   * @param updateToImport The update to be imported.
   * @param options The options parameters.
   */
  async beginImportUpdateAndWait(
    updateToImport: ImportUpdateInputItem[],
    options?: DeviceUpdateImportUpdateOptionalParams
  ): Promise<DeviceUpdateImportUpdateResponse> {
    const poller = await this.beginImportUpdate(updateToImport, options);
    return poller.pollUntilDone();
  }

  /**
   * Get a specific update version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  getUpdate(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateGetUpdateOptionalParams
  ): Promise<DeviceUpdateGetUpdateResponse> {
    return this.client.sendOperationRequest(
      { provider, name, version, options },
      getUpdateOperationSpec
    );
  }

  /**
   * Delete a specific update version. This is a long-running-operation; use Operation-Location response
   * header value to check for operation status.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  async beginDeleteUpdate(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateDeleteUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DeviceUpdateDeleteUpdateResponse>,
      DeviceUpdateDeleteUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DeviceUpdateDeleteUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { provider, name, version, options },
      deleteUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a specific update version. This is a long-running-operation; use Operation-Location response
   * header value to check for operation status.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  async beginDeleteUpdateAndWait(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateDeleteUpdateOptionalParams
  ): Promise<DeviceUpdateDeleteUpdateResponse> {
    const poller = await this.beginDeleteUpdate(
      provider,
      name,
      version,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get a list of all update providers that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  private _listProviders(
    options?: DeviceUpdateListProvidersOptionalParams
  ): Promise<DeviceUpdateListProvidersResponse> {
    return this.client.sendOperationRequest(
      { options },
      listProvidersOperationSpec
    );
  }

  /**
   * Get a list of all update names that match the specified provider.
   * @param provider Update provider.
   * @param options The options parameters.
   */
  private _listNames(
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams
  ): Promise<DeviceUpdateListNamesResponse> {
    return this.client.sendOperationRequest(
      { provider, options },
      listNamesOperationSpec
    );
  }

  /**
   * Get a list of all update versions that match the specified provider and name.
   * @param provider Update provider.
   * @param name Update name.
   * @param options The options parameters.
   */
  private _listVersions(
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams
  ): Promise<DeviceUpdateListVersionsResponse> {
    return this.client.sendOperationRequest(
      { provider, name, options },
      listVersionsOperationSpec
    );
  }

  /**
   * Get a list of all update file identifiers for the specified version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  private _listFiles(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams
  ): Promise<DeviceUpdateListFilesResponse> {
    return this.client.sendOperationRequest(
      { provider, name, version, options },
      listFilesOperationSpec
    );
  }

  /**
   * Get a specific update file from the version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param fileId File identifier.
   * @param options The options parameters.
   */
  getFile(
    provider: string,
    name: string,
    version: string,
    fileId: string,
    options?: DeviceUpdateGetFileOptionalParams
  ): Promise<DeviceUpdateGetFileResponse> {
    return this.client.sendOperationRequest(
      { provider, name, version, fileId, options },
      getFileOperationSpec
    );
  }

  /**
   * Get a list of all import update operations. Completed operations are kept for 7 days before
   * auto-deleted. Delete operations are not returned by this API version.
   * @param options The options parameters.
   */
  private _listOperations(
    options?: DeviceUpdateListOperationsOptionalParams
  ): Promise<DeviceUpdateListOperationsResponse> {
    return this.client.sendOperationRequest(
      { options },
      listOperationsOperationSpec
    );
  }

  /**
   * Retrieve operation status.
   * @param operationId Operation identifier.
   * @param options The options parameters.
   */
  getOperation(
    operationId: string,
    options?: DeviceUpdateGetOperationOptionalParams
  ): Promise<DeviceUpdateGetOperationResponse> {
    return this.client.sendOperationRequest(
      { operationId, options },
      getOperationOperationSpec
    );
  }

  /**
   * ListUpdatesNext
   * @param nextLink The nextLink from the previous successful call to the ListUpdates method.
   * @param options The options parameters.
   */
  private _listUpdatesNext(
    nextLink: string,
    options?: DeviceUpdateListUpdatesNextOptionalParams
  ): Promise<DeviceUpdateListUpdatesNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listUpdatesNextOperationSpec
    );
  }

  /**
   * ListProvidersNext
   * @param nextLink The nextLink from the previous successful call to the ListProviders method.
   * @param options The options parameters.
   */
  private _listProvidersNext(
    nextLink: string,
    options?: DeviceUpdateListProvidersNextOptionalParams
  ): Promise<DeviceUpdateListProvidersNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listProvidersNextOperationSpec
    );
  }

  /**
   * ListNamesNext
   * @param provider Update provider.
   * @param nextLink The nextLink from the previous successful call to the ListNames method.
   * @param options The options parameters.
   */
  private _listNamesNext(
    provider: string,
    nextLink: string,
    options?: DeviceUpdateListNamesNextOptionalParams
  ): Promise<DeviceUpdateListNamesNextResponse> {
    return this.client.sendOperationRequest(
      { provider, nextLink, options },
      listNamesNextOperationSpec
    );
  }

  /**
   * ListVersionsNext
   * @param provider Update provider.
   * @param name Update name.
   * @param nextLink The nextLink from the previous successful call to the ListVersions method.
   * @param options The options parameters.
   */
  private _listVersionsNext(
    provider: string,
    name: string,
    nextLink: string,
    options?: DeviceUpdateListVersionsNextOptionalParams
  ): Promise<DeviceUpdateListVersionsNextResponse> {
    return this.client.sendOperationRequest(
      { provider, name, nextLink, options },
      listVersionsNextOperationSpec
    );
  }

  /**
   * ListFilesNext
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param nextLink The nextLink from the previous successful call to the ListFiles method.
   * @param options The options parameters.
   */
  private _listFilesNext(
    provider: string,
    name: string,
    version: string,
    nextLink: string,
    options?: DeviceUpdateListFilesNextOptionalParams
  ): Promise<DeviceUpdateListFilesNextResponse> {
    return this.client.sendOperationRequest(
      { provider, name, version, nextLink, options },
      listFilesNextOperationSpec
    );
  }

  /**
   * ListOperationsNext
   * @param nextLink The nextLink from the previous successful call to the ListOperations method.
   * @param options The options parameters.
   */
  private _listOperationsNext(
    nextLink: string,
    options?: DeviceUpdateListOperationsNextOptionalParams
  ): Promise<DeviceUpdateListOperationsNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listOperationsNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listUpdatesOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.search,
    Parameters.filter
  ],
  urlParameters: [Parameters.endpoint, Parameters.instanceId],
  headerParameters: [Parameters.accept],
  serializer
};
const importUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates:import",
  httpMethod: "POST",
  responses: {
    200: {
      headersMapper: Mappers.DeviceUpdateImportUpdateHeaders
    },
    201: {
      headersMapper: Mappers.DeviceUpdateImportUpdateHeaders
    },
    202: {
      headersMapper: Mappers.DeviceUpdateImportUpdateHeaders
    },
    204: {
      headersMapper: Mappers.DeviceUpdateImportUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.updateToImport,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.instanceId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Update
    },
    304: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.version
  ],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.DeviceUpdateDeleteUpdateHeaders
    },
    201: {
      headersMapper: Mappers.DeviceUpdateDeleteUpdateHeaders
    },
    202: {
      headersMapper: Mappers.DeviceUpdateDeleteUpdateHeaders
    },
    204: {
      headersMapper: Mappers.DeviceUpdateDeleteUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.version
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listProvidersOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates/providers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.instanceId],
  headerParameters: [Parameters.accept],
  serializer
};
const listNamesOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates/providers/{provider}/names",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVersionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listFilesOperationSpec: coreClient.OperationSpec = {
  path:
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.version
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getFileOperationSpec: coreClient.OperationSpec = {
  path:
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateFile
    },
    304: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.version,
    Parameters.fileId
  ],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const listOperationsOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateOperationsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [Parameters.endpoint, Parameters.instanceId],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationOperationSpec: coreClient.OperationSpec = {
  path: "/deviceUpdate/{instanceId}/updates/operations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateOperation,
      headersMapper: Mappers.DeviceUpdateGetOperationHeaders
    },
    304: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.operationId
  ],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const listUpdatesNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.search,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listProvidersNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNamesNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVersionsNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listFilesNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.provider,
    Parameters.name,
    Parameters.version,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateOperationsList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.endpoint,
    Parameters.instanceId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
