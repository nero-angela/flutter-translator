import * as vscode from "vscode";
import { ARBTranslateCmdArgs } from "./cmd/arb/translate/arb.translate.cmd";
import { ChangelogCreateCmdArgs } from "./cmd/changelog/changelog.create.cmd";
import { ChangelogTranslateCmdArgs } from "./cmd/changelog/changelog.translate.cmd";
import { Cmd } from "./cmd/cmd";
import { MetadataCreateCmdArgs } from "./cmd/metadata/metadata.create.cmd";
import { Registry } from "./registry";
import { Constant } from "./util/constant";
import {
  MigrationFailureException,
  WorkspaceNotFoundException,
} from "./util/exceptions";
import { Logger } from "./util/logger";
import { Toast } from "./util/toast";

export interface App {
  name: string;
  commands: Record<Cmd, (args: any) => void>;
  init: () => any;
  migrate: (context: vscode.ExtensionContext) => Promise<void>;
  disposed: () => void;
  onException: (e: any) => void;
}

export class FlutterTranslator implements App {
  private registry: Registry;

  constructor() {
    Logger.i(`${this.name} initiated.`);
    this.registry = new Registry();
  }

  public name: string = Constant.appName;

  public commands = {
    /**
     * ARB Command
     */
    [Cmd.ARBTranslate]: (args?: ARBTranslateCmdArgs) => {
      return this.registry.arbTranslateCmd.run(args);
    },
    [Cmd.ARBExcludeTranslation]: () => {
      return this.registry.arbExcludeTranslationCmd.run();
    },
    [Cmd.ARBCheck]: () => {
      return this.registry.arbCheckCmd.run();
    },
    [Cmd.ARBDecodeAllHtmlEntities]: () => {
      return this.registry.arbDecodeAllHtmlEntitiesCmd.run();
    },
    [Cmd.ARBUploadToGoogleSheet]: () => {
      return this.registry.arbUploadToGoogleSheetCmd.run();
    },
    [Cmd.ARBOpenGoogleSheet]: () => {
      return this.registry.arbOpenGoogleSheetCmd.run();
    },
    [Cmd.ARBChangeKeys]: () => {
      return this.registry.arbChangeKeysCmd.run();
    },
    [Cmd.ARBDeleteKeys]: () => {
      return this.registry.arbDeleteKeysCmd.run();
    },
    /**
     * Metadata Command
     */
    [Cmd.MetadataCreate]: (args?: MetadataCreateCmdArgs) => {
      return this.registry.metadataCreateCmd.run(args);
    },
    [Cmd.MetadataTranslate]: () => {
      return this.registry.metadataTranslateCmd.run();
    },
    [Cmd.MetadataCheck]: () => {
      return this.registry.metadataCheckCmd.run();
    },
    [Cmd.MetadataOpen]: () => {
      return this.registry.metadataOpenCmd.run();
    },
    /**
     * Changelog Command
     */
    [Cmd.ChangelogCreate]: (args?: ChangelogCreateCmdArgs) => {
      return this.registry.changelogCreateCmd.run(args);
    },
    [Cmd.ChangelogTranslate]: (args?: ChangelogTranslateCmdArgs) => {
      return this.registry.changelogTranslateCmd.run(args);
    },
    [Cmd.ChangelogCheck]: () => {
      return this.registry.changelogCheckCmd.run();
    },
    [Cmd.ChangelogOpen]: () => {
      return this.registry.changelogOpenCmd.run();
    },
  };

  public init = async () => {
    // check workspace
    if (!vscode.workspace.workspaceFolders) {
      throw new WorkspaceNotFoundException();
    }

    // initialize
    await this.registry.init();
  };

  public migrate = (context: vscode.ExtensionContext): Promise<void> => {
    try {
      return this.registry.migrationService.checkMigrate(context);
    } catch (e: any) {
      Logger.e(e);
      throw new MigrationFailureException();
    }
  };

  public disposed = () => {
    this.registry.disposed();
  };

  public onException = async (e: any) => {
    Toast.e(e.message);
    Logger.e(e);
  };
}
