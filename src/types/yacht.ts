export interface Yacht {
  id: string;
  name: string;
  tagline: string;
  builder: string;
  yearBuilt: number;
  refitYear?: number;
  lengthMeters: number;
  lengthFeet: number;
  guests: number;
  cabins: number;
  crew: number;
  beamMeters: number;
  draftMeters: number;
  cruisingSpeedKnots: number;
  maxSpeedKnots: number;
  weeklyRateEuros: number;
  category: 'superyacht' | 'megayacht' | 'catamaran' | 'explorer';
  currentLocation: string;
  summerCruisingZone: string;
  winterCruisingZone: string;
  coverImage: string;
  galleryImages: {
    url: string;
    caption: string;
    category: 'exterior' | 'interior' | 'sundeck' | 'toys';
  }[];
  description: string;
  highlights: string[];
  amenities: {
    name: string;
    icon: string;
    description: string;
  }[];
  waterToys: string[];
  deckPlans: {
    deckName: string;
    features: string[];
  }[];
  brokerContact: {
    name: string;
    title: string;
    office: string;
    avatar: string;
  };
}

export interface Destination {
  id: string;
  title: string;
  region: string;
  country: string;
  bestMonths: string;
  heroImage: string;
  coordinates: string;
  description: string;
  highlights: string[];
  recommendedYachtIds: string[];
  itinerarySummary: {
    durationDays: number;
    anchorages: string[];
  };
}

export interface CharterInquiry {
  yachtId: string;
  yachtName: string;
  embarkationPort: string;
  disembarkationPort: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  specialRequests: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}
