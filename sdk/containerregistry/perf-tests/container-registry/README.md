### Guide

1. Build the container-registry perf tests package `rush build -t perf-container-registry`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Azure Container Registry with Standard SKU and populate the `.env` file.
4. Import docker images into the newly created registry

```
az acr login -n <registry-name>

az acr import --name <registry-name> --source docker.io/library/node:latest --image node:latest

az acr update --name <registry-name> --anonymous-pull-enabled
```

5. Run the tests as follows:

- list repositories
  - `npm run perf-test:node -- RepositoryListTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
- list manifests
  - `npm run perf-test:node -- ArtifactListTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
