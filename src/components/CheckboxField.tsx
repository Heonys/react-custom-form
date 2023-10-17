import React from "react";
import { Info } from "../App";
import useInput from "../hooks/useInput";

type BooleanKeys = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

const CheckboxField: React.FC<{
  source: BooleanKeys;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { error, value, onChange } = useInput({ source, validate });

  return (
    <>
      {label}
      <input
        data-testid={source}
        onChange={(e) => onChange(e.target.checked)}
        value={value.toString()}
        type={"checkbox"}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
