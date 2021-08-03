let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1fdeff74f7f4d37b0f9e3ef9f4e9eeeffb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ffabc64c1f058a903f1e7d449f355fb268d007faeafae28254685ed32768623ad33f5d5ffa415bbdcd97ddbf9f3189f413225f1d7c902fa7f535f7fa7b8100da6fb128caac86f27f64ad8a4ec88f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3f4698a4b1a2060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9561E637DB6D1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2a8a1ab8-60b1-473b-b466-e58954cba5b6',
  'elapsed-time',
  '47',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 03 Aug 2021 01:31:20 GMT',
  'Content-Length',
  '656'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity"},"@odata.etag":"\"0x8D9561E637DB6D1\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1fdeff74f7f4d34f77f6774eefddff7d3fa256cb6c91d3d7f3aacdcbedb2b8ccb7d1ed3dfa66969f67ebb27d3dadea6279f1b2aece8b929a2ed76539fae8bcc8cb59f3d1a3effd6203a198d13bedf50abf9fce16e3d72d5ea3cf04ed6c8297cfb3b2c9f176d9e675f0519d53fbfc523e6beb357dd454752b7f6b9bf36c4aa3f13f799b5f9bd64c80e365565eff20af0d9ad277f7d3acf3f7b2aa175959789f34d7cb6a79bdf8225b618cdfff25233bccec2a6faa45becc9be6797e999734406fd04fab35d02300dc7180ab3f684179e398e56f6fc8f2018f5821fe90863ccb9b695dacdaa25ad2c8bcd146a758d0f407abd86e1cadb6f186ab9ffc9c8cb7cd8ab2a17179633da916ab327ff7069f109e3df62729f3de38a9ca329f82625b7859087587be176c65844283ffef51caa7d5bc98cdf2e577f3e262ded2f074f818f3d9b2bdb7471f49af01a6370d593ffb7fd398dd88cbac69bf5a916acd675f76e4e1297df8a658e45f9e9f3739c821bd0718fb6397a90d862e1ffdbf69e4dfa78f0213c01f8f3ea2cf9a2f5929d007faeafae2828c475ed32768623ad33f5d5ffa415bbdcd97ddbf9f3181f413225e1d7c902fa7f535f7fa7b8100da6fb128caac86d97b64eda9cecb8f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3f0710a2079c070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9561E66040E35"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '41b49530-91d5-47a3-b1ee-763fbe05b945',
  'elapsed-time',
  '120',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 03 Aug 2021 01:31:20 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1fdeff74f7f4d34f77f6774eefddff7d3fa256cb6c91d3d7f3aacdcbedb2b8ccb7d1ed3dfa66969f67ebb27d3dadea6279f1b2aece8b929a2ed76539fae8bcc8cb59f3d1a3effd6203a198d13bedf50abf9fce16e3d72d5ea3cf04ed6c8297cfb3b2c9f176d9e675f0519d53fbfc523e6beb357dd454752b7f6b9bf36c4aa3f13f799b5f9bd64c80e365565eff20af0d9ad277f7d3acf3f7b2aa175959789f34d7cb6a79bdf8225b618cdfff25233bccec2a6faa45becc9be6797e999734406fd04fab35d02300dc7180ab3f684179e398e56f6fc8f2018f5821fe90863ccb9b695dacdaa25ad2c8bcd146a758d0f407abd86e1cadb6f186ab9ffc9c8cb7cd8ab2a17179633da916ab327ff7069f109e3df62729f3de38a9ca329f82625b7859087587be176c65844283ffef51caa7d5bc98cdf2e577f3e262ded2f074f818f3d9b2bdb7471f49af01a6370d593ffb7fd398dd88cbac69bf5a916acd675f76e4e1297df8a658e45f9e9f3739c821bd0718fb6397a90d862e1ffdbf69e4dfa78f0213c01f8f3ea2cf9a2f5929d007faeafae2828c475ed32768623ad33f5d5ffa415bbdcd97ddbf9f3181f413225e1d7c902fa7f535f7fa7b8100da6fb128caac86d97b64eda9cecb8f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3f0710a2079c070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9561E66040E35"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd58b71c6-75e5-47d9-ac07-b8495c67289a',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 03 Aug 2021 01:31:20 GMT',
  'Content-Length',
  '700'
]);
