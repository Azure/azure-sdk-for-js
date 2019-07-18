const util = require('util');
const fs = require('fs');
const process = require('process');
const Handlebars = require('handlebars');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

render({}, "out.html");
