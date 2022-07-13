// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** root of the blob storage folder */
export const ROOT = "custom-widgets";
/** name of the blob storage folder with widget implementation */
export const DATA_FOLDER = "data";
/** name of the blob storage folder with widget configs */
export const CONFIGS_FOLDER = "configs";
/** name of the configuration file */
export const CONFIG_FILE_NAME = "config.msapim.json";

/**
 * Generate relative path for widgets' data on the blob storage
 *
 * @param name - name of the widget
 */
export function buildBlobDataSrc(name: string): string {
  return `${ROOT}/${DATA_FOLDER}/${name}/`;
}

/**
 * Generate relative path for widgets' config on the blob storage
 *
 * @param name - name of the widget
 */
export function buildBlobConfigSrc(name: string): string {
  return `${ROOT}/${CONFIGS_FOLDER}/${name}/${CONFIG_FILE_NAME}`;
}
