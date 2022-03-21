// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsInheritanceType } from "../internal";

export interface TsClassParams {
  name: string;
  exports?: boolean;
  abstract?: boolean;
  inheritance?: TsInheritanceType[];
}
