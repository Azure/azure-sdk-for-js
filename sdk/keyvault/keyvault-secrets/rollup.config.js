import * as base from "./rollup.base.config";

export default [base.nodeConfig(), base.nodeConfig(true), base.browserConfig(true)];
