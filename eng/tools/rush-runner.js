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
  //const searchDir = path.resolve(`../../sdk/${serviceDir}`);
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


let [action, serviceDir, ...rushParams] = process.argv.slice(2);
//let commandToRun = process.argv[3];


let packageJsons = [];
if (serviceDir) {
  const searchDir = path.resolve(`../../sdk/${serviceDir}`);
  packageJsons = getPackageJsons(searchDir);
} else {
  const sdkDir = path.resolve(`../../sdk`);
  const serviceDirs = fs.readdirSync(sdkDir)
    .map(f => path.join(sdkDir,f)) // turn directory names into paths
    .filter(f => fs.lstatSync(f).isDirectory()); // only keep those which are actually directories (not files)

console.log("servicedirs ="+serviceDirs);
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
      console.log("rushArgs = " + rushArgs);
      console.log("args = " + args);
      const build = spawn('node', rushArgs);
      build.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

      build.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      build.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    
    break;

  case 'test':
    params = packageNames.map(p => [`--from`,p]);
    args = ['../../common/scripts/install-run-rush.js','test'];
    rushArgs = [].concat(args, ...params, rushParams);
    const test = spawn('node', rushArgs);
    test.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

    test.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    test.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    break;

  case 'lint':
    if (serviceDir) {
      for (const dir of packageDirs) {
        //THIS CASE DOESN'T WORK - NEED an alternate script for rushx :(
        // rushx doesn't accept rushParams
        ///run('rushx', 'lint', { cwd: dir });
        const defaults = {
                          cwd: dir,
                          env: process.env
                        };
        //args = ['../../../common/scripts/install-run-rush.js','lint'];
        args = ['lint'];
        rushArgs = [].concat(args, ...params);
        //const lintr = spawn('node', rushArgs,defaults);
        const lintr = spawn('rushx', rushArgs,defaults);
        lintr.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        lintr.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        lintr.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });

      }
    } else {
        ///run('rush', 'lint', rushParams)
        args = ['../../common/scripts/install-run-rush.js','lint'];
        rushArgs = [].concat(args, ...params, rushParams);
        const lint = spawn('node', rushArgs);

        lint.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        lint.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        lint.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });

    }
    break;
}