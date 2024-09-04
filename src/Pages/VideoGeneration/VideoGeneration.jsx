import React, { useEffect, useState } from "react";
import * as apiService from "./api.service";
import "./VideoGeneration.css";
import Loading from "../../Components/Loading/Loading.jsx";
import { Paper } from "@mui/material";
import CircularIndeterminate from "../../Components/Progress/Progress.jsx";

const VideoGeneration = () => {
  let Interval = "";
  let TempList = [
    {
      text: "SuperHero",
      url: "https://storage.cdn-luma.com/dream_machine/8b37322d-8f93-4c6e-9418-2a464b68caf4/watermarked_video0333de785be3a489b8299db436318ae66.mp4",
    },
    {
      text: "Running Car",
      url: "https://storage.cdn-luma.com/dream_machine/81bbbbb8-84dc-4676-9643-b26ff7fd453e/watermarked_video08a9060dc059245aabe161cb304c4558a.mp4",
    },
    {
      text: "Building",
      url: "https://storage.cdn-luma.com/dream_machine/546bfc2e-03d3-45e5-b705-f8f1fb35eec7/watermarked_video03d35747ac102460ebc3a97cb5a1ac8d3.mp4",
    },
  ];
  localStorage.setItem("VideoGenerationList", JSON.stringify(TempList));
  const [List, setList] = useState(TempList);
  const [FormValues, setFormValues] = useState({
    SearchValue: "",
  });
  const [IsLoading, setIsLoading] = useState(false);
  const [IsApiResponsePending, setIsApiResponsePending] = useState(false);

  useEffect(() => {
  }, [List]);

  const GetVideoGeneratedUrl = async (id) => {
    try {
      const response = await apiService.GetVideoGenerationUrl(id);
      if (response.generation.state == "completed") {
        clearInterval(Interval);
        setIsApiResponsePending(false);
        setList((prevState) => {
          [
            {
              text: response.generation.prompt,
              url: response.generation.video.url,
            },
            ...prevState,
          ];
        });
        let oldList = JSON.parse(localStorage.getItem("VideoGenerationList"));
        localStorage.setItem(
          "VideoGenerationList",
          JSON.stringify([
            {
              text: response.generation.prompt,
              url: response.generation.video.url,
            },
            ...oldList,
          ])
        );
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
            <input
              type="text"
              className="form-control w-50"
              id="SearchValue"
              name="SearchValue"
              placeholder="Enter text to convert video"
              onChange={(e) => FormValuesHandler(e)}
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
          {List.length == 0 ? (
            <div className="no-data-text">
              <h5>No Data found</h5>
            </div>
          ) : (
            <div>
              {List.map((item, index) => {
                return (
                  <div className="list mt-5" key={index}>
                    <h4 className="text-start">Title: {item.text}</h4>
                    <video width="100%" height="100%" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
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
