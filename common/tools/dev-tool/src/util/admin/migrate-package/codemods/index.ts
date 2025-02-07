import addViHelper from "./addViHelper";
import fixSourceFile from "./fixSourceFile";
import fixTestingImports from "./fixTestingImports";
import replaceAssertIsRejected from "./replaceChaiAsPromised";
import replaceSinonStub from "./replaceSinonStubs";
import replaceSupportTracing from "./replaceSupportsTracing";
import replaceTestUtils from "./replaceTestUtils";

export const codemods = [
  fixSourceFile,
  fixTestingImports,
  replaceAssertIsRejected,
  replaceSinonStub,
  addViHelper,
  replaceSupportTracing,
  replaceTestUtils,
];
