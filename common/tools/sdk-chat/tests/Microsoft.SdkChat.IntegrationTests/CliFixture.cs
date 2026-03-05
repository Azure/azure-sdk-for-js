// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using Xunit;

namespace Microsoft.SdkChat.IntegrationTests;

/// <summary>
/// Collection for CLI integration tests.
/// Tests can run in parallel since each invokes the CLI independently.
/// </summary>
[CollectionDefinition("CLI")]
public class CliCollection : ICollectionFixture<CliFixture>
{
}

/// <summary>
/// Fixture for running integration tests by invoking the CLI project directly
/// via <c>dotnet run --project</c>.
/// </summary>
public class CliFixture : IAsyncLifetime
{
    private static readonly string RepoRoot = FindRepoRoot();

    /// <summary>
    /// Build configuration to use for <c>dotnet run</c>.
    /// Auto-detected from the test assembly's output path (Debug or Release).
    /// </summary>
    private static readonly string Configuration = DetectConfiguration();

    /// <summary>
    /// Path to the main CLI project.
    /// </summary>
    public string ProjectPath => Path.Combine(RepoRoot, "src", "Microsoft.SdkChat", "Microsoft.SdkChat.csproj");

    /// <summary>
    /// Path to test fixtures (shared with PublicApiGraphEngine.Tests).
    /// </summary>
    public string FixturesPath => Path.Combine(RepoRoot, "tests", "PublicApiGraphEngine.Tests", "TestFixtures");

    /// <summary>
    /// Whether the test environment is available (dotnet SDK + fixtures).
    /// </summary>
    public bool IsAvailable { get; private set; }

    /// <summary>
    /// Reason why tests are being skipped, if any.
    /// </summary>
    public string? SkipReason { get; private set; }

    public async ValueTask InitializeAsync()
    {
        // Check dotnet CLI is available
        var dotnetCheck = await RunProcessAsync("dotnet", ["--version"], timeoutSeconds: 10);
        if (dotnetCheck.ExitCode != 0)
        {
            SkipReason = "dotnet CLI not available";
            IsAvailable = false;
            return;
        }

        // Check project file exists
        if (!File.Exists(ProjectPath))
        {
            SkipReason = $"CLI project not found: {ProjectPath}";
            IsAvailable = false;
            return;
        }

        // Verify fixtures exist
        if (!Directory.Exists(FixturesPath))
        {
            SkipReason = $"Test fixtures not found: {FixturesPath}";
            IsAvailable = false;
            return;
        }

        IsAvailable = true;
    }

    public ValueTask DisposeAsync() => default;

    /// <summary>
    /// Runs the CLI via <c>dotnet run --project ... --no-build -- [args]</c>.
    /// </summary>
    /// <param name="args">Arguments to pass to sdk-chat CLI.</param>
    /// <param name="timeoutSeconds">Timeout in seconds.</param>
    /// <returns>Exit code, stdout, and stderr.</returns>
    public async Task<(int ExitCode, string Output, string Error)> RunAsync(
        string[] args,
        int timeoutSeconds = 120)
    {
        var dotnetArgs = new List<string> { "run", "--project", ProjectPath, "--configuration", Configuration, "--no-build", "--" };
        dotnetArgs.AddRange(args);

        return await RunProcessAsync("dotnet", [.. dotnetArgs], timeoutSeconds);
    }

    /// <summary>
    /// Runs a command with a fixture path for a specific language.
    /// </summary>
    /// <param name="command">Base command (e.g., "package api graph").</param>
    /// <param name="language">Fixture language folder (DotNet, Python, etc.).</param>
    /// <param name="additionalArgs">Additional CLI args (e.g., "--language dotnet").</param>
    /// <param name="timeoutSeconds">Timeout in seconds.</param>
    public async Task<(int ExitCode, string Output, string Error)> RunWithFixtureAsync(
        string command,
        string language,
        string? additionalArgs = null,
        int timeoutSeconds = 120)
    {
        var fixturePath = Path.Combine(FixturesPath, language);

        // Parse command into args, append fixture path, then additional args
        var args = command.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList();
        args.Add(fixturePath);

        if (!string.IsNullOrEmpty(additionalArgs))
        {
            args.AddRange(additionalArgs.Split(' ', StringSplitOptions.RemoveEmptyEntries));
        }

        return await RunAsync([.. args], timeoutSeconds);
    }

    /// <summary>
    /// Maps fixture folder names to CLI --language flag values.
    /// </summary>
    public static string GetLanguageFlag(string fixtureLanguage) => fixtureLanguage switch
    {
        "DotNet" => "dotnet",
        "Python" => "python",
        "Go" => "go",
        "Java" => "java",
        "TypeScript" => "typescript",
        _ => fixtureLanguage.ToLowerInvariant()
    };

    private static async Task<(int ExitCode, string Output, string Error)> RunProcessAsync(
        string fileName,
        string[] arguments,
        int timeoutSeconds)
    {
        using var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = fileName,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        foreach (var arg in arguments)
        {
            process.StartInfo.ArgumentList.Add(arg);
        }

        try
        {
            process.Start();

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(timeoutSeconds));

            var outputTask = process.StandardOutput.ReadToEndAsync(cts.Token);
            var errorTask = process.StandardError.ReadToEndAsync(cts.Token);

            await process.WaitForExitAsync(cts.Token);

            return (process.ExitCode, await outputTask, await errorTask);
        }
        catch (OperationCanceledException)
        {
            try { process.Kill(entireProcessTree: true); } catch { }
            return (-1, "", $"Timeout after {timeoutSeconds}s");
        }
        catch (Exception ex)
        {
            return (-1, "", ex.Message);
        }
    }

    private static string FindRepoRoot()
    {
        var dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir != null)
        {
            if (File.Exists(Path.Combine(dir.FullName, "sdk-chat.sln")))
            {
                return dir.FullName;
            }
            dir = dir.Parent;
        }

        throw new InvalidOperationException(
            "Could not find repository root (sdk-chat.sln) from " + AppContext.BaseDirectory);
    }

    /// <summary>
    /// Detects whether this test assembly was built in Debug or Release
    /// by inspecting <see cref="AppContext.BaseDirectory"/>.
    /// </summary>
    private static string DetectConfiguration()
    {
        var baseDir = AppContext.BaseDirectory;
        if (baseDir.Contains("/Release/", StringComparison.Ordinal) || baseDir.Contains("\\Release\\", StringComparison.Ordinal))
            return "Release";
        return "Debug";
    }
}
