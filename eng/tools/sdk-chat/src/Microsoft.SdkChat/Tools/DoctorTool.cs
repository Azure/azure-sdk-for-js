// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace Microsoft.SdkChat.Tools;

/// <summary>
/// Validates all external dependencies required by the SDK Chat tool.
/// Reports version information, path locations, and potential security concerns.
/// In AOT mode with pre-compiled engines, checks for engine binaries instead of interpreters.
/// </summary>
public sealed partial class DoctorTool
{
    private const string Checkmark = "✓";
    private const string CrossMark = "✗";
    private const string WarningMark = "⚠";

    // Source-generated regex for graphing Go version (avoids repeated compilation)
    [GeneratedRegex(@"go(\d+\.\d+\.?\d*)")]
    private static partial Regex GoVersionRegex();

    /// <summary>
    /// Checks if we're running in AOT mode with pre-compiled engines available.
    /// Returns true if all language engines are present as native binaries.
    /// </summary>
    private static bool HasPrecompiledEngines()
    {
        var baseDir = AppContext.BaseDirectory;
        var engines = new[] { "go_engine", "java_engine", "python_engine", "ts_engine" };

        foreach (var engine in engines)
        {
            var binaryName = OperatingSystem.IsWindows() ? $"{engine}.exe" : engine;
            var path = Path.Combine(baseDir, binaryName);
            if (!File.Exists(path))
                return false;
        }

        return true;
    }

    public record DependencyStatus(
        string Name,
        bool IsAvailable,
        string? Version,
        string? Path,
        string? Warning,
        string? Error
    );

    public static async Task<int> ExecuteAsync(bool verbose, CancellationToken ct = default)
    {
        var hasPrecompiledEngines = HasPrecompiledEngines();

        if (hasPrecompiledEngines)
        {
            Console.WriteLine("SDK Chat Doctor - Native AOT Mode");
            Console.WriteLine("==================================\n");
            Console.WriteLine($"{Checkmark} Running with pre-compiled engines\n");

            // In AOT mode, check for engine binaries instead of interpreters
            var results = CheckPrecompiledEngines();
            PrintEngineResults(results, verbose);

            // Check for Copilot CLI
            var copilotStatus = await CheckCopilotCliAsync(ct);
            PrintCopilotStatus(copilotStatus, verbose);

            Console.WriteLine();
            var allAvailable = results.All(r => r.IsAvailable);
            if (allAvailable)
            {
                Console.WriteLine($"{Checkmark} All engines available. SDK Chat is fully operational.");
                return 0;
            }
            else
            {
                var missing = results.Where(r => !r.IsAvailable).Select(r => r.Name);
                Console.WriteLine($"{CrossMark} Missing engines: {string.Join(", ", missing)}");
                return 1;
            }
        }

        // Standard mode: check for interpreters
        Console.WriteLine("SDK Chat Doctor - Dependency Validation");
        Console.WriteLine("========================================\n");

        List<DependencyStatus> standardResults = [];

        // Check .NET (always available since we're running on it)
        standardResults.Add(await CheckDotNetAsync(ct));

        standardResults.Add(await CheckPythonAsync(ct));

        standardResults.Add(await CheckGoAsync(ct));

        standardResults.Add(await CheckJBangAsync(ct));

        standardResults.Add(await CheckNodeAsync(ct));

        PrintResults(standardResults, verbose);

        PrintSecurityAdvisory(standardResults);

        var requiredMissing = standardResults.Any(r => !r.IsAvailable && r.Name == ".NET Runtime");
        var optionalMissing = standardResults.Where(r => !r.IsAvailable && r.Name != ".NET Runtime").ToList();

        Console.WriteLine();
        if (requiredMissing)
        {
            Console.WriteLine($"{CrossMark} Critical dependencies missing. SDK Chat cannot run.");
            return 1;
        }

        if (optionalMissing.Count > 0)
        {
            Console.WriteLine($"{WarningMark} Some language engines unavailable: {string.Join(", ", optionalMissing.Select(m => m.Name))}");
            Console.WriteLine("  SDK Chat will work but cannot graph APIs for these languages.");
            return 0;
        }

        Console.WriteLine($"{Checkmark} All dependencies available. SDK Chat is fully operational.");
        return 0;
    }

