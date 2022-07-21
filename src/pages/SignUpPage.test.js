import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./SignUpPage";
import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";
describe("Sign UP", () => {
  describe("Layout", () => {
    it("has a header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });

      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("User Name");
      expect(input).toBeInTheDocument();
    });
    it("has emailAdrees input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("email");
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("password");
      expect(input).toBeInTheDocument();
    });
    it("has type for  password input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("password");
      expect(input.type).toBe("password");
    });
    it("has password Repeat input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("password Repeat");
      expect(input).toBeInTheDocument();
    });
    it("has type for  password Repeat input", () => {
      render(<SignUpPage />);

      const input = screen.getByLabelText("password Repeat");
      expect(input.type).toBe("password");
    });
    it("has a button", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("button", { name: "Sign UP" });

      expect(header).toBeInTheDocument();
    });
    it("has a button to be disabled initially", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("button", { name: "Sign UP" });

      expect(header).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("enable the button when password and password repeat has same value", () => {
      render(<SignUpPage />);
      const password = screen.getByLabelText("password");
      const passwordRepeat = screen.getByLabelText("password Repeat");
      userEvent.type(password, "a");
      userEvent.type(passwordRepeat, "a");
      const button = screen.findBy;
      expect(button).toBeEnabled();
    });
   

    it("send username,email and password after clicking the button", async () => {
      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          requestBody = req.body;
      
          return res(ctx.status(200));
        })
      );

      // Establish requests interception layer before all tests.
      server.listen();

      render(<SignUpPage />);
      const password = screen.getByLabelText("password");
      const passwordRepeat = screen.getByLabelText("password Repeat");
      const email = screen.getByLabelText("email");
      const userName = screen.getByLabelText("User Name");
      const button = screen.queryByRole("button", { name: "Sign UP" });
      userEvent.type(password, "eddy");
      userEvent.type(passwordRepeat, "eddy");
      userEvent.type(email, "eldhosvj@gmail.com");
      userEvent.type(userName, "eldhose");
      userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 500));
// can you plese let me know why this requestBody undefined
      expect(requestBody).toEqual({
        password: "eddy",
        repeatPassword: "eddy",
        email: "eldhosvj@gmail.com",
        username: "eldhose",
      });
    });
  
  
  
  });
});
