import React, { useRef, useState } from "react";
import { Modal } from "../Modal/Modal.component";
import { AddressDTO } from "../../dto/address.dto";
import { Input } from "../Input/Input.component";
import { Button } from "../Button/Button.component";
import { AddressRow } from "../Address_row/Address_row.component";
import { AddressService } from "../../services/Address.service";

const addressService = new AddressService();

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  searchCityWeather: (location: string) => void;
}

export const SearchAddressModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  searchCityWeather,
}) => {
  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const [isSearchingAddresses, setIsSearchingAddresses] = useState(false);

  const searchAddressInput = useRef<any>(null);

  const handleSearchAddresses = async () => {
    setIsSearchingAddresses(true);

    const data = await addressService.getStreetData(
      searchAddressInput.current.value
    );

    setIsSearchingAddresses(false);
    setAddresses(data);
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchAddresses();
        }}
        style={{
          display: "flex",
        }}
      >
        <Input ref={searchAddressInput} placeholder="Type your street" />
        <Button title="Search" type="submit" isLoading={isSearchingAddresses} />
      </form>

      <div>
        {addresses.map((address) => (
          <AddressRow
            onSelect={(address: AddressDTO) => {
              searchCityWeather(
                address.address.suburb ||
                  address.address.town ||
                  address.address.state
              );
              setIsModalOpen(false);
            }}
            key={address.place_id}
            address={address}
          />
        ))}
      </div>
    </Modal>
  );
};
