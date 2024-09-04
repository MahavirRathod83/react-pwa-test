import axios from "axios";

let key = "69cfdf0767284c03b186a563b7ad70bc83bce0685825d052e6b9e02f8bc9dac6";
let config = {
  headers: { "X-API-Key": key },
};

export const GetVideoGenerationKey = async (value) => {
  try {
    let body = {
      prompt: value,
      expand_prompt: true,
    };
    const response = await axios.post(
      "https://api.piapi.ai/api/luma/v1/video",
      body,
      config
    );
    if (response.data.code == 200) {
      return response.data.data.task_id;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
};

export const GetVideoGenerationUrl = async (id) => {
  try {
    const response = await axios.get(
      "https://api.piapi.ai/api/luma/v1/video/" + id,
      config
    );
    if (response.data.code == 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
};
