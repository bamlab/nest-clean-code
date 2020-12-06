// https://github.com/nestjs/nest-cli/issues/705#issuecomment-707419540
module.exports = function (options) {
  return {
    ...options,
    devtool: 'inline-source-map',
  };
};
