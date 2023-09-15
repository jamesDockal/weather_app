import React from "react";
import { AddressDTO } from "../../dto/address.dto";

interface Props {
  address: AddressDTO;
  onSelect: Function;
}

export const AddressRow: React.FC<Props> = ({ address, onSelect }) => {
  return (
    <div
      onClick={() => [onSelect(address)]}
      style={{
        marginTop: 16,
        backgroundColor: "white",
        padding: "8px 16px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      <div>
        {address.address.road}, {address.address.suburb}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "lightgray",
        }}
      >
        <div>
          {address.address.state}, {address.address.town}
        </div>
        <div>{address.address.postcode}</div>
      </div>
    </div>
  );
};
