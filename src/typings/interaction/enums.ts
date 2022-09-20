/* eslint-disable no-unused-vars */
export enum InteractionOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export enum ApplicationType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3
}

export enum Locales {
  Danish = "da",	// Danish -	Dansk
  German = "de",	// German -	Deutsch
  EnglishGB = "en-GB",	// English, UK -	English, UK
  EnglishUS = "en-US",	// English, US -	English, US
  SpanishES = "es-ES",	// Spanish -	Español
  French = "fr",	// French -	Français
  Croatian = "hr",	// Croatian -	Hrvatski
  Italian = "it",	// Italian -	Italiano
  Lithuanian = "lt",	// Lithuanian -	Lietuviškai
  Hungarian = "hu",	// Hungarian -	Magyar
  Dutch = "nl",	// Dutch -	Nederlands
  Norwegian = "no",	// Norwegian -	Norsk
  Polish = "pl",	// Polish -	Polski
  PortugueseBR = "pt-BR",	// Portuguese, Brazilian -	Português do Brasil
  Romanian = "ro",	// Romanian, Romania -	Română
  Finnish = "fi",	// Finnish -	Suomi
  Swedish = "sv-SE",	// Swedish -	Svenska
  Vietnamese = "vi",	// Vietnamese -	Tiếng Việt
  Turkish = "tr",	// Turkish -	Türkçe
  Czech = "cs",	// Czech -	Čeština
  Greek = "el",	// Greek -	Ελληνικά
  Bulgarian = "bg",	// Bulgarian -	български
  Russian = "ru",	// Russian -	Pусский
  Ukrainian = "uk",	// Ukrainian -	Українська
  Hindi = "hi",	// Hindi -	हिन्दी
  Thai = "th",	// Thai -	ไทย
  ChineseCN = "zh-CN",// Chinese, China -	中文
  Japanese= "ja",	// Japanese -	日本語
  ChineseTW = "zh-TW",	// Chinese, Taiwan -	繁體中文
  Korean = "ko",	// Korean -	한국어
}

type LocaleString = `${Locales}`;
export type LocalizationMap = Partial<Record<LocaleString, string>>