export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: { url: string }[];
}

export interface ProductContextData {
  products: Product[];
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (overrideSearch?: string) => void;
  loading: boolean;
}