    private static async Task<DependencyStatus> CheckDotNetAsync(CancellationToken ct)
    {
        try
        {
            // Check for dotnet runtime (--info shows runtime info even without SDK)
            var (exitCode, output, _) = await RunCommandAsync("dotnet", "--info", ct);
            if (exitCode == 0)
            {
                // Extract runtime version from output
                var version = ExtractDotNetRuntimeVersion(output);
                var path = await GetCommandPathAsync("dotnet", ct);
                return new DependencyStatus(
                    ".NET Runtime",
                    true,
                    version ?? "installed",
                    path,
                    null,
                    null
                );
            }
        }
        catch { /* dotnet command not found or failed - report as unavailable */ }

        return new DependencyStatus(".NET Runtime", false, null, null, null, "dotnet not found in PATH");
    }

    private static string? ExtractDotNetRuntimeVersion(string output)
    {
        // Look for ".NET runtimes installed:" section and extract version
        // Example: "Microsoft.NETCore.App 10.0.0 [/usr/share/dotnet/shared/Microsoft.NETCore.App]"
        foreach (var line in output.Split('\n'))
        {
            var trimmed = line.Trim();
            if (trimmed.StartsWith("Microsoft.NETCore.App", StringComparison.OrdinalIgnoreCase))
            {
                var parts = trimmed.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length >= 2)
                {
                    return parts[1]; // Return version number
                }
            }
        }
        return null;
    }

    private static async Task<DependencyStatus> CheckPythonAsync(CancellationToken ct)
    {
        foreach (var cmd in new[] { "python3", "python" })
        {
            try
            {
                var (exitCode, output, _) = await RunCommandAsync(cmd, "--version", ct);
                if (exitCode == 0)
                {
                    var version = output.Trim().Replace("Python ", "", StringComparison.Ordinal);
                    var path = await GetCommandPathAsync(cmd, ct);

                    // Check for minimum version (3.9+)
                    string? warning = null;
                    if (Version.TryParse(version.Split('-')[0], out var ver) && ver < new Version(3, 9))
                    {
                        warning = "Python 3.9+ recommended for best compatibility";
                    }

                    // Security: Check if path is in a trusted location
                    var pathWarning = CheckPathSecurity(path, "python");
                    if (pathWarning != null) warning = pathWarning;

                    return new DependencyStatus("Python", true, version, path, warning, null);
                }
            }
            catch { /* Command not found or failed - try next candidate */ }
        }

        return new DependencyStatus("Python", false, null, null, null,
            "Python 3 not found. Install Python 3.9+ and ensure it's in PATH.");
    }

    private static async Task<DependencyStatus> CheckGoAsync(CancellationToken ct)
    {
        try
        {
            var (exitCode, output, _) = await RunCommandAsync("go", "version", ct);
            if (exitCode == 0)
            {
                // "go version go1.21.0 darwin/arm64" -> "1.21.0"
                var version = output.Trim();
                var match = GoVersionRegex().Match(version);
                var versionStr = match.Success ? match.Groups[1].Value : version;
                var path = await GetCommandPathAsync("go", ct);

                var pathWarning = CheckPathSecurity(path, "go");

                return new DependencyStatus("Go", true, versionStr, path, pathWarning, null);
            }
        }
        catch { /* go command not found or failed - report as unavailable */ }

        return new DependencyStatus("Go", false, null, null, null,
            "Go not found. Install Go (https://go.dev) and ensure it's in PATH.");
    }

    private static async Task<DependencyStatus> CheckJBangAsync(CancellationToken ct)
    {
        try
        {
            // JBang outputs version to stderr, not stdout
            var (exitCode, output, error) = await RunCommandAsync("jbang", "--version", ct);
            if (exitCode == 0)
            {
                var path = await GetCommandPathAsync("jbang", ct);
                var pathWarning = CheckPathSecurity(path, "jbang");
                // Use stderr if stdout is empty (JBang behavior)
                var version = !string.IsNullOrWhiteSpace(output) ? output.Trim() : error.Trim();
                return new DependencyStatus("JBang (Java)", true, version, path, pathWarning, null);
            }
        }
        catch { /* jbang command not found or failed - report as unavailable */ }

        return new DependencyStatus("JBang (Java)", false, null, null, null,
            "JBang not found. Install JBang (https://jbang.dev) and ensure it's in PATH.");
    }

    private static async Task<DependencyStatus> CheckNodeAsync(CancellationToken ct)
    {
        try
        {
            var (exitCode, output, _) = await RunCommandAsync("node", "--version", ct);
            if (exitCode == 0)
            {
                var version = output.Trim().TrimStart('v');
                var path = await GetCommandPathAsync("node", ct);

                // Check for minimum version (18+)
                string? warning = null;
                if (Version.TryParse(version.Split('-')[0], out var ver) && ver.Major < 18)
                {
                    warning = "Node.js 18+ recommended for best compatibility";
                }

                var pathWarning = CheckPathSecurity(path, "node");
                if (pathWarning != null) warning = pathWarning;

                return new DependencyStatus("Node.js", true, version, path, warning, null);
            }
        }
        catch { /* node command not found or failed - report as unavailable */ }

        return new DependencyStatus("Node.js", false, null, null, null,
            "Node.js not found. Install Node.js 18+ and ensure it's in PATH.");
    }

    private static async Task<(int ExitCode, string Output, string Error)> RunCommandAsync(
        string command, string args, CancellationToken ct)
    {
        var psi = new ProcessStartInfo
        {
            FileName = command,
            Arguments = args,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        using var process = Process.Start(psi) ?? throw new InvalidOperationException($"Failed to start {command}");

        var outputTask = process.StandardOutput.ReadToEndAsync(ct);
        var errorTask = process.StandardError.ReadToEndAsync(ct);

        await process.WaitForExitAsync(ct);

        return (process.ExitCode, await outputTask, await errorTask);
    }

    private static async Task<string?> GetCommandPathAsync(string command, CancellationToken ct)
    {
        try
        {
            var whichCmd = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "where" : "which";
            var (exitCode, output, _) = await RunCommandAsync(whichCmd, command, ct);
            if (exitCode == 0)
            {
                return output.Trim().Split('\n')[0].Trim();
            }
        }
        catch { /* which/where command failed - path resolution not critical */ }
        return null;
    }

    private static string? CheckPathSecurity(string? path, string toolName)
    {
        if (string.IsNullOrEmpty(path)) return null;

        var normalizedPath = Path.GetFullPath(path);

        // Define trusted locations based on OS
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
            normalizedPath.StartsWith(prefix, StringComparison.OrdinalIgnoreCase));

        if (!isTrusted)
        {
            return $"Security: {toolName} found at non-standard location. Verify authenticity.";
        }

        return null;
    }

    private static void PrintResults(List<DependencyStatus> results, bool verbose)
    {
        foreach (var dep in results)
        {
            var icon = dep.IsAvailable ? Checkmark : CrossMark;
            var status = dep.IsAvailable ? $"v{dep.Version}" : "NOT FOUND";

            Console.WriteLine($"{icon} {dep.Name,-15} {status}");

            if (verbose && dep.IsAvailable && dep.Path != null)
            {
                Console.WriteLine($"  Path: {dep.Path}");
            }

            if (dep.Warning != null)
            {
                Console.WriteLine($"  {WarningMark} {dep.Warning}");
            }

            if (!dep.IsAvailable && dep.Error != null)
            {
                Console.WriteLine($"  {dep.Error}");
            }
        }
    }

    private static void PrintSecurityAdvisory(List<DependencyStatus> results)
    {
        var warnings = results.Where(r => r.Warning != null && r.Warning.StartsWith("Security:", StringComparison.Ordinal)).ToList();
        if (warnings.Count is 0) return;

        Console.WriteLine();
        Console.WriteLine("Security Advisory");
        Console.WriteLine("-----------------");
        Console.WriteLine("The following tools were found in non-standard locations.");
        Console.WriteLine("In shared or containerized environments, verify these are authentic:");
        foreach (var w in warnings)
        {
            Console.WriteLine($"  • {w.Name}: {w.Path}");
        }
        Console.WriteLine();
        Console.WriteLine("To enforce specific paths, set environment variables:");
        Console.WriteLine("  SDK_CHAT_PYTHON_PATH, SDK_CHAT_GO_PATH, SDK_CHAT_NODE_PATH, SDK_CHAT_JBANG_PATH");
    }

    private sealed record EngineStatus(string Name, string Language, bool IsAvailable, string? Path);

    private static List<EngineStatus> CheckPrecompiledEngines()
    {
        var baseDir = AppContext.BaseDirectory;
        var engines = new (string Name, string Binary, string Language)[]
        {
            ("Go Engine", "go_engine", "Go"),
            ("Java Engine", "java_engine", "Java"),
            ("Python Engine", "python_engine", "Python"),
            ("TypeScript Engine", "ts_engine", "TypeScript/JavaScript"),
        };

        List<EngineStatus> results = [];

        foreach (var (name, binary, language) in engines)
        {
            var path = Path.Combine(baseDir, binary);
            var exists = File.Exists(path);
            results.Add(new EngineStatus(name, language, exists, exists ? path : null));
        }

        // .NET engine is always available (built into the binary)
        results.Insert(0, new EngineStatus(".NET Engine", "C#/F#", true, "built-in"));

        return results;
    }

    private static void PrintEngineResults(List<EngineStatus> results, bool verbose)
    {
        Console.WriteLine("Pre-compiled Engines:");
        Console.WriteLine("-------------------------");
        foreach (var engine in results)
        {
            var icon = engine.IsAvailable ? Checkmark : CrossMark;
            var status = engine.IsAvailable ? "available" : "MISSING";

            Console.WriteLine($"{icon} {engine.Name,-20} ({engine.Language}) - {status}");

            if (verbose && engine.IsAvailable && engine.Path != null && engine.Path != "built-in")
            {
                Console.WriteLine($"    Path: {engine.Path}");
            }
        }
        Console.WriteLine();
    }

    private sealed record CopilotStatus(bool IsAvailable, string? Version, string? AuthStatus);

    private static async Task<CopilotStatus> CheckCopilotCliAsync(CancellationToken ct)
    {
        // First check for standalone copilot CLI
        try
        {
            var (exitCode, output, _) = await RunCommandAsync("copilot", "--version", ct);
            if (exitCode == 0)
            {
                var version = output.Trim();
                return new CopilotStatus(true, version, null);
            }
        }
        catch { /* copilot command not found - try gh */ }

        // Fall back to gh with copilot extension
        try
        {
            var (exitCode, output, _) = await RunCommandAsync("gh", "--version", ct);
            if (exitCode == 0)
            {
                var version = output.Split('\n')[0].Trim();

                // Check if copilot extension is available
                var (copilotExit, _, _) = await RunCommandAsync("gh", "copilot --help", ct);
                if (copilotExit != 0)
                {
                    return new CopilotStatus(false, version, "Copilot extension not installed");
                }

                // Check auth status
                var (authExit, _, _) = await RunCommandAsync("gh", "auth status", ct);
                var authStatus = authExit == 0 ? "authenticated" : "not authenticated";

                return new CopilotStatus(true, version, authStatus);
            }
        }
        catch { /* gh command not found or failed */ }

        return new CopilotStatus(false, null, null);
    }

    private static void PrintCopilotStatus(CopilotStatus status, bool verbose)
    {
        Console.WriteLine("GitHub Copilot CLI:");
        Console.WriteLine("-------------------");

        if (status.IsAvailable)
        {
            Console.WriteLine($"{Checkmark} Copilot CLI: {status.Version}");

            if (status.AuthStatus != null)
            {
                var authIcon = status.AuthStatus == "authenticated" ? Checkmark : WarningMark;
                Console.WriteLine($"{authIcon} Auth status: {status.AuthStatus}");

                if (status.AuthStatus != "authenticated")
                {
                    Console.WriteLine("  Run 'gh auth login' to authenticate for AI features.");
                }
            }
        }
        else
        {
            Console.WriteLine($"{WarningMark} GitHub Copilot CLI not available");
            if (status.Version != null)
            {
                Console.WriteLine($"  GitHub CLI found ({status.Version}) but Copilot extension missing.");
                Console.WriteLine("  Run 'gh extension install github/gh-copilot' to install.");
            }
            else
            {
                Console.WriteLine("  Install GitHub Copilot CLI for AI features.");
                Console.WriteLine("  See: https://gh.io/copilot-install");
            }
        }
        Console.WriteLine();
    }
}
