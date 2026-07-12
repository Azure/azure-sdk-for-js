// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { list } from "../../api/discoverySolution/operations.js";
import { DiscoverySolutionListOptionalParams } from "../../api/discoverySolution/options.js";
import { SolutionMetadataResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiscoverySolution operations. */
export interface DiscoverySolutionOperations {
  /** Lists the relevant Azure Diagnostics, Solutions and Troubleshooters using [problemClassification API](https://learn.microsoft.com/rest/api/support/problem-classifications/list?tabs=HTTP)) AND  resourceUri or resourceType.<br/> Discovery Solutions is the initial entry point within Help API, which identifies relevant Azure diagnostics and solutions. <br/><br/> Required Input :  problemClassificationId (Use the [problemClassification API](https://learn.microsoft.com/rest/api/support/problem-classifications/list?tabs=HTTP)) <br/>Optional input: resourceUri OR resource Type <br/><br/> <b>Note: </b>  ‘requiredInputs’ from Discovery solutions response must be passed via ‘additionalParameters’ as an input to Diagnostics and Solutions API. */
  list: (
    options?: DiscoverySolutionListOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionMetadataResource>;
}

function _getDiscoverySolution(context: HelpRPContext) {
  return {
    list: (options?: DiscoverySolutionListOptionalParams) => list(context, options),
  };
}

export function _getDiscoverySolutionOperations(
  context: HelpRPContext,
): DiscoverySolutionOperations {
  return {
    ..._getDiscoverySolution(context),
  };
}
