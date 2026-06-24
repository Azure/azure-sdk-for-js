// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { listByIotConnector } from "../../api/fhirDestinations/operations.js";
import { FhirDestinationsListByIotConnectorOptionalParams } from "../../api/fhirDestinations/options.js";
import { IotFhirDestination } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FhirDestinations operations. */
export interface FhirDestinationsOperations {
  /** Lists all FHIR destinations for the given IoT Connector */
  listByIotConnector: (
    resourceGroupName: string,
    workspaceName: string,
    iotConnectorName: string,
    options?: FhirDestinationsListByIotConnectorOptionalParams,
  ) => PagedAsyncIterableIterator<IotFhirDestination>;
}

function _getFhirDestinations(context: HealthcareApisManagementContext) {
  return {
    listByIotConnector: (
      resourceGroupName: string,
      workspaceName: string,
      iotConnectorName: string,
      options?: FhirDestinationsListByIotConnectorOptionalParams,
    ) => listByIotConnector(context, resourceGroupName, workspaceName, iotConnectorName, options),
  };
}

export function _getFhirDestinationsOperations(
  context: HealthcareApisManagementContext,
): FhirDestinationsOperations {
  return {
    ..._getFhirDestinations(context),
  };
}
