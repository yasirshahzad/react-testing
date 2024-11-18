import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json([
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
    ]);
  }),
];
