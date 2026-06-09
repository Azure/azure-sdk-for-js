// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { details } from "../../api/vmIngestion/operations.js";
import type { VMIngestionDetailsOptionalParams } from "../../api/vmIngestion/options.js";
import type { VMIngestionDetailsResponse } from "../../models/models.js";

/** Interface representing a VMIngestion operations. */
export interface VMIngestionOperations {
  /** List detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
  details: (
    resourceGroupName: string,
    monitorName: string,
    options?: VMIngestionDetailsOptionalParams,
  ) => Promise<VMIngestionDetailsResponse>;
}

function _getVMIngestion(context: MicrosoftElasticContext) {
  return {
    details: (
      resourceGroupName: string,
      monitorName: string,
      options?: VMIngestionDetailsOptionalParams,
    ) => details(context, resourceGroupName, monitorName, options),
  };
}

export function _getVMIngestionOperations(context: MicrosoftElasticContext): VMIngestionOperations {
  return {
    ..._getVMIngestion(context),
  };
}
