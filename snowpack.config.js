// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: "/",
    dist: "/",
  },

  optimize: {
    bundle: true,
    minify: true,
    target: "es2017",
  },

  buildOptions: {
    out: "docs",
  }
};
