import { ReifySchema, Schema } from "../util/schema";
import { exists, fileExists, includes } from "./util";

const SEMVER = Schema.regex(/^[0-9]+.[0-9]+.[0-9]+(-(alpha|beta).[0-9]+)?$/);

export type PackageJson = ReifySchema<typeof PACKAGE_JSON_SCHEMA>;

export const PACKAGE_JSON_SCHEMA = Schema.object(
  {
    name: Schema.regex(/^@azure(-[a-z]+)?\/[a-z-]+$/),
    version: SEMVER,
    description: Schema.string,
    "sdk-type": Schema.optional(
      Schema.union(Schema.literal("client"), Schema.literal("mgmt"), Schema.literal("utility"))
    ),
    main: Schema.regex(/^dist\/index.c?js$/),
    module: Schema.regex(/^dist-esm\/src\/index.m?js$/),
    browser: Schema.withValidator(Schema.map(Schema.string, Schema.string), validateBrowserEntries),
    "//metadata": Schema.object({
      constantPaths: Schema.array(
        Schema.object({
          path: fileExists,
          prefix: Schema.string,
        })
      ),
    }),
    types: Schema.string, // TODO: validate this against api-extractor.json output path, ensure it is in the types/latest folder and starts with the pkgbase
    typesVersions: Schema.object({}), // TODO

    scripts: Schema.object({}), // TODO: do we even want this

    files: Schema.intersection(
      includes("dist/", "dist-esm/src/", "types/latest/", "README.md", "CHANGELOG.md", "LICENSE"),
      Schema.array(exists)
    ), // TODO: check that every typesversions matches an entry here

    repository: Schema.literal("github:Azure/azure-sdk-for-js" as const),
    engines: Schema.object({
      node: Schema.literal(">=14.0.0" as const), // TODO: allow this to roll forward automatically somehow,
    }),
    keywords: includes("azure", "cloud", "typescript"),
    author: Schema.literal("Microsoft Corporation" as const),
    license: Schema.literal("MIT" as const),
    bugs: Schema.object({
      url: Schema.literal("https://github.com/Azure/azure-sdk-for-js/issues" as const),
    }),
    homepage: Schema.string, // TODO: should point to this package's README
    sideEffects: Schema.boolean,
    prettier: Schema.literal("@azure/dev-tool/shared-config/prettier.json"),

    dependencies: Schema.map(Schema.string, Schema.string), // TODO: check that we aren't using git deps, check that we don't depend on beta/alpha packages in stable

    "//sampleConfiguration": Schema.object({
      skipFolder: Schema.optional(Schema.literal(true)),
      disableDocsMs: Schema.optional(Schema.literal(true)),
      productName: Schema.string,
      productSlugs: Schema.array(Schema.withValidator(Schema.string, isValidProductSlug)),
      apiRefLink: Schema.url,
      requiredResources: Schema.optional(Schema.map(Schema.string, Schema.url)),
    }),
  },
  /* indexer */ undefined,
  /* closed */ false
);

function validateBrowserEntries(_browser: { [k: string]: string }): boolean {
  // TODO: validate the `browser` entry
  return true;
}

function isValidProductSlug(slug: string): boolean {
  return VALID_PRODUCT_SLUGS.has(slug);
}

const VALID_PRODUCT_SLUGS = new Set<string>([
  /* TODO */
]);
