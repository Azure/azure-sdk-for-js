const fs = require("fs");

console.log(
  "Updating package.json to use 'dev' dependencies for all azure dependencies"
);

fs.readFile("package.json", (err: string, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  let packageSpec = JSON.parse(data);

  for (let dependency of Object.keys(packageSpec.dependencies)) {
    if (dependency.startsWith("@azure/")) {
      packageSpec.dependencies[dependency] = "dev";
    }
  }

  fs.writeFile("package.json", JSON.stringify(packageSpec));
});
