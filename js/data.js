/**
 * Smart Tour - Comprehensive Destination & Attraction Data
 */

const DESTINATIONS_DATA = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    continent: "Europe",
    tagline: "The City of Light, Art, and Romance",
    description: "Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 3420,
    budgetTier: "$$$",
    avgCostPerDay: 180,
    currency: "EUR",
    bestSeason: "Spring (Apr–Jun) & Autumn (Sep–Nov)",
    weather: { temp: "18°C", icon: "cloud-sun", desc: "Mild & Pleasant" },
    lat: 48.8566,
    lng: 2.3522,
    categories: ["Culture", "Romance", "Food", "Heritage"],
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Notre-Dame", "Montmartre"],
    localTips: [
      "Buy a Paris Museum Pass to skip long ticketing lines.",
      "Use the Metro (RATP) for fast and affordable travel around the city.",
      "Tipping is included in restaurant bills, but leaving 5-10% extra for great service is appreciated."
    ],
    attractions: [
      {
        id: "paris-eiffel",
        name: "Eiffel Tower & Champ de Mars",
        category: "Heritage",
        duration: "2.5 hours",
        cost: 28,
        rating: 4.9,
        lat: 48.8584,
        lng: 2.2945,
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
        description: "Iconic iron lattice tower on the Champ de Mars, offering stunning panoramic views of Paris.",
        recommendedTime: "09:30 AM",
        tips: "Book tickets online 2 months in advance to access the summit."
      },
      {
        id: "paris-louvre",
        name: "The Louvre Museum",
        category: "Culture",
        duration: "3.5 hours",
        cost: 22,
        rating: 4.8,
        lat: 48.8606,
        lng: 2.3376,
        image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=600&q=80",
        description: "The world's largest art museum, home to the Mona Lisa, Venus de Milo, and thousands of historic masterpieces.",
        recommendedTime: "01:30 PM",
        tips: "Enter through the Porte des Lions entrance to bypass main pyramid crowds."
      },
      {
        id: "paris-seine",
        name: "Seine River Evening Sunset Cruise",
        category: "Romance",
        duration: "1.5 hours",
        cost: 18,
        rating: 4.7,
        lat: 48.8590,
        lng: 2.3315,
        image: "https://images.unsplash.com/photo-1509299349698-ab22323ae696?auto=format&fit=crop&w=600&q=80",
        description: "Glide past Paris's illuminated monuments under the bridges of the Seine.",
        recommendedTime: "07:00 PM",
        tips: "Choose an open-deck glass boat for unobstructed sunset photos."
      },
      {
        id: "paris-montmartre",
        name: "Montmartre & Sacré-Cœur Basilica",
        category: "Culture",
        duration: "3 hours",
        cost: 0,
        rating: 4.8,
        lat: 48.8867,
        lng: 2.3431,
        image: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=600&q=80",
        description: "Charming hilltop neighborhood known for bohemian artistic history, cobblestone streets, and the white dome of Sacré-Cœur.",
        recommendedTime: "10:00 AM",
        tips: "Visit Place du Tertre to get your portrait painted by street artists."
      },
      {
        id: "paris-versailles",
        name: "Palace of Versailles & Gardens",
        category: "Heritage",
        duration: "4 hours",
        cost: 30,
        rating: 4.9,
        lat: 48.8049,
        lng: 2.1204,
        image: "https://images.unsplash.com/photo-1584003564911-a7a321c84e1c?auto=format&fit=crop&w=600&q=80",
        description: "Opulent royal chateau featuring the Hall of Mirrors and magnificent fountains and gardens.",
        recommendedTime: "09:00 AM",
        tips: "Take RER C train directly from central Paris to Versailles-Château-Rive Gauche."
      },
      {
        id: "paris-food-tour",
        name: "Le Marais Gourmet Pastry & Cheese Tour",
        category: "Food",
        duration: "2.5 hours",
        cost: 65,
        rating: 4.9,
        lat: 48.8570,
        lng: 2.3590,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        description: "Sample fresh croissants, macarons, artisanal cheeses, and wines in the trendy Marais district.",
        recommendedTime: "03:00 PM",
        tips: "Come with an empty stomach!"
      }
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    tagline: "Heart of Ancient Traditions and Zen Gardens",
    description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    rating: 4.95,
    reviewsCount: 2890,
    budgetTier: "$$",
    avgCostPerDay: 140,
    currency: "JPY",
    bestSeason: "Spring (Cherry Blossom) & Autumn (Foliage)",
    weather: { temp: "21°C", icon: "sun", desc: "Clear & Crisp" },
    lat: 35.0116,
    lng: 135.7681,
    categories: ["Culture", "Nature", "Heritage", "Food"],
    highlights: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji", "Gion Geisha District", "Kiyomizu-dera"],
    localTips: [
      "Get an ICOCA or Suica transit card for seamless bus and train journeys.",
      "Early mornings (around 7 AM) are essential to experience Fushimi Inari without dense crowds.",
      "Always take off shoes when entering traditional ryokans or temple interiors."
    ],
    attractions: [
      {
        id: "kyoto-fushimi",
        name: "Fushimi Inari Taisha (10,000 Torii Gates)",
        category: "Heritage",
        duration: "3 hours",
        cost: 0,
        rating: 4.9,
        lat: 34.9671,
        lng: 135.7727,
        image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=600&q=80",
        description: "Iconic Shinto shrine famous for thousands of vermilion torii gates straddling trails up Mount Inari.",
        recommendedTime: "07:30 AM",
        tips: "Hike up past the Yotsutsuji intersection for quiet panoramic views over Kyoto."
      },
      {
        id: "kyoto-bamboo",
        name: "Arashiyama Bamboo Grove & Tenryu-ji",
        category: "Nature",
        duration: "2.5 hours",
        cost: 5,
        rating: 4.8,
        lat: 35.0170,
        lng: 135.6713,
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80",
        description: "Soaring stalks of bamboo that sway in the wind, adjacent to World Heritage UNESCO temple gardens.",
        recommendedTime: "10:30 AM",
        tips: "Rent a bicycle near Arashiyama Station to explore the surrounding river paths."
      },
      {
        id: "kyoto-kinkakuji",
        name: "Kinkaku-ji (Golden Pavilion)",
        category: "Heritage",
        duration: "1.5 hours",
        cost: 4,
        rating: 4.8,
        lat: 35.0394,
        lng: 135.7292,
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
        description: "Zen Buddhist temple covered in gold leaf overlooking a tranquil reflecting pond.",
        recommendedTime: "02:00 PM",
        tips: "Best afternoon lighting reflects off the gold leaf into the mirror pond."
      },
      {
        id: "kyoto-gion",
        name: "Gion District Evening Walk & Tea House",
        category: "Culture",
        duration: "2 hours",
        cost: 25,
        rating: 4.7,
        lat: 35.0037,
        lng: 135.7772,
        image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=600&q=80",
        description: "Historic neighborhood of wooden machiya houses, traditional teahouses, and glimpses of Geikos and Maikos.",
        recommendedTime: "06:00 PM",
        tips: "Respect local signs forbidding photography on private residential alleys."
      },
      {
        id: "kyoto-kiyomizu",
        name: "Kiyomizu-dera Temple & Ninenzaka Streets",
        category: "Heritage",
        duration: "2.5 hours",
        cost: 4,
        rating: 4.9,
        lat: 34.9949,
        lng: 135.7850,
        image: "https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=600&q=80",
        description: "Wooden temple famous for its massive stage with sweeping city views and sacred Otowa spring waters.",
        recommendedTime: "04:00 PM",
        tips: "Walk down Ninenzaka and Sannenzaka for matcha ice cream and souvenir crafts."
      }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    tagline: "Volcanic Cliffs, Blue Domes & Sunsets",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs overlooking an underwater caldera.",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    rating: 4.92,
    reviewsCount: 2150,
    budgetTier: "$$$",
    avgCostPerDay: 210,
    currency: "EUR",
    bestSeason: "Late Spring (May) to Early Autumn (Oct)",
    weather: { temp: "26°C", icon: "sun", desc: "Sunny & Ocean Breeze" },
    lat: 36.3932,
    lng: 25.4615,
    categories: ["Romance", "Beach", "Nature", "Relaxation"],
    highlights: ["Oia Sunset Walk", "Fira to Oia Caldera Hike", "Red Beach", "Akrotiri Ruins", "Catamaran Cruise"],
    localTips: [
      "Rent an ATV or scooter to easily reach remote beaches across the island.",
      "Oia sunsets get crowded; secure a terrace spot at a cafe by 5:30 PM.",
      "Wear sturdy walking shoes for cobblestones and step inclines."
    ],
    attractions: [
      {
        id: "santorini-oia",
        name: "Oia Village & Famous Blue Domes",
        category: "Romance",
        duration: "3 hours",
        cost: 0,
        rating: 4.9,
        lat: 36.4618,
        lng: 25.3753,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
        description: "Picturesque cliffside village known for whitewashed houses, marble streets, and world-famous blue dome churches.",
        recommendedTime: "05:00 PM",
        tips: "Arrive before golden hour for stunning photography light."
      },
      {
        id: "santorini-catamaran",
        name: "Caldera Sunset Catamaran Cruise & BBQ",
        category: "Beach",
        duration: "5 hours",
        cost: 110,
        rating: 4.95,
        lat: 36.3500,
        lng: 25.4000,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        description: "Sail inside the volcanic crater, swim in hot springs, stop at White & Red Beaches, and enjoy Greek seafood BBQ.",
        recommendedTime: "02:30 PM",
        tips: "Towel, swimsuit, and reef-safe sunscreen are provided on board."
      },
      {
        id: "santorini-hike",
        name: "Fira to Oia Cliffside Hike",
        category: "Nature",
        duration: "3.5 hours",
        cost: 0,
        rating: 4.8,
        lat: 36.4166,
        lng: 25.4316,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
        description: "Breathtaking 10km walking trail along the edge of the volcanic crater offering endless Aegean panoramas.",
        recommendedTime: "08:00 AM",
        tips: "Start early in the morning before the afternoon sun heats up."
      },
      {
        id: "santorini-winery",
        name: "Santo Wines Tasting & Volcano View",
        category: "Food",
        duration: "2 hours",
        cost: 35,
        rating: 4.7,
        lat: 36.3860,
        lng: 25.4370,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
        description: "Taste crisp volcanic Assyrtiko wines paired with Greek cheeses while perched high above the Aegean sea.",
        recommendedTime: "01:00 PM",
        tips: "Reserve cliffside seating in advance."
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    tagline: "Island of Gods, Waterfalls, and Tropical Spirit",
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
    rating: 4.88,
    reviewsCount: 4120,
    budgetTier: "$",
    avgCostPerDay: 75,
    currency: "IDR",
    bestSeason: "Dry Season (April to October)",
    weather: { temp: "29°C", icon: "sun-cloud", desc: "Warm & Tropical" },
    lat: -8.4095,
    lng: 115.1889,
    categories: ["Nature", "Relaxation", "Beach", "Culture", "Adventure"],
    highlights: ["Tegallalang Rice Terraces", "Uluwatu Sunset Temple", "Nusa Penida Boat Trip", "Ubud Monkey Forest", "Tegenungan Waterfall"],
    localTips: [
      "Hire a private driver for a full day ($35-45 USD) for hassle-free transport across Ubud & beaches.",
      "Stay hydrated with coconut water and try local Babi Guling or Nasi Goreng.",
      "Wear a sarong when entering holy Hindu temples (usually provided at entrances)."
    ],
    attractions: [
      {
        id: "bali-tegallalang",
        name: "Tegallalang Rice Terraces & Jungle Swing",
        category: "Nature",
        duration: "2.5 hours",
        cost: 6,
        rating: 4.8,
        lat: -8.4312,
        lng: 115.2801,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        description: "Cascading green valley of traditional Subak irrigated rice paddies with lush palm trees.",
        recommendedTime: "08:00 AM",
        tips: "Visit early morning for soft sunlight shining through morning mist."
      },
      {
        id: "bali-uluwatu",
        name: "Uluwatu Temple & Kecak Fire Dance",
        category: "Culture",
        duration: "3 hours",
        cost: 12,
        rating: 4.9,
        lat: -8.8291,
        lng: 115.0849,
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
        description: "Cliff-edge Balinese temple overlooking roaring Indian Ocean waves, hosting dramatic traditional chanting Kecak performances.",
        recommendedTime: "05:00 PM",
        tips: "Watch out for mischievous wild monkeys around the temple walkways!"
      },
      {
        id: "bali-nusapenida",
        name: "Nusa Penida Kelingking 'T-Rex' Beach",
        category: "Adventure",
        duration: "6 hours",
        cost: 45,
        rating: 4.95,
        lat: -8.7505,
        lng: 115.4739,
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
        description: "Dramatic T-Rex shaped green headland framing turquoise ocean waters and pristine white sand beach.",
        recommendedTime: "09:00 AM",
        tips: "Take a fast boat from Sanur harbor to Nusa Penida."
      },
      {
        id: "bali-ubud-monkey",
        name: "Sacred Ubud Monkey Forest Sanctuary",
        category: "Nature",
        duration: "2 hours",
        cost: 5,
        rating: 4.7,
        lat: -8.5194,
        lng: 115.2631,
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80",
        description: "Natural forest sanctuary home to over 1,000 Balinese long-tailed macaques and moss-covered ancient temples.",
        recommendedTime: "01:30 PM",
        tips: "Keep sunglasses and loose accessories inside your backpack."
      }
    ]
  },
  {
    id: "swiss-alps",
    name: "Interlaken & Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    tagline: "Majestic Peaks, Crystal Lakes and Alpine Adventures",
    description: "Interlaken is a traditional resort town in the mountainous Bernese Oberland region of central Switzerland. Built on a narrow stretch of valley between the emerald waters of Lake Thun and Lake Brienz.",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=600&q=80",
    rating: 4.96,
    reviewsCount: 1980,
    budgetTier: "$$$",
    avgCostPerDay: 260,
    currency: "CHF",
    bestSeason: "Summer (Hiking) & Winter (Skiing)",
    weather: { temp: "15°C", icon: "mountain", desc: "Crisp Alpine Air" },
    lat: 46.6863,
    lng: 7.8632,
    categories: ["Nature", "Adventure", "Relaxation"],
    highlights: ["Jungfraujoch Top of Europe", "Grindelwald First Cliff Walk", "Lake Brienz Kayak", "Lauterbrunnen Waterfalls"],
    localTips: [
      "Get a Swiss Travel Pass for unlimited train, bus, and boat connections.",
      "Lauterbrunnen valley has 72 thundering waterfalls best explored on foot.",
      "Pack layers - temperatures drop significantly at higher altitudes."
    ],
    attractions: [
      {
        id: "swiss-jungfrau",
        name: "Jungfraujoch - Top of Europe",
        category: "Adventure",
        duration: "5 hours",
        cost: 160,
        rating: 4.95,
        lat: 46.5475,
        lng: 7.9820,
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
        description: "Highest railway station in Europe at 3,454m, featuring the Ice Palace and views of Aletsch Glacier.",
        recommendedTime: "08:30 AM",
        tips: "Check mountain webcam live stream before going up for weather clarity."
      },
      {
        id: "swiss-lauterbrunnen",
        name: "Lauterbrunnen Valley & Staubbach Falls",
        category: "Nature",
        duration: "3 hours",
        cost: 0,
        rating: 4.9,
        lat: 46.5935,
        lng: 7.9077,
        image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=600&q=80",
        description: "Stunning alpine valley bordered by sheer rock faces and 300-meter high plunging waterfalls.",
        recommendedTime: "01:00 PM",
        tips: "Rent an e-bike to glide down the valley path to Stechelberg."
      },
      {
        id: "swiss-grindelwald",
        name: "Grindelwald First Cliff Walk & Glider",
        category: "Adventure",
        duration: "4 hours",
        cost: 65,
        rating: 4.85,
        lat: 46.6575,
        lng: 8.0560,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        description: "Suspension walkway wrapping around mountain cliffs with panoramic view of the Eiger north face.",
        recommendedTime: "10:00 AM",
        tips: "Ride the Mountain Carts back down from Schreckfeld to Bort."
      }
    ]
  },
  {
    id: "new-york",
    name: "New York City",
    country: "USA",
    continent: "Americas",
    tagline: "The Empire State of Energy, Broadway & Skyscrapers",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers.",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&q=80",
    rating: 4.87,
    reviewsCount: 5200,
    budgetTier: "$$$",
    avgCostPerDay: 240,
    currency: "USD",
    bestSeason: "Autumn (Sep-Nov) & Holiday Season (Dec)",
    weather: { temp: "22°C", icon: "sun-cloud", desc: "Vibrant City Air" },
    lat: 40.7128,
    lng: -74.0060,
    categories: ["Culture", "Food", "Heritage", "Nightlife"],
    highlights: ["Central Park", "Statue of Liberty", "Summit One Vanderbilt", "Broadway Show", "High Line Walk"],
    localTips: [
      "Use contactless credit cards or OMNY tap at subway turnstiles.",
      "Walk the Brooklyn Bridge from Brooklyn towards Manhattan for the best skyline views.",
      "Grab a classic dollar slice pizza or visit Chelsea Market for food variety."
    ],
    attractions: [
      {
        id: "nyc-central-park",
        name: "Central Park Rowboats & Bethesda Terrace",
        category: "Nature",
        duration: "3 hours",
        cost: 20,
        rating: 4.9,
        lat: 40.7829,
        lng: -73.9654,
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
        description: "An 843-acre green oasis in the heart of Manhattan featuring lakes, walking paths, and historic landmarks.",
        recommendedTime: "10:00 AM",
        tips: "Rent a rowboat at Loeb Boathouse for iconic photos."
      },
      {
        id: "nyc-summit",
        name: "SUMMIT One Vanderbilt Glass Observation",
        category: "Heritage",
        duration: "2 hours",
        cost: 42,
        rating: 4.9,
        lat: 40.7527,
        lng: -73.9772,
        image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80",
        description: "Immersive multi-sensory glass observatory overlooking the Empire State Building and Chrysler Building.",
        recommendedTime: "04:30 PM",
        tips: "Wear sunglasses! The floor-to-ceiling mirrors can reflect intense daylight."
      },
      {
        id: "nyc-highline",
        name: "High Line Elevated Park & Chelsea Market",
        category: "Culture",
        duration: "2.5 hours",
        cost: 0,
        rating: 4.8,
        lat: 40.7480,
        lng: -74.0048,
        image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=600&q=80",
        description: "1.45-mile long elevated linear park built on a historic freight rail line above Manhattan's West Side.",
        recommendedTime: "01:00 PM",
        tips: "End your walk at Chelsea Market for lobster rolls and tacos."
      }
    ]
  },
  {
    id: "cairo",
    name: "Cairo & Giza",
    country: "Egypt",
    continent: "Africa",
    tagline: "Cradle of Ancient Pyramids & Nile Heritage",
    description: "Cairo, Egypt’s sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts.",
    heroImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    thumbImage: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
    rating: 4.84,
    reviewsCount: 1760,
    budgetTier: "$",
    avgCostPerDay: 65,
    currency: "EGP",
    bestSeason: "October to April (Cooler Winter)",
    weather: { temp: "27°C", icon: "sun", desc: "Warm & Sunny" },
    lat: 30.0444,
    lng: 31.2357,
    categories: ["Heritage", "Culture", "Adventure"],
    highlights: ["Great Pyramids of Giza", "The Sphinx", "Grand Egyptian Museum", "Khan el-Khalili Bazaar", "Nile Felucca Ride"],
    localTips: [
      "Hire an accredited Egyptologist guide for deep historical context at the Pyramids.",
      "Bargaining is expected at traditional bazaars like Khan el-Khalili.",
      "Sunset felucca sailboat ride on the Nile is one of Cairo's most relaxing experiences."
    ],
    attractions: [
      {
        id: "cairo-pyramids",
        name: "Great Pyramids of Giza & The Sphinx",
        category: "Heritage",
        duration: "4 hours",
        cost: 25,
        rating: 4.95,
        lat: 29.9792,
        lng: 31.1342,
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80",
        description: "The last surviving ancient wonder of the world, built over 4,500 years ago during the Old Kingdom.",
        recommendedTime: "08:00 AM",
        tips: "Ride a camel to the panoramic plateau spot for classic 3-pyramid photos."
      },
      {
        id: "cairo-bazaar",
        name: "Khan el-Khalili Souk & Al-Azhar Mosque",
        category: "Culture",
        duration: "2.5 hours",
        cost: 0,
        rating: 4.7,
        lat: 30.0478,
        lng: 31.2622,
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
        description: "Vibrant medieval Islamic bazaar filled with brass lamps, perfumes, spices, and historic coffeehouses.",
        recommendedTime: "04:30 PM",
        tips: "Sip mint tea at the historic El Fishawy Cafe."
      },
      {
        id: "cairo-felucca",
        name: "Sunset Felucca Sail on the River Nile",
        category: "Relaxation",
        duration: "1.5 hours",
        cost: 15,
        rating: 4.85,
        lat: 30.0400,
        lng: 31.2280,
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=600&q=80",
        description: "Traditional Egyptian wooden sailboat gliding smoothly along the historic Nile at dusk.",
        recommendedTime: "05:30 PM",
        tips: "Bring your own snacks and drinks on board."
      }
    ]
  }
];

// Travel styles & categories
const TRAVEL_CATEGORIES = [
  { id: "all", name: "All Experiences", icon: "compass" },
  { id: "Culture", name: "Culture & Art", icon: "landmark" },
  { id: "Heritage", name: "History & Monuments", icon: "monument" },
  { id: "Nature", name: "Nature & Parks", icon: "trees" },
  { id: "Beach", name: "Beaches & Coastal", icon: "umbrella-beach" },
  { id: "Adventure", name: "Adventure & Thrills", icon: "hiking" },
  { id: "Food", name: "Food & Culinary", icon: "utensils" },
  { id: "Romance", name: "Romantic Getaways", icon: "heart" },
  { id: "Relaxation", name: "Spa & Relaxation", icon: "spa" }
];

// Preset Travel Quiz Questions for Recommendation Engine
const TRAVEL_QUIZ = [
  {
    id: 1,
    question: "What vibe best matches your dream getaway?",
    options: [
      { text: "Ancient history, iconic museums, and fine dining", category: "Culture", match: "paris" },
      { text: "Serene temples, zen gardens, and cherry blossoms", category: "Culture", match: "kyoto" },
      { text: "Whitewashed ocean cliffs and breathtaking sunsets", category: "Romance", match: "santorini" },
      { text: "Lush tropical rice terraces, waterfalls, and beach clubs", category: "Nature", match: "bali" },
      { text: "Snowy alpine peaks, crystal lakes, and thrill rides", category: "Adventure", match: "swiss-alps" }
    ]
  },
  {
    id: 2,
    question: "Who are you traveling with?",
    options: [
      { text: "Solo Adventurer 🎒", group: "Solo" },
      { text: "Romantic Partner 💑", group: "Couple" },
      { text: "Family with Kids 👨‍👩‍👧‍👦", group: "Family" },
      { text: "Group of Friends 🥳", group: "Friends" }
    ]
  },
  {
    id: 3,
    question: "What pace do you prefer for your daily plan?",
    options: [
      { text: "Relaxed & Chill (2 main spots/day)", pace: "Relaxed" },
      { text: "Balanced Exploration (3-4 spots/day)", pace: "Balanced" },
      { text: "Action-Packed Sightseeing (5+ spots/day)", pace: "Fast-Paced" }
    ]
  }
];

// Default Packing Items helper by weather category
const PACKING_ITEMS_BY_CATEGORY = {
  general: ["Passport & ID", "Travel Insurance docs", "Phone Charger & Power Bank", "Universal Adapter", "Reusable Water Bottle", "First Aid Essentials"],
  warm: ["Sunscreen & Sunglasses", "Swimwear & Beach Towel", "Light Cotton Clothes", "Flip Flops / Sandals", "Sun Hat"],
  cold: ["Thermal Base Layers", "Warm Winter Jacket", "Beanie & Gloves", "Sturdy Waterproof Boots", "Lip Balm"],
  hiking: ["Trail Running / Hiking Shoes", "Small Daypack Backpack", "Rain Poncho", "Electrolyte Tablets", "Insect Repellent"]
};
