// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import pluralizeLib from "pluralize";

pluralizeLib.addUncountableRule("redis");
pluralizeLib.addSingularRule(/(cache)s$/i, "$1");

export default pluralizeLib;
