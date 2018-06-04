import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { Base } from "../../";
import content from "./../common/BaselineTest.PathParser";

describe("Base", function () {
    describe("#._trimSlashes", function () {
        const test = (input: string, expected: string) => {
            assert.strictEqual(Base._trimSlashes(input), expected);
        };

        it("/a/ => a", function () {
            test("/a/", "a");
        });

        it("/a/b => a/b", function () {
            test("/a/b", "a/b");
        });

        it("/a/b/ => a/b", function () {
            test("/a/b/", "a/b");
        });

        it("a/b/ => a/b", function () {
            test("a/b", "a/b");
        });

        it("/a => a", function () {
            test("/a", "a");
        });

        it("a/ => a", function () {
            test("a/", "a");
        });

        it("//a// => a", function () {
            test("//a//", "a");
        });

        it("/ => ", function () {
            test("/", "");
        });

        it("// => ", function () {
            test("//", "");
        });

        it("/// => ", function () {
            test("///", "");
        });
    });

    describe("#._isValidCollectionLink", function () {
        const test = (input: any, expected: boolean) => {
            assert.strictEqual(Base._isValidCollectionLink(input), expected);
        };

        it("not string => false", function () {
            const testValues: any[] = [
                null,
                undefined,
                0,
                function () { /* no op */ },
                [],
                {},
            ];

            testValues.forEach(function (value) {
                test(value, false);
            });
        });

        it("not four parts => false", function () {
            const testValues = [
                "",
                "a",
                "a/b",
                "a/b/c",
                "a/b/c/d/e",
                "a/b/c/d/e/f",
            ];

            testValues.forEach(function (value) {
                test(value, false);
            });
        });

        it("not dbs/x/colls/y => false", function () {
            const testValues = [
                "a/b/c/d",
                "dbs/b/c/d",
                "a/b/colls/d",
            ];

            testValues.forEach(function (value) {
                test(value, false);
            });
        });

        it("dbs/x/colls/y => true", function () {
            const testValues = [
                "dbs/b/colls/d",
            ];

            testValues.forEach(function (value) {
                test(value, true);
            });
        });
    });

    describe("#.getAttachmentIdFromMediaId", function () {
        const test = (input: string, expected: string) => {
            assert.strictEqual(Base.getAttachmentIdFromMediaId(input), expected);
        };

        it("> 20 characters, Alpha-numeric only", function () {
            test("6hl2ALdWbQCxAgAAAAAAAC4-1VoB", "6hl2ALdWbQCxAgAAAAAAAC4-1Vo=");
        });

        it("> 20 characters, Single hyphen '-'", function () {
            test("6hl2ALdWbQCxAgAAAAAAAC4-1VoB", "6hl2ALdWbQCxAgAAAAAAAC4-1Vo=");
        });

        it("> 20 characters, Multiple hyphens '-'", function () {
            test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
        });

        it("> 20 characters, Plus sign '+'", function () {
            test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
        });

        it("> 20 characters, Plus sign '+', Hyphen '-'", function () {
            test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
        });

        it("< 20 characters, Plus sign '+', Hyphen '-'", function () {
            test("6hl2A-dWb+CxAgAAAA", "6hl2A-dWb+CxAgAAAA");
        });

    });

    describe("#.parsePath", function () {
        const test = (input: string, expected: any) => {
            assert.strictEqual(JSON.stringify(Base.parsePath(input)), JSON.stringify(expected));
        };

        it("escape control characters 1", function () {
            test("/\"Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1\"/*",
                ["Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1", "*"]);
        });

        it("escape control characters 2", function () {
            test("/'Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1'/*",
                ["Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1", "*"]);
        });

        it("test paths", function () {
            const obj: any[] = JSON.parse(JSON.stringify(content));
            obj.forEach(function (entry) {
                test(entry.path, entry.parts);
            });
        });
    });
});
