import { Hotel } from "./hotel";

export function generateHotels(documentsCount: number): Hotel[] {
  const hotels: Hotel[] = [];
  for (let i = 0; i < documentsCount; i++) {
    hotels.push(createHotel(i));
  }
  return hotels;
}

function createHotel(hotelId: number): Hotel {
  const hotel: Hotel = {
    hotelId: hotelId.toString(),
    hotelName: "Secret Point Motel",
    description:
      "The hotel is ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Time's Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
    descriptionFr:
      "L'hôtel est idéalement situé sur la principale artère commerciale de la ville en plein cœur de New York. A quelques minutes se trouve la place du temps et le centre historique de la ville, ainsi que d'autres lieux d'intérêt qui font de New York l'une des villes les plus attractives et cosmopolites de l'Amérique.",
    category: "Boutique",
    tags: ["pool", "air conditioning", "concierge"],
    parkingIncluded: false,
    lastRenovationDate: new Date(1970, 0, 18),
    rating: 4,
    address: {
      streetAddress: "677 5th Ave",
      city: "New York",
      stateProvince: "NY",
      country: "USA",
      postalCode: "10022",
    },
  };
  return hotel;
}
