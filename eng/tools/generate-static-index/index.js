const fs = require("fs-extra");
const path = require("path");
var jsyaml = require("js-yaml");

/* Traversing the directory */
const walk = (dir, checks) => {
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
      if(settings["sdk-type"] === "client"){
        checks.isClient = true;
      }
      checks.version = settings["version"];
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

const iteratePackages = (packageList, itemList)=>{

   for(const package of packageList){
    var packagename = "@azure/"+package;
    var mdFile = package +".md";
    itemList.push({"name": packagename, "href": mdFile});
    var mdContent = `# ${packagename} <br/> ## PUBLISHED VERSIONS`;
    var mdFilePath = path.join(yamlPath, mdFile);
    fs.writeFileSync(mdFilePath, mdContent);
  }

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
          checks = walk(eachPackagePath, checks);

          console.log(
            "checks after walk: checks.isRush = " + checks.isRush +
              " , checks.isPrivate = " + checks.isPrivate +
              ", checks.srcPresent = " + checks.srcPresent +
              ", typedocPresent = " + checks.typedocPresent +
            ", isClient = " + checks.isClient
          );
          console.log("Path: " + eachPackagePath);
          if (!checks.isPrivate) {
              if (checks.srcPresent) {
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
var yamlFilePath =  path.join(yamlPath, "toc.yml");

var jObject = [{"uid":"ClientLibraries","name":"ClientLibraries" ,"items": [] },{"uid":"ManagementLibraries","name":"ManagementLibraries","items": [] }];
for(const eachService of serviceList){
  var itemList = [];
  iteratePackages(eachService.clientList,itemList);
  if(itemList.length > 0)
    jObject[0].items.push({"uid": eachService.name, "name": eachService.name.toUpperCase(), "items":itemList});
}

for(const eachService of serviceList){
  var itemList = [];
  iteratePackages(eachService.mngmtList,itemList);
  if(itemList.length > 0)
    jObject[1].items.push({"uid": eachService.name, "name": eachService.name.toUpperCase(), "items":itemList});
}

fs.writeFileSync(yamlFilePath, jsyaml.safeDump(jObject));
console.log("toc.yml created");
