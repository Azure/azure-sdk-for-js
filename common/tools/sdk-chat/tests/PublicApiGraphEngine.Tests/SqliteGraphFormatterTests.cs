// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Data.Sqlite;
using Microsoft.SdkChat.Services;
using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for <see cref="SqliteGraphFormatter"/>.
/// Uses a simple <see cref="FakeApiIndex"/> that implements <see cref="IApiIndex"/>
/// to verify schema creation, data population, and edge extraction.
/// </summary>
public sealed class SqliteGraphFormatterTests : IDisposable
{
    private readonly string _dbPath;

    public SqliteGraphFormatterTests()
    {
        _dbPath = Path.Combine(Path.GetTempPath(), $"sqlite_graph_test_{Guid.NewGuid():N}.db");
    }

    public void Dispose()
    {
        if (File.Exists(_dbPath))
            File.Delete(_dbPath);
    }

    [Fact]
    public void Schema_CreatesAllTables()
    {
        var index = new FakeApiIndex("TestPackage");
        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var tables = GetTableNames(conn);

        Assert.Contains("package", tables);
        Assert.Contains("types", tables);
        Assert.Contains("members", tables);
        Assert.Contains("params", tables);
        Assert.Contains("edges", tables);
        Assert.Contains("dependencies", tables);
        Assert.Contains("diagnostics", tables);
    }

    [Fact]
    public void Package_IsPopulated()
    {
        var index = new FakeApiIndex("MySDK") { CrossLangId = "my-cross-id" };
        SqliteGraphFormatter.Write(index, _dbPath, "dotnet");

        using var conn = OpenRead();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT name, language, cross_language_id FROM package";
        using var reader = cmd.ExecuteReader();

        Assert.True(reader.Read());
        Assert.Equal("MySDK", reader.GetString(0));
        Assert.Equal("dotnet", reader.GetString(1));
        Assert.Equal("my-cross-id", reader.GetString(2));
    }

