import { promises as fsPromises } from "fs";
const readFile = fsPromises.readFile;
const readDir = fsPromises.readdir;
const statFile = fsPromises.stat;
import * as path from "path";
import yargs from "yargs";
import { Application as TypeDocApplication } from "typedoc";

async function runTypeDoc({ outputFolder, cwd }: { outputFolder: string; cwd: string }) {
  const app = new TypeDocApplication();
  // app.options.addReader(new TypeDocReader());

  app.bootstrap({
    entryPoints: [path.join(cwd, "src")],
    excludeInternal: true,
    excludePrivate: true,
  });

  const project = app.convert();

  if (project) {
    await app.generateDocs(project, outputFolder);
  } else {
    console.error("Failed converting project in TypeDoc");
    process.exit(1);
  }
}

/* Traversing the directory */
async function getChecks(dir: string) {
  const checks = {
    isPrivate: false,
    srcPresent: false,
    version: "0",
    packageName: "",
  };
  const list = await readDir(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
      continue;
    }
    if (fileName === "src") {
      checks.srcPresent = true;
    }
    if (fileName === "package.json") {
      let data = await readFile(filePath, "utf8");
      let settings = JSON.parse(data);
      checks.isPrivate = settings["private"] === true;
      checks.version = settings["version"];
      checks.packageName = settings["name"];
    }
  }
  return checks;
}

async function executeTypedoc(serviceDir: string) {
  const CWD = process.cwd();
  console.log(`process.cwd = ${CWD}`);
  const serviceDirPath = path.join(CWD, "sdk", serviceDir);
  const stat = await statFile(serviceDirPath);

  if (!stat.isDirectory()) {
    return;
  }

  const packageList = await readDir(serviceDirPath, { withFileTypes: true });

  for (const eachPackage of packageList) {
    if (!eachPackage.isDirectory()) {
      continue;
    }
    const eachPackagePath = path.join(serviceDirPath, eachPackage.name);
    console.log(`Path: ${eachPackagePath}`);
    const checks = await getChecks(eachPackagePath);
    console.log(`checks after walk: ${JSON.stringify(checks, null, 2)}`);

    if (checks.isPrivate) {
      console.log("...SKIPPING Since package marked as private...");
      continue;
    } else if (!checks.srcPresent) {
      console.log("...SKIPPING Since src folder could not be found.....");
      continue;
    } else {
      const artifactName = checks.packageName.replace("@", "").replace("/", "-");
      const outputFolder = path.join(CWD, "docGen", artifactName, checks.version);

      await runTypeDoc({
        cwd: eachPackagePath,
        outputFolder,
      });
    }
  }
}

async function main() {
  const argv = yargs
    .options({
      serviceDir: {
        type: "string",
        describe: "service directory to generate packages for",
        demandOption: true,
      },
    })
    .help()
    .parseSync();

  if (argv.serviceDir === "not-specified") {
    console.error(`Service directory not specified.`);
    process.exit(1);
  }

  await executeTypedoc(argv.serviceDir);

  console.log("All done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
