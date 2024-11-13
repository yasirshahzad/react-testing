import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../components/ProductImageGallery";

describe("ProductImageGallery", () => {
  const imageUrls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ];

  it("should not render when imageUrls is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render the image gallery", () => {
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const list = screen.getAllByRole("img");

    list.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", imageUrls[index]);
    });
  });
});
