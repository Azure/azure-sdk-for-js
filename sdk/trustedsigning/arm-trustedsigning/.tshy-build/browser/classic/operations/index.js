// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { list } from "../../api/operations/index.js";
export function getOperations(context) {
    return {
        list: (options) => list(context, options),
    };
}
export function getOperationsOperations(context) {
    return Object.assign({}, getOperations(context));
}
//# sourceMappingURL=index.js.map