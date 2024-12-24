// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetWorkspaceResponseOutput } from "../customization/outputModels.js";
import type { ConnectionsOperations, GetWorkspaceOptionalParams } from "./customModels.js";

export interface ConnectionsInternalOperations extends ConnectionsOperations {
  /** Gets the properties of the specified machine learning workspace. */
  getWorkspace: (options?: GetWorkspaceOptionalParams) => Promise<GetWorkspaceResponseOutput>;
}
