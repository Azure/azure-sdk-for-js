import { assert } from "chai";
import { retry, RetryOptions } from "./retry";

describe("retry utility function", function() {
  it("throws an exception if we reach the maximum retries", async () => {
    const failure = async () => {
      throw new Error("I always fail");
    };

    const startingDate = new Date();
    let error: any;
    try {
      await retry(failure, {
        minTimeout: 100,
        retries: 2
      } as RetryOptions);
    } catch (e) {
      error = e;
    }
    const endingDate = new Date();

    assert.strictEqual(error.message, "I always fail");
    // The difference is locally around 300 but it's taking around 500 on our pipelines
    const difference = endingDate.getTime() - startingDate.getTime();
    assert.ok(difference > 300 && difference < 1000);
  });

  it("returns the value if resolved on time", async () => {
    const success = async () => true;

    const result = await retry(success, {
      minTimeout: 100,
      retries: 2
    } as RetryOptions);

    assert.strictEqual(result, true);
  });
});
