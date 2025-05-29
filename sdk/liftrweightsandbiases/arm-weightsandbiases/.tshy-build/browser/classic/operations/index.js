// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { list } from "../../api/operations/operations.js";
function _getOperations(context) {
    return {
        list: (options) => list(context, options),
    };
}
export function _getOperationsOperations(context) {
    return Object.assign({}, _getOperations(context));
}
//# sourceMappingURL=index.js.map