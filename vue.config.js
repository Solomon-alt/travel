module.exports = {
    devServer: {
        proxy: {
            "/api": {
                ws: false,
                target: "http://157.122.54.189:9095",
                changeOrigin: true,
                withCredentials: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};