import { expect, test } from 'vitest';
import { extractExportAndGenerateChangelog } from '../../changelog/extractMetaData.js';
import path from 'path';
import { SDKType } from '../../common/types.js';
import { describe } from 'node:test';
import { tryReadNpmPackageChangelog } from '../../common/utils.js';
import { removeSync, outputFileSync } from 'fs-extra';
import { getFirstReleaseContent } from '../../common/changelog/modifyChangelogFileAndBumpVersion.js';
import { DifferenceDetector, ApiViewOptions } from '../../changelog/v2/DifferenceDetector.js';
import { ChangelogGenerator, ChangelogItemCategory, ChangelogItems } from '../../changelog/v2/ChangelogGenerator.js';

const getItemsByCategory = (changelogItems: ChangelogItems, category: ChangelogItemCategory) => {
  const isBreakingChange = category >= 10000;
  const map = isBreakingChange ? changelogItems.breakingChanges : changelogItems.features;
  if (!map) return [];
  return map.get(category) ?? [];
};

const generateChangelogItems = async (
  baselineApiViewOptions: ApiViewOptions,
  currentApiViewOptions: ApiViewOptions
) => {
  const detector = new DifferenceDetector(baselineApiViewOptions, currentApiViewOptions);
  const diff = await detector.detect();
  const changelogGenerator = new ChangelogGenerator(detector.getDetectContext(), diff);
  const changelogItems = changelogGenerator.generate().changelogItems;
  return changelogItems;
};

describe('Change log for first release package', () => {
  test('ModularClient -> firstGA', async () => {
    const root = path.join(__dirname, 'testCases/modular-first-release/');
    const content = getFirstReleaseContent(root, true);
    expect(content).toBe(
      'This is the first stable release of the @azure/arm-test package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.'
    );
  });

  test('ModularClient -> firstBeta', async () => {
    const root = path.join(__dirname, 'testCases/modular-first-release/');
    const content = getFirstReleaseContent(root, false);
    expect(content).toBe(
      'This is the first preview release of the @azure/arm-test package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.'
    );
  });

  test('HLC -> firstGA', async () => {
    const root = path.join(__dirname, 'testCases/hlc-first-release/');
    const content = getFirstReleaseContent(root, true);
    expect(content).toBe(
      'The package of @azure/arm-test is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).'
    );
  });

  test('HLC -> firstBeta', async () => {
    const root = path.join(__dirname, 'testCases/hlc-first-release/');
    const content = getFirstReleaseContent(root, false);
    expect(content).toBe(
      'The package of @azure/arm-test is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).'
    );
  });

  test('RLC -> firstGA', async () => {
    const root = path.join(__dirname, 'testCases/rlc-first-release/');
    const content = getFirstReleaseContent(root, true);
    expect(content).toBe('This is the first stable version with the package of @azure-rest/test');
  });

  test('RLC -> firstBeta', async () => {
    const root = path.join(__dirname, 'testCases/rlc-first-release/');
    const content = getFirstReleaseContent(root, false);
    expect(content).toBe('Initial release of the @azure-rest/test package');
  });
});

