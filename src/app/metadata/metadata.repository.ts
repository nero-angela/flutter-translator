import * as fs from "fs";
import path from "path";
import { Workspace } from "../util/workspace";
import { AndroidMetadata } from "./android/android.metadata";
import { AndroidMetadataRepository } from "./android/android.metadata.repository";
import { IOSMetadata } from "./ios/ios.metadata";
import { IOSMetadataRepository } from "./ios/ios.metadata.repository";
import {
  Metadata,
  MetadataLanguage,
  MetadataSupportPlatform,
} from "./metadata";

export class MetadataRepository {
  private androidMetadataRepository = new AndroidMetadataRepository();
  private iosMetadataRepository = new IOSMetadataRepository();

  public getMetadataPath(platform: MetadataSupportPlatform): string {
    switch (platform) {
      case MetadataSupportPlatform.android:
        return path.join(
          Workspace.getRoot(),
          "android/fastlane/metadata/android"
        );
      case MetadataSupportPlatform.ios:
        return path.join(Workspace.getRoot(), "ios/fastlane/metadata");
    }
  }

  public getSupportLanguages(platform: MetadataSupportPlatform) {
    switch (platform) {
      case MetadataSupportPlatform.android:
        return this.androidMetadataRepository.supportLanguages;
      case MetadataSupportPlatform.ios:
        return this.iosMetadataRepository.supportLanguages;
    }
  }

  public createMetadataFiles(
    platform: MetadataSupportPlatform,
    language: MetadataLanguage
  ): Metadata {
    const metadataPath = this.getMetadataPath(platform);
    let metadata: Metadata;
    switch (platform) {
      case MetadataSupportPlatform.android:
        metadata = new AndroidMetadata(language, metadataPath);
        break;
      case MetadataSupportPlatform.ios:
        metadata = new IOSMetadata(language, metadataPath);
        break;
    }

    for (const data of metadata.dataList) {
      const dataPath = path.join(metadataPath, language.locale, data.fileName);
      if (fs.existsSync(dataPath)) {
        // exist -> read previous text
        data.text = fs.readFileSync(dataPath, "utf8");
      } else {
        // not exist -> create
        Workspace.createPath(dataPath);
      }
    }

    return metadata;
  }

  public saveMetadata(metadata: Metadata): Metadata {
    for (const data of metadata.dataList) {
      const filePath = path.join(
        metadata.metadataPath,
        metadata.language.locale,
        data.fileName
      );
      fs.writeFileSync(filePath, data.text);
    }
    return metadata;
  }
}
