const px2rem = require('postcss-px2rem')

const postcss = px2rem({
    remUnit: 16
    //基准大小 baseSize，需要和rem.js中相同
})


module.exports = {
    chainWebpack(config) {
        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8222/",
                changeOrigin: true,
                pathRewrite: {
                    //将api转为ktp
                    '^/api': '/'
                }
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/element-variables.scss";`,
            },
            postcss: {
                plugins: [
                    postcss
                ]
            }
        },
    }
};