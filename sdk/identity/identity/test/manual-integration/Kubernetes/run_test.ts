// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as yargs from "yargs";
import * as path from "path";
import { execSync } from "child_process";

function sleep(secs: number) {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}

const JOB_NAME = "test";
const HELM_APP_NAME = "test";

const argv = yargs
  .option("client-id", {
    description: "managed identity's client ID",
    type: "string",
  })
  .option("resource-id", {
    description: "managed identity's ARM ID",
    type: "string",
  })
  .option("vault-url", {
    description: "URL of a vault whose secrets the managed identity may manage",
    type: "string",
  })
  .option("repository", {
    description: "repository holding the test image",
    type: "string",
  })
  .option("image-name", {
    description: "name of the test image",
    type: "string",
  })
  .option("image-tag", {
    description: "test image tag",
    type: "string",
  })
  .option("verbose", {
    alias: "v",
    description: "print all executed commands and their output",
    type: "boolean",
  })
  .demandOption(
    ["client-id", "resource-id", "vault-url", "repository", "image-name", "image-tag"],
    "please provide all required parameters"
  )
  .help()
  .alias("help", "h").argv;

function runCommand(command: string[], exitOnError = true): string | null {
  console.log("Running command:", command);
  try {
    if (argv.verbose) {
      console.log(command);
    }
    let commandString = command.join(" ");
    const child = execSync(commandString, { encoding: "utf-8" });

    if (argv.verbose) {
      console.log(child);
    }
    return child;
  } catch (e) {
    console.log("Error: " + e);
    if (exitOnError) {
      console.log("Error: " + e);
      process.exit(1);
    }
    return null;
  }
}

async function main(): Promise<void> {
  // install the chart
  let helm_install = [
    "helm",
    "install",
    path.resolve(__dirname, "test-pod-identity"),
    "-n",
    HELM_APP_NAME,
    "--set",
    `aad-pod-identity.azureIdentity.resourceID=${argv["resource-id"]},aad-pod-identity.azureIdentity.clientID=${argv["client-id"]}`,
    "--set",
    `vaultUrl=${argv["vault-url"]}`,
    "--set",
    `image.repository=${argv.repository},image.name=${argv["image-name"]},image.tag=${argv["image-tag"]}`,
  ];

  runCommand(helm_install);

  // get the name of the test pod
  let podName = runCommand([
    "kubectl",
    "get",
    "pods",
    "--selector=job-name=" + JOB_NAME,
    "--output=jsonpath='{.items[*].metadata.name}'",
  ]) as string;

  if (podName[0] == "'") {
    podName = podName.slice(1, -1);
  }

  let logs = "";

  // poll the number of active pods to determine when the test has finished
  let count_active_pods = [
    "kubectl",
    "get",
    "job",
    JOB_NAME,
    "--output=jsonpath='{.status.active}'",
  ];
  for (let x = 0; x < 10; ++x) {
    // kubectl will return '' when there are no active pods
    let active_pods = runCommand(count_active_pods);
    const result = runCommand(["kubectl", "logs", "-f", podName], false);
    if (result === null) {
      break;
    }
    logs = result;
    if (!active_pods) break;
    await sleep(30);
  }

  // output logs from the most recent run
  console.log(logs);

  // uninstall the chart
  runCommand(["helm", "del", "--purge", HELM_APP_NAME]);

  // delete CRDs because Helm didn't
  let pod_identity_CRDs = [
    "azureassignedidentities.aadpodidentity.k8s.io",
    "azureidentities.aadpodidentity.k8s.io",
    "azureidentitybindings.aadpodidentity.k8s.io",
    "azurepodidentityexceptions.aadpodidentity.k8s.io",
  ];
  runCommand(["kubectl", "delete", "crd"].concat(pod_identity_CRDs));
}
main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
