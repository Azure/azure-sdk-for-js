const fs = require("fs-extra");
const path = require("path");
const childProcess = require("child_process");
const nunjucks = require("nunjucks");

nunjucks.configure("documentation/templateDocGen", { autoescape: true });

/* Traversing the directory */
const walk = (dir, checks) => {
  var list = fs.readdirSync(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
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
      if (settings["sdk-type"] === "client") {
        checks.isClient = true;
      }
      checks.version = settings["version"]
    }
    if (fileName == "typedoc.json") {
      checks.typedocPresent = true;
    }
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      checks = walk(filePath, checks);
    }
  }
  return checks;
};

//Old Method Index
const generateOldIndex = (serviceList) => {
  console.log("generateIndexWithTemplate=" + generateIndexWithTemplate);
  if (generateIndexWithTemplate) {

    var renderedIndex = nunjucks.render("template.html", {
      serviceList: serviceList
    });

    var dest = process.cwd() + "/docGen/index.html";
    fs.writeFile(dest, renderedIndex, function(err, result) {
      if (err)
        console.log("error in writing the generated html to docGen/index.html", err);
      console.log("Generated html written to docGen/index.html");
    });


    console.log("serviceList length = " + serviceList.length);
    if (serviceList.length > 0) {
      /* Copy from pathToAssets to docGen/assets */
      pathToAssets = process.cwd() + "/docGen/" + serviceList[0].packageList[0] + "/assets";
      var assetsDest = process.cwd() + "/docGen/assets/";
      fs.copy(pathToAssets, assetsDest, err => {
        if (err)
          return console.error("error copying the assets folder to docGen/assets/",err);
        console.log("assets folder copied to docGen!");
      });
    }
  }
};
/*
    project: '29ec6040-b234-4e31-b139-33dc4287b756'
    definition: 614

*/
const executeTypedoc = (exclusionList, inclusionList, generateIndexWithTemplate) => {
 console.log("inside executeTypedoc");
 console.log("exc list ="+ exclusionList);
 console.log("inc list"+ inclusionList);
  let docOutputFolder = "--out ./dist/docs ./src";
  console.log("process.cwd = " + process.cwd());
  let workingDir = path.join(process.cwd(), "sdk");
  let pathToAssets = "";
  const serviceFolders = fs.readdirSync(workingDir);

  /* Initializing package list for template index generation */
  let serviceList = [];
  console.log(serviceFolders.length);
  let promises = [];
  for (const eachService of serviceFolders) {

    if ((argv.includeMode === "inc" && inclusionList.includes(eachService)) || (argv.includeMode === "exc" && !exclusionList.includes(eachService)) || (argv.includeMode === "inc" && argv.include[0] === "*")) {
      console.log("inside if statement");
      const eachServicePath = path.join(workingDir, eachService);
      const stat = fs.statSync(eachServicePath);

      if (stat && stat.isDirectory()) {
        var packageList = fs.readdirSync(eachServicePath);

        /* Initializing package list for template index generation */
        let indexPackageList = [];
        for (var eachPackage of packageList) {
          let checks = {
            isPrivate: false,
            srcPresent: false,
            typedocPresent: false,
            isClient: false,
            version: "0"
          };
          eachPackagePath = path.join(eachServicePath, eachPackage);
          pathToAssets = eachPackagePath + "/assets";
          const packageStat = fs.statSync(eachPackagePath);
          if (packageStat && packageStat.isDirectory()) {
            checks = walk(eachPackagePath, checks);

            console.log(
              "checks after walk: checks.isPrivate = " +
              checks.isPrivate +
              ", checks.srcPresent = " +
              checks.srcPresent +
              ", typedocPresent = " +
              checks.typedocPresent +
              ", isClient = " +
              checks.isClient
            );
            console.log("Path: " + eachPackagePath);
            if (!checks.isPrivate) {
              if ((argv.clientOnly && checks.isClient) || !argv.clientOnly) {
                if (checks.srcPresent) {
                  if (argv.docGenOutput === "dg") {
                    docOutputFolder = "--out ../../../docGen/" + eachPackage + "/" + checks.version + " ./src";
                  }

                  try {
                    if (checks.typedocPresent) {
                      const typedocResult = childProcess.spawnSync(
                        "typedoc",
                        [docOutputFolder, '--theme "eng/tools/generate-doc/theme/default"', "--ignoreCompilerErrors"],
                        {
                          cwd: eachPackagePath,
                          shell: true
                        }
                      );
                      console.log(
                        'typedocResult.output for "typedoc ' +
                        docOutputFolder +
                        ' ":' +
                        typedocResult.output
                      );
                    } else {
                      const typedocResult = childProcess.spawnSync(
                        "typedoc",
                        [
                          '--theme "eng/tools/generate-doc/theme/default"',
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
                        'typedocResult.output for "typedoc --theme "eng/tools/generate-doc/theme/default" --excludePrivate --excludeNotExported --exclude "node_modules/**/*" -ignoreCompilerErrors --mode file ' +
                        docOutputFolder +
                        ' ":' +
                        typedocResult.output
                      );
                    }
                  } catch (e) {
                    console.error(`\n\n${e.toString()}\n\n`);
                    process.exit(1);
                  }
                  if (generateIndexWithTemplate) {
                    /* Adding package to packageList for the template index generation */
                    indexPackageList.push(eachPackage);
                  }
                } else {
                  console.log(
                    "...SKIPPING Since src folder could not be found....."
                  );
                }
              }
              else {
                //console.log("...SKIPPING Since package is either not sdkType client");
              }
            } else {
              console.log("...SKIPPING Since package marked as private...");
            }
          }

        } //end-for each-package
        /* Adding service entry for the template index generation */
        serviceList.push({ name: eachService, packageList: indexPackageList });
      }
    }
    else {
      //console.log("...SKIPPING Since service doesn't satisfy one of the 3 condition checks...");
    }

  } // end-for ServiceFolders

  if (argv.oldIndex)
    generateOldIndex(serviceList);
};

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
    },
    clientOnly: {
     type: "boolean",
     default:false,
     demandOption: true
    },
    oldIndex: {
      type: "boolean",
      default:false,
      demandOption: true
    }
  })
  .demandOption(
    ["docGenOutput", "includeMode", "clientOnly"],
    "Please provide both docGen, includeMode and clientOnly arguments to work with this tool"
  )
  .help().argv;

  console.log("Argv.clientOnly = " + argv.clientOnly);
