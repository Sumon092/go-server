export type ServiceData = {
  categories?: string | null;
  title: string;
  city: string;
  address: string;
  type: string;
  rent: number;
  service_image?: string;
};

export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  minRent?: number | undefined;
  maxRent?: number | undefined;
  categories?: string | undefined;
  type?: string | undefined;
};
