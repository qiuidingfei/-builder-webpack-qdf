const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js');

    console.log(baseConfig);
    it('entry', () => {
        assert.equal(baseConfig.entry.index.indexof('builder-webpack-qdf/test/smoke/template/src/page/index/index.js') > -1, true);
        assert.equal(baseConfig.entry.search.indexof('builder-webpack-qdf/test/smoke/template/src/page/search/index.js') > -1, true);
    });
});