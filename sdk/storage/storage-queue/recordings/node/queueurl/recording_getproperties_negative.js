let nock = require('nock');

module.exports.testInfo = {"queue":"queue155596606514607585","queue2":"queue155596606556907732"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596606514607585')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3420d750-3003-0036-1a4c-f9300a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:47:44 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596606556907732')
  .query({"comp":"metadata","timeout":"30"})
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:08b617bf-5003-0040-7e4c-f9b4b6000000\nTime:2019-04-22T20:47:45.9452658Z</Message></Error>", [ 'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08b617bf-5003-0040-7e4c-f9b4b6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:47:45 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596606514607585')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c88be64-6003-0007-5a4c-f96bdd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:47:46 GMT',
  'Connection',
  'close' ]);
