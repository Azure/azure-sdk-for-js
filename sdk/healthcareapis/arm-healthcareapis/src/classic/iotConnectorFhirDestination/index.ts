// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/iotConnectorFhirDestination/operations.js";
import {
  IotConnectorFhirDestinationDeleteOptionalParams,
  IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  IotConnectorFhirDestinationGetOptionalParams,
} from "../../api/iotConnectorFhirDestination/options.js";
import { IotFhirDestination } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IotConnectorFhirDestination operations. */
export interface IotConnectorFhirDestinationOperations {
  /** Deletes an IoT Connector FHIR destination. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    options?: IotConnectorFhirDestinationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    options?: IotConnectorFhirDestinationDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    options?: IotConnectorFhirDestinationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an IoT Connector FHIR destination resource with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    iotFhirDestination: IotFhirDestination,
    options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IotFhirDestination>, IotFhirDestination>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    iotFhirDestination: IotFhirDestination,
    options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotFhirDestination>, IotFhirDestination>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    iotFhirDestination: IotFhirDestination,
    options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  ) => Promise<IotFhirDestination>;
  /** Gets the properties of the specified Iot Connector FHIR destination. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    fhirDestinationName: string,
    options?: IotConnectorFhirDestinationGetOptionalParams,
  ) => Promise<IotFhirDestination>;
}

function _getIotConnectorFhirDestination(context: HealthcareApisManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      options?: IotConnectorFhirDestinationDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      options?: IotConnectorFhirDestinationDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      options?: IotConnectorFhirDestinationDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      iotFhirDestination: IotFhirDestination,
      options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        iotFhirDestination,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      iotFhirDestination: IotFhirDestination,
      options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        iotFhirDestination,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      iotFhirDestination: IotFhirDestination,
      options?: IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        iotFhirDestination,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      fhirDestinationName: string,
      options?: IotConnectorFhirDestinationGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        options,
      ),
  };
}

export function _getIotConnectorFhirDestinationOperations(
  context: HealthcareApisManagementContext,
): IotConnectorFhirDestinationOperations {
  return {
    ..._getIotConnectorFhirDestination(context),
  };
}
