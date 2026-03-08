// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Data.Sqlite;
using PublicApiGraphEngine.Contracts;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Writes an <see cref="IApiIndex"/> as a SQLite graph database.
/// Types become nodes, type references become directed edges.
/// </summary>
public static class SqliteGraphFormatter
{
    private static readonly HashSet<string> Primitives = new(StringComparer.Ordinal)
    {
        "string", "number", "boolean", "void", "undefined", "null",
        "unknown", "any", "never", "object", "bigint", "symbol",
        "true", "false", "int", "float", "double", "long", "byte",
        "char", "bool", "decimal", "Task", "ValueTask",
        "String", "Object", "Boolean", "Integer", "Long", "Double",
        "Void", "Date", "Error", "Promise", "Map", "Set", "Array",
        "Record", "Partial", "Readonly", "Required", "Omit", "Pick",
        "Exclude", "Extract", "NonNullable", "ReturnType", "Parameters",
        "InstanceType", "ConstructorParameters", "Awaited",
        "AsyncIterable", "AsyncIterableIterator", "Iterable", "Iterator",
        "Blob", "ReadableStream", "WritableStream", "AbortSignal", "AbortController",
    };

    /// <summary>
    /// Writes the API index to a SQLite database file.
    /// Creates or overwrites the file at <paramref name="dbPath"/>.
    /// </summary>
    public static void Write(IApiIndex index, string dbPath, string? language = null)
    {
        if (File.Exists(dbPath))
        {
            // Clear any pooled connections before deleting
            SqliteConnection.ClearAllPools();
            File.Delete(dbPath);
        }

        using var connection = new SqliteConnection($"Data Source={dbPath}");
        connection.Open();

        using var transaction = connection.BeginTransaction();

        CreateSchema(connection);

        var types = index.GetDiagnosticTypes().ToList();
        var localTypes = new HashSet<string>(StringComparer.Ordinal);
        foreach (var t in types)
            localTypes.Add(t.Name);

        InsertPackage(connection, index, language);
        InsertTypes(connection, types, localTypes);
        InsertTopLevelCallables(connection, index.GetTopLevelCallables(), localTypes);
        InsertDiagnostics(connection, index.Diagnostics);

        transaction.Commit();
    }

    private static void CreateSchema(SqliteConnection connection)
    {
        using var cmd = connection.CreateCommand();
        cmd.CommandText = """
            CREATE TABLE package (
                name TEXT NOT NULL,
                version TEXT,
                language TEXT,
                cross_language_id TEXT
            );

            CREATE TABLE types (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                kind TEXT NOT NULL,
                module TEXT,
                source TEXT DEFAULT 'local',
                entry_point INTEGER DEFAULT 0,
                doc TEXT,
                deprecated INTEGER DEFAULT 0,
                deprecated_msg TEXT,
                type_params TEXT,
                extends TEXT,
                implements TEXT
            );

            CREATE TABLE members (
                id TEXT PRIMARY KEY,
                type_id TEXT NOT NULL REFERENCES types(id),
                name TEXT NOT NULL,
                kind TEXT NOT NULL,
                sig TEXT,
                return_type TEXT,
                doc TEXT,
                is_static INTEGER DEFAULT 0,
                is_async INTEGER DEFAULT 0,
                is_readonly INTEGER DEFAULT 0,
                is_optional INTEGER DEFAULT 0,
                deprecated INTEGER DEFAULT 0,
                type_params TEXT
            );

            CREATE TABLE params (
                member_id TEXT NOT NULL REFERENCES members(id),
                position INTEGER NOT NULL,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                optional INTEGER DEFAULT 0,
                default_value TEXT,
                PRIMARY KEY (member_id, position)
            );

            CREATE TABLE edges (
                src TEXT NOT NULL,
                dst TEXT NOT NULL,
                kind TEXT NOT NULL,
                member TEXT
            );

            CREATE TABLE dependencies (
                package TEXT NOT NULL,
                is_stdlib INTEGER DEFAULT 0,
                is_node INTEGER DEFAULT 0
            );

            CREATE TABLE diagnostics (
                id TEXT NOT NULL,
                level TEXT NOT NULL,
                text TEXT NOT NULL,
                target_type TEXT,
                target_member TEXT
            );

            CREATE INDEX idx_edges_src ON edges(src);
            CREATE INDEX idx_edges_dst ON edges(dst);
            CREATE INDEX idx_edges_kind ON edges(kind);
            CREATE INDEX idx_types_name ON types(name);
            CREATE INDEX idx_types_kind ON types(kind);
            CREATE INDEX idx_types_module ON types(module);
            CREATE INDEX idx_types_source ON types(source);
            CREATE INDEX idx_members_type ON members(type_id);
            """;
        cmd.ExecuteNonQuery();
    }

