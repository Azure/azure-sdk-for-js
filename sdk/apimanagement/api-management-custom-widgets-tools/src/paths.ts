// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const ROOT = "custom-widgets";
export const DATA_FOLDER = "data";
export const CONFIGS_FOLDER = "configs";
export const CONFIG_FILE_NAME = "config.msapim.json";

export function buildBlobDataSrc(name: string): string {
  return `/${ROOT}/${DATA_FOLDER}/${name}`;
}

export function buildBlobConfigSrc(name: string): string {
  return `/${ROOT}/${CONFIGS_FOLDER}/${name}/${CONFIG_FILE_NAME}`;
}
