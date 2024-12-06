export interface Business {
    id: number;
    name: string;
    image: string;
    category: string;
    address: string;
    phone: string;
    website?: string; // Optional property
    location: string;
    description: string;
    operatingHours: string; // New property for operating hours
  }
  