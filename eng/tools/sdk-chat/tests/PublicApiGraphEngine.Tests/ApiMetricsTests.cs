// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class ApiMetricsTests
{
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    private sealed class MockApiIndex : IApiIndex
    {
        private readonly List<DiagnosticTypeInfo> _types;
        private readonly List<DiagnosticCallableInfo> _topLevel;

        public string Package => "test-package";
        public string ToJson(bool pretty = false) => "{}";
        public string ToStubs() => "";

        public MockApiIndex(
            IEnumerable<DiagnosticTypeInfo>? types = null,
            IEnumerable<DiagnosticCallableInfo>? topLevel = null)
        {
            _types = [.. (types ?? [])];
            _topLevel = [.. (topLevel ?? [])];
        }

        public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() => _types;
        public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => _topLevel;
    }

    private static DiagnosticTypeInfo MakeType(
        string name,
        string? doc = null,
        IReadOnlyList<DiagnosticCallableInfo>? callables = null,
        IReadOnlyList<DiagnosticPropertyInfo>? properties = null) =>
        new()
        {
            Name = name,
            Doc = doc,
            Callables = callables ?? [],
            Properties = properties ?? [],
        };

    private static DiagnosticCallableInfo MakeCallable(
        string name,
        string[]? paramTypes = null,
        bool deprecated = false) =>
        new()
        {
            Name = name,
            ParameterTypes = paramTypes ?? [],
            IsDeprecated = deprecated,
        };

    private static DiagnosticPropertyInfo MakeProp(string name, bool deprecated = false) =>
        new() { Name = name, IsDeprecated = deprecated };

    // ---------------------------------------------------------------------------
    // Tests
    // ---------------------------------------------------------------------------

    [Fact]
    public void EmptyIndex_AllZeros()
    {
        var index = new MockApiIndex();
        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(0, metrics.TotalTypes);
        Assert.Equal(0, metrics.TotalCallables);
        Assert.Equal(0, metrics.TotalProperties);
        Assert.Equal(0.0, metrics.AverageCallablesPerType);
        Assert.Equal(0.0, metrics.AveragePropertiesPerType);
        Assert.Equal(0, metrics.MaxParameterCount);
        Assert.Null(metrics.MaxParameterMethod);
        Assert.Equal(0.0, metrics.DocumentationCoverage);
        Assert.Equal(0, metrics.DeprecatedMembers);
        Assert.Equal(0, metrics.TotalOverloads);
    }

    [Fact]
    public void CountsTypes()
    {
        var index = new MockApiIndex([MakeType("A"), MakeType("B"), MakeType("C")]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(3, metrics.TotalTypes);
    }

    [Fact]
    public void CountsCallables()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", callables: [MakeCallable("M1"), MakeCallable("M2")]),
            MakeType("B", callables: [MakeCallable("M3")]),
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(3, metrics.TotalCallables);
    }

    [Fact]
    public void CountsProperties()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", properties: [MakeProp("P1"), MakeProp("P2")]),
            MakeType("B", properties: [MakeProp("P3")]),
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(3, metrics.TotalProperties);
    }

    [Fact]
    public void DocumentationCoverage_MixedDocs()
    {
        // 2 documented, 1 not → 66.7%
        var index = new MockApiIndex(
        [
            MakeType("A", doc: "Documented"),
            MakeType("B", doc: "Also documented"),
            MakeType("C"),   // no doc
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(2, metrics.DocumentedTypes);
        Assert.Equal(1, metrics.UndocumentedTypes);
        Assert.Equal(Math.Round(2.0 / 3 * 100, 1), metrics.DocumentationCoverage);
    }

    [Fact]
    public void MaxParameterCount_FindsMethodWithMostParams()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", callables:
            [
                MakeCallable("Simple", ["string"]),
                MakeCallable("Complex", ["string", "int", "bool", "object"]),
            ]),
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(4, metrics.MaxParameterCount);
        Assert.Equal("Complex", metrics.MaxParameterMethod);
    }

    [Fact]
    public void OverloadDetection_CountsGroupedCallables()
    {
        // Two callables with the same name = 2 overloads
        var index = new MockApiIndex(
        [
            MakeType("A", callables:
            [
                MakeCallable("Create"),
                MakeCallable("Create", ["string"]),
                MakeCallable("Other"),
            ]),
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(2, metrics.TotalOverloads);
    }

    [Fact]
    public void DeprecatedMembers_CountedAcrossCallablesAndProperties()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", callables:
            [
                MakeCallable("OldMethod", deprecated: true),
                MakeCallable("NewMethod"),
            ],
            properties:
            [
                MakeProp("OldProp", deprecated: true),
                MakeProp("GoodProp"),
            ]),
        ]);

        var metrics = ApiMetricsAnalyzer.Compute(index);

        Assert.Equal(2, metrics.DeprecatedMembers);
    }

    [Fact]
    public void FormatTable_Renders_NonEmpty()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", doc: "Documented", callables: [MakeCallable("DoWork", ["string"])]),
        ]);
        var metrics = ApiMetricsAnalyzer.Compute(index);

        var table = ApiMetricsAnalyzer.FormatTable(metrics);

        Assert.NotEmpty(table);
        Assert.Contains("Total Types", table);
        Assert.Contains("Total Methods", table);
        Assert.Contains("Doc Coverage", table);
    }

    [Fact]
    public void FormatTable_ContainsMaxParameterMethodName()
    {
        var index = new MockApiIndex(
        [
            MakeType("A", callables: [MakeCallable("BigMethod", ["a", "b", "c"])]),
        ]);
        var metrics = ApiMetricsAnalyzer.Compute(index);

        var table = ApiMetricsAnalyzer.FormatTable(metrics);

        Assert.Contains("BigMethod", table);
    }
}
