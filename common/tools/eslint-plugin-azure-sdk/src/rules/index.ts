// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file All rules
 */

import githubSourceHeaders from "./github-source-headers.js";
import tsApiExtractorPublicTypes from "./ts-apiextractor-json-types.js";
import tsApisurfaceStandardizedVerbs from "./ts-apisurface-standardized-verbs.js";
import tsApisurfaceSupportcancellation from "./ts-apisurface-supportcancellation.js";
import tsConfigInclude from "./ts-config-include.js";
import tsDocInternal from "./ts-doc-internal.js";
import tsDocInternalPrivateMember from "./ts-doc-internal-private-member.js";
import tsErrorHandling from "./ts-error-handling.js";
import tsModulesOnlyNamed from "./ts-modules-only-named.js";
import tsNamingDropNoun from "./ts-naming-drop-noun.js";
import tsNamingOptions from "./ts-naming-options.js";
import tsNamingSubclients from "./ts-naming-subclients.js";
import tsNoConstEnums from "./ts-no-const-enums.js";
import tsNoWindow from "./ts-no-window.js";
import tsPackageJsonAuthor from "./ts-package-json-author.js";
import tsPackageJsonBugs from "./ts-package-json-bugs.js";
import tsPackageJsonEngineIsPresent from "./ts-package-json-engine-is-present.js";
import tsPackageJsonFilesRequired from "./ts-package-json-files-required.js";
import tsPackageJsonHomepage from "./ts-package-json-homepage.js";
import tsPackageJsonKeywords from "./ts-package-json-keywords.js";
import tsPackageJsonLicense from "./ts-package-json-license.js";
import tsPackageJsonMainIsCjs from "./ts-package-json-main-is-cjs.js";
import tsPackageJsonModule from "./ts-package-json-module.js";
import tsPackageJsonName from "./ts-package-json-name.js";
import tsPackageJsonRepo from "./ts-package-json-repo.js";
import tsPackageJsonRequiredScripts from "./ts-package-json-required-scripts.js";
import tsPackageJsonSdkType from "./ts-package-json-sdktype.js";
import tsPackageJsonSideEffects from "./ts-package-json-sideeffects.js";
import tsPackageJsonTypes from "./ts-package-json-types.js";
import tsPaginationList from "./ts-pagination-list.js";
import tsUseInterfaceParameters from "./ts-use-interface-parameters.js";
import tsUsePromises from "./ts-use-promises.js";
import tsVersioningSemver from "./ts-versioning-semver.js";

/**
 * An object containing all rules defined by the plugin
 */
export default {
  "github-source-headers": githubSourceHeaders,
  "ts-apiextractor-json-types": tsApiExtractorPublicTypes,
  "ts-apisurface-standardized-verbs": tsApisurfaceStandardizedVerbs,
  "ts-apisurface-supportcancellation": tsApisurfaceSupportcancellation,
  "ts-config-include": tsConfigInclude,
  "ts-doc-internal": tsDocInternal,
  "ts-doc-internal-private-member": tsDocInternalPrivateMember,
  "ts-error-handling": tsErrorHandling,
  "ts-modules-only-named": tsModulesOnlyNamed,
  "ts-naming-drop-noun": tsNamingDropNoun,
  "ts-naming-options": tsNamingOptions,
  "ts-naming-subclients": tsNamingSubclients,
  "ts-no-const-enums": tsNoConstEnums,
  "ts-no-window": tsNoWindow,
  "ts-package-json-author": tsPackageJsonAuthor,
  "ts-package-json-bugs": tsPackageJsonBugs,
  "ts-package-json-engine-is-present": tsPackageJsonEngineIsPresent,
  "ts-package-json-files-required": tsPackageJsonFilesRequired,
  "ts-package-json-homepage": tsPackageJsonHomepage,
  "ts-package-json-keywords": tsPackageJsonKeywords,
  "ts-package-json-license": tsPackageJsonLicense,
  "ts-package-json-main-is-cjs": tsPackageJsonMainIsCjs,
  "ts-package-json-module": tsPackageJsonModule,
  "ts-package-json-name": tsPackageJsonName,
  "ts-package-json-repo": tsPackageJsonRepo,
  "ts-package-json-required-scripts": tsPackageJsonRequiredScripts,
  "ts-package-json-sdktype": tsPackageJsonSdkType,
  "ts-package-json-sideeffects": tsPackageJsonSideEffects,
  "ts-package-json-types": tsPackageJsonTypes,
  "ts-pagination-list": tsPaginationList,
  "ts-use-interface-parameters": tsUseInterfaceParameters,
  "ts-use-promises": tsUsePromises,
  "ts-versioning-semver": tsVersioningSemver,
};
