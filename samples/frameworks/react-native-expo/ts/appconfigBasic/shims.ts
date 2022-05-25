import 'react-native-url-polyfill/auto';
import "react-native-get-random-values";
import "text-encoding-polyfill";
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from "isomorphic-webcrypto";
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
