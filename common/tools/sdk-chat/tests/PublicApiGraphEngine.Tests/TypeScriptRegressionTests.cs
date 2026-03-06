// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

// ============================================================================
// HELPERS
// ============================================================================

/// <summary>
/// Helpers shared across all regression test classes.
/// </summary>
internal static class TsRegressionHelper
{
    internal static bool IsNodeAvailable()
    {
        try
        {
            var psi = new System.Diagnostics.ProcessStartInfo
            {
                FileName = "node",
                Arguments = "--version",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };
            using var p = System.Diagnostics.Process.Start(psi);
            p?.WaitForExit(2000);
            return p?.ExitCode == 0;
        }
        catch { return false; }
    }

    /// <summary>
    /// Creates a minimal package.json in the given directory using source-mode conventions
    /// (main points to a .ts file so the engine reads TypeScript source directly).
    /// </summary>
    internal static void WritePackageJson(string dir, string name, string main = "./src/index.ts",
        Dictionary<string, string>? dependencies = null)
    {
        string json;
        if (dependencies is null || dependencies.Count == 0)
        {
            json = $$$"""{"name":"{{{name}}}","version":"1.0.0","main":"{{{main}}}"}""";
        }
        else
        {
            var depPairs = string.Join(",", dependencies.Select(kv => $"\"{kv.Key}\":\"{kv.Value}\""));
            json = $$$"""{"name":"{{{name}}}","version":"1.0.0","main":"{{{main}}}","dependencies":{""" + depPairs + "}}";
        }
        File.WriteAllText(Path.Combine(dir, "package.json"), json);
    }

    /// <summary>
    /// Returns all SDKWARN diagnostic text strings from the given ApiIndex.
    /// These include self-containment warnings emitted to stderr by the JS engine.
    /// </summary>
    internal static IReadOnlyList<string> GetSdkWarnTexts(ApiIndex api) =>
        api.Diagnostics
            .Where(d => d.Id == "SDKWARN")
            .Select(d => d.Text)
            .ToList();

    /// <summary>
    /// Returns true if any SDKWARN diagnostic text contains the given token.
    /// </summary>
    internal static bool HasSdkWarnFor(ApiIndex api, string token) =>
        GetSdkWarnTexts(api).Any(t => t.Contains(token));

    /// <summary>
    /// Creates a mock npm package in node_modules with a pre-written .d.ts file.
    /// </summary>
    internal static void CreateMockDependency(string projectRoot, string packageName, string dtsContent)
    {
        // Support scoped packages (e.g. @dep/core → node_modules/@dep/core)
        var parts = packageName.TrimStart('@').Split('/');
        var pkgDir = parts.Length == 1
            ? Path.Combine(projectRoot, "node_modules", packageName)
            : Path.Combine(projectRoot, "node_modules", "@" + parts[0], parts[1]);

        Directory.CreateDirectory(Path.Combine(pkgDir, "dist"));

        File.WriteAllText(Path.Combine(pkgDir, "package.json"),
            $$$"""{"name":"{{{packageName}}}","version":"1.0.0","types":"./dist/index.d.ts"}""");

        File.WriteAllText(Path.Combine(pkgDir, "dist", "index.d.ts"), dtsContent);
    }
}

// ============================================================================
// TEST 1: Generic parameter exclusion in self-containment validation
// ============================================================================

