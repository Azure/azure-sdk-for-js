// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "./internal";

export class TsWhile extends TsScope {
  constructor(text: string) {
    super(`while (${text})`);
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}
