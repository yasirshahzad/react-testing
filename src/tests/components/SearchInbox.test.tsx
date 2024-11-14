import { render, screen } from "@testing-library/react";
import SearchBox from "../../components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const cb = vi.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={cb} />);
    return {
      onChange: cb,
      user,
      input: screen.getByRole("textbox"),
    };
  };

  it("should render the input field for searching", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("should call the callback when enter is pressed", async () => {
    const { onChange, input, user } = renderComponent();

    const text = "test";

    await user.type(input, text + "{enter}");

    expect(onChange).toHaveBeenCalledWith(text);
  });

  it("should not call the cb when input is empty", async () => {
    const { onChange, input, user } = renderComponent();

    const text = "";

    await user.type(input, text + "{enter}");

    expect(onChange).not.toHaveBeenCalledWith(text);
  });
});
