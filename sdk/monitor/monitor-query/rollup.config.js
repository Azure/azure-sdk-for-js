import { makeConfig } from "@azure/dev-tool/shared-config/rollup";

// temporarily disabling browser bundle - there's an issue rolling up @opentelemetry/node that I need to solve.
export default makeConfig(require("./package.json"), { disableBrowserBundle: true });
