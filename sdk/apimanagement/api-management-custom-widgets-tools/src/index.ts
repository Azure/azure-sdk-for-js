// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @packageDocumentation https://aka.ms/apimdocs/portal/customwidgets
 */

export {
  EDITOR_DATA_KEY,
  ON_CHANGE_MESSAGE_KEY,
  ASK_FOR_SECRETS_MESSAGE_KEY,
  getEditorData,
  getEditorValues,
  askForSecrets,
  buildOnChange,
  onChangeWithOrigin,
} from "./utils";
export type {
  TEditorData,
  TOnChange,
  TSecrets,
  TTargetModule,
  TValuesCommon,
  TEnvironment,
} from "./utils";

import deployNodeJS from "./node/deploy";
export { deployNodeJS };
export type { TServiceInformation } from "./node/deploy";
