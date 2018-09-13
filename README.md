## Learn webpack ##

Here are some high-level concepts about what webpack does:

1. Entry
2. Output
3. Loaders
4. Plugins

## Entry ##

Webpack needs a entry point via the configuration file. However, webpack 4 doesn't need a configuration file for this.

```js
const config = {
    entry: "./src/index.js"
}
```

## Output ##

Output is to tell webpack of its output directory. `output` has 2 attributes `path` and `filename`
> **Important**
> the path attribute for config needs to be an absolute path
> its commonly best practice to use the path module from node.js

```js
... require("path")

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
}
```

## Loaders ##

### Transpiling JS ###

Loaders are what webpack uses for additional configuration. In this repo, we gonna use `babel` as its the most used loader for webpack.

**Babel**
- babel-loader: teaches babel how to work with webpack, its a compatibility layer.
- babel-core(doesn't actually transform any code): knows how to take in code, parse it and generate some output files
- babel-present-env(the actual brains of the system): ruleset for telling babel exactly what pieces of ES2015 syntax to look for

### Importing CSS files ###

**CSS loaders**

By including our importing our css via the `import` syntax, we are able to instruct webpack to pull in our css files via the `css-loader` and writing the styles to the dom with `style-loader`. However, how this works is that the loaders actually take the css from the files and write them into a string which then gets pre-processed again back into a style tag. Which does break a lot of css conventions. 

```js
const path = require("path")

const config = {
    entry: ...
    output: {
        ...
    },
    module: {
        rules: [
            ...
            {
                /**
                 * loaders are applied from RIGHT to LEFT.
                 * the output from css-loader will be the input of style-loader
                 * 
                 * css-loader - knows how to deal with css imports
                 * style-loader - takes css imports and adds them to the HTML document
                 */
                use: ["style-loader", "css-loader"],
                test: /\.css/
            }
        ]
    }
}

module.exports = config
```

Loading css this way is a lot slower than including a separate css file. Because of how the browser deals with parallel downloads of files. 

!!Alert!!
> Below is how we solve this situation. To use a seperate loader called `extract-text-webpack-plugin`. 

`extract-text-webpack-plugin` runs webpack with it and takes any text that generate by the loader and save it into a seperate file.

```js
const config = {
    entry: "./src/index.js",
    output: { ... },
    module: {
        rules: [
            ...
            {
                /**
                 * anything that this loader caught/transformed will get saved into style.css
                 * in the plugins array at the bottom
                 */
                use: ExtractTextPlugin.extract({
                    loader: "css-loader"
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
```

### Image loaders ###