//all the neeeded imports.
import React, { useState } from "react";
import axios from "axios";
import PincodeDetails from "./components/PincodeDetails";
import "./App.css";
import './components/PincodeDetails.css';

const App = () => {
  //Setiing up all the useState values to be used
  const [pincode, setPincode] = useState("");
  const [pincodeDetails, setPincodeDetails] = useState(null);//setting it null so usestate can distiguish.
  const [loading, setLoading] = useState(false);//setting it fall so when loading it can become true.
  const [error, setError] = useState(null);
  const [filteredDetails, setFilteredDetails] = useState(null);

  //targeting input of 
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  //lookupbutton connected to loading display,
  //error and details from api as well for filter. 
  const handleLookup = () => {
    setLoading(true);
    setError(null);
    setPincodeDetails(null);
    setFilteredDetails(null);

    // Validate pincode length with setloading as false to stop.
    if (pincode.length !== 6) {
      setLoading(false);
      setError("Pincode should be 6 digits.");
      return;
    }

    // Fetch pincode details with axios
    //setting up setloading as false here
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => {
        setLoading(false);
        const [pincodeDetail] = response.data;
        console.log(response.data);//logging to check for data
        console.log(response.data[0].Message);
        const [pincodeMessage] = response.data[0].Message;
        console.log(pincodeMessage);
        //response.data is set inside array pincodeDetail
        if (pincodeDetail.Status === "Success") {
          setPincodeDetails(pincodeDetail.PostOffice);
          console.log(pincodeDetail.PostOffice);//logging to check again if data is stored
          setFilteredDetails(pincodeDetail.PostOffice);
        } else {
          setError(pincodeDetail.Message);
        }
      })//catch method to catch any error
      .catch((error) => {
        setLoading(false);
        setError(error.message);//error.message already set above
      });
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();//setting it lower case
    //error for cap words in search bar
    if (filter === "") {
      setFilteredDetails(pincodeDetails);
      //if filter is empty show all
    } else {
      const filtered = pincodeDetails.filter((detail) =>
        detail.Name.toLowerCase().includes(filter)//only show filtered word
      );
      setFilteredDetails(filtered);
      console.log(filteredDetails);
    }
  };

  return (
    <div className="app">
      {pincodeDetails ? (
        <div className="pincode-details-container">
          <input
            type="text"
            placeholder="Pincode"
            onChange={handleFilterChange}
          />
          {filteredDetails?.length > 0 ? (
            <PincodeDetails details={filteredDetails} />
          ) : (
            <div>Couldn't find the postal data you're looking for...</div>
          )}
        </div>
      ) : (
        <div style={{ display: pincodeDetails ? 'none' : 'block' }}>
          <h1>Enter Pincode </h1>
        <label htmlFor="pincode-input"></label>
        <input
          type="text"
          id="pincode-input"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button onClick={handleLookup}>Lookup</button>
      </div>
      )}
      {/* conditional rendering conditioned to error or success */}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default App;
