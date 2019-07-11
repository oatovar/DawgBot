/* eslint-disable no-undef */
const assert = require('assert');
const { getImages } = require('../utils');

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
});
