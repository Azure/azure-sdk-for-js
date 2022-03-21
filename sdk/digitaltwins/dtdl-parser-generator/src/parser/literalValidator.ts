// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class LiteralValidator {
  // TODO Seems a bit strict by JD. Please check why tests are not failing.
  public static hasValue(_element: unknown, _value: unknown): boolean {
    return false;
  }
}
