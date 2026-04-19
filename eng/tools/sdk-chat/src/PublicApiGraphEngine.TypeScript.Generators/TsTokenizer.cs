// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>Token types produced by the TypeScript tokenizer.</summary>
internal enum TsTokenKind
{
    // Literals
    Identifier,
    StringLiteral,

    // Keywords (contextual)
    Export,
    Interface,
    Extends,
    Readonly,

    // Punctuation
    OpenBrace,      // {
    CloseBrace,     // }
    OpenParen,      // (
    CloseParen,     // )
    OpenAngle,      // <
    CloseAngle,     // >
    OpenBracket,    // [
    CloseBracket,   // ]
    Colon,          // :
    Semicolon,      // ;
    Comma,          // ,
    Question,       // ?
    Pipe,           // |

    // Special
    DocComment,     // /** ... */
    EndOfFile,
}

/// <summary>A single token with its kind, text value, and source position.</summary>
internal readonly record struct TsToken(TsTokenKind Kind, string Value, SourcePosition Position)
{
    public override string ToString() => $"{Kind}({Value}) at {Position}";
}

/// <summary>
/// Tokenizer for the TypeScript interface subset used in models.ts.
/// Produces a flat token stream with source positions for diagnostics.
/// Skips line comments (//) and block comments (/* ... */) except JSDoc (/** ... */).
/// </summary>
internal sealed class TsTokenizer
{
    private readonly string _source;
    private int _pos;
    private int _line;
    private int _col;

    internal TsTokenizer(string source)
    {
        _source = source;
        _pos = 0;
        _line = 1;
        _col = 1;
    }

    internal List<TsToken> Tokenize()
    {
        var tokens = new List<TsToken>();
        while (true)
        {
            SkipWhitespace();
            if (AtEnd())
            {
                tokens.Add(new TsToken(TsTokenKind.EndOfFile, "", Pos()));
                break;
            }

            var token = ReadToken();
            if (token is not null)
                tokens.Add(token.Value);
        }
        return tokens;
    }

    private TsToken? ReadToken()
    {
        var pos = Pos();
        var ch = Peek();

        // Line comment
        if (ch == '/' && PeekAt(1) == '/')
        {
            SkipLineComment();
            return null;
        }

        // Block comment or JSDoc
        if (ch == '/' && PeekAt(1) == '*')
        {
            return ReadCommentOrDoc(pos);
        }

        // String literal
        if (ch == '"' || ch == '\'')
        {
            return ReadStringLiteral(pos, ch);
        }

        // Punctuation (single-character tokens)
        var punctKind = ch switch
        {
            '{' => TsTokenKind.OpenBrace,
            '}' => TsTokenKind.CloseBrace,
            '(' => TsTokenKind.OpenParen,
            ')' => TsTokenKind.CloseParen,
            '<' => TsTokenKind.OpenAngle,
            '>' => TsTokenKind.CloseAngle,
            '[' => TsTokenKind.OpenBracket,
            ']' => TsTokenKind.CloseBracket,
            ':' => TsTokenKind.Colon,
            ';' => TsTokenKind.Semicolon,
            ',' => TsTokenKind.Comma,
            '?' => TsTokenKind.Question,
            '|' => TsTokenKind.Pipe,
            _ => (TsTokenKind?)null,
        };

        if (punctKind is not null)
        {
            Advance();
            return new TsToken(punctKind.Value, ch.ToString(), pos);
        }

        // Identifier or keyword
        if (IsIdentStart(ch))
        {
            return ReadIdentifierOrKeyword(pos);
        }

        // Unknown character — skip and return null (will be caught by parser)
        Advance();
        return null;
    }

