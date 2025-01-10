const { delay } = require("@azure/core-util");

const DEFAULT_POLL_INTERVAL_IN_MS = 2000;

/**
 * This function sends the initial request to start the operation and returns
 * the state of the operation including a configuration object that can be used
 * to poll the operation.
 * @returns the initial state of the operation
 */
async function initOperation() {
  // starts the operation
  return { status: "running", config: { id: "1" } };
}

/**
 * This function polls the operation using the configuration object in state
 * that was returned from initOperation. It also updates the poller state with
 * the information in the polling response.
 */
async function pollOperation({ setDelay, state, options }) {
  if (options?.abortSignal?.aborted) {
    throw new Error("aborted");
  }
  // polls the operation using id while respecting the abort signal in options
  const { id } = state.config;
  const response = { id, status: "succeeded", retryAfter: 2000 };
  // update the state based on the response
  if (response.status === "succeeded") {
    state.status = "succeeded";
    state.result = response;
  } else if (response.status === "failed") {
    state.status = "failed";
    state.error = response.error;
  } else if (response.status === "canceled") {
    state.status = "canceled";
  } else {
    setDelay(response.retryAfter); // updates the delay if the service suggests a different interval
  }
}

/**
 * This function deserializes the state of the poller.
 */
function deserializeState(serializedState) {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`Unable to deserialize input state: ${serializedState}`);
  }
}

/**
 * Creates a poller for the operation.
 */
function createPoller({ intervalInMs, restoreFrom }) {
  let statePromise;
  let state;
  if (restoreFrom) {
    state = deserializeState(restoreFrom);
    statePromise = Promise.resolve(state);
  } else {
    statePromise = initOperation().then((s) => (state = s));
  }
  let resultPromise;
  const abortController = new AbortController();
  const handlers = new Map();
  const handleProgressEvents = async () => handlers.forEach((h) => h(state));
  const cancelErrMsg = "Operation was canceled";
  let currentPollIntervalInMs = intervalInMs ?? DEFAULT_POLL_INTERVAL_IN_MS;
  const poller = {
    get operationState() {
      return state;
    },
    get result() {
      return state?.result;
    },
    get isDone() {
      return ["succeeded", "failed", "canceled"].includes(state?.status);
    },
    onProgress: (callback) => {
      const s = Symbol();
      handlers.set(s, callback);
      return () => handlers.delete(s);
    },
    serialize: async () => {
      await statePromise;
      return JSON.stringify({
        state,
      });
    },
    submitted: async () => {
      await statePromise;
    },
    pollUntilDone: async (pollOptions) => {
      resultPromise ??= (async () => {
        await statePromise;
        if (!state) {
          throw new Error("Poller should be initialized but it is not!");
        }
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        const abortSignal = inputAbortSignal
          ? AbortSignal.any([inputAbortSignal, abortController.signal])
          : abortController.signal;

        if (!poller.isDone) {
          await poller.poll({ abortSignal });
          while (!poller.isDone) {
            await delay(currentPollIntervalInMs, { abortSignal });
            await poller.poll({ abortSignal });
          }
        }
        switch (state.status) {
          case "succeeded":
            return poller.result;
          case "canceled":
            throw new Error(cancelErrMsg);
          case "failed":
            throw state.error;
          case "notStarted":
          case "running":
            throw new Error(`Polling completed without succeeding or failing`);
        }
      })().finally(() => {
        resultPromise = undefined;
      });
      return resultPromise;
    },
    async poll(pollOptions) {
      await statePromise;
      if (!state) {
        throw new Error("Poller should be initialized but it is not!");
      }
      switch (state.status) {
        case "succeeded":
          return state;
        case "canceled":
          throw new Error(cancelErrMsg);
        case "failed":
          throw state.error;
      }
      await pollOperation({
        state,
        options: pollOptions,
        setDelay: (pollIntervalInMs) => {
          currentPollIntervalInMs = pollIntervalInMs;
        },
      });
      await handleProgressEvents();
      switch (state.status) {
        case "canceled":
          throw new Error(cancelErrMsg);
        case "failed":
          throw state.error;
      }

      return state;
    },
    then(onfulfilled, onrejected) {
      return poller.pollUntilDone().then(onfulfilled, onrejected);
    },
    catch(onrejected) {
      return poller.pollUntilDone().catch(onrejected);
    },
    finally(onfinally) {
      return poller.pollUntilDone().finally(onfinally);
    },
    [Symbol.toStringTag]: "Poller",
  };
  return poller;
}

async function main() {
  const poller = createPoller({ intervalInMs: 1000 });
  const res = await poller.pollUntilDone();
  console.log(res);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
