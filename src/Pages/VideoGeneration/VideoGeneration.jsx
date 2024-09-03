import React, { useEffect, useState } from "react";
import * as apiService from "./api.service";
import "./VideoGeneration.css";
import Loading from "../../Components/Loading/Loading.jsx";

const VideoGeneration = () => {
  let Interval = "";
  const [List, setList] = useState([]);
  const [FormValues, setFormValues] = useState({
    SearchValue: "",
  });
  const [IsLoading, setIsLoading] = useState(false);
  const [IsFormSubmitted, setIsFormsubmitted] = useState(true);

  useEffect(() => {    
  }, [List])
  

  const GetVideoGeneratedUrl = async (id) => {
    try {
      setIsLoading(true);
      const response = await apiService.GetVideoGenerationUrl(id);
      if (response.generation.state == "completed") {
        clearInterval(Interval);
        setList([
          {
            text: response.generation.prompt,
            url: response.generation.video.url,
          },
          ...List,
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const VideoGenerationHandler = async () => {
    console.log(FormValues);
    try {
      setIsLoading(true);
      const id = await apiService.GetVideoGenerationKey(FormValues.SearchValue);
      Interval = setInterval(GetVideoGeneratedUrl, 2000);
      setIsLoading(false);
    } catch (error) {
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
      <div className="container outer-container">
        <div className="d-flex align-items-center justify-content-between header">
          <div>Lists</div>
          <button
            onClick={() => {
              setIsFormsubmitted(!IsFormSubmitted), setIsLoading(true);
            }}
            type="button"
            className="btn btn-primary"
          >
            Generate Video
          </button>
        </div>
        {IsFormSubmitted && (
          <div className="w-100 mt-4 d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control w-75"
              id="SearchValue"
              name="SearchValue"
              placeholder="Enter text to convert video"
              onChange={(e) => FormValuesHandler(e)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => VideoGenerationHandler()}
            >
              Convert
            </button>
          </div>
        )}
        {
          List.length == 0 ? 
          <div className="no-data-text">
            <h5>No Data found</h5>
          </div> 
          : 
          <div>
            {
              List.map((item) => {
                return <>
                  <div className="mt-2">
                    {item.text}
                  </div>
                  <div className="mt-2">
                    {item.url}
                  </div>
                </>
              })
            }
          </div>
        }
      </div>
    </>
  );
};

export default VideoGeneration;
