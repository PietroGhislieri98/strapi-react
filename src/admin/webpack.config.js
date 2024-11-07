module.exports = {
  // Altri parametri di configurazione
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/html2pdf\.js\/dist/, // Ignora i warning per html2pdf.js
        ],
      },
    ],
  },
};