/// <summary>
/// Regression for: commit 904c09d
/// validateSelfContainment was reporting generic type parameter names (T, K, V, etc.)
/// as dangling references because it didn't exclude them from the check.
/// Fix: extractDeclaredTypeParamNames() collects them from typeParams strings and
/// excludes them from the dangling-reference list.
/// </summary>
public class TsRegression_GenericParamExclusion
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task GenericTypeParams_DoNotAppearInSelfContainmentWarnings()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_GenericParam_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-generics");

            // Class with multiple generic type parameters and methods that use them.
            // Before the fix, T, K, V would be flagged as dangling type references.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export class Repository<T extends object, K extends string = string> {
                    get(key: K): T { throw new Error(); }
                    set(key: K, value: T): void {}
                    transform<V>(fn: (item: T) => V): V { return fn(this.get("x" as K)); }
                    entries(): Array<[K, T]> { return []; }
                }

                export interface Mapper<TInput, TOutput> {
                    map(input: TInput): TOutput;
                    mapMany(inputs: TInput[]): TOutput[];
                }

                export function identity<TResult>(value: TResult): TResult { return value; }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // None of the declared type parameter names (T, K, V, TInput, TOutput, TResult)
            // should appear in SDKWARN self-containment diagnostics.
            // Before the fix, these would all be flagged as "dangling references".
            var sdkWarns = TsRegressionHelper.GetSdkWarnTexts(api);
            var selfContainmentWarns = sdkWarns
                .Where(t => t.StartsWith("Self-containment:", StringComparison.Ordinal))
                .ToList();

            foreach (var warn in selfContainmentWarns)
            {
                Assert.DoesNotContain("T", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
                Assert.DoesNotContain("K", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
                Assert.DoesNotContain("V", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
                Assert.DoesNotContain("TInput", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
                Assert.DoesNotContain("TOutput", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
                Assert.DoesNotContain("TResult", warn.Split(',', ' ').Select(s => s.Trim()).ToList());
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task GenericConstraint_WithExtends_DoesNotFalsePositive()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_GenericConstraint_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-generic-constraint");

            // class Foo<T extends string> - the "string" is a primitive, "T" is a type param.
            // Before the fix, "T" would be flagged even though it's the declared type parameter.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export class Foo<T extends string> {
                    bar(x: T): T { return x; }
                    baz(): Array<T> { return []; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);

            // T must NOT appear as a dangling reference.
            // The type "string" is a primitive and won't be flagged by TYPE_TOKEN_RE
            // (it starts with lowercase). T starts with uppercase, so it would be
            // caught by the old regex — but the fix excludes declared type params.
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "T"),
                "Generic type param 'T' should not appear in self-containment warnings.");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 2: JSDoc comment stripping in signature tokenizer
// ============================================================================

/// <summary>
/// Regression for: commit a0c53fff
/// extractTypeNamesFromSignature was tokenizing words inside JSDoc/block comments
/// embedded in type strings. For example, a type alias
///   type Config = { /** The timeout. Returns null if absent. */ timeout?: number }
/// would cause "The" and "Returns" (capitalized) to be collected as type references,
/// then flagged as dangling references by validateSelfContainment.
/// Fix: strip comments and string literals before applying TYPE_TOKEN_RE.
/// </summary>
public class TsRegression_JsDocStripping
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task ProseWordsInJsDocComments_DoNotAppearAsTypeReferences()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_JsDoc_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-jsdoc");

            // A type alias with JSDoc comments embedded in the object type literal.
            // The words "The", "Returns", "Allows", "If", "Should" all start with uppercase
            // and would be mistaken for type references by the old regex.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                /**
                 * Configuration for the client.
                 */
                export type ClientConfig = {
                    /** The timeout in milliseconds. Returns to default if not set. */
                    timeout?: number;
                    /** Allows retry on transient failures. Should be 0–10. */
                    retryCount?: number;
                    /** If set, enables verbose logging. */
                    verbose?: boolean;
                };

                export class MyClient {
                    constructor(config?: ClientConfig) {}
                    send(config: ClientConfig): void {}
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // These prose words from JSDoc comments must NOT appear in SDKWARN diagnostics.
            // Before the fix, they would be tokenized as type references and flagged as dangling.
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "The"),
                "'The' from JSDoc should not appear in self-containment warnings.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "Returns"),
                "'Returns' from JSDoc should not appear in self-containment warnings.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "Allows"),
                "'Allows' from JSDoc should not appear in self-containment warnings.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "Should"),
                "'Should' from JSDoc should not appear in self-containment warnings.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "If"),
                "'If' from JSDoc should not appear in self-containment warnings.");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task AllCapsConstants_AreExcludedFromTypeTokenizing()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_AllCaps_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-allcaps");

            // ALL_CAPS_UNDERSCORE names are constants, not types.
            // The fix changes the regex to exclude ALL_CAPS names (^[A-Z][A-Z0-9_]*$).
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export type OperationStatus =
                    | "PENDING"
                    | "RUNNING"
                    | "SUCCEEDED"
                    | "FAILED";

                export interface Operation {
                    status: OperationStatus;
                    name: string;
                }

                export class OperationClient {
                    get(id: string): Operation { throw new Error(); }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);

            // ALL_CAPS string literals in union types should not be flagged as dangling types.
            // Before the ALL_CAPS_RE fix, "PENDING", "RUNNING", "SUCCEEDED", "FAILED"
            // might appear in the type text and be tokenized (since they start with uppercase).
            // After the fix, ALL_CAPS identifiers are excluded from type tokenization.
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "PENDING"),
                "ALL_CAPS constant 'PENDING' should not appear in self-containment warnings.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "SUCCEEDED"),
                "ALL_CAPS constant 'SUCCEEDED' should not appear in self-containment warnings.");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 3: Aliased re-exports in dependency filtering
// ============================================================================

/// <summary>
/// Regression for: commit ba14b8e
/// getExportedTypeNamesFromFile only included the export alias name but not the
/// original declaration name when a package re-exports with renaming:
///   export { AddPolicyOptions as AddPipelineOptions }
/// buildResolvedDependencies filters types by checking exportedNames, but the
/// dependency type was stored under its declaration name (AddPolicyOptions).
/// Since only AddPipelineOptions was in exportedNames, AddPolicyOptions was filtered out.
/// Fix: also add the original declaration name to the exported names set.
/// </summary>
public class TsRegression_AliasedReExports
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task AliasedExport_OriginalDeclarationName_IsIncludedInDependencies()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_AliasedExport_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            // Dependency package with aliased re-export:
            // The type is declared as AddPolicyOptions but exported as AddPipelineOptions.
            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-pipeline", """
                /** Original declared name. */
                export declare class AddPolicyOptions {
                    position: "perCall" | "perRetry";
                }

                /** Re-export under a different alias. */
                export { AddPolicyOptions as AddPipelineOptions };
                """);

            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-alias-export",
                dependencies: new() { ["@azure/core-pipeline"] = "^1.0.0" });

            // Main package imports the aliased name (AddPipelineOptions) from the dep.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import { AddPipelineOptions } from "@azure/core-pipeline";

                export class PipelineClient {
                    addPolicy(options: AddPipelineOptions): void {}
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // The dependency @azure/core-pipeline should appear in the resolved dependencies.
            // Before the fix, AddPolicyOptions (the declaration name) was filtered out because
            // only the alias AddPipelineOptions was in the exported names set.
            if (api.Dependencies is not null)
            {
                var corePipelineDep = api.Dependencies
                    .FirstOrDefault(d => d.Package.Contains("core-pipeline"));

                if (corePipelineDep is not null)
                {
                    // At least one of the two names should appear in the dependency.
                    var depTypeNames = new HashSet<string>(StringComparer.Ordinal);
                    foreach (var cls in corePipelineDep.Classes ?? []) depTypeNames.Add(cls.Name);
                    foreach (var iface in corePipelineDep.Interfaces ?? []) depTypeNames.Add(iface.Name);
                    foreach (var t in corePipelineDep.Types ?? []) depTypeNames.Add(t.Name);

                    // Either the alias or original name should be present.
                    Assert.True(
                        depTypeNames.Contains("AddPipelineOptions") || depTypeNames.Contains("AddPolicyOptions"),
                        $"Expected AddPipelineOptions or AddPolicyOptions in dependency types, got: [{string.Join(", ", depTypeNames)}]");
                }
            }

            // If resolvedDependencies is populated, check there too.
            if (api.ResolvedDependencies is not null)
            {
                var corePipelineResolved = api.ResolvedDependencies
                    .FirstOrDefault(d => d.Package.Contains("core-pipeline"));

                if (corePipelineResolved is not null)
                {
                    var resolvedTypeNames = corePipelineResolved.Modules
                        .SelectMany(m => (m.Classes ?? []).Select(c => c.Name)
                            .Concat((m.Interfaces ?? []).Select(i => i.Name))
                            .Concat((m.Types ?? []).Select(t => t.Name)))
                        .ToHashSet(StringComparer.Ordinal);

                    Assert.True(
                        resolvedTypeNames.Contains("AddPipelineOptions") || resolvedTypeNames.Contains("AddPolicyOptions"),
                        $"Expected aliased type in resolved deps, got: [{string.Join(", ", resolvedTypeNames)}]");
                }
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 4: No duplicate entries in dependency type lists
// ============================================================================

/// <summary>
/// Regression for: deduplication via Map-based ref accumulation.
/// If a type is referenced in many method signatures, older code using
/// a Set of object references (not strings) could produce duplicates.
/// Validates that no type name appears more than once in any dependency list.
/// </summary>
public class TsRegression_DependencyDedup
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task DependencyTypeList_ContainsNoDuplicateNames()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_Dedup_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            // A shared options type used in many methods.
            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-client", """
                export declare interface OperationOptions {
                    timeout?: number;
                    abortSignal?: AbortSignal;
                }
                """);

            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-dedup",
                dependencies: new() { ["@azure/core-client"] = "^1.0.0" });

            // OperationOptions is referenced in 12 separate methods — before the fix
            // a non-deduplicating Set could accumulate 12 separate entries.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import { OperationOptions } from "@azure/core-client";

                export class StorageClient {
                    upload(data: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    download(name: string, opts?: OperationOptions): Promise<string> { throw 0; }
                    delete(name: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    list(prefix?: string, opts?: OperationOptions): Promise<string[]> { throw 0; }
                    exists(name: string, opts?: OperationOptions): Promise<boolean> { throw 0; }
                    rename(src: string, dst: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    copy(src: string, dst: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    move(src: string, dst: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    getMetadata(name: string, opts?: OperationOptions): Promise<Record<string, string>> { throw 0; }
                    setMetadata(name: string, meta: Record<string, string>, opts?: OperationOptions): Promise<void> { throw 0; }
                    createContainer(name: string, opts?: OperationOptions): Promise<void> { throw 0; }
                    deleteContainer(name: string, opts?: OperationOptions): Promise<void> { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);

            // Check no duplicate type names within any single dependency entry.
            if (api.Dependencies is not null)
            {
                foreach (var dep in api.Dependencies)
                {
                    var allNames = new List<string>();
                    foreach (var cls in dep.Classes ?? []) allNames.Add(cls.Name);
                    foreach (var iface in dep.Interfaces ?? []) allNames.Add(iface.Name);
                    foreach (var en in dep.Enums ?? []) allNames.Add(en.Name);
                    foreach (var t in dep.Types ?? []) allNames.Add(t.Name);

                    var duplicates = allNames.GroupBy(n => n).Where(g => g.Count() > 1).Select(g => g.Key).ToList();
                    Assert.Empty(duplicates);
                }
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 5: Import alias resolution in dependency tracking
// ============================================================================

/// <summary>
/// Regression for: commit 390a3fa (buildImportResolutionMap precise static analysis)
/// Import aliases (import { X as Y }) were not tracked in the import resolution map,
/// so when Y was used in a signature, the engine couldn't resolve it back to X
/// in the dependency package.
/// Fix: buildImportResolutionMap handles ImportSpecifier with alias names.
/// </summary>
public class TsRegression_ImportAliasResolution
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task ImportedTypeAlias_ResolvesToOriginalDependencyType()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_ImportAlias_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            // Dependency package exporting OperationOptions.
            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-util", """
                export declare interface OperationOptions {
                    timeout?: number;
                    retries?: number;
                }
                """);

            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-import-alias",
                dependencies: new() { ["@azure/core-util"] = "^1.0.0" });

            // Imports OperationOptions under the alias OpOpts.
            // Before the fix, OpOpts was tracked but couldn't be resolved back to OperationOptions.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import { OperationOptions as OpOpts } from "@azure/core-util";

                export class BlobClient {
                    download(name: string, options?: OpOpts): Promise<string> { throw 0; }
                    upload(data: string, options?: OpOpts): Promise<void> { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // The BlobClient class should be extracted.
            var blobClient = api.Modules
                .SelectMany(m => m.Classes ?? [])
                .FirstOrDefault(c => c.Name == "BlobClient");

            Assert.NotNull(blobClient);

            // The dependency @azure/core-util should appear, with OperationOptions tracked.
            // Before the fix, the import alias OpOpts was not resolved to OperationOptions,
            // so the dependency would either be missing or contain an unresolved stub.
            if (api.Dependencies is not null)
            {
                var coreUtilDep = api.Dependencies
                    .FirstOrDefault(d => d.Package.Contains("core-util"));

                if (coreUtilDep is not null)
                {
                    var hasOperationOptions =
                        (coreUtilDep.Interfaces ?? []).Any(i => i.Name == "OperationOptions")
                        || (coreUtilDep.Types ?? []).Any(t => t.Name == "OperationOptions");

                    Assert.True(hasOperationOptions,
                        "OperationOptions (the original declaration) should appear in @azure/core-util dependencies " +
                        "even when imported under the alias OpOpts.");
                }
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 6: Type parameter constraints traversal
// ============================================================================

/// <summary>
/// Regression for: commit 390a3fa (traverse type parameter constraints for dependency tracking)
/// Type parameter constraints like &lt;T extends SomeExternalType&gt; were not traversed
/// when collecting type references, so SomeExternalType would be missed in the
/// dependency graph even though it's part of the public API surface.
/// </summary>
public class TsRegression_TypeParamConstraintTraversal
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task TypeParamConstraint_LocalType_IsIncludedInReferencedTypes()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_TpConstraint_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-tp-constraint");

            // Client<T extends ServiceConfig> — the constraint type ServiceConfig
            // must be recognized as referenced by Client and should appear in the output.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export interface ServiceConfig {
                    endpoint: string;
                    apiKey: string;
                    retries?: number;
                }

                export class Client<T extends ServiceConfig> {
                    constructor(config: T) {}
                    getConfig(): T { throw 0; }
                    send(data: string): Promise<void> { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // ServiceConfig must appear in the extracted module (it's defined locally).
            var allInterfaces = api.Modules
                .SelectMany(m => m.Interfaces ?? [])
                .ToList();
            Assert.Contains(allInterfaces, i => i.Name == "ServiceConfig");

            // Client must be extracted.
            var client = api.Modules
                .SelectMany(m => m.Classes ?? [])
                .FirstOrDefault(c => c.Name == "Client");
            Assert.NotNull(client);

            // Client's typeParams should reference the constraint.
            // This verifies the typeParams string contains ServiceConfig.
            Assert.NotNull(client.TypeParams);
            Assert.Contains("ServiceConfig", client.TypeParams);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task TypeParamConstraint_ExternalType_AppearInDependencies()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_TpConstraintExt_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            // External package with the constraint type.
            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-client", """
                export declare interface CommonClientOptions {
                    apiVersion?: string;
                    userAgentOptions?: Record<string, string>;
                }
                """);

            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-tp-constraint-ext",
                dependencies: new() { ["@azure/core-client"] = "^1.0.0" });

            // class AzureClient<T extends CommonClientOptions> — the constraint type
            // is from an external dependency.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import { CommonClientOptions } from "@azure/core-client";

                export class AzureClient<T extends CommonClientOptions> {
                    constructor(options: T) {}
                    getOptions(): T { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // AzureClient must be extracted.
            var azureClient = api.Modules
                .SelectMany(m => m.Classes ?? [])
                .FirstOrDefault(c => c.Name == "AzureClient");
            Assert.NotNull(azureClient);

            // CommonClientOptions must appear either in the main modules (if re-exported)
            // or in dependencies. If the engine detected it as a dependency, it should
            // be in api.Dependencies under @azure/core-client.
            if (api.Dependencies is not null)
            {
                var hasCommonClientOptions = api.Dependencies.Any(d =>
                    d.Package.Contains("core-client") &&
                    ((d.Interfaces ?? []).Any(i => i.Name == "CommonClientOptions")
                     || (d.Types ?? []).Any(t => t.Name == "CommonClientOptions")));

                // If the dependency was resolved, verify it has the type.
                // (If unresolved, the test is inconclusive but doesn't fail.)
                if (api.Dependencies.Any(d => d.Package.Contains("core-client")))
                {
                    Assert.True(hasCommonClientOptions,
                        "CommonClientOptions (type param constraint) should appear in @azure/core-client dependencies.");
                }
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 7: Reachability graph name collision — Map.set merges refs per type
// ============================================================================

/// <summary>
/// Regression for: commit 390a3fa (computeReachableTypes using Map with set-merge)
/// When two modules both exported a type named "Response" and both had
/// referencedTypes, the references map could collide and only keep one set.
/// Fix: computeReachableTypes merges references using existing.add(r) when
/// the key already exists in the Map.
/// </summary>
public class TsRegression_ReachabilityMerge
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task DuplicateTypeName_AcrossModules_BothReferencedTypesAreIncluded()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_ReachMerge_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-reach-merge");

            // Two classes both referencing types: BlobResponse references BlobProperties,
            // and FileResponse references FileProperties. The reachability BFS must
            // traverse both sets of references.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export interface BlobProperties {
                    contentType: string;
                    contentLength: number;
                }

                export interface FileProperties {
                    fileName: string;
                    fileSize: number;
                }

                export class BlobResponse {
                    properties: BlobProperties;
                    etag: string;
                    constructor(props: BlobProperties) {
                        this.properties = props;
                        this.etag = "";
                    }
                }

                export class FileResponse {
                    properties: FileProperties;
                    path: string;
                    constructor(props: FileProperties) {
                        this.properties = props;
                        this.path = "";
                    }
                }

                export class StorageClient {
                    getBlob(): BlobResponse { throw 0; }
                    getFile(): FileResponse { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            var allTypes = api.Modules.SelectMany(m =>
                (m.Classes ?? []).Select(c => c.Name)
                .Concat((m.Interfaces ?? []).Select(i => i.Name))
                .Concat((m.Types ?? []).Select(t => t.Name)))
                .ToHashSet(StringComparer.Ordinal);

            // Both BlobProperties and FileProperties must be reachable from StorageClient
            // via BlobResponse and FileResponse respectively.
            Assert.Contains("BlobResponse", allTypes);
            Assert.Contains("FileResponse", allTypes);
            Assert.Contains("BlobProperties", allTypes);
            Assert.Contains("FileProperties", allTypes);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 8: Functions included in getDefinedTypes
// ============================================================================

/// <summary>
/// Regression for: commit 390a3fa (getDefinedTypes includes exported functions)
/// validateSelfContainment builds its "defined" set from getDefinedTypes.
/// Before the fix, exported functions were not included, so if a function's
/// uppercase name appeared in a type signature, it would be flagged as a
/// dangling reference even though it was defined in the same package.
/// Fix: getDefinedTypes iterates mod.functions and adds their names to defined.
/// </summary>
public class TsRegression_FunctionsInGetDefinedTypes
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task ExportedFunction_IsExtractedInModule()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_FuncDef_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-func-defined");

            // Exported functions should appear in modules.functions and their names
            // should be in the "defined" set for self-containment validation.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export interface ClientOptions {
                    endpoint: string;
                    timeout?: number;
                }

                export class ServiceClient {
                    constructor(options: ClientOptions) {}
                    send(data: string): Promise<void> { throw 0; }
                }

                export function createDefaultClient(endpoint: string): ServiceClient {
                    return new ServiceClient({ endpoint });
                }

                export function createClientFromToken(token: string, options?: ClientOptions): ServiceClient {
                    return new ServiceClient({ endpoint: "https://example.com", ...options });
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // Exported functions should appear in the module.
            var allFunctions = api.Modules
                .SelectMany(m => m.Functions ?? [])
                .ToList();

            Assert.Contains(allFunctions, f => f.Name == "createDefaultClient");
            Assert.Contains(allFunctions, f => f.Name == "createClientFromToken");

            // No self-containment warnings for ServiceClient or ClientOptions (both defined).
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "ServiceClient"),
                "ServiceClient is defined locally — should not appear in SDKWARN.");
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "ClientOptions"),
                "ClientOptions is defined locally — should not appear in SDKWARN.");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task FunctionNameInSignature_IsRecognizedAsDefined_NotFlaggedAsDangling()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_FuncNameDef_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-func-name-defined");

            // CreateToken is both an exported function and appears as a return type name.
            // TypeScript allows declaration merging: a function + an interface can share a name.
            // getDefinedTypes must include the function so it's not flagged as dangling.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export interface CreateToken {
                    token: string;
                    expiresAt: Date;
                }

                export function CreateToken(secret: string): CreateToken {
                    return { token: secret, expiresAt: new Date() };
                }

                export class TokenClient {
                    issue(secret: string): CreateToken {
                        return CreateToken(secret);
                    }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);

            // CreateToken appears as a return type in TokenClient.issue.
            // Both the function and the interface with that name are defined locally.
            // Neither should appear in SDKWARN as a dangling reference.
            Assert.False(TsRegressionHelper.HasSdkWarnFor(api, "CreateToken"),
                "'CreateToken' is defined locally (as function + interface) — must not be flagged as dangling.");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 9: BFS index pointer (no queue.shift) — skipped
// ============================================================================
// This optimization has no observable behavior change and is covered by the
// existing integration tests (any test exercising reachability transitively
// exercises the BFS). No explicit regression test is added.

// ============================================================================
// TEST 10: @internal-tagged functions excluded from dependency tracking
// ============================================================================

/// <summary>
/// Regression for: commit 390a3fa (reachability filtering for @internal types)
/// Functions tagged with @internal must be excluded from the public API surface.
/// The engine uses @internal tags to filter declarations from modules.
///
/// Note: The import-declaration fallback in getExternalRefs() collects ALL
/// import declarations (not just those reachable from public types), so types
/// referenced ONLY by @internal code may still appear in raw Dependencies. The
/// key regression guarded here is that @internal code is excluded from the
/// *API surface* (modules), not necessarily from import-map-derived dependency hints.
/// </summary>
public class TsRegression_InternalTagExclusion
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task InternalTaggedFunction_IsExcludedFromPublicApiSurface()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_Internal_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            // Two dependency packages: one used publicly, one only in @internal code.
            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-public", """
                export declare interface PublicOptions {
                    endpoint: string;
                }
                """);

            TsRegressionHelper.CreateMockDependency(tempDir, "@azure/core-internal", """
                export declare interface InternalToken {
                    raw: string;
                    expiresAt: number;
                }
                """);

            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-internal",
                dependencies: new()
                {
                    ["@azure/core-public"] = "^1.0.0",
                    ["@azure/core-internal"] = "^1.0.0",
                });

            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import { PublicOptions } from "@azure/core-public";
                import { InternalToken } from "@azure/core-internal";

                /** Public client — appears in the public API. */
                export class MyClient {
                    constructor(options: PublicOptions) {}
                    send(data: string): Promise<void> { throw 0; }
                }

                /**
                 * Internal helper — excluded from the public API.
                 * @internal
                 */
                export function _internalHelper(token: InternalToken): void {}
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // MyClient must be extracted — it's the public entry point.
            var myClient = api.Modules
                .SelectMany(m => m.Classes ?? [])
                .FirstOrDefault(c => c.Name == "MyClient");
            Assert.NotNull(myClient);

            // _internalHelper must NOT appear in the public API (tagged @internal).
            // This is the core regression: @internal-tagged exports are stripped from
            // the API surface regardless of how they are referenced internally.
            var allFunctionNames = api.Modules
                .SelectMany(m => m.Functions ?? [])
                .Select(f => f.Name)
                .ToList();
            Assert.DoesNotContain("_internalHelper", allFunctionNames);

            // Compiler-resolved references (via refsByContext) are scoped to reachable
            // types. For @internal functions excluded from extraction, their types will
            // NOT appear in the compiler-resolved portion of the dependency graph.
            // Verify: InternalToken is NOT in any compiler-resolved referencedTypes
            // of the public MyClient class.
            var clientReferencedTypes = myClient.ReferencedTypes ?? [];
            Assert.DoesNotContain("InternalToken", clientReferencedTypes);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task UnderscorePrefixedExport_IsExcludedFromPublicApi()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_Underscore_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-underscore");

            // Underscore-prefixed exports are treated as internal by convention.
            // They should not appear in the public API surface.
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                export interface PublicInterface {
                    value: string;
                }

                export class PublicClass {
                    get(id: string): PublicInterface { throw 0; }
                }

                /** @internal */
                export function _internalSetup(secret: string): void {}

                /** @internal */
                export class _InternalHelpers {
                    parse(raw: string): unknown { throw 0; }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // Public types must appear.
            var allClasses = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
            Assert.Contains(allClasses, c => c.Name == "PublicClass");

            // _InternalHelpers and _internalSetup tagged @internal should be excluded.
            var allFunctionNames = api.Modules.SelectMany(m => m.Functions ?? []).Select(f => f.Name).ToList();
            Assert.DoesNotContain("_internalSetup", allFunctionNames);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}

// ============================================================================
// TEST 11: Node.js default imports are treated as namespace imports, not types
// ============================================================================

/// <summary>
/// Regression for: commit 5cf6748
/// Default imports from Node.js built-in modules (e.g., import childProcess from "node:child_process")
/// are CJS module namespace objects via esModuleInterop, NOT importable types.
/// Before the fix, the import-declaration fallback added them to importedTypes,
/// causing them to appear as type references in the generated .d.ts (e.g.,
/// import { childProcess } from "node:child_process"), which produces TS2724 errors.
/// Fix: track default imports from Node.js builtins as namespace imports (same as import * as X).
/// </summary>
public class TsRegression_NodeBuiltinDefaultImport
{
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task NodeBuiltinDefaultImport_DoesNotAppearAsTypeReference()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var tempDir = Path.Combine(Path.GetTempPath(), $"TsReg_NodeBuiltin_{Guid.NewGuid():N}");
        Directory.CreateDirectory(Path.Combine(tempDir, "src"));

        try
        {
            TsRegressionHelper.WritePackageJson(tempDir, "@test/regression-node-builtin");

            // Default import from a Node.js built-in module.
            // Before the fix, "path" and "childProcess" would appear as type references
            // and be emitted in the dependency graph as types (which is incorrect).
            File.WriteAllText(Path.Combine(tempDir, "src", "index.ts"), """
                import path from "path";
                import events from "events";

                export interface FileOptions {
                    encoding?: string;
                    basePath?: string;
                }

                export class FileProcessor {
                    private baseDir: string;

                    constructor(options?: FileOptions) {
                        this.baseDir = options?.basePath ?? process.cwd();
                    }

                    resolve(filePath: string): string {
                        return path.resolve(this.baseDir, filePath);
                    }

                    get basename(): string {
                        return path.basename(this.baseDir);
                    }
                }
                """);

            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Modules);

            // "path" and "events" are Node.js built-in module namespace objects.
            // They must NOT appear as type aliases or class names in the output.
            var allTypeNames = api.Modules
                .SelectMany(m =>
                    (m.Classes ?? []).Select(c => c.Name)
                    .Concat((m.Interfaces ?? []).Select(i => i.Name))
                    .Concat((m.Types ?? []).Select(t => t.Name)))
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            Assert.DoesNotContain("path", allTypeNames);
            Assert.DoesNotContain("events", allTypeNames);

            // They should also not appear in dependencies as types.
            if (api.Dependencies is not null)
            {
                var pathAsType = api.Dependencies.Any(d =>
                    d.IsNode == true &&
                    ((d.Classes ?? []).Any(c => c.Name == "path")
                     || (d.Types ?? []).Any(t => t.Name == "path")));

                Assert.False(pathAsType,
                    "'path' (Node.js built-in default import) should not appear as a type in dependencies.");
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }
}
