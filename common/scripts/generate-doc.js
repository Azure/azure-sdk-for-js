const fs = require("fs-extra");
const path = require("path");
const childProcess = require("child_process");
const nunjucks = require("nunjucks");

nunjucks.configure("documentation/templateDocGen", { autoescape: true });

/* Traversing the directory */
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

/* Checking if a package exists in the exclusion/ inclusion list */
function isPackageInArray(package, inputArray) {
  for (var i in inputArray) {
    if (inputArray[i] == package) {
      return true;
    }
  }
  return false;
}

/* Input arguments to the script */
var argv = require("yargs")
  .options({
    docGenOutput: {
      alias: "dgOp",
      type: "string",
      choices: ["dg", "local"],
      describe:
        "If value = dg, generate the docs in root/docGen folder, else generated under dist/docs/ of local package",
      demandOption: true
    },
    includeMode: {
      alias: "i",
      type: "string",
      describe:
        "select whether there is inclusion mode, exclusion mode or neither",
      choices: ["inc", "exc", "none"],
      demandOption: true
    },
    include: {
      alias: "inc",
      type: "array",
      describe:
        "inclusion list of packages for which the docs should be generated. The index template html is not created in this mode."
    },
    exclude: {
      alias: "exc",
      type: "array",
      describe:
        "exclusion list for packages for which the docs should be NOT generated.These packages will be added to index template html generated."
    }
  })
  .demandOption(
    ["docGenOutput", "includeMode"],
    "Please provide both docGen and includeMode arguments to work with this tool"
  )
  .help().argv;

/* Variables for inclusion or exclusion package lists */
let exclusionList = [];
let inclusionList = [];

/* generate index html from the template by default */
let generateIndexWithTemplate = true;
if((argv.dgOp === "local") && (argv.includeMode !== "none")){
  console.error(`--includeMode "inc" or "exc" is supported only when the documentGenoutput is set to "dg" instead of "local"!!`);
  process.exit(1);
}

if (argv.includeMode === "inc") {
  generateIndexWithTemplate = false;
  if (argv.include !== undefined) {
    inclusionList = argv.include;
  } else {
    console.error(`--includeMode "inc" requires the inclusion list --inc to be passed as an argument!!`);
    process.exit(1);
  }
}
else if(argv.includeMode === "exc"){
  if(argv.exclude !== undefined) {
    exclusionList = argv.exclude;
  } else {
    console.error(`--excludeMode "exc" requires the exclusion list --exc to be passed as an argument!!`);
    process.exit(1);
  }
}
else if((argv.includeMode === "none")){
  generateIndexWithTemplate = false;
}

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
//console.log("Service folders:"); //For-debug
//console.log(serviceFolders); //For-debug

//Initializing package list for template index generation
let serviceList = [];
let count = 0;
for (const eachService of serviceFolders) {
  count++;
  console.log("count = " + count);
  const eachServicePath = path.join(workingDir, eachService);
  const stat = fs.statSync(eachServicePath);

  if (stat && stat.isDirectory()) {
    var packageList = fs.readdirSync(eachServicePath);
    //Initializing package list for template index generation
    let indexPackageList = [];
    for (const eachPackage of packageList) {
      if ((argv.includeMode === "inc" && isPackageInArray(eachPackage, inclusionList)) || !(argv.includeMode === "inc")) {
        let checks = {
          isRush: false,
          isPrivate: false,
          srcPresent: false,
          typedocPresent: false
        };
        console.log(
          "checks before walk: checks.isRush = " + checks.isRush +
            " , checks.isPrivate = " + checks.isPrivate +
            ", checks.srcPresent = " + checks.srcPresent +
            ", typedocPresent = " + checks.typedocPresent
        );
        eachPackagePath = path.join(eachServicePath, eachPackage);
        pathToAssets = eachPackagePath + "/assets";
        const packageStat = fs.statSync(eachPackagePath);
        if (packageStat && packageStat.isDirectory()) {
          checks = walk(eachPackagePath, checks);

          console.log(
            "checks after walk: checks.isRush = " + checks.isRush +
              " , checks.isPrivate = " + checks.isPrivate +
              ", checks.srcPresent = " + checks.srcPresent +
              ", typedocPresent = " + checks.typedocPresent
          );
          console.log("Path: " + eachPackagePath);
          if (!checks.isPrivate) {
            if (checks.srcPresent) {
              if (!checks.isRush) {
                try {
                  const npmResult = childProcess.spawnSync("npm", ["install"], {
                    stdio: "inherit",
                    cwd: eachPackagePath,
                    shell: true
                  });
                  console.log('npmResult.output for "npm install":' + npmResult.output);
                } catch (e) {
                  console.error(`\n\n${e.toString()}\n\n`);
                  process.exit(1);
                }
              }
              if (argv.docGenOutput === "dg") {
                docOutputFolder = "--out ../../../docGen/" + eachPackage + " ./src";
              }

              try {
                if (!isPackageInArray(eachPackage, exclusionList)) {
                  if (checks.typedocPresent) {
                    const typedocResult = childProcess.spawnSync(
                      "typedoc",
                      [docOutputFolder],
                      {
                        cwd: eachPackagePath,
                        shell: true
                      }
                    );
                    console.log('typedocResult.output for "typedoc ' + docOutputFolder +' ":' + typedocResult.output);
                  } else {
                    const typedocResult = childProcess.spawnSync(
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
                      'typedocResult.output for "typedoc --excludePrivate --excludeNotExported --exclude "node_modules/**/*" -ignoreCompilerErrors --mode file ' + docOutputFolder + ' ":' + typedocResult.output);
                  }
                } else {
                  console.log("... NOT RUNNING TYPEDOC on excluded package " + eachPackage);
                }
              } catch (e) {
                console.error(`\n\n${e.toString()}\n\n`);
                process.exit(1);
              }
              if (generateIndexWithTemplate) {
                //Adding package to packageList for the template index generation
                indexPackageList.push(eachPackage);
              }
            } else {
              console.log("...SKIPPING Since src folder could not be found.....");
            }
          } else {
            console.log("...SKIPPING Since package marked as private...");
          }
        }
      }
    } //end-for each-package
    //Adding service entry for the template index generation
    serviceList.push({ name: eachService, packageList: indexPackageList });
  }
} // end-for ServiceFolders
console.log("generateIndexWithTemplate=" + generateIndexWithTemplate);
if (generateIndexWithTemplate) {
  var renderedIndex = nunjucks.render("template.html", {
    serviceList: serviceList
  });

  //console.log(serviceList); //For-debug
  //console.log("rendered html:"); //For-debug
  //console.log(renderedIndex); //For-debug

  var dest = process.cwd() + "/docGen/index.html";
  fs.writeFile(dest, renderedIndex, function(err, result) {
    if (err)
      console.log("error in writing the generated html to docGen/index.html", err);
    console.log("Generated html written to docGen/index.html");
  });

  console.log("serviceList length = " + serviceList.length);
  if (serviceList.length > 0) {
    //copy from pathToAssets to docGen/assets
    pathToAssets = process.cwd() + "/docGen/" + serviceList[0].packageList[0] + "/assets";
    var assetsDest = process.cwd() + "/docGen/assets/";
    fs.copy(pathToAssets, assetsDest, err => {
      if (err)
        return console.error("error copying the assets folder to docGen/assets/",err);
      console.log("assets folder copied to docGen!");
    });
  }
}
