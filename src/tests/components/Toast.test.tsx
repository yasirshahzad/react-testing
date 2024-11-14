import { render, screen } from "@testing-library/react";
import { Toaster } from "react-hot-toast";
import ToastDemo from "../../components/ToastDemo";
import userEvent from "@testing-library/user-event";

describe("ToastDemo", () => {
  it("should show the toast message when button is clicked", async () => {
    render(
      <div>
        <Toaster />
        <ToastDemo />
      </div>
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
