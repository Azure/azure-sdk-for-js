const fs = require("fs");
const path = require("path");

/**
 * Get the absolute path to the package.json in this repository.
 * @returns {string} The absolute path to the package.json.
 */
function getPackageJsonFilePath() {
  return path.resolve(__dirname, "../package.json");
}

/**
 * Get the package.json file contents parsed as a JSON object.
 * @param {string=} packageJsonFilePath The path to the package.json file to read. If this is not
 * provided, then the package.json file at the root of this repository will be used.
 * @returns {{}} The parsed package.json file contents.
 */
function getPackageJson(packageJsonFilePath) {
  if (!packageJsonFilePath) {
    packageJsonFilePath = getPackageJsonFilePath();
  }
  return JSON.parse(fs.readFileSync(packageJsonFilePath));
}

/**
 * Update the package.json property values for "main".
 * @param {string} mainValue The value that will be used for "main".
 * @returns {void}
 */
function updatePackageJsonMain(mainValue) {
  const packageJsonFilePath = getPackageJsonFilePath();

  const packageJson = getPackageJson(packageJsonFilePath);

  if (packageJson.main == mainValue) {
    console.log(`"main" is already set to "${mainValue}".`);
  } else {
    console.log(`Changing "main" to "${mainValue}"`)
    packageJson.main = mainValue;
    
    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, undefined, "  "));
  }
}
exports.updatePackageJsonMain = updatePackageJsonMain;