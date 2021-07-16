import { ReactComponent as ArrowPrev } from '../../Icons/arrow-prev.svg';
import { ReactComponent as ArrowNext } from '../../Icons/arrow-next.svg';
import { useIsPrevActive } from '../../Hooks/useIsPrevActive';
import { useIsNextActive } from '../../Hooks/useIsNextActive';
import './Pagination.scss';

export interface PaginationProps {
  pagesAmount: number;
  currentPage: number;
  handleChangePage(pageNumber: number): void;
}

const Pagination = ({
  pagesAmount, currentPage, handleChangePage,
}: PaginationProps) => {
  const isPrevActive = useIsPrevActive(currentPage);
  const isNextActive = useIsNextActive(currentPage, pagesAmount);

  const handleNumberBtnClick = (pageNumber: number) => {
    handleChangePage(pageNumber);
  };

  const handlePrevClick = () => {
    handleChangePage(currentPage - 1);
  };

  const handleNextClick = () => {
    handleChangePage(currentPage + 1);
  };

  const pages = [];

  for (let i = 1; i < pagesAmount + 1; i++) {
    const className = `pagination__item ${i === currentPage ? 'pagination__item_active' : ''}`;
    const clickHandler = handleNumberBtnClick.bind(null, i);

    pages.push(
      <button
        key={i}
        className={className}
        type="button"
        onClick={clickHandler}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="pagination">
      <button
        className="pagination__item pagination__item_arrow"
        type="button"
        disabled={!isPrevActive}
      >
        <ArrowPrev
          onClick={handlePrevClick}
        />
      </button>
      <div className="pagination__pages">
        {pages}
      </div>
      <button
        className="pagination__item pagination__item_arrow"
        type="button"
        disabled={!isNextActive}
      >
        <ArrowNext
          onClick={handleNextClick}
        />
      </button>
    </div>
  );
};

export default Pagination;
