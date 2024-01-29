// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { chaiAzure } from "./chaiAzure";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";

// Imports a vanilla instance of Chai, adds commonly used plugins
// as well as our custom Azure assertions, and exports this instance.
// Plugins added here will be available to all client libraries to import from
// @azure/test-utils
chai.use(chaiAzure);
chai.use(chaiExclude);
chai.use(chaiAsPromised);
const { assert, expect, should } = chai;

export { chai, assert, expect, should };
export type { chaiAzure, chaiExclude, chaiAsPromised };
