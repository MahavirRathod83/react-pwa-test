import React, { useEffect, useState } from "react";
import * as apiService from "./api.service";
import "./VideoGeneration.css";
import Loading from "../../Components/Loading/Loading.jsx";
import { Alert, Paper } from "@mui/material";
import CircularIndeterminate from "../../Components/Progress/Progress.jsx";

const VideoGeneration = () => {
  let Interval = "";
  const [List, setList] = useState([]);
  const [FormValues, setFormValues] = useState({
    SearchValue: "",
  });
  const [IsLoading, setIsLoading] = useState(false);
  const [IsApiResponsePending, setIsApiResponsePending] = useState(false);

  useEffect(() => {
    getVideoGeneratedList();
  }, []);

  const getVideoGeneratedList = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.GetVideoGenerationList();      
      localStorage.setItem("VideoGenerationList", JSON.stringify(response));
      setList(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const GetVideoGeneratedUrl = async (id) => {
    try {
      const response = await apiService.GetVideoGenerationUrl(id);
      if (response.generation.state == "completed") {
        const res = await apiService.AddVideoGeneration({
          text: response.generation.prompt,
          url: response.generation.video.url,
        });
        clearInterval(Interval);
        setIsApiResponsePending(false);
        getVideoGeneratedList();
      }
    } catch (error) {
      clearInterval(Interval);
      setIsApiResponsePending(false);
      console.log(error);
    }
  };

  const VideoGenerationHandler = async () => {
    try {
      setIsLoading(true);
      const id = await apiService.GetVideoGenerationKey(FormValues.SearchValue);
      setIsLoading(false);
      setIsApiResponsePending(true);
      Interval = setInterval(() => {
        GetVideoGeneratedUrl(id);
      }, 5000);
    } catch (error) {
      setIsApiResponsePending(false);
      setIsLoading(false);
      console.log(error);
    }
  };

  const FormValuesHandler = (event) => {
    setFormValues({
      ...FormValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {IsLoading && <Loading />}
      <Paper elevation={3} className="w-75 h-100">
        <div className="container outer-container">
          <div className="w-100 mt-4 mb-5 d-flex align-items-center">
            <textarea
              type="text"
              className="form-control w-50"
              id="SearchValue"
              name="SearchValue"
              placeholder="Enter text to convert video"
              onChange={(e) => FormValuesHandler(e)}
              rows={5}
            />
            {IsApiResponsePending ? (
              <div className="ms-3">
                <CircularIndeterminate />
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary ms-3"
                onClick={() => VideoGenerationHandler()}
              >
                Convert
              </button>
            )}
          </div>
          {console.log(List)}
          {List.length == 0 ? (
            <div className="no-data-text">
              <h5>No Data found</h5>
            </div>
          ) : (
            <div>
              {List.map((item, index) => {
                return (
                  <div className="list mt-5" key={index}>
                    <p className="text-start text">Text: {item.text}</p>
                    <video width="100%" height="100%" controls src={item.url} type="video/mp4" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default VideoGeneration;
