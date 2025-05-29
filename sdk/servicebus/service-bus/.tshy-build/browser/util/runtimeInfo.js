// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
export function getRuntimeInfo() {
    const navigator = self.navigator;
    const osInfo = {
        key: "OS",
        value: (navigator.oscpu || navigator.platform).replace(" ", ""),
    };
    return `${osInfo.key}/${osInfo.value}`;
}
//# sourceMappingURL=runtimeInfo-browser.mjs.map