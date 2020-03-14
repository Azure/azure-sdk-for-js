// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand } from "../util/subCommand";

export const helpText = "manage samples in an SDK package";

export default subCommand("samples", {
  "dev": () => import("./dev-samples"),
  "prep": () => import("./prep-samples"),
  "run": () => import("./run-samples")
});