import '@azure/core-asynciterator-polyfill';

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from 'crypto';
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
