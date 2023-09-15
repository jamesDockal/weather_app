import axios from "axios";

export class AddressService {
  async getUserCurrentAddress() {
    const { data } = await axios.get("http://ip-api.com/json");
    return data;
  }

  async getStreetData(street: string) {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?street=${street}&format=json&addressdetails=2&limit=10000`
    );

    return data;
  }
}
