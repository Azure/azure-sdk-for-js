import addViHelper from "./add-vi-helper";
import replaceAssertIsRejected from "./replace-assert-isRejected";
import replaceSinonStub from "./replace-sinon-stub";
import replaceSupportTracing from "./replace-support-tracing";
import replaceTestUtils from "./replace-test-utils";

export const transformers = [
  addViHelper,
  replaceAssertIsRejected,
  replaceSinonStub,
  replaceSupportTracing,
  replaceTestUtils,
];
