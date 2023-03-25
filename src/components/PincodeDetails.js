import React from "react";

import "./PincodeDetails.css";

const PincodeDetails = ({ details }) => {
  return (
   <div className="biggie">
    <div>
        <h2>Pincode:{details[0].Pincode}</h2>
        {/* <div>{details[0].message}</div> */}
        </div>  
     <div className="pincode-details">
      {/* mapping through api using detail and index as my props */}
      
      {details.map((detail, index) => (
        <div key={index} className="post-office">
          {/* printing the info */}
          <div className="name">Name :{detail.Name}</div>
          <div className="branch">
            Branch Type: {detail.BranchType}
          </div>
          <div className="delivery">
            Delivery Status: {detail.DeliveryStatus}
          </div>
          <div className="district">
            District: {detail.District}
          </div>
          <div className="division">
            Division: {detail.Division}
          </div>
        </div>
      ))}
    </div>
   </div>
  );
};

export default PincodeDetails;
