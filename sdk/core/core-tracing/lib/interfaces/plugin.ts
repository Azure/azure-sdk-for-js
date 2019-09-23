// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Tracer } from "./tracer";
import { SupportedPlugins } from "../utils/supportedPlugins";

export interface Plugin extends Tracer {
  /**
   * Returns the type of the plugin being used by the tracer.
   * @returns the type of the plugin being used by the tracer. 
   */
  readonly pluginType: SupportedPlugins;
}
