// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderContext } from "../../api/imageBuilderContext.js";
import {
  listRunOutputs,
  getRunOutput,
  cancel,
  run,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineImageTemplates/operations.js";
import {
  VirtualMachineImageTemplatesListRunOutputsOptionalParams,
  VirtualMachineImageTemplatesGetRunOutputOptionalParams,
  VirtualMachineImageTemplatesCancelOptionalParams,
  VirtualMachineImageTemplatesRunOptionalParams,
  VirtualMachineImageTemplatesListOptionalParams,
  VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
  VirtualMachineImageTemplatesDeleteOptionalParams,
  VirtualMachineImageTemplatesUpdateOptionalParams,
  VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  VirtualMachineImageTemplatesGetOptionalParams,
} from "../../api/virtualMachineImageTemplates/options.js";
import { ImageTemplate, ImageTemplateUpdateParameters, RunOutput } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineImageTemplates operations. */
export interface VirtualMachineImageTemplatesOperations {
  /** List all run outputs for the specified Image Template resource */
  listRunOutputs: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesListRunOutputsOptionalParams,
  ) => PagedAsyncIterableIterator<RunOutput>;
  /** Get the specified run output for the specified image template resource */
  getRunOutput: (
    resourceGroupName: string,
    imageTemplateName: string,
    runOutputName: string,
    options?: VirtualMachineImageTemplatesGetRunOutputOptionalParams,
  ) => Promise<RunOutput>;
  /** Cancel the long running image build based on the image template */
  cancel: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesCancelOptionalParams,
  ) => Promise<void>;
  /** Create artifacts from a existing image template */
  run: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesRunOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use run instead */
  beginRun: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesRunOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use run instead */
  beginRunAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesRunOptionalParams,
  ) => Promise<void>;
  /** Gets information about the VM image templates associated with the subscription. */
  list: (
    options?: VirtualMachineImageTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<ImageTemplate>;
  /** Gets information about the VM image templates associated with the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ImageTemplate>;
  /** Delete a virtual machine image template */
  delete: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the tags for this Virtual Machine Image Template */
  update: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplateUpdateParameters,
    options?: VirtualMachineImageTemplatesUpdateOptionalParams,
  ) => PollerLike<OperationState<ImageTemplate>, ImageTemplate>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplateUpdateParameters,
    options?: VirtualMachineImageTemplatesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ImageTemplate>, ImageTemplate>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplateUpdateParameters,
    options?: VirtualMachineImageTemplatesUpdateOptionalParams,
  ) => Promise<ImageTemplate>;
  /** Create or update a virtual machine image template */
  createOrUpdate: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplate,
    options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ImageTemplate>, ImageTemplate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplate,
    options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ImageTemplate>, ImageTemplate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    parameters: ImageTemplate,
    options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  ) => Promise<ImageTemplate>;
  /** Get information about a virtual machine image template */
  get: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: VirtualMachineImageTemplatesGetOptionalParams,
  ) => Promise<ImageTemplate>;
}

function _getVirtualMachineImageTemplates(context: ImageBuilderContext) {
  return {
    listRunOutputs: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesListRunOutputsOptionalParams,
    ) => listRunOutputs(context, resourceGroupName, imageTemplateName, options),
    getRunOutput: (
      resourceGroupName: string,
      imageTemplateName: string,
      runOutputName: string,
      options?: VirtualMachineImageTemplatesGetRunOutputOptionalParams,
    ) => getRunOutput(context, resourceGroupName, imageTemplateName, runOutputName, options),
    cancel: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesCancelOptionalParams,
    ) => cancel(context, resourceGroupName, imageTemplateName, options),
    beginCancel: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, imageTemplateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, imageTemplateName, options);
    },
    run: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesRunOptionalParams,
    ) => run(context, resourceGroupName, imageTemplateName, options),
    beginRun: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesRunOptionalParams,
    ) => {
      const poller = run(context, resourceGroupName, imageTemplateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesRunOptionalParams,
    ) => {
      return await run(context, resourceGroupName, imageTemplateName, options);
    },
    list: (options?: VirtualMachineImageTemplatesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, imageTemplateName, options),
    beginDelete: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, imageTemplateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, imageTemplateName, options);
    },
    update: (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplateUpdateParameters,
      options?: VirtualMachineImageTemplatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, imageTemplateName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplateUpdateParameters,
      options?: VirtualMachineImageTemplatesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, imageTemplateName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplateUpdateParameters,
      options?: VirtualMachineImageTemplatesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, imageTemplateName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplate,
      options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, imageTemplateName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplate,
      options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        imageTemplateName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      parameters: ImageTemplate,
      options?: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        imageTemplateName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: VirtualMachineImageTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, imageTemplateName, options),
  };
}

export function _getVirtualMachineImageTemplatesOperations(
  context: ImageBuilderContext,
): VirtualMachineImageTemplatesOperations {
  return {
    ..._getVirtualMachineImageTemplates(context),
  };
}
