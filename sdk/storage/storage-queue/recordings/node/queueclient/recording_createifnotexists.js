let nock = require('nock');

module.exports.hash = "92bb428ef916f02881e1e1e65360e11c";

module.exports.testInfo = {"uniqueName":{"queue":"queue159342573372108514","queue2":"queue2159342573572002007"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue159342573372108514')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4018d72-b003-0006-80fe-4d91b0000000',
  'x-ms-client-request-id',
  '45162f72-d550-4a1d-a568-55c8edff79bb',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:32 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue159342573372108514')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4018e84-b003-0006-80fe-4d91b0000000',
  'x-ms-client-request-id',
  '5db6d0d1-40d6-4f3e-a210-dd0ab54a45b7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:32 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue159342573372108514')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueAlreadyExists</Code><Message>The specified queue already exists.\nRequestId:b4018fad-b003-0006-22fe-4d91b0000000\nTime:2020-06-29T10:15:33.9408867Z</Message></Error>", [
  'Content-Length',
  '222',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4018fad-b003-0006-22fe-4d91b0000000',
  'x-ms-client-request-id',
  '6f861410-8cd7-408d-91db-16772fdab949',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'QueueAlreadyExists',
  'Date',
  'Mon, 29 Jun 2020 10:15:33 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue2159342573572002007')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b401912f-b003-0006-14fe-4d91b0000000',
  'x-ms-client-request-id',
  '8335994f-950a-4ccf-8a81-55f3fbf17b92',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:33 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue2159342573572002007')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4019261-b003-0006-3dfe-4d91b0000000',
  'x-ms-client-request-id',
  '6984a66e-60e3-479a-b355-f560742c5ecd',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:33 GMT'
]);
