// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByServer, update, get } from "../../api/serverAdvisors/operations.js";
import type {
  ServerAdvisorsListByServerOptionalParams,
  ServerAdvisorsUpdateOptionalParams,
  ServerAdvisorsGetOptionalParams,
} from "../../api/serverAdvisors/options.js";
import type { Advisor } from "../../models/models.js";

/** Interface representing a ServerAdvisors operations. */
export interface ServerAdvisorsOperations {
  /** Gets a list of server advisors. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAdvisorsListByServerOptionalParams,
  ) => Promise<Advisor[]>;
  /** Updates a server advisor. */
  update: (
    resourceGroupName: string,
    serverName: string,
    advisorName: string,
    parameters: Advisor,
    options?: ServerAdvisorsUpdateOptionalParams,
  ) => Promise<Advisor>;
  /** Gets a server advisor. */
  get: (
    resourceGroupName: string,
    serverName: string,
    advisorName: string,
    options?: ServerAdvisorsGetOptionalParams,
  ) => Promise<Advisor>;
}

function _getServerAdvisors(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAdvisorsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      advisorName: string,
      parameters: Advisor,
      options?: ServerAdvisorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, advisorName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      advisorName: string,
      options?: ServerAdvisorsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, advisorName, options),
  };
}

export function _getServerAdvisorsOperations(context: SqlContext): ServerAdvisorsOperations {
  return {
    ..._getServerAdvisors(context),
  };
}
