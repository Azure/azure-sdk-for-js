// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";

export const getFilenames = function(testCaseFolder: string): string[] {
  const filenames = fs.readdirSync(testCaseFolder, "utf-8");
  return filenames;
};
