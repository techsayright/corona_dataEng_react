import { green, orange, red } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import { Chart } from "./components/Chart";
import CountryDropDown from "./components/CountryDropDown";
import StateDropDown from "./components/StateDropDown";
import Loader from "../src/Bars_loader.gif";

function App() {
  const [countrySelected, setCountrySelected] = useState("Worldwide");
  const [stateSelected, setStateSelected] = useState("nothing");
  const [showInGraph, setShowInGraph] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  // when country changed, need to change state to default
  useEffect(() => {
    setStateSelected("nothing");
  }, [countrySelected]);

  useEffect(() => {
    fetchApi();
  }, []);

  let fetchedDataT = [];
  async function fetchApi() {
    let num = 1;
    while (num != 100) {
      const response = await fetch(
        `https://6djst4shy1.execute-api.us-east-1.amazonaws.com/Covid_Api_Deploy/sno/${num}`
      );
      var data = await response.json();
      // console.log(data.Items[0].SNo.N);
      if (data.Items.length != 0) {
        fetchedDataT.push(data.Items[0]);
      }
      num++;
    }
    setFetchedData(fetchedDataT);
    // console.log(fetchedData);
  }

  const random_rgb = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;

    return `rgb( ${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)} )`;
  };

  // for remove the similarity of data and storing in labelData and counting affected in dataset
  var labelData = [];
  const dataSet = [];
  const backC = [];
  const countryData = [];
  const stateData = [];

  const specLabelData = [];
  const specDataset = [];
  const specRecovered = [];
  const specDeaths = [];

  const sSpecRecovered = [];
  const sSpecDeaths = [];
  const sSpecLabelData = [];
  const sSpecDataset = [];

  var labelDataF = [];
  var specLabelDataF = [];
  var sSpecLabelDataF = [];

  if (fetchedData.length != 0) {
    fetchedData.map((v, k) => {
      if (v.ObservationDate.S) {
        if (labelData.length == 0) {
          labelData.push(v.ObservationDate.S);
          dataSet.push(+v.Confirmed.N);
          backC.push(random_rgb());
        } else {
          
          var subStr = v.ObservationDate.S.substring(2, 6);
          var loopMaGyoKeNai = false;
          labelData.forEach((val) => {
            if (val.includes(subStr)) {
              var ind4Dataset = labelData.findIndex(() => val);
              dataSet[ind4Dataset] = dataSet[ind4Dataset] + +v.Confirmed.N;
              loopMaGyoKeNai = true;
            }
          });
          if (!loopMaGyoKeNai) {
            labelData.push(v.ObservationDate.S);
            dataSet.push(+v.Confirmed.N);
            backC.push(random_rgb());
          }

          labelDataF = labelData.map((v) => {
            return v.substring(3, 10);
          });
          var sorted = labelData.sort(function (a, b) {
            a = a.split("-");
            b = b.split("-");
            return new Date(a[2], a[1], 1) - new Date(b[2], b[1], 1);
          });
        }
      }

      if (v.Country.S) {
        if (countryData.length == 0) {
          countryData.push(v.Country.S);
        } else {
          if (!countryData.includes(v.Country.S)) {
            countryData.push(v.Country.S);
          }
        }

        if (v.Country.S == countrySelected) {
          specRecovered.push(+v.Recovered.N);
          specDeaths.push(+v.Deaths.N);

          if (specLabelData.length == 0 || specDataset.length == 0) {
            specLabelData.push(v.ObservationDate.S);
            specDataset.push(+v.Confirmed.N);
          } else {
            // if (
            //   !(v.ObservationDate.S == specLabelData[specLabelData.length - 1])
            // ) {
            //   specLabelData.push(v.ObservationDate.S);
            //   specDataset.push(+v.Confirmed.N);
            // } else {
            //   specDataset[specDataset.length - 1] =
            //     specDataset[specDataset.length - 1] + +v.Confirmed.N;
            // }
            var subStrS = v.ObservationDate.S.substring(2, 6);
            // console.log(subStr, typeof subStr);
            var loopMaGyoKeNaiS = false;
            specLabelData.forEach((val) => {
              if (val.includes(subStrS)) {
                var ind4DatasetS = specLabelData.findIndex(() => val);
                // console.log(ind4DatasetS);
                specDataset[ind4DatasetS] =
                  specDataset[ind4DatasetS] + +v.Confirmed.N;
                loopMaGyoKeNaiS = true;
              }
            });
            if (!loopMaGyoKeNaiS) {
              specLabelData.push(v.ObservationDate.S);
              specDataset.push(+v.Confirmed.N);
              backC.push(random_rgb());
            }

            specLabelDataF = specLabelData.map((v) => {
              return v.substring(3, 10);
            });
            var sorted = specLabelData.sort(function (a, b) {
              a = a.split("-");
              b = b.split("-");
              return new Date(a[2], a[1], 1) - new Date(b[2], b[1], 1);
            });
          }

          if (v.State.S && v.State.S != "NULL") {
            if (stateData.length == 0) {
              stateData.push(v.State.S);
            } else {
              if (!stateData.includes(v.State.S)) {
                stateData.push(v.State.S);
              }
            }
          }
        }

        if (v.State.S == stateSelected && v.Country.S == countrySelected) {
          sSpecRecovered.push(+v.Recovered.N);
          sSpecDeaths.push(+v.Deaths.N);

          if (sSpecLabelData.length == 0 || sSpecDataset.length == 0) {
            sSpecLabelData.push(v.ObservationDate.S);
            sSpecDataset.push(+v.Confirmed.N);
            // console.log(sSpecLabelData, "helloo");
            // console.log(sSpecDataset, "helloo");

            if (sSpecDataset.length == 1) {
              var subStrSS = v.ObservationDate.S.substring(2, 6);
              // console.log(subStr, typeof subStr);
              var loopMaGyoKeNaiSS = false;
              sSpecLabelData.forEach((val) => {
                if (val.includes(subStrSS)) {
                  var ind4DatasetSS = sSpecLabelData.findIndex(() => val);
                  // console.log(ind4DatasetSS);
                  sSpecDataset[ind4DatasetSS] =
                    sSpecDataset[ind4DatasetSS] + +v.Confirmed.N;
                  loopMaGyoKeNaiSS = true;
                }
              });
              if (!loopMaGyoKeNaiSS) {
                sSpecLabelData.push(v.ObservationDate.S);
                sSpecDataset.push(+v.Confirmed.N);
                backC.push(random_rgb());
              }

              sSpecLabelDataF = sSpecLabelData.map((v) => {
                return v.substring(3, 10);
              });
              var sorted = sSpecLabelData.sort(function (a, b) {
                a = a.split("-");
                b = b.split("-");
                return new Date(a[2], a[1], 1) - new Date(b[2], b[1], 1);
              });
            }
          } else {
            // console.log("entered");
            // if (
            //   !(
            //     v.ObservationDate.S == sSpecLabelData[sSpecLabelData.length - 1]
            //   )
            // ) {
            //   sSpecLabelData.push(v.ObservationDate.S);
            //   sSpecDataset.push(+v.Confirmed.N);
            // } else {
            //   sSpecDataset[sSpecDataset.length - 1] =
            //     sSpecDataset[sSpecDataset.length - 1] + +v.Confirmed.N;
            // }

            var subStrSS = v.ObservationDate.S.substring(2, 6);
            // console.log(subStr, typeof subStr);
            var loopMaGyoKeNaiSS = false;
            sSpecLabelData.forEach((val) => {
              if (val.includes(subStrSS)) {
                var ind4DatasetSS = sSpecLabelData.findIndex(() => val);
                // console.log(ind4DatasetSS);
                sSpecDataset[ind4DatasetSS] =
                  sSpecDataset[ind4DatasetSS] + +v.Confirmed.N;
                loopMaGyoKeNaiSS = true;
              }
            });
            if (!loopMaGyoKeNaiSS) {
              sSpecLabelData.push(v.ObservationDate.S);
              sSpecDataset.push(+v.Confirmed.N);
              backC.push(random_rgb());
            }

            sSpecLabelDataF = sSpecLabelData.map((v) => {
              return v.substring(3, 10);
            });
            var sorted = sSpecLabelData.sort(function (a, b) {
              a = a.split("-");
              b = b.split("-");
              return new Date(a[2], a[1], 1) - new Date(b[2], b[1], 1);
            });
          }
        }
      }
    });
  }

  // console.log(countryData);
  // console.log(sSpecDataset);

  const selectedCountry = (val) => {
    setCountrySelected(val);
  };

  const selectedState = (val) => {
    setStateSelected(val);
  };

  // console.log(stateSelected);

  if (fetchedData.length != 0) {
    var dataSetTotal = dataSet.reduce((acc, v) => {
      return (acc += v);
    });

    var recoveredData = fetchedData
      .map((v, k) => {
        return +v.Recovered.N;
      })
      .reduce((acc, v) => {
        return (acc += v);
      });

    var deathData = fetchedData
      .map((v, k) => {
        return +v.Deaths.N;
      })
      .reduce((acc, v) => {
        return (acc += v);
      });
  }

  if (
    specDataset.length != 0 ||
    specRecovered.length != 0 ||
    specDeaths.length != 0
  ) {
    var specDatasetTotal = specDataset.reduce((acc, v) => {
      return (acc += v);
    });

    var specRecoveredTotal = specRecovered.reduce((acc, v) => {
      return (acc += v);
    });

    var specDeathsTotal = specDeaths.reduce((acc, v) => {
      return (acc += v);
    });
  }

  //  state spec
  if (
    sSpecDataset.length != 0 ||
    sSpecRecovered.length != 0 ||
    sSpecDeaths.length != 0
  ) {
    var sSpecDatasetTotal = sSpecDataset.reduce((acc, v) => {
      return (acc += v);
    });

    var sSpecRecoveredTotal = sSpecRecovered.reduce((acc, v) => {
      return (acc += v);
    });

    var sSpecDeathsTotal = sSpecDeaths.reduce((acc, v) => {
      return (acc += v);
    });
  }

  let chartElement;
  if (fetchedData.length != 0) {
    if (countrySelected == "Worldwide") {
      if (showInGraph) {
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={["Infected", "Recovered", "Death"]}
            dataSet={[dataSetTotal, recoveredData, deathData]}
            backC={["orange", "green", "red"]}
            yAxisLable="Count"
            xAxisLable=" "
          />
        );
      } else
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={labelDataF}
            dataSet={dataSet}
            backC={backC}
          />
        );
    } else if (stateSelected != "nothing") {
      if (showInGraph) {
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={["Infected", "Recovered", "Death"]}
            dataSet={[sSpecDatasetTotal, sSpecRecoveredTotal, sSpecDeathsTotal]}
            backC={["orange", "green", "red"]}
            yAxisLable="Count"
            xAxisLable=" "
          />
        );
      } else
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={sSpecLabelDataF}
            dataSet={sSpecDataset}
            backC={backC}
          />
        );
    } else {
      if (showInGraph) {
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={["Infected", "Recovered", "Death"]}
            dataSet={[specDatasetTotal, specRecoveredTotal, specDeathsTotal]}
            backC={["orange", "green", "red"]}
            yAxisLable="Count"
            xAxisLable=" "
          />
        );
      } else
        chartElement = (
          <Chart
            event="Covid 19"
            labelData={specLabelDataF}
            dataSet={specDataset}
            backC={backC}
          />
        );
    }
  }

  let cardsElement;
  if (fetchedData.length != 0) {
    if (countrySelected == "Worldwide") {
      cardsElement = (
        <Cards
          infected={dataSetTotal}
          recovered={recoveredData}
          death={deathData}
        />
      );
    } else if (stateSelected != "nothing") {
      cardsElement = (
        <Cards
          infected={sSpecDatasetTotal}
          recovered={sSpecRecoveredTotal}
          death={sSpecDeathsTotal}
        />
      );
    } else {
      cardsElement = (
        <Cards
          infected={specDatasetTotal}
          recovered={specRecoveredTotal}
          death={specDeathsTotal}
        />
      );
    }
  }

  return (
    <div className="App">
      {fetchedData.length != 0 ? (
        <>
          <CountryDropDown
            countryData={countryData}
            selectedCountry={selectedCountry}
            selected={countrySelected}
          />{" "}
          <br />
          {countrySelected == "Worldwide" || (
            <StateDropDown
              stateData={stateData}
              selected={stateSelected}
              selectedState={selectedState}
            />
          )}
          {cardsElement}
          <button
            onClick={() => {
              setShowInGraph(!showInGraph);
            }}
          >
            {showInGraph ? "Back" : "Show In Graph above Data"}
          </button>
          {chartElement}
        </>
      ) : (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Loader} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
