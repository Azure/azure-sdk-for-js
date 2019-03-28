const fs = require("fs");
const path = require("path");

const baseFolder = path.join(__dirname, "../examples/typescript");

processFolders(path.join(baseFolder, "gettingStarted"));
processFolders(path.join(baseFolder, "advancedFeatures"));

function processFolders(folder) {
    const files = fs.readdirSync(folder);
    files.forEach(file => {
        console.log(`Updating ${file}...`);
        enableLocalRun(path.join(folder, file))
    });
}

function enableLocalRun(file) {
    const fileContents = fs.readFileSync(file, {encoding: "utf-8"});
    const sbregex = new RegExp('import (.*) from "@azure/service-bus"');
    const msrestregex = new RegExp('import (.*) from "ms-rest-azure"');
    const updatedContents = fileContents
        .replace(sbregex, 'import $1 from "../../../lib"')
        .replace(msrestregex, 'import $1 from "@azure/ms-rest-nodeauth"');
    fs.writeFileSync(file, updatedContents, {encoding: "utf-8"});
}