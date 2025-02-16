import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -1.9396, // Kigali coordinates
  lng: 30.0444,
};

export default function MapComponent({ pharmacies }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


  const [hoveredPharmacy, setHoveredPharmacy] = useState(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  // Ensure pharmacies is an array
  const pharmacyList = Array.isArray(pharmacies) ? pharmacies : [pharmacies];

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {pharmacyList.map((pharmacy) =>
        pharmacy?.location ? ( // Ensure location exists
          <Marker
            key={pharmacy.id || pharmacy.name}
            position={{ lat: pharmacy.location.lat, lng: pharmacy.location.lng }}
            onMouseOver={() => setHoveredPharmacy(pharmacy.name)}
            onMouseOut={() => setHoveredPharmacy(null)}
            icon={{
              url:
                hoveredPharmacy === pharmacy.name
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Red marker on hover
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker by default
            }}
          />
        ) : null
      )}
    </GoogleMap>
  );
}


