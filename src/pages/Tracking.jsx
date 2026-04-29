import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bike,
  CalendarClock,
  CheckCircle,
  CircleUserRound,
  MessageSquare,
  Phone,
  ShieldAlert,
} from "lucide-react";
import {
  geocodeAddress,
  getDefaultLocation,
  normalizeCoordinates,
  resolvePlace,
} from "../utils/location";

const FALLBACK_DROP = "MG Road, Bengaluru, Karnataka, India";

function Tracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const tripPickup = location.state?.pickup;
  const tripDrop = location.state?.drop || FALLBACK_DROP;
  const selectedRide = location.state?.selectedRide;
  const totalFare = Number(selectedRide?.price) || 120;
  const [pickup, setPickup] = useState({
    coordinates: normalizeCoordinates(tripPickup),
    label: "Finding pickup...",
  });
  const [routePoints, setRoutePoints] = useState([]);
  const [drop, setDrop] = useState({
    coordinates: null,
    label: typeof tripDrop === "string" ? tripDrop : "Finding destination...",
  });

  useEffect(() => {
    let isMounted = true;

    const updatePickup = async () => {
      const stateCoordinates = normalizeCoordinates(tripPickup);

      if (stateCoordinates) {
        const label = await resolvePlace(tripPickup, "Current location");
        if (isMounted) setPickup({ coordinates: stateCoordinates, label });
        return;
      }

      if (!navigator.geolocation) {
        const fallback = getDefaultLocation();
        if (isMounted) setPickup({ coordinates: fallback, label: fallback.label });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const label = await resolvePlace(coordinates, "Current location");
          if (isMounted) setPickup({ coordinates, label });
        },
        () => {
          const fallback = getDefaultLocation();
          if (isMounted) setPickup({ coordinates: fallback, label: fallback.label });
        }
      );
    };

    updatePickup();

    return () => {
      isMounted = false;
    };
  }, [tripPickup]);

  useEffect(() => {
    let isMounted = true;

    const updateDrop = async () => {
      const stateCoordinates = normalizeCoordinates(tripDrop);

      if (stateCoordinates) {
        const label = await resolvePlace(tripDrop, "Destination");
        if (isMounted) setDrop({ coordinates: stateCoordinates, label });
        return;
      }

      let coordinates = null;

      try {
        coordinates = await geocodeAddress(tripDrop);
      } catch {
        coordinates = null;
      }

      if (isMounted) {
        setDrop({
          coordinates,
          label: coordinates?.label || tripDrop,
        });
      }
    };

    updateDrop();

    return () => {
      isMounted = false;
    };
  }, [tripDrop]);

  useEffect(() => {
    let isMounted = true;

    const updateRoute = async () => {
      if (!pickup.coordinates || !drop.coordinates) {
        if (isMounted) setRoutePoints([]);
        return;
      }

      try {
        const route = await fetchRoute(pickup.coordinates, drop.coordinates);
        if (isMounted) setRoutePoints(route);
      } catch {
        if (isMounted) setRoutePoints([pickup.coordinates, drop.coordinates]);
      }
    };

    updateRoute();

    return () => {
      isMounted = false;
    };
  }, [drop.coordinates, pickup.coordinates]);

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-4 sm:px-6 lg:px-10">
      <div
        data-map-provider="openstreetmap"
        className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-4xl bg-cyan-50 shadow-2xl ring-1 ring-black/10 lg:min-h-195 lg:max-w-7xl"
      >
        {/* <header className="flex items-center justify-between bg-cyan-100 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-gray-700 transition hover:bg-white/70">
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-extrabold text-gray-950 lg:text-2xl">
              QuickBike
            </h1>
          </div>

          <div className="hidden items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 lg:flex">
            <Bike size={18} className="text-orange-500" />
            Live Ride Tracking
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <UserRound className="text-gray-700" size={24} />
          </div>
        </header> */}

        <section className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="relative min-h-135 overflow-hidden bg-cyan-200 sm:min-h-155 lg:min-h-0">
            <RouteMap
              pickupCoordinates={pickup.coordinates}
              dropCoordinates={drop.coordinates}
              routePoints={routePoints}
            />
            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/15 via-transparent to-black/10" />

            <div className="absolute left-1/2 top-5 z-10 flex w-[86%] -translate-x-1/2 items-center justify-between rounded-3xl bg-white/95 px-5 py-4 shadow-xl lg:left-8 lg:top-8 lg:w-90 lg:translate-x-0">
              <div>
                <h2 className="text-lg font-extrabold text-gray-950">
                  Arriving in 4 mins
                </h2>
                <p className="text-sm text-gray-500">Live route on OpenStreetMap</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-700">
                  {formatCurrency(totalFare)}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                  Fixed Fare
                </p>
              </div>
            </div>

            <div className="absolute bottom-46 left-4 right-4 z-10 grid gap-3 sm:grid-cols-2 lg:bottom-8 lg:left-8 lg:right-8">
              <LocationPill title="Pickup" value={pickup.label} tone="pickup" />
              <LocationPill title="Drop-off" value={drop.label} tone="drop" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-4xl bg-white px-6 pb-5 pt-6 shadow-2xl lg:hidden">
              <RideDetails />
            </div>
          </div>

          <aside className="hidden bg-white p-6 shadow-2xl lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                Driver details
              </p>
              <div className="mt-5 rounded-3xl bg-slate-50 p-5 ring-1 ring-black/5">
                <RideDetails />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-cyan-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Pickup
                  </p>
                  <p className="mt-1 truncate font-extrabold text-gray-950">
                    {pickup.label}
                  </p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Fare
                  </p>
                  <p className="mt-1 font-extrabold text-orange-700">
                    {formatCurrency(totalFare)}
                  </p>
                </div>
              </div>
            </div>

            <nav className="mt-6 grid grid-cols-3 rounded-3xl bg-cyan-50 p-3">
              <NavItem active icon={Bike} label="Ride" onClick={() => navigate("/")} />
              <NavItem
                icon={CalendarClock}
                label="Activity"
                onClick={() => navigate("/activity")}
              />
              <NavItem
                icon={CircleUserRound}
                label="Account"
                onClick={() => navigate("/account")}
              />
            </nav>
          </aside>
        </section>

        <nav className="grid grid-cols-3 bg-cyan-50 px-6 pb-5 pt-4 lg:hidden">
          <NavItem active icon={Bike} label="Ride" onClick={() => navigate("/")} />
          <NavItem
            icon={CalendarClock}
            label="Activity"
            onClick={() => navigate("/activity")}
          />
          <NavItem
            icon={CircleUserRound}
            label="Account"
            onClick={() => navigate("/account")}
          />
        </nav>
      </div>
    </main>
  );
}