describe('Breaking change detection', () => {
  test('HLC -> Modular: Rename', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.1.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.1.new.modular.api.md');
    const changelog = await extractExportAndGenerateChangelog(
      oldViewPath,
      newViewPath,
      SDKType.HighLevelClient,
      SDKType.ModularClient
    );

    expect(changelog.addedOperationGroup.length).toBe(0);
    expect(changelog.removedOperationGroup.length).toBe(0);

    expect(changelog.addedOperation.length).toBe(1);
    expect(changelog.removedOperation.length).toBe(1);

    expect(changelog.addedOperation[0].line).toBe(
      'Added operation DataProductsCatalogsOperations.listByResourceGroup_NEW'
    );
    expect(changelog.removedOperation[0].line).toBe('Removed operation DataProductsCatalogs.listByResourceGroup');
  });

  test('HLC -> HLC: Change Op', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.2.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.2.new.hlc.api.md');
    const changelog = await extractExportAndGenerateChangelog(
      oldViewPath,
      newViewPath,
      SDKType.HighLevelClient,
      SDKType.HighLevelClient
    );

    expect(changelog.addedOperationGroup.length).toBe(0);
    expect(changelog.removedOperationGroup.length).toBe(0);

    expect(changelog.addedOperation.length).toBe(1);
    expect(changelog.removedOperation.length).toBe(1);

    expect(changelog.addedOperation[0].line).toBe('Added operation DataProductsCatalogs.get_NEW');
    expect(changelog.removedOperation[0].line).toBe('Removed operation DataProductsCatalogs.get');
  });

  test('Modular -> Modular: Change Op', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.3.old.modular.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.3.new.modular.api.md');
    const changelog = await extractExportAndGenerateChangelog(
      oldViewPath,
      newViewPath,
      SDKType.ModularClient,
      SDKType.ModularClient
    );

    expect(changelog.addedOperationGroup.length).toBe(0);
    expect(changelog.removedOperationGroup.length).toBe(0);

    expect(changelog.addedOperation.length).toBe(1);
    expect(changelog.removedOperation.length).toBe(1);

    expect(changelog.addedOperation[0].line).toBe(
      'Added operation DataProductsCatalogsOperations.listByResourceGroup_NEW'
    );
    expect(changelog.removedOperation[0].line).toBe(
      'Removed operation DataProductsCatalogsOperations.listByResourceGroup'
    );
  });

  test('HLC -> HLC: Operation Group Add/Remove/ChangeSig', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.4.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.4.new.hlc.api.md');
    const changelog = await extractExportAndGenerateChangelog(
      oldViewPath,
      newViewPath,
      SDKType.HighLevelClient,
      SDKType.HighLevelClient
    );

    expect(changelog.addedOperationGroup.length).toBe(1);
    expect(changelog.removedOperationGroup.length).toBe(1);

    expect(changelog.addedOperation.length).toBe(0);
    expect(changelog.removedOperation.length).toBe(0);

    expect(changelog.operationSignatureChange.length).toBe(1);

    expect(changelog.addedOperationGroup[0].line).toBe('Added operation group DataProductsCatalogs_add');
    expect(changelog.removedOperationGroup[0].line).toBe('Removed operation group DataProductsCatalogs_remove');
    expect(changelog.operationSignatureChange[0].line).toBe(
      'Operation DataProductsCatalogs_sig_change.get has a new signature'
    );
  });

  test("Patch RLC -> RLC's basic breaking changes", async () => {
    const oldViewPath = path.join(__dirname, `testCases/patch.1.old.rlc.api.md`);
    const newViewPath = path.join(__dirname, `testCases/patch.1.new.rlc.api.md`);
    const changelog = await extractExportAndGenerateChangelog(
      oldViewPath,
      newViewPath,
      SDKType.RestLevelClient,
      SDKType.RestLevelClient
    );
    expect(changelog.displayChangeLog()).toBe(
      `### Features Added

  - Added operation in Routes for path: "add"
  - Added Interface ClusterGetOld
  - Added Type Alias typesAdd
  - Added function funcAdd
  - Added function overload "export function isUnexpected(response: C | E): response is C;"

### Breaking Changes

  - Removed operation Routes for path: "remove"
  - Operation in "Routes" has a new signature for path: "change_return_type"
  - Operation in "Routes" has a new signature for path: "change_para_count"
  - Operation in "Routes" has a new signature for path: "change_para_type"
  - Type of parameter a of interface ClustersGet is changed from number to string
  - Removed function funcRemove
  - Function funcReturnType has a new signature
  - Function funcParameterCount has a new signature
  - Function funcParameterType has a new signature
  - Removed function overload "export function isUnexpected(response: C | D): response is A;"
  - Removed Type Alias typesRemove
  - Type alias "typesChange" has been changed`
    );
  });
});

describe('Changelog reading', () => {
  test("Read changelog that doesn't exist", () => {
    const content = tryReadNpmPackageChangelog('./do/not/exist/CHANGELOG.md');
    expect(content).toBe('');
  });

  test('Read changelog that exists', () => {
    const changelogPath = path.join('CHANGELOG.md');
    try {
      outputFileSync(changelogPath, 'aaa', 'utf-8');
      const content = tryReadNpmPackageChangelog(changelogPath);
      expect(content).toBe('aaa');
    } finally {
      removeSync(changelogPath);
    }
  });
});

