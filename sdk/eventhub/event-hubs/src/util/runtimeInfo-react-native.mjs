// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { Platform } = require("react-native"); // eslint-disable-line @typescript-eslint/no-require-imports
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getRuntimeInfo() {
    const { major, minor, patch } = Platform.constants.reactNativeVersion;
    const runtimeInfo = {
        key: "react-native",
        value: `${major}.${minor}.${patch}`,
    };
    const osInfo = {
        key: "OS",
        value: `${Platform.OS}-${Platform.Version}`,
    };
    return `${runtimeInfo.key}/${runtimeInfo.value} ${osInfo.key}/${osInfo.value}`;
}
//# sourceMappingURL=runtimeInfo-react-native.mjs.map