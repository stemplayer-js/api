const axios = require("axios");
const getToken = require("../helpers/get-token");
const getStackOutput = require("../helpers/get-stack-output");

jest.setTimeout(10000);

describe("hls-service", () => {
  let AWS_STACK;

  beforeEach(() => {
    AWS_STACK = getStackOutput();
  });

  it("returns a m3u8 index file from a source audio file", async () => {
    const { HlsServiceEndpoint } = AWS_STACK;

    const token = getToken();
    const url = `${HlsServiceEndpoint}/hls?sourceUrl=${encodeURIComponent(
      "https://stems-example-audio.s3.eu-west-2.amazonaws.com/default/drumsv2/mp3/Stem_Bass_1.mp3"
    )}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(typeof response.data === "string");
  });
});
