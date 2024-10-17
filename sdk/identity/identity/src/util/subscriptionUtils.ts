import { CredentialLogger, formatError } from "./logging";

/**
 * @internal
 */
export function checkSubscription(logger: CredentialLogger, subscription: string): void {
  if (!subscription.match(/^[0-9a-zA-Z-.]+$/)) {
    const error = new Error(
      "Invalid subscription provided. You can locate your subscription by following the instructions listed here: https://learn.microsoft.com/entra/fundamentals/how-to-find-tenant.",
    );
    logger.info(formatError("", error));
    throw error;
  }
}
