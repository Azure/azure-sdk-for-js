// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { chai, should as shouldFn, assert, expect } from "vitest";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const should = shouldFn();
export { should, expect, assert };

declare global {
  interface Object {
    should: Chai.Assertion;
  }
}
