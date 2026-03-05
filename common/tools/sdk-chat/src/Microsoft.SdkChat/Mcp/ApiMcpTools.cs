// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.ComponentModel;
using System.Text.Json;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Telemetry;
using ModelContextProtocol.Server;
using PublicApiGraphEngine.Contracts;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// MCP tools for SDK API graphing and coverage analysis.
/// Entity group: api
/// </summary>
[McpServerToolType]
public class ApiMcpTools
{
    private readonly PackageInfoService _service = new();

    [McpServerTool(Name = "graph_api"), Description(
        "Build a public API graph from an SDK package. " +
        "WHEN TO USE: To understand what operations an SDK provides, or to prepare context for code generation. " +
        "WHAT IT DOES: Parses all source files using language-specific analyzers (Roslyn for C#, ast for Python, etc.) and graphs public types, methods, properties with signatures and documentation. " +
        "RETURNS: Compact API representation - either human-readable code stubs or structured JSON. " +
        "TOKEN EFFICIENCY: ~70% smaller than raw source code while preserving all API information. " +
        "SUPPORTS: .NET/C#, Python, Java, JavaScript, TypeScript, Go.")]
    public async Task<string> GraphApiAsync(
        [Description("Absolute path to SDK root directory.")] string packagePath,
        [Description("Force language instead of auto-detection. Values: dotnet, python, java, javascript, typescript, go.")] string? language = null,
        [Description("Output format: 'stubs' (default) for readable signatures, 'json' for structured data.")] string? format = null,
        [Description("Optional path to cross-language metadata JSON file.")] string? crossLanguageMetadata = null,
        [Description("Optional C# project file path (.csproj) for artifact mode.")] string? csprojPath = null,
        [Description("Optional TypeScript tsconfig.json path for artifact mode.")] string? tsconfigPath = null,
        [Description("Optional TypeScript package.json path for export conditions.")] string? packageJsonPath = null,
        [Description("Optional Maven pom.xml path for Java artifact mode.")] string? pomPath = null,
        [Description("Optional Gradle build file path for Java artifact mode.")] string? gradlePath = null,
        [Description("Optional Python import package name for inspect mode.")] string? importName = null,
        CancellationToken cancellationToken = default)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("graph_api");

        try
        {
            var asJson = string.Equals(format, "json", StringComparison.OrdinalIgnoreCase);
            var artifactOptions = new ArtifactOptions
            {
                CsprojPath = csprojPath,
                TsconfigPath = tsconfigPath,
                PackageJsonPath = packageJsonPath,
                PomPath = pomPath,
                GradlePath = gradlePath,
                ImportName = importName,
            };

            var result = await _service.GraphPublicApiAsync(packagePath, language, asJson, crossLanguageMetadata, artifactOptions, cancellationToken).ConfigureAwait(false);

            if (!result.Success)
            {
                return McpToolResult.CreateFailure(
                    result.ErrorMessage ?? "API engine failed",
                    result.ErrorCode ?? "ENGINE_FAILED"
                ).ToString();
            }

            return JsonSerializer.Serialize(
                new McpResponse<ApiGraphResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseApiGraphResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error graphing API: {ex.Message}", ex).ToString();
        }
    }

    [McpServerTool(Name = "analyze_coverage"), Description(
        "Analyze which SDK operations have sample coverage and which are missing. " +
        "WHEN TO USE: To identify documentation gaps and prioritize which samples to create. " +
        "WHAT IT DOES: Compares the public API surface against existing sample code to find which methods/operations are demonstrated and which are not. " +
        "RETURNS: Coverage percentage, list of covered operations (with file:line references), and uncovered operations (with signatures). " +
        "WORKFLOW: Run this → note uncovered operations → use build_samples_prompt with a prompt targeting the gaps.")]
    public async Task<string> AnalyzeCoverageAsync(
        [Description("Absolute path to SDK root directory.")] string packagePath,
        [Description("Path to samples/tests folder. If omitted, auto-detected from samples/, examples/, demo/, etc.")] string? samplesPath = null,
        [Description("Force language instead of auto-detection.")] string? language = null,
        CancellationToken cancellationToken = default)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("analyze_coverage");

        try
        {
            var result = await _service.AnalyzeCoverageAsync(packagePath, samplesPath, language, cancellationToken).ConfigureAwait(false);

            if (!result.Success)
            {
                return McpToolResult.CreateFailure(
                    result.ErrorMessage ?? "Coverage analysis failed",
                    result.ErrorCode ?? "ANALYSIS_FAILED"
                ).ToString();
            }

            return JsonSerializer.Serialize(
                new McpResponse<CoverageAnalysisResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseCoverageAnalysisResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error analyzing coverage: {ex.Message}", ex).ToString();
        }
    }
}
