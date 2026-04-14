// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace Microsoft.SdkChat.Helpers;

internal static class DotEnv
{
    public static void TryLoadDefault()
    {
        // Only load .env from the current working directory.
        TryLoad(Path.Combine(Environment.CurrentDirectory, ".env"));
    }

    public static void TryLoad(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                return;
            }

            foreach (var rawLine in File.ReadLines(filePath))
            {
                var line = rawLine.Trim();
                if (line.Length is 0 || line.StartsWith('#'))
                {
                    continue;
                }

                if (line.StartsWith("export ", StringComparison.Ordinal))
                {
                    line = line[7..].TrimStart();
                }

                var equalsIndex = line.IndexOf('=');
                if (equalsIndex <= 0)
                {
                    continue;
                }

                var key = line[..equalsIndex].Trim();
                if (key.Length is 0)
                {
                    continue;
                }

                var value = line[(equalsIndex + 1)..].Trim();

                if (value.Length >= 2)
                {
                    if ((value[0] == '"' && value[^1] == '"') || (value[0] == '\'' && value[^1] == '\''))
                    {
                        value = value[1..^1];
                    }
                }

                // Do not override environment variables already set by the process.
                if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key)))
                {
                    continue;
                }

                Environment.SetEnvironmentVariable(key, value);
            }
        }
        catch (Exception)
        {
            // Best-effort. Avoid failing startup due to local .env issues.
        }
    }
}
