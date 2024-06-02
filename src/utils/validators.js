export const inputValidator = (input, field) => {
  if (input === "") {
    return false;
  }
  if (
    (field === "firstName" || field === "lastname") &&
    typeof input === "string"
  ) {
    return true;
  }
  if (
    field === "password" &&
    typeof input === "string" &&
    input.length >= 6 &&
    input.length <= 8
  ) {
    return true;
  }

  return false;
};
