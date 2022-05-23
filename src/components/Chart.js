import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { DropDown } from "./DropDown";
import styles from "./css module/Chart.module.scss";

export const Chart = ({
  event,
  labelData,
  dataSet,
  backC,
  yAxisLable,
  xAxisLable,
}) => {
  const [dropDown, setDropDown] = useState("VBar");

  const data = {
    labels: labelData,
    datasets: [
      {
        label: yAxisLable || "Number Of Cases",
        data: dataSet,
        backgroundColor: backC,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "grey",
          font: {
            size: 20,
          },
        },
        title: {
          display: true,
          text: xAxisLable || "Date",
          // color: backC[backC.length-1],
          font: {
            size: 20,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLable || "Number Of Cases",
          // color: backC[backC.length-1],
          font: {
            size: 20,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
        position: "top",
      },
      title: {
        display: true,
        text: event,
        font: {
          size: 20,
        },
      },
      tooltip: {
        usePointStyle: true,
      },
    },
  };

  const selectedVal = (val) => {
    setDropDown(val);
  };

  return (
    <React.Fragment>
      <DropDown selectedVal={selectedVal} selected={dropDown} />

      {dropDown === "VBar" && (
        <div className={styles.chartBar}>
          <Bar
            data={data}
            options={{
              ...options,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: event,
                  font: {
                    size: 25,
                  },
                },
                tooltip: {
                  usePointStyle: true,
                },
              },
            }}
          />
        </div>
      )}

      {dropDown === "Pie" && (
        <div className={styles.chartPie}>
          <Pie data={data} options={options} />
        </div>
      )}

      {dropDown === "Line" && (
        <div className={styles.chartPie}>
          <Line data={data} options={options} />
        </div>
      )}
    </React.Fragment>
  );
};
