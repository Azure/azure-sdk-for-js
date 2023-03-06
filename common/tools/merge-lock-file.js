const { execSync } = require("child_process");

execSync("git checkout upstream/main -- common/config/rush/pnpm-lock.yaml");
execSync("rush update");
