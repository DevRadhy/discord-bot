import { InteractionCommandBase, InteractionOptionBase, InteractionOptionChoices } from "./base";
import { ApplicationType, InteractionOptionType } from "./enums";
import { InteractionOptionTypeInteger } from "./integer";
import { InteractionOptionTypeNumber } from "./number";
import { InteractionOptionTypeString } from "./string";
import { InteractionOptionTypeAttachment, InteractionOptionTypeBoolean, InteractionOptionTypeChannel, InteractionOptionTypeMentionable, InteractionOptionTypeRole, InteractionOptionTypeSubCommand, InteractionOptionTypeSubCommandGroup, InteractionOptionTypeUser } from "./types";

export type InteractionOptionChoicesOrAutoCompleteWrapper <Base extends InteractionOptionBase<InteractionOptionType>, ChoiceType extends InteractionOptionChoices> = 
Base & {
  autocomplete: true;
} | {
  autocomplete?: false;
  choices?: ChoiceType[];
}

interface InteractionChatInput extends InteractionCommandBase<ApplicationType.CHAT_INPUT> {
  options?: InteractionOptions[];
}

interface InteractionUserMessage extends InteractionCommandBase<ApplicationType.USER | ApplicationType.MESSAGE> {
  description: "";
}

type InteractionCommandOption = InteractionOptionTypeSubCommand | InteractionOptionTypeSubCommandGroup;
type InteractionCommandBasicOption = InteractionOptionTypeString
                                   | InteractionOptionTypeInteger
                                   | InteractionOptionTypeBoolean
                                   | InteractionOptionTypeUser
                                   | InteractionOptionTypeChannel
                                   | InteractionOptionTypeRole
                                   | InteractionOptionTypeMentionable
                                   | InteractionOptionTypeNumber
                                   | InteractionOptionTypeAttachment;

export type InteractionOptions = InteractionCommandOption | InteractionCommandBasicOption;
export type ApplicationCommand = InteractionChatInput | InteractionUserMessage;