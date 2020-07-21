let nock = require('nock');

module.exports.hash = "0fe0ca4b1f953636dbf73ff0a3b3e6c1";

module.exports.testInfo = {"uniqueName":{"queue":"queue159342573634603293","queue159342573634603293":"queue159342573634603293159342573664608502"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue159342573634603293')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b401936b-b003-0006-40fe-4d91b0000000',
  'x-ms-client-request-id',
  'aa162b01-9a15-48ab-a0bc-1e4e7c004136',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:34 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue159342573634603293159342573664608502')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:b4019487-b003-0006-4cfe-4d91b0000000\nTime:2020-06-29T10:15:35.1767529Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4019487-b003-0006-4cfe-4d91b0000000',
  'x-ms-client-request-id',
  'acf75a5a-3726-4b29-89e3-befc555c4b2b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'QueueNotFound',
  'Date',
  'Mon, 29 Jun 2020 10:15:34 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue159342573634603293159342573664608502')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b401955c-b003-0006-1cfe-4d91b0000000',
  'x-ms-client-request-id',
  '106f8138-0c66-475d-b1e6-6c1d518e1cd8',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:34 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue159342573634603293159342573664608502')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4019653-b003-0006-03fe-4d91b0000000',
  'x-ms-client-request-id',
  '8e671c7b-3eda-4e77-930e-90009cc08c58',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:35 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue159342573634603293')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4019771-b003-0006-1dfe-4d91b0000000',
  'x-ms-client-request-id',
  '9cf65e2e-d43c-41fa-b154-64d4879ae7e0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 10:15:35 GMT'
]);
