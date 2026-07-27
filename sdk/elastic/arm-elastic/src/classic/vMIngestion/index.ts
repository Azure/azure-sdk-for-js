// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { details } from "../../api/vMIngestion/operations.js";
import type { vMIngestionDetailsOptionalParams } from "../../api/vMIngestion/options.js";
import type { VMIngestionDetailsResponse } from "../../models/models.js";

/** Interface representing a vMIngestion operations. */
export interface vMIngestionOperations {
  /** List detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
  details: (
    resourceGroupName: string,
    monitorName: string,
    options?: vMIngestionDetailsOptionalParams,
  ) => Promise<VMIngestionDetailsResponse>;
}

function _getvMIngestion(context: MicrosoftElasticContext) {
  return {
    details: (
      resourceGroupName: string,
      monitorName: string,
      options?: vMIngestionDetailsOptionalParams,
    ) => details(context, resourceGroupName, monitorName, options),
  };
}

export function _getvMIngestionOperations(context: MicrosoftElasticContext): vMIngestionOperations {
  return {
    ..._getvMIngestion(context),
  };
}
