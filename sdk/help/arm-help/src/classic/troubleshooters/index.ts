// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext } from "../../api/helpContext.js";
import { TroubleshooterResource, RestartTroubleshooterResponse } from "../../models/models.js";
import {
  TroubleshootersRestartOptionalParams,
  TroubleshootersEndOptionalParams,
  TroubleshootersContinueOptionalParams,
  TroubleshootersCreateOptionalParams,
  TroubleshootersGetOptionalParams,
} from "../../api/troubleshooters/options.js";
import { restart, end, $continue, create, get } from "../../api/troubleshooters/operations.js";

/** Interface representing a Troubleshooters operations. */
export interface TroubleshootersOperations {
  /** Restarts the troubleshooter API using applicable troubleshooter resource name as the input.<br/> It returns new resource name which should be used in subsequent request. The old resource name is obsolete after this API is invoked. */
  restart: (
    scope: string,
    troubleshooterName: string,
    options?: TroubleshootersRestartOptionalParams,
  ) => Promise<RestartTroubleshooterResponse>;
  /** Ends the troubleshooter action */
  end: (
    scope: string,
    troubleshooterName: string,
    options?: TroubleshootersEndOptionalParams,
  ) => Promise<void>;
  /** Uses ‘stepId’ and ‘responses’ as the trigger to continue the troubleshooting steps for the respective troubleshooter resource name. <br/>Continue API is used to provide inputs that are required for the specific troubleshooter to progress into the next step in the process. This API is used after the Troubleshooter has been created using the Create API. */
  /**
   *  @fixme continue is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  continue: (
    scope: string,
    troubleshooterName: string,
    options?: TroubleshootersContinueOptionalParams,
  ) => Promise<void>;
  /** Creates the specific troubleshooter action under a resource or subscription using the ‘solutionId’ and  ‘properties.parameters’ as the trigger. <br/> Azure Troubleshooters help with hard to classify issues, reducing the gap between customer observed problems and solutions by guiding the user effortlessly through the troubleshooting process. Each Troubleshooter flow represents a problem area within Azure and has a complex tree-like structure that addresses many root causes. These flows are prepared with the help of Subject Matter experts and customer support engineers by carefully considering previous support requests raised by customers. Troubleshooters terminate at a well curated solution based off of resource backend signals and customer manual selections. */
  create: (
    scope: string,
    troubleshooterName: string,
    options?: TroubleshootersCreateOptionalParams,
  ) => Promise<TroubleshooterResource>;
  /** Gets troubleshooter instance result which includes the step status/result of the troubleshooter resource name that is being executed.<br/> Get API is used to retrieve the result of a Troubleshooter instance, which includes the status and result of each step in the Troubleshooter workflow. This API requires the Troubleshooter resource name that was created using the Create API. */
  get: (
    scope: string,
    troubleshooterName: string,
    options?: TroubleshootersGetOptionalParams,
  ) => Promise<TroubleshooterResource>;
}

function _getTroubleshooters(context: HelpContext) {
  return {
    restart: (
      scope: string,
      troubleshooterName: string,
      options?: TroubleshootersRestartOptionalParams,
    ) => restart(context, scope, troubleshooterName, options),
    end: (scope: string, troubleshooterName: string, options?: TroubleshootersEndOptionalParams) =>
      end(context, scope, troubleshooterName, options),
    continue: (
      scope: string,
      troubleshooterName: string,
      options?: TroubleshootersContinueOptionalParams,
    ) => $continue(context, scope, troubleshooterName, options),
    create: (
      scope: string,
      troubleshooterName: string,
      options?: TroubleshootersCreateOptionalParams,
    ) => create(context, scope, troubleshooterName, options),
    get: (scope: string, troubleshooterName: string, options?: TroubleshootersGetOptionalParams) =>
      get(context, scope, troubleshooterName, options),
  };
}

export function _getTroubleshootersOperations(context: HelpContext): TroubleshootersOperations {
  return {
    ..._getTroubleshooters(context),
  };
}
