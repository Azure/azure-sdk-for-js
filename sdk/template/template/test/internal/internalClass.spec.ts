// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClass, InternalInheritedClass } from "../../src/internalClass";

// another node built-in that has to be shimmed for the browser
import { assert } from "chai";

describe("Tests for the internal classes", function() {
  describe("Tests for the InternalClass", function() {
    it("The InternalClass should be able to be initialized", function() {
      const Internal = new InternalClass();
      assert.exists(Internal);
    });

    it("The InternalClass's returnsTrue should return true", function() {
      const Internal = new InternalClass();
      const result: boolean = Internal.returnsTrue();
      assert.isTrue(result);
    });
  });

  describe("Tests for the InternalInheritedClass", function() {
    it("The InternalInheritedClass should be able to be initialized", function() {
      const Internal = new InternalInheritedClass();
      assert.exists(Internal);
    });

    it("The InternalInheritedClass's returnsTrue should return true", function() {
      const Internal = new InternalInheritedClass();
      const result: boolean = Internal.returnsTrue();
      assert.isTrue(result);
    });

    it("The InternalInheritedClass's returnsFalse should return false", function() {
      const Internal = new InternalInheritedClass();
      const result: boolean = Internal.returnsFalse();
      assert.isFalse(result);
    });
  });
});
