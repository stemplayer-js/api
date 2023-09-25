const axios = require("axios");
const getToken = require("../helpers/get-token");
const getStackOutput = require("../helpers/get-stack-output");

jest.setTimeout(10000);

describe("audio-mix-service", () => {
  let AWS_STACK;

  beforeEach(() => {
    AWS_STACK = getStackOutput();
  });

  it("mixes multiple mp3 files", async () => {
    const { AudioMixServiceEndpoint } = AWS_STACK;

    const token = getToken();
    const url = AudioMixServiceEndpoint;
    const payload = {
      sources: [
        {
          src: "https://stems-example-audio.s3.eu-west-2.amazonaws.com/default/drumsv2/mp3/Stem_Bass_1.mp3",
          volume: 0.1,
        },
        {
          src: "https://stems-example-audio.s3.eu-west-2.amazonaws.com/default/drumsv2/mp3/Stem_Casaba_1.mp3",
          volume: 0.8,
        },
      ],
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.data._url.indexOf("https://") === 0);
  });
});
