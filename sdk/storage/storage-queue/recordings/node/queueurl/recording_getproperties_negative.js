let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758133910307620","queue2":"queue156758133950507233"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758133910307620')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '38c1f36f-0003-003a-14f0-62edfb000000',
  'x-ms-client-request-id',
  '84aa3d51-1ea4-47c7-ab97-f0d86116d9c0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758133950507233')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:b2f76bb3-1003-009f-77f0-62bb81000000\nTime:2019-09-04T07:15:39.7539949Z</Message></Error>", [ 'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2f76bb3-1003-009f-77f0-62bb81000000',
  'x-ms-client-request-id',
  '27e948a3-b0a3-4e26-9f69-6e135a66e9a9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758133910307620')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '170f63e7-e003-00e9-52f0-6231c9000000',
  'x-ms-client-request-id',
  'c140fc89-324e-437f-83e1-3d53a453cb12',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:39 GMT',
  'Connection',
  'close' ]);