describe('Breaking change detection for v2 (compared to v1)', () => {
  test('HLC -> Modular: Rename', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.1.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.1.new.modular.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.HighLevelClient },
      { path: newViewPath, sdkType: SDKType.ModularClient }
    );

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded).length).toBe(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved).length).toBe(0);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded).length).toBe(1);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved).length).toBe(1);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)[0]).toBe(
      'Added operation DataProductsCatalogsOperations.listByResourceGroup_NEW'
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)[0]).toBe(
      'Removed operation DataProductsCatalogs.listByResourceGroup'
    );
  });

  test('HLC -> HLC: Change Op', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.2.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.2.new.hlc.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.HighLevelClient },
      { path: newViewPath, sdkType: SDKType.HighLevelClient }
    );

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)).toHaveLength(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)).toHaveLength(0);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)).toHaveLength(1);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)).toHaveLength(1);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)[0]).toBe(
      'Added operation DataProductsCatalogs.get_NEW'
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)[0]).toBe(
      'Removed operation DataProductsCatalogs.get'
    );
  });

  test('Modular -> Modular: Change Op', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.3.old.modular.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.3.new.modular.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.ModularClient },
      { path: newViewPath, sdkType: SDKType.ModularClient }
    );

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)).toHaveLength(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)).toHaveLength(0);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)).toHaveLength(1);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)).toHaveLength(1);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)[0]).toBe(
      'Added operation DataProductsCatalogsOperations.listByResourceGroup_NEW'
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)[0]).toBe(
      'Removed operation DataProductsCatalogsOperations.listByResourceGroup'
    );
  });

  test('HLC -> HLC: Operation Group Add/Remove/ChangeSig', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.4.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.4.new.hlc.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.HighLevelClient },
      { path: newViewPath, sdkType: SDKType.HighLevelClient }
    );

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)).toHaveLength(1);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)).toHaveLength(1);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded)).toHaveLength(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved)).toHaveLength(0);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationSignatureChanged)).toHaveLength(1);

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)[0]).toBe(
      'Added operation group DataProductsCatalogs_add'
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)[0]).toBe(
      'Removed operation group DataProductsCatalogs_remove'
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationSignatureChanged)[0]).toBe(
      'Operation DataProductsCatalogs_sig_change.get has a new signature'
    );
  });

  test('HLC -> Modular: name collision - Organization and OrganizationOperations both renamed without conflict', async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.5.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.5.new.modular.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.HighLevelClient },
      { path: newViewPath, sdkType: SDKType.ModularClient }
    );

    // Old `Organization` → new `OrganizationOperations`
    // Old `OrganizationOperations` → new `OrganizationOperationsOperations`
    // Neither should appear as a removed operation group.
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)).toHaveLength(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)).toHaveLength(0);
  });

  test("HLC -> Modular: 'Operations' maps to 'OperationsOperations'; 'XOperations' stays when 'XOperationsOperations' absent", async () => {
    const oldViewPath = path.join(__dirname, 'testCases/operationGroups.6.old.hlc.api.md');
    const newViewPath = path.join(__dirname, 'testCases/operationGroups.6.new.modular.api.md');

    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.HighLevelClient },
      { path: newViewPath, sdkType: SDKType.ModularClient }
    );

    // Old `Operations` → new `OperationsOperations` (target exists)
    // Old `PrivateEndpointConnectionOperations` stays as-is (target `PrivateEndpointConnectionOperationsOperations` absent)
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved)).toHaveLength(0);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded)).toHaveLength(0);
  });

  test("Patch RLC -> RLC's basic breaking changes", async () => {
    const oldViewPath = path.join(__dirname, `testCases/patch.1.old.rlc.api.md`);
    const newViewPath = path.join(__dirname, `testCases/patch.1.new.rlc.api.md`);
    const changelogItems = await generateChangelogItems(
      { path: oldViewPath, sdkType: SDKType.RestLevelClient },
      { path: newViewPath, sdkType: SDKType.RestLevelClient }
    );

    const expectedNewFeatures = [
      `Added operation in Routes for path: "add"`,
      `Added Interface ClusterGetOld`,
      `Added Type Alias typesAdd`,
      `Added function funcAdd`,
      `Added function overload "export function isUnexpected(response: C | E): response is C;"`,
    ].sort();
    const expectedBreakingChanges = [
      `Removed operation in Routes for path: "remove"`,
      `Operation in "Routes" has a new signature for path: "change_return_type"`,
      `Operation in "Routes" has a new signature for path: "change_para_count"`,
      `Operation in "Routes" has a new signature for path: "change_para_type"`,
      `Type of parameter a of interface ClustersGet is changed from number to string`,
      `Removed function funcRemove`,
      `Function funcReturnType has a new signature`,
      `Function funcParameterCount has a new signature`,
      `Function funcParameterType has a new signature`,
      `Removed function overload "export function isUnexpected(response: C | D): response is A;"`,
      `Removed Type Alias typesRemove`,
      `Type alias "typesChange" has been changed`,
    ].sort();
    const getActualChangelogItems = (map: Map<ChangelogItemCategory, string[]>) => {
      const items: string[] = [];
      map.forEach((value) => items.push(...value));
      items.sort();
      return items;
    };
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualFeatures).toEqual(expectedNewFeatures);
    expect(actualBreakingChanges).toEqual(expectedBreakingChanges);
  });
});

