import axios from "axios";

let key = "e3c59362838d6e9ebcf6f897d1edf88ec7a4b40e10c1e74c3ca459645139bfa0";
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
    console.log("response -->", response);
    if (response.code == 200) {
      return response.data.task_id;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
};

export const GetVideoGenerationUrl = async (id) => {
  try {
    let body = {
      task_id: id,
    };
    const response = await axios.get(
      "https://api.piapi.ai/api/luma/v1/video/" + id,
      body,
      config
    );
    console.log("response url -->", response);
    if (response.code == 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
};
