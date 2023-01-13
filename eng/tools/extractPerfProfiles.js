const child_process = require("child_process");
child_process.execSync(`zip -r profiles.zip *`, {
  cwd: "sdk/profiles",
});
