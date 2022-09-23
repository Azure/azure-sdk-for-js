import { promises as fsPromises } from "fs";
const readFile = fsPromises.readFile;
const readDir = fsPromises.readdir;
const statFile = fsPromises.stat;
import * as path from "path";
import yargs from "yargs";
import { Application as TypeDocApplication, TypeDocReader, TypeDocOptions } from "typedoc";

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
  //app.options.addReader(new typedoc.TSConfigReader());
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
    isClient: false,
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
      checks.isClient = settings["sdk-type"] === "client";
      checks.version = settings["version"];
      checks.packageName = settings["name"];
    }
    if (fileName === "typedoc.json") {
      checks.typedocPresent = true;
    }
  }
  return checks;
}

async function executeTypedoc({
  include,
  exclude,
  clientOnly,
  docGenOutput,
}: {
  clientOnly: boolean;
  docGenOutput: "dg" | "local";
  include: string[];
  exclude: string[];
}) {
  let docOutputFolder = "--out ./dist/docs ./src";
  console.log("process.cwd = " + process.cwd());
  const workingDir = path.join(process.cwd(), "sdk");
  const serviceFolders = await readDir(workingDir);

  for (const eachService of serviceFolders) {
    if (
      (include.length && include.includes(eachService)) ||
      (exclude.length && !exclude.includes(eachService)) ||
      (include.length && include[0] === "*")
    ) {
      const eachServicePath = path.join(workingDir, eachService);
      const stat = await statFile(eachServicePath);

      if (stat && stat.isDirectory()) {
        const packageList = await readDir(eachServicePath);

        for (const eachPackage of packageList) {
          const eachPackagePath = path.join(eachServicePath, eachPackage);
          const packageStat = await statFile(eachPackagePath);
          if (packageStat && packageStat.isDirectory()) {
            const checks = await getChecks(eachPackagePath);

            console.log(`checks after walk: ${JSON.stringify(checks, null, 2)}`);
            console.log("Path: " + eachPackagePath);
            if (!checks.isPrivate) {
              if ((clientOnly && checks.isClient) || !clientOnly) {
                if (checks.srcPresent) {
                  var artifactName = checks.packageName.replace("@", "").replace("/", "-");
                  if (docGenOutput === "dg") {
                    docOutputFolder =
                      "--out ../../../docGen/" + artifactName + "/" + checks.version + " ./src";
                  }

                  await runTypeDoc({
                    cwd: eachPackagePath,
                    outputFolder: docOutputFolder,
                    hasTypeDocConfig: checks.typedocPresent,
                  });
                } else {
                  console.log("...SKIPPING Since src folder could not be found.....");
                }
              }
            } else {
              console.log("...SKIPPING Since package marked as private...");
            }
          }
        } //end-for each-package
      }
    }
  } // end-for ServiceFolders
  console.log("All done!");
}

async function main() {
  const argv = yargs
    .options({
      docGenOutput: {
        alias: "dgOp",
        choices: ["dg", "local"] as const,
        describe:
          "If value = dg, generate the docs in root/docGen folder, else generated under dist/docs/ of local package",
        demandOption: true,
      },
      include: {
        alias: "inc",
        conflicts: "exc",
        type: "array",
        describe:
          "inclusion list of packages for which the docs should be generated. The index template html is not created in this mode.",
      },
      exclude: {
        alias: "exc",
        conflicts: "inc",
        type: "array",
        describe:
          "exclusion list for packages for which the docs should be NOT generated.These packages will be added to index template html generated.",
      },
      clientOnly: {
        type: "boolean",
        default: false,
      },
    })
    .help()
    .parseSync();

  console.log("Argv.clientOnly = " + argv.clientOnly);

  const exclude: string[] = argv.include?.map((x) => String(x)) ?? [];
  const include: string[] = argv.exclude?.map((x) => String(x)) ?? [];

  if (argv.docGenOutput === "local" && (argv.include || argv.exclude)) {
    console.error(
      `--include and --exclude are supported only when the docGenOutput is set to "dg"`
    );
    process.exit(1);
  }

  await executeTypedoc({
    include,
    exclude,
    clientOnly: argv.clientOnly,
    docGenOutput: argv.docGenOutput,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
