const useIsPrevActive = (currentPage: number) => {
  if (currentPage === 1) {
    return false;
  }

  return true;
};

export { useIsPrevActive };
