const axios = require("axios");
const getToken = require("../helpers/get-token");
const getStackOutput = require("../helpers/get-stack-output");

jest.setTimeout(10000);

describe("waveform-service", () => {
  let AWS_STACK;

  beforeEach(() => {
    AWS_STACK = getStackOutput();
  });

  it("extracts a waveform from an mp3 source file", async () => {
    const { AudioWaveformServiceEndpoint } = AWS_STACK;

    const token = getToken();
    const url = `${AudioWaveformServiceEndpoint}/waveform?sourceUrl=${encodeURIComponent(
      "https://stems-example-audio.s3.eu-west-2.amazonaws.com/default/drumsv2/mp3/Stem_Bass_1.mp3"
    )}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.data instanceof Object);
  });
});
