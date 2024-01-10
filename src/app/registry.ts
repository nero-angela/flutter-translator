import { ArbService } from "./arb/arb.service";
import { ArbStatisticService } from "./arb_statistic/arb_statistic.service";
import { TranslationCacheDataSource } from "./cache/translation_cache.datasource";
import { TranslationCacheRepository } from "./cache/translation_cache.repository";
import { ConfigureTargetLanguageCode } from "./command/configure_target_language_code.cmd";
import { CreateTranslationCache } from "./command/create_translation_cache.cmd";
import { ExcludeTranslation } from "./command/exclude_translation";
import { InitializeCmd } from "./command/initialize.cmd";
import { TranslateCmd } from "./command/translate.cmd";
import { ConfigRepository } from "./config/config.repository";
import { ConfigService } from "./config/config.service";
import { HistoryRepository } from "./history/history.repository";
import { HistoryService } from "./history/history.service";
import { LanguageService } from "./language/language.service";
import { GoogleTranslationDataSource } from "./translation/google/google_translation.datasource";
import { GoogleTranslationRepository } from "./translation/google/google_translation.repository";
import { GoogleTranslationService } from "./translation/google/google_translation.service";

export class Registry {
  /**
   * DataSource
   */
  private cacheDataSource: TranslationCacheDataSource;
  private translationDataSource: GoogleTranslationDataSource;

  /**
   * Repository
   */
  private translationCacheRepository: TranslationCacheRepository;
  private translationRepository: GoogleTranslationRepository;
  private historyRepository: HistoryRepository;
  private configRepository: ConfigRepository;

  /**
   * Service
   */
  private historyService: HistoryService;
  private configService: ConfigService;
  private languageService: LanguageService;
  private arbService: ArbService;
  private translationService: GoogleTranslationService;
  private arbStatisticService: ArbStatisticService;

  /**
   * Command
   */
  public initializeCmd: InitializeCmd;
  public translationCmd: TranslateCmd;
  public createTranslationCache: CreateTranslationCache;
  public excludeTranslation: ExcludeTranslation;
  public selectTargetLanguageCode: ConfigureTargetLanguageCode;

  constructor() {
    // data source
    this.cacheDataSource = new TranslationCacheDataSource();
    this.translationDataSource = new GoogleTranslationDataSource();

    // repository
    this.translationCacheRepository = new TranslationCacheRepository({
      cacheDataSource: this.cacheDataSource,
    });
    this.translationRepository = new GoogleTranslationRepository({
      translationCacheRepository: this.translationCacheRepository,
      translationDataSource: this.translationDataSource,
    });
    this.historyRepository = new HistoryRepository();
    this.configRepository = new ConfigRepository();

    // service
    this.historyService = new HistoryService({
      historyRepository: this.historyRepository,
    });
    this.configService = new ConfigService({
      configRepository: this.configRepository,
    });
    this.languageService = new LanguageService({
      configService: this.configService,
    });
    this.arbService = new ArbService({ languageService: this.languageService });
    this.translationService = new GoogleTranslationService({
      translationCacheRepository: this.translationCacheRepository,
      translationRepository: this.translationRepository,
    });
    this.arbStatisticService = new ArbStatisticService({
      translationCacheRepository: this.translationCacheRepository,
      languageService: this.languageService,
      arbService: this.arbService,
    });

    // cmd
    this.initializeCmd = new InitializeCmd({
      configService: this.configService,
      arbService: this.arbService,
    });
    this.translationCmd = new TranslateCmd({
      arbService: this.arbService,
      configService: this.configService,
      historyService: this.historyService,
      languageService: this.languageService,
      translationService: this.translationService,
      arbStatisticService: this.arbStatisticService,
    });
    this.createTranslationCache = new CreateTranslationCache({
      arbService: this.arbService,
      configService: this.configService,
      translationCacheRepository: this.translationCacheRepository,
    });
    this.excludeTranslation = new ExcludeTranslation({
      arbService: this.arbService,
      configService: this.configService,
      historyService: this.historyService,
    });
    this.selectTargetLanguageCode = new ConfigureTargetLanguageCode({
      arbService: this.arbService,
      configService: this.configService,
      languageService: this.languageService,
    });
  }

  public init(): Promise<void[]> {
    return Promise.all([
      this.configRepository.init(),
      this.historyRepository.init(),
      this.cacheDataSource.init(),
    ]);
  }
}
