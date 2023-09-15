import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { generatePalette } from "emoji-palette";
import { BallTriangle } from "react-loader-spinner";
import { Button } from "../../components/Button/Button.component";
import { Input } from "../../components/Input/Input.component";
import { toast } from "react-toastify";
import { WeatherService } from "../../services/weather.service";
import { SearchAddressModal } from "../../components/Search_address_modal/Search_address_modal.component";
import { Help } from "../../components/Help/Help.component";
import { AddressService } from "../../services/Address.service";
import { ToastService } from "../../services/Toast.service";

import "./home.styles.css";

const weatherService = new WeatherService();
const addressService = new AddressService();
const toastService = new ToastService();

export const HomePage = () => {
  const icon1 = useRef<HTMLDivElement | null>(null);
  const icon2 = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isSearchingWeather, setIsSearchingWeather] = useState(false);
  const [controller, setController] = useState({
    index: 0,
    icon1: "",
    icon2: "",
    temperature: "",
    location: "",
  });
  const [isSearchAddressModalOpen, setIsSearchAddressModalOpen] =
    useState(false);

  const searchCityWeather = async (location: string) => {
    if (!location) {
      return;
    }

    const tl = gsap.timeline();
    setIsSearchingWeather(true);

    try {
      const { icon, temperature } =
        await weatherService.searchWeatherByLocation(location);

      const palette = generatePalette(icon);
      const toRemoveColors = ["#000000", "#141414"];
      const colors = palette
        .filter((color) => !toRemoveColors.find((c) => c === color))
        .join(",");
      tl.to(
        ".home-container",
        {
          duration: 0.3,
          background: `linear-gradient(to bottom, ${colors})`,
        },
        0
      );

      setController((oldState) => {
        if (oldState.index === 1) {
          return {
            index: 0,
            icon1: icon,
            icon2: oldState.icon2,
            temperature,
            location,
          };
        }
        return {
          index: 1,
          icon1: oldState.icon1,
          icon2: icon,
          temperature,
          location,
        };
      });
    } catch (error) {
      console.log("error", error);
      let message = "An unexpected error occurred!";
      if ((error as any).response?.status === 404) {
        message = "This location was not found!";
      }

      toastService.error(message);

      setIsSearchingWeather(false);

      return;
    }

    if (!isFirstLoading) {
      tl.fromTo(
        icon1.current,
        {
          top: "calc(50% - 100px)",
          left: "50%",
        },
        {
          top: "130%",
          left: "-130%",
          duration: 1.5,
        },
        0
      );

      tl.fromTo(
        icon2.current,
        {
          top: "130%",
          left: "130%",
        },
        {
          top: "calc(50% - 100px)",
          left: "50%",
          duration: 1,
          onComplete: () => {
            const tmp = icon2.current;
            icon2.current = icon1.current;
            icon1.current = tmp;
          },
        },
        0
      );
    }

    setIsSearchingWeather(false);
  };

  useEffect(() => {
    addressService.getUserCurrentAddress().then((data) => {
      searchCityWeather(data.city).then(() => {
        setIsFirstLoading(false);
      });
    });
  }, []);

  return (
    <div className="home-container h-screen flex flex-col items-center justify-center">
      {isFirstLoading ? (
        <div className="h-screen flex items-center justify-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#aa23ff"
            visible={true}
          />
        </div>
      ) : (
        <>
          <SearchAddressModal
            isModalOpen={isSearchAddressModalOpen}
            searchCityWeather={searchCityWeather}
            setIsModalOpen={setIsSearchAddressModalOpen}
          />
          <Help />

          <div className="bg-purple-600 h-350 flex flex-col items-center  p-4 rounded-lg shadow-lg">
            <div ref={icon1} className="weather-icon icon-1">
              {controller.icon1}
            </div>

            <div ref={icon2} className="weather-icon icon-2">
              {controller.icon2}
            </div>

            <h1 className="text-white text-2xl mt-130">
              {controller.location}
            </h1>
            <h1
              className="text-white text-2xl"
              style={{
                marginBottom: "10px",
              }}
            >
              {controller.temperature}
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchCityWeather(inputRef.current!.value);
              }}
              className="flex"
            >
              <Input ref={inputRef} placeholder="Type a location" />
              <Button
                title="Search"
                type="submit"
                isLoading={isSearchingWeather}
              />
            </form>

            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out "
              style={{
                marginTop: "auto",
              }}
              onClick={() => {
                setIsSearchAddressModalOpen(true);
              }}
            >
              Search Address
            </button>
          </div>
        </>
      )}
    </div>
  );
};
