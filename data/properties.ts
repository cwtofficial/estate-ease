// Shared property data used by both the home screen and the detail screen.
// Keeping it in one place means we only update data in one spot.

export type Property = {
  id: string;
  image: string;
  category: string;
  baths: number;
  beds: number;
  sqft: number;
  price: number;
  title: string;
  location: string;
  rating: number;
  favorited: boolean;
  description: string;
};

export const properties: Property[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    category: "Appartments",
    baths: 2,
    beds: 2,
    sqft: 1200,
    price: 1200,
    title: "Modern 2 Bedroom Apartment In New York.",
    location: "Downtown, New York",
    rating: 4.5,
    favorited: true,
    description:
      "A beautiful and spacious apartment located in the heart of downtown New York. This modern apartment offers an open floor plan, updated kitchen, and stunning city views. Perfect for professionals and families alike, it features hardwood floors, high ceilings, and abundant natural light throughout. The building includes a rooftop terrace, gym, and 24-hour concierge service.",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80",
    category: "Appartments",
    baths: 3,
    beds: 3,
    sqft: 1800,
    price: 2400,
    title: "Luxury 3 Bedroom Apartment In Manhattan.",
    location: "Midtown, New York",
    rating: 4.8,
    favorited: false,
    description:
      "An exceptional luxury apartment nestled in the vibrant heart of Midtown Manhattan. Floor-to-ceiling windows frame breathtaking skyline panoramas. The chef's kitchen is fitted with premium appliances, quartz countertops, and a large island. Each bedroom has en-suite bathrooms and ample closet space. Residents enjoy full concierge service, a state-of-the-art fitness center, and private parking.",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
    category: "Villa",
    baths: 4,
    beds: 5,
    sqft: 3200,
    price: 5000,
    title: "Stunning 5 Bedroom Villa In Beverly Hills.",
    location: "Beverly Hills, LA",
    rating: 4.9,
    favorited: false,
    description:
      "A world-class villa set on a quiet tree-lined street in the prestigious Beverly Hills enclave. This architectural masterpiece features soaring vaulted ceilings, wide-plank oak floors, and a gourmet kitchen with top-of-the-line appliances. The resort-style backyard showcases a heated infinity pool, outdoor kitchen, and manicured gardens — ideal for grand-scale entertaining or serene private retreats.",
  },
];
