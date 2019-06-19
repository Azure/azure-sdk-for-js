const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

function walk(dir, isRush) {
  var list = fs.readdirSync(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
      isRush = true;
      return isRush;
    }
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      isRush = walk(filePath, isRush);
    } else {
      // console.log(path.resolve(filePath));
    }
  }
  return isRush;
}

const [scriptPath /* /repo/common/scripts/generate-doc.js */] = process.argv;

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
      let isRush = false;
      eachPackagePath = path.join(eachServicePath, eachPackage);
      isRush = walk(eachPackagePath, isRush);
      console.log("Path: " + eachPackagePath);
      if (!isRush) {
        try {
          const result2 = childProcess.spawnSync("npm", ["install"], {
            stdio: "inherit",
            cwd: eachPackagePath,
            shell: true
          });
          console.log('result2.output for "npm install":' + result2.output);
        } catch (e) {
          console.error(`\n\n${e.toString()}\n\n`);
          process.exit(1);
        }
      }

      try {
        const result3 = childProcess.spawnSync("rushx", ["generate-doc"], {
          cwd: eachPackagePath,
          shell: true
        });
        console.log(
          'result3.output for "rushx generate-doc":' + result3.output
        );
      } catch (e) {
        console.error(`\n\n${e.toString()}\n\n`);
        process.exit(1);
      }
    }
  }
}
