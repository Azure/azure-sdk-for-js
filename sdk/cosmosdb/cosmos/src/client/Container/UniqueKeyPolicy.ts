// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** Interface for setting unique keys on container creation */
export interface UniqueKeyPolicy {
  uniqueKeys: UniqueKey[];
}

/** Interface for a single unique key passed as part of UniqueKeyPolicy */
export interface UniqueKey {
  paths: string[];
}
