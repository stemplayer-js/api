const axios = require("axios");
const getToken = require("../helpers/get-token");
const getStackOutput = require("../helpers/get-stack-output");

jest.setTimeout(10000);

let AWS_STACK;

beforeEach(() => {
  AWS_STACK = getStackOutput();
});

it("posts a split job", async () => {
  const { StemSplitServiceEndpoint } = AWS_STACK;

  const token = getToken();
  const url = `${StemSplitServiceEndpoint}jobs`;

  console.log({ url, token });

  const response = await axios.post(
    url,
    {
      sourceAudioUrl:
        "https://stems-example-audio.s3.eu-west-2.amazonaws.com/default/drumsv2/mp3/Stem_Bass_1.mp3",
      model: "demucs:htdemucs",
      output: {
        format: "mp3",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response.data);

  // expect(response.data instanceof Object);
});
