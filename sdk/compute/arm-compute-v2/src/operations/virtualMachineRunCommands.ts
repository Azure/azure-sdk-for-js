import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  RunCommandDocumentBase,
  VirtualMachineRunCommand,
  VirtualMachineRunCommandsListByVirtualMachineNextOptionalParams,
  VirtualMachineRunCommandsListByVirtualMachineOptionalParams,
  VirtualMachineRunCommandsListResponse,
  VirtualMachineRunCommandsGetResponse,
  VirtualMachineRunCommandsCreateOrUpdateResponse,
  VirtualMachineRunCommandUpdate,
  VirtualMachineRunCommandsUpdateResponse,
  VirtualMachineRunCommandsGetByVirtualMachineOptionalParams,
  VirtualMachineRunCommandsGetByVirtualMachineResponse,
  VirtualMachineRunCommandsListByVirtualMachineResponse,
  VirtualMachineRunCommandsListNextResponse,
  VirtualMachineRunCommandsListByVirtualMachineNextResponse
} from "../models";

/** Class representing a VirtualMachineRunCommands. */
export class VirtualMachineRunCommands {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineRunCommands class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all available run commands for a subscription in a location.
   * @param location The location upon which run commands is queried.
   * @param options The options parameters.
   */
  public list(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<RunCommandDocumentBase> {
    const iter = this.listPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(location, options);
      }
    };
  }

  private async *listPagingPage(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<RunCommandDocumentBase[]> {
    let result = await this._list(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(location, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<RunCommandDocumentBase> {
    for await (const page of this.listPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * The operation to get all run commands of a Virtual Machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the run command.
   * @param options The options parameters.
   */
  public listByVirtualMachine(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineRunCommand> {
    const iter = this.listByVirtualMachinePagingAll(
      resourceGroupName,
      vmName,
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
        return this.listByVirtualMachinePagingPage(
          resourceGroupName,
          vmName,
          options
        );
      }
    };
  }

  private async *listByVirtualMachinePagingPage(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  ): AsyncIterableIterator<VirtualMachineRunCommand[]> {
    let result = await this._listByVirtualMachine(
      resourceGroupName,
      vmName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByVirtualMachineNext(
        resourceGroupName,
        vmName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByVirtualMachinePagingAll(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  ): AsyncIterableIterator<VirtualMachineRunCommand> {
    for await (const page of this.listByVirtualMachinePagingPage(
      resourceGroupName,
      vmName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all available run commands for a subscription in a location.
   * @param location The location upon which run commands is queried.
   * @param options The options parameters.
   */
  private _list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineRunCommandsListResponse>;
  }

  /**
   * Gets specific run command for a subscription in a location.
   * @param location The location upon which run commands is queried.
   * @param commandId The command id.
   * @param options The options parameters.
   */
  get(
    location: string,
    commandId: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      commandId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineRunCommandsGetResponse>;
  }

  /**
   * The operation to create or update the run command.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the run command should be created or updated.
   * @param runCommandName The name of the virtual machine run command.
   * @param runCommand Parameters supplied to the Create Virtual Machine RunCommand operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineRunCommandsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      runCommandName,
      runCommand,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineRunCommandsCreateOrUpdateResponse
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
   * The operation to update the run command.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the run command should be updated.
   * @param runCommandName The name of the virtual machine run command.
   * @param runCommand Parameters supplied to the Update Virtual Machine RunCommand operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineRunCommandsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      runCommandName,
      runCommand,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineRunCommandsUpdateResponse
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
   * The operation to delete the run command.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the run command should be deleted.
   * @param runCommandName The name of the virtual machine run command.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      runCommandName,
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
   * The operation to get the run command.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the run command.
   * @param runCommandName The name of the virtual machine run command.
   * @param options The options parameters.
   */
  getByVirtualMachine(
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineRunCommandsGetByVirtualMachineOptionalParams
  ): Promise<VirtualMachineRunCommandsGetByVirtualMachineResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      runCommandName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getByVirtualMachineOperationSpec
    ) as Promise<VirtualMachineRunCommandsGetByVirtualMachineResponse>;
  }

  /**
   * The operation to get all run commands of a Virtual Machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the run command.
   * @param options The options parameters.
   */
  private _listByVirtualMachine(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  ): Promise<VirtualMachineRunCommandsListByVirtualMachineResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByVirtualMachineOperationSpec
    ) as Promise<VirtualMachineRunCommandsListByVirtualMachineResponse>;
  }

  /**
   * ListNext
   * @param location The location upon which run commands is queried.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachineRunCommandsListNextResponse>;
  }

  /**
   * ListByVirtualMachineNext
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the run command.
   * @param nextLink The nextLink from the previous successful call to the ListByVirtualMachine method.
   * @param options The options parameters.
   */
  private _listByVirtualMachineNext(
    resourceGroupName: string,
    vmName: string,
    nextLink: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineNextOptionalParams
  ): Promise<VirtualMachineRunCommandsListByVirtualMachineNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByVirtualMachineNextOperationSpec
    ) as Promise<VirtualMachineRunCommandsListByVirtualMachineNextResponse>;
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
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandDocument
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1,
    Parameters.commandId
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    201: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    202: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    204: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.runCommand,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.runCommandName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    201: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    202: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    204: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.runCommand1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.runCommandName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}",
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
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.runCommandName
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const getByVirtualMachineOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineRunCommand
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.runCommandName
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const listByVirtualMachineOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineRunCommandsListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const listByVirtualMachineNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineRunCommandsListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
