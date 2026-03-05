// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Common CLI argument parsing for all Public API Graph Engines.
/// Ensures consistent interface across all languages.
/// </summary>
/// <remarks>
/// Standard usage:
///   engine &lt;path&gt; [options]
///
/// Options:
///   --json      Output as JSON (default: outputs stubs)
///   --stub      Output as language-native stubs
///   --pretty    Pretty-print JSON with indentation
///   -o, --output &lt;file&gt;  Write output to file instead of stdout
///   -h, --help  Show help
/// </remarks>
public sealed class CliOptions
{
    public string? Path { get; private set; }
    public bool OutputJson { get; private set; }
    public bool OutputStub { get; private set; } = true; // Default
    public bool Pretty { get; private set; }
    public string? OutputFile { get; private set; }
    public bool ShowHelp { get; private set; }
    public string? CsprojPath { get; private set; }
    public string? TsconfigPath { get; private set; }
    public string? PackageJsonPath { get; private set; }
    public string? PomPath { get; private set; }
    public string? GradlePath { get; private set; }
    public string? ImportName { get; private set; }

    /// <summary>
    /// Parses command-line arguments into options.
    /// </summary>
    public static CliOptions Parse(string[] args)
    {
        var options = new CliOptions();

        for (var i = 0; i < args.Length; i++)
        {
            var arg = args[i];

            if (arg is "-h" or "--help")
            {
                options.ShowHelp = true;
            }
            else if (arg is "--json")
            {
                options.OutputJson = true;
                options.OutputStub = false;
            }
            else if (arg is "--stub")
            {
                options.OutputStub = true;
                options.OutputJson = false;
            }
            else if (arg is "--pretty" or "-p")
            {
                options.Pretty = true;
            }
            else if (arg is "-o" or "--output" && i + 1 < args.Length)
            {
                options.OutputFile = args[++i];
            }
            else if (arg == "--csproj" && i + 1 < args.Length)
            {
                options.CsprojPath = System.IO.Path.GetFullPath(args[++i]);
            }
            else if (arg == "--tsconfig" && i + 1 < args.Length)
            {
                options.TsconfigPath = System.IO.Path.GetFullPath(args[++i]);
            }
            else if (arg == "--package-json" && i + 1 < args.Length)
            {
                options.PackageJsonPath = System.IO.Path.GetFullPath(args[++i]);
            }
            else if (arg == "--pom" && i + 1 < args.Length)
            {
                options.PomPath = System.IO.Path.GetFullPath(args[++i]);
            }
            else if (arg == "--gradle" && i + 1 < args.Length)
            {
                options.GradlePath = System.IO.Path.GetFullPath(args[++i]);
            }
            else if (arg == "--import-name" && i + 1 < args.Length)
            {
                options.ImportName = args[++i];
            }
            else if (!arg.StartsWith('-') && options.Path is null)
            {
                options.Path = System.IO.Path.GetFullPath(arg);
            }
        }

        return options;
    }

    /// <summary>
    /// Generates standard help text for an engine CLI.
    /// </summary>
    public static string GetHelpText(string language, string exeName)
    {
        return $"""
            {language} Public API Graph Engine
            
            Usage: {exeName} <path> [options]
            
            Arguments:
              <path>              Path to the package/project root
            
            Options:
              --json              Output as JSON
              --stub              Output as {language.ToLowerInvariant()} stubs (default)
              --pretty, -p        Pretty-print JSON with indentation
              -o, --output <file> Write output to file instead of stdout
              --csproj <file>     C# only: explicit .csproj for artifact resolution
              --tsconfig <file>   TypeScript only: explicit tsconfig.json for artifacts
              --package-json <f>  TypeScript only: explicit package.json for exports
              --pom <file>        Java only: explicit pom.xml for classes dir resolution
              --gradle <file>     Java only: explicit build.gradle/build.gradle.kts
              --import-name <n>   Python only: importable package name for inspect mode
              -h, --help          Show this help
            
            Examples:
              {exeName} ./my-package --stub
              {exeName} ./my-package --json --pretty
              {exeName} ./my-package --json -o api.json
            """;
    }
}
