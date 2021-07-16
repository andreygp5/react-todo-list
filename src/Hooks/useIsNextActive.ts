const useIsNextActive = (currentPage: number, totalPages: number) => {
  if (currentPage === totalPages) {
    return false;
  }

  return true;
};

export { useIsNextActive };
