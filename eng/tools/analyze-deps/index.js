const Buffer = require('buffer').Buffer;
const fs = require('fs');
const path = require('path');
const process = require('process');
const util = require('util');

const argparse = require('argparse');
const Handlebars = require('handlebars');
const jju = require('jju');
const tar = require('tar');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getRushPackages = async (rushPath) => {
  const baseDir = path.dirname(rushPath);
  const rushJson = jju.parse(await readFile(rushPath, 'utf8'));
  const packageData = {};

  for (const proj of rushJson.projects) {
    const projDir = path.join(baseDir, proj.projectFolder);
    const packageJson = jju.parse(await readFile(path.join(projDir, 'package.json'), 'utf8'));
    appendPackageData(packageData, projDir, packageJson);
  }

  return packageData;
};

const getTarballPackages = async (tarballDir) => {
  const files = await readdir(tarballDir);
  const packageData = {};

  for (const file of files) {
    const filePath = path.join(tarballDir, file);
    if (path.extname(filePath).toLowerCase() === ".tgz") {
      const packageJson = jju.parse(await readCompressedFile(filePath, 'package/package.json', 'utf8'));
      appendPackageData(packageData, filePath, packageJson);
    }
  }
  return packageData;
};

const readCompressedFile = async (archivePath, filePath, encoding) => {
  const data = [];
  let processed = false;

  await tar.t({
    file: archivePath,
    onentry: entry => {
      if (!processed) {
        processed = true;
        entry.on('data', c => { data.push(c) })
      }
    }
  }, [filePath]);

  if (data) {
    return Buffer.concat(data).toString(encoding);
  } else {
    return undefined;
  }
}

const appendPackageData = (data, pkgSrc, pkgJson) => {
  data[pkgJson.name] = {
    src: pkgSrc,
    ver: pkgJson.version,
    run: pkgJson.dependencies,
    dev: pkgJson.devDependencies,
    peer: pkgJson.peerDependencies
  };
}

const render = async (context, dest) => {
  context.branch = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;
  context.build = process.env.BUILD_BUILDNUMBER;
  context.build_url = `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_build/results?buildId=${process.env.BUILD_BUILDID}`;
  context.commit = process.env.BUILD_SOURCEVERSION;
  context.isfork = process.env.SYSTEM_PULLREQUEST_ISFORK === 'True';
  context.rel_url = process.env.RELEASE_RELEASEWEBURL;
  context.release = process.env.RELEASE_RELEASENAME;
  context.repo = context.isfork ? process.env.BUILD_REPOSITORY_NAME : 'Azure/azure-sdk-for-js';
  context.curtime = new Date().toISOString();

  Handlebars.registerHelper({
    'and': (a, b) => a && b,
    'capitalize': s => new Handlebars.SafeString(s ? s.charAt(0).toUpperCase() + s.slice(1) : ""),
    'default': (s, def) => new Handlebars.SafeString(s ? s : def),
    'ne': (a, b) => a !== b,
    'or': (a, b) => a || b,
    'pluralize': (num, singular, plural) => new Handlebars.SafeString(num === 1 ? singular : plural),
    'sub': (a, b) => a - b,
    'title': s => new Handlebars.SafeString(s ? s.replace(/\b\S/g, t => t.toUpperCase()) : ""),
    'truncate': (s, len) => new Handlebars.SafeString(s.substr(0, len)),
  });

  const template = await readFile('deps.html.hbs', 'utf8');
  return writeFile(dest, Handlebars.compile(template)(context));
};

const main = async () => {
  const parser = new argparse.ArgumentParser({ prog: 'analyze-deps', description: 'Analyze dependencies in NodeJS packages.' });
  parser.addArgument('--verbose', { help: 'verbose output', action: 'storeTrue' });
  parser.addArgument('--out', { metavar: 'FILE', help: 'write HTML-formatted report to FILE' });
  parser.addArgument('--packdir', { metavar: 'DIR', help: 'analyze packed tarballs in DIR rather than source packages in this repository' });
  const args = parser.parseArgs();

  const context = {};
  context.packages = await (
    args.packdir
      ? getTarballPackages(path.resolve(args.packdir))
      : getRushPackages(path.resolve(`${__dirname}/../../../rush.json`))
  );

  if (args.verbose) {
    console.log('Packages analyzed:');
    for (const package of Object.keys(context.packages).sort()) {
      const info = context.packages[package];
      console.log(`${package} ${info.ver}`);
      console.log(`  from ${info.src}`);
    }
  }

  if (args.out) {
    await render(context, args.out);
  }
}

main();
