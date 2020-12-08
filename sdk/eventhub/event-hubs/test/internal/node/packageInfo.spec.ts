// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import fs from "fs";
import path from "path";
import { packageJsonInfo } from "../../../src/util/constants";

// Since we currently hardcode package name and version in `constants.ts` file,
// following test is in place to ensure the values in package.json and in this file are consistent
describe("Ensure package name and version are consistent in SDK and package.json", function(): void {
  it("Ensure constants.ts file is consistent with package.json", () => {
    const packageJsonFilePath = path.join(__dirname, "..", "..", "package.json");
    const rawFileContents = fs.readFileSync(packageJsonFilePath, { encoding: "utf-8" });
    const packageJsonContents = JSON.parse(rawFileContents);

    const name = packageJsonContents.name;
    const version = packageJsonContents.version;

    should.equal(
      packageJsonInfo.name,
      name,
      `${name} from package.json is not same as 'name' used in constants.ts`
    );
    should.equal(
      packageJsonInfo.version,
      version,
      `${version} from package.json is not same as 'version' used in constants.ts`
    );
  });
});
