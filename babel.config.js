module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@': './',
                        '@constants': './src/constants',
                        '@context': './src/context',
                        '@endpoints': './src/constants/endpoints',
                        '@screens': './src/screens',
                        '@components': './src/components',
                        '@utils': './src/utils',
                        '@assets': './assets',
                    },
                },
            ],
        ],
    };
};
