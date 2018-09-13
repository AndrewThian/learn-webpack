const path = require("path")
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: "./src/index.js",
    output: {
        // path has to be an absolute path
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { 
                use: "babel-loader",
                /**
                 * test attribute is providing webpack with the regex testcase
                 * on how to parse the correct files that will be included into
                 * its module system.
                 */
                test: /\.js$/
            },
            {
                /**
                 * anything that this loader caught/transformed will get saved into style.css
                 * in the plugins array at the bottom
                 */
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        /**
         * this ExtraTextPlugin works in tandem with the loader to save
         * whatever the above mentioned plugin has caught/transformed and saves it into a style.css
         */
        new ExtractTextPlugin("style.css")
    ]
}

module.exports = config