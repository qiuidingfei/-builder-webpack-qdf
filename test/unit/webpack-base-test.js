const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js');

    console.log(baseConfig);
    it('entry', () => {
        assert.equal(baseConfig.entry.index,'F:/Web/my-project/builder-webpack/test/smoke/template/src/page/index/index.js');
        assert.equal(baseConfig.entry.search,'F:/Web/my-project/builder-webpack/test/smoke/template/src/page/search/index.js');
    });
});