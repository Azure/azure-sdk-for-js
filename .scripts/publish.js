const semver = require("semver");
const util = require("util");
const cp= require("child_process");
const exec=util.promisify(cp.exec);

async function main() {
  const package_json = require("../package.json");
  const baseVersion = (package_json.version).trim()
  const v = (await exec("git rev-list --parents HEAD --count --full-history")).stdout.trim();

  const version = `${semver.major(baseVersion)}.${semver.minor(baseVersion)}.${v}`

  console.log(`Using version ${version}`);
  process.argv.push(`publish`,`--access`,`public`,`--tag`,`preview`,`--new-version`,`${version}`, `--no-git-tag-version`);
  // now, on with the publish...
  require( "yarn/lib/cli.js" );
}

main();