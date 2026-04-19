// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>Source position for diagnostics.</summary>
internal readonly record struct SourcePosition(int Line, int Column)
{
    public override string ToString() => $"({Line},{Column})";
}

// ---------------------------------------------------------------------------
// AST nodes
// ---------------------------------------------------------------------------

/// <summary>A complete parsed models.ts file.</summary>
internal sealed record TsFile(IReadOnlyList<TsInterfaceDecl> Interfaces);

/// <summary>An interface declaration: export interface Name extends Base1, Base2 { ... }</summary>
internal sealed record TsInterfaceDecl(
    string Name,
    bool IsExported,
    IReadOnlyList<string> Extends,
    IReadOnlyList<TsMember> Members,
    string? DocComment,
    SourcePosition Position);

/// <summary>A property member within an interface.</summary>
internal sealed record TsMember(
    string Name,
    bool IsOptional,
    bool IsReadonly,
    TsTypeNode Type,
    string? DocComment,
    SourcePosition Position);

// ---------------------------------------------------------------------------
// Type expression nodes (discriminated union via base record)
// ---------------------------------------------------------------------------

/// <summary>Base for all TypeScript type expression AST nodes.</summary>
internal abstract record TsTypeNode(SourcePosition Position)
{
    /// <summary>Reconstructs the canonical TypeScript source text.</summary>
    public abstract string ToTypeScript();
}

/// <summary>Primitive type: string, boolean, number, undefined, null, void, never, unknown, any, object.</summary>
internal sealed record TsPrimitiveType(string Name, SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() => Name;
}

/// <summary>String literal type: "info", "warning", etc.</summary>
internal sealed record TsStringLiteralType(string Value, SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() => $"\"{Value}\"";
}

/// <summary>Array type: T[]</summary>
internal sealed record TsArrayType(TsTypeNode ElementType, SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() => $"{ElementType.ToTypeScript()}[]";
}

/// <summary>Named type reference, optionally generic: Foo or Record&lt;K, V&gt;.</summary>
internal sealed record TsNamedType(
    string Name,
    IReadOnlyList<TsTypeNode> TypeArguments,
    SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() =>
        TypeArguments.Count == 0
            ? Name
            : $"{Name}<{string.Join(", ", TypeArguments.Select(a => a.ToTypeScript()))}>";
}

/// <summary>Union type: A | B | C.</summary>
internal sealed record TsUnionType(IReadOnlyList<TsTypeNode> Members, SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() =>
        string.Join(" | ", Members.Select(m => m.ToTypeScript()));
}

/// <summary>Parenthesized type: (A | B).</summary>
internal sealed record TsParenthesizedType(TsTypeNode Inner, SourcePosition Position) : TsTypeNode(Position)
{
    public override string ToTypeScript() => $"({Inner.ToTypeScript()})";
}