    [Fact]
    public void Types_ArePopulated()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "BlobClient",
                Doc = "A blob client",
                EntryPoint = true,
                Callables = [new DiagnosticCallableInfo { Name = "BlobClient" }],
            },
            new DiagnosticTypeInfo
            {
                Name = "IBlobOptions",
                Callables = [new DiagnosticCallableInfo { Name = "GetUrl" }],
            },
            new DiagnosticTypeInfo
            {
                Name = "AccessTier",
            },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var typeCount = ScalarInt(conn, "SELECT COUNT(*) FROM types WHERE source = 'local'");
        Assert.Equal(3, typeCount);

        // Verify type kinds
        Assert.Equal("class", ScalarText(conn, "SELECT kind FROM types WHERE name = 'BlobClient'"));
        Assert.Equal("interface", ScalarText(conn, "SELECT kind FROM types WHERE name = 'IBlobOptions'"));
        Assert.Equal("enum", ScalarText(conn, "SELECT kind FROM types WHERE name = 'AccessTier'"));

        // Verify entry point
        Assert.Equal(1, ScalarInt(conn, "SELECT entry_point FROM types WHERE name = 'BlobClient'"));
        Assert.Equal(0, ScalarInt(conn, "SELECT entry_point FROM types WHERE name = 'IBlobOptions'"));
    }

    [Fact]
    public void Members_ArePopulated()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "Client",
                Callables =
                [
                    new DiagnosticCallableInfo { Name = "Client", ReturnType = "Client" },
                    new DiagnosticCallableInfo { Name = "Send", ReturnType = "Response", ParameterTypes = ["Request"] },
                ],
                Properties =
                [
                    new DiagnosticPropertyInfo { Name = "Endpoint", TypeName = "string" },
                ],
            },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var memberCount = ScalarInt(conn, "SELECT COUNT(*) FROM members");
        Assert.Equal(3, memberCount);

        // Constructor
        Assert.Equal("constructor", ScalarText(conn, "SELECT kind FROM members WHERE name = 'Client'"));
        // Method
        Assert.Equal("method", ScalarText(conn, "SELECT kind FROM members WHERE name = 'Send'"));
        // Property
        Assert.Equal("property", ScalarText(conn, "SELECT kind FROM members WHERE name = 'Endpoint'"));
    }

    [Fact]
    public void Params_ArePopulated()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "Svc",
                Callables =
                [
                    new DiagnosticCallableInfo
                    {
                        Name = "DoWork",
                        ParameterTypes = ["Config", "string", "Options"],
                        OptionalParameterCount = 1,
                    },
                ],
            },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var paramCount = ScalarInt(conn, "SELECT COUNT(*) FROM params");
        Assert.Equal(3, paramCount);

        // First two required, last optional
        Assert.Equal(0, ScalarInt(conn, "SELECT optional FROM params WHERE position = 0"));
        Assert.Equal(0, ScalarInt(conn, "SELECT optional FROM params WHERE position = 1"));
        Assert.Equal(1, ScalarInt(conn, "SELECT optional FROM params WHERE position = 2"));
    }

    [Fact]
    public void Edges_AreExtracted()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "Svc",
                Callables =
                [
                    new DiagnosticCallableInfo
                    {
                        Name = "Create",
                        ParameterTypes = ["Config"],
                        ReturnType = "Resource",
                    },
                ],
                Properties =
                [
                    new DiagnosticPropertyInfo { Name = "Options", TypeName = "SvcOptions" },
                ],
            },
            new DiagnosticTypeInfo { Name = "Config" },
            new DiagnosticTypeInfo { Name = "Resource" },
            new DiagnosticTypeInfo { Name = "SvcOptions" },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();

        // Parameter edge: Svc → Config
        Assert.True(EdgeExists(conn, "Svc", "Config", "parameter"));
        // Return edge: Svc → Resource
        Assert.True(EdgeExists(conn, "Svc", "Resource", "return"));
        // Property edge: Svc → SvcOptions
        Assert.True(EdgeExists(conn, "Svc", "SvcOptions", "property"));
    }

    [Fact]
    public void Primitives_AreNotEdgeTargets()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "Svc",
                Callables =
                [
                    new DiagnosticCallableInfo
                    {
                        Name = "GetName",
                        ReturnType = "string",
                        ParameterTypes = ["number"],
                    },
                ],
            },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var edgeCount = ScalarInt(conn, "SELECT COUNT(*) FROM edges");
        Assert.Equal(0, edgeCount);
    }

    [Fact]
    public void Diagnostics_ArePopulated()
    {
        var index = new FakeApiIndex("Pkg")
        {
            FakeDiagnostics =
            [
                new ApiDiagnostic
                {
                    Id = "SDK001",
                    Level = DiagnosticLevel.Warning,
                    Text = "Missing docs",
                    TargetType = "Svc",
                },
                new ApiDiagnostic
                {
                    Id = "SDK002",
                    Level = DiagnosticLevel.Error,
                    Text = "Breaking change",
                },
            ],
        };

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        var diagCount = ScalarInt(conn, "SELECT COUNT(*) FROM diagnostics");
        Assert.Equal(2, diagCount);

        Assert.Equal("warning", ScalarText(conn, "SELECT level FROM diagnostics WHERE id = 'SDK001'"));
        Assert.Equal("error", ScalarText(conn, "SELECT level FROM diagnostics WHERE id = 'SDK002'"));
    }

    [Fact]
    public void ImpactQuery_WorksWithRecursiveCTE()
    {
        // A → B via parameter, B → C via return
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "A",
                Callables = [new DiagnosticCallableInfo { Name = "Use", ParameterTypes = ["B"] }],
            },
            new DiagnosticTypeInfo
            {
                Name = "B",
                Callables = [new DiagnosticCallableInfo { Name = "Get", ReturnType = "C" }],
            },
            new DiagnosticTypeInfo { Name = "C" },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();

        // Recursive CTE: find all types reachable from A
        using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            WITH RECURSIVE reachable(id) AS (
                SELECT 'A'
                UNION
                SELECT e.dst FROM edges e JOIN reachable r ON e.src = r.id
            )
            SELECT id FROM reachable ORDER BY id
            """;
        var reachable = new List<string>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
            reachable.Add(reader.GetString(0));

        Assert.Contains("A", reachable);
        Assert.Contains("B", reachable);
        Assert.Contains("C", reachable);
    }

    [Fact]
    public void ReachabilityQuery_FromEntryPoints()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "EntryClient",
                EntryPoint = true,
                Callables = [new DiagnosticCallableInfo { Name = "EntryClient" }, new DiagnosticCallableInfo { Name = "Run", ReturnType = "Result" }],
            },
            new DiagnosticTypeInfo { Name = "Result" },
            new DiagnosticTypeInfo { Name = "Unrelated" },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();

        // BFS from entry points
        using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            WITH RECURSIVE reachable(id) AS (
                SELECT t.id FROM types t WHERE t.entry_point = 1
                UNION
                SELECT e.dst FROM edges e JOIN reachable r ON e.src = r.id
            )
            SELECT id FROM reachable ORDER BY id
            """;
        var reachable = new List<string>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
            reachable.Add(reader.GetString(0));

        Assert.Contains("EntryClient", reachable);
        Assert.Contains("Result", reachable);
        Assert.DoesNotContain("Unrelated", reachable);
    }

    [Fact]
    public void ExtractTypeReferences_HandlesGenericTypes()
    {
        var refs = SqliteGraphFormatter.ExtractTypeReferences("Promise<Resource>").ToList();
        Assert.Contains("Resource", refs);
        Assert.DoesNotContain("Promise", refs);
    }

    [Fact]
    public void ExtractTypeReferences_HandlesUnionTypes()
    {
        var refs = SqliteGraphFormatter.ExtractTypeReferences("string | Resource | null").ToList();
        Assert.Single(refs);
        Assert.Contains("Resource", refs);
    }

    [Fact]
    public void ExtractTypeReferences_HandlesComplexTypes()
    {
        var refs = SqliteGraphFormatter.ExtractTypeReferences("Map<string, List<Widget>>").ToList();
        Assert.Contains("List", refs);
        Assert.Contains("Widget", refs);
        Assert.DoesNotContain("Map", refs);
        Assert.DoesNotContain("string", refs);
    }

    [Fact]
    public void OverwritesExistingFile()
    {
        var index = new FakeApiIndex("V1");
        SqliteGraphFormatter.Write(index, _dbPath);

        var index2 = new FakeApiIndex("V2");
        SqliteGraphFormatter.Write(index2, _dbPath);

        using var conn = OpenRead();
        Assert.Equal("V2", ScalarText(conn, "SELECT name FROM package"));
    }

    [Fact]
    public void ExternalTypes_MarkedCorrectly()
    {
        var index = new FakeApiIndex("Pkg", [
            new DiagnosticTypeInfo
            {
                Name = "Svc",
                Callables =
                [
                    new DiagnosticCallableInfo
                    {
                        Name = "Do",
                        ParameterTypes = ["ExternalWidget"],
                    },
                ],
            },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();
        Assert.Equal("external", ScalarText(conn, "SELECT source FROM types WHERE name = 'ExternalWidget'"));
        Assert.Equal("local", ScalarText(conn, "SELECT source FROM types WHERE name = 'Svc'"));
    }

    [Fact]
    public void TopLevelCallables_CreateModuleType()
    {
        var index = new FakeApiIndex("Pkg", topLevelCallables:
        [
            new DiagnosticCallableInfo { Name = "createClient", ReturnType = "Client", ParameterTypes = ["Options"] },
        ], types:
        [
            new DiagnosticTypeInfo { Name = "Client" },
            new DiagnosticTypeInfo { Name = "Options" },
        ]);

        SqliteGraphFormatter.Write(index, _dbPath);

        using var conn = OpenRead();

        // Module type should exist
        Assert.True(ScalarInt(conn, "SELECT COUNT(*) FROM types WHERE name = '__module__'") > 0);

        // Member under module type
        Assert.Equal("method", ScalarText(conn, "SELECT kind FROM members WHERE name = 'createClient'"));

        // Edges from module
        Assert.True(EdgeExists(conn, "__module__", "Client", "return"));
        Assert.True(EdgeExists(conn, "__module__", "Options", "parameter"));
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private SqliteConnection OpenRead()
    {
        var conn = new SqliteConnection($"Data Source={_dbPath};Mode=ReadOnly");
        conn.Open();
        return conn;
    }

    private static List<string> GetTableNames(SqliteConnection conn)
    {
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name";
        var tables = new List<string>();
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
            tables.Add(reader.GetString(0));
        return tables;
    }

    private static int ScalarInt(SqliteConnection conn, string sql)
    {
        using var cmd = conn.CreateCommand();
        cmd.CommandText = sql;
        return Convert.ToInt32(cmd.ExecuteScalar());
    }

    private static string ScalarText(SqliteConnection conn, string sql)
    {
        using var cmd = conn.CreateCommand();
        cmd.CommandText = sql;
        return cmd.ExecuteScalar()?.ToString() ?? "";
    }

    private static bool EdgeExists(SqliteConnection conn, string src, string dst, string kind)
    {
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT COUNT(*) FROM edges WHERE src = @s AND dst = @d AND kind = @k";
        cmd.Parameters.AddWithValue("@s", src);
        cmd.Parameters.AddWithValue("@d", dst);
        cmd.Parameters.AddWithValue("@k", kind);
        return Convert.ToInt32(cmd.ExecuteScalar()) > 0;
    }

    // ── Fake IApiIndex ──────────────────────────────────────────────────

    private sealed class FakeApiIndex : IApiIndex
    {
        private readonly List<DiagnosticTypeInfo> _types;
        private readonly List<DiagnosticCallableInfo> _topLevel;

        public FakeApiIndex(
            string package,
            List<DiagnosticTypeInfo>? types = null,
            List<DiagnosticCallableInfo>? topLevelCallables = null)
        {
            Package = package;
            _types = types ?? [];
            _topLevel = topLevelCallables ?? [];
        }

        public string Package { get; }
        public string? CrossLangId { get; init; }

        string? IApiIndex.CrossLanguagePackageId => CrossLangId;

        public IReadOnlyList<ApiDiagnostic> FakeDiagnostics { get; init; } = [];
        IReadOnlyList<ApiDiagnostic> IApiIndex.Diagnostics => FakeDiagnostics;

        public string ToJson(bool pretty = false) => "{}";
        public string ToStubs() => "";

        public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() => _types;
        public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => _topLevel;
    }
}
