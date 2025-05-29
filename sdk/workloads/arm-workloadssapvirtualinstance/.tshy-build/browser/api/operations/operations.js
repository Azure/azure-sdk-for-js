// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { _operationListResultDeserializer, errorResponseDeserializer, } from "../../models/models.js";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { createRestError, operationOptionsToRequestParameters, } from "@azure-rest/core-client";
export function _listSend(context, options = { requestOptions: {} }) {
    var _a, _b;
    const path = expandUrlTemplate("/providers/Microsoft.Workloads/operations{?api%2Dversion}", {
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
export async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = errorResponseDeserializer(result.body);
        throw error;
    }
    return _operationListResultDeserializer(result.body);
}
/** List the operations for the provider */
export function list(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _listSend(context, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
//# sourceMappingURL=operations.js.map