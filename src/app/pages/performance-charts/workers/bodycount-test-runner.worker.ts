/// <reference lib="webworker" />
import { Tester } from '@gravity-simulator/gravity-tester';

addEventListener('message', ({ data }) => {
  const tester = new Tester();

  (async () => {
    let result = []
    for (let i = 0; i < data.length; i++) {
      result[i] = await tester.testBuildAndResolveTree(data[i])
    }
    postMessage(result);
  })();
});
