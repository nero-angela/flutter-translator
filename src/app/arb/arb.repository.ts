import * as fs from "fs";
import { Language } from "../language/language";
import { FileNotFoundException } from "../util/exceptions";
import { Logger } from "../util/logger";

export class ArbRepository {
  /**
   * Read arb file.
   * @param filePath
   * @returns Promise<Record<string, string>>
   * @throws FileNotFoundException
   */
  async read(filePath: string): Promise<Record<string, string>> {
    if (!fs.existsSync(filePath)) {
      throw new FileNotFoundException(filePath);
    }
    return JSON.parse(await fs.promises.readFile(filePath, "utf8"));
  }

  /**
   * Update file after it is created.
   * @param arb
   */
  public upsert(filePath: string, data: Record<string, string>) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  /**
   * Create file is not exist.
   * @param filePath
   * @param language
   */
  public createIfNotExist(filePath: string, language: Language) {
    if (!fs.existsSync(filePath)) {
      Logger.i(`create ${filePath} file`);
      fs.writeFileSync(
        filePath,
        JSON.stringify(
          {
            "@@locale": language.languageCode,
          },
          null,
          2
        ),
        "utf-8"
      );
    }
  }
}
