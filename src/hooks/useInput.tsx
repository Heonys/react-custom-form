import { useContext, useEffect } from "react";
import { Info, InfoAction, InfoContext, PartialErrorInfo } from "../App";

interface Props {
  source: keyof Info;
  validate: any;
}

const useInput = ({ source, validate }: Props) => {
  const { value, setValue, error, setError } = useContext(InfoContext);

  useEffect(() => {
    const errors: (string | undefined)[] = validate.map((validateFunc: any) => {
      if (value[source] !== undefined) {
        return validateFunc(value[source]);
      }
      throw new Error();
    });

    const err = errors.find((v) => v);
    setError({ [source]: err } as PartialErrorInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value[source]]);

  const onChange = (v: any) => {
    return setValue({ [source]: v } as InfoAction);
  };

  return { error: error[source], value: value[source], onChange };
};

export default useInput;
