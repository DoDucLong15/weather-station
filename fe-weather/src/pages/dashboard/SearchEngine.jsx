import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getDevices } from "../../services/operations/deviceApi";
import { useLocation } from "react-router-dom";

function SearchEngine({ query, setQuery, search }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const id = queryParams.get('id');

  useEffect(() => {
    const fetch = async () => {
      const data = await getDevices();
      setOptions(
        data.map((row) => ({
          value: row.id,
          label: row?.location?.name ?? row.embedId,
        }))
      );
    };
    fetch();
  }, []);

  useEffect(() => {
    if(id) {
      setQuery(id);
      const select = options.find((row) => row.value === Number(id));
      setSelectedOption(select);
    }
  }, [id, options])

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setQuery(selectedOption.value);
  };

  return (
    <div className="SearchEngine">
      <div className="SelectContainer">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Select device"
        />
      </div>
      <div className="ButtonContainer">
        <button onClick={search}>
          <i style={{ fontSize: "18px" }}>Reload</i>
        </button>
      </div>
    </div>
  );
}

export default SearchEngine;
