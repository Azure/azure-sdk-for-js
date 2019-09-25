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
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var credential, vaultName, url, client, keyName, ecKeyName, rsaKeyName, result, ecResult, rsaResult, key, _b, _c, keyAttributes, key_1, e_1_1, updatedKey;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    credential = new identity_1.DefaultAzureCredential();
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    client = new src_1.KeysClient(url, credential);
                    keyName = "MyKeyName";
                    ecKeyName = "MyECKeyName";
                    rsaKeyName = "MyRSAKeyName";
                    return [4 /*yield*/, client.createKey(keyName, "EC")];
                case 1:
                    result = _d.sent();
                    console.log("key: ", result);
                    return [4 /*yield*/, client.createEcKey(ecKeyName, { curve: "P-256" })];
                case 2:
                    ecResult = _d.sent();
                    return [4 /*yield*/, client.createRsaKey(rsaKeyName, { keySize: 2048 })];
                case 3:
                    rsaResult = _d.sent();
                    console.log("Elliptic curve key: ", ecResult);
                    console.log("RSA Key: ", rsaResult);
                    return [4 /*yield*/, client.getKey(keyName)];
                case 4:
                    key = _d.sent();
                    console.log("key: ", key);
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 11, 12, 17]);
                    _b = __asyncValues(client.listKeys());
                    _d.label = 6;
                case 6: return [4 /*yield*/, _b.next()];
                case 7:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 10];
                    keyAttributes = _c.value;
                    return [4 /*yield*/, client.getKey(keyAttributes.name)];
                case 8:
                    key_1 = _d.sent();
                    console.log("key: ", key_1);
                    _d.label = 9;
                case 9: return [3 /*break*/, 6];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _d.trys.push([12, , 15, 16]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(_b)];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [4 /*yield*/, client.updateKey(keyName, result.properties.version, { enabled: false })];
                case 18:
                    updatedKey = _d.sent();
                    console.log("updated key: ", updatedKey);
                    return [4 /*yield*/, client.deleteKey(keyName)];
                case 19:
                    _d.sent();
                    return [4 /*yield*/, client.deleteKey(ecKeyName)];
                case 20:
                    _d.sent();
                    return [4 /*yield*/, client.deleteKey(rsaKeyName)];
                case 21:
                    _d.sent();
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
