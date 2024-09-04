import axios from "axios";

let key = "bb14b3a57f5b0dbc4773f4eca853526d80ff26be7a549e4ffb7377a953e38138";
let config = {
  headers: { "X-API-Key": key },
};

export const GetVideoGenerationList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/videoGenerations",
    );
    if (response.data.status == 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
};

export const AddVideoGeneration = async (item) => {
  try {
    const body = {
      title: item.title,
      url: item.url
    }
    const response = await axios.post(
      "http://localhost:5000/videoGeneration",
      body
    );
    if (response.data.status == 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  }
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
