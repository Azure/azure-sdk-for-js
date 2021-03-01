import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  GalleryImageVersion,
  GalleryImageVersionsCreateOrUpdateResponse,
  GalleryImageVersionUpdate,
  GalleryImageVersionsUpdateResponse,
  GalleryImageVersionsGetOptionalParams,
  GalleryImageVersionsGetResponse,
  GalleryImageVersionsListByGalleryImageResponse,
  GalleryImageVersionsListByGalleryImageNextResponse
} from "../models";

/** Class representing a GalleryImageVersions. */
export class GalleryImageVersions {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class GalleryImageVersions class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * List gallery Image Versions in a gallery Image Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the Shared Image Gallery Image Definition from which the Image
   *                         Versions are to be listed.
   * @param options The options parameters.
   */
  public listByGalleryImage(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<GalleryImageVersion> {
    const iter = this.listByGalleryImagePagingAll(
      resourceGroupName,
      galleryName,
      galleryImageName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByGalleryImagePagingPage(
          resourceGroupName,
          galleryName,
          galleryImageName,
          options
        );
      }
    };
  }

  private async *listByGalleryImagePagingPage(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<GalleryImageVersion[]> {
    let result = await this._listByGalleryImage(
      resourceGroupName,
      galleryName,
      galleryImageName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByGalleryImageNext(
        resourceGroupName,
        galleryName,
        galleryImageName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByGalleryImagePagingAll(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<GalleryImageVersion> {
    for await (const page of this.listByGalleryImagePagingPage(
      resourceGroupName,
      galleryName,
      galleryImageName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update a gallery Image Version.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the gallery Image Definition in which the Image Version is to be
   *                         created.
   * @param galleryImageVersionName The name of the gallery Image Version to be created. Needs to follow
   *                                semantic version name pattern: The allowed characters are digit and period. Digits must be within
   *                                the range of a 32-bit integer. Format: <MajorVersion>.<MinorVersion>.<Patch>
   * @param galleryImageVersion Parameters supplied to the create or update gallery Image Version
   *                            operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersion,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryImageVersionsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
      galleryImageVersion,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryImageVersionsCreateOrUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Update a gallery Image Version.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the gallery Image Definition in which the Image Version is to be
   *                         updated.
   * @param galleryImageVersionName The name of the gallery Image Version to be updated. Needs to follow
   *                                semantic version name pattern: The allowed characters are digit and period. Digits must be within
   *                                the range of a 32-bit integer. Format: <MajorVersion>.<MinorVersion>.<Patch>
   * @param galleryImageVersion Parameters supplied to the update gallery Image Version operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    galleryImageVersion: GalleryImageVersionUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryImageVersionsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
      galleryImageVersion,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryImageVersionsUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Retrieves information about a gallery Image Version.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the gallery Image Definition in which the Image Version resides.
   * @param galleryImageVersionName The name of the gallery Image Version to be retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: GalleryImageVersionsGetOptionalParams
  ): Promise<GalleryImageVersionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<GalleryImageVersionsGetResponse>;
  }

  /**
   * Delete a gallery Image Version.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the gallery Image Definition in which the Image Version resides.
   * @param galleryImageVersionName The name of the gallery Image Version to be deleted.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImageVersionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * List gallery Image Versions in a gallery Image Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the Shared Image Gallery Image Definition from which the Image
   *                         Versions are to be listed.
   * @param options The options parameters.
   */
  private _listByGalleryImage(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryImageVersionsListByGalleryImageResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryImageOperationSpec
    ) as Promise<GalleryImageVersionsListByGalleryImageResponse>;
  }

  /**
   * ListByGalleryImageNext
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition resides.
   * @param galleryImageName The name of the Shared Image Gallery Image Definition from which the Image
   *                         Versions are to be listed.
   * @param nextLink The nextLink from the previous successful call to the ListByGalleryImage method.
   * @param options The options parameters.
   */
  private _listByGalleryImageNext(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryImageVersionsListByGalleryImageNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryImageNextOperationSpec
    ) as Promise<GalleryImageVersionsListByGalleryImageNextResponse>;
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

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    201: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    202: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    204: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImageVersion,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName,
    Parameters.galleryImageVersionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    201: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    202: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    204: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImageVersion1,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName,
    Parameters.galleryImageVersionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageVersion
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3, Parameters.expand2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName,
    Parameters.galleryImageVersionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName,
    Parameters.galleryImageVersionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryImageOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageVersionList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryImageNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageVersionList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
