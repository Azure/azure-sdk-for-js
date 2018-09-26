import multi from 'rollup-plugin-multi-entry';
import baseConfig from './rollup.config';
const [node, browser] = baseConfig;

node.input = ['dist-esm/test/*.js', 'dist-esm/test/node/*.js'];
node.output.file = node.output.file.replace('dist', 'dist-test');
node.plugins.unshift(multi());
node.external.push('assert', 'path');
node.context = 'null';

browser.input = ['dist-esm/test/*.js', 'dist-esm/test/browser/*.js'];
browser.output.file = browser.output.file.replace('dist', 'dist-test');
browser.plugins.unshift(multi());
browser.context = 'null';

export default [node, browser];
