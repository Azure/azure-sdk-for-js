const packageJson = require("./package.json");
const { exec } = require("child_process");

const versions = ["latest"];

const packages = [
  ...Object.keys(packageJson.dependencies).filter((packg) => packg.startsWith("@opentelemetry")),
  ...Object.keys(packageJson.devDependencies).filter((packg) => packg.startsWith("@opentelemetry")),
];

function runProcess(cmd, callback) {
  var command = exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(`err: ${err}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  command.on("exit", function () {
    callback();
  });
}

(async () => {
  try {
    console.log("Running opentelemetry version test against", versions);
    for (const version of versions) {
      // Note: this moves devDeps to dependencies, but it does not matter for these tests
      const packagesToInstall = packages.map((packg) => `${packg}@${version}`).join(" ");
      console.log(`Installing ${packagesToInstall}`);
      runProcess(
        `npm install --no-save --prefix ./test-opentelemetry-versions ${packagesToInstall}`,
        () => {
          console.log(`Compiling on version: ${version}`);
          runProcess(`npm run build`, () => {
            console.log(`Running tests on version: ${version}`);
            runProcess(`npm run test`, () => {
              process.exit(0);
            });
          });
        }
      );
    }
  } catch (error) {
    console.log("Opentelemetry version test failed!");
    console.log(error);
    process.exit(1);
  }
})();
