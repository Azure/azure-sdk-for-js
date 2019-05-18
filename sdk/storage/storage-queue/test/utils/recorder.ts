import fs from "fs";
import nise from "nise";
import { getUniqueName } from "../utils";
import { isBrowser } from "./testutils.common";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

let nock: any;
if (!isBrowser()) {
  nock = require("nock");
}

function readFileInBrowser(_filename: string): any {
  // TODO (testing only messagesurl.test.ts => enqueue, peek, dequeue and clear message with all parameters)
  let recordings = [{"method":"PUT","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458","requestBody":null,"status":201,"response":"","responseHeaders":{"x-ms-request-id":"a4a34a74-a003-007c-6a79-0b006d000000","x-ms-version":"2018-03-28","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","date":"Wed, 15 May 2019 23:57:42 GMT","content-length":"0"}},{"method":"POST","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>","status":201,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>776f1d33-bc57-4c87-b6d0-8a69609c9cc9</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAApcCN/HkL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:57:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34ab3-a003-007c-1b79-0b006d000000","x-ms-version":"2018-03-28"}},{"method":"POST","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>","status":201,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>35601b0e-c188-487e-9f30-896de4c84fcb</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA6yif/HkL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:57:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34ac0-a003-007c-2879-0b006d000000","x-ms-version":"2018-03-28"}},{"method":"POST","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>","status":201,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>6752c125-bc6b-47ca-872f-1c88dc60ade9</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:57:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAACIS0/3kL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:57:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34ad4-a003-007c-3979-0b006d000000","x-ms-version":"2018-03-28"}},{"method":"POST","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>","status":201,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>61cc10eb-3fac-4c51-9e61-1955a8ac7aef</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:03 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAqiknCHoL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:58:02 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34af7-a003-007c-5779-0b006d000000","x-ms-version":"2018-03-28"}},{"method":"GET","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":null,"status":200,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>776f1d33-bc57-4c87-b6d0-8a69609c9cc9</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>35601b0e-c188-487e-9f30-896de4c84fcb</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34b3a-a003-007c-1679-0b006d000000","cache-control":"no-cache","x-ms-version":"2018-03-28"}},{"method":"GET","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":null,"status":200,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>776f1d33-bc57-4c87-b6d0-8a69609c9cc9</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAfdv+AnoL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:57:54 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>35601b0e-c188-487e-9f30-896de4c84fcb</MessageId><InsertionTime>Wed, 15 May 2019 23:57:43 GMT</InsertionTime><ExpirationTime>Wed, 15 May 2019 23:58:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAfdv+AnoL1QE=</PopReceipt><TimeNextVisible>Wed, 15 May 2019 23:57:54 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>","responseHeaders":{"date":"Wed, 15 May 2019 23:57:43 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34b71-a003-007c-4d79-0b006d000000","cache-control":"no-cache","x-ms-version":"2018-03-28"}},{"method":"GET","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458/messages","requestBody":null,"status":200,"response":"<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />","responseHeaders":{"date":"Wed, 15 May 2019 23:57:44 GMT","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","transfer-encoding":"chunked","content-type":"application/xml","x-ms-request-id":"a4a34b85-a003-007c-5f79-0b006d000000","cache-control":"no-cache","x-ms-version":"2018-03-28"}},{"method":"DELETE","url":"https://coolstorageaccount1234.queue.core.windows.net/queue155796466247502458","requestBody":null,"status":204,"response":"","responseHeaders":{"x-ms-request-id":"a4a34b9c-a003-007c-7579-0b006d000000","x-ms-version":"2018-03-28","server":"Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0","date":"Wed, 15 May 2019 23:57:44 GMT","content-length":"0"}}];
  let uniqueTestInfo = {queue: 'queue155796466247502458'};
  return [recordings, uniqueTestInfo];
}

/**
 * Possible reasons for skipping a test:
 * * Character: there are characters in the message that are not supported in browser logging
 * * Progress: Nock does not record a request if it's aborted in a 'progress' callback
 * * Size: the generated recording file is too big and would considerably increase the size of the package
 * * Tempfile: the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
 * * UUID: a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it
*/
const skip: any = [
  // Character
  "browsers/messagesurl/recording_enqueue_peek_dequeue_special_characters.json"
];

function formatPath(path: string): string {
  return path
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/<=/g, "lte")
    .replace(/>=/g, "gte")
    .replace(/</g, "lt")
    .replace(/>/g, "gt")
    .replace(/=/g, "eq")
    .replace(/\W/g, "");
}

