// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.ComponentModel;
using System.Text.Json;
using Microsoft.SdkChat.Services;
using ModelContextProtocol.Server;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// MCP resources for SDK context.
/// Provides read-only access to SDK API surface, coverage, and source information.
/// </summary>
[McpServerResourceType]
public class SdkResources(IPackageInfoService service)
{
    private readonly IPackageInfoService _service = service;

    [McpServerResource(UriTemplate = "sdk://{path}/api"), Description(
        "Public API surface of the SDK package. " +
        "Returns the graphed API signatures, types, methods, and documentation as JSON. " +
        "Use this to understand what operations the SDK provides without reading raw source code. " +
        "~70% more token-efficient than raw source.")]
    public async Task<string> GetApiAsync(
        [Description("Absolute path to SDK root directory")] string path,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await _service.GraphPublicApiAsync(path, language: null, asJson: true, crossLanguageMetadataPath: null, ct: cancellationToken).ConfigureAwait(false);
            
            if (!result.Success)
            {
                return JsonSerializer.Serialize(
                    new McpErrorResponse { Error = result.ErrorMessage ?? "API engine failed", ErrorCode = result.ErrorCode ?? "ENGINE_FAILED" },
                    McpJsonContext.Default.McpErrorResponse);
            }

            // Return consistent JSON format - wrap the API surface in a response object
            return JsonSerializer.Serialize(
                new McpResponse<ApiGraphResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseApiGraphResult);
        }
        catch (Exception ex)
        {
            return JsonSerializer.Serialize(
                new McpErrorResponse { Error = ex.Message, ErrorCode = "ENGINE_ERROR" },
                McpJsonContext.Default.McpErrorResponse);
        }
    }

    [McpServerResource(UriTemplate = "sdk://{path}/coverage"), Description(
        "Coverage analysis of SDK samples. " +
        "Returns which API operations have sample coverage and which are missing. " +
        "Use this to identify documentation gaps and prioritize sample generation.")]
    public async Task<string> GetCoverageAsync(
        [Description("Absolute path to SDK root directory")] string path,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await _service.AnalyzeCoverageAsync(path, samplesPath: null, language: null, cancellationToken).ConfigureAwait(false);
            
            if (!result.Success)
            {
                return JsonSerializer.Serialize(
                    new McpErrorResponse { Error = result.ErrorMessage ?? "Coverage analysis failed", ErrorCode = result.ErrorCode ?? "ANALYSIS_FAILED" },
                    McpJsonContext.Default.McpErrorResponse);
            }

            return JsonSerializer.Serialize(
                new McpResponse<CoverageAnalysisResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseCoverageAnalysisResult);
        }
        catch (Exception ex)
        {
            return JsonSerializer.Serialize(
                new McpErrorResponse { Error = ex.Message, ErrorCode = "ANALYSIS_ERROR" },
                McpJsonContext.Default.McpErrorResponse);
        }
    }

    [McpServerResource(UriTemplate = "sdk://{path}/source-info"), Description(
        "Source folder and language detection for SDK package. " +
        "Returns the detected programming language, source folder path, file extension, and SDK name. " +
        "Use this before any other SDK operations to verify package recognition.")]
    public async Task<string> GetSourceInfoAsync(
        [Description("Absolute path to SDK root directory")] string path,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await _service.DetectSourceFolderAsync(path, language: null, cancellationToken).ConfigureAwait(false);

            return JsonSerializer.Serialize(
                new McpResponse<SourceFolderResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseSourceFolderResult);
        }
        catch (Exception ex)
        {
            return JsonSerializer.Serialize(
                new McpErrorResponse { Error = ex.Message, ErrorCode = "DETECTION_ERROR" },
                McpJsonContext.Default.McpErrorResponse);
        }
    }
}
