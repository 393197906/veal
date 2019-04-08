module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                loose: true,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                },
            }
        ]
    ],
    env: {
        test: {
            "presets": [
                ["@babel/preset-env"]
            ]
        }
    }
}
