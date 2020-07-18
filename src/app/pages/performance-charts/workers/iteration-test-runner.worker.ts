/// <reference lib="webworker" />
import { Tester } from '@gravity-simulator/gravity-tester';

addEventListener('message', ({ data }) => {
  const tester = new Tester();
  tester.multipleTestBuildAndResolve(data.bodyCount, data.numberOfIterations)
  .then(result => postMessage(result));
});
