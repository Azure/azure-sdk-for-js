"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecognizeInputType = exports.DtmfTone = exports.VoiceKind = exports.KnownMediaStreamingTransportType = exports.KnownMediaStreamingContentType = exports.KnownMediaStreamingAudioChannelType = exports.KnownCallRejectReason = void 0;
var index_js_1 = require("../generated/src/models/index.js");
Object.defineProperty(exports, "KnownCallRejectReason", { enumerable: true, get: function () { return index_js_1.KnownCallRejectReason; } });
Object.defineProperty(exports, "KnownMediaStreamingAudioChannelType", { enumerable: true, get: function () { return index_js_1.KnownMediaStreamingAudioChannelType; } });
Object.defineProperty(exports, "KnownMediaStreamingContentType", { enumerable: true, get: function () { return index_js_1.KnownMediaStreamingContentType; } });
Object.defineProperty(exports, "KnownMediaStreamingTransportType", { enumerable: true, get: function () { return index_js_1.KnownMediaStreamingTransportType; } });
/** Defines values for VoiceKind that the service accepts. */
var VoiceKind;
(function (VoiceKind) {
    /** Male */
    VoiceKind["Male"] = "male";
    /** Female */
    VoiceKind["Female"] = "female";
})(VoiceKind || (exports.VoiceKind = VoiceKind = {}));
/** A Dtmf Tone. */
var DtmfTone;
(function (DtmfTone) {
    /** Zero */
    DtmfTone["Zero"] = "zero";
    /** One */
    DtmfTone["One"] = "one";
    /** Two */
    DtmfTone["Two"] = "two";
    /** Three */
    DtmfTone["Three"] = "three";
    /** Four */
    DtmfTone["Four"] = "four";
    /** Five */
    DtmfTone["Five"] = "five";
    /** Six */
    DtmfTone["Six"] = "six";
    /** Seven */
    DtmfTone["Seven"] = "seven";
    /** Eight */
    DtmfTone["Eight"] = "eight";
    /** Nine */
    DtmfTone["Nine"] = "nine";
    /** A */
    DtmfTone["A"] = "a";
    /** B */
    DtmfTone["B"] = "b";
    /** C */
    DtmfTone["C"] = "c";
    /** D */
    DtmfTone["D"] = "d";
    /** Pound */
    DtmfTone["Pound"] = "pound";
    /** Asterisk */
    DtmfTone["Asterisk"] = "asterisk";
})(DtmfTone || (exports.DtmfTone = DtmfTone = {}));
/** The type of the recognition that the service accepts. */
var RecognizeInputType;
(function (RecognizeInputType) {
    /** Dtmf */
    RecognizeInputType["Dtmf"] = "dtmf";
    /** Choices */
    RecognizeInputType["Choices"] = "choices";
})(RecognizeInputType || (exports.RecognizeInputType = RecognizeInputType = {}));
//# sourceMappingURL=models.js.map