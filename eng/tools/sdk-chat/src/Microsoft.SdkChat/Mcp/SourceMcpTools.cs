// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.ComponentModel;
using System.Text.Json;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Telemetry;
using ModelContextProtocol.Server;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// MCP tools for SDK source detection.
/// Entity group: source
/// </summary>
[McpServerToolType]
public class SourceMcpTools
{
    private readonly PackageInfoService _service = new();

    [McpServerTool(Name = "detect_source"), Description(
        "Detect the source folder and programming language of an SDK package. " +
        "WHEN TO USE: Before any other SDK operation to verify the package is recognized. " +
        "WHAT IT DOES: Scans for project files (.csproj, pyproject.toml, pom.xml, package.json, go.mod) and locates the primary source directory. " +
        "RETURNS: Source folder path, detected language, file extension, and SDK name. " +
        "SUPPORTS: .NET/C#, Python, Java, JavaScript, TypeScript, Go. " +
        "NEXT STEPS: Use graph_api to see the public API, or build_samples_prompt to create documentation.")]
    public async Task<string> DetectSourceAsync(
        [Description("Absolute path to SDK root (e.g., /home/user/my-sdk-for-python). Must contain project files like .csproj, pyproject.toml, etc.")] string packagePath,
        [Description("Force a specific language instead of auto-detection. Values: dotnet, python, java, javascript, typescript, go.")] string? language = null,
        CancellationToken cancellationToken = default)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("detect_source");

        try
        {
            var result = await _service.DetectSourceFolderAsync(packagePath, language, cancellationToken).ConfigureAwait(false);

            return JsonSerializer.Serialize(
                new McpResponse<SourceFolderResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseSourceFolderResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error detecting source: {ex.Message}", ex).ToString();
        }
    }
}
