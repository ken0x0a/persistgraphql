import { IntermediateMap } from "./common";

// tslint:disable

export function checkAndMerge(
  objects: IntermediateMap[] // { [opName: string]: string }[]
): { [opName: string]: string } {
  try {
    // const res = objects.reduce<{ [key: string]: string }>((pv, cv) => {
    //   return Object.assign(pv, cv);
    // }, {});
    const opCount: {
      [onName: string]: number;
    } = {};
    const res: { [key: string]: string } = {};
    for (const obj of objects) {
      const keys = Object.keys(obj);
      if (keys.length !== 1) throw new Error("obj length should be 1");

      console.log(obj);
      const queryId = (keys[0] as any) as keyof typeof obj;
      const opName = obj[queryId].opName;
      const query = obj[queryId].query;
      console.log(opName);
      if (typeof opCount[opName] === "undefined") opCount[opName] = 0;
      if (res[opName] && res[opName] !== query)
        throw new Error(`"query" must be same for opName "${opName}"`);
      res[opName] = query;
      opCount[opName]++;
    }
    console.log({ stat: opCount });
    return res;
  } catch (err) {
    console.log(err.message);
    process.exit(1);
    throw new Error(err);
  }
}
