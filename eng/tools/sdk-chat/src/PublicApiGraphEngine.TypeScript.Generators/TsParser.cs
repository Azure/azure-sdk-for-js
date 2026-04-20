// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>
/// Recursive descent parser for TypeScript interface declarations.
/// Consumes a token stream and produces a typed AST.
///
/// Grammar:
///   File            → (InterfaceDecl | SkipNonInterface)* EOF
///   InterfaceDecl   → DocComment? 'export'? 'interface' IDENT Extends? '{' Member* '}'
///   Extends         → 'extends' TypeRef (',' TypeRef)*
///   TypeRef         → IDENT
///   Member          → DocComment? 'readonly'? IDENT '?'? ':' TypeExpr ';'
///   TypeExpr        → UnionType
///   UnionType       → ArrayType ('|' ArrayType)*
///   ArrayType       → AtomicType ('[]')*
///   AtomicType      → 'string' | 'boolean' | 'number' | 'undefined' | 'null' | 'void'
///                    | 'never' | 'unknown' | 'any' | 'object'
///                    | StringLiteral
///                    | IDENT GenericArgs?
///                    | '(' TypeExpr ')'
///   GenericArgs     → '&lt;' TypeExpr (',' TypeExpr)* '&gt;'
/// </summary>
internal sealed class TsParser
{
    private static readonly HashSet<string> PrimitiveTypeNames = new(StringComparer.Ordinal)
    {
        "string", "boolean", "number", "undefined", "null",
        "void", "never", "unknown", "any", "object",
    };

    private readonly List<TsToken> _tokens;
    private int _pos;
    private readonly List<ParseDiagnostic> _diagnostics = [];

    internal TsParser(List<TsToken> tokens)
    {
        _tokens = tokens;
        _pos = 0;
    }

    internal record ParseDiagnostic(string Message, SourcePosition Position);

    internal (TsFile File, IReadOnlyList<ParseDiagnostic> Diagnostics) Parse()
    {
        var interfaces = new List<TsInterfaceDecl>();

        while (!IsAtEnd())
        {
            // Look for interface declarations
            var doc = TryConsumeDocComment();
            if (Check(TsTokenKind.Export) || Check(TsTokenKind.Interface))
            {
                var iface = ParseInterfaceDecl(doc);
                if (iface is not null)
                    interfaces.Add(iface);
            }
            else
            {
                // Skip non-interface token; warn if a doc comment was orphaned
                if (doc is not null)
                {
                    Error($"Doc comment is not followed by an interface declaration — skipped", Current().Position);
                }
                Advance();
            }
        }

        return (new TsFile(interfaces), _diagnostics);
    }

    // -----------------------------------------------------------------------
    // Interface declaration
    // -----------------------------------------------------------------------

    private TsInterfaceDecl? ParseInterfaceDecl(string? leadingDoc)
    {
        var pos = Current().Position;
        bool isExported = Match(TsTokenKind.Export);

        if (!Match(TsTokenKind.Interface))
            return null;

        if (!Check(TsTokenKind.Identifier))
        {
            Error("Expected interface name", Current().Position);
            SkipToCloseBrace();
            return null;
        }

        var name = Consume(TsTokenKind.Identifier).Value;

        // extends clause
        var extends_ = new List<string>();
        if (Match(TsTokenKind.Extends))
        {
            extends_.Add(Consume(TsTokenKind.Identifier).Value);
            while (Match(TsTokenKind.Comma))
                extends_.Add(Consume(TsTokenKind.Identifier).Value);
        }

        if (!Match(TsTokenKind.OpenBrace))
        {
            Error($"Expected '{{' after interface {name}", Current().Position);
            return null;
        }

        // Members
        var members = new List<TsMember>();
        while (!Check(TsTokenKind.CloseBrace) && !IsAtEnd())
        {
            var memberDoc = TryConsumeDocComment();
            if (Check(TsTokenKind.CloseBrace))
                break;

            var member = ParseMember(memberDoc);
            if (member is not null)
                members.Add(member);
        }

        if (!Match(TsTokenKind.CloseBrace))
            Error($"Expected '}}' to close interface {name}", Current().Position);

        return new TsInterfaceDecl(name, isExported, extends_, members, leadingDoc, pos);
    }

    // -----------------------------------------------------------------------
    // Member (property)
    // -----------------------------------------------------------------------

