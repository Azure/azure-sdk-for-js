// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file All rules
 * @author Arpan Laha
 */

import githubSourceHeaders from "./github-source-headers";
import tsApiExtractorPublicTypes from "./ts-apiextractor-json-types";
import tsApisurfaceStandardizedVerbs from "./ts-apisurface-standardized-verbs";
import tsApisurfaceSupportcancellation from "./ts-apisurface-supportcancellation";
import tsConfigInclude from "./ts-config-include";
import tsDocInternal from "./ts-doc-internal";
import tsDocInternalPrivateMember from "./ts-doc-internal-private-member";
import tsErrorHandling from "./ts-error-handling";
import tsModulesOnlyNamed from "./ts-modules-only-named";
import tsNamingDropNoun from "./ts-naming-drop-noun";
import tsNamingOptions from "./ts-naming-options";
import tsNamingSubclients from "./ts-naming-subclients";
import tsNoConstEnums from "./ts-no-const-enums";
import tsNoWindow from "./ts-no-window";
import tsPackageJsonAuthor from "./ts-package-json-author";
import tsPackageJsonBugs from "./ts-package-json-bugs";
import tsPackageJsonEngineIsPresent from "./ts-package-json-engine-is-present";
import tsPackageJsonFilesRequired from "./ts-package-json-files-required";
import tsPackageJsonHomepage from "./ts-package-json-homepage";
import tsPackageJsonKeywords from "./ts-package-json-keywords";
import tsPackageJsonLicense from "./ts-package-json-license";
import tsPackageJsonMainIsCjs from "./ts-package-json-main-is-cjs";
import tsPackageJsonModule from "./ts-package-json-module";
import tsPackageJsonName from "./ts-package-json-name";
import tsPackageJsonRepo from "./ts-package-json-repo";
import tsPackageJsonRequiredScripts from "./ts-package-json-required-scripts";
import tsPackageJsonSdkType from "./ts-package-json-sdktype";
import tsPackageJsonSideEffects from "./ts-package-json-sideeffects";
import tsPackageJsonTypes from "./ts-package-json-types";
import tsPaginationList from "./ts-pagination-list";
import tsUseInterfaceParameters from "./ts-use-interface-parameters";
import tsUsePromises from "./ts-use-promises";
import tsVersioningSemver from "./ts-versioning-semver";

/**
 * An object containing all rules defined by the plugin
 */
export = {
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
