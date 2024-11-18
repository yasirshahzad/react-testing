import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

describe("OrderStatusSelector", () => {
  const renderUi = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    const user = userEvent.setup();

    return {
      onChange,
      user,
      comboBox: screen.getByRole("combobox"),
    };
  };

  it("should render OrderStatusSelector with default value", () => {
    const { comboBox } = renderUi();
    expect(comboBox).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should render the order status selector", async () => {
    const { user, comboBox } = renderUi();

    expect(comboBox).toBeInTheDocument();
    await user.click(comboBox);

    const allOptions = await screen.findAllByRole("option");

    expect(allOptions).toHaveLength(3);
    expect(allOptions.map((option) => option.textContent)).toEqual([
      "New",
      "Processed",
      "Fulfilled",
    ]);
  });
});
