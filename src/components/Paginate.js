import { Pagination } from '@mui/material';

const Paginate = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      variant="outlined"
      color="primary"
    />
  );
};

export default Paginate;
