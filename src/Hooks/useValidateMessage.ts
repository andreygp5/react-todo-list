const useValidateMessage = (message: string) => {
  if (message.length < 2) {
    return false;
  }
  return true;
};

export { useValidateMessage };
