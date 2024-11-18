import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

describe("OrderStatusSelector", () => {
  it("should render the order status selector", async () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    const user = userEvent.setup();
    const btn = screen.getByRole("combobox");

    expect(btn).toBeInTheDocument();
    await user.click(btn);

    const allOptions = await screen.findAllByRole("option");

    expect(allOptions).toHaveLength(3);
    expect(allOptions.map((option) => option.textContent)).toEqual([
      "New",
      "Processed",
      "Fulfilled",
    ]);
  });
});
