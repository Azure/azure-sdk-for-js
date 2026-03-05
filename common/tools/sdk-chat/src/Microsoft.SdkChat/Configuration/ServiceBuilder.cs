// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Tools.Package.Samples;

namespace Microsoft.SdkChat.Configuration;

public static class ServiceBuilder
{
    public static IServiceProvider Build(bool useOpenAi)
    {
        var services = new ServiceCollection();

        services.AddLogging(builder => builder.AddConsole());

        var options = SdkChatOptions.FromEnvironment();
        if (useOpenAi)
        {
            options.UseOpenAi = true;
        }
        services.AddSingleton(options);

        services.AddSingleton<AiDebugLogger>();
        services.AddSingleton<AiService>();
        services.AddSingleton<IAiService>(sp => sp.GetRequiredService<AiService>());
        services.AddSingleton<FileHelper>();

        // Sample generation (SamplePromptBuilder and SampleWriter are created internally)
        services.AddSingleton<SampleGeneratorTool>();

        return services.BuildServiceProvider();
    }
}
