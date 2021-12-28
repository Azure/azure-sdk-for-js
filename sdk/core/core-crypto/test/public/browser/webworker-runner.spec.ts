// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HashMessage, HmacMessage } from "./webworker";
import { assert } from "chai";

describe("SHA-256 (WebWorker)", function () {
  const worker = new Worker("/base/dist-test/webworker.js");

  function postMessage(message: HashMessage | HmacMessage): Promise<string> {
    return new Promise((resolve) => {
      worker.postMessage(message);
      const listener = (event: MessageEvent<string>): void => {
        worker.removeEventListener("message", listener);
        resolve(event.data);
      };
      worker.addEventListener("message", listener);
    });
  }

  after(function () {
    worker.terminate();
  });

  describe("Hash", function () {
    it("base64 encoding", async function () {
      const hash = await postMessage({
        type: "hash",
        algorithm: "sha256",
        content: "azure",
        encoding: "base64",
      });

      assert.equal(
        hash,
        "efQ8O5wj+98pO9uoDas4uhlPwdp5GHCRs9N2Da2EC/g=",
        "The computed hash does not match the expected value."
      );
    });

    it("hex encoding", async function () {
      const hash = await postMessage({
        type: "hash",
        algorithm: "sha256",
        content: "azure",
        encoding: "hex",
      });

      assert.equal(
        hash,
        "79f43c3b9c23fbdf293bdba80dab38ba194fc1da79187091b3d3760dad840bf8",
        "The computed hash does not match the expected value."
      );
    });
  });

  describe("HMAC", function () {
    const base64EncodedKey = "c2VjcmV0"; // 'secret' in utf8.

    it("base64 encoding", async function () {
      const hmac = await postMessage({
        type: "hmac",
        algorithm: "sha256",
        key: base64EncodedKey,
        stringToSign: "azure",
        encoding: "base64",
      });

      assert.equal(
        hmac,
        "AJ/qUoDtgLeA1A5ND2AS3uF7hsSe9O7imtXlkAj8VR4=",
        "The computed hmac does not match the expected value."
      );
    });

    it("hex encoding", async function () {
      const hmac = await postMessage({
        type: "hmac",
        algorithm: "sha256",
        key: base64EncodedKey,
        stringToSign: "azure",
        encoding: "hex",
      });

      assert.equal(
        hmac,
        "009fea5280ed80b780d40e4d0f6012dee17b86c49ef4eee29ad5e59008fc551e",
        "The computed hmac does not match the expected value."
      );
    });
  });
});
