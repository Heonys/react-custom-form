function minLength(length: number) {
  return (v: string) => {
    return v.length < length ? `${length}자 이상으로 입력 해주세요` : undefined;
  };
}

function maxLength(length: number) {
  return (v: string) => {
    return v.length > length ? `${length}자 이하로 입력 해주세요` : undefined;
  };
}

function checked(checked: boolean) {
  return checked ? undefined : "반드시 체크 해주세요";
}

export { minLength, maxLength, checked };