    private TsMember? ParseMember(string? leadingDoc)
    {
        var pos = Current().Position;
        bool isReadonly = false;

        // "readonly" can be a modifier OR a property name.
        // It's a modifier only if followed by an identifier (or keyword-as-property) then ":" or "?:".
        if (Check(TsTokenKind.Readonly) && IsPropertyNameFollowedByColonOrQuestion(1))
        {
            isReadonly = true;
            Advance(); // consume readonly modifier
        }

        // Property name: can be an identifier or a keyword used as name (extends, readonly, etc.)
        if (!IsPropertyName())
        {
            Error($"Expected property name, got {Current().Kind}({Current().Value})", pos);
            SkipToSemicolon();
            return null;
        }

        var name = ConsumePropertyName().Value;
        bool isOptional = Match(TsTokenKind.Question);

        if (!Match(TsTokenKind.Colon))
        {
            // Could be a method: name(...): type — report and skip
            Error($"Expected ':' after property name '{name}', got {Current().Kind}({Current().Value}). " +
                  "Method signatures are not supported; only property members.", pos);
            SkipToSemicolon();
            return null;
        }

        var type = ParseTypeExpr();
        if (type is null)
        {
            SkipToSemicolon();
            return null;
        }

        if (!Match(TsTokenKind.Semicolon))
        {
            // Tolerate missing semicolons (common in TS) but warn
            if (!Check(TsTokenKind.CloseBrace))
                Error($"Expected ';' after property '{name}'", Current().Position);
        }

        return new TsMember(name, isOptional, isReadonly, type, leadingDoc, pos);
    }

    // -----------------------------------------------------------------------
    // Type expressions (recursive descent)
    // -----------------------------------------------------------------------

    /// <summary>TypeExpr → UnionType</summary>
    private TsTypeNode? ParseTypeExpr()
    {
        return ParseUnionType();
    }

    /// <summary>UnionType → ArrayType ('|' ArrayType)*</summary>
    private TsTypeNode? ParseUnionType()
    {
        var pos = Current().Position;
        var first = ParseArrayType();
        if (first is null) return null;

        if (!Check(TsTokenKind.Pipe))
            return first;

        var members = new List<TsTypeNode> { first };
        while (Match(TsTokenKind.Pipe))
        {
            var next = ParseArrayType();
            if (next is null)
            {
                Error("Expected type after '|'", Current().Position);
                break;
            }
            members.Add(next);
        }

        return new TsUnionType(members, pos);
    }

    /// <summary>ArrayType → AtomicType ('[]')*</summary>
    private TsTypeNode? ParseArrayType()
    {
        var type = ParseAtomicType();
        if (type is null) return null;

        while (Check(TsTokenKind.OpenBracket) && PeekNext().Kind == TsTokenKind.CloseBracket)
        {
            var pos = Current().Position;
            Advance(); // [
            Advance(); // ]
            type = new TsArrayType(type, pos);
        }

        return type;
    }

    /// <summary>
    /// AtomicType → primitive | StringLiteral | IDENT GenericArgs? | '(' TypeExpr ')'
    /// </summary>
    private TsTypeNode? ParseAtomicType()
    {
        var pos = Current().Position;

        // Parenthesized type
        if (Match(TsTokenKind.OpenParen))
        {
            var inner = ParseTypeExpr();
            if (inner is null)
            {
                Error("Expected type inside parentheses", pos);
                return null;
            }
            if (!Match(TsTokenKind.CloseParen))
                Error("Expected ')'", Current().Position);
            return new TsParenthesizedType(inner, pos);
        }

        // String literal
        if (Check(TsTokenKind.StringLiteral))
        {
            var lit = Consume(TsTokenKind.StringLiteral);
            return new TsStringLiteralType(lit.Value, pos);
        }

        // Identifier (could be primitive, named type, or generic)
        if (Check(TsTokenKind.Identifier))
        {
            var ident = Consume(TsTokenKind.Identifier);

            // Primitive type keyword
            if (PrimitiveTypeNames.Contains(ident.Value))
                return new TsPrimitiveType(ident.Value, pos);

            // Generic type arguments
            if (Check(TsTokenKind.OpenAngle))
            {
                var typeArgs = ParseGenericArgs();
                return new TsNamedType(ident.Value, typeArgs, pos);
            }

            // Simple named type
            return new TsNamedType(ident.Value, [], pos);
        }

        // Keyword that can appear as a type (readonly is an identifier for us)
        Error($"Unexpected token {Current().Kind}({Current().Value}) in type position", pos);
        return null;
    }

