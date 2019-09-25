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
exports.__esModule = true;
var src_1 = require("../src");
var fs = require("fs");
var identity_1 = require("@azure/identity");
function writeFile(filename, text) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, text, function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
function readFile(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
exports.delay = delay;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var credential, vaultName, url, client, secretName, backupResult, backupContents, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = new identity_1.DefaultAzureCredential();
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    client = new src_1.SecretsClient(url, credential);
                    secretName = "StorageAccountPassword";
                    // Create our secret
                    return [4 /*yield*/, client.setSecret(secretName, "XYZ789")];
                case 1:
                    // Create our secret
                    _a.sent();
                    return [4 /*yield*/, client.backupSecret(secretName)];
                case 2:
                    backupResult = _a.sent();
                    // Write the backup to a file
                    return [4 /*yield*/, writeFile("secret_backup.dat", backupResult)];
                case 3:
                    // Write the backup to a file
                    _a.sent();
                    // Delete the secret
                    console.log("about to delete");
                    return [4 /*yield*/, client.deleteSecret(secretName)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, delay(30000)];
                case 5:
                    _a.sent();
                    // Purge the deleted secret
                    console.log("about to purge");
                    return [4 /*yield*/, client.purgeDeletedSecret(secretName)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, delay(30000)];
                case 7:
                    _a.sent();
                    // Read our backup from a file
                    console.log("about to restore secret");
                    return [4 /*yield*/, readFile("secret_backup.dat")];
                case 8:
                    backupContents = _a.sent();
                    return [4 /*yield*/, client.restoreSecret(backupContents)];
                case 9:
                    result = _a.sent();
                    console.log("Restored secret: ", result);
                    return [4 /*yield*/, client.deleteSecret(secretName)];
                case 10:
                    _a.sent();
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
