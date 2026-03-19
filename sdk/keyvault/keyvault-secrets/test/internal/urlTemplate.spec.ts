// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  expandUrlTemplate,
  type UrlTemplateOptions,
} from "../../src/static-helpers/urlTemplate.js";

describe("expandUrlTemplate", () => {
  // -----------------------------------------------------------------------
  // Literal text (no template expressions)
  // -----------------------------------------------------------------------
  describe("literal text", () => {
    it("returns plain text unchanged (encodeURI pass-through)", () => {
      expect(expandUrlTemplate("/secrets/restore", {})).toBe("/secrets/restore");
    });

    it("returns a full URL unchanged", () => {
      expect(expandUrlTemplate("https://example.com/path", {})).toBe("https://example.com/path");
    });

    it("encodes spaces in literal text via encodeURI", () => {
      expect(expandUrlTemplate("hello world", {})).toBe("hello%20world");
    });

    it("preserves already-percent-encoded sequences in literal text", () => {
      expect(expandUrlTemplate("abc%20def", {})).toBe("abc%20def");
    });
  });

  // -----------------------------------------------------------------------
  // Level 1 – Simple string expansion {var}
  // -----------------------------------------------------------------------
  describe("simple variable expansion {var}", () => {
    it("substitutes a plain string value", () => {
      expect(expandUrlTemplate("{var}", { var: "value" })).toBe("value");
    });

    it("percent-encodes spaces (RFC 3986)", () => {
      expect(expandUrlTemplate("{var}", { var: "hello world" })).toBe("hello%20world");
    });

    it("percent-encodes forward slashes", () => {
      expect(expandUrlTemplate("{var}", { var: "hello/world" })).toBe("hello%2Fworld");
    });

    it("percent-encodes special chars: !, (, ), *", () => {
      const result = expandUrlTemplate("{var}", { var: "a!b(c)d*e" });
      expect(result).toBe("a%21b%28c%29d%2Ae");
    });

    it("converts a number value to string", () => {
      expect(expandUrlTemplate("{var}", { var: 42 })).toBe("42");
    });

    it("converts a boolean value to string", () => {
      expect(expandUrlTemplate("{var}", { var: true })).toBe("true");
    });

    it("returns empty string for undefined value", () => {
      expect(expandUrlTemplate("{var}", { var: undefined })).toBe("");
    });

    it("returns empty string for null value", () => {
      expect(expandUrlTemplate("{var}", { var: null })).toBe("");
    });

    it("joins array values with commas", () => {
      expect(expandUrlTemplate("{var}", { var: ["a", "b", "c"] })).toBe("a,b,c");
    });

    it("skips undefined/null items in an array", () => {
      expect(expandUrlTemplate("{var}", { var: ["a", undefined, "c"] })).toBe("a,c");
    });

    it("joins object key–value pairs with commas", () => {
      expect(expandUrlTemplate("{keys}", { keys: { key: "val" } })).toBe("key,val");
    });

    it("handles multiple variables in one expression", () => {
      expect(expandUrlTemplate("{x,y}", { x: "1", y: "2" })).toBe("1,2");
    });

    it("omits undefined variables in a multi-var expression", () => {
      expect(expandUrlTemplate("{x,y}", { x: "1", y: undefined })).toBe("1");
    });

    it("handles a hyphenated variable name", () => {
      expect(expandUrlTemplate("{secret-name}", { "secret-name": "mysecret" })).toBe("mysecret");
    });
  });

  // -----------------------------------------------------------------------
  // Level 2 – Reserved string expansion {+var}
  // -----------------------------------------------------------------------
  describe("reserved expansion {+var}", () => {
    it("does not encode forward slashes", () => {
      expect(expandUrlTemplate("{+path}", { path: "/foo/bar" })).toBe("/foo/bar");
    });

    it("does not encode reserved URI characters", () => {
      expect(expandUrlTemplate("{+var}", { var: "https://example.com/path?q=1" })).toBe(
        "https://example.com/path?q=1",
      );
    });

    it("still encodes spaces", () => {
      expect(expandUrlTemplate("{+var}", { var: "hello world" })).toBe("hello%20world");
    });

    it("returns empty string for undefined", () => {
      expect(expandUrlTemplate("{+var}", { var: undefined })).toBe("");
    });
  });

  // -----------------------------------------------------------------------
  // Fragment expansion {#var}
  // -----------------------------------------------------------------------
  describe("fragment expansion {#var}", () => {
    it("prepends # and keeps reserved chars unencoded", () => {
      expect(expandUrlTemplate("{#var}", { var: "foo/bar" })).toBe("#foo/bar");
    });

    it("returns empty string for undefined", () => {
      expect(expandUrlTemplate("{#var}", { var: undefined })).toBe("");
    });

    it("handles a simple string value", () => {
      expect(expandUrlTemplate("{#foo}", { foo: "anchor" })).toBe("#anchor");
    });
  });

  // -----------------------------------------------------------------------
  // Label expansion {.var}
  // -----------------------------------------------------------------------
  describe("label expansion {.var}", () => {
    it("prepends a dot to the value", () => {
      expect(expandUrlTemplate("{.var}", { var: "foo" })).toBe(".foo");
    });

    it("returns empty string for undefined", () => {
      expect(expandUrlTemplate("{.var}", { var: undefined })).toBe("");
    });

    it("handles multiple label vars", () => {
      expect(expandUrlTemplate("{.x,y}", { x: "a", y: "b" })).toBe(".a.b");
    });
  });

  // -----------------------------------------------------------------------
  // Path expansion {/var}
  // -----------------------------------------------------------------------
  describe("path expansion {/var}", () => {
    it("prepends a slash to the value", () => {
      expect(expandUrlTemplate("{/var}", { var: "foo" })).toBe("/foo");
    });

    it("returns empty string for undefined", () => {
      expect(expandUrlTemplate("{/var}", { var: undefined })).toBe("");
    });

    it("handles multiple path segments", () => {
      expect(expandUrlTemplate("{/x,y}", { x: "foo", y: "bar" })).toBe("/foo/bar");
    });
  });

  // -----------------------------------------------------------------------
  // Query string expansion {?var}
  // -----------------------------------------------------------------------
  describe("query expansion {?var}", () => {
    it("produces a key=value query string", () => {
      expect(expandUrlTemplate("{?var}", { var: "value" })).toBe("?var=value");
    });

    it("handles an empty string value", () => {
      expect(expandUrlTemplate("{?var}", { var: "" })).toBe("?var=");
    });

    it("handles multiple query params", () => {
      expect(expandUrlTemplate("{?x,y}", { x: "1", y: "2" })).toBe("?x=1&y=2");
    });

    it("omits undefined params", () => {
      expect(expandUrlTemplate("{?x,y}", { x: "1", y: undefined })).toBe("?x=1");
    });

    it("returns empty string for a single undefined param", () => {
      expect(expandUrlTemplate("{?var}", { var: undefined })).toBe("");
    });

    it("handles a pre-encoded variable name (api%2Dversion)", () => {
      expect(expandUrlTemplate("{?api%2Dversion}", { "api%2Dversion": "7.6" })).toBe(
        "?api%2Dversion=7.6",
      );
    });

    it("handles mixed defined and undefined params with pre-encoded name", () => {
      expect(
        expandUrlTemplate("{?api%2Dversion,maxresults}", {
          "api%2Dversion": "7.6",
          maxresults: undefined,
        }),
      ).toBe("?api%2Dversion=7.6");
    });

    it("handles maxresults when provided", () => {
      expect(
        expandUrlTemplate("{?api%2Dversion,maxresults}", {
          "api%2Dversion": "7.6",
          maxresults: 25,
        }),
      ).toBe("?api%2Dversion=7.6&maxresults=25");
    });
  });

  // -----------------------------------------------------------------------
  // Query continuation {&var}
  // -----------------------------------------------------------------------
  describe("query continuation {&var}", () => {
    it("produces an ampersand-prefixed key=value pair", () => {
      expect(expandUrlTemplate("{&var}", { var: "value" })).toBe("&var=value");
    });

    it("handles multiple vars with ampersand", () => {
      expect(expandUrlTemplate("{&x,y}", { x: "1", y: "2" })).toBe("&x=1&y=2");
    });

    it("returns empty string for undefined", () => {
      expect(expandUrlTemplate("{&var}", { var: undefined })).toBe("");
    });
  });

  // -----------------------------------------------------------------------
  // Prefix modifier {var:N}
  // -----------------------------------------------------------------------
  describe("prefix modifier {var:N}", () => {
    it("truncates a string to N characters", () => {
      expect(expandUrlTemplate("{var:3}", { var: "value" })).toBe("val");
    });

    it("returns the full string when N >= length", () => {
      expect(expandUrlTemplate("{var:10}", { var: "hello" })).toBe("hello");
    });
  });

  // -----------------------------------------------------------------------
  // Explode modifier {var*}
  // -----------------------------------------------------------------------
  describe("explode modifier {var*}", () => {
    it("expands an array with comma separator (Level 1)", () => {
      expect(expandUrlTemplate("{list*}", { list: ["a", "b", "c"] })).toBe("a,b,c");
    });

    it("expands an object as key=value pairs", () => {
      expect(expandUrlTemplate("{keys*}", { keys: { key: "val" } })).toBe("key=val");
    });

    it("expands query-style array with explode", () => {
      expect(expandUrlTemplate("{?list*}", { list: ["a", "b"] })).toBe("?list=a&list=b");
    });
  });

  // -----------------------------------------------------------------------
  // Mixed literal and template
  // -----------------------------------------------------------------------
  describe("mixed literal and template", () => {
    it("combines a path prefix with a template variable", () => {
      expect(expandUrlTemplate("/secrets/{secret-name}", { "secret-name": "mysecret" })).toBe(
        "/secrets/mysecret",
      );
    });

    it("handles hyphen in secret names without extra encoding", () => {
      expect(expandUrlTemplate("/secrets/{secret-name}", { "secret-name": "my-secret-name" })).toBe(
        "/secrets/my-secret-name",
      );
    });

    it("encodes forward slash in a secret name", () => {
      expect(expandUrlTemplate("/secrets/{secret-name}", { "secret-name": "a/b" })).toBe(
        "/secrets/a%2Fb",
      );
    });
  });

  // -----------------------------------------------------------------------
  // Real-world Key Vault URL patterns
  // -----------------------------------------------------------------------
  describe("Key Vault URL patterns", () => {
    it("expands getSecret URL: /secrets/{secret-name}/{secret-version}", () => {
      expect(
        expandUrlTemplate("/secrets/{secret-name}/{secret-version}{?api%2Dversion}", {
          "secret-name": "mysecret",
          "secret-version": "abc123",
          "api%2Dversion": "7.6",
        }),
      ).toBe("/secrets/mysecret/abc123?api%2Dversion=7.6");
    });

    it("expands setSecret URL: /secrets/{secret-name}", () => {
      expect(
        expandUrlTemplate("/secrets/{secret-name}{?api%2Dversion}", {
          "secret-name": "mysecret",
          "api%2Dversion": "7.6",
        }),
      ).toBe("/secrets/mysecret?api%2Dversion=7.6");
    });

    it("expands restoreSecret URL: /secrets/restore", () => {
      expect(
        expandUrlTemplate("/secrets/restore{?api%2Dversion}", {
          "api%2Dversion": "7.6",
        }),
      ).toBe("/secrets/restore?api%2Dversion=7.6");
    });

    it("expands backupSecret URL: /secrets/{secret-name}/backup", () => {
      expect(
        expandUrlTemplate("/secrets/{secret-name}/backup{?api%2Dversion}", {
          "secret-name": "mysecret",
          "api%2Dversion": "7.6",
        }),
      ).toBe("/secrets/mysecret/backup?api%2Dversion=7.6");
    });

    it("expands getDeletedSecret URL: /deletedsecrets/{secret-name}", () => {
      expect(
        expandUrlTemplate("/deletedsecrets/{secret-name}{?api%2Dversion}", {
          "secret-name": "mysecret",
          "api%2Dversion": "7.6",
        }),
      ).toBe("/deletedsecrets/mysecret?api%2Dversion=7.6");
    });

    it("expands recoverDeletedSecret URL: /deletedsecrets/{secret-name}/recover", () => {
      expect(
        expandUrlTemplate("/deletedsecrets/{secret-name}/recover{?api%2Dversion}", {
          "secret-name": "mysecret",
          "api%2Dversion": "7.6",
        }),
      ).toBe("/deletedsecrets/mysecret/recover?api%2Dversion=7.6");
    });

    it("expands getSecrets URL: /secrets with api version and maxresults", () => {
      expect(
        expandUrlTemplate("/secrets{?api%2Dversion,maxresults}", {
          "api%2Dversion": "7.6",
          maxresults: 10,
        }),
      ).toBe("/secrets?api%2Dversion=7.6&maxresults=10");
    });

    it("expands getSecrets URL without optional maxresults", () => {
      expect(
        expandUrlTemplate("/secrets{?api%2Dversion,maxresults}", {
          "api%2Dversion": "7.6",
          maxresults: undefined,
        }),
      ).toBe("/secrets?api%2Dversion=7.6");
    });

    it("expands getSecretVersions URL: /secrets/{secret-name}/versions", () => {
      expect(
        expandUrlTemplate("/secrets/{secret-name}/versions{?api%2Dversion,maxresults}", {
          "secret-name": "mysecret",
          "api%2Dversion": "7.6",
          maxresults: undefined,
        }),
      ).toBe("/secrets/mysecret/versions?api%2Dversion=7.6");
    });
  });

  // -----------------------------------------------------------------------
  // UrlTemplateOptions.allowReserved
  // -----------------------------------------------------------------------
  describe("UrlTemplateOptions.allowReserved", () => {
    it("does not encode reserved characters when allowReserved is true", () => {
      const opts: UrlTemplateOptions = { allowReserved: true };
      expect(expandUrlTemplate("{var}", { var: "hello/world" }, opts)).toBe("hello/world");
    });

    it("encodes reserved characters when allowReserved is false", () => {
      const opts: UrlTemplateOptions = { allowReserved: false };
      expect(expandUrlTemplate("{var}", { var: "hello/world" }, opts)).toBe("hello%2Fworld");
    });

    it("encodes reserved characters when allowReserved is not set", () => {
      expect(expandUrlTemplate("{var}", { var: "hello/world" })).toBe("hello%2Fworld");
    });

    it("allowReserved: true does not encode colon", () => {
      const opts: UrlTemplateOptions = { allowReserved: true };
      expect(expandUrlTemplate("{var}", { var: "http://example.com" }, opts)).toBe(
        "http://example.com",
      );
    });
  });
});
