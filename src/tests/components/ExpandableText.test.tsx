import { render, screen } from "@testing-library/react";
import ExpandableText from "../../components/ExpandableText";

import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  it("should render the full text if less than or equal to 255 characters", () => {
    const text = "a".repeat(255);
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("should render the truncated text if more than 255 characters", () => {
    const text = "a".repeat(256);
    render(<ExpandableText text={text} />);

    const renderedText = screen.getByText(text.substring(0, 255) + "...");

    expect(renderedText).toBeInTheDocument();
    expect(renderedText).toHaveTextContent(text.substring(0, 255) + "...");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Show More");

    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it("should show the full text when clicked on the button", async () => {
    const user = userEvent.setup();
    const text = "a".repeat(256);

    render(<ExpandableText text={text} />);
    const button = screen.getByRole("button", { name: "Show More" });
    await user.click(button);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Show Less");
  });

  it("should truncate the text when show less button is clicked", async () => {
    const user = userEvent.setup();
    const text = "a".repeat(256);
    const truncatedText = text.substring(0, 255) + "...";

    render(<ExpandableText text={text} />);
    const moreButton = screen.getByRole("button", { name: "Show More" });

    expect(moreButton).toBeInTheDocument();

    await user.click(moreButton);

    const lessButton = screen.getByRole("button", { name: "Show Less" });

    await user.click(lessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  });
});
