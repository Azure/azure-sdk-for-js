// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError, ParsingErrorParams } from "./internal";
import { ResultFormatter } from "./internal";

export class ParsingErrorImpl implements ParsingError {
  primaryId: string = "";
  secondaryId: string = "";
  property: string = "";
  value: string = "";
  cause: string;
  action: string;
  validationId: string;

  constructor(
    validationId: string,
    { cause, action, primaryId, secondaryId, property, value }: ParsingErrorParams
  ) {
    const causeFormatter = new ResultFormatter(cause);
    const actionFormatter = new ResultFormatter(action);

    if (primaryId !== undefined) {
      this.primaryId = primaryId;
      causeFormatter.install("primaryId", primaryId);
      actionFormatter.install("primaryId", primaryId);
    }

    if (secondaryId !== undefined) {
      this.secondaryId = secondaryId;
      causeFormatter.install("secondaryId", secondaryId);
      actionFormatter.install("secondaryId", secondaryId);
    }

    if (property !== undefined) {
      this.property = property;
      causeFormatter.install("property", property);
      actionFormatter.install("property", property);
    }

    if (value !== undefined) {
      this.value = value;
      causeFormatter.install("value", value);
      actionFormatter.install("value", value);
    }

    this.cause = causeFormatter.toString();
    this.action = actionFormatter.toString();

    this.validationId = validationId;
  }
}
