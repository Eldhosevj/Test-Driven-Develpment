import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
    let button;
    let requestBody;
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        requestBody = req.body;
        counter++;
        return res(ctx.status(200));
      })
    );
    beforeAll(() => {
      server.listen();
    });
    beforeEach(() => {
      counter = 0;
      server.resetHandlers()
      //server.resetHanlers is used to avoid overriding property for multiple text cases
    });
    afterAll(() => {
      server.close();
    });

    let msg = "Please check your Email to activate your account";
    const setUp = () => {
      render(<SignUpPage />);
      const password = screen.getByLabelText("password");
      const passwordRepeat = screen.getByLabelText("password Repeat");
      const email = screen.getByLabelText("email");
      const userName = screen.getByLabelText("User Name");
      button = screen.queryByRole("button", { name: "Sign UP" });
      userEvent.type(password, "eddy");
      userEvent.type(passwordRepeat, "eddy");
      userEvent.type(email, "eldhosvj@gmail.com");
      userEvent.type(userName, "eldhose");
    };
    it("enable the button when password and password repeat has same value", () => {
      render(<SignUpPage />);
      const password = screen.getByLabelText("password");
      const passwordRepeat = screen.getByLabelText("password Repeat");
      userEvent.type(password, "a");
      userEvent.type(passwordRepeat, "a");
      const button = screen.queryByRole("button", { name: "Sign UP" });
      expect(button).toBeEnabled();
    });

    it("send username,email and password after clicking the button", async () => {
      // Establish requests interception layer before all tests.
      setUp();
      userEvent.click(button);

      //await new Promise((resolve) => setTimeout(resolve, 500));
      await screen.findByText(msg);
      expect(requestBody).toEqual({
        password: "eddy",
        repeatPassword: "eddy",
        email: "eldhosvj@gmail.com",
        username: "eldhose",
      });
    });

    it("disable button when there is an ongoing api call", async () => {
      // Establish requests interception layer before all tests.
      server.listen();
      setUp();
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);

      //await new Promise((resolve) => setTimeout(resolve, 500));

      await screen.findByText(msg);

      expect(counter).toBe(1);
    });
    it("display validation message for username", async() => {
      server.use(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          requestBody = req.body;
          counter++;
          // server overiding can be don using server.resetHandlers() or  res.once
         // return res.once(ctx.status(400)
          return res(ctx.status(400)
          
          ,
          ctx.json(
            {validationErrors:{
              username: "Username cannot be null"
            }}
          ));
        })
      )
      setUp();
      userEvent.click(button)
       let validationErrors=await screen.findByText("Username cannot be null")
       expect(validationErrors).toBeInTheDocument()
    });
    it("hide signup form after succesful sign up request", async () => {
      setUp();
      const form = screen.getByTestId("form-sign-up");

      userEvent.click(button);
      /*
one way of testing    
await screen.findByText(msg)
        expect(form).not.toBeInTheDocument();
  
  */
      //another way of testing using waitFor
      // await waitFor(() => {
      //   expect(form).not.toBeInTheDocument();
      // });

      //another way of testing
      await waitForElementToBeRemoved(form);
    });

    
  });
});
