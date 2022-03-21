// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "./internal";

export class TsFor extends TsScope {
  constructor(text: string) {
    super(`for (${text})`);
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}
