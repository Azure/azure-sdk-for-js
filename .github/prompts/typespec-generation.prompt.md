# Inputs

Make sure the user has provided a URL to the `tspconfig.yaml` file before proceeding with the steps.

# Step 1: Ensure Prerequisites

Ensure that Node is installed and is version 18 or higher. You can check your Node version by running:

```bash
node -v
```

Also, ensure that `tsp-client` is installed globally. If it is not installed, you can install it using:

```bash
npm install -g @azure-tools/typespec-client-generator-cli
```

Rush is also required to be installed globally and can be installed using:

```bash
npm install -g @microsoft/rush
```

Make sure that the user is operating in a branch that is not the main branch, as this task involves generating code and making changes that should be reviewed before merging. If they're not on a branch:

```bash
git checkout -b <branch-name-based-on-service-name-from-url>
```

Check the working tree is clean and if not call `git stash`. Check if the user is working from a fork and if not tell them to fix the situation and then exit.
# Step 2: Generate TypeSpec Client

Run the following command to generate the TypeSpec client using the provided `tspconfig.yaml` file:

```bash
tsp-client init -c <URL_TO_TSPCONFIG_YAML>
```

# Step 3: Add Generated Client to rush.json

After the client is generated, you need to add it to the `rush.json` file. Open the `rush.json` file and add an entry for the generated client under the `projects` section. The entry should look something like this:

```json
{
  "projects": [
    {
      "packageName": "<package-name in package.json>",
      "projectFolder": "path/to/generated/client"
    }
  ]
}
```

# Step 4: Build and verify the Client

After adding the generated client to `rush.json`, you can build and test the client. Run the following commands:

```bash
rush update
rush build -t <package-name>
```

Then, in the generated working directory:

```bash
rushx format
rushx test
rushx lint
```

# Step 5: Commit changes and push

Once these steps are complete, the task has been completed. Help the user create a commit, push their branch and create a PR. Propose a commit message and ask the user if they want to make changes to it before proceeding.
