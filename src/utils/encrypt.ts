import { Buffer } from "buffer";

export function decode(val: string) {
  return Buffer.from(val, "base64").toString("utf-8");
}
