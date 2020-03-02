import chai from "chai";
import { retry } from "./retry";
const assert = chai.assert;

describe("retry utility function", function() {
  it("throws an exception if we reach the maximum retries", async () => {
    const startingDate = new Date();
    await retry(
      async () => {
        throw new Error("I always fail");
      },
      100,
      200
    );
    const endingDate = new Date();

    const difference = endingDate.getTime() - startingDate.getTime();
    assert.ok(difference >= 200); // In CI this takes a lot longer than locally
  });

  it("returns the value if resolved on time", async () => {
    const result = await retry(async () => true);
    assert.strictEqual(result, true);
  });
});
