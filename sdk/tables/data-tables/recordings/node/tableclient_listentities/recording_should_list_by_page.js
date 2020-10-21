let nock = require('nock');

module.exports.hash = "b6f28d51c45829e8db614c07c53360e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A35.9250294Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2020-10-01T00:38:35.9250294Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A35.9550491Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2020-10-01T00:38:35.9550491Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.2812729Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2020-10-01T00:38:36.2812729Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.310293Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2020-10-01T00:38:36.310293Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.3393127Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2020-10-01T00:38:36.3393127Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad1dc490-4002-0045-6a8b-977468000000',
  'x-ms-client-request-id',
  'e2a07e96-5645-4408-8154-5492ea9ad446',
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
  'Thu, 01 Oct 2020 00:38:35 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.3683332Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2020-10-01T00:38:36.3683332Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.4003543Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2020-10-01T00:38:36.4003543Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.4293744Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2020-10-01T00:38:36.4293744Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.4573945Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2020-10-01T00:38:36.4573945Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.4854129Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2020-10-01T00:38:36.4854129Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad1dc494-4002-0045-6c8b-977468000000',
  'x-ms-client-request-id',
  '1c1f03ee-f953-4a97-9744-430120a641a4',
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
  'Thu, 01 Oct 2020 00:38:35 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.5134321Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2020-10-01T00:38:36.5134321Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.5424518Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2020-10-01T00:38:36.5424518Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A35.9840688Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2020-10-01T00:38:35.9840688Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.0401072Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2020-10-01T00:38:36.0401072Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.0781338Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2020-10-01T00:38:36.0781338Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad1dc498-4002-0045-6f8b-977468000000',
  'x-ms-client-request-id',
  'fea3f22c-f10e-432b-b3e7-3966cf9f10e8',
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
  'Thu, 01 Oct 2020 00:38:35 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.1101562Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2020-10-01T00:38:36.1101562Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.1421772Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2020-10-01T00:38:36.1421772Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.1832056Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2020-10-01T00:38:36.1832056Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.2202312Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2020-10-01T00:38:36.2202312Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A36.2522527Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2020-10-01T00:38:36.2522527Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad1dc499-4002-0045-708b-977468000000',
  'x-ms-client-request-id',
  'b4864360-b171-4406-a7c7-479259365c81',
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
  'Thu, 01 Oct 2020 00:38:35 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A35.8940075Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2020-10-01T00:38:35.8940075Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad1dc49c-4002-0045-738b-977468000000',
  'x-ms-client-request-id',
  'd3e3ffdb-f3be-47d2-8144-84bf80c7e450',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Oct 2020 00:38:35 GMT'
]);
