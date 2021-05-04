import yargs from "yargs/yargs";
import { prepack } from "./prepack";

yargs(process.argv.slice(2))
  .command(
    "prepack",
    "Prepare for packing a package",
    (cmd) => {
      return cmd.option("cwd", {
        type: "string",
        default: process.cwd(),
        defaultDescription: "CWD",
        description: "Current working directory."
      });
    },
    prepack
  )
  .demandCommand()
  .showHelpOnFail(false).argv;
