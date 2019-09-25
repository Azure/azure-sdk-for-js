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
var identity_1 = require("@azure/identity");
// This sample creates a self-signed certificate, then deletes it, then recovers it.
// Soft-delete is required for this sample to run: https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete
function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
exports.delay = delay;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var vaultName, url, credential, client, certificate, deletedCertificate, certificateWithPolicy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
                    url = "https://" + vaultName + ".vault.azure.net";
                    credential = new identity_1.DefaultAzureCredential();
                    client = new src_1.CertificatesClient(url, credential);
                    return [4 /*yield*/, client.createCertificate("MyCertificate", {
                            issuerName: "Self",
                            subjectName: "cn=MyCert"
                        })];
                case 1:
                    certificate = _a.sent();
                    console.log("Certificate: ", certificate);
                    return [4 /*yield*/, client.deleteCertificate("MyCertificate")];
                case 2:
                    _a.sent();
                    // It might take less time, or more, depending on your location, internet speed and other factors.
                    return [4 /*yield*/, delay(10000)];
                case 3:
                    // It might take less time, or more, depending on your location, internet speed and other factors.
                    _a.sent();
                    return [4 /*yield*/, client.getDeletedCertificate("MyCertificate")];
                case 4:
                    deletedCertificate = _a.sent();
                    console.log("Deleted certificate: ", deletedCertificate);
                    return [4 /*yield*/, client.recoverDeletedCertificate("MyCertificate")];
                case 5:
                    _a.sent();
                    // It might take less time, or more, depending on your location, internet speed and other factors.
                    return [4 /*yield*/, delay(10000)];
                case 6:
                    // It might take less time, or more, depending on your location, internet speed and other factors.
                    _a.sent();
                    return [4 /*yield*/, client.getCertificateWithPolicy("MyCertificate")];
                case 7:
                    certificateWithPolicy = _a.sent();
                    console.log("Certificate with policy:", certificateWithPolicy);
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
