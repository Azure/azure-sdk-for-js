// Copyright (c) Microsoft Corporation.

import { WithRequired } from "../../utils/typeUtils";

// Licensed under the MIT license.
export interface DatabaseDefinition {
  /** The id of the database. */
  id?: string;
}

export type DatabaseDefinitionResponse = WithRequired<DatabaseDefinition, "id" >