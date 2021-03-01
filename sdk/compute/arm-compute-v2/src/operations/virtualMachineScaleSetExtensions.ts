import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachineScaleSetExtension,
  VirtualMachineScaleSetExtensionsCreateOrUpdateResponse,
  VirtualMachineScaleSetExtensionUpdate,
  VirtualMachineScaleSetExtensionsUpdateResponse,
  VirtualMachineScaleSetExtensionsGetOptionalParams,
  VirtualMachineScaleSetExtensionsGetResponse,
  VirtualMachineScaleSetExtensionsListResponse,
  VirtualMachineScaleSetExtensionsListNextResponse
} from "../models";

/** Class representing a VirtualMachineScaleSetExtensions. */
export class VirtualMachineScaleSetExtensions {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineScaleSetExtensions class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a list of all extensions in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set containing the extension.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineScaleSetExtension> {
    const iter = this.listPagingAll(resourceGroupName, vmScaleSetName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, vmScaleSetName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSetExtension[]> {
    let result = await this._list(resourceGroupName, vmScaleSetName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        vmScaleSetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSetExtension> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      vmScaleSetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * The operation to create or update an extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set where the extension should be create or updated.
   * @param vmssExtensionName The name of the VM scale set extension.
   * @param extensionParameters Parameters supplied to the Create VM scale set Extension operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtension,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<VirtualMachineScaleSetExtensionsCreateOrUpdateResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetExtensionsCreateOrUpdateResponse
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
   * The operation to update an extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set where the extension should be updated.
   * @param vmssExtensionName The name of the VM scale set extension.
   * @param extensionParameters Parameters supplied to the Update VM scale set Extension operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtensionUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetExtensionsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetExtensionsUpdateResponse
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
   * The operation to delete the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set where the extension should be deleted.
   * @param vmssExtensionName The name of the VM scale set extension.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
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
   * The operation to get the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set containing the extension.
   * @param vmssExtensionName The name of the VM scale set extension.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: VirtualMachineScaleSetExtensionsGetOptionalParams
  ): Promise<VirtualMachineScaleSetExtensionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineScaleSetExtensionsGetResponse>;
  }

  /**
   * Gets a list of all extensions in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set containing the extension.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetExtensionsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineScaleSetExtensionsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set containing the extension.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    vmScaleSetName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetExtensionsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachineScaleSetExtensionsListNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    }
  },
  requestBody: Parameters.extensionParameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.vmssExtensionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    }
  },
  requestBody: Parameters.extensionParameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.vmssExtensionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.vmssExtensionName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtension
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.vmssExtensionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtensionListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetExtensionListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
