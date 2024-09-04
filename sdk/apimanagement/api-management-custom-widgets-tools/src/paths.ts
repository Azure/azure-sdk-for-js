// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** root of the blob storage folder */
export const BLOB_ROOT = "custom-widgets";
/** name of the blob storage folder with widget implementation */
export const BLOB_DATA_FOLDER = "data";
/** name of the blob storage folder with widget configs */
export const BLOB_CONFIGS_FOLDER = "configs";
/** name of the configuration file */
export const APIM_CONFIG_FILE_NAME = "config.msapim.json";

/**
 * Generate relative path for widgets' data on the blob storage
 *
 * @param name - name of the widget
 */
export function buildBlobDataPath(name: string): string {
  return `${BLOB_ROOT}/${BLOB_DATA_FOLDER}/${name}/`;
}

/**
 * Generate relative path for widgets' config on the blob storage
 *
 * @param name - name of the widget
 */
export function buildBlobConfigPath(name: string): string {
  return `${BLOB_ROOT}/${BLOB_CONFIGS_FOLDER}/${name}/${APIM_CONFIG_FILE_NAME}`;
}
