// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as Ora from "ora";

export default (text: string): any => {
  return new (Ora as any).default({
    spinner: "clock",
    text
  });
};
