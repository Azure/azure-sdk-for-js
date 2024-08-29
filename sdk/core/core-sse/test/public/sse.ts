// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventMessage } from "../../src/index.js";
import {
  assertAsyncIterable,
  genChunks,
  createChunkedEvent,
  createDataEvent,
  createDataLine,
  createId,
  createType,
  decoder,
  encoder,
  genComments,
  genEvents,
  genLines,
  genStrs,
  createRetry,
} from "./util.js";
import { describe, it, assert, SuiteCollector } from "vitest";
import { matrix } from "../matrix.js";

export function buildSseTests(
  rtName: string,
  createStream: (cb: (write: (chunk: Uint8Array) => void) => void) => AsyncIterable<EventMessage>,
): SuiteCollector {
  return describe(`[${rtName}] Server-sent Events`, () => {
    matrix([[0, 1, 2, 10000]], async function (count: number) {
      matrix([[1, 3, 10]], async function (chunkLen: number) {
        it(`handles ${count} events chunked into chunks of length ${chunkLen}`, async () => {
          const stream = createStream((write) => {
            for (const c of genChunks(genEvents(genStrs(count)), 3)) {
              write(c);
            }
          });
          const iter = genStrs(count);
          await assertAsyncIterable(stream, count, (event) => {
            const { value, done } = iter.next();
            if (done) return;
            assert.deepEqual(event.data, decoder.decode(value));
          });
        });
      });
    });

    it("handles non-ASCII text event across multiple chunks", async function () {
      const txt = `OpenAI（开放人工智能研究中心）是一個美国人工智能研究實驗室，由非營利組織OpenAI Inc，和其營利組織子公司OpenAI LP所組成。OpenAI 進行 AI 研究的目的是促進和发展友好的人工智能，使人类整体受益。 OpenAI 系統運行在微軟基於 Azure 的超級計算平台上。該組織於2015年由萨姆·阿尔特曼、里德·霍夫曼、Jessica Livingston、伊隆·马斯克、伊爾亞·蘇茨克維、沃伊切赫·扎伦巴 (Wojciech Zaremba)、彼得·泰爾 等人在旧金山成立，他們共同認捐了$10億美元。 微軟在2019年向 OpenAI LP 提供了$10億美元的投資，並在2023年1月向其提供了第二筆多年投資，據報導為$100億美元， 用於獨家訪問GPT-4，這將為微軟自己的Bing Prometheus 模型提供支持`;
      const stream = createStream((write) => {
        for (const chunk of createChunkedEvent(txt, 10)) {
          write(chunk);
        }
      });
      let resTxt = "";
      await assertAsyncIterable(stream, 1, (event) => {
        if (!resTxt) {
          resTxt = event.data;
        }
      });
      assert.equal(resTxt, txt);
    });

    it("handles a single event across multiple lines", async function () {
      const count = 10;
      const stream = createStream((write) => {
        for (const line of genLines(genStrs(count))) {
          write(line);
        }
      });
      let resTxt = "";
      await assertAsyncIterable(stream, 1, (event) => {
        if (!resTxt) {
          resTxt = event.data;
        }
      });
      assert.equal(resTxt.split("\n").length, count);
    });

    it("ignores comments", async function () {
      const count = 10;
      const stream = createStream((write) => {
        for (const comment of genComments(genStrs(count))) {
          write(comment);
        }
      });
      await assertAsyncIterable(stream, 0, () => {
        assert.fail("should not have received any events");
      });
    });

    it("handles IDs", async function () {
      const stream = createStream((write) => {
        write(createDataLine(encoder.encode("foo")));
        write(createId(encoder.encode("1")));
        write(encoder.encode("\n"));
        write(createDataEvent(encoder.encode("bar")));
        write(createId(Uint8Array.from([])));
        write(encoder.encode("\n"));
      });
      const ids = ["1", ""];
      await assertAsyncIterable(stream, 2, (event, i) => {
        assert.equal(event.id, ids[i]);
      });
    });

    it("handles event types", async function () {
      const stream = createStream((write) => {
        write(createType(encoder.encode("foo")));
        write(createDataLine(encoder.encode("bar")));
        write(encoder.encode("\n"));
      });
      await assertAsyncIterable(stream, 1, (event) => {
        assert.equal(event.event, "foo");
      });
    });

    it("handles retry", async function () {
      const stream = createStream((write) => {
        write(createDataLine(encoder.encode("foo")));
        write(createRetry(encoder.encode("1")));
        write(encoder.encode("\n\n"));
      });
      await assertAsyncIterable(stream, 1, (event) => {
        assert.equal(event.retry, 1);
      });
    });

    it("handles multiple colons", async function () {
      const str = "foo:bar:baz";
      const stream = createStream((write) => {
        write(createDataEvent(encoder.encode(str)));
      });
      await assertAsyncIterable(stream, 1, (event) => {
        assert.equal(event.data, str);
      });
    });

    it("ignores lines without fields", async function () {
      const stream = createStream((write) => {
        write(encoder.encode("foo"));
      });
      await assertAsyncIterable(stream, 0, () => {
        assert.fail("should not have received any events");
      });
    });

    it("ignores lines with unknown fields", async function () {
      const stream = createStream((write) => {
        write(encoder.encode("foo: bar"));
      });
      await assertAsyncIterable(stream, 0, () => {
        assert.fail("should not have received any events");
      });
    });

    it("ignores non-integer retry", async function () {
      const stream = createStream((write) => {
        write(createDataLine(encoder.encode("foo")));
        write(createRetry(encoder.encode("bar")));
        write(encoder.encode("\n\n"));
      });
      await assertAsyncIterable(stream, 1, (event) => {
        assert.isUndefined(event.retry);
      });
    });
  });
}
