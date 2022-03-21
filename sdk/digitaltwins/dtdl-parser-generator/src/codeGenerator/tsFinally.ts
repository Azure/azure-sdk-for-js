// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "./internal";

export class TsFinally extends TsScope {
  constructor() {
    super(` finally`, true);
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}
