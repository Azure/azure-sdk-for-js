// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProcessorContext } from "./processorContext";

export class PartitionManager {

  private _context: ProcessorContext;

  constructor(context: ProcessorContext) {
    this._context = context;
  }

  async init(): Promise<void> {
    // Ensure that the lease store exists
    // Ensure that the leases exist.

  }


}
