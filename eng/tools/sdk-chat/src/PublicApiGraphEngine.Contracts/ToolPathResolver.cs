// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Provides secure resolution of external tool paths with support for
/// environment variable overrides and path validation.
/// </summary>
public static partial class ToolPathResolver
{
    /// <summary>
    /// Environment variable prefix for tool path overrides.
    /// Example: SDK_CHAT_PYTHON_PATH=/usr/local/bin/python3
    /// </summary>
    private const string EnvVarPrefix = "SDK_CHAT_";

    /// <summary>
    /// Regex pattern for validating tool names. Only alphanumeric, hyphen, underscore, and dot allowed.
    /// This prevents command injection attacks when the tool name is used in process arguments.
    /// </summary>
    [GeneratedRegex(@"^[a-zA-Z0-9][a-zA-Z0-9._-]*$")]
    private static partial Regex SafeToolNamePattern();

    /// <summary>
    /// Regex pattern for validating command paths. Allows path separators in addition to safe chars.
    /// Permits paths starting with /, ~, or drive letters (C:\).
    /// Rejects shell metacharacters: $, `, &amp;, |, ;, (, ), {, }, &lt;, &gt;, !, *, ?, [, ], #, ', "
    /// </summary>
    [GeneratedRegex(@"^[a-zA-Z0-9/~.][a-zA-Z0-9._\-/\\:~]*$")]
    private static partial Regex SafePathPattern();

    /// <summary>
    /// Validates that a tool name or command contains only safe characters.
    /// Throws ArgumentException if validation fails.
    /// </summary>
    /// <param name="value">The tool name or path to validate.</param>
    /// <param name="paramName">Parameter name for error messages.</param>
    /// <param name="allowPath">If true, allows path separators; if false, only allows simple names.</param>
    /// <exception cref="ArgumentException">Thrown if the value contains unsafe characters.</exception>
    public static void ValidateSafeInput(string value, string paramName, bool allowPath = false)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(value, paramName);

