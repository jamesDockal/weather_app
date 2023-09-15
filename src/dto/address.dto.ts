export interface AddressDTO {
  place_id: number;
  address: {
    road: string;
    town: string;
    state: string;
    postcode: string;
    suburb: string;
  };
}
