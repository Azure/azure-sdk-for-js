let nock = require('nock');

module.exports.hash = "ef71ed1d7a755db09faa585b94f68a33";

module.exports.testInfo = {"uniqueName":{"queue":"queue158978149318207514","queue158978149318207514":"queue158978149318207514158978149486703820"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149318207514')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fa64d-8003-0050-68d9-2c605f000000',
  'x-ms-client-request-id',
  'a25183a1-affc-48dc-96b5-33a26535f00d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:12 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158978149318207514')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fa72f-8003-0050-3dd9-2c605f000000',
  'x-ms-client-request-id',
  '7ed17f4e-0dcc-4e43-9493-75f5ce167a08',
  'x-ms-version',
  '2019-07-07',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:58:12 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158978149318207514158978149486703820')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:f46fa838-8003-0050-39d9-2c605f000000\nTime:2020-05-18T05:58:13.1343246Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fa838-8003-0050-39d9-2c605f000000',
  'x-ms-client-request-id',
  '4bdcd298-4f43-4226-84b3-a0fa348d650b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:58:12 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158978149318207514')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fa938-8003-0050-29d9-2c605f000000',
  'x-ms-client-request-id',
  '21ec402a-eb02-441f-a8be-fa104430e8ed',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:13 GMT'
]);