        var pattern = allowPath ? SafePathPattern() : SafeToolNamePattern();
        if (!pattern.IsMatch(value))
        {
            throw new ArgumentException(
                $"Value '{value}' contains invalid characters. Only alphanumeric, hyphen, underscore, and dot are allowed" +
                (allowPath ? " (plus path separators for paths)." : "."),
                paramName);
        }
    }

    /// <summary>
    /// Resolves the path with detailed result including security warnings.
    /// Use this method instead of Resolve() when you need warning information.
    /// </summary>
    public static ToolResolutionResult ResolveWithDetails(
        string toolName,
        string[] defaultCandidates,
        string versionArgs = "--version")
    {
        // SECURITY: Validate tool name to prevent command injection
        ValidateSafeInput(toolName, nameof(toolName), allowPath: false);

        // 1. Check environment variable override first
        var envVar = $"{EnvVarPrefix}{toolName.ToUpperInvariant()}_PATH";
        var envPath = Environment.GetEnvironmentVariable(envVar);

        if (!string.IsNullOrEmpty(envPath))
        {
            // SECURITY: Validate environment path before use
            if (!SafePathPattern().IsMatch(envPath))
            {
                return new ToolResolutionResult(null, null, false,
                    $"{envVar}={envPath} contains invalid characters and was rejected for security");
            }

            if (ValidateExecutable(envPath, versionArgs))
            {
                var absPath = GetAbsolutePath(envPath);
                var warning = CheckPathSecurity(absPath, toolName);
                return new ToolResolutionResult(envPath, absPath, true, warning);
            }
            // Return detailed error for invalid env override
            return new ToolResolutionResult(null, null, false,
                $"{envVar}={envPath} is not a valid {toolName} executable");
        }

        // 2. Try default candidates
        foreach (var candidate in defaultCandidates)
        {
            // SECURITY: Skip candidates with unsafe characters
            if (!SafePathPattern().IsMatch(candidate))
                continue;

            if (ValidateExecutable(candidate, versionArgs))
            {
                var absolutePath = GetAbsolutePath(candidate);
                var warning = CheckPathSecurity(absolutePath, toolName);
                return new ToolResolutionResult(candidate, absolutePath, true, warning);
            }
        }

        return new ToolResolutionResult(null, null, false, $"{toolName} not found");
    }

    /// <summary>
    /// Validates that an executable exists and runs successfully with given args.
    /// Drains stdout/stderr before WaitForExit to prevent pipe-buffer deadlocks.
    /// Accepts exit code 0 or 1 for --help (some tools return 1 for help text),
    /// and only exit code 0 for other args (e.g., --version).
    /// </summary>
    private static bool ValidateExecutable(string path, string args)
    {
        try
        {
            var psi = new ProcessStartInfo
            {
                FileName = path,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            // SECURITY: Use ArgumentList for proper escaping - prevents injection
            var splitArgs = args.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            foreach (var arg in splitArgs)
            {
                psi.ArgumentList.Add(arg);
            }

            using var process = Process.Start(psi);
            if (process is null) return false;

            // Drain stdout/stderr to prevent pipe-buffer deadlocks:
            // if the child writes enough to fill the OS pipe buffer (~4-64KB),
            // WaitForExit will hang indefinitely because the pipe is full.
            process.StandardOutput.ReadToEnd();
            process.StandardError.ReadToEnd();

            if (!process.WaitForExit(3000))
            {
                try { process.Kill(); }
                catch { /* best-effort */ }
                return false;
            }

            // Exit code 0 or 1 are acceptable for --help (some tools return 1 for help)
            // Exit code 0 is required for --version
            // Use exact token match to avoid false positives from substrings like "--helper"
            var isHelpArgs = Array.Exists(splitArgs, a => a == "--help");
            int[] acceptableExitCodes = isHelpArgs ? [0, 1] : [0];
            return acceptableExitCodes.Contains(process.ExitCode);
        }
        catch (Exception ex)
        {
            Trace.TraceWarning("ValidateExecutable failed for '{0}': {1}", path, ex.Message);
            return false;
        }
    }

    /// <summary>
    /// Gets the absolute path to a command using 'which' or 'where'.
    /// </summary>
    private static string? GetAbsolutePath(string command)
    {
        // SECURITY: Validate command before passing to shell
        // This is defense-in-depth since callers should already validate,
        // but we verify here as well since this method uses shell commands
        if (string.IsNullOrWhiteSpace(command) || !SafePathPattern().IsMatch(command))
            return null;

        try
        {
            var whichCmd = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "where" : "which";
            var psi = new ProcessStartInfo
            {
                FileName = whichCmd,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            // SECURITY: Use ArgumentList for proper escaping - prevents injection
            psi.ArgumentList.Add(command);

            using var process = Process.Start(psi);
            if (process is null) return null;

            var output = process.StandardOutput.ReadToEnd();
            process.WaitForExit(1000);

            return process.ExitCode == 0 ? output.Trim().Split('\n')[0].Trim() : null;
        }
        catch (Exception ex)
        {
            Trace.TraceWarning("GetAbsolutePath failed for '{0}': {1}", command, ex.Message);
            return null;
        }
    }

    /// <summary>
    /// Checks if the tool path is in a trusted location.
    /// </summary>
    private static string? CheckPathSecurity(string? absolutePath, string toolName)
    {
        if (string.IsNullOrEmpty(absolutePath)) return null;

        var trustedPrefixes = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? new[] {
                @"C:\Program Files",
                @"C:\Program Files (x86)",
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                @"C:\Windows"
              }
            : new[] {
                "/usr/bin",
                "/usr/local/bin",
                "/opt",
                "/home",
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)
              };

        var isTrusted = trustedPrefixes.Any(prefix =>
            absolutePath.StartsWith(prefix, StringComparison.OrdinalIgnoreCase));

        return isTrusted ? null : $"{toolName} found at non-standard location: {absolutePath}";
    }
}

/// <summary>
/// Result of tool path resolution.
/// </summary>
public sealed record ToolResolutionResult(
    string? Path,
    string? AbsolutePath,
    bool IsAvailable,
    string? WarningOrError
);
