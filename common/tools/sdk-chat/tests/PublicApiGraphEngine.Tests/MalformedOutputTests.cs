// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests that engines/models handle malformed, empty, or truncated output gracefully.
/// No external runtimes required — exercises deserialization and model edge cases.
/// </summary>
public class MalformedOutputTests
{
    #region Empty/Null Deserialization

    [Fact]
    public void GoApiIndex_Deserialize_EmptyString_ReturnsNull()
    {
        var result = JsonSerializer.Deserialize("null", Go.SourceGenerationContext.Default.ApiIndex);
        Assert.Null(result);
    }

    [Fact]
    public void JavaApiIndex_Deserialize_EmptyString_ReturnsNull()
    {
        var result = JsonSerializer.Deserialize("null", Java.SourceGenerationContext.Default.ApiIndex);
        Assert.Null(result);
    }

    [Fact]
    public void TypeScriptApiIndex_Deserialize_EmptyString_ReturnsNull()
    {
        var result = JsonSerializer.Deserialize("null", TypeScript.SourceGenerationContext.Default.ApiIndex);
        Assert.Null(result);
    }

    [Fact]
    public void PythonApiIndex_Deserialize_EmptyString_ReturnsNull()
    {
        var result = JsonSerializer.Deserialize("null", Python.ApiIndexContext.Default.ApiIndex);
        Assert.Null(result);
    }

    #endregion

    #region Truncated JSON

    [Fact]
    public void GoApiIndex_Deserialize_TruncatedJson_Throws()
    {
        Assert.Throws<JsonException>(() =>
            JsonSerializer.Deserialize("{\"package\":\"test\",\"packages\":[{\"name\":", Go.SourceGenerationContext.Default.ApiIndex));
    }

    [Fact]
    public void JavaApiIndex_Deserialize_TruncatedJson_Throws()
    {
        Assert.Throws<JsonException>(() =>
            JsonSerializer.Deserialize("{\"package\":\"test\",\"packages\":[{\"name\":", Java.SourceGenerationContext.Default.ApiIndex));
    }

    [Fact]
    public void TypeScriptApiIndex_Deserialize_TruncatedJson_Throws()
    {
        Assert.Throws<JsonException>(() =>
            JsonSerializer.Deserialize("{\"package\":\"test\",\"modules\":[{\"name\":", TypeScript.SourceGenerationContext.Default.ApiIndex));
    }

    #endregion

    #region Non-JSON Output

    [Theory]
    [InlineData("not json at all")]
    [InlineData("<html>error page</html>")]
    [InlineData("Error: something went wrong")]
    public void GoApiIndex_Deserialize_NonJson_Throws(string input)
    {
        Assert.Throws<JsonException>(() =>
            JsonSerializer.Deserialize(input, Go.SourceGenerationContext.Default.ApiIndex));
    }

    [Theory]
    [InlineData("not json at all")]
    [InlineData("<html>error page</html>")]
    [InlineData("Error: something went wrong")]
    public void TypeScriptApiIndex_Deserialize_NonJson_Throws(string input)
    {
        Assert.Throws<JsonException>(() =>
            JsonSerializer.Deserialize(input, TypeScript.SourceGenerationContext.Default.ApiIndex));
    }

    #endregion

    #region Minimal Valid JSON

    [Fact]
    public void GoApiIndex_Deserialize_MinimalJson_Succeeds()
    {
        var result = JsonSerializer.Deserialize("{}", Go.SourceGenerationContext.Default.ApiIndex);
        Assert.NotNull(result);
        Assert.True(string.IsNullOrEmpty(result.Package));
        Assert.Null(result.Packages);
    }

    [Fact]
    public void JavaApiIndex_Deserialize_MinimalJson_Succeeds()
    {
        var result = JsonSerializer.Deserialize("{}", Java.SourceGenerationContext.Default.ApiIndex);
        Assert.NotNull(result);
        Assert.True(string.IsNullOrEmpty(result.Package));
        Assert.Null(result.Packages);
    }

    [Fact]
    public void TypeScriptApiIndex_Deserialize_MinimalJson_Succeeds()
    {
        var result = JsonSerializer.Deserialize("{}", TypeScript.SourceGenerationContext.Default.ApiIndex);
        Assert.NotNull(result);
        Assert.True(string.IsNullOrEmpty(result.Package));
        Assert.Null(result.Modules);
    }

    #endregion

    #region Model Operations on Edge-Case Data

    [Fact]
    public void GoApiIndex_GetAllStructs_NullPackages_ReturnsEmpty()
    {
        var index = new Go.ApiIndex { Package = "test" };
        Assert.Empty(index.GetAllStructs());
        Assert.Empty(index.GetClientStructs());
    }

    [Fact]
    public void GoApiIndex_GetAllStructs_EmptyPackages_ReturnsEmpty()
    {
        var index = new Go.ApiIndex { Package = "test", Packages = [] };
        Assert.Empty(index.GetAllStructs());
    }

