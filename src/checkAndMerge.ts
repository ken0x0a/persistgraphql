import { exists } from "fs";

// tslint:disable

export function checkAndMerge(
  objects: { [opName: string]: string }[]
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

      const opName = keys[0];
      const query = obj[keys[0]];
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
