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
      options: async () => screen.getAllByRole("option"),
    };
  };

  it("should render OrderStatusSelector with default value", () => {
    const { comboBox } = renderUi();
    expect(comboBox).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should render the order status selector", async () => {
    const { user, comboBox, options } = renderUi();

    expect(comboBox).toBeInTheDocument();
    await user.click(comboBox);

    const allOptions = await options();

    expect(allOptions).toHaveLength(3);
    expect(allOptions.map((option) => option.textContent)).toEqual([
      "New",
      "Processed",
      "Fulfilled",
    ]);
  });

  it.each([
    {
      label: /processed/i,
      value: "processed",
    },
    {
      label: /fulfilled/i,
      value: "fulfilled",
    },
  ])(
    "should call the onChange with $value when $label option is selected",
    async ({ value, label }) => {
      const { comboBox, user, onChange } = renderUi();

      await user.click(comboBox);
      const option = await screen.findByRole("option", { name: label });

      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );
});
