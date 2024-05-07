// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Linting rules for the JavaScript/TypeScript Azure SDK
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import configs from "./configs";
import processors from "./processors";
import rules from "./rules";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

/**
 * The elements making up the plugin
 */
export = { configs, processors, rules };
