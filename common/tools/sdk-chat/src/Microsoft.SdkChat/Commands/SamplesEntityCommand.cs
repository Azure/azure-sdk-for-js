// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Tools.Package.Samples;

namespace Microsoft.SdkChat.Commands;

/// <summary>
/// Samples entity commands: detect and generate samples.
/// </summary>
public class SamplesEntityCommand : Command
{
    public SamplesEntityCommand() : base("samples", "Detect existing samples or generate new ones with AI")
    {
        Add(new DetectCommand());
        Add(new GenerateCommand());
    }

    /// <summary>Detect samples folder.</summary>
    private class DetectCommand : Command
    {
        public DetectCommand() : base("detect", "Find existing samples folder (samples/, examples/, demo/)")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory" };
            var json = new Option<bool>("--json") { Description = "Output as JSON for scripting/automation" };

            Add(pathArg);
            Add(json);

            this.SetAction(async (ctx, ct) =>
            {
                var service = new PackageInfoService();
                var result = await service.DetectSamplesFolderAsync(ctx.GetValue(pathArg)!, ct);

                if (ctx.GetValue(json))
                {
                    Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(result, PackageInfoJsonContext.Default.SamplesFolderResult));
                }
                else
                {
                    Console.WriteLine();
                    if (result.HasExistingSamples)
                    {
                        ConsoleUx.Success($"Samples folder: {result.SamplesFolder}");
                    }
                    else
                    {
                        ConsoleUx.Info($"No samples folder found");
                        ConsoleUx.Info($"Suggested: {result.SuggestedSamplesFolder}");
                    }

                    if (result.AllCandidates.Length > 1)
                    {
                        ConsoleUx.Info("Other candidates:");
                        foreach (var candidate in result.AllCandidates.Skip(1))
                        {
                            ConsoleUx.TreeItem(candidate);
                        }
                    }
                    Console.WriteLine();
                }

                Environment.ExitCode = result.HasExistingSamples ? 0 : 1;
            });
        }
    }

    /// <summary>Generate samples for SDK.</summary>
    private class GenerateCommand : Command
    {
        public GenerateCommand() : base("generate", "Generate production-ready code samples using AI (requires GH_TOKEN or OPENAI_API_KEY)")
        {
            var pathArg = new Argument<string>("path") { Description = "Path to SDK root directory" };
            var output = new Option<string?>("--output") { Description = "Output directory (default: auto-detected samples/ or examples/)" };
            var language = new Option<string?>("--language") { Description = "Override language detection: dotnet, python, java, typescript, go" };
            var prompt = new Option<string?>("--prompt") { Description = "Guide generation: 'streaming examples', 'error handling', 'authentication'" };
            var count = new Option<int?>("--count") { Description = "Number of samples (default: 5)" };
            var budget = new Option<int?>("--budget") { Description = "Max context chars (default: 512K = 128K tokens)" };
            var model = new Option<string?>("--model") { Description = "AI model override" };
            var dryRun = new Option<bool>("--dry-run") { Description = "Preview what would be generated without writing files" };
            var useOpenAi = new Option<bool>("--use-openai") { Description = "Use OpenAI API instead of GitHub Copilot" };
            var loadDotEnv = new Option<bool>("--load-dotenv") { Description = "Load .env file from current directory" };

            Add(pathArg);
            Add(output);
            Add(language);
            Add(prompt);
            Add(count);
            Add(budget);
            Add(model);
            Add(dryRun);
            Add(useOpenAi);
            Add(loadDotEnv);

            this.SetAction(async (ctx, ct) =>
            {
                if (ctx.GetValue(loadDotEnv)) DotEnv.TryLoadDefault();

                var services = ServiceBuilder.Build(ctx.GetValue(useOpenAi));
                var tool = services.GetRequiredService<SampleGeneratorTool>();

                Environment.ExitCode = await tool.ExecuteAsync(
                    ctx.GetValue(pathArg)!,
                    ctx.GetValue(output),
                    ctx.GetValue(language),
                    ctx.GetValue(prompt),
                    ctx.GetValue(count),
                    ctx.GetValue(budget),
                    ctx.GetValue(model),
                    ctx.GetValue(dryRun),
                    ct
                );
            });
        }
    }
}
