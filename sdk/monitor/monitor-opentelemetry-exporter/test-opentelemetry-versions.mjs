import { execa } from 'execa';
import packageJson from './package.json' assert { type: 'json' };

const versions = ["latest"];

const packages = [
  ...Object.keys(packageJson.dependencies).filter((packg) =>
    packg.startsWith("@opentelemetry")
  ),
  ...Object.keys(packageJson.devDependencies).filter((packg) =>
    packg.startsWith("@opentelemetry")
  ),
];

async function exec(cmd) {
  const command = execa(cmd, { cwd: ".", shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

(async () => {
  try {
    console.log("Running opentelemetry version test against", versions);
    for (const version of versions) {
      // Note: this moves devDeps to dependencies, but it does not matter for these tests
      const packagesToInstall = packages.map((packg) => `${packg}@${version}`).join(" ");
      console.log(`Installing ${packagesToInstall}`);
      await exec(
        `npm install --no-save --prefix ./test-opentelemetry-versions ${packagesToInstall}`
      );

      console.log(`Compiling on version: ${version}`);
      await exec(`npm run build`);

      console.log(`Running tests on version: ${version}`);
      await exec(`npm run test`);
    }
    process.exit(0);
  } catch (error) {
    console.log("Opentelemetry version test failed!");
    console.log(error);
    process.exit(1);
  }
})();
