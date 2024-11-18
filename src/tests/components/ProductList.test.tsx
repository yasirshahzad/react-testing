import { render, screen } from "@testing-library/react";
import ProductList from "../../components/ProductList";
import { server } from "../mock/server";
import { http, HttpResponse } from "msw";

describe("ProductList", () => {
  it("should render the list of products", async () => {
    render(<ProductList />);

    const getProducts = await screen.findAllByRole("listitem");

    expect(getProducts.length).toBeGreaterThan(0);
  });

  it("should render the No products available message when no products are available", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));

    render(<ProductList />);

    const text = await screen.findByText(/no products available/i);
    expect(text).toBeInTheDocument();
  });
});
