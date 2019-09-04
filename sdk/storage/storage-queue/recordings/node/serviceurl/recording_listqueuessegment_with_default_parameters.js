let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Queues><Queue><Name>queue156741900256402767156741900295902414</Name></Queue><Queue><Name>queue156741901891306257x1</Name></Queue><Queue><Name>queue156741901891306257x2</Name></Queue><Queue><Name>queue156741904408707231</Name></Queue><Queue><Name>queue156741957154704770156741957198104078</Name></Queue><Queue><Name>queue156741961394700063</Name></Queue><Queue><Name>queue156741965624008264156741965644308732</Name></Queue><Queue><Name>queue156758134119509622156758134160700556</Name></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e34793de-7003-0100-67f0-62098e000000',
  'x-ms-client-request-id',
  '6f994d64-0f7d-49ba-af9e-e9ee9a96f484',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:57 GMT',
  'Connection',
  'close' ]);

