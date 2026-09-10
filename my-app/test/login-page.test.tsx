import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Login from "../app/login/page";

afterEach(cleanup);

describe("Login page", () => {
  it("renders the Full Name, Email Address, and Password fields", () => {
    render(<Login />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders the Register button", () => {
    render(<Login />);

    expect(
      screen.getByRole("button", { name: "Register" }),
    ).toBeInTheDocument();
  });
});
