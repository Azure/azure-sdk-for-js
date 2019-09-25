"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var src_1 = require("../src");
var identity_1 = require("@azure/identity");
// This sample list previously created certificates in a single chunk and by page,
// then changes one of them and lists all the versions of that certificate,
// then deletes them, then lists the deleted certificates.
function main() {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    return __awaiter(this, void 0, void 0, function () {
        var vaultName, url, credential, client, _e, _f, certificate, e_1_1, pageCount, _g, _h, page, _i, page_1, certificate, e_2_1, updatedCertificate, _j, _k, item, version, certificate, e_3_1, _l, _m, certificate, e_4_1;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    credential = new identity_1.DefaultAzureCredential();
                    client = new src_1.CertificatesClient(url, credential);
                    // Creating two self-signed certificates. They will appear as pending initially.
                    return [4 /*yield*/, client.createCertificate("MyCertificate1", {
                            issuerName: "Self",
                            subjectName: "cn=MyCert"
                        })];
                case 1:
                    // Creating two self-signed certificates. They will appear as pending initially.
                    _o.sent();
                    return [4 /*yield*/, client.createCertificate("MyCertificate2", {
                            issuerName: "Self",
                            subjectName: "cn=MyCert"
                        })];
                case 2:
                    _o.sent();
                    _o.label = 3;
                case 3:
                    _o.trys.push([3, 8, 9, 14]);
                    _e = __asyncValues(client.listCertificates({ includePending: true }));
                    _o.label = 4;
                case 4: return [4 /*yield*/, _e.next()];
                case 5:
                    if (!(_f = _o.sent(), !_f.done)) return [3 /*break*/, 7];
                    certificate = _f.value;
                    console.log("Certificate from a single call: ", certificate);
                    _o.label = 6;
                case 6: return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _o.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _o.trys.push([9, , 12, 13]);
                    if (!(_f && !_f.done && (_a = _e["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(_e)];
                case 10:
                    _o.sent();
                    _o.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    pageCount = 0;
                    _o.label = 15;
                case 15:
                    _o.trys.push([15, 20, 21, 26]);
                    _g = __asyncValues(client.listCertificates({ includePending: true }).byPage());
                    _o.label = 16;
                case 16: return [4 /*yield*/, _g.next()];
                case 17:
                    if (!(_h = _o.sent(), !_h.done)) return [3 /*break*/, 19];
                    page = _h.value;
                    for (_i = 0, page_1 = page; _i < page_1.length; _i++) {
                        certificate = page_1[_i];
                        console.log("Certificate from page " + pageCount + ": ", certificate);
                    }
                    pageCount++;
                    _o.label = 18;
                case 18: return [3 /*break*/, 16];
                case 19: return [3 /*break*/, 26];
                case 20:
                    e_2_1 = _o.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 26];
                case 21:
                    _o.trys.push([21, , 24, 25]);
                    if (!(_h && !_h.done && (_b = _g["return"]))) return [3 /*break*/, 23];
                    return [4 /*yield*/, _b.call(_g)];
                case 22:
                    _o.sent();
                    _o.label = 23;
                case 23: return [3 /*break*/, 25];
                case 24:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 25: return [7 /*endfinally*/];
                case 26: return [4 /*yield*/, client.updateCertificate("MyCertificate1", "", {
                        tags: {
                            customTag: "value"
                        }
                    })];
                case 27:
                    updatedCertificate = _o.sent();
                    console.log("Updated certificate:", updatedCertificate);
                    _o.label = 28;
                case 28:
                    _o.trys.push([28, 34, 35, 40]);
                    _j = __asyncValues(client.listCertificateVersions("MyCertificate1", {
                        includePending: true
                    }));
                    _o.label = 29;
                case 29: return [4 /*yield*/, _j.next()];
                case 30:
                    if (!(_k = _o.sent(), !_k.done)) return [3 /*break*/, 33];
                    item = _k.value;
                    version = item.properties.version;
                    return [4 /*yield*/, client.getCertificate("MyCertificate1", version)];
                case 31:
                    certificate = _o.sent();
                    console.log("Certificate from version " + version + ": ", certificate);
                    _o.label = 32;
                case 32: return [3 /*break*/, 29];
                case 33: return [3 /*break*/, 40];
                case 34:
                    e_3_1 = _o.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 40];
                case 35:
                    _o.trys.push([35, , 38, 39]);
                    if (!(_k && !_k.done && (_c = _j["return"]))) return [3 /*break*/, 37];
                    return [4 /*yield*/, _c.call(_j)];
                case 36:
                    _o.sent();
                    _o.label = 37;
                case 37: return [3 /*break*/, 39];
                case 38:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 39: return [7 /*endfinally*/];
                case 40: 
                // Deleting both certificates
                return [4 /*yield*/, client.deleteCertificate("MyCertificate1")];
                case 41:
                    // Deleting both certificates
                    _o.sent();
                    return [4 /*yield*/, client.deleteCertificate("MyCertificate2")];
                case 42:
                    _o.sent();
                    _o.label = 43;
                case 43:
                    _o.trys.push([43, 48, 49, 54]);
                    _l = __asyncValues(client.listDeletedCertificates({ includePending: true }));
                    _o.label = 44;
                case 44: return [4 /*yield*/, _l.next()];
                case 45:
                    if (!(_m = _o.sent(), !_m.done)) return [3 /*break*/, 47];
                    certificate = _m.value;
                    console.log("Deleted certificate: ", certificate);
                    _o.label = 46;
                case 46: return [3 /*break*/, 44];
                case 47: return [3 /*break*/, 54];
                case 48:
                    e_4_1 = _o.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 54];
                case 49:
                    _o.trys.push([49, , 52, 53]);
                    if (!(_m && !_m.done && (_d = _l["return"]))) return [3 /*break*/, 51];
                    return [4 /*yield*/, _d.call(_l)];
                case 50:
                    _o.sent();
                    _o.label = 51;
                case 51: return [3 /*break*/, 53];
                case 52:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 53: return [7 /*endfinally*/];
                case 54: return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) {
    console.log("error code: ", err.code);
    console.log("error message: ", err.message);
    console.log("error stack: ", err.stack);
});
