// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function sortObjectByKeys(unsortedObj: { [key: string]: string }): { [key: string]: string } {
  const sortedEntries = Object.entries(unsortedObj).sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(sortedEntries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Sorts the dependencies, devDependencies, peerDependencies, and scripts fields of a package.json object alphabetically by key.
 *
 * @param packageJson - The package.json object to sort. This object is modified in-place.
 */
export function sortPackageJson(packageJson: any): void {
  if (packageJson.dependencies) {
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }
  if (packageJson.devDependencies) {
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
  }
  if (packageJson.peerDependencies) {
    packageJson.peerDependencies = sortObjectByKeys(packageJson.peerDependencies);
  }
  if (packageJson.scripts) {
    packageJson.scripts = sortObjectByKeys(packageJson.scripts);
  }
}
