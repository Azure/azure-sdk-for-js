const fs = require("fs-extra");
const path = require("path");
const childProcess = require("child_process");
const nunjucks = require("nunjucks");

nunjucks.configure("documentation/templateDocGen", { autoescape: true });

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
    if (fileName == "typedoc.json") {
      checks.typedocPresent = true;
    }
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      checks = walk(filePath, checks);
    } else {
      // console.log(path.resolve(filePath)); //For-debug
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
  //process.exit(result.status); //For-debug
} catch (e) {
  console.error(`\n\n${e.toString()}\n\n`);
  process.exit(1);
}

let workingDir = path.join(process.cwd(), "sdk");
let pathToAssets = "";

const serviceFolders = fs.readdirSync(workingDir);
console.log("Service folders:"); //For-debug
console.log(serviceFolders); //For-debug

//Initializing package list for template index generation
let serviceList = [];
let count = 0;
for (const eachService of serviceFolders) {
  count++;
  //if(count > 5) //For-debug
  //break; //For-debug

  console.log("count = " + count);
  const eachServicePath = path.join(workingDir, eachService);
  const stat = fs.statSync(eachServicePath);

  if (stat && stat.isDirectory()) {
    var packageList = fs.readdirSync(eachServicePath);
    //Initializing package list for template index generation
    let indexPackageList = [];
    for (const eachPackage of packageList) {
      let checks = {
        isRush: false,
        isPrivate: false,
        srcPresent: false,
        typedocPresent: false
      };
      console.log(
        "checks before walk: checks.isRush = " +
          checks.isRush +
          " , checks.isPrivate = " +
          checks.isPrivate +
          ", checks.srcPresent = " +
          checks.srcPresent +
          ", typedocPresent = " +
          checks.typedocPresent
      );
      eachPackagePath = path.join(eachServicePath, eachPackage);
      pathToAssets = eachPackagePath + "/assets";
      const packageStat = fs.statSync(eachPackagePath);
      if (packageStat && packageStat.isDirectory()) {
        checks = walk(eachPackagePath, checks);

        console.log(
          "checks after walk: checks.isRush = " +
            checks.isRush +
            " , checks.isPrivate = " +
            checks.isPrivate +
            ", checks.srcPresent = " +
            checks.srcPresent +
            ", typedocPresent = " +
            checks.typedocPresent
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
              if (checks.typedocPresent) {
                const result3 = childProcess.spawnSync(
                  "typedoc",
                  [docOutputFolder],
                  {
                    cwd: eachPackagePath,
                    shell: true
                  }
                );
                console.log(
                  'result3.output for "typedoc ' +
                    docOutputFolder +
                    ' ":' +
                    result3.output
                );
              } else {
                const result3 = childProcess.spawnSync(
                  "typedoc",
                  [
                    "--excludePrivate",
                    "--excludeNotExported",
                    '--exclude "node_modules/**/*"',
                    "--ignoreCompilerErrors",
                    "--mode file",
                    docOutputFolder
                  ],
                  {
                    cwd: eachPackagePath,
                    shell: true
                  }
                );
                console.log(
                  'result3.output for "typedoc --excludePrivate --excludeNotExported --exclude "node_modules/**/*" -ignoreCompilerErrors --mode file ' +
                    docOutputFolder +
                    ' ":' +
                    result3.output
                );
              }
            } catch (e) {
              console.error(`\n\n${e.toString()}\n\n`);
              process.exit(1);
            }
            //Adding package to packageList for the template index generation
            indexPackageList.push(eachPackage);
          } else {
            console.log("...SKIPPING Since src folder could not be found.....");
          }
        } else {
          console.log("...SKIPPING Since package marked as private...");
        }
      }
    }
    //Adding service entry for the template index generation
    serviceList.push({ name: eachService, packageList: indexPackageList });
  }
} // end-for ServiceFolders

var renderedIndex = nunjucks.render("template.html", {
  serviceList: serviceList
});
//console.log(serviceList);
//console.log("rendered html:"); //For-debug
//console.log(renderedIndex); //For-debug
var dest = process.cwd() + "/docGen/index.html";
fs.writeFile(dest, renderedIndex, function(err, result) {
  if (err)
    console.log(
      "error in writing the generated html to docGen/index.html",
      err
    );
  console.log("Generated html written to docGen/index.html");
});
console.log(serviceList[0].packageList[0]);
console.log("serviceList length = " + serviceList.length);
if (serviceList.length > 0) {
  //copy from pathToAssets to docGen/assets
  pathToAssets =
    process.cwd() + "/docGen/" + serviceList[0].packageList[0] + "/assets";
  var assetsDest = process.cwd() + "/docGen/assets/";
  fs.copy(pathToAssets, assetsDest, err => {
    if (err)
      return console.error(
        "error copying the assets folder to docGen/assets/",
        err
      );
    console.log("assets folder copied to docGen!");
  });
}
