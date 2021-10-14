module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("data.json");

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  };

};
