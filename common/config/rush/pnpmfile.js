'use strict';

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.js.org/docs/en/hooks.html
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY
 * TO INVALIDATE ANY CACHED DEPENDENCY ANALYSIS.  We recommend to run "rush update --full"
 * after any modification to pnpmfile.js.
 *
 */
module.exports = {
  hooks: {
    readPackage
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */
function readPackage(packageJson, context) {
  // // The karma types have a missing dependency on typings from the log4js package.
  // if (packageJson.name === '@types/karma') {
  //  context.log('Fixed up dependencies for @types/karma');
  //  packageJson.dependencies['log4js'] = '0.6.38';
  // }

  // @typescript-eslint/eslint-plugin@1.12.0 introduced an implicit dependency on @typescript-eslint/typescript-estree.
  // This should be fixed in a future release of @typescript-eslint/eslint-plugin.
  // https://github.com/typescript-eslint/typescript-eslint/issues/705
  if (packageJson.name === '@typescript-eslint/eslint-plugin') {
    context.log('Fixed up dependencies for @typescript-eslint/eslint-plugin');
    packageJson.dependencies['@typescript-eslint/typescript-estree'] =
      '^1.11.0';
  }

  return packageJson;
}
