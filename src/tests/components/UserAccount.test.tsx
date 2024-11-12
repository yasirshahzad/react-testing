import { render } from "@testing-library/react";
import UserAccount from "../../components/UserAccount";
import { User } from "../../entities";
import { screen } from "@testing-library/dom";

describe("UserAccount", () => {
  it("should render username", () => {
    const user: User = {
      id: 1,
      name: "Yasir",
      isAdmin: false,
    };

    render(<UserAccount user={user} />);

    const username = screen.queryByRole("username");

    expect(username).toBeInTheDocument();
    expect(username).toHaveTextContent(/name: yasir/i);
  });

  it("should not have an edit button", () => {
    const user: User = {
      id: 1,
      name: "Yasir",
      isAdmin: false,
    };

    render(<UserAccount user={user} />);

    const editButton = screen.queryByRole("button");

    expect(editButton).not.toBeInTheDocument();
  });

  it("should should have an Edit button", () => {
    const user: User = {
      id: 1,
      name: "Yasir",
      isAdmin: true,
    };

    render(<UserAccount user={user} />);

    const editButton = screen.queryByRole("button");

    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent(/edit/i);
  });
});
