module.exports = {
  entry: './src/client/js/app.js',
  output: {
    path: require("path").resolve("./bin/client/js"),
    library: "app",
    filename: "app.js"
  },
};