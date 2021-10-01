import "react-native-get-random-values";
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from "isomorphic-webcrypto";
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
import "react-native-url-polyfill/auto";
import "fastestsmallesttextencoderdecoder";
