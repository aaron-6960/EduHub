import React, { useState, useEffect } from "react";
import { Button } from "..";
import Graph from "./Graph";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { graphItems, graphItemColors, apiBase } from "../../constants";
import { UserAuth } from "../../context/AuthContext";

const GetGraphData = () => {
  const { auth } = UserAuth();
  const [graphData, setGraphData] = useState({});
  const [newData, setNewData] = useState({
    subject: "LAC",
    marks: "",
    maxMarks: "",
    date: "",
    color: "#1f72de",
  });

  useEffect(() => {
    getGraphData();
  }, []);

  // let todayDate = new Date();
  // todayDate = `${todayDate.getDate()}-${
  //   todayDate.getMonth + 1
  // }-${todayDate.getFullYear()}`;

  const recentDate = (newD, prevD) => {
    if(prevD.lebels) {
      const newDate = new Date(prevD.lebels[-1]);
      const prevDate = new Date(prevD.split("-").reverse().join("-"));
      return newDate > prevDate;
    } else return true
  };

  const genData = () => {
    return {
      labels: [
        "05-12-2023",
        "13-12-2023",
        "22-12-2023",
        "05-01-2024",
        "17-01-2024",
        "25-01-2024",
        "02-02-2024",
        "14-02-2024",
      ],
      datasets: [
        {
          label: "LAC",
          data: [67, 73, 85, 76, 80, 90, 92, 87],
          borderColor: "#1f72de",
        },
        {
          label: "Chemistry",
          data: [78, 74, 70, 66, 74, 78, 85, 82],
          borderColor: "#069e16",
        },
        {
          label: "BME",
          data: [85, 89, 83, 84, 90, 93, 91, 88],
          borderColor: "#cf1f1f",
        },
        {
          label: "BCE",
          data: [75, 80, 81, 83, 85, 81, 76, 78],
          borderColor: "#e0c424",
        },
        {
          label: "Graphics",
          data: [60, 73, 65, 78, 85, 87, 80, 73],
          borderColor: "#b51abd",
        },
      ],
    };
  };

  const getGraphData = () => {
    fetch(`${apiBase}/api/graph`, {
      headers: {
        authorization: JSON.stringify(auth),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGraphData(data);
        console.log(data);
        console.log("returned data above");
      });
  };

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "subject") {
      setNewData({
        ...newData,
        [event.target.name]: event.target.value,
        color: graphItemColors[event.target.value],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(graphData)
    if (recentDate(newData["date"], graphData)) {
      event.preventDefault();
      console.log(newData);
      fetch(`${apiBase}/api/graph`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: auth._id,
          subject: newData.subject,
          date: newData["date"].split("-").reverse().join("-"),
          marksObtained: newData.marks,
          totalMarks: newData.maxMarks,
          borderColor: newData.color,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      console.log("submitted");
      getGraphData();
    } else if (graphData.labels.include(newData["date"])) {
      const subjectToChange = graphData.datasets.filter(
        (element) => element.subject == newData.subject
      )[0];
      const requestBody = JSON.stringify({
        labels: graphData.labels,
        datasets: [
          ...graphData.datasets,
          (subjectToChange.data[
            graphData.labels.indexOf(
              newData["date"].split("-").reverse().join("-")
            )
          ] = Math.floor(newData.marksObtained / newData.maxMarks)),
        ],
      });
      await fetch(`${apiBase}/api/graph/${localStorage.auth._id}`, {
        method: "PATCH",
        headers: {
          authorization: JSON.stringify(auth),
          "Content-Type": "application/json",
        },
        body: requestBody,
      })
        .then((res) => res.json())
        .then((data) => getGraphData());
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {graphData?.labels && <Graph data={graphData} />}
      <h5 className="text-md underline text-zinc-400 underline-offset-4">
        Add data
      </h5>
      <form
        className="flex justify-around max-md:flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <select
            type="text"
            name="subject"
            placeholder="Subject"
            className="inputdata bg-zinc-950"
            value={newData.subject}
            onChange={handleChange}
          >
            {graphItems.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            type="text"
            name="marks"
            autoComplete="off"
            placeholder="Marks Obtained"
            className="inputdata bg-zinc-950"
            value={newData.marks}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="maxMarks"
            autoComplete="off"
            placeholder="Maximum Marks"
            className="inputdata bg-zinc-950"
            value={newData.maxMarks}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date of Assessment"
            // defaultValue={todayDate}
            className="inputdata bg-zinc-950"
            value={newData.date}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 item-center justify-center">
          <label className="flex items-center gap-1 text-slate-500 text-sm">
            Colour
            <input
              type="color"
              disabled
              name="color"
              className="bg-zinc-950 rounded-sm border-none outline-none"
              value={newData.color}
              onChange={handleChange}
            />
          </label>
          <Button
            variant="gradient"
            text="Add data"
            leftIcon={<MdOutlineLibraryAdd />}
          />
        </div>
      </form>
    </div>
  );
};

export default GetGraphData;
