# Run Azure SDK Samples with Multiple Node Versions

`dev-tool` is a great resource for Azure SDK in JS developers to automate many of the testing/debugging workflows. This post shows how to use it to run SDK samples using different node versions. This is especially useful when you want to validate the artifact built by the release pipeline against different node versions.

1. make sure `docker` is installed on your machine. If you are using a UNIX-based OS, you might want to make your user account part of the docker admin group so you do not have to use `sudo` to invoke it. You can do so by executing `usermod -aG docker <username>`.
2. make sure the docker daemon is up and running.
3. download the artifact created by the release pipeline and save the path for it.
4. navigate to your package directory in the command line and make sure your samples directory and `.env` file exist
5. run `npx dev-tool samples check-node-versions --artifact-path <artifact path> --node-versions "12,14"` or you can use any other combination of node versions including specifying the full semver for it.

The tool will spin up docker containers based on images where each contain one of the requested node versions. Each container will install all samples dependencies and then run all TS and JS samples. If an error occurs in one of the samples, it will be shown in red.