    private static void InsertPackage(SqliteConnection connection, IApiIndex index, string? language)
    {
        using var cmd = connection.CreateCommand();
        cmd.CommandText = "INSERT INTO package (name, version, language, cross_language_id) VALUES (@name, @version, @language, @crossId)";
        cmd.Parameters.AddWithValue("@name", index.Package);
        cmd.Parameters.AddWithValue("@version", DBNull.Value);
        cmd.Parameters.AddWithValue("@language", (object?)language ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@crossId", (object?)index.CrossLanguagePackageId ?? DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    private static void InsertTypes(
        SqliteConnection connection,
        List<DiagnosticTypeInfo> types,
        HashSet<string> localTypes)
    {
        using var typeCmd = connection.CreateCommand();
        typeCmd.CommandText = """
            INSERT OR REPLACE INTO types (id, name, kind, source, entry_point, doc, deprecated)
            VALUES (@id, @name, @kind, 'local', @ep, @doc, @dep)
            """;
        var typeId = typeCmd.Parameters.Add("@id", SqliteType.Text);
        var typeName = typeCmd.Parameters.Add("@name", SqliteType.Text);
        var typeKind = typeCmd.Parameters.Add("@kind", SqliteType.Text);
        var typeEp = typeCmd.Parameters.Add("@ep", SqliteType.Integer);
        var typeDoc = typeCmd.Parameters.Add("@doc", SqliteType.Text);
        var typeDep = typeCmd.Parameters.Add("@dep", SqliteType.Integer);

        using var memberCmd = connection.CreateCommand();
        memberCmd.CommandText = """
            INSERT OR IGNORE INTO members (id, type_id, name, kind, return_type, deprecated)
            VALUES (@id, @tid, @name, @kind, @ret, @dep)
            """;
        var memberId = memberCmd.Parameters.Add("@id", SqliteType.Text);
        var memberTid = memberCmd.Parameters.Add("@tid", SqliteType.Text);
        var memberName = memberCmd.Parameters.Add("@name", SqliteType.Text);
        var memberKind = memberCmd.Parameters.Add("@kind", SqliteType.Text);
        var memberRet = memberCmd.Parameters.Add("@ret", SqliteType.Text);
        var memberDep = memberCmd.Parameters.Add("@dep", SqliteType.Integer);

        using var paramCmd = connection.CreateCommand();
        paramCmd.CommandText = """
            INSERT OR IGNORE INTO params (member_id, position, name, type, optional)
            VALUES (@mid, @pos, @name, @type, @opt)
            """;
        var paramMid = paramCmd.Parameters.Add("@mid", SqliteType.Text);
        var paramPos = paramCmd.Parameters.Add("@pos", SqliteType.Integer);
        var paramName = paramCmd.Parameters.Add("@name", SqliteType.Text);
        var paramType = paramCmd.Parameters.Add("@type", SqliteType.Text);
        var paramOpt = paramCmd.Parameters.Add("@opt", SqliteType.Integer);

        using var edgeCmd = connection.CreateCommand();
        edgeCmd.CommandText = "INSERT INTO edges (src, dst, kind, member) VALUES (@src, @dst, @kind, @member)";
        var edgeSrc = edgeCmd.Parameters.Add("@src", SqliteType.Text);
        var edgeDst = edgeCmd.Parameters.Add("@dst", SqliteType.Text);
        var edgeKind = edgeCmd.Parameters.Add("@kind", SqliteType.Text);
        var edgeMember = edgeCmd.Parameters.Add("@member", SqliteType.Text);

        foreach (var t in types)
        {
            var id = !string.IsNullOrEmpty(t.Id) ? t.Id : t.Name;
            var kind = ClassifyTypeKind(t);

            typeId.Value = id;
            typeName.Value = t.Name;
            typeKind.Value = kind;
            typeEp.Value = t.EntryPoint ? 1 : 0;
            typeDoc.Value = (object?)t.Doc ?? DBNull.Value;
            typeDep.Value = t.IsDeprecated ? 1 : 0;
            typeCmd.ExecuteNonQuery();

            // Callables → members + edges
            var overloadCounters = new Dictionary<string, int>(StringComparer.Ordinal);
            foreach (var callable in t.Callables)
            {
                overloadCounters.TryGetValue(callable.Name, out var overloadIdx);
                overloadCounters[callable.Name] = overloadIdx + 1;
                var suffix = overloadIdx > 0 ? $"#{overloadIdx}" : "";
                var baseId = !string.IsNullOrEmpty(callable.Id) ? callable.Id : $"{id}.{callable.Name}";
                var mId = $"{baseId}{suffix}";
                var mKind = callable.Name == t.Name ? "constructor" : "method";

                memberId.Value = mId;
                memberTid.Value = id;
                memberName.Value = callable.Name;
                memberKind.Value = mKind;
                memberRet.Value = (object?)callable.ReturnType ?? DBNull.Value;
                memberDep.Value = callable.IsDeprecated ? 1 : 0;
                memberCmd.ExecuteNonQuery();

                // Parameters
                var requiredCount = callable.ParameterTypes.Count - callable.OptionalParameterCount;
                for (var i = 0; i < callable.ParameterTypes.Count; i++)
                {
                    var pType = callable.ParameterTypes[i];
                    paramMid.Value = mId;
                    paramPos.Value = i;
                    paramName.Value = $"p{i}";
                    paramType.Value = pType;
                    paramOpt.Value = i >= requiredCount ? 1 : 0;
                    paramCmd.ExecuteNonQuery();

                    // Parameter edges
                    foreach (var refType in ExtractTypeReferences(pType))
                    {
                        InsertEdge(edgeCmd, edgeSrc, edgeDst, edgeKind, edgeMember, id, refType, "parameter", callable.Name);
                        EnsureExternalType(connection, refType, localTypes);
                    }
                }

                // Return type edges
                if (!string.IsNullOrEmpty(callable.ReturnType))
                {
                    foreach (var refType in ExtractTypeReferences(callable.ReturnType))
                    {
                        InsertEdge(edgeCmd, edgeSrc, edgeDst, edgeKind, edgeMember, id, refType, "return", callable.Name);
                        EnsureExternalType(connection, refType, localTypes);
                    }
                }
            }

            // Properties → members + edges
            foreach (var prop in t.Properties)
            {
                var pId = $"{id}.{prop.Name}";

                memberId.Value = pId;
                memberTid.Value = id;
                memberName.Value = prop.Name;
                memberKind.Value = "property";
                memberRet.Value = (object?)prop.TypeName ?? DBNull.Value;
                memberDep.Value = prop.IsDeprecated ? 1 : 0;
                memberCmd.ExecuteNonQuery();

                if (!string.IsNullOrEmpty(prop.TypeName))
                {
                    foreach (var refType in ExtractTypeReferences(prop.TypeName))
                    {
                        InsertEdge(edgeCmd, edgeSrc, edgeDst, edgeKind, edgeMember, id, refType, "property", prop.Name);
                        EnsureExternalType(connection, refType, localTypes);
                    }
                }
            }
        }
    }

    private static void InsertTopLevelCallables(
        SqliteConnection connection,
        IEnumerable<DiagnosticCallableInfo> callables,
        HashSet<string> localTypes)
    {
        const string moduleTypeName = "__module__";
        var topLevelCallables = callables.ToList();
        if (topLevelCallables.Count == 0)
            return;

        // Create a synthetic module type to hold top-level functions
        using var typeCmd = connection.CreateCommand();
        typeCmd.CommandText = """
            INSERT INTO types (id, name, kind, source, entry_point)
            VALUES (@id, @name, 'function', 'local', 0)
            """;
        typeCmd.Parameters.AddWithValue("@id", moduleTypeName);
        typeCmd.Parameters.AddWithValue("@name", moduleTypeName);
        typeCmd.ExecuteNonQuery();

        using var memberCmd = connection.CreateCommand();
        memberCmd.CommandText = """
            INSERT OR IGNORE INTO members (id, type_id, name, kind, return_type, deprecated)
            VALUES (@id, @tid, @name, 'method', @ret, @dep)
            """;
        var memberId = memberCmd.Parameters.Add("@id", SqliteType.Text);
        var memberTid = memberCmd.Parameters.Add("@tid", SqliteType.Text);
        var memberName = memberCmd.Parameters.Add("@name", SqliteType.Text);
        var memberRet = memberCmd.Parameters.Add("@ret", SqliteType.Text);
        var memberDep = memberCmd.Parameters.Add("@dep", SqliteType.Integer);

        using var paramCmd = connection.CreateCommand();
        paramCmd.CommandText = """
            INSERT OR IGNORE INTO params (member_id, position, name, type, optional)
            VALUES (@mid, @pos, @name, @type, @opt)
            """;
        var paramMid = paramCmd.Parameters.Add("@mid", SqliteType.Text);
        var paramPos = paramCmd.Parameters.Add("@pos", SqliteType.Integer);
        var paramName = paramCmd.Parameters.Add("@name", SqliteType.Text);
        var paramType = paramCmd.Parameters.Add("@type", SqliteType.Text);
        var paramOpt = paramCmd.Parameters.Add("@opt", SqliteType.Integer);

        using var edgeCmd = connection.CreateCommand();
        edgeCmd.CommandText = "INSERT INTO edges (src, dst, kind, member) VALUES (@src, @dst, @kind, @member)";
        var edgeSrc = edgeCmd.Parameters.Add("@src", SqliteType.Text);
        var edgeDst = edgeCmd.Parameters.Add("@dst", SqliteType.Text);
        var edgeKind = edgeCmd.Parameters.Add("@kind", SqliteType.Text);
        var edgeMember = edgeCmd.Parameters.Add("@member", SqliteType.Text);

        foreach (var callable in topLevelCallables)
        {
            var mId = !string.IsNullOrEmpty(callable.Id) ? callable.Id : $"{moduleTypeName}.{callable.Name}";

            memberId.Value = mId;
            memberTid.Value = moduleTypeName;
            memberName.Value = callable.Name;
            memberRet.Value = (object?)callable.ReturnType ?? DBNull.Value;
            memberDep.Value = callable.IsDeprecated ? 1 : 0;
            memberCmd.ExecuteNonQuery();

            var requiredCount = callable.ParameterTypes.Count - callable.OptionalParameterCount;
            for (var i = 0; i < callable.ParameterTypes.Count; i++)
            {
                var pType = callable.ParameterTypes[i];
                paramMid.Value = mId;
                paramPos.Value = i;
                paramName.Value = $"p{i}";
                paramType.Value = pType;
                paramOpt.Value = i >= requiredCount ? 1 : 0;
                paramCmd.ExecuteNonQuery();

                foreach (var refType in ExtractTypeReferences(pType))
                {
                    InsertEdge(edgeCmd, edgeSrc, edgeDst, edgeKind, edgeMember, moduleTypeName, refType, "parameter", callable.Name);
                    EnsureExternalType(connection, refType, localTypes);
                }
            }

            if (!string.IsNullOrEmpty(callable.ReturnType))
            {
                foreach (var refType in ExtractTypeReferences(callable.ReturnType))
                {
                    InsertEdge(edgeCmd, edgeSrc, edgeDst, edgeKind, edgeMember, moduleTypeName, refType, "return", callable.Name);
                    EnsureExternalType(connection, refType, localTypes);
                }
            }
        }
    }

    private static void InsertDiagnostics(SqliteConnection connection, IReadOnlyList<ApiDiagnostic> diagnostics)
    {
        if (diagnostics.Count == 0)
            return;

        using var cmd = connection.CreateCommand();
        cmd.CommandText = """
            INSERT INTO diagnostics (id, level, text, target_type, target_member)
            VALUES (@id, @level, @text, @tt, @tm)
            """;
        var diagId = cmd.Parameters.Add("@id", SqliteType.Text);
        var diagLevel = cmd.Parameters.Add("@level", SqliteType.Text);
        var diagText = cmd.Parameters.Add("@text", SqliteType.Text);
        var diagTt = cmd.Parameters.Add("@tt", SqliteType.Text);
        var diagTm = cmd.Parameters.Add("@tm", SqliteType.Text);

        foreach (var d in diagnostics)
        {
            diagId.Value = d.Id;
            diagLevel.Value = d.Level.ToString().ToLowerInvariant();
            diagText.Value = d.Text;
            diagTt.Value = (object?)d.TargetType ?? DBNull.Value;
            diagTm.Value = (object?)d.TargetMember ?? DBNull.Value;
            cmd.ExecuteNonQuery();
        }
    }

    private static void InsertEdge(
        SqliteCommand edgeCmd,
        SqliteParameter src, SqliteParameter dst,
        SqliteParameter kind, SqliteParameter member,
        string srcVal, string dstVal, string kindVal, string? memberVal)
    {
        src.Value = srcVal;
        dst.Value = dstVal;
        kind.Value = kindVal;
        member.Value = (object?)memberVal ?? DBNull.Value;
        edgeCmd.ExecuteNonQuery();
    }

    /// <summary>
    /// Ensures an external type reference has a row in the types table.
    /// Skips types already known to be local.
    /// </summary>
    private static void EnsureExternalType(
        SqliteConnection connection,
        string typeName,
        HashSet<string> localTypes)
    {
        if (localTypes.Contains(typeName))
            return;

        // Add to set so we only insert once
        localTypes.Add(typeName);

        var source = Primitives.Contains(typeName) ? "builtin" : "external";

        using var cmd = connection.CreateCommand();
        cmd.CommandText = """
            INSERT OR IGNORE INTO types (id, name, kind, source)
            VALUES (@id, @name, 'class', @source)
            """;
        cmd.Parameters.AddWithValue("@id", typeName);
        cmd.Parameters.AddWithValue("@name", typeName);
        cmd.Parameters.AddWithValue("@source", source);
        cmd.ExecuteNonQuery();
    }

    /// <summary>
    /// Classifies a type as class, interface, enum, or type_alias using the same
    /// heuristic as <see cref="MarkdownFormatter"/>.
    /// </summary>
    private static string ClassifyTypeKind(DiagnosticTypeInfo type)
    {
        var hasConstructor = type.Callables.Any(c => c.Name == type.Name);
        if (hasConstructor)
            return "class";
        if (type.Callables.Count > 0)
            return "interface";
        if (type.Properties.Count > 0)
            return "interface";
        return "enum";
    }

    /// <summary>
    /// Extracts individual type references from a type string.
    /// Handles generics (<c>Promise&lt;Resource&gt;</c>), unions (<c>string | number</c>),
    /// and intersections. Filters out primitives.
    /// </summary>
    internal static IEnumerable<string> ExtractTypeReferences(string typeString)
    {
        if (string.IsNullOrWhiteSpace(typeString))
            yield break;

        // Split on union/intersection/comma separators
        var parts = typeString.Split('|', '&', ',');

        foreach (var part in parts)
        {
            // Strip generic brackets, array brackets, nullable markers, parentheses, whitespace
            var cleaned = part
                .Replace('<', ' ')
                .Replace('>', ' ')
                .Replace('[', ' ')
                .Replace(']', ' ')
                .Replace('(', ' ')
                .Replace(')', ' ')
                .Replace('?', ' ');

            var tokens = cleaned.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            foreach (var token in tokens)
            {
                // Skip primitives, empty tokens, and pure numeric values
                if (Primitives.Contains(token))
                    continue;

                // Skip tokens that look like numbers or keywords
                if (token.Length == 0 || char.IsDigit(token[0]))
                    continue;

                // Normalize generic suffixes (e.g., `List`1` in .NET)
                var normalized = IApiIndex.NormalizeTypeName(token);
                if (normalized.Length > 0 && !Primitives.Contains(normalized))
                    yield return normalized;
            }
        }
    }
}
