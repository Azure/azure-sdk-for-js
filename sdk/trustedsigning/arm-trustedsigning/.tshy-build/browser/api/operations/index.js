// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { operationOptionsToRequestParameters, createRestError, } from "@azure-rest/core-client";
import { buildPagedAsyncIterator, } from "../../static-helpers/pagingHelpers.js";
export function _listSend(context, options = { requestOptions: {} }) {
    return context
        .path("/providers/Microsoft.CodeSigning/operations")
        .get(Object.assign({}, operationOptionsToRequestParameters(options)));
}
export async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return {
        value: result.body["value"].map((p) => {
            var _a, _b, _c, _d;
            return {
                name: p["name"],
                isDataAction: p["isDataAction"],
                display: !p.display
                    ? undefined
                    : {
                        provider: (_a = p.display) === null || _a === void 0 ? void 0 : _a["provider"],
                        resource: (_b = p.display) === null || _b === void 0 ? void 0 : _b["resource"],
                        operation: (_c = p.display) === null || _c === void 0 ? void 0 : _c["operation"],
                        description: (_d = p.display) === null || _d === void 0 ? void 0 : _d["description"],
                    },
                origin: p["origin"],
                actionType: p["actionType"],
            };
        }),
        nextLink: result.body["nextLink"],
    };
}
/** List the operations for the provider */
export function list(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _listSend(context, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
//# sourceMappingURL=index.js.map