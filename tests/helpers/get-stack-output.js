const { readFileSync } = require("fs");
const { resolve } = require("path");

module.exports = () => {
  const stackOutput = JSON.parse(
    readFileSync(resolve(__dirname, "..", "..", ".stack-output.json"), "utf8")
  );

  const output = stackOutput.Stacks[0].Outputs;

  return {
    HlsServiceEndpoint: output.find((e) => e.OutputKey === "HlsServiceEndpoint")
      ?.OutputValue,
    SwsSecret: output.find((e) => e.OutputKey === "SwsSecret")?.OutputValue,
    AudioMixServiceEndpoint: output.find(
      (e) => e.OutputKey === "AudioMixServiceEndpoint"
    )?.OutputValue,
    AudioWaveformServiceEndpoint: output.find(
      (e) => e.OutputKey === "AudioWaveformServiceEndpoint"
    )?.OutputValue,
    StemSplitServiceEndpoint: output.find(
      (e) => e.OutputKey === "StemSplitServiceEndpoint"
    )?.OutputValue,
  };
};
