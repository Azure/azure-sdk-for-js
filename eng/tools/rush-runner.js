// See the @microsoft/rush package's LICENSE file for license information.

// This script searches for package.json files recursively under a given path
// excluding packages under a node_modules folder and opens them to determine
// whether they contain a "sdk-archetype" field with the value of "client".
//
// If they do, then the package name is recorded and then after all package.json files
// have been scanned a single string is output using the Azure Pipelines Commands special
// syntax which creates a variable for use within a later stage of the pipeine.

const fs = require('fs');
let path = require('path');
const { spawn } = require('child_process');

const getPackageJsons = (searchDir) => {
  console.log("searchDir=" + searchDir);
  const packageJsons = fs.readdirSync(searchDir)
    .filter(f => !f.startsWith('arm-')) // exclude libraries starting with "arm-"
    .map(f => path.join(searchDir, f, 'package.json')) // turn potential directory names into package.json paths
    .filter(f => fs.existsSync(f)); // only keep paths for files that actually exist
  
  return packageJsons;
}

let logLineCounter = 0;
const log = message => {
  console.log(`select-packages(${logLineCounter++}): ${message}`);
};

log(`Working directory is "${process.cwd()}".`);

let [action, ...givenArgs] = process.argv.slice(2);
let pos = 0, i = 0;
let serviceDirList = [];
for(arg of givenArgs){
  if(arg == "--"){
    pos = i; 
    break;
  }

  serviceDirList.push(arg);
  i++;
}
let rushParams = [];

for(arg of givenArgs){
  
  if(arg == "--"){
    continue;
  }
  if(arg.startsWith("--") || arg.startsWith("-")){
    rushParams.push(arg);
  }
}

let packageJsons = [];
if (serviceDirList.length > 0) {
  for(serviceDir of serviceDirList){
    const searchDir = path.resolve(`../../sdk/${serviceDir}`);
    let listJsons = getPackageJsons(searchDir);
    packageJsons = packageJsons.concat(listJsons);
  }
} else {
  const sdkDir = path.resolve(`../../sdk`);
  const serviceDirs = fs.readdirSync(sdkDir)
    .map(f => path.join(sdkDir,f)) // turn directory names into paths
    .filter(f => fs.lstatSync(f).isDirectory()); // only keep those which are actually directories (not files)

  for (const dir of serviceDirs) {
    packageJsons.concat(getPackageJsons(dir));
  }
}

const packageNames = [];
const packageDirs = [];
for (const filePath of packageJsons) {
  const contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (contents['sdk-type'] === 'client') {
    packageNames.push(contents.name);
    packageDirs.push(path.dirname(filePath));
  }
}

if (!rushParams) {
  rushParams = [];
}
let rushArgs = [];
let args = [];
let params = [];
switch (action.toLowerCase()) {
  case 'build':
      params = packageNames.map(p => [`--to`,p,`--from`,p]);
      args = ['../../common/scripts/install-run-rush.js','build'];
      rushArgs = [].concat(args, ...params, rushParams);

      const build = spawn('node', rushArgs);
      build.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
        });

      build.stderr.on('data', (data) => {
        log(`stderr: ${data}`);
      });

      build.on('close', (code) => {
        log(`child process exited with code ${code}`);
      });
    
    break;

  case 'test':
    params = packageNames.map(p => [`--from`,p]);
    args = ['../../common/scripts/install-run-rush.js','test'];
    rushArgs = [].concat(args, ...params, rushParams);
    const test = spawn('node', rushArgs);
    test.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
      });

    test.stderr.on('data', (data) => {
      log(`stderr: ${data}`);
    });

    test.on('close', (code) => {
      log(`child process exited with code ${code}`);
    });

    break;

  case 'lint':
  console.log(rushParams);
    if (serviceDir) {
      for (const dir of packageDirs) {

        // rushx doesn't accept rushParams - ????
        const defaults = {
                          cwd: dir,
                          env: process.env
                        };
        args = ['../../../common/scripts/install-run-rushx.js','lint'];

        rushArgs = [].concat(args, ...params, rushParams);
        const lintr = spawn('node', rushArgs,defaults);
        lintr.stdout.on('data', (data) => {
          log(`stdout: ${data}`);
        });

        lintr.stderr.on('data', (data) => {
          log(`stderr: ${data}`);
        });

        lintr.on('close', (code) => {
          log(`child process exited with code ${code}`);
        });
      }
    } else {
        ///run('rush', 'lint', rushParams)
        args = ['../../common/scripts/install-run-rush.js','lint'];
        rushArgs = [].concat(args, ...params, rushParams);
        const lint = spawn('node', rushArgs);

        lint.stdout.on('data', (data) => {
          log(`stdout: ${data}`);
        });

        lint.stderr.on('data', (data) => {
          log(`stderr: ${data}`);
        });

        lint.on('close', (code) => {
          log(`child process exited with code ${code}`);
        });

    }
    break;
}