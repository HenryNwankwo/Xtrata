'use client';
import ProgressBar from './ProgressBar';
import { useXtrataContext } from '@/utils/XtrataContext';

function ProgressGroup() {
  const { progress } = useXtrataContext();
  return progress > 0 ? <ProgressBar progressValue={progress} /> : null;
}

export default ProgressGroup;
