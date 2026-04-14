// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Tools.Package.Samples;

/// <summary>
/// Writes generated samples to disk with security validation.
/// Separated from workflow orchestration for testability and single responsibility.
/// </summary>
public class SampleWriter
{
    /// <summary>
    /// Result of a sample write operation.
    /// </summary>
    public record WriteResult(
        string FilePath,
        string RelativePath,
        bool Success,
        string? SkipReason = null
    );

    /// <summary>
    /// Writes a generated sample to disk with path traversal protection.
    /// </summary>
    /// <param name="sample">The generated sample to write.</param>
    /// <param name="outputFolder">The absolute path to the output folder.</param>
    /// <param name="fileExtension">The file extension for this language.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The result of the write operation.</returns>
    public static async Task<WriteResult> WriteAsync(
        GeneratedSample sample,
        string outputFolder,
        string fileExtension,
        CancellationToken cancellationToken = default)
    {
        // Use FilePath if provided, otherwise generate from Name
        var relativePath = !string.IsNullOrEmpty(sample.FilePath)
            ? PathSanitizer.SanitizeFilePath(sample.FilePath, fileExtension)
            : PathSanitizer.SanitizeFileName(sample.Name) + fileExtension;

        var normalizedOutputFolder = Path.GetFullPath(outputFolder);
        var filePath = Path.GetFullPath(Path.Combine(outputFolder, relativePath));

        // SECURITY: Ensure path stays within output directory (defense-in-depth)
        if (!filePath.StartsWith(normalizedOutputFolder + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase)
            && !filePath.Equals(normalizedOutputFolder, StringComparison.OrdinalIgnoreCase))
        {
            return new WriteResult(
                filePath,
                relativePath,
                Success: false,
                SkipReason: "Path escapes output directory"
            );
        }

        // Create subdirectories if needed
        var fileDir = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(fileDir))
        {
            Directory.CreateDirectory(fileDir);
        }

        await File.WriteAllTextAsync(filePath, sample.Code, cancellationToken);

        return new WriteResult(filePath, relativePath, Success: true);
    }

    /// <summary>
    /// Writes multiple samples to disk.
    /// </summary>
    /// <param name="samples">The samples to write.</param>
    /// <param name="outputFolder">The absolute path to the output folder.</param>
    /// <param name="fileExtension">The file extension for this language.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Results for each write operation.</returns>
    public static async Task<IReadOnlyList<WriteResult>> WriteAllAsync(
        IEnumerable<GeneratedSample> samples,
        string outputFolder,
        string fileExtension,
        CancellationToken cancellationToken = default)
    {
        Directory.CreateDirectory(outputFolder);

        List<WriteResult> results = [];
        foreach (var sample in samples)
        {
            if (string.IsNullOrEmpty(sample.Name) || string.IsNullOrEmpty(sample.Code))
            {
                continue;
            }

            var result = await WriteAsync(sample, outputFolder, fileExtension, cancellationToken);
            results.Add(result);
        }

        return results;
    }
}
