const TerserPlugin = require('terser-webpack-plugin');

module.exports = cfg => {
  cfg.externals = {
    fs: '{}',
    perf_hooks: '{performance: performance}'
  }
  cfg.optimization.minimizer.filter (({constructor: {name}}) => name === 'TerserPlugin')
  .forEach (terser => {
    terser.options.terserOptions.compress=false;
    terser.options.terserOptions.mangle=false;
  });
  
  return cfg;
}