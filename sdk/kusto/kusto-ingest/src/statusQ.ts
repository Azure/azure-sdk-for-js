// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeekedMessageItem, QueueClient } from "@azure/storage-queue";
import { ResourceURI } from "./resourceManager";
import { StatusMessage } from "./status";

class QueueDetails {
  constructor(readonly name: string, readonly service: QueueClient) {}
}

const shuffle = <T>(a: T[]): T[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[j];
    a[j] = a[i];
    a[i] = temp;
  }

  return a;
};

interface PeekParams {
  raw: boolean;
}

interface PopParams {
  raw: boolean;
  remove: boolean;
}

type Message = PeekedMessageItem | StatusMessage;

export class StatusQueue {
  constructor(
    readonly getQueuesFunc: () => Promise<ResourceURI[]>,
    readonly messageCls: typeof StatusMessage
  ) {}

  _getQServices(queuesDetails: ResourceURI[]) {
    return queuesDetails.map((q) => {
      const fullUri = q.uri;
      if (!fullUri) {
        throw new Error("Empty or null connection string");
      }
      // chop off sas
      const indexOfSas = q.uri.indexOf("?");
      const name = indexOfSas > 0 ? q.uri.substring(0, indexOfSas) : q.uri;
      return new QueueDetails(name, new QueueClient(fullUri));
    });
  }

  async isEmpty() {
    const result = await this.peek(1, { raw: true });
    return !result || result.length === 0;
  }

  decodeContent(content: string) {
    return Buffer.from(content, "base64").toString("ascii");
  }

  deserializeMessage(m: PeekedMessageItem): StatusMessage {
    return new this.messageCls(this.decodeContent(m.messageText), null, null);
  }

  async _peek(
    qs: QueueDetails[],
    n: number,
    options: PeekParams | null
  ): Promise<{ result: Message[]; nonEmptyQs: QueueDetails[]; done: boolean }> {
    const result: Message[] = [];
    const nonEmptyQs: QueueDetails[] = [];

    for (const q of qs) {
      const response = await q.service.peekMessages();
      const messages = response.peekedMessageItems;

      if (messages && messages.length > 0) {
        nonEmptyQs.push(q);
      }

      for (const m of messages) {
        if (m && Object.keys(m).length > 0) {
          result.push(options && options.raw ? m : this.deserializeMessage(m));

          if (result.length === n) {
            return { done: true, nonEmptyQs, result };
          }
        }
      }
    }
    return { done: nonEmptyQs.length === 0, nonEmptyQs, result };
  }

  async peek(n = 1, options: PeekParams | null = null): Promise<Message[]> {
    const queues = await this.getQueuesFunc();
    const qServices: QueueDetails[] = shuffle(this._getQServices(queues));
    const perQ = qServices.length > 1 ? Math.floor(n / qServices.length) : qServices.length;

    // First, iterate evenly and randomly on status queues
    const partial = await this._peek(qServices, perQ, options);

    if (partial.done) {
      return partial.result;
    }
    const messagesLeftToPeek = n - partial.result.length;

    // In case queues are uneven, iterate again. This time, request for all n messages and trim
    return (await this._peek(partial.nonEmptyQs, messagesLeftToPeek, options)).result;
  }

  async _pop(
    qs: QueueDetails[],
    n: number,
    options: PopParams | null
  ): Promise<{
    result: Message[] & { nonEmptyQs?: QueueDetails[] };
    nonEmptyQs: any[];
    done: boolean;
  }> {
    const nonEmptyQs: any[] = [];
    const result = [];

    for (const q of qs) {
      const response = await q.service.receiveMessages({ numOfMessages: n });
      const messages = response.receivedMessageItems;
      for (const m of messages) {
        if (m && Object.keys(m).length > 0) {
          result.push(options && options.raw ? m : this.deserializeMessage(m));

          if (!(options && !options.remove)) {
            await q.service.deleteMessage(m.messageId, m.popReceipt);
          }
          if (result.length === n) {
            return { done: true, nonEmptyQs, result };
          }
        }
      }
    }

    return { done: nonEmptyQs.length === 0, nonEmptyQs, result };
  }

  async pop(n = 1, options: PopParams | null = null): Promise<Message[]> {
    const queues = await this.getQueuesFunc();
    const qServices = shuffle(this._getQServices(queues));
    const perQ = qServices.length > 1 ? Math.floor(n / qServices.length) : qServices.length;

    // First, iterate evenly and randomly on status queues
    const partial = await this._pop(qServices, perQ, options);
    if (partial.done) {
      return partial.result;
    }

    const messagesLeftToPop = n - partial.result.length;

    // In case queues are uneven, iterate again. This time, request for all n messages and trim
    const final = await this._pop(partial.result.nonEmptyQs ?? [], messagesLeftToPop, options);
    return partial.result.concat(final.result);
  }
}
