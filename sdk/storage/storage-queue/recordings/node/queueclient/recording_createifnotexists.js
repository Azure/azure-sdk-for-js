let nock = require('nock');

module.exports.hash = "40ed65f81a62b4b9c0e44b0c82d4a02e";

module.exports.testInfo = {"uniqueName":{"queue":"queue158978149547700911"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149547700911')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46faa11-8003-0050-79d9-2c605f000000',
  'x-ms-client-request-id',
  '0351f48a-f4c4-43d1-98f9-ff6b62df0751',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:13 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149547700911')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fab08-8003-0050-62d9-2c605f000000',
  'x-ms-client-request-id',
  'd96c803b-f773-4ece-b9af-18ad3b7a69e4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:13 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149547700911')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueAlreadyExists</Code><Message>The specified queue already exists.\nRequestId:f46fac03-8003-0050-52d9-2c605f000000\nTime:2020-05-18T05:58:14.3411781Z</Message></Error>", [
  'Content-Length',
  '222',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fac03-8003-0050-52d9-2c605f000000',
  'x-ms-client-request-id',
  'a425cd6c-4a10-4ec0-b87c-916af7d39185',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'QueueAlreadyExists',
  'Date',
  'Mon, 18 May 2020 05:58:14 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158978149547700911')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46facf2-8003-0050-36d9-2c605f000000',
  'x-ms-client-request-id',
  '62b3bb18-cc28-4e10-b6e0-070d3e352bb4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:14 GMT'
]);
