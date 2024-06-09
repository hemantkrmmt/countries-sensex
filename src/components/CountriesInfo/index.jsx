import React, { useState } from "react";
import constants from "../../constants.json";
import Dropdown from "../Dropdown";
import locale from "../../localization/en/index.json"
import "./style.css"

const CountriesInfo = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [polulationRange, setPopulationRange] = useState(undefined);

  const filteredData = data?.filter((datum) => {
    return (
      datum.name.toLocaleLowerCase().includes(searchText) &&
      (polulationRange ? datum.population < polulationRange : true)
    );
  });

  const tableColumns = [
    { key: "name", label: locale.country_name},
    { key: "abbreviation", label: locale.code },
    { key: "capital", label: locale.capital },
    { key: "phone", label: locale.ph_code },
    { key: "population", label: locale.population },
    { key: "media", label: locale.flag, type: "image", imgSrcKey: "flag" },
  ];

  const resetFilters = () => {
    setSearchText("");
    setPopulationRange(undefined);
  }

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="search-container">
            <input
          type="text"
          value={searchText}
          placeholder="Country Name"
          onChange={(e) => {
            setSearchText(e.target.value.toLocaleLowerCase());
          }}
        />
        <Dropdown
          placeholderText="Population"
          selectedValue={polulationRange}
          setValue={setPopulationRange}
          options={constants.rangeOptions}
        />
        <a href="#" onClick={resetFilters}>Clear</a>
        </div>
        <button className="button" onClick={resetFilters}>Show All Countries</button>
      </div>

      {data && (
        <table>
          <thead>
            <tr>
              {tableColumns.map(({ label }, index) => {
                return (
                  <th key={"ht"+ index} className="table-header" >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((datum) => {
              return (
                <tr>
                  {tableColumns.map((column, index) => {
                    if (column?.type === "image") {
                      return (
                        <td key={index}>
                          <img
                            src={datum[column.key][column["imgSrcKey"]]}
                            width="100px"
                            alt="flag"
                          />
                        </td>
                      );
                    }
                    return <td key={index}>{datum[column?.key]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}{" "}
    </div>
  );
};

export default CountriesInfo;
