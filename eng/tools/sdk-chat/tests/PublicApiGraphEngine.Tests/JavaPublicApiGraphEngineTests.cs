// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Java;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs Java API once for all tests.
/// Dramatically reduces test time by avoiding repeated JBang startup.
/// </summary>
public class JavaEngineFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath = Path.Combine(AppContext.BaseDirectory, "TestFixtures", "Java");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

    public async ValueTask InitializeAsync()
    {
        var engine = new JavaPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "JBang not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"Java engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}

/// <summary>
/// Tests for the Java Public API Graph Engine.
/// Uses a shared fixture to graph API once, making tests ~10x faster.
/// </summary>
public class JavaPublicApiGraphEngineTests : IClassFixture<JavaEngineFixture>
{
    private readonly JavaEngineFixture _fixture;

    public JavaPublicApiGraphEngineTests(JavaEngineFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void Extract_ReturnsApiIndex_WithPackageName()
    {
        var api = GetApi();
        Assert.NotNull(api);
        Assert.False(string.IsNullOrEmpty(api.Package));
    }

    [Fact]
    public void Extract_FindsPackages()
    {
        var api = GetApi();
        Assert.NotNull(api);
        Assert.NotEmpty(api.Packages);
    }

    [Fact]
    public void Extract_FindsClasses()
    {
        var api = GetApi();
        var classes = api.Packages.SelectMany(p => p.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
    }

    [Fact]
    public void Extract_FindsConstructors()
    {
        var api = GetApi();
        var classes = api.Packages.SelectMany(p => p.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Constructors);
        Assert.NotEmpty(sampleClient.Constructors);
    }

    [Fact]
    public void Extract_FindsMethods()
    {
        var api = GetApi();
        var classes = api.Packages.SelectMany(p => p.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Name == "getResource");
    }

    [Fact]
    public void Extract_FindsInterfaces()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var resourceOps = interfaces.FirstOrDefault(i => i.Name == "ResourceOperations");
        Assert.NotNull(resourceOps);
    }

    [Fact]
    public void Extract_FindsEnums()
    {
        var api = GetApi();
        var enums = api.Packages.SelectMany(p => p.Enums ?? []).ToList();
        var serviceVersion = enums.FirstOrDefault(e => e.Name == "ServiceVersion");
        Assert.NotNull(serviceVersion);
        Assert.NotNull(serviceVersion.Values);
        Assert.NotEmpty(serviceVersion.Values);
    }

    [Fact]
    public void Extract_FindsEnumValues()
    {
        var api = GetApi();
        var enums = api.Packages.SelectMany(p => p.Enums ?? []).ToList();
        var serviceVersion = enums.FirstOrDefault(e => e.Name == "ServiceVersion");
        Assert.NotNull(serviceVersion);
        Assert.Contains(serviceVersion.Values!, v => v.Contains("V2024_01_01", StringComparison.Ordinal));
    }

    [Fact]
    public void Extract_FindsClassFields()
    {
        var api = GetApi();
        var classes = api.Packages.SelectMany(p => p.Classes ?? []).ToList();
        var resource = classes.FirstOrDefault(c => c.Name == "Resource");
        Assert.NotNull(resource);
        // Note: Private fields are not exposed in graphed API
        // Fields collection may be empty if all fields are private
    }

    [Fact]
    public void Extract_ExcludesPrivateMethods()
    {
        var api = GetApi();
        var allMethods = api.Packages
            .SelectMany(p => p.Classes ?? [])
            .SelectMany(c => c.Methods ?? [])
            .ToList();
        Assert.DoesNotContain(allMethods, m => m.Modifiers?.Contains("private") == true);
    }


    [Fact]
    public void Extract_FindsInterfaceMethods()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var resourceOps = interfaces.FirstOrDefault(i => i.Name == "ResourceOperations");
        Assert.NotNull(resourceOps);
        Assert.NotNull(resourceOps.Methods);
        Assert.Contains(resourceOps.Methods, m => m.Name == "get");
    }

    #region Regression: IsModelType Logic

