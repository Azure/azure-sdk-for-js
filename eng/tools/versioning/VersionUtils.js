const path = require("path");
const { readFile, writeFile } = require("eng-package-utils");
var spawnSync = require("child_process").spawnSync,
  child;

// This is done to update files which are only periodically generated and
// checked in. Since these files could be generated once between many versions
// we need to make sure that the versions in the generated files move up
// as well
async function updatePackageConstants(packagePath, packageJson, newVersion) {
  // No constant metadata, skip
  if (!("//metadata" in packageJson)) {
    return;
  }

  for (const constantFileSpec of packageJson["//metadata"].constantPaths) {
    const targetPath = path.join(packagePath, constantFileSpec.path);
    const fileContents = await readFile(targetPath);

    const versionExpression = buildSemverRegex(constantFileSpec.prefix);
    const updatedContents = fileContents.replace(versionExpression, `$1${newVersion}`);

    if (updatedContents == fileContents) {
      continue;
    }

    await writeFile(targetPath, updatedContents);
  }
}

function buildSemverRegex(prefix) {
  return new RegExp(`(${prefix}.*?)(${semverRegex.toString()})`, "g");
}

function updateChangelog(
  targetPackagePath,
  packageName,
  repoRoot,
  newVersion,
  unreleased,
  replaceLatestVersionTitle,
  releaseDate = null
) {
  const service = path.basename(path.dirname(targetPackagePath));
  const updateChangelogPath = path.resolve(
    path.join(repoRoot, "eng/common/scripts/Update-ChangeLog.ps1")
  );
  let args = [
    updateChangelogPath,
    newVersion,
    service,
    packageName,
    unreleased,
    replaceLatestVersionTitle
  ];
  if (releaseDate != null) {
    args.push(releaseDate);
  }
  child = spawnSync("pwsh", args);
  console.log("Powershell Data: " + child.stdout);
  console.log("Powershell Errors: " + child.stderr);

  if (child.error) {
    console.error("Child process failed - ", child.error);
    return false;
  }
  console.log("Powershell script finished with exit code - ", child.status);
  if (child.status === 0) {
    return true;
  }
  return false;
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;

module.exports.updatePackageConstants = updatePackageConstants;
module.exports.updateChangelog = updateChangelog;
