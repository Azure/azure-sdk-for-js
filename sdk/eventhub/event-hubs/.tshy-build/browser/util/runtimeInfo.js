// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getRuntimeInfo() {
    return `BROWSER-VERSION; Browser ${getReleaseInfo()}`;
}
function getReleaseInfo() {
    if (typeof self === "undefined") {
        return "";
    }
    const navigator = self.navigator;
    return navigator.appVersion;
}
//# sourceMappingURL=runtimeInfo-browser.mjs.map