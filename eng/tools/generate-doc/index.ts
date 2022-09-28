import { promises as fsPromises } from "fs";
const readFile = fsPromises.readFile;
const readDir = fsPromises.readdir;
const statFile = fsPromises.stat;
import * as path from "path";
import yargs from "yargs";
import { Application as TypeDocApplication, TypeDocReader, TypeDocOptions } from "typedoc";

// need to pass ./src as entry?
async function runTypeDoc({
  outputFolder,
  cwd,
  hasTypeDocConfig,
}: {
  outputFolder: string;
  cwd: string;
  hasTypeDocConfig: boolean;
}) {
  const app = new TypeDocApplication();
  //app.options.addReader(new TSConfigReader());
  app.options.addReader(new TypeDocReader());

  const noTypeDocConfig: Partial<TypeDocOptions> = {
    excludePrivate: true,
    excludeInternal: true,
  };
  app.bootstrap({});

  // "--excludePrivate",
  // "--excludeNotExported",
  // '--exclude "node_modules/**/*"',
  // "--ignoreCompilerErrors",
  // "--stripInternal",
  // "--mode file",

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
    typedocPresent: false,
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
    if (fileName === "typedoc.json") {
      checks.typedocPresent = true;
    }
  }
  return checks;
}

async function executeTypedoc({ include }: { include: string[] }) {
  console.log("process.cwd = " + process.cwd());
  const workingDir = path.join(process.cwd(), "sdk");
  const serviceFolders = await readDir(workingDir);
  const includeSome = Boolean(include.length);
  const includeAll = Boolean(includeSome && include[0] === "*");
  let filteredFolders: string[] = [];

  if (includeAll) {
    filteredFolders = serviceFolders;
  } else if (includeSome) {
    filteredFolders = serviceFolders.filter((x) => include.includes(x));
  }

  for (const eachService of filteredFolders) {
    const eachServicePath = path.join(workingDir, eachService);
    const stat = await statFile(eachServicePath);

    if (!stat.isDirectory()) {
      continue;
    }

    const packageList = await readDir(eachServicePath, { withFileTypes: true });

    for (const eachPackage of packageList) {
      if (!eachPackage.isDirectory()) {
        continue;
      }
      const eachPackagePath = path.join(eachServicePath, eachPackage.name);
      console.log("Path: " + eachPackagePath);
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
        const outputFolder = `../../../docGen/${artifactName}/${checks.version}`;

        await runTypeDoc({
          cwd: eachPackagePath,
          outputFolder,
          hasTypeDocConfig: checks.typedocPresent,
        });
      }
    }
  }
}

async function main() {
  const argv = yargs
    .options({
      include: {
        alias: "inc",
        type: "array",
        describe: "inclusion list of packages for which the docs should be generated.",
        demandOption: true,
      },
    })
    .help()
    .parseSync();

  const include: string[] = argv.include?.map((x) => String(x)) ?? [];

  await executeTypedoc({
    include,
  });

  console.log("All done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