function LocationPill({ title, value, tone }) {
  const toneClass =
    tone === "pickup"
      ? "border-orange-200 bg-white/95 text-orange-700"
      : "border-cyan-200 bg-white/95 text-cyan-700";

  return (
    <div className={`rounded-3xl border px-4 py-3 shadow-xl backdrop-blur ${toneClass}`}>
      <p className="text-[11px] font-black uppercase tracking-wide">{title}</p>
      <p className="mt-1 truncate text-sm font-bold text-gray-950">{value}</p>
    </div>
  );
}

function RouteMap({ pickupCoordinates, dropCoordinates, routePoints }) {
  const mapRef = useRef(null);
  const [mapScale, setMapScale] = useState(1);
  const map = useMemo(
    () => buildTileMap(pickupCoordinates, dropCoordinates, routePoints),
    [dropCoordinates, pickupCoordinates, routePoints]
  );

  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement) return undefined;

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const direction = event.deltaY > 0 ? -1 : 1;
      setMapScale((currentScale) =>
        clamp(currentScale + direction * 0.15, 0.8, 3)
      );
    };

    mapElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      mapElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="absolute inset-0 overflow-hidden bg-cyan-100 touch-none"
      aria-label="Map route from pickup to drop-off"
      role="img"
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      >
        <g transform={`translate(${MAP_WIDTH / 2} ${MAP_HEIGHT / 2}) scale(${mapScale}) translate(${-MAP_WIDTH / 2} ${-MAP_HEIGHT / 2})`}>
          {map.tiles.map((tile) => (
            <image
              key={`${tile.zoom}-${tile.x}-${tile.y}`}
              href={`https://tile.openstreetmap.org/${tile.zoom}/${tile.x}/${tile.y}.png`}
              x={tile.screenX}
              y={tile.screenY}
              width={tile.size}
              height={tile.size}
              preserveAspectRatio="none"
            />
          ))}

          <path
            d={map.routePath}
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            opacity="0.95"
          />
          <path
            d={map.routePath}
            fill="none"
            stroke="#f97316"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="9"
          />

          <MapMarker coordinates={pickupCoordinates || map.fallback} map={map} type="pickup" />
          {dropCoordinates ? <MapMarker coordinates={dropCoordinates} map={map} type="drop" /> : null}
        </g>
      </svg>
    </div>
  );
}

