let nock = require('nock');

module.exports.hash = "740b89ba8f2887e9771cdf91cd357600";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P2_node","RowKey":"R2","testField":"2020-09-17T00:00:00.111Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.1047702Z\'"',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R2\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c1d-c002-0024-038c-5918f1000000',
  'x-ms-client-request-id',
  'ddac4a25-e072-4473-a381-7659c6e0629c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R2\')',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R2')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A51.1047702Z'\"","PartitionKey":"P2_node","RowKey":"R2","Timestamp":"2021-06-04T21:59:51.1047702Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.111Z"}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.1047702Z\'"',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c21-c002-0024-078c-5918f1000000',
  'x-ms-client-request-id',
  'f7d8eefa-1b6b-4ac7-b5a4-71aa0ad7b1a2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R2')`)
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c27-c002-0024-0d8c-5918f1000000',
  'x-ms-client-request-id',
  'd18286b1-bc60-4d94-b4f7-ee04fe033460',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);
