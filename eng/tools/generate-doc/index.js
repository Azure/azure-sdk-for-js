const fs = require("fs-extra");
const path = require("path");
const util = require("util");
const childProcess = require("child_process");
const nunjucks = require("nunjucks");
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const statFile = util.promisify(fs.stat);
const pLimit = require("p-limit");

nunjucks.configure("documentation/templateDocGen", { autoescape: true });

/* Traversing the directory */
const getChecks = async (dir, checks) => {
  var list = await readDir(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
      continue;
    }
    if (fileName == "src") {
      checks.srcPresent = true;
    }
    if (fileName == "package.json") {
      let data = await readFile(filePath, "utf8");
      let settings = JSON.parse(data);
      if (settings["private"] === true) {
        checks.isPrivate = true;
      }
      if (settings["sdk-type"] === "client") {
        checks.isClient = true;
      }
      checks.version = settings["version"];
    }
    if (fileName == "typedoc.json") {
      checks.typedocPresent = true;
    }
  }
  return checks;
};

//Old Method Index
const generateOldIndex = (serviceList) => {
  console.log("generateIndexWithTemplate=" + generateIndexWithTemplate);
  if (generateIndexWithTemplate) {
    var renderedIndex = nunjucks.render("template.html", {
      serviceList: serviceList,
    });

    var dest = process.cwd() + "/docGen/index.html";
    fs.writeFile(dest, renderedIndex, function (err, result) {
      if (err) console.log("error in writing the generated html to docGen/index.html", err);
      console.log("Generated html written to docGen/index.html");
    });

    console.log("serviceList length = " + serviceList.length);
    if (serviceList.length > 0) {
      /* Copy from pathToAssets to docGen/assets */
      pathToAssets = process.cwd() + "/docGen/" + serviceList[0].packageList[0] + "/assets";
      var assetsDest = process.cwd() + "/docGen/assets/";
      fs.copy(pathToAssets, assetsDest, (err) => {
        if (err) return console.error("error copying the assets folder to docGen/assets/", err);
        console.log("assets folder copied to docGen!");
      });
    }
  }
};

const executeTypedoc = async (exclusionList, inclusionList, generateIndexWithTemplate) => {
  console.log("inside executeTypedoc");
  let docOutputFolder = "--out ./dist/docs ./src";
  console.log("process.cwd = " + process.cwd());
  let workingDir = path.join(process.cwd(), "sdk");
  let pathToAssets = "";
  const serviceFolders = await readDir(workingDir);

  /* Initializing package list for template index generation */
  let serviceList = [];
  let promises = [];
  let commandList = [];
  for (const eachService of serviceFolders) {
    if (
      (argv.includeMode === "inc" && inclusionList.includes(eachService)) ||
      (argv.includeMode === "exc" && !exclusionList.includes(eachService)) ||
      (argv.includeMode === "inc" && argv.include[0] === "*")
    ) {
      const eachServicePath = path.join(workingDir, eachService);
      const stat = await statFile(eachServicePath);

      if (stat && stat.isDirectory()) {
        var packageList = await readDir(eachServicePath);

        /* Initializing package list for template index generation */
        let indexPackageList = [];
        for (var eachPackage of packageList) {
          let checks = {
            isPrivate: false,
            srcPresent: false,
            typedocPresent: false,
            isClient: false,
            version: "0",
          };
          eachPackagePath = path.join(eachServicePath, eachPackage);
          pathToAssets = eachPackagePath + "/assets";
          const packageStat = await statFile(eachPackagePath);
          if (packageStat && packageStat.isDirectory()) {
            checks = await getChecks(eachPackagePath, checks);

            console.log(
              "checks after walk: checks.isPrivate = " +
                checks.isPrivate +
                ", checks.srcPresent = " +
                checks.srcPresent +
                ", typedocPresent = " +
                checks.typedocPresent +
                ", isClient = " +
                checks.isClient +
                ", version = " +
                checks.version
            );
            console.log("Path: " + eachPackagePath);
            if (!checks.isPrivate) {
              if ((argv.clientOnly && checks.isClient) || !argv.clientOnly) {
                if (checks.srcPresent) {
                  if (argv.docGenOutput === "dg") {
                    docOutputFolder =
                      "--out ../../../docGen/" + eachPackage + "/" + checks.version + " ./src";
                  }

                  let typedocProcess;
                  let commandRun = [];
                  commandRun.push("typedoc");
                  commandRun.push({
                    cwd: eachPackagePath,
                    shell: true,
                  });
                  if (checks.typedocPresent) {
                    commandRun.push([
                      docOutputFolder,
                      '--theme "../../../eng/tools/generate-doc/theme/default"',
                      "--ignoreCompilerErrors",
                    ]);
                  } else {
                    commandRun.push([
                      '--theme "../../../eng/tools/generate-doc/theme/default"',
                      "--excludePrivate",
                      "--excludeNotExported",
                      '--exclude "node_modules/**/*"',
                      "--ignoreCompilerErrors",
                      "--mode file",
                      docOutputFolder,
                    ]);
                  }
                  commandList.push(commandRun);
                  if (generateIndexWithTemplate) {
                    /* Adding package to packageList for the template index generation */
                    indexPackageList.push(eachPackage);
                  }
                } else {
                  console.log("...SKIPPING Since src folder could not be found.....");
                }
              } else {
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
    } else {
      //console.log("...SKIPPING Since service doesn't satisfy one of the 3 condition checks...");
    }
  } // end-for ServiceFolders

  var plimitPromises = [];
  const limit = pLimit(20);
  for (const commandRun of commandList) {
    const promise = limit(
      () =>
        new Promise(async (res, rej) => {
          let typedocProcess = childProcess.spawn(commandRun[0], commandRun[2], commandRun[1]);
          let stdOut = "";
          let stdErr = "";
          typedocProcess.on("close", (code) => {
            res({ code, stdOut, stdErr });
          });

          typedocProcess.stdout.on("data", (data) => (stdOut = stdOut + data.toString()));
          typedocProcess.stderr.on("data", (data) => (stdErr = stdErr + data.toString()));
        })
    );
    plimitPromises.push(promise);
  }
  try {
    const results = await Promise.all(plimitPromises);
    for (let item of results) {
      console.log(item.stdOut);
      if (item.stdErr) {
        console.error(item.stdErr);
      }
      if (item.code !== 0) {
        console.error("Process Failed");
        process.exitCode = 1;
      }
    }
  } catch (ex) {
    console.log("ERROR", ex);
  }

  console.log("All done!");
  if (argv.oldIndex) generateOldIndex(serviceList);
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
      demandOption: true,
    },
    includeMode: {
      alias: "i",
      type: "string",
      describe: "select whether there is inclusion mode, exclusion mode or neither",
      choices: ["inc", "exc", "none"],
      demandOption: true,
    },
    include: {
      alias: "inc",
      type: "array",
      describe:
        "inclusion list of packages for which the docs should be generated. The index template html is not created in this mode.",
    },
    exclude: {
      alias: "exc",
      type: "array",
      describe:
        "exclusion list for packages for which the docs should be NOT generated.These packages will be added to index template html generated.",
    },
    clientOnly: {
      type: "boolean",
      default: false,
      demandOption: true,
    },
    oldIndex: {
      type: "boolean",
      default: false,
      demandOption: true,
    },
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
