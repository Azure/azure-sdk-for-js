import { Buffer } from "buffer";
import * as crypto from "isomorphic-webcrypto";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "text-encoding-polyfill";
global.Buffer = Buffer;
const getRandomValues = global.crypto.getRandomValues;
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
