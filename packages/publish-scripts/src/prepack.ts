import { join } from "path";
import fs from "fs-extra";

const PROJECT_ROOT = join(__dirname, "../../..");

export interface PrepackArguments {
  cwd: string;
}

export async function prepack(args: PrepackArguments): Promise<void> {
  const distDir = join(args.cwd, "dist");
  const packageJson = await fs.readJson(join(args.cwd, "package.json"));

  delete packageJson.scripts;

  await fs.writeJson(join(distDir, "package.json"), packageJson, {
    spaces: 2
  });
  console.log("Copied package.json");

  // Copy files from the workspace
  for (const name of ["README.md"]) {
    await fs.copy(join(args.cwd, name), join(distDir, name));
    console.log("Copied %s", name);
  }

  // Copy files from the project root
  for (const name of ["LICENSE"]) {
    await fs.copy(join(PROJECT_ROOT, name), join(distDir, name));
    console.log("Copied %s", name);
  }

  // Remove node_modules
  await fs.remove(join(distDir, "node_modules"));
  console.log("Removed node_modules");

  // Link node_modules
  await fs.ensureSymlink(
    join(args.cwd, "node_modules"),
    join(distDir, "node_modules")
  );
  console.log("Linked node_modules");
}
