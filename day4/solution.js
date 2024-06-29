import crypto from "crypto";

for (let i = 1; ; i++) {
  const hash = crypto
    .createHash("md5")
    .update("ckczppom" + i)
    .digest("hex");

  if (hash.startsWith("00000")) {
    console.log(i);
    break;
  }
}

for (let i = 1; ; i++) {
  const hash = crypto
    .createHash("md5")
    .update("ckczppom" + i)
    .digest("hex");

  if (hash.startsWith("000000")) {
    console.log(i);
    break;
  }
}
