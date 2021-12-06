import { useInstrumenter } from "@azure/core-tracing";
import { assert } from "chai";
import { TestInstrumenter } from "../../src";

// this is the plugin used in the test file
function chaiAzureTrace(chai: Chai.ChaiStatic, _utils: Chai.ChaiUtils) {
  // expect(() => {}).to.supportsTracing() syntax
  chai.Assertion.addMethod("supportsTracing", function() {
    this._obj.call(undefined);
  });
  // assert.supportsTracing(() => {}) syntax
  chai.assert.supportsTracing = supportsTracing;
}

// Implementation
async function supportsTracing<Callback extends (...args: unknown[]) => unknown>(
  callback: Callback
) {
  const instrumenter = new TestInstrumenter();
  useInstrumenter(instrumenter);
  await callback.call(undefined);
  console.log(callback.name);
  assert.equal(instrumenter.startedSpans.length, 1);
}

// types
declare global {
  export namespace Chai {
    interface Assertion {
      supportsTracing(): Promise<void>;
    }

    interface Assert {
      supportsTracing<Callback extends (...args: unknown[]) => unknown>(
        callback: Callback
      ): Promise<void>;
    }
  }
}

export { chaiAzureTrace };
