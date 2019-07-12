/* eslint-disable no-undef */
const assert = require('assert');
const { prefix } = require('../src/config');
const { getImages, stringPrintHelp } = require('../src/utils');

describe('testing utilities', () => {
  describe('getImages()', () => {
    it('should return an array of images', () => {
      const json = JSON.stringify({
        data: {
          children: [
            {
              data: {
                url: 'urlOne',
              },
            },
            {
              data: {
                url: 'urlTwo',
              },
            },
          ],
        },
      });
      const result = getImages(json);
      assert.deepStrictEqual(result, ['urlOne', 'urlTwo']);
    });
  });
  describe('stringPrintHelp()', () => {
    it('should return pretty printed output', async () => {
      const example = {
        command: 'test',
        help: 'This is a test example.',
        example: `${prefix} test`,
      };
      const result = stringPrintHelp(example);
      let expected = `${example.command} - ${example.help}\n`;
      expected += `example: \`${example.example}\`\n`;

      assert.deepStrictEqual(result, expected);
    });
  });
});
