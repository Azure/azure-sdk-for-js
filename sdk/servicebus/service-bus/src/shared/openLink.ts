// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as log from "../log";
import { Receiver as RheaReceiver, AwaitableSender } from "rhea-promise";
import { translate, defaultLock } from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/core-http";
import { AbortError } from "@azure/abort-controller";

export type RheaLink = AwaitableSender | RheaReceiver;

/**
 * This is transitional code - as more code gets moved out of MessageReceiver/MessageSender
 * we can stop passing in some of these functions.
 *
 * For instance
 * - negotiateClaim + ensureTokenRenewal can be lifted out of LinkEntity into openLink.ts.
 * - openLock can be moved into here if we allow openLink to have some manageable state
 *  - same for isConnecting, which might need to be readable external from here but not writable.
 *
 * @internal
 * @ignore
 */
export interface OpenArgs<RheaLinkT extends RheaLink> {
  create(): Promise<RheaLinkT>;
  isOpen(): boolean;

  // logging related stuff.
  logPrefix: string;

  // TODO: I'd like to let openLink have some state (object?) and then these would be internal details
  // we could still let external callers check if isConnecting is set, but not change it.
  openLock: string;

  isConnecting(): boolean;
  setIsConnecting(value: boolean): boolean;

  getCloseInitiated(): boolean;

  // these are more candidates to move out from LinkEntity. They don't really depend on anything special
  // in LinkEntity and are just clutter.
  negotiateClaim(): Promise<void>;
  ensureTokenRenewal(): void;

  abortSignal?: AbortSignalLike;
}

/**
 * @internal
 * @ignore
 */
export function openLink<T extends RheaLink>(args: OpenArgs<T>): Promise<T | undefined> {
  const checkAborted = (): void => {
    if (args.abortSignal?.aborted) {
      throw new AbortError("open() has been cancelled by user.");
    }
  };

  checkAborted();

  if (args.isOpen() || args.isConnecting() || args.getCloseInitiated()) {
    return Promise.resolve(undefined);
  }

  // TODO: set isConnecting up here, cleanup on finally?

  log.error(
    `${args.logPrefix} is not open or connecting. Acquiring lock ${args.openLock} for initializing the session, link and possibly the connection.`
  );

  return defaultLock.acquire(args.openLock, async () => {
    checkAborted();

    let link: T | undefined = undefined;

    try {
      if (args.isOpen()) {
        return Promise.resolve(undefined);
      }

      // isOpen isConnecting  Should establish
      // true     false          No
      // true     true           No
      // false    true           No
      // false    false          Yes
      log.error(
        `${args.logPrefix} is not open and is not currently establishing itself. Hence let's try to connect.`
      );

      args.setIsConnecting(true);
      await args.negotiateClaim();
      checkAborted();

      log.error(`${args.logPrefix} Trying to create...`);

      link = await args.create();
      checkAborted();

      log.error(`${args.logPrefix}' has been created.`);

      await args.ensureTokenRenewal();
      checkAborted();

      return link;
    } catch (err) {
      if (link != null) {
        // TODO: leaving it up to the calling code to properly cleanup the token renewal
        // timer. When we move that responsibility into here we can take care of cleaning it
        // up here as well.
        await link.close();
      }

      const translatedErr = translate(err);

      log.error(`${args.logPrefix}. An error occurred during creation`, translatedErr);
      // log.error(
      //   "[%s] An error occurred while creating the sender %s",
      //   this._context.namespace.connectionId,
      //   this.name,
      //   err
      // );
      throw translatedErr;
    } finally {
      args.setIsConnecting(false);
    }
  });
}