describe('Breaking change detection v2', () => {
  describe('General Detection (Based on Modular Client)', () => {
    test('Operation Group Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
## API Report File for "@azure/arm-networkanalytics"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

\`\`\`ts
// @public
export interface DataProductsCatalogs_added_Operations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
}
// (No @packageDocumentation comment for this package)
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added operation group DataProductsCatalogs_added_Operations');
    });

    test('Operation Group Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogs_removed_Operations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
}
// (No @packageDocumentation comment for this package)

\`\`\`
`;
      const currentApiView = `
## API Report File for "@azure/arm-networkanalytics"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationGroupRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed operation group DataProductsCatalogs_removed_Operations');
    });

    test('Operation Added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
    list: (options?: DataProductsCatalogsListOptionalParams) => Promise<DataProductsCatalogsListResponse>;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added operation DataProductsCatalogsOperations.list');
    });

    test('Operation Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
    list: (options?: DataProductsCatalogsListOptionalParams) => Promise<DataProductsCatalogsListResponse>;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed operation DataProductsCatalogsOperations.list');
    });

    test('Operation Signature Changed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string) => Promise<DataProductsCatalogsGetResponse>;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProductsCatalogsOperations {
    get: (resourceGroupName: string, options: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalogsGetResponse>;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationSignatureChanged);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Operation DataProductsCatalogsOperations.get has a new signature');
    });

    test('Model Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added Interface DataProduct');
    });

    test('Model Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed Interface DataProduct');
    });

    test('Model Optional Property Added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelOptionalPropertyAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Interface DataProduct has a new optional parameter description');
    });

    test('Model Required Property Added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    version: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelRequiredPropertyAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Interface DataProduct has a new required parameter version');
    });

    test('Model Property Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Interface DataProduct no longer has parameter description');
    });

    test('Model Property Type Changed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    version: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    version: number;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyTypeChanged);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Type of parameter version of interface DataProduct is changed from string to number');
    });

    test('Model Property Type Changed From TS Record to JS Dictionary Type', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface Prop {
    p: string
}
export interface DataProduct {
    version: Record<string, Prop>;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface Prop {
    p: string
}
export interface DataProduct {
    version: {[xxx: string]: Prop};
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyTypeChanged);
      expect(items).toHaveLength(0);
    });

    test('Model Property Type Changed From JS Dictionary Type to TS Record', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface Prop {
    p: string
}
export interface DataProduct {
    readonly version?: {[xxx: string]: Prop};
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface Prop {
    p: string
}
export interface DataProduct {
    readonly version?: Record<string, Prop>;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const count = [...changelogItems.breakingChanges.keys()].flatMap(
        (b) => changelogItems.breakingChanges.get(b) ?? []
      ).length;
      expect(count).toBe(0);
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyTypeChanged);
      expect(items).toHaveLength(0);
    });

    test('Model Property Optional To Required', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyOptionalToRequired);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Parameter description of interface DataProduct is now required');
    });

    test('Model Property Required To Optional', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyRequiredToOptional);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Parameter description of interface DataProduct is now optional');
    });

    test('Class Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: DataProductClientOptions);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added Class DataProductClient');
    });

    test('Class Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: DataProductClientOptions);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Deleted Class DataProductClient');
    });

    test('Class Changed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: string, subscriptionId: string);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: string, subscriptionId: string, resourceId: string);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassChanged);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Class DataProductClient has a new signature');
    });

    test('Class constructor added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: string, subscriptionId: string);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: string, subscriptionId: string);
    constructor(subscriptionId: string, resourceId: string);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassChanged);
      expect(items).toHaveLength(0);
    });

    test('Class Property Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
    readonly dataProducts: DataProducts;
    readonly analytics: Analytics;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
    readonly dataProducts: DataProducts;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassPropertyRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Class DataProductClient no longer has parameter analytics');
    });

    test('Class Property Removed should still be detected when $host is ignored', async () => {
      // Real HLC baseline: $host, apiVersion, subscriptionId? are class properties
      // (they are also accessible via ResourceManagementClientOptionalParams).
      // tagsOperations is the operation group that gets renamed to `tags` in Modular — the breaking change under test.
      const baselineApiView = `
\`\`\`ts
// @public (undocumented)
export class ResourceManagementClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: ResourceManagementClientOptionalParams);
    constructor(credential: TokenCredential, options?: ResourceManagementClientOptionalParams);
    $host: string;
    apiVersion: string;
    subscriptionId?: string;
    tagsOperations: TagsOperations;
}

// @public
export interface ResourceManagementClientOptionalParams {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}
\`\`\`
`;
      // Minimal Modular structure sufficient for this test. Baseline properties are handled as follows:
      //   $host       — filtered by ignoreTargets
      //   apiVersion  — filtered because it is a property of ResourceManagementClientOptionalParams,
      //                 the type of the `options` constructor parameter
      //   subscriptionId — filtered because it is a direct constructor parameter (second overload)
      //   tagsOperations — BREAKING: renamed to `tags`, must still be reported
      const currentApiView = `
\`\`\`ts
// @public (undocumented)
export class ResourceManagementClient {
    constructor(credential: TokenCredential, options?: ResourceManagementClientOptionalParams);
    constructor(credential: TokenCredential, subscriptionId: string, options?: ResourceManagementClientOptionalParams);
    readonly tags: TagsOperations;
}

// @public
export interface ResourceManagementClientOptionalParams extends ClientOptions {
    apiVersion?: string;
    cloudSetting?: AzureSupportedClouds;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.HighLevelClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassPropertyRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Class ResourceManagementClient no longer has parameter tagsOperations');
    });

    test('Class Property Removed that remains a constructor parameter is filtered regardless of SDK type', async () => {
      // The HLC -> Modular guard was removed from filterClassPropertiesMovedToInternals,
      // so properties that are still accessible via constructor signatures are filtered
      // for ANY transition. This case uses Modular -> Modular to prove the filtering is
      // no longer tied to the HLC -> Modular transition.
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: DataProductClientOptionalParams);
    subscriptionId: string;
    readonly dataProducts: DataProducts;
    readonly analytics: Analytics;
}

// @public
export interface DataProductClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}
\`\`\`
`;
      // subscriptionId — filtered because it is still a direct constructor parameter
      // apiVersion     — not present as a property here, but exposed via the options bag
      // analytics      — BREAKING: genuinely removed, must still be reported
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: DataProductClientOptionalParams);
    readonly dataProducts: DataProducts;
}

// @public
export interface DataProductClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassPropertyRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Class DataProductClient no longer has parameter analytics');
    });

    test('Class Property Optional To Required', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
    readonly version?: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
    readonly version: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassPropertyOptionalToRequired);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Parameter version of class DataProductClient is now required');
    });

    test('New method added to class should be reported as OperationAdded, not ClassConstructorAdded', async () => {
      // Regression test: HLC->Modular migration adds new methods (e.g. getAdooAuthInfo) directly
      // on the client class. These must NOT appear as "has a new constructor" messages.
      const baselineApiView = `
\`\`\`ts
// @public
export class DeveloperHubServiceClient {
    constructor(credentials: TokenCredential, subscriptionId: string, options?: DeveloperHubServiceClientOptionalParams);
    gitHubOAuth(location: string, options?: GitHubOAuthOptionalParams): Promise<GitHubOAuthInfoResponse>;
}

// @public
export interface DeveloperHubServiceClientOptionalParams {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export class DeveloperHubServiceClient {
    constructor(credential: TokenCredential, options?: DeveloperHubServiceClientOptionalParams);
    constructor(credential: TokenCredential, subscriptionId: string, options?: DeveloperHubServiceClientOptionalParams);
    gitHubOAuth(location: string, options?: GitHubOAuthOptionalParams): Promise<GitHubOAuthInfoResponse>;
    getAdooAuthInfo(location: string, options?: GetAdooAuthInfoOptionalParams): Promise<AdooAuthInfoResponse>;
}

// @public
export interface DeveloperHubServiceClientOptionalParams {
    apiVersion?: string;
    endpoint?: string;
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.HighLevelClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );

      // The new method must appear as a feature (OperationAdded), not a constructor
      const constructorAddedItems = getItemsByCategory(changelogItems, ChangelogItemCategory.ClassConstructorAdded);
      const operationAddedItems = getItemsByCategory(changelogItems, ChangelogItemCategory.OperationAdded);

      // Must not produce any "has a new constructor" entry for getAdooAuthInfo
      expect(constructorAddedItems.some((msg) => msg.includes('getAdooAuthInfo'))).toBe(false);
      // Must produce an OperationAdded entry for getAdooAuthInfo
      expect(operationAddedItems.some((msg) => msg.includes('getAdooAuthInfo'))).toBe(true);
    });

    test('Type Alias Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export type DataProductStatus = "Active" | "Inactive" | "Pending";
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.TypeAliasAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added Type Alias DataProductStatus');
    });

    test('Type Alias Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export type DataProductStatus = "Active" | "Inactive" | "Pending";
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.TypeAliasRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed Type Alias DataProductStatus');
    });

    test('Type Alias Type Changed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export type DataProductStatus = "Active" | "Inactive";
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export type DataProductStatus = "Running" | "Stopped";
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.TypeAliasTypeChanged);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Type alias "DataProductStatus" has been changed');
    });

    test('Enum Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning",
    RealTime = "RealTime"
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.EnumAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added Enum DataProductType');
    });

    test('Enum Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning",
    RealTime = "RealTime"
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.EnumRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed Enum DataProductType');
    });

    test('Enum Value Added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning"
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning",
    RealTime = "RealTime"
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.EnumMemberAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Enum DataProductType has a new value RealTime');
    });

    test('Enum Value Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning",
    RealTime = "RealTime"
}
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export enum DataProductType {
    Analytics = "Analytics",
    MachineLearning = "MachineLearning"
}
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.EnumMemberRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Enum DataProductType no longer has value RealTime');
    });

    test('Function Added', async () => {
      const baselineApiView = `
\`\`\`ts
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export function createDataProduct(name: string, type: DataProductType): DataProduct;
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.FunctionAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Added function createDataProduct');
    });

    test('Function Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export function createDataProduct(name: string, type: DataProductType): DataProduct;
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.FunctionRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe('Removed function createDataProduct');
    });

    test('Function Overload Added', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export function processData(data: string): string;
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export function processData(data: string): string;
export function processData(data: number): number;
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.FunctionOverloadAdded);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe(`Added function overload "export function processData(data: number): number;"`);
    });

    test('Function Overload Removed', async () => {
      const baselineApiView = `
\`\`\`ts
// @public
export function processData(data: string): string;
export function processData(data: number): number;
\`\`\`
`;
      const currentApiView = `
\`\`\`ts
// @public
export function processData(data: string): string;
\`\`\`
`;
      const changelogItems = await generateChangelogItems(
        {
          apiView: baselineApiView,
          sdkType: SDKType.ModularClient,
        },
        {
          apiView: currentApiView,
          sdkType: SDKType.ModularClient,
        }
      );
      const items = getItemsByCategory(changelogItems, ChangelogItemCategory.FunctionOverloadRemoved);
      expect(items).toHaveLength(1);
      expect(items[0]).toBe(`Removed function overload "export function processData(data: number): number;"`);
    });
  });

  // TODO: add tests
});

