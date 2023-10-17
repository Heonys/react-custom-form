import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

describe("app", () => {
  it("정상적으로 렌더링됨", () => {
    render(<App />);

    const label = screen.getByText(/이름/);
    const name = screen.getByTestId("name");
    const password = screen.getByTestId("password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    expect(label).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("이름을 입력하고 체크박스 체크한 이후에 제출하면 alert창으로 입력한 값이 출력된다", async () => {
    const user = userEvent.setup();
    const alertMock = jest.fn();
    window.alert = alertMock;

    render(<App />);
    const name = screen.getByTestId("name");
    const password = screen.getByTestId("password");

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    await user.type(name, "hello jest");
    await user.click(checkbox);
    await user.click(button);

    expect(alertMock).toBeCalledWith("name: hello jest");
  });

  it("약관동의 하지 않으면 alert창이 열리지않음", async () => {
    const user = userEvent.setup();
    const alertMock = jest.fn();
    window.alert = alertMock;

    render(<App />);
    const name = screen.getByTestId("name");
    const button = screen.getByRole("button");

    await user.type(name, "hello jest");
    await user.click(button);

    expect(alertMock).not.toBeCalled();
  });

  // it(" 이름은 3자 이상 6자 이하의 값이 들어와야한다", ()=>{
  // })
});
