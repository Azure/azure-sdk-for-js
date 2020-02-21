// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Linting rules for the JavaScript/TypeScript Azure SDK
 * @author Arpan Laha
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
