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
    <div className='progress-bar'>
      <div
        className={`h-full ${progressColor}`}
        style={{ width: widthPercentage }}
      ></div>
      <p className='progress-bar_text'>{progressText}</p>
    </div>
  );
}

export default ProgressBar;