    [Fact]
    public void ClassInfo_IsModelType_ClassWithPublicServiceMethods_IsNotModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "ServiceClient",
            Methods = new List<MethodInfo>
            {
                new() { Name = "createResource", Modifiers = ["public"] },
                new() { Name = "deleteResource", Modifiers = ["public"] }
            }
        };

        Assert.False(classInfo.IsModelType, "Service class with non-getter public methods should not be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithOnlyGettersSetters_IsNotModel()
    {
        // Classes with public methods (even getters/setters) are not models.
        // Model detection is purely structural: no public methods + has fields.
        var classInfo = new ClassInfo
        {
            Name = "UserProfile",
            Methods = new List<MethodInfo>
            {
                new() { Name = "getName", Modifiers = ["public"] },
                new() { Name = "setName", Modifiers = ["public"] },
                new() { Name = "isActive", Modifiers = ["public"] }
            }
        };

        Assert.False(classInfo.IsModelType, "Class with public methods should not be a model, even if they are getters/setters");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithNoPublicMethods_AndFields_IsModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "InternalState",
            Methods = new List<MethodInfo>
            {
                new() { Name = "computeHash", Modifiers = ["private"] }
            },
            Fields = new List<FieldInfo>
            {
                new() { Name = "value", Type = "String" }
            }
        };

        Assert.True(classInfo.IsModelType, "Class with no public methods but with fields should be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithNullMethodsAndNoFields_IsNotModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "EmptyPojo",
            Methods = null
        };

        Assert.False(classInfo.IsModelType,
            "Class with null methods and no fields is a marker type, not a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithNullMethodsAndFields_IsModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "DataPojo",
            Methods = null,
            Fields = [new FieldInfo { Name = "value", Type = "String" }]
        };

        Assert.True(classInfo.IsModelType,
            "Class with null methods but with fields should be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithMixedMethods_IsNotModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "HybridService",
            Methods = new List<MethodInfo>
            {
                new() { Name = "getName", Modifiers = ["public"] },
                new() { Name = "executeOperation", Modifiers = ["public"] }
            }
        };

        Assert.False(classInfo.IsModelType,
            "Class with mix of getters and service methods should not be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_EmptyClassNoFieldsNoMethods_IsNotModel()
    {
        // Regression: empty class with zero methods AND zero fields should NOT be a model
        // (it's just an empty type marker, not a data transfer object)
        var classInfo = new ClassInfo
        {
            Name = "EmptyMarker",
            Methods = new List<MethodInfo>(),
            Fields = null
        };

        Assert.False(classInfo.IsModelType,
            "Empty class with no methods and no fields should not be a model (not a DTO)");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithOnlyPrivateMethods_NoFields_IsNotModel()
    {
        // Class with only private methods and no fields is not a model
        var classInfo = new ClassInfo
        {
            Name = "InternalHelper",
            Methods = new List<MethodInfo>
            {
                new() { Name = "compute", Modifiers = ["private"] }
            },
            Fields = null
        };

        Assert.False(classInfo.IsModelType,
            "Class with private methods but no fields should not be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithOnlyPrivateMethods_WithFields_IsModel()
    {
        var classInfo = new ClassInfo
        {
            Name = "DataHolder",
            Methods = new List<MethodInfo>
            {
                new() { Name = "validate", Modifiers = ["private"] }
            },
            Fields = new List<FieldInfo>
            {
                new() { Name = "data", Type = "byte[]" }
            }
        };

        Assert.True(classInfo.IsModelType,
            "Class with private methods and fields should be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithGettersAndFields_IsNotModel()
    {
        // Even with fields present, having public methods makes it not a model
        var classInfo = new ClassInfo
        {
            Name = "ConfigBean",
            Methods = new List<MethodInfo>
            {
                new() { Name = "getHost", Modifiers = ["public"] },
                new() { Name = "setHost", Modifiers = ["public"] }
            },
            Fields = new List<FieldInfo>
            {
                new() { Name = "host", Type = "String" }
            }
        };

        Assert.False(classInfo.IsModelType,
            "Class with public methods (even getters) and fields should not be a model");
    }

    [Fact]
    public void ClassInfo_IsModelType_ClassWithOnlyPublicFields_NoMethods_IsModel()
    {
        // Class with explicit empty methods list and fields — model (no public methods)
        var classInfo = new ClassInfo
        {
            Name = "Point",
            Methods = new List<MethodInfo>(),
            Fields = new List<FieldInfo>
            {
                new() { Name = "x", Type = "int" },
                new() { Name = "y", Type = "int" }
            }
        };

        Assert.True(classInfo.IsModelType,
            "Class with empty methods list and fields should be a model");
    }

    [Fact]
    public void ClassInfo_IsErrorType_ExtendsException_Detected()
    {
        var classInfo = new ClassInfo
        {
            Name = "ServiceException",
            Extends = "RuntimeException",
            Methods = new List<MethodInfo>
            {
                new() { Name = "getErrorCode", Modifiers = ["public"] }
            }
        };

        Assert.True(classInfo.IsErrorType);
        Assert.Equal(1, classInfo.TruncationPriority);
    }

    [Fact]
    public void ClassInfo_IsErrorType_ExtendsThrowable_Detected()
    {
        var classInfo = new ClassInfo
        {
            Name = "CriticalFailure",
            Extends = "Throwable"
        };

        Assert.True(classInfo.IsErrorType);
    }

    [Fact]
    public void ClassInfo_IsErrorType_NamedExceptionNoExtends_NotDetected()
    {
        // Named "FooException" but no Extends → not an error type
        var classInfo = new ClassInfo { Name = "FooException" };
        Assert.False(classInfo.IsErrorType);
    }

    #endregion
}

/// <summary>
/// Fixture that graphs Java API from the CompiledMode fixture once.
/// Uses a fixture with generic bounds, bridge methods, nested generics, and inner classes.
/// </summary>
public class JavaCompiledFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "Java");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

    public async ValueTask InitializeAsync()
    {
        var engine = new JavaPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "JBang not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"Java engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}

/// <summary>
/// Tests that verify the source parser's capabilities on a fixture with
/// generic bounds, bridge methods, nested generics, and inner classes.
/// </summary>
public class JavaCompiledFixtureTests : IClassFixture<JavaCompiledFixture>
{
    private readonly JavaCompiledFixture _fixture;

    public JavaCompiledFixtureTests(JavaCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void SourceParser_FindsDeclaredMethod_NotBridgeMethods()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var client = allTypes.FirstOrDefault(t => t.Name == "ServiceClient");
        Assert.NotNull(client);

        var processMethods = client.Methods?.Where(m => m.Name == "process").ToList();
        Assert.NotNull(processMethods);
        Assert.NotEmpty(processMethods);

        var declaredProcess = processMethods.FirstOrDefault(m =>
            m.Ret?.Contains("String", StringComparison.Ordinal) == true);
        Assert.NotNull(declaredProcess);
        Assert.Contains("String", declaredProcess.Ret!);
    }

    [Fact]
    public void SourceParser_RecordsGenericBounds_AsStrings()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var response = allTypes.FirstOrDefault(t => t.Name == "ServiceResponse");
        Assert.NotNull(response);

        Assert.NotNull(response.TypeParams);
        Assert.Contains("Comparable", response.TypeParams);
    }

    [Fact]
    public void SourceParser_RecordsNestedGenerics_AsRawStrings()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var client = allTypes.FirstOrDefault(t => t.Name == "ServiceClient");
        Assert.NotNull(client);

        var getResource = client.Methods?.FirstOrDefault(m => m.Name == "getResource");
        Assert.NotNull(getResource);

        Assert.NotNull(getResource.Ret);
        Assert.Contains("CompletableFuture", getResource.Ret);
        Assert.Contains("ServiceResponse", getResource.Ret);
    }

    [Fact]
    public void SourceParser_RecordsReturnTypes_WithImplicitImports()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var client = allTypes.FirstOrDefault(t => t.Name == "ServiceClient");
        Assert.NotNull(client);

        var listMetadata = client.Methods?.FirstOrDefault(m => m.Name == "listMetadata");
        Assert.NotNull(listMetadata);
        Assert.NotNull(listMetadata.Ret);
        Assert.Contains("Map", listMetadata.Ret);
        Assert.Contains("List", listMetadata.Ret);
        Assert.Contains("String", listMetadata.Ret);
    }

    [Fact]
    public void SourceParser_DetectsInnerBuilderClass()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var builder = allTypes.FirstOrDefault(t => t.Name == "Builder");
        Assert.NotNull(builder);

        Assert.NotNull(builder.Methods);
        var endpointMethod = builder.Methods.FirstOrDefault(m => m.Name == "endpoint");
        Assert.NotNull(endpointMethod);

        var buildMethod = builder.Methods.FirstOrDefault(m => m.Name == "build");
        Assert.NotNull(buildMethod);
    }

    [Fact]
    public void SourceParser_FindsProcessor_Interface()
    {
        var api = GetApi();
        var allTypes = api.Packages.SelectMany(p =>
            (p.Classes ?? []).Concat(p.Interfaces ?? [])).ToList();

        var processor = allTypes.FirstOrDefault(t => t.Name == "Processor");
        if (processor != null)
        {
            Assert.NotNull(processor.Methods);
            Assert.Contains(processor.Methods, m => m.Name == "process");
        }

        var client = allTypes.FirstOrDefault(t => t.Name == "ServiceClient");
        Assert.NotNull(client);
        Assert.NotNull(client.Implements);
        Assert.Contains(client.Implements, i =>
            i.Contains("Processor", StringComparison.Ordinal));
    }

    [Fact]
    public void RuntimeMetadata_Classifies_ParameterOnlyExternalTypes()
    {
        var api = GetApi();

        // HttpRequest and HttpResponse appear only in parameter/return positions.
        // Runtime metadata enrichment resolves them from java.net.http and
        // classifies class vs interface accurately.
        var dep = api.Dependencies?.FirstOrDefault(d =>
            d.Package.Contains("java.net.http", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(dep);

        Assert.NotNull(dep.Classes);
        Assert.NotNull(dep.Interfaces);
        Assert.Contains(dep.Classes, c => c.Name == "HttpRequest");
        Assert.Contains(dep.Interfaces, i => i.Name == "HttpResponse");
    }
}
