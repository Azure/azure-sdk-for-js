// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { listByIotConnector } from "../../api/fhirDestinations/operations.js";
import type { FhirDestinationsListByIotConnectorOptionalParams } from "../../api/fhirDestinations/options.js";
import type { IotFhirDestination } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
