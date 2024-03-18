// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Linting rules for the JavaScript/TypeScript Azure SDK
 * @author Arpan Laha
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import configs from "./configs/index.js";
import processors from "./processors/index.js";
import rules from "./rules/index.js";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

/**
 * The elements making up the plugin
 */
export default { configs, processors, rules };
