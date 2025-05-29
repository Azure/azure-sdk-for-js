// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncGenerator, __asyncValues, __await } from "tslib";
import { createStream, ensureAsyncIterable } from "./utils.js";
var ControlChars;
(function (ControlChars) {
    ControlChars[ControlChars["NewLine"] = 10] = "NewLine";
    ControlChars[ControlChars["CarriageReturn"] = 13] = "CarriageReturn";
    ControlChars[ControlChars["Space"] = 32] = "Space";
    ControlChars[ControlChars["Colon"] = 58] = "Colon";
})(ControlChars || (ControlChars = {}));
export function createSseStream(chunkStream) {
    const { cancel, iterable } = ensureAsyncIterable(chunkStream);
    const asyncIter = toMessage(toLine(iterable));
    return createStream(asyncIter, cancel);
}
function concatBuffer(a, b) {
    const res = new Uint8Array(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
}
function createMessage() {
    return {
        data: undefined,
        event: "",
        id: "",
        retry: undefined,
    };
}
function toLine(chunkIter) {
    return __asyncGenerator(this, arguments, function* toLine_1() {
        var _a, e_1, _b, _c;
        let buf;
        let bufIdx = 0;
        let fieldLen = -1;
        let discardTrailingNewline = false;
        try {
            for (var _d = true, chunkIter_1 = __asyncValues(chunkIter), chunkIter_1_1; chunkIter_1_1 = yield __await(chunkIter_1.next()), _a = chunkIter_1_1.done, !_a; _d = true) {
                _c = chunkIter_1_1.value;
                _d = false;
                const chunk = _c;
                if (buf === undefined) {
                    buf = chunk;
                    bufIdx = 0;
                    fieldLen = -1;
                }
                else {
                    buf = concatBuffer(buf, chunk);
                }
                const bufLen = buf.length;
                let start = 0;
                while (bufIdx < bufLen) {
                    if (discardTrailingNewline) {
                        if (buf[bufIdx] === ControlChars.NewLine) {
                            start = ++bufIdx;
                        }
                        discardTrailingNewline = false;
                    }
                    let end = -1;
                    for (; bufIdx < bufLen && end === -1; ++bufIdx) {
                        switch (buf[bufIdx]) {
                            case ControlChars.Colon:
                                if (fieldLen === -1) {
                                    fieldLen = bufIdx - start;
                                }
                                break;
                            case ControlChars.CarriageReturn:
                                // We need to discard the trailing newline if any but can't do
                                // that now because we need to dispatch the current line first.
                                discardTrailingNewline = true;
                                end = bufIdx;
                                break;
                            case ControlChars.NewLine:
                                end = bufIdx;
                                break;
                        }
                    }
                    if (end === -1) {
                        // We reached the end of the buffer but the line hasn't ended.
                        // Wait for the next chunk and then continue parsing:
                        break;
                    }
                    yield yield __await({ line: buf.subarray(start, end), fieldLen });
                    start = bufIdx; // we're now on the next line
                    fieldLen = -1;
                }
                if (start === bufLen) {
                    buf = undefined;
                }
                else if (start !== 0) {
                    // discard already processed lines
                    buf = buf.subarray(start);
                    bufIdx -= start;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = chunkIter_1.return)) yield __await(_b.call(chunkIter_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function toMessage(lineIter) {
    return __asyncGenerator(this, arguments, function* toMessage_1() {
        var _a, e_2, _b, _c;
        let message = createMessage();
        const decoder = new TextDecoder();
        try {
            for (var _d = true, lineIter_1 = __asyncValues(lineIter), lineIter_1_1; lineIter_1_1 = yield __await(lineIter_1.next()), _a = lineIter_1_1.done, !_a; _d = true) {
                _c = lineIter_1_1.value;
                _d = false;
                const { line, fieldLen } = _c;
                if (line.length === 0 && message.data !== undefined) {
                    // empty line denotes end of message. Yield and start a new message:
                    yield yield __await(message);
                    message = createMessage();
                }
                else if (fieldLen > 0) {
                    // exclude comments and lines with no values
                    // line is of format "<field>:<value>" or "<field>: <value>"
                    // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
                    const field = decoder.decode(line.subarray(0, fieldLen));
                    const valueOffset = fieldLen + (line[fieldLen + 1] === ControlChars.Space ? 2 : 1);
                    const value = decoder.decode(line.subarray(valueOffset));
                    switch (field) {
                        case "data":
                            message.data = message.data ? message.data + "\n" + value : value;
                            break;
                        case "event":
                            message.event = value;
                            break;
                        case "id":
                            message.id = value;
                            break;
                        case "retry": {
                            const retry = parseInt(value, 10);
                            if (!isNaN(retry)) {
                                message.retry = retry;
                            }
                            break;
                        }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = lineIter_1.return)) yield __await(_b.call(lineIter_1));
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
}
//# sourceMappingURL=sse.js.map