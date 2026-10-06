import { useMemo, useState } from "react";
import {
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  MapPin,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";

const cities = {
  Riyadh: {
    country: "Saudi Arabia",
    current: {
      temperature: 34,
      feelsLike: 36,
      condition: "Sunny",
      humidity: 28,
      wind: 18,
      pressure: 1012,
      visibility: 10,
    },
    hourly: [
      { time: "Now", temperature: 34, condition: "Sunny", icon: "sun" },
      { time: "14:00", temperature: 35, condition: "Sunny", icon: "sun" },
      { time: "15:00", temperature: 35, condition: "Sunny", icon: "sun" },
      { time: "16:00", temperature: 34, condition: "Clear", icon: "sun" },
      { time: "17:00", temperature: 32, condition: "Clear", icon: "cloudSun" },
      { time: "18:00", temperature: 30, condition: "Clear", icon: "cloudSun" },
    ],
    daily: [
      { day: "Today", high: 35, low: 24, condition: "Sunny", icon: "sun" },
      { day: "Tomorrow", high: 36, low: 25, condition: "Sunny", icon: "sun" },
      { day: "Monday", high: 34, low: 23, condition: "Clear", icon: "cloudSun" },
      { day: "Tuesday", high: 33, low: 22, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Wednesday", high: 31, low: 21, condition: "Cloudy", icon: "cloud" },
      { day: "Thursday", high: 32, low: 22, condition: "Sunny", icon: "sun" },
      { day: "Friday", high: 34, low: 23, condition: "Sunny", icon: "sun" },
    ],
  },

  "Madinah": {
    country: "Saudi Arabia",
    current: {
      temperature: 38,
      feelsLike: 40,
      condition: "Sunny",
      humidity: 18,
      wind: 16,
      pressure: 1008,
      visibility: 9,
    },
    hourly: [
      { time: "Now", temperature: 38, condition: "Sunny", icon: "sun" },
      { time: "14:00", temperature: 39, condition: "Sunny", icon: "sun" },
      { time: "15:00", temperature: 40, condition: "Sunny", icon: "sun" },
      { time: "16:00", temperature: 39, condition: "Clear", icon: "sun" },
      { time: "17:00", temperature: 37, condition: "Clear", icon: "cloudSun" },
      { time: "18:00", temperature: 35, condition: "Clear", icon: "cloudSun" },
    ],
    daily: [
      { day: "Today", high: 40, low: 27, condition: "Sunny", icon: "sun" },
      { day: "Tomorrow", high: 41, low: 28, condition: "Sunny", icon: "sun" },
      { day: "Monday", high: 39, low: 27, condition: "Clear", icon: "cloudSun" },
      { day: "Tuesday", high: 38, low: 26, condition: "Sunny", icon: "sun" },
      { day: "Wednesday", high: 37, low: 25, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Thursday", high: 39, low: 26, condition: "Sunny", icon: "sun" },
      { day: "Friday", high: 40, low: 27, condition: "Sunny", icon: "sun" },
    ],
  },

  Jeddah: {
    country: "Saudi Arabia",
    current: {
      temperature: 32,
      feelsLike: 37,
      condition: "Partly Cloudy",
      humidity: 61,
      wind: 21,
      pressure: 1007,
      visibility: 8,
    },
    hourly: [
      { time: "Now", temperature: 32, condition: "Partly Cloudy", icon: "cloudSun" },
      { time: "14:00", temperature: 33, condition: "Partly Cloudy", icon: "cloudSun" },
      { time: "15:00", temperature: 33, condition: "Cloudy", icon: "cloud" },
      { time: "16:00", temperature: 32, condition: "Cloudy", icon: "cloud" },
      { time: "17:00", temperature: 31, condition: "Cloudy", icon: "cloud" },
      { time: "18:00", temperature: 30, condition: "Clear", icon: "cloudSun" },
    ],
    daily: [
      { day: "Today", high: 33, low: 28, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Tomorrow", high: 34, low: 28, condition: "Cloudy", icon: "cloud" },
      { day: "Monday", high: 33, low: 27, condition: "Cloudy", icon: "cloud" },
      { day: "Tuesday", high: 32, low: 27, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Wednesday", high: 31, low: 26, condition: "Sunny", icon: "sun" },
      { day: "Thursday", high: 32, low: 27, condition: "Clear", icon: "cloudSun" },
      { day: "Friday", high: 33, low: 28, condition: "Sunny", icon: "sun" },
    ],
  },

  Dubai: {
    country: "United Arab Emirates",
    current: {
      temperature: 35,
      feelsLike: 39,
      condition: "Partly Cloudy",
      humidity: 55,
      wind: 14,
      pressure: 1009,
      visibility: 9,
    },
    hourly: [
      { time: "Now", temperature: 35, condition: "Partly Cloudy", icon: "cloudSun" },
      { time: "14:00", temperature: 36, condition: "Sunny", icon: "sun" },
      { time: "15:00", temperature: 36, condition: "Sunny", icon: "sun" },
      { time: "16:00", temperature: 35, condition: "Partly Cloudy", icon: "cloudSun" },
      { time: "17:00", temperature: 33, condition: "Clear", icon: "cloudSun" },
      { time: "18:00", temperature: 31, condition: "Clear", icon: "cloudSun" },
    ],
    daily: [
      { day: "Today", high: 36, low: 29, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Tomorrow", high: 37, low: 29, condition: "Sunny", icon: "sun" },
      { day: "Monday", high: 36, low: 28, condition: "Sunny", icon: "sun" },
      { day: "Tuesday", high: 35, low: 28, condition: "Clear", icon: "cloudSun" },
      { day: "Wednesday", high: 34, low: 27, condition: "Partly Cloudy", icon: "cloudSun" },
      { day: "Thursday", high: 35, low: 28, condition: "Sunny", icon: "sun" },
      { day: "Friday", high: 36, low: 29, condition: "Sunny", icon: "sun" },
    ],
  },
};

function WeatherIcon({ type, size = 28 }) {
  if (type === "sun") {
    return <Sun size={size} />;
  }

  if (type === "cloud") {
    return <Cloud size={size} />;
  }

  if (type === "rain") {
    return <CloudRain size={size} />;
  }

  return <CloudSun size={size} />;
}

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function formatTemperature(celsius, unit) {
  if (unit === "F") {
    return `${toFahrenheit(celsius)}°`;
  }

  return `${Math.round(celsius)}°`;
}

export default function SkyCast() {
  const [selectedCity, setSelectedCity] = useState("Madinah");
  const [searchTerm, setSearchTerm] = useState("");
  const [unit, setUnit] = useState("C");

  const cityData = cities[selectedCity];

  const filteredCities = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return Object.keys(cities);
    }

    return Object.keys(cities).filter((city) =>
      city.toLowerCase().includes(value),
    );
  }, [searchTerm]);

  const selectCity = (city) => {
    setSelectedCity(city);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <CloudSun className="text-sky-400" size={30} />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                  SkyCast
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Weather at a glance
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                A frontend weather experience built with React using mock
                weather data.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs text-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={19}
              />

              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search city..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-sky-400/50"
              />

              {searchTerm && filteredCities.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => selectCity(city)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <MapPin size={16} className="text-sky-400" />
                      {city}
                    </button>
                  ))}
                </div>
              )}

              {searchTerm && filteredCities.length === 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-400 shadow-2xl">
                  No matching city in the mock dataset.
                </div>
              )}
            </div>

            <div className="flex rounded-2xl border border-white/10 bg-slate-900/80 p-1">
              <button
                type="button"
                onClick={() => setUnit("C")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  unit === "C"
                    ? "bg-sky-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                °C
              </button>

              <button
                type="button"
                onClick={() => setUnit("F")}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  unit === "F"
                    ? "bg-sky-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin size={18} className="text-sky-400" />
                  <span>{selectedCity}</span>
                  <span className="text-slate-500">•</span>
                  <span>{cityData.country}</span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Today, 13:00
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sky-300">
                <WeatherIcon type={cityData.hourly[0].icon} size={34} />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-7xl font-bold tracking-tighter sm:text-8xl">
                  {formatTemperature(cityData.current.temperature, unit)}
                </div>

                <p className="mt-3 text-xl font-medium text-slate-200">
                  {cityData.current.condition}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Feels like{" "}
                  {formatTemperature(cityData.current.feelsLike, unit)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Thermometer size={18} className="text-orange-300" />
                  <p className="mt-3 text-xs text-slate-500">High</p>
                  <p className="mt-1 font-semibold">
                    {formatTemperature(
                      cityData.daily[0].high,
                      unit,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Thermometer size={18} className="text-sky-300" />
                  <p className="mt-3 text-xs text-slate-500">Low</p>
                  <p className="mt-1 font-semibold">
                    {formatTemperature(
                      cityData.daily[0].low,
                      unit,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <WeatherStat
              icon={<Droplets size={20} />}
              label="Humidity"
              value={`${cityData.current.humidity}%`}
            />

            <WeatherStat
              icon={<Wind size={20} />}
              label="Wind"
              value={`${cityData.current.wind} km/h`}
            />

            <WeatherStat
              icon={<Gauge size={20} />}
              label="Pressure"
              value={`${cityData.current.pressure} hPa`}
            />

            <WeatherStat
              icon={<Sunrise size={20} />}
              label="Sunrise"
              value="05:48"
            />

            <WeatherStat
              icon={<Sunset size={20} />}
              label="Sunset"
              value="18:42"
            />

            <WeatherStat
              icon={<Gauge size={20} />}
              label="Visibility"
              value={`${cityData.current.visibility} km`}
            />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Hourly forecast</h2>
              <p className="mt-1 text-sm text-slate-500">
                Next few hours
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {cityData.hourly.map((hour) => (
              <div
                key={hour.time}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center transition hover:-translate-y-1 hover:border-sky-400/30"
              >
                <p className="text-xs font-medium text-slate-500">
                  {hour.time}
                </p>

                <div className="my-4 flex justify-center text-sky-300">
                  <WeatherIcon type={hour.icon} size={28} />
                </div>

                <p className="text-lg font-bold">
                  {formatTemperature(hour.temperature, unit)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {hour.condition}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-bold">7-day forecast</h2>
            <p className="mt-1 text-sm text-slate-500">
              Extended forecast from mock weather data
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {cityData.daily.map((day, index) => (
                <div
                  key={day.day}
                  className={`grid grid-cols-[1fr_80px_120px_100px] items-center gap-4 border-b border-white/5 py-4 last:border-0 ${
                    index === 0 ? "text-white" : "text-slate-300"
                  }`}
                >
                  <div className="font-medium">{day.day}</div>

                  <div className="flex justify-center text-sky-300">
                    <WeatherIcon type={day.icon} size={25} />
                  </div>

                  <div className="text-sm text-slate-500">
                    {day.condition}
                  </div>

                  <div className="text-right font-semibold">
                    {formatTemperature(day.high, unit)}
                    <span className="ml-2 text-slate-500">
                      {formatTemperature(day.low, unit)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-slate-600">
          SkyCast • • Mock weather data only
        </footer>
      </div>
    </main>
  );
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-sky-400/30">
      <div className="text-sky-400">{icon}</div>

      <p className="mt-4 text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}