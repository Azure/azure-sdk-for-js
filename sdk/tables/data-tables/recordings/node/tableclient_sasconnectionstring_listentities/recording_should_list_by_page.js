let nock = require('nock');

module.exports.hash = "8015382b08291614e39816ac197cc8df";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.8959106Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-06-04T21:59:49.8959106Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9279334Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-06-04T21:59:49.9279334Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2371531Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-06-04T21:59:50.2371531Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2681752Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-06-04T21:59:50.2681752Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3082041Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-06-04T21:59:50.3082041Z","foo":"testEntity"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0bb6-c002-0024-1e8c-5918f1000000',
  'x-ms-client-request-id',
  '8a18efb3-9e86-415e-8451-673f0c8988c5',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTM-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3402268Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-06-04T21:59:50.3402268Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3712484Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-06-04T21:59:50.3712484Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.4182823Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-06-04T21:59:50.4182823Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.4493039Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-06-04T21:59:50.4493039Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.480326Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-06-04T21:59:50.480326Z","foo":"testEntity"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0bbd-c002-0024-248c-5918f1000000',
  'x-ms-client-request-id',
  '50a3b0fc-92c4-4399-8289-6d4d4cb6e38e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTg-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.514351Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-06-04T21:59:50.514351Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.5463733Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-06-04T21:59:50.5463733Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9609569Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-06-04T21:59:49.9609569Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9909782Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-06-04T21:59:49.9909782Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0220002Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-06-04T21:59:50.0220002Z","foo":"testEntity"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0bc7-c002-0024-2e8c-5918f1000000',
  'x-ms-client-request-id',
  '9866ffea-33b0-428e-8207-30bcfbf0800c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!NQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0540239Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-06-04T21:59:50.0540239Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0870465Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-06-04T21:59:50.0870465Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.1170678Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-06-04T21:59:50.1170678Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.1651019Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-06-04T21:59:50.1651019Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2031294Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-06-04T21:59:50.2031294Z","foo":"testEntity"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0bd8-c002-0024-3f8c-5918f1000000',
  'x-ms-client-request-id',
  '2077fc9e-3c35-49cc-a6ed-c46735315dfd',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!12!YmluYXJ5MQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.864889Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-06-04T21:59:49.864889Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0be3-c002-0024-4a8c-5918f1000000',
  'x-ms-client-request-id',
  '7c6507df-1cc6-4a3b-9680-b8672ac83d06',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);