describe('Breaking change detection from high level client to modular client', () => {});

describe('Generic Interface Detection', () => {
  test('should not detect breaking change for renamed generic interface with same structure', async () => {
    const baselineApiView = `
\`\`\` ts
// @public
export interface GenericInterface<T> {
    data: T;
    id: string;
}
\`\`\`
            `;

    const currentApiView = `
\`\`\` ts
// @public
export interface GenericInterfaceNameChange<T> {
    data: T;
    id: string;
}
\`\`\`
            `;

    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );

    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.ModelRemoved).length).toBe(1);
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.ModelAdded).length).toBe(1);

    // Verify breaking changes detected
    const totalBreakingChanges = [...changelogItems.breakingChanges.keys()].flatMap(
      (category) => changelogItems.breakingChanges.get(category) ?? []
    ).length;
    expect(totalBreakingChanges).toBe(1);

    // Verify new features detected
    const totalNewFeatures = [...changelogItems.features.keys()].flatMap(
      (category) => changelogItems.features.get(category) ?? []
    ).length;
    expect(totalNewFeatures).toBe(1);
  });

  test('should just ignore inner changes', async () => {
    const baselineApiView = `
\`\`\` ts
// @public
export interface GenericInterface<T> {
    data: T;
    id: string;
}
\`\`\`
            `;

    const currentApiView = `
\`\`\` ts
// @public
export interface GenericInterface<T> {
    data: T;
    id: number;
}
\`\`\`
            `;

    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    expect(getItemsByCategory(changelogItems, ChangelogItemCategory.ModelPropertyTypeChanged).length).toBe(0);
  });
});

