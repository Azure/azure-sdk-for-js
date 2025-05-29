// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo() {
    return `(javascript-Browser-${getReleaseInfo()})`;
}
/**
 * Returns information about Node.js this function is being run on.
 * @internal
 */
export function getFrameworkInfo() {
    return `Browser/${getReleaseInfo()}`;
}
/**
 * @internal
 *
 * @returns
 */
function getReleaseInfo() {
    if (typeof self === "undefined") {
        return "";
    }
    const navigator = self.navigator;
    return navigator.appVersion;
}
//# sourceMappingURL=runtimeInfo-browser.mjs.map