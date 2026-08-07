// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { list, get } from "../../api/services/operations.js";
import type {
  ServicesListOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import type { Service } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Lists all the Azure services available for support ticket creation. For **Technical** issues, select the Service Id that maps to the Azure service/product as displayed in the **Services** drop-down list on the Azure portal's [New support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview) page. Always use the service and its corresponding problem classification(s) obtained programmatically for support ticket creation. This practice ensures that you always have the most recent set of service and problem classification Ids. */
  list: (options?: ServicesListOptionalParams) => PagedAsyncIterableIterator<Service>;
  /** Gets a specific Azure service for support ticket creation. */
  get: (serviceName: string, options?: ServicesGetOptionalParams) => Promise<Service>;
}

function _getServices(context: MicrosoftSupportContext) {
  return {
    list: (options?: ServicesListOptionalParams) => list(context, options),
    get: (serviceName: string, options?: ServicesGetOptionalParams) =>
      get(context, serviceName, options),
  };
}

export function _getServicesOperations(context: MicrosoftSupportContext): ServicesOperations {
  return {
    ..._getServices(context),
  };
}
