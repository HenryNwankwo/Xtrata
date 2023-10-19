import ClipLoader from 'react-spinners/ClipLoader';

function Spinner({ colorValue, loadingValue, sizeValue }) {
  return (
    <div className='h-fit w-fit flex items-center justify-center'>
      <ClipLoader
        color={colorValue || '#333333'}
        loading={loadingValue}
        size={sizeValue || 30}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

export default Spinner;
