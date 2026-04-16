import azsdkEslint from "@azure/eslint-plugin-azure-sdk";
import { globalIgnores } from "eslint/config";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "@typescript-eslint/no-redeclare": "warn",
    },
  },
  globalIgnores(["**/src/crc64.js", "**/src/crc64_glue.js"]), // These two files are auto generated with WebAssembly generator for c++
]);
