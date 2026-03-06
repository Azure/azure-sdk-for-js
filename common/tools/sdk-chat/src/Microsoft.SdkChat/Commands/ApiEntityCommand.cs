// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using System.Text.Json;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;
using PublicApiGraphEngine.Contracts;

namespace Microsoft.SdkChat.Commands;

/// <summary>
/// API entity commands: graph, coverage, and diff.
/// </summary>
public class ApiEntityCommand : Command
{
    public ApiEntityCommand() : base("api", "Build public API graph and analyze sample coverage")
    {
        Add(new GraphCommand());
        Add(new CoverageCommand());
        Add(new DiffCommand());
    }

    /// <summary>Build public API graph.</summary>
    private class GraphCommand : Command
    {
        public GraphCommand() : base("graph", "Build public API graph from SDK source")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory" };
            var language = new Option<string?>("--language") { Description = "Override language detection" };
            var json = new Option<bool>("--json") { Description = "Output structured JSON (default: human-readable code stubs)" };
            var output = new Option<string?>("--output", "-o") { Description = "Write to file instead of stdout" };
            var crossLanguageMetadata = new Option<string?>("--cross-language-metadata") { Description = "Path to cross-language metadata mapping JSON" };
            var csproj = new Option<string?>("--csproj") { Description = "C# only: explicit .csproj path for artifact mode" };
            var tsconfig = new Option<string?>("--tsconfig") { Description = "TypeScript only: explicit tsconfig.json path for artifact mode" };
            var packageJson = new Option<string?>("--package-json") { Description = "TypeScript only: explicit package.json path for export conditions" };
            var pom = new Option<string?>("--pom") { Description = "Java only: explicit pom.xml path for artifact mode" };
            var gradle = new Option<string?>("--gradle") { Description = "Java only: explicit build.gradle/build.gradle.kts path for artifact mode" };
            var importName = new Option<string?>("--import-name") { Description = "Python only: importable package name for inspect mode" };
            var metrics = new Option<bool>("--metrics") { Description = "Show API surface size metrics" };
            var markdown = new Option<bool>("--markdown") { Description = "Output Markdown API reference" };
            var mermaid = new Option<bool>("--mermaid") { Description = "Output Mermaid classDiagram" };
            var severity = new Option<string?>("--severity") { Description = "Minimum diagnostic severity to display: error, warning, or info (default: info)" };
            var suppress = new Option<string[]>("--suppress") { Description = "Diagnostic IDs to suppress (e.g., SDK005 SDK006)", AllowMultipleArgumentsPerToken = true };

            Add(pathArg);
            Add(language);
            Add(json);
            Add(output);
            Add(crossLanguageMetadata);
            Add(csproj);
            Add(tsconfig);
            Add(packageJson);
            Add(pom);
            Add(gradle);
            Add(importName);
            Add(metrics);
            Add(markdown);
            Add(mermaid);
            Add(severity);
            Add(suppress);

