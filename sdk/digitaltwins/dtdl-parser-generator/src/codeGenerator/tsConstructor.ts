// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsFunction, TsFunctionType, TsParameterParams, TsScope } from "./internal";

export class TsConstructor extends TsFunction {
  constructor(isStatic: boolean) {
    if (isStatic) {
      super({ name: "initialize", functionType: TsFunctionType.Method, isStatic: true });
    } else {
      super({ name: "constructor", functionType: TsFunctionType.Method });
    }
  }

  parameter(input: TsParameterParams): TsConstructor {
    super.parameter(input);
    return this;
  }

  super(inputs: string[]): TsScope {
    const superCall = this.body.function({ name: "super", functionType: TsFunctionType.Method });
    inputs.forEach((inputName) => {
      superCall.parameter({ name: inputName });
    });

    return this.body as TsScope;
  }
}
