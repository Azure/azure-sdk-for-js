let nock = require('nock');

module.exports.hash = "1aaaf9d056b4eabfcaa061f70b932ee7";

module.exports.testInfo = {"uniqueName":{"queue":"queue158978149667203283","queue158978149667203283":"queue158978149667203283158978149696809280"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149667203283')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fadea-8003-0050-25d9-2c605f000000',
  'x-ms-client-request-id',
  '97dba666-e09c-43ff-a6e9-8d1264da40a2',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:14 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158978149667203283158978149696809280')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:f46faf0c-8003-0050-3dd9-2c605f000000\nTime:2020-05-18T05:58:15.2348136Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46faf0c-8003-0050-3dd9-2c605f000000',
  'x-ms-client-request-id',
  'f2a699b8-2645-4d28-9303-0b42f19c0d1c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'QueueNotFound',
  'Date',
  'Mon, 18 May 2020 05:58:15 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158978149667203283158978149696809280')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fb02b-8003-0050-4dd9-2c605f000000',
  'x-ms-client-request-id',
  '3487828b-b346-4b88-9ce9-8a39413172af',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:15 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158978149667203283158978149696809280')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fb0f6-8003-0050-0ed9-2c605f000000',
  'x-ms-client-request-id',
  'fa2a9c75-74c3-4c61-8eb7-3443a601389a',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:15 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158978149667203283')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f46fb1dd-8003-0050-71d9-2c605f000000',
  'x-ms-client-request-id',
  '2512a572-210b-40a8-a697-5dd82fcc8041',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:58:15 GMT'
]);
