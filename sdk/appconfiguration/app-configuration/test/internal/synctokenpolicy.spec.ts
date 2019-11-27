// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseSyncToken, SyncTokens } from "../../src/internal/synctokenpolicy";
import * as assert from "assert";

describe("sync tokens", () => {
  describe("parseSyncToken", () => {
    it("can parse various sync tokens", () => {
      assert.deepEqual(parseSyncToken("theid=thevalue;sn=1"), {
        id: "theid",
        value: "thevalue",
        sequenceNumber: 1
      });
    });

    it("throws on invalid sync tokens", () => {
      for (const invalidToken of ["invalid token", "missing=sequencenumber", "key=value;"])
        assert.throws(
          () => parseSyncToken(invalidToken),
          new RegExp(`Failed to parse sync token '${invalidToken}' with regex .+$`)
        );
    });
  });

  describe("syncTokens", () => {
    it("basic", () => {
      const syncTokens = new SyncTokens();
      syncTokens.addSyncTokenFromHeaderValue("a=value;sn=0");
      
      // note that 'sn' is purposefully not serialized
      assert.equal("a=value", syncTokens.getSyncTokenHeaderValue());

      syncTokens.addSyncTokenFromHeaderValue("b=value2;sn=0");
      assert.equal("a=value,b=value2", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

      // now we'll rev the sequence number field - it should overwrite the original value
      // for b
      syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=1");
      assert.equal("a=value,b=value2.1", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

      // sending in an older version of an existing key should do nothing
      syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=0");
      // note that 'b' didn't change
      assert.equal("a=value,b=value2.1", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

      // and sending in multiple values acts the same as passing them in one
      // at a time.
      syncTokens.addSyncTokenFromHeaderValue("b=value2.2;sn=100,c=value3;sn=1");
      assert.equal("a=value,b=value2.2,c=value3", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

      // and if we get back undefined (ie, the header wasn't there) then it
      // resets the entire thing
      // (sync tokens are temporary in nature and expire as things are committed
      // and moved out of cache)
      syncTokens.addSyncTokenFromHeaderValue(undefined);
      assert.ok(!syncTokens.getSyncTokenHeaderValue());
    });
  });
});

function splitAndSort(syncTokens: string|undefined): string {
  if (!syncTokens) {
    throw new Error("Undefined can't be split and sorted");
  }

  return syncTokens.split(',').sort().join(',');
}