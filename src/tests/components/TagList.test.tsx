import { render, screen, waitFor } from "@testing-library/react";
import TagList from "../../components/TagList";

// testing async code

describe("TagList", () => {
  it("should render the tag list", async () => {
    render(<TagList />);

    // first way: getAllByRole is sync function
    // waitFor is required for getAllByRole
    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    // second way: findAllByRole
    // waitFor is not required for it
    // findAllByRole is async
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });
});
