const DEFAULT_LOCATION = {
  lat: 12.9716,
  lng: 77.5946,
  label: "Bengaluru, Karnataka, India",
};

const addressCache = new Map();
const coordinateCache = new Map();

export const hasCoordinates = (place) =>
  place &&
  typeof place === "object" &&
  Number.isFinite(Number(place.lat)) &&
  Number.isFinite(Number(place.lng));

export const normalizeCoordinates = (place) => {
  if (!hasCoordinates(place)) return null;

  return {
    lat: Number(place.lat),
    lng: Number(place.lng),
  };
};

export const formatCoordinates = (place) => {
  const coordinates = normalizeCoordinates(place);
  if (!coordinates) return "";

  return `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
};

export const formatNominatimAddress = (result) => {
  if (!result) return "";

  const address = result.address || {};
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.county;
  const region = address.state || address.region;
  const country = address.country;

  return [city, region, country].filter(Boolean).join(", ") || result.display_name || "";
};

export const reverseGeocode = async (place) => {
  const coordinates = normalizeCoordinates(place);
  if (!coordinates) return typeof place === "string" ? place : "";

  const cacheKey = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  if (addressCache.has(cacheKey)) return addressCache.get(cacheKey);

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`
  );

  if (!response.ok) {
    throw new Error("Unable to reverse geocode location");
  }

  const result = await response.json();
  const label = formatNominatimAddress(result) || formatCoordinates(coordinates);
  addressCache.set(cacheKey, label);
  return label;
};

export const geocodeAddress = async (address) => {
  if (!address || typeof address !== "string") return null;

  const cacheKey = address.trim().toLowerCase();
  if (coordinateCache.has(cacheKey)) return coordinateCache.get(cacheKey);

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
      address
    )}&limit=1&addressdetails=1`
  );

  if (!response.ok) {
    throw new Error("Unable to geocode address");
  }

  const [result] = await response.json();
  if (!result) return null;

  const coordinates = {
    lat: Number(result.lat),
    lng: Number(result.lon),
    label: formatNominatimAddress(result) || address,
  };

  coordinateCache.set(cacheKey, coordinates);
  return coordinates;
};

export const resolvePlace = async (place, fallback = "Current location") => {
  if (!place) return fallback;
  if (typeof place === "string") return place;

  try {
    return await reverseGeocode(place);
  } catch {
    return formatCoordinates(place) || fallback;
  }
};

export const getDefaultLocation = () => DEFAULT_LOCATION;
