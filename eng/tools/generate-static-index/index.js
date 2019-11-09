const fs = require("fs-extra");
const path = require("path");
var jsyaml = require("js-yaml");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

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

console.log("process.cwd = " + process.cwd());

let workingDir = path.join(process.cwd(), "sdk");
const serviceFolders = fs.readdirSync(workingDir);

/* Initializing package list for template index generation */
let serviceList = [];
for (const eachService of serviceFolders) {
    const eachServicePath = path.join(workingDir, eachService);
    const stat = fs.statSync(eachServicePath);

    if (stat && stat.isDirectory()) {
      var packageList = fs.readdirSync(eachServicePath);

      /* Initializing package list for template index generation */
      let mngmtList = [];
      let clientList = [];
      for (var eachPackage of packageList) {
        let checks = {
          isRush: false,
          isPrivate: false,
          srcPresent: false,
          typedocPresent: false,
          isClient: false,
          version: "0"
        };
        eachPackagePath = path.join(eachServicePath, eachPackage);
        const packageStat = fs.statSync(eachPackagePath);
        if (packageStat && packageStat.isDirectory()) {
          checks = getChecks(eachPackagePath, checks);

          console.log(
            "checks after walk: checks.isRush = " + checks.isRush +
              " , checks.isPrivate = " + checks.isPrivate +
              ", checks.srcPresent = " + checks.srcPresent +
              ", typedocPresent = " + checks.typedocPresent +
            ", isClient = " + checks.isClient
          );
          console.log("Path: " + eachPackagePath);
          if (!checks.isPrivate) {
              if (checks.srcPresent || (eachPackage == "core-http") || (eachPackage == "core-tracing")) {
                if(checks.isClient){
                  clientList.push(eachPackage);
                }
                else{
                  mngmtList.push(eachPackage);
                }
              } else {
                console.log("...SKIPPING Since src folder could not be found.....");
              }
          } else {
            console.log("...SKIPPING Since package marked as private...");
          }
        }
      } //end-for each-package
      /* Adding service entry for the template index generation */
      serviceList.push({ name: eachService, mngmtList: mngmtList, clientList: clientList });
    }
} // end-for ServiceFolders

// Versioned Indexes
var yamlPath = path.join(process.cwd(), "docfx_project/api");
var yamlFilePath = path.join(yamlPath, "toc.yml");

var jObject = []; //[{"name": service, "href": <link-to-md-file>}]
var serviceMapperPath = path.join(process.cwd(),"eng/tools/generate-static-index/service-mapper.json");
const serviceMapper = JSON.parse(fs.readFileSync(serviceMapperPath, 'utf8'));
for (const eachService of serviceList) {
  var mdFile = eachService.name + ".md";
  var serviceName = eachService.name;
  if(serviceMapper[eachService.name]){
    serviceName = serviceMapper[eachService.name];
  }
  jObject.push({ name: serviceName, href: mdFile });//change the value for name to lookup name for service from given json file
  var mdContent = "";
  if(eachService.clientList.length > 0){
     mdContent += "<h1>Client Libraries </h1><hr>";
  }

  for (var package of eachService.clientList) {
    var packagename = "@azure/" + package;
    mdContent +=
      "<h3>" +
      packagename +
      "</h3>";
  }
  if (eachService.mngmtList.length > 0) {
    mdContent += "<h1>Management Libraries </h1><hr>";
  }

  for (var package of eachService.mngmtList) {
    var packagename = "@azure/" + package;
    mdContent +=
      "<h3>" +
      packagename +
      "</h3>";
  }
  var mdFilePath = path.join(yamlPath, mdFile);
  fs.writeFile(mdFilePath, mdContent);
}

fs.writeFile(yamlFilePath, jsyaml.safeDump(jObject));
console.log("toc.yml created");
