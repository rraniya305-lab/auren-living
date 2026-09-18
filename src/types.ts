export interface Product {
  id: string;
  name: string;
  category: 'Seating' | 'Tables' | 'Storage' | 'Lighting' | 'Decor';
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  dimensions: string;
  materials: string;
  leadTime: string;
  image: string;
  secondaryImage?: string;
  badge?: 'New' | 'Bestseller' | 'Limited Edition' | 'Architectural Favorite';
  finishes: {
    name: string;
    colorHex: string;
    imagePreview?: string;
  }[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

export interface SpaceHotspot {
  id: string;
  productId: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  price: number;
  category: string;
}

export interface SpaceInspiration {
  id: string;
  title: string;
  roomType: string;
  description: string;
  image: string;
  quote: string;
  designer: string;
  hotspots: SpaceHotspot[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
  budgetRange: string;
  notes: string;
}
