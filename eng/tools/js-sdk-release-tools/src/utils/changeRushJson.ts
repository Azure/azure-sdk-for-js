import fs from "fs";
import path from "path";
import { CommentDescriptor, CommentSymbol, parse, CommentArray, stringify } from "comment-json";

export function changeRushJson(
  azureSDKForJSRepoRoot: string,
  packageName: any,
  relativePackageFolderPath: string,
  versionPolicyName: string,
) {
  const parsed = parse(
    fs.readFileSync(path.join(azureSDKForJSRepoRoot, "rush.json"), { encoding: "utf-8" }),
  );
  const rushJson = parsed as CommentDescriptor & { projects: CommentArray<CommentSymbol> };
  const projects: any[] = rushJson.projects;
  let exist = false;
  for (const project of projects) {
    if (project.packageName === packageName) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    projects.push({
      packageName: packageName,
      projectFolder: relativePackageFolderPath.replace(/\\/g, "/"),
      versionPolicyName: versionPolicyName,
    });
    fs.writeFileSync(
      path.join(azureSDKForJSRepoRoot, "rush.json"),
      stringify(rushJson, undefined, 2),
      {
        encoding: "utf-8",
      },
    );
  }
}
