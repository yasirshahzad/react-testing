import { render, screen } from "@testing-library/react";
import Greet from "../../components/Greet";

describe("Greet", () => {
  it("it should render hello name when name is provided in props", () => {
    render(<Greet name="John" />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(/hello john/i);
  });

  it("should have a button", () => {
    render(<Greet />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