function MapMarker({ coordinates, map, type }) {
  const point = projectToScreen(coordinates, map);
  const fill = type === "pickup" ? "#f97316" : "#0891b2";
  const label = type === "pickup" ? "P" : "D";

  return (
    <g transform={`translate(${point.x} ${point.y})`}>
      <circle r="18" fill="white" opacity="0.96" />
      <circle r="12" fill={fill} />
      <text
        y="4"
        fill="white"
        fontSize="12"
        fontWeight="900"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 720;
const TILE_SIZE = 256;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

async function fetchRoute(pickupCoordinates, dropCoordinates) {
  const url = `https://router.project-osrm.org/route/v1/driving/${pickupCoordinates.lng},${pickupCoordinates.lat};${dropCoordinates.lng},${dropCoordinates.lat}?overview=full&geometries=geojson`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch route");
  }

  const result = await response.json();
  const coordinates = result.routes?.[0]?.geometry?.coordinates;

  if (!coordinates?.length) {
    throw new Error("Route not found");
  }

  return coordinates.map(([lng, lat]) => ({ lat, lng }));
}

function buildTileMap(pickupCoordinates, dropCoordinates, routePoints) {
  const fallback = getDefaultLocation();
  const route = routePoints.length
    ? routePoints
    : [pickupCoordinates, dropCoordinates].filter(Boolean);
  const mapPoints = route.length ? route : [fallback];
  const zoom = chooseZoom(mapPoints);
  const projectedPoints = mapPoints.map((point) => projectToWorld(point, zoom));
  const xs = projectedPoints.map((point) => point.x);
  const ys = projectedPoints.map((point) => point.y);
  const padding = TILE_SIZE * 1.2;
  const minX = Math.min(...xs) - padding;
  const maxX = Math.max(...xs) + padding;
  const minY = Math.min(...ys) - padding;
  const maxY = Math.max(...ys) + padding;
  const scale = Math.min(MAP_WIDTH / (maxX - minX), MAP_HEIGHT / (maxY - minY));
  const offsetX = (MAP_WIDTH - (maxX - minX) * scale) / 2;
  const offsetY = (MAP_HEIGHT - (maxY - minY) * scale) / 2;
  const visibleMinX = minX - offsetX / scale;
  const visibleMaxX = minX + (MAP_WIDTH - offsetX) / scale;
  const visibleMinY = minY - offsetY / scale;
  const visibleMaxY = minY + (MAP_HEIGHT - offsetY) / scale;
  const tileMinX = Math.floor(visibleMinX / TILE_SIZE);
  const tileMaxX = Math.floor(visibleMaxX / TILE_SIZE);
  const tileMinY = Math.floor(visibleMinY / TILE_SIZE);
  const tileMaxY = Math.floor(visibleMaxY / TILE_SIZE);
  const tiles = [];

  for (let x = tileMinX; x <= tileMaxX; x += 1) {
    for (let y = tileMinY; y <= tileMaxY; y += 1) {
      tiles.push({
        x,
        y,
        zoom,
        screenX: (x * TILE_SIZE - minX) * scale + offsetX,
        screenY: (y * TILE_SIZE - minY) * scale + offsetY,
        size: TILE_SIZE * scale,
      });
    }
  }

  return {
    fallback,
    minX,
    minY,
    offsetX,
    offsetY,
    routePath: buildRoutePath(route.length ? route : [fallback], {
      minX,
      minY,
      offsetX,
      offsetY,
      scale,
      zoom,
    }),
    scale,
    tiles,
    zoom,
  };
}

function chooseZoom(points) {
  if (points.length < 2) return 14;

  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);
  const span = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs));

  if (span > 0.35) return 10;
  if (span > 0.18) return 11;
  if (span > 0.08) return 12;
  if (span > 0.035) return 13;
  return 14;
}

function buildRoutePath(points, map) {
  return points
    .map((point, index) => {
      const screenPoint = projectToScreen(point, map);
      return `${index === 0 ? "M" : "L"} ${screenPoint.x.toFixed(1)} ${screenPoint.y.toFixed(1)}`;
    })
    .join(" ");
}

function projectToScreen(point, map) {
  const worldPoint = projectToWorld(point, map.zoom);

  return {
    x: (worldPoint.x - map.minX) * map.scale + map.offsetX,
    y: (worldPoint.y - map.minY) * map.scale + map.offsetY,
  };
}

function projectToWorld(point, zoom) {
  const sinLat = Math.sin((point.lat * Math.PI) / 180);
  const scale = TILE_SIZE * 2 ** zoom;

  return {
    x: ((point.lng + 180) / 360) * scale,
    y:
      (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) *
      scale,
  };
}

function RideDetails() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-700 to-orange-400 text-2xl font-extrabold text-white">
          BS
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
            4.9
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-extrabold text-gray-950">
            Budi Santoso
          </h3>
          <p className="truncate text-sm text-gray-500">
            Honda Vario - B 4932 KLP
          </p>
        </div>

        <div className="text-center">
          <CheckCircle className="mx-auto fill-orange-500 text-orange-500" size={24} />
          <p className="mt-1 text-[10px] font-bold uppercase leading-3 text-gray-500">
            Pro
            <br />
            Driver
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-full bg-gray-200 px-4 py-4 font-bold text-gray-800 transition hover:bg-gray-300">
          <Phone size={19} />
          Call Driver
        </button>
        <button className="flex items-center justify-center gap-2 rounded-full bg-gray-200 px-4 py-4 font-bold text-gray-800 transition hover:bg-gray-300">
          <MessageSquare size={19} />
          Message
        </button>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-700 to-orange-500 px-5 py-4 text-base font-extrabold text-gray-950 shadow-xl shadow-orange-500/20 transition hover:from-orange-800 hover:to-orange-500"
      >
        <ShieldAlert size={20} />
        Safety Center & SOS
      </button>
    </>
  );
}

function NavItem({ active = false, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${
        active ? "text-orange-500" : "text-gray-400"
      }`}
    >
      <span className={`${active ? "rounded-full bg-white shadow-sm" : ""} p-3`}>
        {createElement(icon, { size: 20 })}
      </span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

export default Tracking;

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}
