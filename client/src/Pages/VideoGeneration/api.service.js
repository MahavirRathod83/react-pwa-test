import axios from "axios";

let key = "3793234ec0b7589e23161d12a69d3d551d445bfda1617559f94b83eaf71c3e0b";
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