describe('Changelog reading', () => {
  test("Read changelog that doesn't exist", () => {
    const content = tryReadNpmPackageChangelog('./do/not/exist/CHANGELOG.md');
    expect(content).toBe('');
  });

  test('Read changelog that exists', () => {
    const changelogPath = path.join('CHANGELOG.md');
    try {
      outputFileSync(changelogPath, 'aaa', 'utf-8');
      const content = tryReadNpmPackageChangelog(changelogPath);
      expect(content).toBe('aaa');
    } finally {
      removeSync(changelogPath);
    }
  });
});

describe('Should Be Ignored Due to Not Exposed', () => {
  const getActualChangelogItems = (map: Map<ChangelogItemCategory, string[]>) => {
    const items: string[] = [];
    map.forEach((value) => items.push(...value));
    items.sort();
    return items;
  };

  test("models ending with 'NextOptionalParams'", async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductNextOptionalParams {
    version: number;
}
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
// @public
export interface DataProductDataProductNextOptionalParams {
    version: string;
}
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test("Removed Interface ends with 'Headers'", async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductHeaders {
    readonly id?: string;
}
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test("Removed Interface ends with 'Result'", async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export interface DataProductResult {
    readonly id?: string;
    name: string;
    description?: string;
}
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test('Removed function getContinuationToken', async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export function getContinuationToken(name: string, type: DataProductType): DataProduct;
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test("Removed Type Alias Ends with 'Response'", async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export type DataProductResponse = "Active" | "Inactive" | "Pending";
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test('Interface with ignored target names - property remove', async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    resumeFrom: string;
    $host: string;
    endpoint: string;
    normalProperty: number;
}
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
// @public
export interface DataProduct {
    normalProperty: number;
}
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });

  test('Class with ignored target names - property remove', async () => {
    const baselineApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
    readonly resumeFrom: string;
    readonly $host: string;
    readonly endpoint: string;
}
\`\`\`
`;
    const currentApiView = `
\`\`\`ts
// @public
export class DataProductClient {
    constructor(credential: TokenCredential, subscriptionId: string);
}
\`\`\`
`;
    const changelogItems = await generateChangelogItems(
      {
        apiView: baselineApiView,
        sdkType: SDKType.ModularClient,
      },
      {
        apiView: currentApiView,
        sdkType: SDKType.ModularClient,
      }
    );
    // Verify no feature changes detected
    const actualFeatures = getActualChangelogItems(changelogItems.features);
    expect(actualFeatures).toHaveLength(0);

    // Verify no breaking changes detected
    const actualBreakingChanges = getActualChangelogItems(changelogItems.breakingChanges);
    expect(actualBreakingChanges).toHaveLength(0);
  });
});
