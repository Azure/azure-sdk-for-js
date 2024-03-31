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
} from "./utils";
export type {
  PortalData,
  EditorData,
  OnChange,
  Secrets,
  TargetModule,
  ValuesCommon,
  Environment,
} from "./utils";
export {
  BLOB_ROOT,
  APIM_CONFIG_FILE_NAME,
  BLOB_DATA_FOLDER,
  BLOB_CONFIGS_FOLDER,
  buildBlobDataPath,
  buildBlobConfigPath,
} from "./paths";

import deployNodeJS from "./node/deploy";
export { deployNodeJS };
export type { ServiceInformation, DeployConfig } from "./node/deploy";
