// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Executes Public API Graph Engines inside per-language Docker containers as a fallback
/// when neither the native binary nor the runtime interpreter is available on the host.
///
/// Each language has its own minimal image:
///   public-api-graph-engine-go:latest        (~5MB, scratch)
///   public-api-graph-engine-python:latest    (~80MB, debian-slim)
///   public-api-graph-engine-java:latest      (~90MB, debian-slim)
///   public-api-graph-engine-typescript:latest (~90MB, debian-slim)
///
/// All images use /engine as the entrypoint.
/// </summary>
public static class DockerSandbox
{
    /// <summary>
    /// Environment variable prefix to override Docker image for a specific language.
    /// E.g., SDK_CHAT_DOCKER_IMAGE_PYTHON=my-registry/python-engine:v1
    /// </summary>
    public const string ImageEnvVarPrefix = "SDK_CHAT_DOCKER_IMAGE_";

    /// <summary>
    /// Allowed Docker registry prefixes for image overrides.
    /// Only images from these registries (or unqualified local images) are accepted.
    /// Set SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY=true to bypass (dev/CI only).
    /// </summary>
    private static readonly string[] AllowedRegistryPrefixes =
    [
        "mcr.microsoft.com/",
        "ghcr.io/microsoft/",
        "public-api-graph-engine-"  // default unqualified local images
    ];

    /// <summary>
    /// Default Docker image name pattern: public-api-graph-engine-{language}:latest
    /// </summary>
    public static string GetImageName(string language)
    {
        var envVar = $"{ImageEnvVarPrefix}{language.ToUpperInvariant()}";
        var image = Environment.GetEnvironmentVariable(envVar) is { Length: > 0 } env
            ? env
            : $"public-api-graph-engine-{language.ToLowerInvariant()}:latest";

        ValidateImageSource(image, envVar);
        return image;
    }

    /// <summary>
    /// Validates that a Docker image reference comes from a trusted registry.
    /// Rejects images from untrusted sources to prevent supply-chain attacks
    /// via malicious container images mounted with host source code.
    /// </summary>
    internal static void ValidateImageSource(string image, string? sourceEnvVar = null)
    {
        // Allow bypass for development/CI environments
        if (string.Equals(Environment.GetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY"), "true", StringComparison.OrdinalIgnoreCase))
        {
            System.Diagnostics.Trace.TraceWarning(
                "Docker image registry validation bypassed via SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY=true. " +
                "Image '{0}' was accepted without registry check. " +
                "Do NOT use this setting in production.", image);
            return;
        }

        foreach (var prefix in AllowedRegistryPrefixes)
        {
            if (image.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                return;
        }

        var source = sourceEnvVar is not null ? $" (from {sourceEnvVar})" : "";
        throw new InvalidOperationException(
            $"Untrusted Docker image source '{image}'{source}. " +
            $"Only images from [{string.Join(", ", AllowedRegistryPrefixes)}] are allowed. " +
            "Set SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY=true to bypass this check.");
    }

    /// <summary>
    /// Execute an engine inside its per-language Docker container.
    /// Mounts the host directory at the same path inside the container for path transparency.
    /// </summary>
    public static Task<ProcessResult> ExecuteAsync(
        string imageName,
        string hostPath,
        string[] arguments,
        TimeSpan? timeout = null,
        string? stdinData = null,
        CancellationToken cancellationToken = default)
        => ExecuteAsync(imageName, [hostPath], arguments, timeout, stdinData, cancellationToken);

    /// <summary>
    /// Execute an engine inside its per-language Docker container with multiple volume mounts.
    /// Each host path is mounted at the same location inside the container for path transparency.
    /// All per-language images use /engine as the entrypoint.
    /// </summary>
    public static Task<ProcessResult> ExecuteAsync(
        string imageName,
        string[] hostPaths,
        string[] arguments,
        TimeSpan? timeout = null,
        string? stdinData = null,
        CancellationToken cancellationToken = default)
    {
        // docker run --rm [-i] -v <path1>:<path1>:ro [-v ...] <image> <args...>
        // Entrypoint is baked into the image as /engine
        List<string> dockerArgs = ["run", "--rm"];

        // Add -i flag when piping stdin to allow interactive input
        if (stdinData is not null)
            dockerArgs.Add("-i");

        // Deduplicate and add volume mounts
        foreach (var path in hostPaths.Distinct(StringComparer.Ordinal))
        {
            dockerArgs.AddRange(["-v", $"{path}:{path}:ro"]);
        }

        dockerArgs.Add(imageName);
        dockerArgs.AddRange(arguments);

        // Use a longer timeout for Docker — includes container startup overhead
        var effectiveTimeout = timeout ?? TimeSpan.FromSeconds(EngineTimeout.Value.TotalSeconds + 30);

        return ProcessSandbox.ExecuteAsync(
            "docker",
            dockerArgs,
            timeout: effectiveTimeout,
            stdinData: stdinData,
            cancellationToken: cancellationToken
        );
    }
}
