const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

function walk(dir, checks) {
  var list = fs.readdirSync(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
      checks.isRush = true;
      continue;
    }
    if (fileName == "src") {
      checks.srcPresent = true;
    }
    if (fileName == "package.json") {
      let data = fs.readFileSync(filePath, "utf8");
      let settings = JSON.parse(data);
      if (settings["private"] === true) {
        checks.isPrivate = true;
      }
    }

    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      checks = walk(filePath, checks);
    } else {
      // console.log(path.resolve(filePath));
    }
  }
  return checks;
}

const [
  nodePath /* Ex: /bin/node */,
  scriptPath /* /repo/common/scripts/generate-doc.js */,
  docGen /* -dg */
] = process.argv;
let docOutputFolder = "--out ./dist/docs ./src";

console.log("process.cwd = " + process.cwd());
try {
  const result = childProcess.spawnSync("rush", ["install"], {
    cwd: process.cwd(),
    env: process.env,
    shell: true
  });
  console.log('result.output for "rush install":' + result.output);
  //process.exit(result.status);
} catch (e) {
  console.error(`\n\n${e.toString()}\n\n`);
  process.exit(1);
}

let workingDir = path.join(process.cwd(), "sdk");

const serviceFolders = fs.readdirSync(workingDir);
console.log("Service folders:");
console.log(serviceFolders);
for (const eachService of serviceFolders) {
  const eachServicePath = path.join(workingDir, eachService);
  const stat = fs.statSync(eachServicePath);

  if (stat && stat.isDirectory()) {
    var packageList = fs.readdirSync(eachServicePath);

    for (const eachPackage of packageList) {
      let checks = { isRush: false, isPrivate: false, srcPresent: false };
      console.log(
        "checks before walk: checks.isRush = " +
          checks.isRush +
          " , checks.isPrivate = " +
          checks.isPrivate +
          ", checks.srcPresent = " +
          checks.srcPresent
      );
      eachPackagePath = path.join(eachServicePath, eachPackage);
      const packageStat = fs.statSync(eachPackagePath);
      if (packageStat && packageStat.isDirectory()) {
        checks = walk(eachPackagePath, checks);

        console.log(
          "checks after walk: checks.isRush = " +
            checks.isRush +
            " , checks.isPrivate = " +
            checks.isPrivate +
            ", checks.srcPresent = " +
            checks.srcPresent
        );
        console.log("Path: " + eachPackagePath);
        if (!checks.isPrivate) {
          if (checks.srcPresent) {
            if (!checks.isRush) {
              try {
                const result2 = childProcess.spawnSync("npm", ["install"], {
                  stdio: "inherit",
                  cwd: eachPackagePath,
                  shell: true
                });
                console.log(
                  'result2.output for "npm install":' + result2.output
                );
              } catch (e) {
                console.error(`\n\n${e.toString()}\n\n`);
                process.exit(1);
              }
            }
            if (docGen === "-dg") {
              docOutputFolder =
                "--out ../../../docGen/" + eachPackage + " ./src";
            }

            try {
              const result3 = childProcess.spawnSync(
                "typedoc",
                [
                  "--excludePrivate",
                  '--exclude "node_modules/**/*"',
                  "--mode modules",
                  docOutputFolder
                ],
                {
                  cwd: eachPackagePath,
                  shell: true
                }
              );
              console.log(
                'result3.output for "typedoc ----excludePrivate  --exclude "node_modules/**/*" --mode modules ' +
                  docOutputFolder +
                  ' ":' +
                  result3.output
              );
            } catch (e) {
              console.error(`\n\n${e.toString()}\n\n`);
              process.exit(1);
            }
          } else {
            console.log("...SKIPPING Since src folder could not be found.....");
          }
        } else {
          console.log("...SKIPPING Since package marked as private...");
        }
      }
    }
  }
}
