module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'postcss-nested': {},
        'postcss-nested-props': {},
        // 'postcss-pxtorem': {
        //     rootValue: 100,
        //     unitPrecision: 5,
        //     propList: ['*'],
        //     selectorBlackList: [/^((?!housing-estate|home).)*$/],
        //     replace: true,
        //     mediaQuery: false,
        //     minPixelValue: 0
        // },
        // 'postcss-modules': { generateScopedName: '[local]' },
        cssnano: {
            // preset: ['advanced']
        }
    }
};
