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
function main() {
    var e_1, _a, e_2, _b, e_3, _c;
    return __awaiter(this, void 0, void 0, function () {
        var credential, vaultName, url, client, bankAccountSecretName, storageAccountSecretName, _d, _e, page, _i, page_1, secretAttr, secret, e_1_1, _f, _g, secretAttr, secret, e_2_1, _h, _j, secretAttr, secret, e_3_1;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    credential = new identity_1.DefaultAzureCredential();
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    client = new src_1.SecretsClient(url, credential);
                    bankAccountSecretName = "BankAccountPassword15";
                    storageAccountSecretName = "StorageAccountPassword15";
                    // Create our secrets
                    return [4 /*yield*/, client.setSecret(bankAccountSecretName, "ABC123")];
                case 1:
                    // Create our secrets
                    _k.sent();
                    return [4 /*yield*/, client.setSecret(storageAccountSecretName, "XYZ789")];
                case 2:
                    _k.sent();
                    // List the secrets we have, by page
                    console.log("Listing secrets by page");
                    _k.label = 3;
                case 3:
                    _k.trys.push([3, 12, 13, 18]);
                    _d = __asyncValues(client.listSecrets().byPage({ maxPageSize: 2 }));
                    _k.label = 4;
                case 4: return [4 /*yield*/, _d.next()];
                case 5:
                    if (!(_e = _k.sent(), !_e.done)) return [3 /*break*/, 11];
                    page = _e.value;
                    _i = 0, page_1 = page;
                    _k.label = 6;
                case 6:
                    if (!(_i < page_1.length)) return [3 /*break*/, 9];
                    secretAttr = page_1[_i];
                    return [4 /*yield*/, client.getSecret(secretAttr.name)];
                case 7:
                    secret = _k.sent();
                    console.log("secret: ", secret);
                    _k.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log("--page--");
                    _k.label = 10;
                case 10: return [3 /*break*/, 4];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _k.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _k.trys.push([13, , 16, 17]);
                    if (!(_e && !_e.done && (_a = _d["return"]))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _a.call(_d)];
                case 14:
                    _k.sent();
                    _k.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18:
                    // List the secrets we have, all at once
                    console.log("Listing secrets all at once");
                    _k.label = 19;
                case 19:
                    _k.trys.push([19, 25, 26, 31]);
                    _f = __asyncValues(client.listSecrets());
                    _k.label = 20;
                case 20: return [4 /*yield*/, _f.next()];
                case 21:
                    if (!(_g = _k.sent(), !_g.done)) return [3 /*break*/, 24];
                    secretAttr = _g.value;
                    return [4 /*yield*/, client.getSecret(secretAttr.name)];
                case 22:
                    secret = _k.sent();
                    console.log("secret: ", secret);
                    _k.label = 23;
                case 23: return [3 /*break*/, 20];
                case 24: return [3 /*break*/, 31];
                case 25:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 31];
                case 26:
                    _k.trys.push([26, , 29, 30]);
                    if (!(_g && !_g.done && (_b = _f["return"]))) return [3 /*break*/, 28];
                    return [4 /*yield*/, _b.call(_f)];
                case 27:
                    _k.sent();
                    _k.label = 28;
                case 28: return [3 /*break*/, 30];
                case 29:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 30: return [7 /*endfinally*/];
                case 31: return [4 /*yield*/, client.setSecret(bankAccountSecretName, "ABC567")];
                case 32:
                    _k.sent();
                    _k.label = 33;
                case 33:
                    _k.trys.push([33, 39, 40, 45]);
                    _h = __asyncValues(client.listSecretVersions(bankAccountSecretName));
                    _k.label = 34;
                case 34: return [4 /*yield*/, _h.next()];
                case 35:
                    if (!(_j = _k.sent(), !_j.done)) return [3 /*break*/, 38];
                    secretAttr = _j.value;
                    return [4 /*yield*/, client.getSecret(secretAttr.name)];
                case 36:
                    secret = _k.sent();
                    console.log("secret version: ", secret);
                    _k.label = 37;
                case 37: return [3 /*break*/, 34];
                case 38: return [3 /*break*/, 45];
                case 39:
                    e_3_1 = _k.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 45];
                case 40:
                    _k.trys.push([40, , 43, 44]);
                    if (!(_j && !_j.done && (_c = _h["return"]))) return [3 /*break*/, 42];
                    return [4 /*yield*/, _c.call(_h)];
                case 41:
                    _k.sent();
                    _k.label = 42;
                case 42: return [3 /*break*/, 44];
                case 43:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 44: return [7 /*endfinally*/];
                case 45: return [4 /*yield*/, client.deleteSecret(bankAccountSecretName)];
                case 46:
                    _k.sent();
                    return [4 /*yield*/, client.deleteSecret(storageAccountSecretName)];
                case 47:
                    _k.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) {
    console.log("error code: ", err.code);
    console.log("error message: ", err.message);
    console.log("error stack: ", err.stack);
});
