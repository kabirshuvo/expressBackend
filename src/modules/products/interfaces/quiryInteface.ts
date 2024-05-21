export interface ProductQuery {
  name?: string;
  category?: string;
  price?: string;
  tags?: string;
}

export interface ProductFilter {
  name?: { $regex: string; $options: string };
  category?: { $regex: string; $options: string };
  price?: { $lte: number };
  tags?: { $in: string[] };
}
