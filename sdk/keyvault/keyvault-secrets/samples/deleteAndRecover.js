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
function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
exports.delay = delay;
function main() {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function () {
        var credential, vaultName, url, client, bankAccountSecretName, storageAccountSecretName, _c, _d, deletedSecret, e_1_1, recoveredSecret, _e, _f, deletedSecret, e_2_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    credential = new identity_1.DefaultAzureCredential();
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    client = new src_1.SecretsClient(url, credential);
                    bankAccountSecretName = "BankAccountPassword11";
                    storageAccountSecretName = "StorageAccountPassword11";
                    // Create our secrets
                    console.log("Creating our secrets");
                    return [4 /*yield*/, client.setSecret(bankAccountSecretName, "ABC123")];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, client.setSecret(storageAccountSecretName, "XYZ789")];
                case 2:
                    _g.sent();
                    return [4 /*yield*/, delay(5000)];
                case 3:
                    _g.sent();
                    // Oops, what happens if we delete the wrong one?
                    console.log("Deleting secret: ", bankAccountSecretName);
                    return [4 /*yield*/, client.deleteSecret(bankAccountSecretName)];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, delay(30000)];
                case 5:
                    _g.sent();
                    console.log("Showing deleted secrets");
                    _g.label = 6;
                case 6:
                    _g.trys.push([6, 11, 12, 17]);
                    _c = __asyncValues(client.listDeletedSecrets());
                    _g.label = 7;
                case 7: return [4 /*yield*/, _c.next()];
                case 8:
                    if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 10];
                    deletedSecret = _d.value;
                    console.log(deletedSecret);
                    _g.label = 9;
                case 9: return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _g.trys.push([12, , 15, 16]);
                    if (!(_d && !_d.done && (_a = _c["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(_c)];
                case 13:
                    _g.sent();
                    _g.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    // That's okay, it's not gone until it's fully deleted (purged)
                    // Note: this only works if soft-delete is enabled on your vault
                    console.log("Recovering secret");
                    return [4 /*yield*/, client.recoverDeletedSecret(bankAccountSecretName)];
                case 18:
                    recoveredSecret = _g.sent();
                    return [4 /*yield*/, delay(30000)];
                case 19:
                    _g.sent();
                    console.log(recoveredSecret);
                    // To actually delete it, we delete and then purge the secret
                    // Delete the secret
                    console.log("about to delete");
                    return [4 /*yield*/, client.deleteSecret(bankAccountSecretName)];
                case 20:
                    _g.sent();
                    return [4 /*yield*/, delay(30000)];
                case 21:
                    _g.sent();
                    // Purge the deleted secret
                    console.log("about to purge");
                    return [4 /*yield*/, client.purgeDeletedSecret(bankAccountSecretName)];
                case 22:
                    _g.sent();
                    return [4 /*yield*/, delay(30000)];
                case 23:
                    _g.sent();
                    _g.label = 24;
                case 24:
                    _g.trys.push([24, 29, 30, 35]);
                    _e = __asyncValues(client.listDeletedSecrets());
                    _g.label = 25;
                case 25: return [4 /*yield*/, _e.next()];
                case 26:
                    if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 28];
                    deletedSecret = _f.value;
                    console.log(deletedSecret);
                    _g.label = 27;
                case 27: return [3 /*break*/, 25];
                case 28: return [3 /*break*/, 35];
                case 29:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 35];
                case 30:
                    _g.trys.push([30, , 33, 34]);
                    if (!(_f && !_f.done && (_b = _e["return"]))) return [3 /*break*/, 32];
                    return [4 /*yield*/, _b.call(_e)];
                case 31:
                    _g.sent();
                    _g.label = 32;
                case 32: return [3 /*break*/, 34];
                case 33:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 34: return [7 /*endfinally*/];
                case 35: return [4 /*yield*/, client.deleteSecret(storageAccountSecretName)];
                case 36:
                    _g.sent();
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
