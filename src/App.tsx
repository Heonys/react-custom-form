import { createContext, useReducer, useState } from "react";
import TextField from "./components/TextField";
import Form from "./components/Form";
import CheckboxField from "./components/CheckboxField";
import { checked, maxLength, minLength } from "./validation";

export interface Info {
  name: string;
  password: string;
  confirm: boolean;
}

const defaultInfo: Info = {
  name: "",
  password: "",
  confirm: false,
};

type ErrorInfo = { [key in keyof Info]: string | undefined };
export type PartialErrorInfo = {
  [infoKey in keyof Info]: Record<infoKey, ErrorInfo[infoKey]>;
}[keyof ErrorInfo];

export type InfoAction = {
  [key in keyof Info]: Record<key, Info[key]>;
}[keyof Info];

const defaultErrorInfo = Object.keys(defaultInfo).reduce((acc, key) => {
  acc[key as keyof ErrorInfo] = undefined;
  return acc;
}, {} as ErrorInfo);

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: InfoAction) => void;
  error: ErrorInfo;
  setError: (e: PartialErrorInfo) => void;
}>({
  value: defaultInfo,
  setValue: (v: any) => {},
  error: defaultErrorInfo,
  setError: (e) => {},
});

function App() {
  const [info, dispatch] = useReducer((prev: Info, action: InfoAction) => {
    return { ...prev, ...action };
  }, defaultInfo);

  const [error, setError] = useState<ErrorInfo>(defaultErrorInfo);

  const onSubmit = () => {
    if (Object.values(error).every((e) => e === undefined)) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    <InfoContext.Provider
      value={{
        value: info,
        setValue: dispatch,
        error,
        setError: (e) => setError((prev) => ({ ...prev, ...e })),
      }}
    >
      <Form onSubmit={onSubmit}>
        <TextField source="name" label="이름" validate={[minLength(3), maxLength(6)]} />
        <TextField source="password" label="패스워드" validate={[minLength(2), maxLength(6)]} />
        <CheckboxField source="confirm" label="위 내용이 제출됩니다 동의하십니까?" validate={[checked]} />
      </Form>
    </InfoContext.Provider>
  );
}

export default App;
