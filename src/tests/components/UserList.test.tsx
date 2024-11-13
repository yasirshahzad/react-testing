import { render, screen } from "@testing-library/react";
import UserList from "../../components/UserList";

describe("UserList", () => {
  it("should show no user when empty list is given", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render the list of users when a list of users is given", () => {
    const userList = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];

    render(<UserList users={userList} />);

    userList.forEach((user) => {
      expect(screen.getByRole("link", { name: user.name })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: user.name })).toHaveAttribute(
        "href",
        `/users/${user.id}`
      );
    });
  });
});
