import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachine,
  VirtualMachinesListAllNextOptionalParams,
  VirtualMachinesListAllOptionalParams,
  VirtualMachineSize,
  VirtualMachinesListByLocationResponse,
  VirtualMachineCaptureParameters,
  VirtualMachinesCaptureResponse,
  VirtualMachinesCreateOrUpdateResponse,
  VirtualMachineUpdate,
  VirtualMachinesUpdateResponse,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesGetResponse,
  VirtualMachinesInstanceViewResponse,
  VirtualMachinesListResponse,
  VirtualMachinesListAllResponse,
  VirtualMachinesListAvailableSizesResponse,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachinesRetrieveBootDiagnosticsDataResponse,
  VirtualMachinesAssessPatchesResponse,
  VirtualMachineInstallPatchesParameters,
  VirtualMachinesInstallPatchesResponse,
  RunCommandInput,
  VirtualMachinesRunCommandResponse,
  VirtualMachinesListByLocationNextResponse,
  VirtualMachinesListNextResponse,
  VirtualMachinesListAllNextResponse
} from "../models";

/** Class representing a VirtualMachines. */
export class VirtualMachines {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachines class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets all the virtual machines under the specified subscription for the specified location.
   * @param location The location for which virtual machines under the subscription are queried.
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachine> {
    const iter = this.listByLocationPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByLocationPagingPage(location, options);
      }
    };
  }

  private async *listByLocationPagingPage(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachine[]> {
    let result = await this._listByLocation(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByLocationNext(
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByLocationPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachine> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Lists all of the virtual machines in the specified resource group. Use the nextLink property in the
   * response to get the next page of virtual machines.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachine> {
    const iter = this.listPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachine[]> {
    let result = await this._list(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachine> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Lists all of the virtual machines in the specified subscription. Use the nextLink property in the
   * response to get the next page of virtual machines.
   * @param options The options parameters.
   */
  public listAll(
    options?: VirtualMachinesListAllOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachine> {
    const iter = this.listAllPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAllPagingPage(options);
      }
    };
  }

  private async *listAllPagingPage(
    options?: VirtualMachinesListAllOptionalParams
  ): AsyncIterableIterator<VirtualMachine[]> {
    let result = await this._listAll(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAllNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAllPagingAll(
    options?: VirtualMachinesListAllOptionalParams
  ): AsyncIterableIterator<VirtualMachine> {
    for await (const page of this.listAllPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all available virtual machine sizes to which the specified virtual machine can be resized.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  public listAvailableSizes(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineSize> {
    const iter = this.listAvailableSizesPagingAll(
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
        return this.listAvailableSizesPagingPage(
          resourceGroupName,
          vmName,
          options
        );
      }
    };
  }

  private async *listAvailableSizesPagingPage(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineSize[]> {
    let result = await this._listAvailableSizes(
      resourceGroupName,
      vmName,
      options
    );
    yield result.value || [];
  }

  private async *listAvailableSizesPagingAll(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineSize> {
    for await (const page of this.listAvailableSizesPagingPage(
      resourceGroupName,
      vmName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the virtual machines under the specified subscription for the specified location.
   * @param location The location for which virtual machines under the subscription are queried.
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesListByLocationResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByLocationOperationSpec
    ) as Promise<VirtualMachinesListByLocationResponse>;
  }

  /**
   * Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to
   * create similar VMs.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param parameters Parameters supplied to the Capture Virtual Machine operation.
   * @param options The options parameters.
   */
  async capture(
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineCaptureParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesCaptureResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesCaptureResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      captureOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: captureOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * The operation to create or update a virtual machine. Please note some properties can be set only
   * during virtual machine creation.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param parameters Parameters supplied to the Create Virtual Machine operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachine,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesCreateOrUpdateResponse
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
   * The operation to update a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param parameters Parameters supplied to the Update Virtual Machine operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesUpdateResponse
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
   * The operation to delete a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeleteOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
   * Retrieves information about the model view or the instance view of a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachinesGetResponse>;
  }

  /**
   * Retrieves information about the run-time state of a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  instanceView(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesInstanceViewResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      instanceViewOperationSpec
    ) as Promise<VirtualMachinesInstanceViewResponse>;
  }

  /**
   * Converts virtual machine disks from blob-based to managed disks. Virtual machine must be
   * stop-deallocated before invoking this operation.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async convertToManagedDisks(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      convertToManagedDisksOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: convertToManagedDisksOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Shuts down the virtual machine and releases the compute resources. You are not billed for the
   * compute resources that this virtual machine uses.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async deallocate(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      deallocateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deallocateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual
   * machine before performing this operation. <br>For Windows, please refer to [Create a managed image
   * of a generalized VM in
   * Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/capture-image-resource).<br>For
   * Linux, please refer to [How to create an image of a virtual machine or
   * VHD](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/capture-image).
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  generalize(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      generalizeOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists all of the virtual machines in the specified resource group. Use the nextLink property in the
   * response to get the next page of virtual machines.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachinesListResponse>;
  }

  /**
   * Lists all of the virtual machines in the specified subscription. Use the nextLink property in the
   * response to get the next page of virtual machines.
   * @param options The options parameters.
   */
  private _listAll(
    options?: VirtualMachinesListAllOptionalParams
  ): Promise<VirtualMachinesListAllResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllOperationSpec
    ) as Promise<VirtualMachinesListAllResponse>;
  }

  /**
   * Lists all available virtual machine sizes to which the specified virtual machine can be resized.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  private _listAvailableSizes(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesListAvailableSizesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAvailableSizesOperationSpec
    ) as Promise<VirtualMachinesListAvailableSizesResponse>;
  }

  /**
   * The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the
   * same provisioned resources. You are still charged for this virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async powerOff(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPowerOffOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      powerOffOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: powerOffOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to reapply a virtual machine's state.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async reapply(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      reapplyOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: reapplyOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to restart a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async restart(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      restartOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: restartOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to start a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async start(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      startOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: startOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Shuts down the virtual machine, moves it to a new node, and powers it back on.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async redeploy(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      redeployOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: redeployOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Reimages the virtual machine which has an ephemeral OS disk back to its initial state.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async reimage(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReimageOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      reimageOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: reimageOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  retrieveBootDiagnosticsData(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams
  ): Promise<VirtualMachinesRetrieveBootDiagnosticsDataResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      retrieveBootDiagnosticsDataOperationSpec
    ) as Promise<VirtualMachinesRetrieveBootDiagnosticsDataResponse>;
  }

  /**
   * The operation to perform maintenance on a virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async performMaintenance(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
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
      performMaintenanceOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: performMaintenanceOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to simulate the eviction of spot virtual machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  simulateEviction(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      simulateEvictionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Assess patches on the VM.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param options The options parameters.
   */
  async assessPatches(
    resourceGroupName: string,
    vmName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesAssessPatchesResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesAssessPatchesResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      assessPatchesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: assessPatchesOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Installs patches on the VM.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param installPatchesInput Input for InstallPatches as directly received by the API
   * @param options The options parameters.
   */
  async installPatches(
    resourceGroupName: string,
    vmName: string,
    installPatchesInput: VirtualMachineInstallPatchesParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesInstallPatchesResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      installPatchesInput,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesInstallPatchesResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      installPatchesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: installPatchesOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Run command on the VM.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine.
   * @param parameters Parameters supplied to the Run command operation.
   * @param options The options parameters.
   */
  async runCommand(
    resourceGroupName: string,
    vmName: string,
    parameters: RunCommandInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesRunCommandResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesRunCommandResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      runCommandOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: runCommandOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * ListByLocationNext
   * @param location The location for which virtual machines under the subscription are queried.
   * @param nextLink The nextLink from the previous successful call to the ListByLocation method.
   * @param options The options parameters.
   */
  private _listByLocationNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesListByLocationNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByLocationNextOperationSpec
    ) as Promise<VirtualMachinesListByLocationNextResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachinesListNextResponse>;
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  private _listAllNext(
    nextLink: string,
    options?: VirtualMachinesListAllNextOptionalParams
  ): Promise<VirtualMachinesListAllNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllNextOperationSpec
    ) as Promise<VirtualMachinesListAllNextResponse>;
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

const listByLocationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const captureOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineCaptureResult
    },
    201: {
      bodyMapper: Mappers.VirtualMachineCaptureResult
    },
    202: {
      bodyMapper: Mappers.VirtualMachineCaptureResult
    },
    204: {
      bodyMapper: Mappers.VirtualMachineCaptureResult
    }
  },
  requestBody: Parameters.parameters10,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine
    },
    201: {
      bodyMapper: Mappers.VirtualMachine
    },
    202: {
      bodyMapper: Mappers.VirtualMachine
    },
    204: {
      bodyMapper: Mappers.VirtualMachine
    }
  },
  requestBody: Parameters.parameters11,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine
    },
    201: {
      bodyMapper: Mappers.VirtualMachine
    },
    202: {
      bodyMapper: Mappers.VirtualMachine
    },
    204: {
      bodyMapper: Mappers.VirtualMachine
    }
  },
  requestBody: Parameters.parameters12,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.forceDeletion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const instanceViewOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/instanceView",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineInstanceView
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const convertToManagedDisksOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const deallocateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const generalizeOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/generalize",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.statusOnly],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listAvailableSizesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/vmSizes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineSizeListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const powerOffOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.skipShutdown],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const reapplyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply",
  httpMethod: "POST",
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
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const restartOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const startOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const redeployOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const reimageOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters13,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const retrieveBootDiagnosticsDataOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RetrieveBootDiagnosticsDataResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.sasUriExpirationTimeInMinutes
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const performMaintenanceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const simulateEvictionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/simulateEviction",
  httpMethod: "POST",
  responses: { 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  serializer
};
const assessPatchesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineAssessPatchesResult
    },
    201: {
      bodyMapper: Mappers.VirtualMachineAssessPatchesResult
    },
    202: {
      bodyMapper: Mappers.VirtualMachineAssessPatchesResult
    },
    204: {
      bodyMapper: Mappers.VirtualMachineAssessPatchesResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const installPatchesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineInstallPatchesResult
    },
    201: {
      bodyMapper: Mappers.VirtualMachineInstallPatchesResult
    },
    202: {
      bodyMapper: Mappers.VirtualMachineInstallPatchesResult
    },
    204: {
      bodyMapper: Mappers.VirtualMachineInstallPatchesResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.installPatchesInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const runCommandOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandResult
    },
    201: {
      bodyMapper: Mappers.RunCommandResult
    },
    202: {
      bodyMapper: Mappers.RunCommandResult
    },
    204: {
      bodyMapper: Mappers.RunCommandResult
    }
  },
  requestBody: Parameters.parameters14,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const listByLocationNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.statusOnly],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
