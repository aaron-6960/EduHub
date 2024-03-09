import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";

const Graph = ({ data }) => {
  return (
    <div className="bg-gradient p-[1px] rounded-lg">
      <h4 className="text-xl mb-1 text-black text-center">Your Progress</h4>
      <div className="shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-zinc-950 rounded-lg">
        <Line
          data={data}
          options={{
            borderColor: "#fff",
            color: "#fff",
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 10,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
