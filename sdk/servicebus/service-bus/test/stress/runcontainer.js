const dotenv = require("dotenv");
const { spawnSync } = require("child_process");

dotenv.config();

const serviceBusConnectionString = process.env.SERVICEBUS_CONNECTION_STRING;
const appInsightsInstrumentationKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
const resourceGroup = process.env.RESOURCE_GROUP;
const registryUserName = process.env.REGISTRY_USERNAME
const registryPassword = process.env.REGISTRY_PASSWORD
const registryName = process.env.REGISTRY_NAME;

const imageName = `${registryName}/sb-stressperf:test`;
const containerInstanceName = `${resourceGroup}-sb-stressperf`;

function spawn(command) {
    const ret = spawnSync(command, { shell: true, stdio: "inherit" });

    if (ret.status !== 0) {
        throw new Error(`${command} failed with exit code ${ret.status}`);
    }
}

console.log(`Building container image: ${imageName}...`);
spawn(`docker build -t "${imageName}" --no-cache .`);

console.log(`Pushing image (will fail if you have not yet run \`docker login ${registryName}\`)`);
spawn(`docker push "${imageName}"`);

console.log(`Deleting Azure Container Instance (if exists)`);
spawn(`az container delete --resource-group "${resourceGroup}" --name "${containerInstanceName}"`);

console.log(`Creating Azure Container Instance for stress/perf...`);
spawn(`az container create --resource-group "${resourceGroup}" --name "${containerInstanceName}" ` +
    `--image ${registryName}/sb-perfstress:test ` +
    "--cpu 1 --memory 0.7 " +
    "--restart-policy Never " +
    `--registry-username ${registryUserName} ` +
    `--registry-password "${registryPassword}" ` +
    `--command-line "node /src/scenarioBatchReceive.js" ` +
    `--secure-environment-variables "SERVICEBUS_CONNECTION_STRING=${serviceBusConnectionString}" "APPINSIGHTS_INSTRUMENTATIONKEY=${appInsightsInstrumentationKey}"`);

console.log(`Done - there will be a new Azure Container Instance named '${containerInstanceName}' in the '${resourceGroup}' resource group.\n`);

console.log(`Some other commands you might find useful to manage your container:\n`);
console.log(`az container stop --resource-group "${resourceGroup}" --name "${containerInstanceName}"`);
console.log(`az container delete --resource-group "${resourceGroup}" --name "${containerInstanceName}"`);
console.log(`az container logs --resource-group "${resourceGroup}" --name "${containerInstanceName}" --follow`);
