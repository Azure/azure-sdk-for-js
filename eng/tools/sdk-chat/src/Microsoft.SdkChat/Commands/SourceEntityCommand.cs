// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Commands;

/// <summary>
/// Source entity commands: detect source folder.
/// </summary>
public class SourceEntityCommand : Command
{
    public SourceEntityCommand() : base("source", "Detect SDK source folder and programming language")
    {
        Add(new DetectCommand());
    }

    /// <summary>Detect source folder.</summary>
    private class DetectCommand : Command
    {
        public DetectCommand() : base("detect", "Auto-detect source folder (src/, lib/) and language (.NET, Python, Java, TypeScript, Go)")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory (e.g., /path/to/my-sdk-for-python)" };
            var language = new Option<string?>("--language") { Description = "Override auto-detection: dotnet, python, java, typescript, javascript, go" };
            var json = new Option<bool>("--json") { Description = "Output as JSON for scripting/automation" };

            Add(pathArg);
            Add(language);
            Add(json);

            this.SetAction(async (ctx, ct) =>
            {
                var service = new PackageInfoService();
                var result = await service.DetectSourceFolderAsync(
                    ctx.GetValue(pathArg)!,
                    ctx.GetValue(language),
                    ct);

                if (ctx.GetValue(json))
                {
                    Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(result, PackageInfoJsonContext.Default.SourceFolderResult));
                }
                else
                {
                    Console.WriteLine();
                    ConsoleUx.Info($"SDK: {ConsoleUx.Bold(result.SdkName)}");
                    ConsoleUx.Info($"Language: {ConsoleUx.Bold(result.LanguageName ?? "unknown")}");
                    ConsoleUx.Info($"Source: {result.SourceFolder}");
                    if (result.FileExtension != null)
                        ConsoleUx.Info($"Extension: {result.FileExtension}");
                    Console.WriteLine();
                }

                Environment.ExitCode = result.IsValid ? 0 : 1;
            });
        }
    }
}
