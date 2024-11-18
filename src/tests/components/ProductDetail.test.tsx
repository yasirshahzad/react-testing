import { render, screen } from "@testing-library/react";
import ProductDetail from "../../components/ProductDetail";

describe("ProductDetail", () => {
  it("should render the product", async () => {
    render(<ProductDetail productId={1} />);

    const name = await screen.findByText(/product 1/i);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(/price: \$100/i)).toBeInTheDocument();
  });

  it("should render the not found when no product is found", async () => {
    render(<ProductDetail productId={9} />);

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});
