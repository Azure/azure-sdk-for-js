// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for the SensitiveDataScrubber to ensure API keys and secrets are properly redacted.
/// </summary>
public class SensitiveDataScrubberTests
{
    [Fact]
    public void Scrub_NullInput_ReturnsEmptyString()
    {
        var result = SensitiveDataScrubber.Scrub(null);
        Assert.Equal(string.Empty, result);
    }

    [Fact]
    public void Scrub_EmptyInput_ReturnsEmptyString()
    {
        var result = SensitiveDataScrubber.Scrub(string.Empty);
        Assert.Equal(string.Empty, result);
    }

    [Fact]
    public void Scrub_NoSecrets_ReturnsOriginalText()
    {
        var input = "This is a normal log message with no secrets.";
        var result = SensitiveDataScrubber.Scrub(input);
        Assert.Equal(input, result);
    }

    [Theory]
    [InlineData("sk-1234567890abcdef1234567890abcdef")]
    [InlineData("sk-proj-abcdefghijklmnopqrstuvwxyz123456")]
    [InlineData("sk-abcdefghijklmnopqrstuvwxyz")]
    public void Scrub_OpenAiKey_IsRedacted(string key)
    {
        var input = $"Using API key: {key}";
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.DoesNotContain(key, result);
        Assert.Contains("[REDACTED]", result);
    }

    [Theory]
    [InlineData("ghp_abcdefghijklmnopqrstuvwxyz1234567890")]
    [InlineData("gho_abcdefghijklmnopqrstuvwxyz1234567890")]
    [InlineData("ghu_abcdefghijklmnopqrstuvwxyz1234567890")]
    [InlineData("ghs_abcdefghijklmnopqrstuvwxyz1234567890")]
    [InlineData("ghr_abcdefghijklmnopqrstuvwxyz1234567890")]
    public void Scrub_GitHubToken_IsRedacted(string token)
    {
        var input = $"GITHUB_TOKEN={token}";
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.DoesNotContain(token, result);
        Assert.Contains("[REDACTED]", result);
    }

    [Fact]
    public void Scrub_BearerToken_IsRedacted()
    {
        var input = "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0";
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.DoesNotContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", result);
        Assert.Contains("Bearer [REDACTED]", result);
    }

    [Theory]
    [InlineData("api_key=AKIAIOSFODNN7EXAMPLE")]
    [InlineData("api_key=AKIAI44QH8DHBEXAMPLE")]
    public void Scrub_GenericKeyPattern_IsRedacted(string input)
    {
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.Contains("[REDACTED]", result);
    }

    [Theory]
    [InlineData("api_key=sk_test_abcdefghijklmnop")]
    [InlineData("apikey: my_secret_api_key_12345678")]
    [InlineData("\"api-key\": \"abcdefghijklmnopqrstuv\"")]
    [InlineData("secret=supersecretvalue12345678")]
    [InlineData("password: verysecurepassword123")]
    [InlineData("token=auth_token_value_here_123")]
    public void Scrub_GenericSecretPatterns_AreRedacted(string pattern)
    {
        var input = $"Config: {pattern}";
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.Contains("[REDACTED]", result);
    }

    [Fact]
    public void Scrub_MultipleSecrets_AllAreRedacted()
    {
        var input = """
            Configuration:
            - OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef
            - GITHUB_TOKEN=ghp_abcdefghijklmnopqrstuvwxyz1234567890
            - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
            """;

        var result = SensitiveDataScrubber.Scrub(input);

        Assert.DoesNotContain("sk-1234567890abcdef", result);
        Assert.DoesNotContain("ghp_abcdefghijklmnopqrstuvwxyz", result);
        Assert.DoesNotContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", result);

        // Should have multiple redactions
        var redactionCount = result.Split("[REDACTED]").Length - 1;
        Assert.True(redactionCount >= 3, $"Expected at least 3 redactions, got {redactionCount}");
    }

    [Fact]
    public void Scrub_MixedContentWithSecrets_PreservesNonSecretContent()
    {
        var input = "User prompt: Generate code for api_key=sk_test_secret123456789 endpoint";
        var result = SensitiveDataScrubber.Scrub(input);

        Assert.Contains("User prompt:", result);
        Assert.Contains("Generate code for", result);
        Assert.Contains("endpoint", result);
        Assert.Contains("[REDACTED]", result);
    }

    [Theory]
    [InlineData("The commit SHA is abc123def456")] // Short hex, not a key
    [InlineData("File hash: abcd1234")] // Short hash
    [InlineData("Hello world!")] // Normal text
    public void Scrub_NonSecretPatterns_AreNotRedacted(string input)
    {
        var result = SensitiveDataScrubber.Scrub(input);
        Assert.Equal(input, result);
    }
}