    [Fact]
    public void JavaApiIndex_GetAllTypes_NullPackages_ReturnsEmpty()
    {
        var index = new Java.ApiIndex { Package = "test" };
        Assert.Empty(index.GetAllTypes());
        Assert.Empty(index.GetClientClasses());
    }

    [Fact]
    public void TypeScriptApiIndex_GetAllClasses_NullModules_ReturnsEmpty()
    {
        var index = new TypeScript.ApiIndex { Package = "test" };
        Assert.Empty(index.GetAllClasses());
        Assert.Empty(index.GetClientClasses());
    }

    [Fact]
    public void PythonApiIndex_EmptyModules_ReturnsEmpty()
    {
        var index = new Python.ApiIndex("test", [], null);
        Assert.Empty(index.GetAllClasses());
        Assert.Empty(index.GetClientClasses());
    }

    [Fact]
    public void DotNetApiIndex_EmptyNamespaces_ReturnsEmpty()
    {
        var index = new DotNet.ApiIndex { Package = "test", Namespaces = [] };
        Assert.Empty(index.GetAllTypes());
        Assert.Empty(index.GetClientTypes());
    }

    #endregion

    #region Formatter Resilience

    [Fact]
    public void GoFormatter_Format_NullPackages_DoesNotThrow()
    {
        var index = new Go.ApiIndex { Package = "test" };
        var result = Go.GoFormatter.Format(index);
        Assert.Contains("test", result);
    }

    [Fact]
    public void GoFormatter_Format_EmptyStructs_DoesNotThrow()
    {
        var index = new Go.ApiIndex
        {
            Package = "test",
            Packages = [new Go.PackageApi { Name = "pkg" }]
        };
        var result = Go.GoFormatter.Format(index);
        Assert.NotNull(result);
    }

    [Fact]
    public void JavaFormatter_Format_EmptyPackages_DoesNotThrow()
    {
        var index = new Java.ApiIndex { Package = "test" };
        var result = Java.JavaFormatter.Format(index);
        Assert.Contains("test", result);
    }

    [Fact]
    public void TypeScriptFormatter_Format_NullModules_DoesNotThrow()
    {
        var index = new TypeScript.ApiIndex { Package = "test" };
        var result = TypeScript.TypeScriptFormatter.Format(index);
        Assert.Contains("test", result);
    }

    [Fact]
    public void PythonFormatter_Format_EmptyModules_DoesNotThrow()
    {
        var index = new Python.ApiIndex("test", [], null);
        var result = Python.PythonFormatter.Format(index);
        Assert.NotNull(result);
    }

    [Fact]
    public void CSharpFormatter_Format_EmptyNamespaces_DoesNotThrow()
    {
        var index = new DotNet.ApiIndex { Package = "test", Namespaces = [] };
        var result = DotNet.CSharpFormatter.Format(index);
        Assert.Contains("test", result);
    }

    #endregion

    #region EngineResult Patterns

    [Fact]
    public void EngineResult_Failure_ContainsError()
    {
        var result = new EngineResult.Failure("Something went wrong");
        Assert.False(result.IsSuccess);
        Assert.Contains("Something went wrong", result.Error);
    }

    [Fact]
    public void EngineResult_Success_IsSuccess()
    {
        var index = new DotNet.ApiIndex { Package = "test", Namespaces = [] };
        var result = new EngineResult.Success(index);
        Assert.True(result.IsSuccess);
    }

    #endregion

    #region CollectReferencedTypes Edge Cases

    [Fact]
    public void GoIfaceApi_CollectReferencedTypes_NullMethods_ReturnsEmpty()
    {
        var iface = new Go.IfaceApi { Name = "TestIface" };
        var allTypeNames = new HashSet<string>(["TestIface", "Other"]);
        var result = new HashSet<string>();
        iface.CollectReferencedTypes(allTypeNames, result);
        Assert.Empty(result);
    }

    [Fact]
    public void GoIfaceApi_CollectReferencedTypes_FindsEmbed()
    {
        var iface = new Go.IfaceApi
        {
            Name = "TestIface",
            Embeds = ["OtherIface"],
            Methods = [new Go.FuncApi { Name = "Get", Sig = "ctx context.Context", Ret = "Result" }]
        };
        var allTypeNames = new HashSet<string>(["TestIface", "OtherIface", "Result"]);
        var result = new HashSet<string>();
        iface.CollectReferencedTypes(allTypeNames, result);
        Assert.Contains("OtherIface", result);
        Assert.Contains("Result", result);
    }

    [Fact]
    public void TypeScriptTypeAliasInfo_CollectReferencedTypes_TokenizesType()
    {
        var typeAlias = new TypeScript.TypeAliasInfo
        {
            Name = "InputType",
            Type = "string | MyEnum | OtherType",
            ReferencedTypes = ["MyEnum", "OtherType"]
        };
        var allTypeNames = new HashSet<string>(["MyEnum", "OtherType", "InputType"]);
        var result = new HashSet<string>();
        typeAlias.CollectReferencedTypes(allTypeNames, result);
        Assert.Contains("MyEnum", result);
        Assert.Contains("OtherType", result);
        Assert.DoesNotContain("string", result); // built-in, not in allTypeNames
    }

    #endregion
}
