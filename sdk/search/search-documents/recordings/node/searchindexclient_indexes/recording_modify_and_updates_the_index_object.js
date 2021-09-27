let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b787272b0737ff7e4e9effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ffabc64c1f058a903f1e7d449f355fb268d007faeafae28254685ed32768623ad33f5d5ffa415bbdcd97ddbf9f3189f413225f1d7c902fa7f535f7fa7b8100da6fb128caac86f27f64ad8a4ec88f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3f4dd6dcdea2060000"], [
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
  'W/"0x8D981F8BC8051CD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2fa5f832-0fcc-451a-86cc-6fb7100bb20e',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 20:52:40 GMT',
  'Content-Length',
  '655'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes('hotel-live-test3')', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D981F8BC8051CD\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b78f26ce7c9a7c74f767edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcbdacea455616de27cdf5b25a5e2fbec85618e3f77fc9c80e33bbca9b6a912ff3a6799e5fe6250dd01bf4d36a0df40800771ce0ea0f5a50de3866f9db1bb27cc02356883fa421cff2665a17abb6a89634326fb4d1291634fdc12ab61b47ab6dbce1ea273f27e36db3a26c685cde584faac5aaccdfbdc12784678ffd49cabc374eaab2cca7a0d8165e1642dda1ef055b19a1d0e0ff7b94f269352f66b37cf9ddbcb898b7343c1d3ec67cb66cefedd147d26b80e94d43d6cffedf346637e2326bdaaf56a45af3d9971d79784a1fbe2916f997e7e74d0e7248ef01c6fed8656a83a1cb47ff6f1af9f7e9a3c004f0c7a38fe8b3e64b560af481bebabeb820e391d7f4099a98cef44fd7977ed0566ff365f7ef674c20fd848857071fe4cb697dcdbdfe5e2080f65b2c8a32ab61f61e597baaf3f2e35f14d3ba6aaaf3767cfc83759d8f5f335dc64fbed8bbffdabd4704dd35e026f2cb2ff925ff0fe48886ad9c070000"], [
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
  'W/"0x8D981F8BF0B6AB0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '8ad27d15-cd77-44b4-8369-f3028a372707',
  'elapsed-time',
  '124',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 20:52:40 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b78f26ce7c9a7c74f767edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcbdacea455616de27cdf5b25a5e2fbec85618e3f77fc9c80e33bbca9b6a912ff3a6799e5fe6250dd01bf4d36a0df40800771ce0ea0f5a50de3866f9db1bb27cc02356883fa421cff2665a17abb6a89634326fb4d1291634fdc12ab61b47ab6dbce1ea273f27e36db3a26c685cde584faac5aaccdfbdc12784678ffd49cabc374eaab2cca7a0d8165e1642dda1ef055b19a1d0e0ff7b94f269352f66b37cf9ddbcb898b7343c1d3ec67cb66cefedd147d26b80e94d43d6cffedf346637e2326bdaaf56a45af3d9971d79784a1fbe2916f997e7e74d0e7248ef01c6fed8656a83a1cb47ff6f1af9f7e9a3c004f0c7a38fe8b3e64b560af481bebabeb820e391d7f4099a98cef44fd7977ed0566ff365f7ef674c20fd848857071fe4cb697dcdbdfe5e2080f65b2c8a32ab61f61e597baaf3f2e35f14d3ba6aaaf3767cfc83759d8f5f335dc64fbed8bbffdabd4704dd35e026f2cb2ff925ff0fe48886ad9c070000"], [
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
  'W/"0x8D981F8BF0B6AB0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a1929d91-7732-4db6-894f-baadbbc5626a',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 20:52:40 GMT',
  'Content-Length',
  '700'
]);
