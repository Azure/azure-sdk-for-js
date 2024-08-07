// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { chai, should as shouldFn, assert, expect } from "vitest";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = shouldFn();
export { should, expect, assert };
