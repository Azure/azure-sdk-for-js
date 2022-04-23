module.exports = {
  params: async ({ args }) => {
    const monorepoRoot = args["repo-root"];
    const projectFolder = `sdk/${args.serviceFolder}/${args.name}`;
    const fullProjectPath = `${monorepoRoot}/${projectFolder}`;
    const fullServicePath = `${monorepoRoot}/sdk/${args.serviceFolder}`;
    const packageDescription =
      args.packageDescription ?? `TODO: Add a description for your package`;
    const version = args.version ?? `1.0.0-beta.1`;
    const productName = args.productName ?? "TODO: Add product name";
    const tracingNamespace = args.tracingNamespace ?? "TODO: Add tracing namespace";
    const isTemplateProject = args.isTemplate ?? false;

    // Autorest options
    const swaggerUrl =
      args.swaggerUrl ??
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/c26ac441d8222146b035adada7bc9c61116571c9/sdk/template/template/swagger/appconfiguration.json";
    const addCredentials = args.addCredentials ?? true;
    const disablePagination = Boolean(args.disablePagination);
    const hideClients = Boolean(args.hideClients);

    return {
      monorepoRoot,
      projectFolder,
      fullProjectPath,
      fullServicePath,
      packageDescription,
      version,
      productName,
      tracingNamespace,
      swaggerUrl,
      addCredentials,
      disablePagination,
      hideClients,
      isTemplateProject
    };
  },
};
