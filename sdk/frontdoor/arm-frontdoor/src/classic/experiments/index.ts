// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  listByProfile,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/experiments/operations.js";
import type {
  ExperimentsListByProfileOptionalParams,
  ExperimentsDeleteOptionalParams,
  ExperimentsUpdateOptionalParams,
  ExperimentsCreateOrUpdateOptionalParams,
  ExperimentsGetOptionalParams,
} from "../../api/experiments/options.js";
import type { Experiment, ExperimentUpdateModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Experiments operations. */
export interface ExperimentsOperations {
  /** Gets a list of Experiments */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: ExperimentsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Experiment>;
  /** Deletes an Experiment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    options?: ExperimentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    options?: ExperimentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    options?: ExperimentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an Experiment */
  update: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: ExperimentUpdateModel,
    options?: ExperimentsUpdateOptionalParams,
  ) => PollerLike<OperationState<Experiment>, Experiment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: ExperimentUpdateModel,
    options?: ExperimentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Experiment>, Experiment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: ExperimentUpdateModel,
    options?: ExperimentsUpdateOptionalParams,
  ) => Promise<Experiment>;
  /** Creates or updates an Experiment */
  createOrUpdate: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: Experiment,
    options?: ExperimentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Experiment>, Experiment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: Experiment,
    options?: ExperimentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Experiment>, Experiment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    parameters: Experiment,
    options?: ExperimentsCreateOrUpdateOptionalParams,
  ) => Promise<Experiment>;
  /** Gets an Experiment by ExperimentName */
  get: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    options?: ExperimentsGetOptionalParams,
  ) => Promise<Experiment>;
}

function _getExperiments(context: FrontDoorManagementContext) {
  return {
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: ExperimentsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      options?: ExperimentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, experimentName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      options?: ExperimentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, experimentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      options?: ExperimentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, experimentName, options);
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: ExperimentUpdateModel,
      options?: ExperimentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, experimentName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: ExperimentUpdateModel,
      options?: ExperimentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: ExperimentUpdateModel,
      options?: ExperimentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: Experiment,
      options?: ExperimentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, profileName, experimentName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: Experiment,
      options?: ExperimentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      parameters: Experiment,
      options?: ExperimentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      options?: ExperimentsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, experimentName, options),
  };
}

export function _getExperimentsOperations(
  context: FrontDoorManagementContext,
): ExperimentsOperations {
  return {
    ..._getExperiments(context),
  };
}
