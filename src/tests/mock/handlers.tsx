import { http, HttpResponse } from "msw";
const productList = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 100,
  },
  {
    id: 3,
    name: "Product 3",
    price: 100,
  },
];

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json(productList);
  }),
  http.get("/products/:productId", ({ params }) => {
    const productId = params.productId as string;

    if (productId === "invalid")
      return new HttpResponse("Product id is invalid", { status: 404 });

    const product = productList.find((p) => p.id === parseInt(productId));

    if (!product) return new HttpResponse("Product not found", { status: 404 });

    return HttpResponse.json(product);
  }),
];
