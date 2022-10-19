// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "react-native" section in package.json.
 */
const { Platform } = require("react-native"); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports

/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
export function getRuntimeInfo(): string {
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
