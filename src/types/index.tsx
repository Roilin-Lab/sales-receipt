export interface CarouselItem {
  url: string;
}

export interface CarouselSettings {
  duration: number;
  items: CarouselItem[];
}

export interface ProductsSettings {
  position: "left" | "right";
}

export interface Settings {
  carousel: CarouselSettings;
  products: ProductsSettings;
}

export interface OrderMessage {
  settings: Settings;
  order: Order;
}

export interface ReadyMessage {
  loaded: boolean;
}

export interface Product {
  name: string;
  image: string;
}

export interface OrderedProductInfo {
  qty: number;
  price: number;
  sub: number;
  sum: number;
  discount_percent: number;
  discount_sum: number;
  product: Product;
}

export interface Order {
  discount_percent: number;
  discount_sum: number;
  qty: number;
  sum: number;
  sub: number;
  products: OrderedProductInfo[];
}

export function isCarouselItem(value: any): value is CarouselItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value &&
    typeof value.url === 'string'
  );
}

export function isCarouselSettings(value: any): value is CarouselSettings {
  return (
    typeof value === 'object' &&
    value !== null &&
    'duration' in value &&
    typeof value.duration === 'number' &&
    'items' in value &&
    Array.isArray(value.items) &&
    value.items.every(isCarouselItem)
  );
}

export function isProductsSettings(value: any): value is ProductsSettings {
  return (
    typeof value === 'object' &&
    value !== null &&
    'position' in value &&
    (value.position === 'left' || value.position === 'right')
  );
}

export function isSettings(value: any): value is Settings {
  return (
    typeof value === 'object' &&
    value !== null &&
    'carousel' in value &&
    'products' in value &&
    isCarouselSettings(value.carousel) &&
    isProductsSettings(value.products)
  );
}

export function isReadyMessage(value: any): value is ReadyMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "loaded" in value &&
    typeof value.loaded === "boolean"
  );
}

export function isProduct(value: any): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string"
  );
}

export function isOrderedProductInfo(value: any): value is OrderedProductInfo {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.qty === "number" &&
    typeof value.price === "number" &&
    typeof value.sub === "number" &&
    typeof value.sum === "number" &&
    typeof value.discount_percent === "number" &&
    typeof value.discount_sum === "number" &&
    isProduct(value.product)
  );
}

export function isOrder(value: any): value is Order {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.discount_percent === "number" &&
    typeof value.discount_sum === "number" &&
    typeof value.qty === "number" &&
    typeof value.sum === "number" &&
    typeof value.sub === "number" &&
    Array.isArray(value.products) &&
    value.products.every(isOrderedProductInfo)
  );
}