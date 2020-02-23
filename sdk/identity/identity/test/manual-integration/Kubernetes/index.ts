import * as yargs from "yargs";
import * as util from "util";
import * as path from "path";
const exec = util.promisify(require('child_process').exec);

function sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const JOB_NAME = "test"
const HELM_APP_NAME = "test"

const argv = yargs
    .option('client-id', {
        description: "managed identity's client ID",
        type: 'string',
    })
    .option('resource-id', {
        description: "managed identity's ARM ID",
        type: 'string',
    })
    .option('vault-url', {
        description: "URL of a vault whose secrets the managed identity may manage",
        type: 'string',
    })
    .option('repository', {
        description: "repository holding the test image",
        type: 'string',
    })
    .option('image-name', {
        description: "name of the test image",
        type: 'string',
    })
    .option('image-tag', {
        description: "test image tag",
        type: 'string',
    })
    .option('verbose', {
        alias: "v",
        description: "print all executed commands and their output",
        type: 'boolean',
    })
    .demandOption(["client-id", "resource-id", "vault-url", "repository", "image-name", "image-tag"], "please provide all required parameters")
    .help()
    .alias('help', 'h')
    .argv;

async function runCommand(command: string[], exitOnError = true) {
    try {
        if (argv.verbose) {
            console.log(command);
        }
        let commandString = command.join(" ");
        let { stdout, stderr } = await exec(commandString);
        if (argv.verbose) {
            console.log(stdout);
        }
        return stdout;
    } catch (e) {
        if (exitOnError) {
            console.log(e);
            process.exit(1);
        }
        return e;
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
        "vaultUrl=" + argv.vault_url,
        "--set",
        `image.repository=${argv.repository},image.name=${argv["image-name"]},image.tag=${argv["image-tag"]}`
    ];

    runCommand(helm_install);

    // get the name of the test pod
    let podName = await runCommand(
        ["kubectl", "get", "pods", "--selector=job-name=" + JOB_NAME, "--output=jsonpath='{.items[*].metadata.name}'"]
    );

    let logs = ""

    // poll the number of active pods to determine when the test has finished
    let count_active_pods = ["kubectl", "get", "job", JOB_NAME, "--output=jsonpath='{.status.active}'"]
    for (let x = 0; x < 10; ++x) {
        // kubectl will return '' when there are no active pods
        let active_pods = runCommand(count_active_pods)
        logs = await runCommand(["kubectl", "logs", "-f", podName], false)
        if (!active_pods)
            break
        await sleep(30)
    }

    // output logs from the most recent run
    console.log(logs)

    // uninstall the chart
    runCommand(["helm", "del", "--purge", HELM_APP_NAME])

    // delete CRDs because Helm didn't
    let pod_identity_CRDs = [
        "azureassignedidentities.aadpodidentity.k8s.io",
        "azureidentities.aadpodidentity.k8s.io",
        "azureidentitybindings.aadpodidentity.k8s.io",
        "azurepodidentityexceptions.aadpodidentity.k8s.io",
    ]
    runCommand(["kubectl", "delete", "crd"].concat(pod_identity_CRDs))
}
main().catch((err) => {
    console.log("error code: ", err.code);
    console.log("error message: ", err.message);
    console.log("error stack: ", err.stack);
  });
