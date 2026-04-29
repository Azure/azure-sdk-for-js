import { Command } from "commander";
import { execSync, spawnSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..", "..");

export const infraDeployCommand = new Command("infra")
  .description("Deploy all infrastructure: Azure resources + Function App")
  .option("--resource-group <rg>", "Azure resource group", "dealmaha-agentic-workflows")
  .option("--location <loc>", "Azure region", "eastus2")
  .option("--github-token <token>", "GitHub PAT for Function App (uses GITHUB_TOKEN env if not set)")
  .option("--skip-function", "Deploy infrastructure only, skip Function App")
  .option("--function-only", "Deploy function code only (infra must exist)")
  .option("--dry-run", "Show what would be deployed without deploying")
  .action(async (options) => {
    const infraDir = join(projectRoot, "infra");
    const functionDistDir = join(projectRoot, "dist", "function");
    
    const githubToken = options.githubToken || process.env.GITHUB_TOKEN;
    
    if (!options.functionOnly) {
      // Step 1: Deploy Bicep infrastructure
      console.log("🏗️  Deploying Azure infrastructure...\n");
      
      if (!existsSync(join(infraDir, "main.bicep"))) {
        console.error("❌ main.bicep not found in infra/");
        process.exit(1);
      }

      const deployFunctionApp = !options.skipFunction && !!githubToken;
      
      if (!options.skipFunction && !githubToken) {
        console.log("⚠️  No GitHub token provided. Function App will not be deployed.");
        console.log("   Set GITHUB_TOKEN or use --github-token to enable.\n");
      }

      const bicepParams = [
        `location='${options.location}'`,
        `deployFunctionApp=${deployFunctionApp}`,
      ];
      
      if (deployFunctionApp && githubToken) {
        bicepParams.push(`githubToken='${githubToken}'`);
      }

      const deployCmd = [
        "az deployment group create",
        `--resource-group ${options.resourceGroup}`,
        `--template-file ${join(infraDir, "main.bicep")}`,
        `--parameters ${bicepParams.join(" ")}`,
        "--only-show-errors"
      ].join(" ");

      if (options.dryRun) {
        console.log("Would run:", deployCmd.replace(githubToken || "", "***"));
        console.log("\n✅ Dry run complete (infrastructure)");
      } else {
        try {
          console.log(`Resource group: ${options.resourceGroup}`);
          console.log(`Location: ${options.location}`);
          console.log(`Function App: ${deployFunctionApp ? "enabled" : "disabled"}\n`);
          
          execSync(deployCmd, { stdio: "inherit" });
          console.log("\n✅ Infrastructure deployed successfully\n");
        } catch {
          console.error("❌ Infrastructure deployment failed");
          process.exit(1);
        }
      }

      if (options.skipFunction || !deployFunctionApp) {
        console.log("Done. Function App not deployed.");
        return;
      }
    }

    // Step 2: Build function package
    console.log("📦 Building Function App package...\n");
    
    if (!existsSync(functionDistDir)) {
      mkdirSync(functionDistDir, { recursive: true });
    }

    // Write host.json
    writeFileSync(join(functionDistDir, "host.json"), JSON.stringify({
      version: "2.0",
      logging: {
        applicationInsights: {
          samplingSettings: { isEnabled: true, excludedTypes: "Request" }
        }
      },
      extensionBundle: {
        id: "Microsoft.Azure.Functions.ExtensionBundle",
        version: "[4.*, 5.0.0)"
      }
    }, null, 2));

    // Write package.json
    writeFileSync(join(functionDistDir, "package.json"), JSON.stringify({
      name: "agentic-workflows-collector",
      version: "1.0.0",
      type: "module",
      main: "collectWorkflowRuns.js",
      dependencies: {
        "@azure/functions": "^4.0.0",
        "@azure/identity": "^4.0.0",
        "@azure/monitor-ingestion": "^1.1.0"
      }
    }, null, 2));

    // Verify function code exists
    const functionJs = join(functionDistDir, "collectWorkflowRuns.js");
    if (!existsSync(functionJs)) {
      console.log("⚠️  Function not compiled. Building...");
      try {
        execSync("npx tsgo --project tsconfig.json", { cwd: projectRoot, stdio: "inherit" });
      } catch {
        console.error("❌ Build failed");
        process.exit(1);
      }
    }

    // Install dependencies
    console.log("📥 Installing dependencies...");
    try {
      execSync("npm install --omit=dev --silent", { cwd: functionDistDir });
    } catch {
      console.error("❌ npm install failed");
      process.exit(1);
    }
    console.log("✅ Package ready\n");

    if (options.dryRun) {
      console.log("Would deploy function to: func-agentic-workflows-prod");
      console.log("✅ Dry run complete");
      return;
    }

    // Step 3: Deploy function code
    console.log("🚀 Deploying Function App code...\n");
    
    const funcCheck = spawnSync("func", ["--version"], { encoding: "utf8" });
    if (funcCheck.status !== 0) {
      console.error("❌ Azure Functions Core Tools not found.");
      console.error("   Install: npm install -g azure-functions-core-tools@4");
      process.exit(1);
    }

    const functionAppName = "func-agentic-workflows-prod";
    try {
      execSync(`func azure functionapp publish ${functionAppName} --javascript`, {
        cwd: functionDistDir,
        stdio: "inherit"
      });
      console.log("\n✅ Function App deployed successfully!");
      console.log(`\n📊 Dashboard: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites`);
    } catch {
      console.error("❌ Function deployment failed");
      process.exit(1);
    }
  });
