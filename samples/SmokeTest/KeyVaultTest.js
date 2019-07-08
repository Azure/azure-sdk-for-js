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
var identity_1 = require("@azure/identity");
var keyvault_secrets_1 = require("@azure/keyvault-secrets");
var KeyVaultSecrets = /** @class */ (function () {
    function KeyVaultSecrets() {
        this.service = "Key Vault - Secrets\nIdentity - Credential";
        this.description = "1) Set a secret\n" +
            "2) Get that secret\n" +
            "3) Delete that secret (Clean up the resource)\n";
        var credential = new identity_1.EnvironmentCredential();
        var url = process.env["AZURE_PROJECT_URL"];
        this.secretName = "MySecretName";
        this.secretValue = "MySecretValue";
        this.client = new keyvault_secrets_1.SecretsClient(url, credential);
    }
    KeyVaultSecrets.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setSecret()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getSecret()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.deleteSecret()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KeyVaultSecrets.prototype.setSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\tSetting a secret...");
                        return [4 /*yield*/, this.client.setSecret(this.secretName, this.secretValue)];
                    case 1:
                        result = _a.sent();
                        console.log("\t\tSecret = (" + result.name + "," + result.value + ")");
                        console.log("\t\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    KeyVaultSecrets.prototype.getSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\tGetting that secret...");
                        return [4 /*yield*/, this.client.getSecret(this.secretName)];
                    case 1:
                        result = _a.sent();
                        if ((result.name !== this.secretName) || (result.value !== this.secretValue)) {
                            throw "Error, a secret was obtained but is not the one that was setted before";
                        }
                        console.log("\t\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    KeyVaultSecrets.prototype.deleteSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\tDeleting that secret...");
                        return [4 /*yield*/, this.client.deleteSecret(this.secretName)];
                    case 1:
                        _a.sent();
                        console.log("\t\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    return KeyVaultSecrets;
}());
exports.KeyVaultSecrets = KeyVaultSecrets;