function nockRecorder(folderpath: string, testTitle: string) {
  const filename = "recording_" + testTitle;
  const fp = "node/" + formatPath(folderpath) + "/" + formatPath(filename) + ".js";
  const importNock = "let nock = require('nock');\n";
  let uniqueTestInfo: any = {};

  return {
    skip: skip.includes(fp),
    getUniqueTestInfoHandle: () => uniqueTestInfo,
    record: function() {
      nock.recorder.rec({
        dont_print: true
      });
    },
    playback: function() {
      uniqueTestInfo = require("../../recordings/" + fp).testInfo;
    },
    stop: function() {
      let fixtures = nock.recorder.play();
      let file = fs.createWriteStream("./recordings/" + fp, { flags: "w" });
      file.on("error", err => console.log(err));
      file.write(importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(uniqueTestInfo) + "\n");
      for (let i = 0; i < fixtures.length; i++) {
        file.write(fixtures[i] + "\n");
      }
      file.end();
      nock.recorder.clear();
      nock.restore();
    }
  };
}

function niseRecorder(folderpath: string, testTitle: string) {
  const filename = "recording_" + testTitle;
  const fp = "browsers/" + formatPath(folderpath) + "/" + formatPath(filename) + ".json";
  let uniqueTestInfo: any = {};
  let recordings: any[] = [];
  let xhr: nise.FakeXMLHttpRequestStatic;

  return {
    skip: skip.includes(fp),
    getUniqueTestInfoHandle: () => uniqueTestInfo,
    record: function() {
      xhr = nise.fakeXhr.useFakeXMLHttpRequest();
      xhr.useFilters = true;
      xhr.addFilter(() => true);

      xhr.onCreate = function(req: any) {
        const reqOpen = req.open;
        req.open = function() {
          reqOpen.apply(req, arguments);

          const reqSend = req.send;
          req.send = function(data: any) {
            const reqStateChange = req.onreadystatechange;
            req.onreadystatechange = function() {
              if (req.readyState === 4) {
                recordRequest(req, data);
              }
              reqStateChange && reqStateChange.apply(null, arguments);
            }
            reqSend.apply(req, arguments);
          }
        }
      }

      function recordRequest(req: any, requestBody: any) {
        const responseHeaders: any = {};
        const responseHeadersPairs = req.getAllResponseHeaders().split("\r\n");
        for (const pair of responseHeadersPairs) {
          const [key, value] = pair.split(": ");
          responseHeaders[key] = value;
        }

        recordings.push({
          method: req.method,
          url: req.url.split("?")[0],
          requestBody: requestBody,
          status: req.status,
          response: req.response,
          responseHeaders: responseHeaders
        });
      }
    },
    playback: function() {
      xhr = nise.fakeXhr.useFakeXMLHttpRequest();
      [recordings, uniqueTestInfo] = readFileInBrowser("./recordings/" + fp);

      xhr.onCreate = function(req: any) {
        const reqSend = req.send;
        req.send = function() {
          reqSend.apply(req, arguments);

          let recordingFound = false;
          for (let i = 0; !recordingFound && i < recordings.length; i++) {
            if (matchRequest(recordings[i], req)) {
              let status = recordings[i].status;
              let responseHeaders = recordings[i].responseHeaders;
              let response = recordings[i].response;
              setTimeout(() => req.respond(status, responseHeaders, response));
              recordings.splice(i, 1);
              recordingFound = true;
            }
          }
        }
      }

      // We're not matching request headers nor query string parameters
      function matchRequest(recording: any, req: any): boolean {
        return (
          recording.method === req.method &&
          recording.url === req.url.split("?")[0] &&
          recording.requestBody === req.requestBody
        );
      }
    },
    stop: function() {
      console.log(JSON.stringify({
        writeFile: true,
        path: "./recordings/" + fp,
        content: { recordings: recordings, uniqueTestInfo: uniqueTestInfo }
      }));
      xhr.restore();
    }
  };
}

export function record(this: any, folderpath: string, testTitle?: string) {
  let recorder: any;
  let isRecording: boolean;
  let isPlayingBack: boolean;

  if (isBrowser()) {
    recorder = niseRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = ((window as any).__env__.TEST_MODE === "record");
    isPlayingBack = ((window as any).__env__.TEST_MODE === "playback");
  } else {
    recorder = nockRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = (process.env.TEST_MODE === "record");
    isPlayingBack = (process.env.TEST_MODE === "playback");
  }

  if (recorder.skip && (isRecording || isPlayingBack)) {
    this.skip();
  }

  if (isRecording) {
    recorder.record();
  } else if (isPlayingBack) {
    recorder.playback();
  }

  const uniqueTestInfo = recorder.getUniqueTestInfoHandle();

  return {
    stop: function() {
      if (isRecording) {
        recorder.stop();
      }
    },
    getUniqueName: function(prefix: string, recorderId?: string): string {
      let name: string;
      if (!recorderId) {
        recorderId = prefix;
      }
      if (isRecording) {
        name = getUniqueName(prefix);
        uniqueTestInfo[recorderId] = name;
      }
      else if (isPlayingBack) {
        name = uniqueTestInfo[recorderId];
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(recorderId: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        uniqueTestInfo[recorderId] = date.toISOString();
      }
      else if (isPlayingBack) {
        date = new Date(uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
