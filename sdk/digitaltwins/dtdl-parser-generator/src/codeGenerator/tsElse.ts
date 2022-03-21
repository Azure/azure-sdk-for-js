// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "./internal";

export class TsElse extends TsScope {
  constructor() {
    super(` else`, true);
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}
