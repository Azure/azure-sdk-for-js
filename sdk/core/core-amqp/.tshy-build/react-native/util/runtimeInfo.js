// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Platform } from "react-native";
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo() {
    return `(${Platform.OS}-${Platform.Version})`;
}
/**
 * Returns information about React-Native this function is being run on.
 * @internal
 */
export function getFrameworkInfo() {
    var _a;
    if ((_a = Platform.constants) === null || _a === void 0 ? void 0 : _a.reactNativeVersion) {
        const { major, minor, patch } = Platform.constants.reactNativeVersion;
        return `react-native/${major}.${minor}.${patch}`;
    }
    return `react-native/unknown`;
}
//# sourceMappingURL=runtimeInfo-react-native.mjs.map