/* Variables for inclusion or exclusion package lists */
let exclusionList = [];
let inclusionList = [];
let generateIndexWithTemplate = true; /* Generate index html from the template by default */

if (argv.dgOp === "local" && argv.includeMode !== "none") {
  console.error(
    `--includeMode "inc" or "exc" is supported only when the documentGenoutput is set to "dg" instead of "local"!!`
  );
  process.exit(1);
}
console.log("arv.include = " + argv.include);

if (argv.includeMode === "inc") {
  if (argv.oldIndex) {
    generateIndexWithTemplate = false;
  }
  if (argv.include !== undefined) {
    inclusionList = argv.include;
    if (inclusionList.includes("not-specified")) {
      console.error(`One or more value to the input package list is "not-specified"`);
      process.exit(1);
    }
  } else {
    console.error(
      `--includeMode "inc" requires the inclusion list --inc to be passed as an argument!!`
    );
    process.exit(1);
  }
} else if (argv.includeMode === "exc") {
  if (argv.exclude !== undefined) {
    exclusionList = argv.exclude;
  } else {
    console.error(
      `--excludeMode "exc" requires the exclusion list --exc to be passed as an argument!!`
    );
    process.exit(1);
  }
} else if (argv.includeMode === "none") {
  generateIndexWithTemplate = false;
}
executeTypedoc(exclusionList, inclusionList, generateIndexWithTemplate);
