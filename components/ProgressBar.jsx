function ProgressBar({ progressText, progressValue }) {
  let widthPercentage = 0;

  if (progressValue) {
    widthPercentage = `${progressValue}%`;
  }

  //determining the color of the progress
  let progressColor = 'bg-red-500';
  if (progressValue >= 25) {
    progressColor = 'bg-orange-400';
  }
  if (progressValue >= 50) {
    progressColor = 'bg-yellow-400';
  }
  if (progressValue >= 75) {
    progressColor = 'bg-green-400';
  }

  return (
    <div className='h-2 w-full bg-slate-100 relative'>
      <div
        className={`h-full ${progressColor}`}
        style={{ width: widthPercentage }}
      ></div>
      <p className='text-[0.5rem] text-center w-full h-full absolute top-0 left-0 flex items-center justify-center'>
        {progressText}
      </p>
    </div>
  );
}

export default ProgressBar;
