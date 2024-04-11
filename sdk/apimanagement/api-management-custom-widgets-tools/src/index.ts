// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @packageDocumentation https://aka.ms/apimdocs/portal/customwidgets
 */

export {
  APIM_EDITOR_DATA_KEY,
  APIM_ON_CHANGE_MESSAGE_KEY,
  APIM_ASK_FOR_SECRETS_MESSAGE_KEY,
  getWidgetData,
  getEditorValues,
  getValues,
  askForSecrets,
  buildOnChange,
  onChangeWithOrigin,
} from "./utils.js";
export type {
  PortalData,
  EditorData,
  OnChange,
  Secrets,
  TargetModule,
  ValuesCommon,
  Environment,
} from "./utils.js";
export {
  BLOB_ROOT,
  APIM_CONFIG_FILE_NAME,
  BLOB_DATA_FOLDER,
  BLOB_CONFIGS_FOLDER,
  buildBlobDataPath,
  buildBlobConfigPath,
} from "./paths.js";

import deployNodeJS from "./node/deploy.js";
export { deployNodeJS };
export type { ServiceInformation, DeployConfig } from "./node/deploy.js";
