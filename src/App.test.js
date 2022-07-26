import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

describe("routing", () => {
  it("display homepage at /", () => {
    render(<App />);
    const homepage = screen.queryByTestId("home-page");
    expect(homepage).toBeInTheDocument();
  });

  it("does not display Sign Up page when at /",()=>{
    render(<App/>)
    const signUp=screen.queryByTestId ("signup-page")
    expect(signUp).not.toBeInTheDocument()

})

it("display Sign Up page when at /signUp",()=>{
    render(<App/>)
    window.history.pushState({},"","/signUp")
    const signUp=screen.queryByTestId ("signup-page")
    expect(signUp).not.toBeInTheDocument()



})


});