            this.SetAction(async (ctx, ct) =>
            {
                var service = new PackageInfoService();
                var artifactOptions = new ArtifactOptions
                {
                    CsprojPath = ctx.GetValue(csproj),
                    TsconfigPath = ctx.GetValue(tsconfig),
                    PackageJsonPath = ctx.GetValue(packageJson),
                    PomPath = ctx.GetValue(pom),
                    GradlePath = ctx.GetValue(gradle),
                    ImportName = ctx.GetValue(importName),
                };

                var result = await service.GraphPublicApiAsync(
                    ctx.GetValue(pathArg)!,
                    ctx.GetValue(language),
                    ctx.GetValue(json),
                    ctx.GetValue(crossLanguageMetadata),
                    artifactOptions,
                    ctx.GetValue(markdown),
                    ctx.GetValue(mermaid),
                    ct);

                if (!result.Success)
                {
                    ConsoleUx.Error(result.ErrorMessage ?? "API engine failed");
                    Environment.ExitCode = 1;
                    return;
                }

                var outputPath = ctx.GetValue(output);
                if (!string.IsNullOrEmpty(outputPath))
                {
                    await File.WriteAllTextAsync(outputPath, result.ApiSurface, ct);
                    ConsoleUx.Success($"Wrote API surface to {outputPath}");
                }
                else
                {
                    Console.WriteLine(result.ApiSurface);
                }

                if (result.Diagnostics?.Length > 0)
                {
                    var severityValue = ctx.GetValue(severity);
                    var minLevel = severityValue?.ToLowerInvariant() switch
                    {
                        "error" => DiagnosticLevel.Error,
                        "warning" => DiagnosticLevel.Warning,
                        _ => DiagnosticLevel.Info,
                    };
                    var suppressedIds = ctx.GetValue(suppress) ?? [];
                    var suppressSet = new HashSet<string>(suppressedIds, StringComparer.OrdinalIgnoreCase);

                    foreach (var diagnostic in result.Diagnostics)
                    {
                        if (diagnostic.Level >= minLevel && !suppressSet.Contains(diagnostic.Id))
                        {
                            ConsoleUx.Info($"{diagnostic.Level}: {diagnostic.Id} {diagnostic.Text}");
                        }
                    }
                }

                if (ctx.GetValue(metrics) && result.Metrics is not null)
                {
                    Console.WriteLine();
                    Console.WriteLine(ApiMetricsAnalyzer.FormatTable(result.Metrics));
                }

                Environment.ExitCode = 0;
            });
        }
    }

    /// <summary>Analyze API coverage in samples.</summary>
    private class CoverageCommand : Command
    {
        public CoverageCommand() : base("coverage", "Find which API operations are missing from samples (coverage gaps)")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory" };
            var samples = new Option<string?>("--samples") { Description = "Custom samples folder path (default: auto-detected)" };
            var language = new Option<string?>("--language") { Description = "Override language detection" };
            var json = new Option<bool>("--json") { Description = "Output as JSON for CI/automation" };
            var uncoveredOnly = new Option<bool>("--uncovered-only") { Description = "Only show operations that need samples" };
            var monorepo = new Option<bool>("--monorepo") { Description = "Analyze all SDK packages in a monorepo (batch coverage)" };
            var parallel = new Option<bool>("--parallel") { Description = "Analyze packages in parallel (monorepo only)" };
            var threads = new Option<int?>("--threads") { Description = "Max concurrent threads when --parallel is set (monorepo only, default: CPU count)" };
            var report = new Option<string?>("--report") { Description = "Write a Markdown report to file (monorepo only)" };
            var quiet = new Option<bool>("--quiet") { Description = "Suppress progress output" };
            var skipEmpty = new Option<bool>("--skip-empty") { Description = "Omit packages with 0 operations from report (monorepo only)" };

            Add(pathArg);
            Add(samples);
            Add(language);
            Add(json);
            Add(uncoveredOnly);
            Add(monorepo);
            Add(parallel);
            Add(threads);
            Add(report);
            Add(quiet);
            Add(skipEmpty);

            this.SetAction(async (ctx, ct) =>
            {
                var service = new PackageInfoService();
                var isMonorepo = ctx.GetValue(monorepo);
                var reportPath = ctx.GetValue(report);

                if (isMonorepo)
                {
                    var progress = ctx.GetValue(quiet)
                        ? null
                        : new Progress<string>(message => Console.Error.WriteLine(message));

                    var maxParallelism = ctx.GetValue(parallel)
                        ? ctx.GetValue(threads) ?? Environment.ProcessorCount
                        : 1;

                    var batch = await service.AnalyzeCoverageMonorepoAsync(
                        ctx.GetValue(pathArg)!,
                        ctx.GetValue(samples),
                        ctx.GetValue(language),
                        progress,
                        maxParallelism,
                        ct);

                    if (!batch.Success)
                    {
                        ConsoleUx.Error(batch.ErrorMessage ?? "Coverage analysis failed");
                        Environment.ExitCode = 1;
                        return;
                    }

                    if (ctx.GetValue(json))
                    {
                        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(batch, PackageInfoJsonContext.Default.CoverageBatchResult));
                    }
                    else
                    {
                        var markdown = RenderCoverageMarkdown(batch, ctx.GetValue(uncoveredOnly), ctx.GetValue(skipEmpty));
                        if (!string.IsNullOrWhiteSpace(reportPath))
                        {
                            var directory = Path.GetDirectoryName(reportPath);
                            if (!string.IsNullOrWhiteSpace(directory))
                            {
                                Directory.CreateDirectory(directory);
                            }
                            await File.WriteAllTextAsync(reportPath, markdown, ct);
                            ConsoleUx.Success($"Wrote coverage report to {reportPath}");
                        }
                        else
                        {
                            Console.WriteLine(markdown);
                        }
                    }

                    Environment.ExitCode = 0;
                    return;
                }

                var result = await service.AnalyzeCoverageAsync(
                    ctx.GetValue(pathArg)!,
                    ctx.GetValue(samples),
                    ctx.GetValue(language),
                    ct);

                if (!result.Success)
                {
                    ConsoleUx.Error(result.ErrorMessage ?? "Coverage analysis failed");
                    Environment.ExitCode = 1;
                    return;
                }

                if (ctx.GetValue(json))
                {
                    Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(result, PackageInfoJsonContext.Default.CoverageAnalysisResult));
                }
                else
                {
                    Console.WriteLine();
                    ConsoleUx.Header($"API Coverage: {result.CoveragePercent}%");
                    ConsoleUx.Info($"Source: {result.SourceFolder}");
                    ConsoleUx.Info($"Samples: {result.SamplesFolder}");
                    ConsoleUx.Info($"Total operations: {result.TotalOperations}");
                    ConsoleUx.Success($"Covered: {result.CoveredCount}");

                    if (result.UncoveredCount > 0)
                    {
                        ConsoleUx.Error($"Uncovered: {result.UncoveredCount}");
                        Console.WriteLine();
                        ConsoleUx.Header("Uncovered Operations:");

                        foreach (var op in result.UncoveredOperations ?? [])
                        {
                            Console.WriteLine($"  {ConsoleUx.Dim(op.ClientType)}.{ConsoleUx.Yellow(op.Operation)}");
                            Console.WriteLine($"    {ConsoleUx.Dim(op.Signature)}");
                        }
                    }

                    if (!ctx.GetValue(uncoveredOnly) && result.CoveredOperations?.Length > 0)
                    {
                        Console.WriteLine();
                        ConsoleUx.Header("Covered Operations:");
                        foreach (var op in result.CoveredOperations)
                        {
                            Console.WriteLine($"  {ConsoleUx.Dim(op.ClientType)}.{ConsoleUx.Green(op.Operation)} → {op.File}:{op.Line}");
                        }
                    }

                    Console.WriteLine();
                }

                Environment.ExitCode = 0;
            });
        }

        private static string RenderCoverageMarkdown(CoverageBatchResult batch, bool uncoveredOnly, bool skipEmpty)
        {
            var sb = new System.Text.StringBuilder();

            sb.AppendLine("# SDK Coverage Report");
            sb.AppendLine();
            sb.AppendLine($"Generated: {DateTimeOffset.UtcNow:yyyy-MM-ddTHH:mm:ssZ}");
            sb.AppendLine();
            sb.AppendLine("## Summary");
            sb.AppendLine();
            sb.AppendLine($"- Root: {batch.RootPath}");
            sb.AppendLine($"- Packages: {batch.TotalPackages}");
            sb.AppendLine($"- Analyzed: {batch.AnalyzedPackages}");
            sb.AppendLine($"- Skipped (no samples): {batch.SkippedPackages}");
            sb.AppendLine($"- Failed: {batch.FailedPackages}");
            sb.AppendLine($"- Total operations: {batch.TotalOperations}");
            sb.AppendLine($"- Covered: {batch.CoveredCount}");
            sb.AppendLine($"- Uncovered: {batch.UncoveredCount}");
            sb.AppendLine($"- Coverage: {batch.CoveragePercent:F2}%");
            sb.AppendLine();

            foreach (var item in batch.Packages ?? [])
            {
                // Skip empty packages if requested
                if (skipEmpty && item.Success && item.Result?.TotalOperations == 0)
                {
                    continue;
                }

                sb.AppendLine($"## {item.RelativePath}");
                sb.AppendLine();

                if (item.SkippedNoSamples)
                {
                    sb.AppendLine("Skipped (no samples detected).");
                    sb.AppendLine();
                    continue;
                }

                if (!item.Success || item.Result == null)
                {
                    sb.AppendLine("Coverage analysis failed.");
                    if (!string.IsNullOrWhiteSpace(item.ErrorCode) || !string.IsNullOrWhiteSpace(item.ErrorMessage))
                    {
                        sb.AppendLine();
                        sb.AppendLine($"{item.ErrorCode}: {item.ErrorMessage}");
                    }
                    sb.AppendLine();
                    continue;
                }

                sb.AppendLine($"Coverage: {item.Result.CoveredCount}/{item.Result.TotalOperations} ({item.Result.CoveragePercent:F2}%)");
                sb.AppendLine();
                if (!uncoveredOnly)
                {
                    sb.AppendLine("### Covered APIs");
                    sb.AppendLine();
                    if (item.Result.CoveredOperations?.Length > 0)
                    {
                        foreach (var op in item.Result.CoveredOperations)
                        {
                            sb.AppendLine($"- {op.ClientType}.{op.Operation} ({op.File}:{op.Line})");
                        }
                    }
                    sb.AppendLine();
                }
                sb.AppendLine("### Uncovered APIs");
                sb.AppendLine();
                if (item.Result.UncoveredOperations?.Length > 0)
                {
                    foreach (var op in item.Result.UncoveredOperations)
                    {
                        sb.AppendLine($"- {op.ClientType}.{op.Operation}: {op.Signature}");
                    }
                }
                sb.AppendLine();
            }

            return sb.ToString();
        }
    }

    /// <summary>Detect breaking changes between current API and a saved baseline.</summary>
    private class DiffCommand : Command
    {
        public DiffCommand() : base("diff", "Detect breaking changes by comparing current API against a baseline snapshot")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory" };
            var baseline = new Option<string?>("--baseline") { Description = "Path to baseline snapshot JSON (produced by a previous --save-baseline run)" };
            var saveBaseline = new Option<string?>("--save-baseline") { Description = "Save the current API as a baseline snapshot to this file" };
            var language = new Option<string?>("--language") { Description = "Override language detection" };
            var json = new Option<bool>("--json") { Description = "Output diff results as structured JSON" };

            Add(pathArg);
            Add(baseline);
            Add(saveBaseline);
            Add(language);
            Add(json);

            this.SetAction(async (ctx, ct) =>
            {
                var service = new PackageInfoService();

                // Build current API index
                var indexResult = await service.GraphPublicApiIndexAsync(
                    ctx.GetValue(pathArg)!,
                    ctx.GetValue(language),
                    null,
                    ct);

                if (!indexResult.Success || indexResult.ApiIndex == null)
                {
                    ConsoleUx.Error(indexResult.ErrorMessage ?? "API engine failed");
                    Environment.ExitCode = 1;
                    return;
                }

                var currentIndex = indexResult.ApiIndex;

                // Save baseline if requested
                var saveBaselinePath = ctx.GetValue(saveBaseline);
                if (!string.IsNullOrEmpty(saveBaselinePath))
                {
                    var snapshot = ApiDiffSnapshot.FromSource(currentIndex, currentIndex.Package, indexResult.Language);
                    var snapshotJson = JsonSerializer.Serialize(snapshot, EngineJsonContext.Indented.ApiDiffSnapshot);
                    await File.WriteAllTextAsync(saveBaselinePath, snapshotJson, ct);
                    ConsoleUx.Success($"Saved baseline snapshot to {saveBaselinePath}");
                }

                // Run diff if a baseline is provided
                var baselinePath = ctx.GetValue(baseline);
                if (string.IsNullOrEmpty(baselinePath))
                {
                    if (string.IsNullOrEmpty(saveBaselinePath))
                    {
                        ConsoleUx.Error("Specify --baseline <file> to compare, or --save-baseline <file> to create a baseline.");
                        Environment.ExitCode = 1;
                    }
                    return;
                }

                if (!File.Exists(baselinePath))
                {
                    ConsoleUx.Error($"Baseline file not found: {baselinePath}");
                    Environment.ExitCode = 1;
                    return;
                }

                ApiDiffSnapshot? baselineSnapshot;
                try
                {
                    var baselineJson = await File.ReadAllTextAsync(baselinePath, ct);
                    baselineSnapshot = JsonSerializer.Deserialize(baselineJson, EngineJsonContext.Default.ApiDiffSnapshot);
                }
                catch (Exception ex) when (ex is IOException or JsonException)
                {
                    ConsoleUx.Error($"Failed to load baseline: {ex.Message}");
                    Environment.ExitCode = 1;
                    return;
                }

                if (baselineSnapshot == null)
                {
                    ConsoleUx.Error("Baseline file is empty or invalid.");
                    Environment.ExitCode = 1;
                    return;
                }

                var diffResult = ApiDiffAnalyzer.Compare(baselineSnapshot, currentIndex);

                if (ctx.GetValue(json))
                {
                    Console.WriteLine(JsonSerializer.Serialize(diffResult, EngineJsonContext.Indented.ApiDiffResult));
                    Environment.ExitCode = diffResult.Breaking.Count > 0 ? 1 : 0;
                    return;
                }

                // Human-readable output
                Console.WriteLine();
                ConsoleUx.Header($"API Diff: {baselineSnapshot.Package} (baseline: {Path.GetFileName(baselinePath)})");
                Console.WriteLine();

                if (diffResult.Breaking.Count == 0 && diffResult.NonBreaking.Count == 0)
                {
                    ConsoleUx.Success("No API changes detected.");
                    Environment.ExitCode = 0;
                    return;
                }

                if (diffResult.Breaking.Count > 0)
                {
                    ConsoleUx.Error($"Breaking changes ({diffResult.Breaking.Count}):");
                    foreach (var change in diffResult.Breaking)
                    {
                        var member = change.MemberName is not null ? $".{change.MemberName}" : "";
                        var detail = change.OldSignature is not null ? $" [{change.OldSignature}]" : "";
                        Console.WriteLine($"  {ConsoleUx.Red(change.ChangeKind)}: {change.TypeName}{member}{detail}");
                    }
                    Console.WriteLine();
                }

                if (diffResult.NonBreaking.Count > 0)
                {
                    ConsoleUx.Success($"Non-breaking changes ({diffResult.NonBreaking.Count}):");
                    foreach (var change in diffResult.NonBreaking)
                    {
                        var member = change.MemberName is not null ? $".{change.MemberName}" : "";
                        var detail = change.NewSignature is not null ? $" [{change.NewSignature}]" : "";
                        Console.WriteLine($"  {ConsoleUx.Green(change.ChangeKind)}: {change.TypeName}{member}{detail}");
                    }
                    Console.WriteLine();
                }

                Environment.ExitCode = diffResult.Breaking.Count > 0 ? 1 : 0;
            });
        }
    }
}