    private TsToken ReadCommentOrDoc(SourcePosition pos)
    {
        Advance(); // /
        Advance(); // *
        bool isJsDoc = !AtEnd() && Peek() == '*' && PeekAt(1) != '/';

        var sb = new System.Text.StringBuilder();
        sb.Append("/*");

        while (!AtEnd())
        {
            if (Peek() == '*' && PeekAt(1) == '/')
            {
                sb.Append("*/");
                Advance(); // *
                Advance(); // /
                break;
            }
            sb.Append(Peek());
            Advance();
        }

        if (isJsDoc)
        {
            var docText = ExtractDocText(sb.ToString());
            return new TsToken(TsTokenKind.DocComment, docText, pos);
        }

        // Regular block comment — skip
        return default; // will be null-checked by caller (but TsToken is struct...)
    }

    private TsToken ReadStringLiteral(SourcePosition pos, char quote)
    {
        Advance(); // opening quote
        var sb = new System.Text.StringBuilder();

        while (!AtEnd())
        {
            var ch = Peek();
            if (ch == '\\')
            {
                Advance();
                if (!AtEnd())
                {
                    sb.Append(Peek());
                    Advance();
                }
                continue;
            }
            if (ch == quote)
            {
                Advance(); // closing quote
                break;
            }
            if (ch == '\n')
                break; // unterminated — let parser report error
            sb.Append(ch);
            Advance();
        }

        return new TsToken(TsTokenKind.StringLiteral, sb.ToString(), pos);
    }

    private TsToken ReadIdentifierOrKeyword(SourcePosition pos)
    {
        var start = _pos;
        while (!AtEnd() && IsIdentPart(Peek()))
            Advance();

        var text = _source[start.._pos];
        var kind = text switch
        {
            "export" => TsTokenKind.Export,
            "interface" => TsTokenKind.Interface,
            "extends" => TsTokenKind.Extends,
            "readonly" => TsTokenKind.Readonly,
            _ => TsTokenKind.Identifier,
        };

        return new TsToken(kind, text, pos);
    }

    // -----------------------------------------------------------------------
    // Character helpers
    // -----------------------------------------------------------------------

    private void SkipWhitespace()
    {
        while (!AtEnd() && char.IsWhiteSpace(Peek()))
            Advance();
    }

    private void SkipLineComment()
    {
        while (!AtEnd() && Peek() != '\n')
            Advance();
    }

    private bool AtEnd() => _pos >= _source.Length;
    private char Peek() => _source[_pos];

    private char PeekAt(int offset)
    {
        var idx = _pos + offset;
        return idx < _source.Length ? _source[idx] : '\0';
    }

    private void Advance()
    {
        if (_pos < _source.Length)
        {
            if (_source[_pos] == '\n')
            {
                _line++;
                _col = 1;
            }
            else
            {
                _col++;
            }
            _pos++;
        }
    }

    private SourcePosition Pos() => new(_line, _col);

    private static bool IsIdentStart(char ch) => char.IsLetter(ch) || ch == '_' || ch == '$';
    private static bool IsIdentPart(char ch) => char.IsLetterOrDigit(ch) || ch == '_' || ch == '$';

    // -----------------------------------------------------------------------
    // JSDoc text extraction
    // -----------------------------------------------------------------------

    /// <summary>
    /// Extracts clean text from a JSDoc comment block.
    /// Input: "/** text here */" or multi-line with * prefixes.
    /// </summary>
    private static string ExtractDocText(string raw)
    {
        // Remove /** and */
        var body = raw;
        if (body.StartsWith("/**"))
            body = body[3..];
        if (body.EndsWith("*/"))
            body = body[..^2];

        var lines = body.Split('\n');
        var sb = new System.Text.StringBuilder();

        foreach (var line in lines)
        {
            var trimmed = line.Trim();
            // Strip leading * (JSDoc continuation)
            if (trimmed.StartsWith("*"))
                trimmed = trimmed[1..].TrimStart();

            if (!string.IsNullOrEmpty(trimmed))
            {
                if (sb.Length > 0) sb.Append(' ');
                sb.Append(trimmed);
            }
        }

        return sb.ToString();
    }
}
