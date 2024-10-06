import addViHelper from "./add-vi-helper";
import fixSourceFile from "./fix-source-file";
import fixTestingImports from "./fix-testing-imports";
import replaceAssertIsRejected from "./replace-assert-isRejected";
import replaceSinonStub from "./replace-sinon-stub";
import replaceSupportTracing from "./replace-support-tracing";
import replaceTestUtils from "./replace-test-utils";

export const transformers = [
  fixSourceFile,
  fixTestingImports,
  addViHelper,
  replaceAssertIsRejected,
  replaceSinonStub,
  replaceSupportTracing,
  replaceTestUtils,
];
