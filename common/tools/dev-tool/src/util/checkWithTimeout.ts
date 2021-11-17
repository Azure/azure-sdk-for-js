/**
 *  - Maximum wait duration for the expected event to happen = `10000 ms`(default value is 10 seconds)(= maxWaitTimeInMilliseconds)
 *  - Keep checking whether the predicate is true after every `1000 ms`(default value is 1 second) (= delayBetweenRetriesInMilliseconds)
 */
export async function checkWithTimeout(
  predicate: () => boolean | Promise<boolean>,
  delayBetweenRetriesInMilliseconds: number = 1000,
  maxWaitTimeInMilliseconds: number = 10000
): Promise<boolean> {
  const maxTime = Date.now() + maxWaitTimeInMilliseconds;
  while (Date.now() < maxTime) {
    if (await predicate()) return true;
    await delay(delayBetweenRetriesInMilliseconds);
  }
  return false;
}

async function delay(timeInMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}
