import React from "react";
import { Info } from "../App";
import useInput from "../hooks/useInput";

type StringKeys = {
  [K in keyof Info]: Info[K] extends string ? K : never;
}[keyof Info];

const TextField: React.FC<{
  source: StringKeys;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { error, value, onChange } = useInput({ source, validate });

  console.log(error);

  return (
    <>
      {label}
      <input
        data-testid={source}
        onChange={(e) => onChange(e.target.value)} //
        value={value.toString()}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default TextField;
