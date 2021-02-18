const execa = require("execa");

let versions = ["3.1", "3.9"];

if (!process.env.SKIP_LATEST) {
  versions.push("latest");
}

async function exec(cmd) {
  const command = execa(cmd, { cwd: "./consumer-test", shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

(async () => {
  try {
    console.log("Running typescript consumer test against", versions);
    for (const version of versions) {
      console.log(`Compiling with typescript@${version} - Basic`);
      await exec(
        `npx -p typescript@${version} tsc ./test.ts --allowSyntheticDefaultImports true --target ES5`
      );
      console.log(`Compiling with typescript@${version} - Custom lib`);
      await exec(
        `npx -p typescript@${version} tsc ./test.ts --allowSyntheticDefaultImports true --lib es2018`
      );
    }
    process.exit(0);
  } catch (error) {
    console.log("Typescript consumer test failed!");
    console.log(error);
    process.exit(1);
  }
})();
