import * as base from "./rollup.base.config";

export default [
  base.nodeTestConfig("unit"),
  base.nodeTestConfig("integration"),
  base.browserTestConfig("unit"),
  base.browserTestConfig("integration")
];
