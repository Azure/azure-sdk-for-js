// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { chaiAzure } from "@azure-tools/test-utils-vitest";
import { chai, should as shouldFn, assert, expect } from "vitest";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
chai.use(chaiAzure);
const should = shouldFn();
export { should, expect, assert };
