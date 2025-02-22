// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { chaiAzure } from "@azure-tools/test-utils-vitest";
import { chai, should as shouldFn, assert } from "vitest";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(chaiAzure);
const should = shouldFn();
export { should, assert };
