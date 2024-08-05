// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { chai, should as shouldFn, assert, expect } from "vitest";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const should = shouldFn();
export { should, expect, assert };
