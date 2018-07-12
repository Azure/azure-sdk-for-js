import * as assert from "assert";
import { MurmurHash } from "../../hash";

describe("MurmurHash", function() {
  const test = function(input: string | number | Buffer, seed: number, expected: number) {
    assert.equal(MurmurHash.hash(input, seed), expected);
  };

  it("hash 374", function() {
    test(374, 0, 2455513042);
  });

  it("Buffer(374.0)", function() {
    test(new Buffer([0, 0, 0, 0, 0, 96, 119, 64]), 0, 3717946798);
  });

  it('Buffer("afdgdd")', function() {
    test(new Buffer("afdgdd"), 0, 1099701186);
  });

  it("afdgdd", function() {
    test("afdgdd", 0, 1099701186);
  });

  it('""', function() {
    test("", 0x1b873593, 1738713326);
  });

  it('"1"', function() {
    test("1", 0xe82562e4, 3978597072);
  });

  it('"00"', function() {
    test("00", 0xb4c39035, 459540986);
  });

  it("eyetooth", function() {
    test("eyetooth", 0x8161bd86, 1864131224);
  });

  it("acid", function() {
    test("acid", 0x4dffead7, 3116405302);
  });

  it("elevation", function() {
    test("elevation", 0x1a9e1828, 3745560233);
  });

  it("dent", function() {
    test("dent", 0xe73c4579, 3554761172);
  });

  it("homeland", function() {
    test("homeland", 0xb3da72ca, 3144830214);
  });

  it("glamor", function() {
    test("glamor", 0x8078a01b, 2812447113);
  });

  it("flags", function() {
    test("flags", 0x4d16cd6c, 40273746);
  });

  it("democracy", function() {
    test("democracy", 0x19b4fabd, 2966836708);
  });

  it("bumble", function() {
    test("bumble", 0xe653280e, 214161406);
  });

  it("catch", function() {
    test("catch", 0xb2f1555f, 3451276184);
  });

  it("omnomnomnivore", function() {
    test("omnomnomnivore", 0x7f8f82b0, 4291675192);
  });

  it("The quick brown fox jumps over the lazy dog", function() {
    test("The quick brown fox jumps over the lazy dog", 0x4c2db001, 3381504877);
  });
});
