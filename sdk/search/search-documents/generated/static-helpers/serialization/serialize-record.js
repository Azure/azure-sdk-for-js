// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function serializeRecord(item, excludes, serializer) {
    const propertiesToExclude = excludes ?? [];
    const res = {};
    for (const key of Object.keys(item)) {
        if (propertiesToExclude.includes(key) || item[key] === undefined) {
            continue;
        }
        if (serializer) {
            res[key] = serializer(item[key]);
        }
        else {
            res[key] = item[key];
        }
    }
    return res;
}
//# sourceMappingURL=serialize-record.js.map