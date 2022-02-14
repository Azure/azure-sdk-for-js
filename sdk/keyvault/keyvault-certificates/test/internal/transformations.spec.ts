// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { CertificateOperation as CoreCertificateOperation } from "../../src/generated/models";
import { getCertificateOperationFromCoreOperation } from "../../src/transformations";

describe("transformations", function () {
  describe("getCertificateOperationFromCoreOperation", function () {
    it("transforms null error to undefined", function () {
      const input: CoreCertificateOperation = {
        error: null,
      };

      assert.isUndefined(getCertificateOperationFromCoreOperation("", "", input).error);
    });

    it("transforms null inner error to undefined", function () {
      const input: CoreCertificateOperation = {
        error: {
          innerError: null,
        },
      };

      const output = getCertificateOperationFromCoreOperation("", "", input);
      assert.isDefined(output.error);
      assert.isUndefined(output.error!.innerError);
    });

    it("transforms errors correctly when present", function () {
      const input: CoreCertificateOperation = {
        error: {
          code: "outer error",
          message: "The outer error message",
          innerError: {
            code: "inner error",
            innerError: undefined,
            message: "The inner error message",
          },
        },
      };

      const output = getCertificateOperationFromCoreOperation("", "", input);
      assert.deepNestedInclude(output, input);
    });
  });
});
