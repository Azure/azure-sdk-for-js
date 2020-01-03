// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as Ora from "ora";

export default (text: string) => {
  return new Ora({
    spinner: "clock",
    text
  });
};
