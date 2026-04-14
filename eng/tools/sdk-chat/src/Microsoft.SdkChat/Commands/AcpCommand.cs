// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.SdkChat.Acp;
using Microsoft.SdkChat.Helpers;

namespace Microsoft.SdkChat.Commands;

public class AcpCommand : Command
{
    public AcpCommand() : base("acp", "Start ACP agent for interactive sample generation")
    {
        var logLevel = new Option<string>("--log-level") { Description = "Log level", DefaultValueFactory = _ => "info" };
        var useOpenAi = new Option<bool>("--use-openai") { Description = "Use OpenAI-compatible API (requires OPENAI_API_KEY)" };
        var loadDotEnv = new Option<bool>("--load-dotenv") { Description = "Load .env file" };

        Add(logLevel);
        Add(useOpenAi);
        Add(loadDotEnv);

        this.SetAction(async (ctx, ct) =>
        {
            if (ctx.GetValue(loadDotEnv)) DotEnv.TryLoadDefault();

            await SampleGeneratorAgentHost.RunAsync(
                ctx.GetValue(logLevel)!,
                ctx.GetValue(useOpenAi)
            );
        });
    }
}