    /// <summary>GenericArgs → '&lt;' TypeExpr (',' TypeExpr)* '&gt;'</summary>
    private IReadOnlyList<TsTypeNode> ParseGenericArgs()
    {
        Advance(); // <
        var args = new List<TsTypeNode>();

        var first = ParseTypeExpr();
        if (first is not null)
            args.Add(first);

        while (Match(TsTokenKind.Comma))
        {
            var next = ParseTypeExpr();
            if (next is not null)
                args.Add(next);
        }

        if (!Match(TsTokenKind.CloseAngle))
            Error("Expected '>' to close generic type arguments", Current().Position);

        return args;
    }

    // -----------------------------------------------------------------------
    // Token helpers
    // -----------------------------------------------------------------------

    /// <summary>Keyword kinds that can also serve as property names in TS.</summary>
    private static readonly HashSet<TsTokenKind> KeywordsAsPropertyNames =
    [
        TsTokenKind.Extends,
        TsTokenKind.Readonly,
        TsTokenKind.Export,
        TsTokenKind.Interface,
    ];

    /// <summary>Can the current token be a property name? (identifier or contextual keyword)</summary>
    private bool IsPropertyName() =>
        Check(TsTokenKind.Identifier) || (!IsAtEnd() && KeywordsAsPropertyNames.Contains(Current().Kind));

    /// <summary>Consume the current token as a property name (identifier or keyword-as-name).</summary>
    private TsToken ConsumePropertyName()
    {
        if (IsPropertyName())
        {
            var token = Current();
            Advance();
            return token;
        }
        Error($"Expected property name, got {Current().Kind}({Current().Value})", Current().Position);
        return Current();
    }

    /// <summary>
    /// Look ahead to see if position+offset has a property-name-like token
    /// followed by ':' or '?:' (i.e., it's a property, not a modifier).
    /// Used to disambiguate "readonly" as modifier vs property name.
    /// </summary>
    private bool IsPropertyNameFollowedByColonOrQuestion(int offset)
    {
        var idx = _pos + offset;
        if (idx >= _tokens.Count) return false;
        var next = _tokens[idx];
        // The token at offset must be an identifier or keyword-as-name
        if (next.Kind != TsTokenKind.Identifier && !KeywordsAsPropertyNames.Contains(next.Kind))
            return false;
        // Then check for ':' or '?'
        var after = idx + 1 < _tokens.Count ? _tokens[idx + 1] : default;
        return after.Kind == TsTokenKind.Colon || after.Kind == TsTokenKind.Question;
    }

    private string? TryConsumeDocComment()
    {
        if (Check(TsTokenKind.DocComment))
        {
            return Consume(TsTokenKind.DocComment).Value;
        }
        return null;
    }

    private TsToken Current() => _pos < _tokens.Count ? _tokens[_pos] : _tokens[^1]; // EOF
    private TsToken PeekNext() => _pos + 1 < _tokens.Count ? _tokens[_pos + 1] : _tokens[^1];
    private bool IsAtEnd() => Current().Kind == TsTokenKind.EndOfFile;
    private bool Check(TsTokenKind kind) => !IsAtEnd() && Current().Kind == kind;

    private bool Match(TsTokenKind kind)
    {
        if (!Check(kind)) return false;
        Advance();
        return true;
    }

    private TsToken Consume(TsTokenKind expected)
    {
        if (Check(expected))
        {
            var token = Current();
            Advance();
            return token;
        }

        Error($"Expected {expected}, got {Current().Kind}({Current().Value})", Current().Position);
        return Current();
    }

    private void Advance()
    {
        if (_pos < _tokens.Count - 1) _pos++;
    }

    private void Error(string message, SourcePosition position)
    {
        _diagnostics.Add(new ParseDiagnostic(message, position));
    }

    private void SkipToSemicolon()
    {
        while (!IsAtEnd() && !Check(TsTokenKind.Semicolon) && !Check(TsTokenKind.CloseBrace))
            Advance();
        Match(TsTokenKind.Semicolon);
    }

    private void SkipToCloseBrace()
    {
        int depth = 0;
        while (!IsAtEnd())
        {
            if (Check(TsTokenKind.OpenBrace)) depth++;
            if (Check(TsTokenKind.CloseBrace))
            {
                if (depth == 0) { Advance(); return; }
                depth--;
            }
            Advance();
        }
    }
}
